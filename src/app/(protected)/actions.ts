"use server";

import { audit, notify } from "@/lib/audit";
import { handoffOrderToQa } from "@/lib/automation";
import { requireUser } from "@/lib/auth";
import {
  createGithubBranch,
  createGithubIssue,
  createGithubRepository,
  createGithubTag,
  ensureGithubPullRequest,
  ensureGithubWebhook,
  encryptSecret,
  githubBranchUrl,
  resolveGithubToken
} from "@/lib/github";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile, sha256File, writeTextArtifact } from "@/lib/storage";
import { classifyChange, missingChangeFields, nextSemver } from "@/lib/workflow";
import { labelFor } from "@/lib/labels";
import bcrypt from "bcryptjs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function optionalValue(formData: FormData, key: string) {
  const current = value(formData, key);
  return current.length > 0 ? current : undefined;
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const raw = Number(value(formData, key));
  return Number.isFinite(raw) ? raw : fallback;
}

function fileValue(formData: FormData, key: string) {
  const file = formData.get(key);
  if (file instanceof File && file.size > 0) return file;
  return null;
}

function currentPath(formData: FormData) {
  return value(formData, "currentPath") || "/dashboard";
}

function go(formData: FormData, message: string, type: "ok" | "error" = "ok"): never {
  revalidatePath(currentPath(formData));
  redirect(`${currentPath(formData)}?${type}=${encodeURIComponent(message)}`);
}

function requireField(formData: FormData, field: string, label: string) {
  const current = value(formData, field);
  if (!current) go(formData, `${label} es obligatorio.`, "error");
  return current;
}

function slugText(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function requireGithubToken(formData: FormData, userId: string) {
  const token = await optionalGithubToken(userId);
  if (!token) {
    go(formData, "Configure GITHUB_WORKSPACE_TOKEN para usar el workspace GitHub compartido.", "error");
  }
  return token;
}

async function optionalGithubToken(userId: string) {
  const fullUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { githubTokenEncrypted: true }
  });
  return resolveGithubToken(fullUser?.githubTokenEncrypted);
}

async function nextTicket(prefix: string, table: "incident" | "changeRequest" | "changeOrder" | "defect") {
  const count =
    table === "incident"
      ? await prisma.incident.count()
      : table === "changeRequest"
        ? await prisma.changeRequest.count()
        : table === "changeOrder"
          ? await prisma.changeOrder.count()
          : await prisma.defect.count();
  return `${prefix}-${String(count + 1).padStart(4, "0")}`;
}

async function nextWorkItemCode(projectId: string) {
  const count = await prisma.workItem.count({ where: { projectId } });
  return `WI-${String(count + 1).padStart(4, "0")}`;
}

async function validateArtifactGateForQa(changeOrderId: string) {
  const order = await prisma.changeOrder.findUniqueOrThrow({ where: { id: changeOrderId } });
  const workItems = await prisma.workItem.findMany({
    where: {
      projectId: order.projectId,
      OR: [{ changeOrderId: order.id }, { changeRequestId: order.changeRequestId }]
    },
    include: {
      artifactRequirements: {
        include: { versions: true },
        orderBy: [{ lifecycleStage: "asc" }, { sortOrder: "asc" }]
      }
    }
  });

  if (workItems.length === 0) {
    return ["La orden debe tener al menos un requerimiento/backlog asociado."];
  }

  const missing: string[] = [];
  let implementationApproved = false;
  for (const workItem of workItems) {
    for (const requirement of workItem.artifactRequirements) {
      if (!requirement.required || !requirement.requiresQaApproval || requirement.status === "WAIVED") continue;
      if (requirement.status !== "QA_APPROVED") {
        missing.push(`${workItem.code}: ${labelFor(requirement.lifecycleStage)} - ${requirement.name}`);
      }
      if (requirement.lifecycleStage === "IMPLEMENTATION" && requirement.status === "QA_APPROVED") {
        implementationApproved = true;
      }
      if (requirement.versions.length === 0) {
        missing.push(`${workItem.code}: ${requirement.name} no tiene version subida.`);
      }
    }
  }

  if (!implementationApproved) {
    missing.push("Falta al menos una version de codigo o implementacion aprobada por QA.");
  }
  return [...new Set(missing)];
}

async function linkVersionToWorkItemArtifact({
  workItemId,
  artifactRequirementId,
  itemId,
  itemVersionId,
  changeRequestId,
  changeOrderId,
  submittedById,
  notes
}: {
  workItemId?: string;
  artifactRequirementId?: string;
  itemId: string;
  itemVersionId: string;
  changeRequestId?: string;
  changeOrderId?: string;
  submittedById: string;
  notes?: string;
}) {
  if (!workItemId && !artifactRequirementId) return null;
  if (!workItemId || !artifactRequirementId) {
    throw new Error("Seleccione el work item y el artefacto requerido para registrar trazabilidad.");
  }

  const requirement = await prisma.workItemArtifactRequirement.findUniqueOrThrow({
    where: { id: artifactRequirementId },
    include: { workItem: true }
  });
  if (requirement.workItemId !== workItemId) {
    throw new Error("El artefacto requerido no pertenece al work item seleccionado.");
  }

  const artifactVersion = await prisma.workItemArtifactVersion.create({
    data: {
      workItemId,
      artifactRequirementId,
      itemId,
      itemVersionId,
      changeRequestId,
      changeOrderId,
      lifecycleStage: requirement.lifecycleStage,
      artifactKind: requirement.artifactKind,
      submittedById,
      notes
    }
  });

  await prisma.workItemArtifactRequirement.update({
    where: { id: requirement.id },
    data: {
      status: requirement.requiresQaApproval ? "SUBMITTED" : "QA_APPROVED",
      reviewNotes: requirement.requiresQaApproval ? null : "Aprobado automaticamente: no requiere revision QA."
    }
  });

  const workItemUpdate =
    requirement.lifecycleStage === "IMPLEMENTATION"
      ? { lifecycleStage: "IMPLEMENTATION" as const }
      : requirement.lifecycleStage === "DESIGN" && requirement.workItem.lifecycleStage === "ANALYSIS"
        ? { lifecycleStage: "DESIGN" as const }
        : {};
  if (Object.keys(workItemUpdate).length > 0) {
    await prisma.workItem.update({ where: { id: workItemId }, data: workItemUpdate });
  }

  const itemVersionTarget = `${itemId}:${itemVersionId}`;
  await prisma.traceabilityLink.create({
    data: {
      projectId: requirement.workItem.projectId,
      sourceType: "WORK_ITEM",
      sourceId: workItemId,
      targetType: "CONFIG_ITEM_VERSION",
      targetId: itemVersionTarget,
      relationType: `${requirement.lifecycleStage.toLowerCase()}_${requirement.artifactKind.toLowerCase()}`,
      createdById: submittedById
    }
  }).catch(() => undefined);

  if (changeOrderId) {
    await prisma.traceabilityLink.create({
      data: {
        projectId: requirement.workItem.projectId,
        sourceType: "CHANGE_ORDER",
        sourceId: changeOrderId,
        targetType: "CONFIG_ITEM_VERSION",
        targetId: itemVersionTarget,
        relationType: "implements_with_versioned_artifact",
        createdById: submittedById
      }
    }).catch(() => undefined);
  }

  return artifactVersion;
}

async function validateArtifactSelection(formData: FormData) {
  const workItemId = optionalValue(formData, "workItemId");
  const artifactRequirementId = optionalValue(formData, "artifactRequirementId");
  if (!workItemId && !artifactRequirementId) return { workItemId, artifactRequirementId };
  if (!workItemId || !artifactRequirementId) {
    go(formData, "Seleccione el work item y el artefacto requerido para registrar trazabilidad.", "error");
  }
  const requirement = await prisma.workItemArtifactRequirement.findUnique({
    where: { id: artifactRequirementId },
    select: { workItemId: true }
  });
  if (!requirement || requirement.workItemId !== workItemId) {
    go(formData, "El artefacto requerido no pertenece al work item seleccionado.", "error");
  }
  return { workItemId, artifactRequirementId };
}

function dateValue(formData: FormData, key: string) {
  const raw = optionalValue(formData, key);
  return raw ? new Date(raw) : undefined;
}

function requiredDate(formData: FormData, key: string, label: string) {
  return new Date(requireField(formData, key, label));
}

function decimalNumberValue(formData: FormData, key: string, fallback = 0) {
  const raw = Number(value(formData, key));
  return Number.isFinite(raw) ? raw : fallback;
}

function clampProgress(input: number) {
  return Math.max(0, Math.min(100, Math.round(input)));
}

function workItemBranchName(code: string, title: string) {
  const suffix = slugText(title).slice(0, 48);
  return `feature/${code.toLowerCase()}${suffix ? `-${suffix}` : ""}`;
}

const methodologyDefaults: Record<string, Array<{ name: string; requiredDeliverables: string; acceptanceCriteria: string }>> = {
  RUP: [
    {
      name: "Inicio",
      requiredDeliverables: "Vision del producto; alcance inicial; casos de uso de alto nivel; plan SCM inicial; lista preliminar de ECS.",
      acceptanceCriteria: "El alcance, riesgos iniciales, responsables y ECS base quedan definidos antes de iniciar elaboracion."
    },
    {
      name: "Elaboracion",
      requiredDeliverables: "SRS; diagramas de caso de uso; narrativas de caso de uso; diagramas de secuencia; diagramas de clase; SAD.",
      acceptanceCriteria: "Los entregables SRS/SAD y modelos asociados estan versionados como ECS y trazados al cronograma."
    },
    {
      name: "Construccion",
      requiredDeliverables: "Incrementos implementados; pruebas unitarias; cambios versionados; lineas base por incremento.",
      acceptanceCriteria: "Cada incremento tiene rama, commit, pruebas, responsable y evidencia de versionamiento."
    },
    {
      name: "Transicion",
      requiredDeliverables: "UAT; acta de aceptacion; release; tag de GitHub; cierre de solicitud.",
      acceptanceCriteria: "La liberacion fue validada, aceptada y cerrada con trazabilidad completa."
    }
  ],
  SCRUM: [
    {
      name: "Product Backlog",
      requiredDeliverables: "Epicas, features, historias priorizadas, criterios de aceptacion y estimacion.",
      acceptanceCriteria: "El backlog esta priorizado y cada item tiene responsable o criterio de refinamiento."
    },
    {
      name: "Sprint Planning",
      requiredDeliverables: "Sprint, objetivo, capacidad, items comprometidos y plan diario.",
      acceptanceCriteria: "El sprint tiene fechas, capacidad y tareas asignadas al equipo."
    },
    {
      name: "Ejecucion y Review",
      requiredDeliverables: "Reportes diarios, commits, PRs, pruebas y demo/review.",
      acceptanceCriteria: "Cada dia tiene reporte y los items terminados tienen evidencia GitHub."
    },
    {
      name: "Retrospectiva",
      requiredDeliverables: "Lecciones aprendidas, acciones de mejora y ajustes al proceso.",
      acceptanceCriteria: "Las mejoras se registran y se trasladan al backlog si requieren seguimiento."
    }
  ],
  KANBAN: [
    {
      name: "Entrada",
      requiredDeliverables: "Backlog priorizado, criterios de preparado y responsable inicial.",
      acceptanceCriteria: "Solo ingresan items con alcance y prioridad definidos."
    },
    {
      name: "En progreso",
      requiredDeliverables: "Trabajo asignado, rama GitHub, reportes diarios y bloqueos visibles.",
      acceptanceCriteria: "El WIP se mantiene controlado y los bloqueos tienen seguimiento."
    },
    {
      name: "Validacion",
      requiredDeliverables: "PR, pruebas, QA, UAT si corresponde y evidencias.",
      acceptanceCriteria: "El item no se cierra sin evidencia tecnica y funcional."
    },
    {
      name: "Hecho",
      requiredDeliverables: "Entrega aceptada, version o release y trazabilidad cerrada.",
      acceptanceCriteria: "El item queda cerrado con commit, PR o release asociado."
    }
  ],
  CASCADA: [
    {
      name: "Requisitos",
      requiredDeliverables: "SRS, alcance, restricciones y criterios de aceptacion.",
      acceptanceCriteria: "Los requisitos estan aprobados antes del diseno."
    },
    {
      name: "Diseno",
      requiredDeliverables: "SAD, modelos, arquitectura y plan de pruebas.",
      acceptanceCriteria: "El diseno cubre todos los requisitos aprobados."
    },
    {
      name: "Implementacion",
      requiredDeliverables: "Codigo, ECS versionados, commits y pruebas unitarias.",
      acceptanceCriteria: "El codigo implementa el diseno aprobado y esta versionado."
    },
    {
      name: "Pruebas y despliegue",
      requiredDeliverables: "QA, UAT, release, tag y cierre.",
      acceptanceCriteria: "La entrega fue probada, liberada y aceptada."
    }
  ],
  XP: [
    {
      name: "Planificacion",
      requiredDeliverables: "Historias, estimaciones, release plan y criterios de aceptacion.",
      acceptanceCriteria: "Las historias estan priorizadas y listas para iteracion."
    },
    {
      name: "Iteracion",
      requiredDeliverables: "Tareas, commits frecuentes, pruebas unitarias y reporte diario.",
      acceptanceCriteria: "Cada tarea tiene evidencia de trabajo y pruebas."
    },
    {
      name: "Integracion continua",
      requiredDeliverables: "PR, integracion, pruebas y feedback.",
      acceptanceCriteria: "Los cambios integrados pasan validacion tecnica."
    },
    {
      name: "Release",
      requiredDeliverables: "Version, tag, UAT y cierre.",
      acceptanceCriteria: "La version queda liberada y aceptada por el usuario."
    }
  ]
};

async function ensureDefaultMethodologyPhases(projectId: string, methodologyType: string, ownerId?: string) {
  const defaults = methodologyDefaults[methodologyType] ?? [];
  for (const [index, phase] of defaults.entries()) {
    const existing = await prisma.methodologyPhase.findFirst({
      where: { projectId, methodologyType: methodologyType as never, name: phase.name }
    });
    if (existing) {
      await prisma.methodologyPhase.update({
        where: { id: existing.id },
        data: {
          sortOrder: index + 1,
          requiredDeliverables: phase.requiredDeliverables,
          acceptanceCriteria: phase.acceptanceCriteria,
          ownerId: existing.ownerId ?? ownerId
        }
      });
    } else {
      await prisma.methodologyPhase.create({
        data: {
          projectId,
          methodologyType: methodologyType as never,
          name: phase.name,
          sortOrder: index + 1,
          requiredDeliverables: phase.requiredDeliverables,
          acceptanceCriteria: phase.acceptanceCriteria,
          ownerId
        }
      });
    }
  }
}

export async function logoutAction() {
  const { clearSessionCookie } = await import("@/lib/auth");
  await clearSessionCookie();
  redirect("/login");
}

export async function createUserAction(formData: FormData) {
  const user = await requireUser("admin.users.manage");
  const name = requireField(formData, "name", "Nombre");
  const email = requireField(formData, "email", "Email").toLowerCase();
  const password = requireField(formData, "password", "Contrasena");
  const roleId = requireField(formData, "roleId", "Rol");
  const githubToken = optionalValue(formData, "githubToken");
  const passwordHash = await bcrypt.hash(password, 12);

  const created = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      roleId,
      status: value(formData, "status") === "INACTIVE" ? "INACTIVE" : "ACTIVE",
      githubTokenEncrypted: githubToken ? encryptSecret(githubToken) : undefined,
      githubTokenLast4: githubToken ? githubToken.slice(-4) : undefined
    }
  });
  await audit({ userId: user.id, module: "usuarios", action: "create", next: { id: created.id, email } });
  go(formData, "Usuario creado.");
}

export async function setUserStatusAction(formData: FormData) {
  const user = await requireUser("admin.users.manage");
  const id = requireField(formData, "id", "Usuario");
  const status = value(formData, "status") === "ACTIVE" ? "ACTIVE" : "INACTIVE";
  const before = await prisma.user.findUnique({ where: { id } });
  await prisma.user.update({ where: { id }, data: { status } });
  await audit({ userId: user.id, module: "usuarios", action: "status", previous: before, next: { id, status } });
  go(formData, "Estado de usuario actualizado.");
}


export async function assignProjectRoleAction(formData: FormData) {
  const user = await requireUser("admin.users.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const userId = requireField(formData, "userId", "Usuario");
  const roleId = requireField(formData, "roleId", "Rol en proyecto");
  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role || !role.active || role.isSystem) go(formData, "Seleccione un rol activo de usuario.", "error");

  const before = await prisma.projectUser.findUnique({
    where: { projectId_userId: { projectId, userId } },
    include: { project: true, user: true, role: true }
  });
  const assignment = await prisma.projectUser.upsert({
    where: { projectId_userId: { projectId, userId } },
    create: {
      projectId,
      userId,
      roleId,
      roleNote: optionalValue(formData, "roleNote"),
      active: true
    },
    update: {
      roleId,
      roleNote: optionalValue(formData, "roleNote"),
      active: true
    }
  });
  await audit({ userId: user.id, module: "usuarios", action: "assign_project_role", previous: before, next: assignment });
  go(formData, "Rol por proyecto asignado.");
}

export async function setProjectUserStatusAction(formData: FormData) {
  const user = await requireUser("admin.users.manage");
  const id = requireField(formData, "id", "Asignacion");
  const active = value(formData, "active") === "true";
  const before = await prisma.projectUser.findUnique({ where: { id }, include: { project: true, user: true, role: true } });
  await prisma.projectUser.update({ where: { id }, data: { active } });
  await audit({ userId: user.id, module: "usuarios", action: "project_role_status", previous: before, next: { id, active } });
  go(formData, "Estado de asignacion actualizado.");
}

export async function createRoleAction(formData: FormData) {
  const user = await requireUser("admin.roles.manage");
  const slug = requireField(formData, "slug", "Slug").toUpperCase().replace(/[^A-Z0-9_]/g, "_");
  const role = await prisma.role.create({
    data: {
      slug,
      name: requireField(formData, "name", "Nombre"),
      description: optionalValue(formData, "description"),
      isSystem: false
    }
  });
  const permissionIds = formData.getAll("permissionIds").map(String).filter(Boolean);
  for (const permissionId of permissionIds) {
    await prisma.rolePermission.create({ data: { roleId: role.id, permissionId } });
  }
  await audit({ userId: user.id, module: "roles", action: "create", next: { role: role.slug, permissions: permissionIds.length } });
  go(formData, "Rol creado con permisos asignados.");
}

export async function setRoleStatusAction(formData: FormData) {
  const user = await requireUser("admin.roles.manage");
  const id = requireField(formData, "id", "Rol");
  const active = value(formData, "active") === "true";
  const before = await prisma.role.findUnique({ where: { id } });
  await prisma.role.update({ where: { id }, data: { active } });
  await audit({ userId: user.id, module: "roles", action: "status", previous: before, next: { id, active } });
  go(formData, "Estado de rol actualizado.");
}

export async function createProjectAction(formData: FormData) {
  const user = await requireUser("admin.projects.manage");
  const code = requireField(formData, "code", "Codigo").toUpperCase();
  const name = requireField(formData, "name", "Nombre");
  const managerId = requireField(formData, "managerId", "Jefe de Proyecto");
  const manager = await prisma.user.findUnique({ where: { id: managerId }, select: { roleId: true } });
  if (!manager) go(formData, "Jefe de proyecto no encontrado.", "error");

  let githubOwner = optionalValue(formData, "githubOwner");
  let githubRepo = optionalValue(formData, "githubRepo");
  if (value(formData, "createGithubRepo") === "on") {
    const repo = await createGithubRepository(await requireGithubToken(formData, user.id), {
      owner: githubOwner,
      name: githubRepo ?? slugText(code),
      description: optionalValue(formData, "description") ?? `Repositorio del proyecto ${code} - ${name}`,
      visibility: value(formData, "githubVisibility") === "public" ? "public" : "private",
      autoInit: value(formData, "githubAutoInit") === "on"
    });
    githubOwner = repo.owner;
    githubRepo = repo.name;
  }

  const project = await prisma.project.create({
    data: {
      code,
      name,
      description: optionalValue(formData, "description"),
      managerId,
      createdById: user.id,
      githubOwner,
      githubRepo
    }
  });

  await prisma.projectUser.upsert({
    where: { projectId_userId: { projectId: project.id, userId: managerId } },
    create: { projectId: project.id, userId: managerId, roleId: manager.roleId, roleNote: "Jefe de proyecto", active: true },
    update: { roleId: manager.roleId, roleNote: "Jefe de proyecto", active: true }
  });

  for (const type of ["WORK", "INTEGRATION", "SUPPORT", "MASTER"] as const) {
    await prisma.library.create({
      data: {
        projectId: project.id,
        type,
        name: type === "WORK" ? "Trabajo" : type === "INTEGRATION" ? "Integracion" : type === "SUPPORT" ? "Soporte" : "Maestra"
      }
    });
  }
  await audit({ userId: user.id, module: "proyectos", action: "create", next: project });
  go(formData, githubOwner && githubRepo ? "Proyecto creado con bibliotecas base y repositorio GitHub vinculado." : "Proyecto creado con bibliotecas base.");
}

export async function setProjectStatusAction(formData: FormData) {
  const user = await requireUser("admin.projects.manage");
  const id = requireField(formData, "id", "Proyecto");
  const status = requireField(formData, "status", "Estado") as "ACTIVE" | "PAUSED" | "CLOSED";
  const before = await prisma.project.findUnique({ where: { id } });
  await prisma.project.update({ where: { id }, data: { status, closedAt: status === "CLOSED" ? new Date() : undefined } });
  await audit({ userId: user.id, module: "proyectos", action: "status", previous: before, next: { id, status } });
  go(formData, "Estado de proyecto actualizado.");
}

export async function configureProjectMethodologyAction(formData: FormData) {
  const user = await requireUser("boards.methodology.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const methodologyType = requireField(formData, "methodologyType", "Metodologia");
  const before = await prisma.project.findUnique({ where: { id: projectId } });
  await prisma.project.update({
    where: { id: projectId },
    data: {
      methodologyType: methodologyType as never,
      methodologyNotes: optionalValue(formData, "methodologyNotes"),
      methodologyConfiguredAt: new Date()
    }
  });
  if (value(formData, "createDefaultPhases") === "on") {
    await ensureDefaultMethodologyPhases(projectId, methodologyType, user.id);
  }
  await audit({
    userId: user.id,
    module: "metodologia",
    action: "configure",
    previous: before,
    next: { projectId, methodologyType, defaultPhases: value(formData, "createDefaultPhases") === "on" }
  });
  go(formData, "Metodologia configurada con fases trazables.");
}

export async function createMethodologyPhaseAction(formData: FormData) {
  const user = await requireUser("boards.methodology.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const methodologyType = optionalValue(formData, "methodologyType") ?? project.methodologyType ?? "CUSTOM";
  const startDate = dateValue(formData, "startDate");
  const endDate = dateValue(formData, "endDate");
  if (startDate && endDate && endDate < startDate) go(formData, "La fecha final no puede ser menor a la fecha inicial.", "error");
  const phase = await prisma.methodologyPhase.create({
    data: {
      projectId,
      methodologyType: methodologyType as never,
      name: requireField(formData, "name", "Fase"),
      sortOrder: numberValue(formData, "sortOrder", 0),
      startDate,
      endDate,
      ownerId: optionalValue(formData, "ownerId"),
      requiredDeliverables: requireField(formData, "requiredDeliverables", "Entregables obligatorios"),
      acceptanceCriteria: optionalValue(formData, "acceptanceCriteria"),
      status: (optionalValue(formData, "status") ?? "PENDING") as never
    }
  });
  await audit({ userId: user.id, module: "metodologia", action: "phase_create", next: { phaseId: phase.id, projectId } });
  go(formData, "Fase metodologica registrada.");
}

export async function setMethodologyPhaseStatusAction(formData: FormData) {
  const user = await requireUser("boards.methodology.manage");
  const id = requireField(formData, "id", "Fase");
  const status = requireField(formData, "status", "Estado") as never;
  const before = await prisma.methodologyPhase.findUnique({ where: { id } });
  await prisma.methodologyPhase.update({ where: { id }, data: { status } });
  await audit({ userId: user.id, module: "metodologia", action: "phase_status", previous: before, next: { id, status } });
  go(formData, "Estado de fase actualizado.");
}

export async function createProjectActivityAction(formData: FormData) {
  const user = await requireUser("boards.methodology.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const startDate = requiredDate(formData, "startDate", "Fecha inicio");
  const endDate = requiredDate(formData, "endDate", "Fecha fin");
  if (endDate < startDate) go(formData, "La fecha final no puede ser menor a la fecha inicial.", "error");
  const activity = await prisma.projectActivity.create({
    data: {
      projectId,
      phaseId: optionalValue(formData, "phaseId"),
      title: requireField(formData, "title", "Actividad"),
      description: optionalValue(formData, "description"),
      startDate,
      endDate,
      responsibleId: requireField(formData, "responsibleId", "Responsable"),
      deliverable: requireField(formData, "deliverable", "Entregable"),
      progress: clampProgress(numberValue(formData, "progress", 0)),
      status: (optionalValue(formData, "status") ?? "PLANNED") as never
    }
  });
  await audit({ userId: user.id, module: "cronograma", action: "activity_create", next: { activityId: activity.id, projectId } });
  go(formData, "Actividad de cronograma registrada.");
}

export async function setProjectActivityStatusAction(formData: FormData) {
  const user = await requireUser("boards.methodology.manage");
  const id = requireField(formData, "id", "Actividad");
  const status = requireField(formData, "status", "Estado");
  const progress = clampProgress(numberValue(formData, "progress", status === "DONE" ? 100 : 0));
  const before = await prisma.projectActivity.findUnique({ where: { id } });
  await prisma.projectActivity.update({
    where: { id },
    data: { status: status as never, progress: status === "DONE" ? 100 : progress }
  });
  await audit({ userId: user.id, module: "cronograma", action: "activity_status", previous: before, next: { id, status, progress } });
  go(formData, "Cronograma actualizado.");
}

export async function createSprintAction(formData: FormData) {
  const user = await requireUser("boards.sprints.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const startDate = requiredDate(formData, "startDate", "Fecha inicio");
  const endDate = requiredDate(formData, "endDate", "Fecha fin");
  if (endDate < startDate) go(formData, "La fecha final no puede ser menor a la fecha inicial.", "error");
  const sprint = await prisma.projectSprint.create({
    data: {
      projectId,
      name: requireField(formData, "name", "Sprint"),
      goal: optionalValue(formData, "goal"),
      startDate,
      endDate,
      capacityHours: numberValue(formData, "capacityHours", 0) || undefined,
      active: value(formData, "active") !== "false"
    }
  });
  await audit({ userId: user.id, module: "sprints", action: "create", next: { sprintId: sprint.id, projectId } });
  go(formData, "Sprint creado.");
}

export async function createWorkItemAction(formData: FormData) {
  const user = await requireUser("boards.work.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const title = requireField(formData, "title", "Titulo");
  const code = await nextWorkItemCode(projectId);
  const githubBranch = optionalValue(formData, "githubBranch") ?? (value(formData, "createGithubBranch") === "on" ? workItemBranchName(code, title) : undefined);
  let githubIssueUrl = optionalValue(formData, "githubIssueUrl") ?? null;

  if (githubBranch && value(formData, "createGithubBranch") === "on") {
    await createGithubBranch(project, await requireGithubToken(formData, user.id), githubBranch, optionalValue(formData, "baseBranch") ?? "main");
  }
  if (value(formData, "createGithubIssue") === "on") {
    const issue = await createGithubIssue(
      project,
      await requireGithubToken(formData, user.id),
      `[${code}] ${title}`,
      [
        `Work item: ${code}`,
        `Tipo: ${value(formData, "type") || "TASK"}`,
        `Prioridad: ${value(formData, "priority") || "MEDIUM"}`,
        "",
        requireField(formData, "description", "Descripcion")
      ].join("\n")
    );
    githubIssueUrl = issue.htmlUrl;
  }

  const workItem = await prisma.workItem.create({
    data: {
      code,
      projectId,
      type: requireField(formData, "type", "Tipo") as never,
      state: (optionalValue(formData, "state") ?? "NEW") as never,
      title,
      description: requireField(formData, "description", "Descripcion"),
      priority: (optionalValue(formData, "priority") ?? "MEDIUM") as never,
      storyPoints: numberValue(formData, "storyPoints", 0) || undefined,
      createdById: user.id,
      assignedToId: optionalValue(formData, "assignedToId"),
      sprintId: optionalValue(formData, "sprintId"),
      activityId: optionalValue(formData, "activityId"),
      changeRequestId: optionalValue(formData, "changeRequestId"),
      changeOrderId: optionalValue(formData, "changeOrderId"),
      githubBranch,
      githubCommit: optionalValue(formData, "githubCommit"),
      githubPullRequestUrl: optionalValue(formData, "githubPullRequestUrl"),
      githubIssueUrl,
      dueDate: dateValue(formData, "dueDate")
    }
  });

  if (githubBranch) {
    await prisma.workItemLink.create({
      data: {
        sourceWorkItemId: workItem.id,
        linkType: "GITHUB_BRANCH",
        targetUrl: githubBranchUrl(project, githubBranch),
        externalId: githubBranch,
        createdById: user.id
      }
    });
  }
  if (githubIssueUrl) {
    await prisma.workItemLink.create({
      data: {
        sourceWorkItemId: workItem.id,
        linkType: "GITHUB_ISSUE",
        targetUrl: githubIssueUrl,
        createdById: user.id
      }
    });
  }
  await audit({ userId: user.id, module: "boards", action: "work_item_create", next: { code, projectId, githubBranch, githubIssueUrl } });
  go(formData, githubBranch ? "Work item creado y enlazado a GitHub." : "Work item creado.");
}

export async function setWorkItemStateAction(formData: FormData) {
  const user = await requireUser("boards.work.manage");
  const id = requireField(formData, "id", "Work item");
  const state = requireField(formData, "state", "Estado");
  const before = await prisma.workItem.findUnique({ where: { id } });
  await prisma.workItem.update({
    where: { id },
    data: { state: state as never, closedAt: state === "CLOSED" ? new Date() : null }
  });
  await audit({ userId: user.id, module: "boards", action: "work_item_state", previous: before, next: { id, state } });
  go(formData, "Estado del work item actualizado.");
}

export async function linkWorkItemAction(formData: FormData) {
  const user = await requireUser("boards.work.manage");
  const sourceWorkItemId = requireField(formData, "sourceWorkItemId", "Work item origen");
  const linkType = requireField(formData, "linkType", "Tipo de enlace");
  const targetWorkItemId = optionalValue(formData, "targetWorkItemId");
  const targetUrl = optionalValue(formData, "targetUrl");
  if (!targetWorkItemId && !targetUrl) go(formData, "Debe enlazar otro work item o una URL externa.", "error");
  const link = await prisma.workItemLink.create({
    data: {
      sourceWorkItemId,
      targetWorkItemId,
      linkType: linkType as never,
      targetUrl,
      externalId: optionalValue(formData, "externalId"),
      note: optionalValue(formData, "note"),
      createdById: user.id
    }
  });
  const update: Record<string, string> = {};
  if (linkType === "GITHUB_COMMIT" && (targetUrl || optionalValue(formData, "externalId"))) update.githubCommit = optionalValue(formData, "externalId") ?? targetUrl!;
  if (linkType === "GITHUB_PULL_REQUEST" && targetUrl) update.githubPullRequestUrl = targetUrl;
  if (linkType === "GITHUB_ISSUE" && targetUrl) update.githubIssueUrl = targetUrl;
  if (Object.keys(update).length > 0) {
    await prisma.workItem.update({ where: { id: sourceWorkItemId }, data: update });
  }
  await audit({ userId: user.id, module: "boards", action: "work_item_link", next: { linkId: link.id, linkType } });
  go(formData, "Enlace del work item registrado.");
}

export async function reviewArtifactRequirementAction(formData: FormData) {
  const user = await requireUser("qa.tests.manage");
  const id = requireField(formData, "id", "Artefacto");
  const decision = requireField(formData, "decision", "Decision") as "QA_APPROVED" | "QA_REJECTED" | "WAIVED";
  const reviewNotes = optionalValue(formData, "reviewNotes");
  if (decision !== "QA_APPROVED" && !reviewNotes) {
    go(formData, "Las observaciones son obligatorias para rechazar o exceptuar un artefacto.", "error");
  }
  const requirement = await prisma.workItemArtifactRequirement.findUniqueOrThrow({
    where: { id },
    include: { versions: true, workItem: true }
  });
  if (decision === "QA_APPROVED" && requirement.versions.length === 0) {
    go(formData, "No se puede aprobar un artefacto sin una version ECS subida.", "error");
  }
  await prisma.workItemArtifactRequirement.update({
    where: { id },
    data: {
      status: decision,
      reviewedById: user.id,
      reviewedAt: new Date(),
      reviewNotes
    }
  });
  if (decision === "QA_APPROVED") {
    const stageRequirements = await prisma.workItemArtifactRequirement.findMany({
      where: {
        workItemId: requirement.workItemId,
        lifecycleStage: requirement.lifecycleStage,
        required: true,
        requiresQaApproval: true,
        status: { not: "QA_APPROVED" }
      }
    });
    if (stageRequirements.length === 0) {
      await prisma.workItem.update({
        where: { id: requirement.workItemId },
        data: requirement.lifecycleStage === "ANALYSIS"
          ? { analysisCompletedAt: new Date() }
          : requirement.lifecycleStage === "DESIGN"
            ? { designCompletedAt: new Date() }
            : {}
      });
    }
  }
  await audit({ userId: user.id, module: "artefactos", action: decision.toLowerCase(), next: { id, workItemId: requirement.workItemId } });
  go(formData, "Revision de artefacto registrada.");
}

export async function registerDailyWorkLogAction(formData: FormData) {
  const user = await requireUser("daily.logs.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const workItemId = optionalValue(formData, "workItemId");
  const activityId = optionalValue(formData, "activityId");
  const stateAfter = optionalValue(formData, "stateAfter");
  const activityProgress = optionalValue(formData, "activityProgress");
  const log = await prisma.dailyWorkLog.create({
    data: {
      projectId,
      userId: user.id,
      workItemId,
      changeOrderId: optionalValue(formData, "changeOrderId"),
      activityId,
      logDate: requiredDate(formData, "logDate", "Fecha del reporte"),
      hours: decimalNumberValue(formData, "hours", 0),
      completed: requireField(formData, "completed", "Trabajo realizado"),
      nextPlan: requireField(formData, "nextPlan", "Plan siguiente"),
      blockers: optionalValue(formData, "blockers"),
      githubBranch: optionalValue(formData, "githubBranch"),
      githubCommit: optionalValue(formData, "githubCommit"),
      githubPullRequestUrl: optionalValue(formData, "githubPullRequestUrl")
    }
  });
  if (workItemId && stateAfter) {
    await prisma.workItem.update({
      where: { id: workItemId },
      data: { state: stateAfter as never, closedAt: stateAfter === "CLOSED" ? new Date() : undefined }
    });
  }
  if (activityId && activityProgress) {
    const progress = clampProgress(Number(activityProgress));
    await prisma.projectActivity.update({
      where: { id: activityId },
      data: { progress, status: progress >= 100 ? "DONE" : "IN_PROGRESS" }
    });
  }
  await audit({ userId: user.id, module: "reportes-diarios", action: "create", next: { logId: log.id, projectId, workItemId, activityId } });
  go(formData, "Reporte diario registrado.");
}

export async function createGithubProjectRepoAction(formData: FormData) {
  const user = await requireUser("dashboard.read");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const repo = await createGithubRepository(await requireGithubToken(formData, user.id), {
    owner: optionalValue(formData, "githubOwner") ?? project.githubOwner,
    name: optionalValue(formData, "githubRepo") ?? project.githubRepo ?? slugText(project.code),
    description: optionalValue(formData, "description") ?? project.description ?? `Repositorio del proyecto ${project.code}`,
    visibility: value(formData, "githubVisibility") === "public" ? "public" : "private",
    autoInit: value(formData, "githubAutoInit") === "on"
  });
  await prisma.project.update({
    where: { id: projectId },
    data: { githubOwner: repo.owner, githubRepo: repo.name }
  });
  await audit({ userId: user.id, module: "github", action: repo.created ? "repo_create" : "repo_link_existing", next: { projectId, repo } });
  go(formData, repo.created ? `Repositorio GitHub creado: ${repo.fullName}.` : `Repositorio GitHub existente vinculado: ${repo.fullName}.`);
}

export async function createGithubBranchAction(formData: FormData) {
  const user = await requireUser("dashboard.read");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const branchName = requireField(formData, "branchName", "Rama");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const branch = await createGithubBranch(project, await requireGithubToken(formData, user.id), branchName, optionalValue(formData, "baseBranch") ?? "main");
  await audit({ userId: user.id, module: "github", action: branch.created ? "branch_create" : "branch_exists", next: { projectId, branch } });
  go(formData, branch.created ? `Rama GitHub creada: ${branch.name}.` : `La rama GitHub ya existia: ${branch.name}.`);
}

export async function createGithubPullRequestAction(formData: FormData) {
  const user = await requireUser("dashboard.read");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const pull = await ensureGithubPullRequest(project, await requireGithubToken(formData, user.id), {
    title: requireField(formData, "title", "Titulo PR"),
    head: requireField(formData, "headBranch", "Rama origen"),
    base: optionalValue(formData, "baseBranch") ?? "main",
    body: optionalValue(formData, "body")
  });
  await audit({ userId: user.id, module: "github", action: pull.created ? "pull_request_create" : "pull_request_exists", next: { projectId, pull } });
  go(formData, pull.created ? `Pull request creado: #${pull.number}.` : `Pull request abierto reutilizado: #${pull.number}.`);
}

export async function createGithubTagAction(formData: FormData) {
  const user = await requireUser("dashboard.read");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const tag = await createGithubTag(project, await requireGithubToken(formData, user.id), requireField(formData, "tagName", "Tag"), requireField(formData, "commitSha", "Commit SHA"));
  await audit({ userId: user.id, module: "github", action: tag.created ? "tag_create" : "tag_exists", next: { projectId, tag } });
  go(formData, tag.created ? `Tag GitHub creado: ${tag.name}.` : `El tag GitHub ya existia: ${tag.name}.`);
}

export async function createGithubIssueAction(formData: FormData) {
  const user = await requireUser("dashboard.read");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const issue = await createGithubIssue(project, await requireGithubToken(formData, user.id), requireField(formData, "title", "Titulo issue"), optionalValue(formData, "body"));
  await audit({ userId: user.id, module: "github", action: "issue_create", next: { projectId, issue } });
  go(formData, `Issue GitHub creado: #${issue.number}.`);
}

export async function configureGithubWebhookAction(formData: FormData) {
  const user = await requireUser("dashboard.read");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const hook = await ensureGithubWebhook(project, await requireGithubToken(formData, user.id), {
    url: requireField(formData, "webhookUrl", "URL webhook"),
    secret: optionalValue(formData, "webhookSecret") ?? process.env.GITHUB_WEBHOOK_SECRET,
    events: ["push"]
  });
  await audit({ userId: user.id, module: "github", action: hook.created ? "webhook_create" : "webhook_update", next: { projectId, hook } });
  go(formData, hook.created ? "Webhook GitHub creado para push automatico a QA." : "Webhook GitHub actualizado para push automatico a QA.");
}

export async function createEcsAction(formData: FormData) {
  const user = await requireUser("config.ecs.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const libraryId = requireField(formData, "libraryId", "Biblioteca");
  const code = requireField(formData, "code", "Codigo").toUpperCase();
  const name = requireField(formData, "name", "Nombre ECS");
  const description = requireField(formData, "description", "Descripcion");
  const file = fileValue(formData, "file");
  if (!file) go(formData, "El archivo ECS es obligatorio para calcular SHA-256.", "error");
  const artifactSelection = await validateArtifactSelection(formData);
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });
  const stored = await saveUploadedFile(file, `ecs/${project.code}`);
  const version = optionalValue(formData, "version") ?? "1.0.0";

  const item = await prisma.configurationItem.create({
    data: {
      code,
      projectId,
      libraryId,
      type: requireField(formData, "type", "Tipo") as never,
      name,
      description,
      currentVersion: version,
      status: "AVAILABLE",
      metadata: optionalValue(formData, "metadata"),
      storagePath: stored.storagePath,
      sha256Hash: stored.sha256Hash,
      responsibleId: requireField(formData, "responsibleId", "Responsable")
    }
  });
  const itemVersion = await prisma.configurationItemVersion.create({
    data: {
      itemId: item.id,
      version,
      storagePath: stored.storagePath,
      sha256Hash: stored.sha256Hash,
      comment: "Version inicial registrada.",
      createdById: user.id,
      changeRequestId: optionalValue(formData, "changeRequestId"),
      changeOrderId: optionalValue(formData, "changeOrderId")
    }
  });
  try {
    await linkVersionToWorkItemArtifact({
      workItemId: artifactSelection.workItemId,
      artifactRequirementId: artifactSelection.artifactRequirementId,
      itemId: item.id,
      itemVersionId: itemVersion.id,
      changeRequestId: optionalValue(formData, "changeRequestId"),
      changeOrderId: optionalValue(formData, "changeOrderId"),
      submittedById: user.id,
      notes: "Version inicial registrada."
    });
  } catch (error) {
    go(formData, error instanceof Error ? error.message : "No se pudo asociar la version al artefacto requerido.", "error");
  }
  await audit({ userId: user.id, module: "ecs", action: "create", next: { item: item.code, hash: stored.sha256Hash } });
  go(formData, "ECS registrado con hash SHA-256.");
}

export async function checkOutAction(formData: FormData) {
  const user = await requireUser("config.versions.manage");
  const itemId = requireField(formData, "itemId", "ECS");
  const activeLock = await prisma.configurationItemLock.findFirst({ where: { itemId, status: "ACTIVE" } });
  if (activeLock) go(formData, "El ECS ya tiene un bloqueo activo.", "error");
  await prisma.configurationItemLock.create({
    data: { itemId, userId: user.id, reason: optionalValue(formData, "reason") }
  });
  await prisma.configurationItem.update({ where: { id: itemId }, data: { status: "LOCKED" } });
  await audit({ userId: user.id, module: "versiones", action: "checkout", next: { itemId } });
  go(formData, "Check-out registrado y ECS bloqueado.");
}

export async function checkInAction(formData: FormData) {
  const user = await requireUser("config.versions.manage");
  const itemId = requireField(formData, "itemId", "ECS");
  const comment = requireField(formData, "comment", "Comentario de check-in");
  const version = requireField(formData, "version", "Version");
  const file = fileValue(formData, "file");
  if (!file) go(formData, "El archivo versionado es obligatorio.", "error");
  const lock = await prisma.configurationItemLock.findFirst({ where: { itemId, status: "ACTIVE" } });
  if (!lock || (lock.userId !== user.id && user.roleSlug !== "BIBLIOTECARIO")) {
    go(formData, "Solo el usuario con bloqueo activo puede hacer check-in.", "error");
  }
  const artifactSelection = await validateArtifactSelection(formData);
  const item = await prisma.configurationItem.findUniqueOrThrow({ where: { id: itemId }, include: { project: true } });
  const stored = await saveUploadedFile(file, `ecs/${item.project.code}`, `${item.code}-${version}-${file.name}`);
  const changeOrderId = optionalValue(formData, "changeOrderId");
  if (changeOrderId && (!artifactSelection.workItemId || !artifactSelection.artifactRequirementId)) {
    go(formData, "Para una orden de cambio, cada version debe asociarse a un work item y artefacto requerido.", "error");
  }
  const itemVersion = await prisma.configurationItemVersion.create({
    data: {
      itemId,
      version,
      storagePath: stored.storagePath,
      sha256Hash: stored.sha256Hash,
      comment,
      createdById: user.id,
      changeRequestId: optionalValue(formData, "changeRequestId"),
      changeOrderId,
      gitBranch: optionalValue(formData, "gitBranch"),
      gitCommit: optionalValue(formData, "gitCommit"),
      gitPushRef: optionalValue(formData, "gitPushRef")
    }
  });
  try {
    await linkVersionToWorkItemArtifact({
      workItemId: artifactSelection.workItemId,
      artifactRequirementId: artifactSelection.artifactRequirementId,
      itemId,
      itemVersionId: itemVersion.id,
      changeRequestId: optionalValue(formData, "changeRequestId"),
      changeOrderId,
      submittedById: user.id,
      notes: comment
    });
  } catch (error) {
    go(formData, error instanceof Error ? error.message : "No se pudo asociar la version al artefacto requerido.", "error");
  }
  await prisma.configurationItem.update({
    where: { id: itemId },
    data: { currentVersion: version, storagePath: stored.storagePath, sha256Hash: stored.sha256Hash, status: "AVAILABLE" }
  });
  await prisma.configurationItemLock.update({ where: { id: lock!.id }, data: { status: "RELEASED", unlockedAt: new Date() } });
  await audit({ userId: user.id, module: "versiones", action: "checkin", next: { itemId, version, hash: stored.sha256Hash } });
  go(formData, "Check-in registrado y bloqueo liberado.");
}

export async function forceUnlockAction(formData: FormData) {
  const user = await requireUser("config.locks.manage");
  const lockId = requireField(formData, "lockId", "Bloqueo");
  const forceReason = requireField(formData, "forceReason", "Motivo de desbloqueo forzado");
  const lock = await prisma.configurationItemLock.findUniqueOrThrow({ where: { id: lockId } });
  await prisma.configurationItemLock.update({
    where: { id: lockId },
    data: { status: "FORCED", forcedById: user.id, forceReason, unlockedAt: new Date() }
  });
  await prisma.configurationItem.update({ where: { id: lock.itemId }, data: { status: "AVAILABLE" } });
  await audit({ userId: user.id, module: "bloqueos", action: "force_unlock", previous: lock, next: { forceReason } });
  go(formData, "Bloqueo liberado por contingencia.");
}

export async function transferLibraryAction(formData: FormData) {
  const user = await requireUser("config.libraries.manage");
  const itemId = requireField(formData, "itemId", "ECS");
  const toLibraryId = requireField(formData, "toLibraryId", "Biblioteca destino");
  const reason = requireField(formData, "reason", "Motivo");
  const item = await prisma.configurationItem.findUniqueOrThrow({ where: { id: itemId } });
  const activeLock = await prisma.configurationItemLock.findFirst({ where: { itemId, status: "ACTIVE" } });
  if (activeLock) go(formData, "No se puede transferir un ECS bloqueado.", "error");
  await prisma.libraryTransfer.create({
    data: {
      itemId,
      fromLibraryId: item.libraryId,
      toLibraryId,
      userId: user.id,
      reason,
      status: "COMPLETED",
      completedAt: new Date()
    }
  });
  await prisma.configurationItem.update({ where: { id: itemId }, data: { libraryId: toLibraryId } });
  await audit({ userId: user.id, module: "bibliotecas", action: "transfer", previous: { libraryId: item.libraryId }, next: { toLibraryId } });
  go(formData, "Transferencia de biblioteca registrada.");
}

export async function createBaselineAction(formData: FormData) {
  const user = await requireUser("config.baselines.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const versionIds = formData.getAll("versionIds").map(String).filter(Boolean);
  if (versionIds.length === 0) go(formData, "Seleccione versiones exactas de ECS.", "error");
  const baseline = await prisma.baseline.create({
    data: {
      code: requireField(formData, "code", "Codigo").toUpperCase(),
      projectId,
      name: requireField(formData, "name", "Nombre"),
      description: optionalValue(formData, "description"),
      milestone: optionalValue(formData, "milestone"),
      status: "FROZEN",
      createdById: user.id,
      frozenAt: new Date()
    }
  });
  const versions = await prisma.configurationItemVersion.findMany({ where: { id: { in: versionIds } } });
  for (const version of versions) {
    await prisma.baselineItem.create({
      data: {
        baselineId: baseline.id,
        itemId: version.itemId,
        itemVersionId: version.id,
        versionLabel: version.version
      }
    });
  }
  await audit({ userId: user.id, module: "lineas-base", action: "freeze", next: { baseline: baseline.code, items: versions.length } });
  go(formData, "Linea base creada y congelada.");
}

export async function validateIntegrityAction(formData: FormData) {
  const user = await requireUser("admin.integrity.read");
  const itemId = requireField(formData, "itemId", "ECS");
  const item = await prisma.configurationItem.findUniqueOrThrow({ where: { id: itemId } });
  if (!item.storagePath || !item.sha256Hash) go(formData, "El ECS no tiene archivo o hash registrado.", "error");
  const actualHash = await sha256File(path.join(/*turbopackIgnore: true*/ process.cwd(), item.storagePath));
  if (actualHash !== item.sha256Hash) {
    await prisma.integrityAlert.create({
      data: {
        projectId: item.projectId,
        itemId: item.id,
        expectedHash: item.sha256Hash,
        actualHash,
        detail: "Discrepancia SHA-256 detectada en validacion manual."
      }
    });
    await audit({ userId: user.id, module: "integridad", action: "mismatch", next: { itemId, actualHash } });
    go(formData, "Discrepancia detectada. Se genero alerta de integridad.", "error");
  }
  await audit({ userId: user.id, module: "integridad", action: "ok", next: { itemId } });
  go(formData, "Integridad validada correctamente.");
}

export async function createIncidentAction(formData: FormData) {
  const user = await requireUser("support.incidents.manage");
  const projectId = requireField(formData, "projectId", "Proyecto");
  const incident = await prisma.incident.create({
    data: {
      ticketId: await nextTicket("INC", "incident"),
      projectId,
      reportedById: user.id,
      title: requireField(formData, "title", "Titulo"),
      severity: requireField(formData, "severity", "Severidad") as never,
      description: requireField(formData, "description", "Descripcion"),
      reproductionSteps: requireField(formData, "reproductionSteps", "Pasos de reproduccion"),
      affectedItemId: optionalValue(formData, "affectedItemId"),
      assignedToId: optionalValue(formData, "assignedToId")
    }
  });
  await audit({ userId: user.id, module: "incidencias", action: "create", next: { ticketId: incident.ticketId } });
  go(formData, "Incidencia registrada.");
}

export async function updateIncidentStatusAction(formData: FormData) {
  const user = await requireUser("support.incidents.manage");
  const id = requireField(formData, "id", "Incidencia");
  const status = requireField(formData, "status", "Estado") as never;
  const before = await prisma.incident.findUnique({ where: { id } });
  await prisma.incident.update({ where: { id }, data: { status } });
  await audit({ userId: user.id, module: "incidencias", action: "status", previous: before, next: { id, status } });
  go(formData, "Estado de incidencia actualizado.");
}

export async function createChangeRequestAction(formData: FormData) {
  const user = await requireUser("changes.requests.manage");
  const missing = missingChangeFields(formData);
  if (missing.length > 0) {
    go(formData, `Solicitud observada por formato. Faltan: ${missing.join(", ")}.`, "error");
  }
  const projectId = value(formData, "projectId");
  const priority = value(formData, "priority") as never;
  const originIncidentId = optionalValue(formData, "originIncidentId");
  const title = value(formData, "title");
  const description = value(formData, "description");
  const justification = value(formData, "justification");
  const classification = classifyChange({ title, description, justification, priority, originIncidentId });
  const change = await prisma.changeRequest.create({
    data: {
      ticketId: await nextTicket("SC", "changeRequest"),
      projectId,
      requesterId: user.id,
      title,
      description,
      justification,
      priority,
      type: classification.type,
      originIncidentId,
      status: "INITIAL_VALIDATION",
      classificationCriteria: classification.criteria
    }
  });
  const affectedItemId = optionalValue(formData, "affectedItemId");
  if (affectedItemId) {
    await prisma.changeRequestItem.create({ data: { changeRequestId: change.id, itemId: affectedItemId } });
  }
  await audit({ userId: user.id, module: "solicitudes", action: "create", next: { ticketId: change.ticketId, classification } });
  go(formData, "Solicitud creada y enviada a validacion inicial.");
}

export async function observeFormatAction(formData: FormData) {
  const user = await requireUser("changes.requests.manage");
  const id = requireField(formData, "id", "Solicitud");
  const observations = requireField(formData, "observations", "Observaciones");
  const change = await prisma.changeRequest.update({
    where: { id },
    data: { status: "FORMAT_OBSERVED", observations }
  });
  await notify(change.requesterId, "Solicitud observada por formato", `${change.ticketId}: ${observations}`, "/cambios/solicitudes", "WARNING");
  await audit({ userId: user.id, module: "solicitudes", action: "observe_format", next: { id, observations } });
  go(formData, "Solicitud devuelta al solicitante.");
}

export async function resubmitChangeRequestAction(formData: FormData) {
  const user = await requireUser("changes.requests.manage");
  const id = requireField(formData, "id", "Solicitud");
  const title = requireField(formData, "title", "Titulo");
  const description = requireField(formData, "description", "Descripcion");
  const justification = requireField(formData, "justification", "Justificacion");
  const priority = requireField(formData, "priority", "Prioridad") as never;
  const originIncidentId = optionalValue(formData, "originIncidentId");
  const classification = classifyChange({ title, description, justification, priority, originIncidentId });
  await prisma.changeRequest.update({
    where: { id },
    data: { title, description, justification, priority, type: classification.type, classificationCriteria: classification.criteria, status: "INITIAL_VALIDATION" }
  });
  await audit({ userId: user.id, module: "solicitudes", action: "resubmit", next: { id } });
  go(formData, "Solicitud corregida y reenviada.");
}

export async function validateAlignmentAction(formData: FormData) {
  const user = await requireUser("changes.requests.manage");
  const id = requireField(formData, "id", "Solicitud");
  const decision = requireField(formData, "decision", "Decision");
  const reason = optionalValue(formData, "reason");
  const change = await prisma.changeRequest.findUniqueOrThrow({ where: { id } });
  if (decision === "NOT_ALIGNED" && !reason) go(formData, "El motivo de rechazo es obligatorio.", "error");
  if (decision === "NOT_ALIGNED") {
    await prisma.changeRequest.update({
      where: { id },
      data: { status: "ALIGNMENT_REJECTED", alignmentDecision: "NOT_ALIGNED", alignmentReason: reason, alignedById: user.id }
    });
    await notify(change.requesterId, "Solicitud rechazada por alineacion", `${change.ticketId}: ${reason}`, "/cambios/solicitudes", "ERROR");
    await audit({ userId: user.id, module: "solicitudes", action: "alignment_reject", next: { id, reason } });
    go(formData, "Solicitud rechazada por alineacion.");
  }
  const requiredMissing = [change.title, change.description, change.justification, change.priority].some((field) => !field);
  if (requiredMissing) {
    await prisma.changeRequest.update({ where: { id }, data: { status: "FORMAT_OBSERVED", observations: "Campos obligatorios incompletos." } });
    await notify(change.requesterId, "Solicitud observada por formato", `${change.ticketId}: campos obligatorios incompletos.`, "/cambios/solicitudes", "WARNING");
    go(formData, "Solicitud observada por formato.");
  }
  await prisma.changeRequest.update({
    where: { id },
    data: { status: "CLASSIFIED", alignmentDecision: "ALIGNED", alignmentReason: reason, alignedById: user.id, formalRegisteredAt: new Date() }
  });
  await audit({ userId: user.id, module: "solicitudes", action: "alignment_approve", next: { id } });
  go(formData, "Solicitud alineada, registrada formalmente y clasificada.");
}

export async function createImpactAssessmentAction(formData: FormData) {
  const user = await requireUser("changes.impact.manage");
  const changeRequestId = requireField(formData, "changeRequestId", "Solicitud");
  const change = await prisma.changeRequest.findUniqueOrThrow({ where: { id: changeRequestId } });
  if (!["CLASSIFIED", "IMPACT_ANALYSIS"].includes(change.status)) {
    go(formData, "La solicitud debe estar clasificada antes de evaluar impacto.", "error");
  }
  const costEstimated = numberValue(formData, "costEstimated");
  const timeEstimatedHours = numberValue(formData, "timeEstimatedHours");
  const highImpact = value(formData, "highImpact") === "on" || costEstimated >= 5000 || timeEstimatedHours >= 80 || change.priority === "CRITICAL";
  await prisma.impactAssessment.upsert({
    where: { changeRequestId },
    create: {
      changeRequestId,
      costEstimated,
      timeEstimatedHours,
      risks: requireField(formData, "risks", "Riesgos"),
      requiredResources: requireField(formData, "requiredResources", "Recursos"),
      technicalImpact: requireField(formData, "technicalImpact", "Impacto tecnico"),
      functionalImpact: requireField(formData, "functionalImpact", "Impacto funcional"),
      affectedItemsImpact: requireField(formData, "affectedItemsImpact", "ECS afectados"),
      roi: requireField(formData, "roi", "Beneficio o ROI"),
      highImpact,
      route: highImpact ? "CCB" : "TECHNICAL_LEAD",
      assessedById: user.id
    },
    update: {
      costEstimated,
      timeEstimatedHours,
      risks: requireField(formData, "risks", "Riesgos"),
      requiredResources: requireField(formData, "requiredResources", "Recursos"),
      technicalImpact: requireField(formData, "technicalImpact", "Impacto tecnico"),
      functionalImpact: requireField(formData, "functionalImpact", "Impacto funcional"),
      affectedItemsImpact: requireField(formData, "affectedItemsImpact", "ECS afectados"),
      roi: requireField(formData, "roi", "Beneficio o ROI"),
      highImpact,
      route: highImpact ? "CCB" : "TECHNICAL_LEAD",
      assessedById: user.id
    }
  });
  if (highImpact) {
    await prisma.ccbReview.create({ data: { changeRequestId, status: "PENDING", scheduledAt: new Date() } });
  } else {
    await prisma.technicalApproval.upsert({
      where: { changeRequestId },
      create: { changeRequestId, reviewerId: user.id, decision: "PENDING" },
      update: { decision: "PENDING" }
    });
  }
  await prisma.changeRequest.update({ where: { id: changeRequestId }, data: { status: highImpact ? "CCB_REVIEW" : "FAST_APPROVAL" } });
  await audit({ userId: user.id, module: "impacto", action: "assess", next: { changeRequestId, highImpact } });
  go(formData, highImpact ? "Impacto alto derivado a CCB." : "Impacto bajo derivado a aprobacion rapida.");
}

export async function technicalDecisionAction(formData: FormData) {
  const user = await requireUser("changes.technical.manage");
  const changeRequestId = requireField(formData, "changeRequestId", "Solicitud");
  const decision = requireField(formData, "decision", "Decision") as "APPROVED" | "REJECTED";
  const reason = optionalValue(formData, "reason");
  if (decision === "REJECTED" && !reason) go(formData, "El motivo de rechazo es obligatorio.", "error");
  const change = await prisma.changeRequest.findUniqueOrThrow({ where: { id: changeRequestId } });
  await prisma.technicalApproval.upsert({
    where: { changeRequestId },
    create: { changeRequestId, reviewerId: user.id, decision, reason, decidedAt: new Date() },
    update: { reviewerId: user.id, decision, reason, decidedAt: new Date() }
  });
  await prisma.changeRequest.update({ where: { id: changeRequestId }, data: { status: decision === "APPROVED" ? "APPROVED" : "REJECTED" } });
  if (decision === "REJECTED") {
    await notify(change.requesterId, "Solicitud rechazada por lider tecnico", `${change.ticketId}: ${reason}`, "/cambios/solicitudes", "ERROR");
  }
  await audit({ userId: user.id, module: "aprobacion-tecnica", action: decision.toLowerCase(), next: { changeRequestId, reason } });
  go(formData, decision === "APPROVED" ? "Cambio aprobado por lider tecnico." : "Cambio rechazado y notificado.");
}

export async function ccbDecisionAction(formData: FormData) {
  const user = await requireUser("changes.ccb.manage");
  const reviewId = requireField(formData, "reviewId", "Revision CCB");
  const decision = requireField(formData, "decision", "Decision") as "APPROVED" | "REJECTED" | "POSTPONED";
  const resolution = requireField(formData, "resolution", "Resolucion o motivo");
  const review = await prisma.ccbReview.findUniqueOrThrow({ where: { id: reviewId }, include: { changeRequest: true } });
  await prisma.ccbVote.upsert({
    where: { reviewId_voterId: { reviewId, voterId: user.id } },
    create: { reviewId, voterId: user.id, decision, comment: optionalValue(formData, "comment") },
    update: { decision, comment: optionalValue(formData, "comment") }
  });
  await prisma.ccbResolution.upsert({
    where: { reviewId },
    create: { reviewId, decision, resolution, issuedById: user.id },
    update: { decision, resolution, issuedById: user.id, issuedAt: new Date() }
  });
  await prisma.ccbReview.update({ where: { id: reviewId }, data: { status: decision, summary: resolution, reviewedAt: new Date() } });
  const status = decision === "APPROVED" ? "APPROVED" : decision === "REJECTED" ? "REJECTED" : "CCB_REVIEW";
  await prisma.changeRequest.update({ where: { id: review.changeRequestId }, data: { status } });
  if (decision === "REJECTED") {
    await notify(review.changeRequest.requesterId, "Solicitud rechazada por CCB", `${review.changeRequest.ticketId}: ${resolution}`, "/cambios/solicitudes", "ERROR");
  }
  await audit({ userId: user.id, module: "ccb", action: decision.toLowerCase(), next: { reviewId, resolution } });
  go(formData, "Resolucion CCB registrada.");
}

export async function createChangeOrderAction(formData: FormData) {
  const user = await requireUser("changes.orders.manage");
  const changeRequestId = requireField(formData, "changeRequestId", "Solicitud aprobada");
  const change = await prisma.changeRequest.findUniqueOrThrow({ where: { id: changeRequestId } });
  if (change.status !== "APPROVED") go(formData, "Solo se puede crear orden desde solicitud aprobada.", "error");
  const order = await prisma.changeOrder.create({
    data: {
      code: await nextTicket("OC", "changeOrder"),
      changeRequestId,
      projectId: change.projectId,
      developerId: requireField(formData, "developerId", "Desarrollador"),
      priority: requireField(formData, "priority", "Prioridad") as never,
      dueDate: optionalValue(formData, "dueDate") ? new Date(value(formData, "dueDate")) : undefined,
      estimatedHours: numberValue(formData, "estimatedHours"),
      peopleResources: requireField(formData, "peopleResources", "Personas asignadas"),
      environment: requireField(formData, "environment", "Ambiente")
    }
  });
  await prisma.changeRequest.update({ where: { id: changeRequestId }, data: { status: "RESOURCE_ASSIGNMENT" } });
  await prisma.changeOrderAssignment.create({
    data: { changeOrderId: order.id, userId: order.developerId!, roleInOrder: "Desarrollador asignado", hoursAssigned: order.estimatedHours }
  });
  await audit({ userId: user.id, module: "ordenes", action: "create", next: { code: order.code } });
  go(formData, "Orden de cambio creada y asignada.");
}

export async function startImplementationAction(formData: FormData) {
  const user = await requireUser("dev.orders.manage");
  const orderId = requireField(formData, "orderId", "Orden");
  const gitBranch = requireField(formData, "gitBranch", "Rama GitFlow");
  const order = await prisma.changeOrder.findUniqueOrThrow({
    where: { id: orderId },
    include: { project: true, changeRequest: true }
  });
  if (order.developerId !== user.id && user.roleSlug !== "BIBLIOTECARIO") {
    go(formData, "Solo el desarrollador asignado puede iniciar la implementacion.", "error");
  }
  if (value(formData, "createGithubBranch") === "on") {
    await createGithubBranch(order.project, await requireGithubToken(formData, user.id), gitBranch, optionalValue(formData, "baseBranch") ?? "main");
  }
  await prisma.changeOrder.update({ where: { id: orderId }, data: { gitBranch, status: "IMPLEMENTING" } });
  await prisma.changeRequest.update({ where: { id: order.changeRequestId }, data: { status: "IMPLEMENTATION" } });
  await audit({ userId: user.id, module: "implementacion", action: "start", next: { orderId, gitBranch } });
  go(formData, "Implementacion iniciada.");
}

export async function recordUnitTestAction(formData: FormData) {
  const user = await requireUser("dev.unit.manage");
  const changeOrderId = requireField(formData, "changeOrderId", "Orden");
  const result = requireField(formData, "result", "Resultado") as "PASSED" | "FAILED";
  const errors = optionalValue(formData, "errors");
  const order = await prisma.changeOrder.findUniqueOrThrow({
    where: { id: changeOrderId },
    include: { changeRequest: true, project: true }
  });
  if (result === "FAILED" && !errors) go(formData, "Debe registrar errores de pruebas unitarias fallidas.", "error");
  if (result === "PASSED" && (!optionalValue(formData, "gitCommit") || !optionalValue(formData, "gitPushRef"))) {
    go(formData, "Commit y push son obligatorios cuando las pruebas unitarias pasan.", "error");
  }
  const gitCommit = optionalValue(formData, "gitCommit");
  const gitPushRef = optionalValue(formData, "gitPushRef");
  await prisma.unitTest.create({
    data: {
      changeOrderId,
      itemVersionId: optionalValue(formData, "itemVersionId"),
      executedById: user.id,
      result,
      errors,
      notes: optionalValue(formData, "notes")
    }
  });
  if (result === "FAILED") {
    await prisma.changeOrder.update({
      where: { id: changeOrderId },
      data: { status: "UNIT_TESTING", gitCommit, gitPushRef }
    });
    await prisma.changeRequest.update({ where: { id: order.changeRequestId }, data: { status: "UNIT_TESTING" } });
    await audit({ userId: user.id, module: "pruebas-unitarias", action: result.toLowerCase(), next: { changeOrderId } });
    go(formData, "Pruebas unitarias fallidas registradas.");
  }

  let pullUrl: string | null = null;
  if (value(formData, "createGithubPullRequest") === "on" && order.gitBranch && order.project.githubOwner && order.project.githubRepo) {
    try {
      const token = await optionalGithubToken(user.id);
      if (token) {
        const pull = await ensureGithubPullRequest(order.project, token, {
          title: `[${order.code}] ${order.changeRequest.title}`,
          head: order.gitBranch,
          base: optionalValue(formData, "baseBranch") ?? "main",
          body: [
            `Orden: ${order.code}`,
            `Solicitud: ${order.changeRequest.ticketId}`,
            `Commit: ${gitCommit}`,
            "",
            optionalValue(formData, "notes") ?? "Pruebas unitarias registradas como OK en SGCSW."
          ].join("\n")
        });
        pullUrl = pull.htmlUrl;
        await audit({ userId: user.id, module: "github", action: pull.created ? "pull_request_auto_create" : "pull_request_auto_exists", next: { changeOrderId, pull } });
      }
    } catch (error) {
      await audit({ userId: user.id, module: "github", action: "pull_request_auto_failed", next: { changeOrderId, error: error instanceof Error ? error.message : String(error) } });
    }
  }

  const handoff = await handoffOrderToQa({
    changeOrderId,
    actorUserId: user.id,
    gitCommit,
    gitPushRef,
    githubPullRequestUrl: pullUrl,
    source: "unit_tests"
  });
  await audit({ userId: user.id, module: "pruebas-unitarias", action: result.toLowerCase(), next: { changeOrderId } });
  go(formData, pullUrl ? `Pruebas OK. PR creado/reutilizado y QA notificado (${handoff.notifications}).` : `Pruebas OK. Orden lista para QA y QA notificado (${handoff.notifications}).`);
}

export async function recordQaTestAction(formData: FormData) {
  const user = await requireUser("qa.tests.manage");
  const changeOrderId = requireField(formData, "changeOrderId", "Orden");
  const result = requireField(formData, "result", "Resultado") as "PASSED" | "FAILED";
  const order = await prisma.changeOrder.findUniqueOrThrow({ where: { id: changeOrderId } });
  if (result === "PASSED") {
    const missingArtifacts = await validateArtifactGateForQa(changeOrderId);
    if (missingArtifacts.length > 0) {
      go(formData, `QA no puede aprobar. Pendiente: ${missingArtifacts.slice(0, 6).join("; ")}${missingArtifacts.length > 6 ? "..." : ""}`, "error");
    }
  }
  const qaTest = await prisma.qaTest.create({
    data: {
      changeOrderId,
      executedById: user.id,
      type: requireField(formData, "type", "Tipo de prueba") as never,
      result,
      notes: optionalValue(formData, "notes")
    }
  });
  if (result === "FAILED") {
    const description = requireField(formData, "defectDescription", "Descripcion del defecto");
    await prisma.defect.create({
      data: {
        code: await nextTicket("DEF", "defect"),
        qaTestId: qaTest.id,
        changeOrderId,
        severity: (optionalValue(formData, "severity") ?? "MEDIUM") as never,
        description,
        responsibleId: order.developerId
      }
    });
    await prisma.changeOrder.update({ where: { id: changeOrderId }, data: { status: "QA_FAILED" } });
    await prisma.changeRequest.update({ where: { id: order.changeRequestId }, data: { status: "QA_DEFECTS" } });
    if (order.developerId) {
      await notify(order.developerId, "Defecto QA asignado", `${order.code} tiene defecto QA para corregir.`, "/qa/defectos", "WARNING");
    }
    await audit({ userId: user.id, module: "qa", action: "failed", next: { changeOrderId, qaTest: qaTest.id } });
    go(formData, "QA fallo y se registro defecto.");
  }
  await prisma.changeOrder.update({ where: { id: changeOrderId }, data: { status: "READY_FOR_UAT" } });
  await prisma.changeRequest.update({ where: { id: order.changeRequestId }, data: { status: "UAT" } });
  await audit({ userId: user.id, module: "qa", action: "passed", next: { changeOrderId, qaTest: qaTest.id } });
  go(formData, "QA aprobado. Continua UAT.");
}

export async function updateDefectStatusAction(formData: FormData) {
  const user = await requireUser("qa.defects.manage");
  const id = requireField(formData, "id", "Defecto");
  const status = requireField(formData, "status", "Estado") as never;
  const defect = await prisma.defect.update({ where: { id }, data: { status } });
  if (["FIXED", "RETEST", "CLOSED"].includes(status)) {
    await prisma.changeOrder.update({ where: { id: defect.changeOrderId }, data: { status: "READY_FOR_QA" } });
  }
  await audit({ userId: user.id, module: "defectos", action: "status", next: { id, status } });
  go(formData, "Defecto actualizado.");
}

export async function recordUatAction(formData: FormData) {
  const user = await requireUser("qa.uat.manage");
  const changeRequestId = requireField(formData, "changeRequestId", "Solicitud");
  const result = requireField(formData, "result", "Resultado UAT") as "ACCEPTED" | "OBSERVED";
  const changeOrderId = optionalValue(formData, "changeOrderId");
  const observations = optionalValue(formData, "observations");
  if (result === "OBSERVED" && !observations) go(formData, "Las observaciones UAT son obligatorias.", "error");
  const acceptanceFile = result === "ACCEPTED" ? fileValue(formData, "acceptanceFile") : null;
  if (result === "ACCEPTED" && !acceptanceFile) go(formData, "El acta de aceptacion es obligatoria para UAT OK.", "error");
  const uat = await prisma.uatTest.create({
    data: { changeRequestId, changeOrderId, executedById: user.id, result, observations }
  });
  if (result === "ACCEPTED") {
    const stored = await saveUploadedFile(acceptanceFile!, `acceptance/${changeRequestId}`);
    await prisma.acceptanceRecord.create({
      data: {
        changeRequestId,
        uatTestId: uat.id,
        signedById: user.id,
        documentPath: stored.storagePath,
        sha256Hash: stored.sha256Hash
      }
    });
    await prisma.changeRequest.update({ where: { id: changeRequestId }, data: { status: "UAT_ACCEPTED" } });
    if (changeOrderId) await prisma.changeOrder.update({ where: { id: changeOrderId }, data: { status: "READY_FOR_INTEGRATION" } });
    await audit({ userId: user.id, module: "uat", action: "accepted", next: { changeRequestId, hash: stored.sha256Hash } });
    go(formData, "UAT aceptado y acta registrada.");
  }
  await prisma.changeRequest.update({ where: { id: changeRequestId }, data: { status: "UAT_OBSERVATIONS", observations } });
  if (changeOrderId) await prisma.changeOrder.update({ where: { id: changeOrderId }, data: { status: "UAT_FAILED" } });
  await audit({ userId: user.id, module: "uat", action: "observed", next: { changeRequestId, observations } });
  go(formData, "Observaciones UAT registradas.");
}

export async function integrateChangeAction(formData: FormData) {
  const user = await requireUser("dev.orders.manage");
  const changeOrderId = requireField(formData, "changeOrderId", "Orden");
  const order = await prisma.changeOrder.findUniqueOrThrow({ where: { id: changeOrderId }, include: { changeRequest: true } });
  if (order.changeRequest.status !== "UAT_ACCEPTED") go(formData, "UAT debe estar aceptado antes de integrar.", "error");
  const semver = requireField(formData, "semver", "Nueva version SemVer");
  const integrationBranch = requireField(formData, "integrationBranch", "Rama destino");
  const integrationCommit = requireField(formData, "integrationCommit", "Commit de integracion");
  await prisma.changeOrder.update({ where: { id: changeOrderId }, data: { status: "INTEGRATED", integrationBranch, integrationCommit } });
  await prisma.changeRequest.update({ where: { id: order.changeRequestId }, data: { status: "FINAL_VALIDATION" } });
  await audit({ userId: user.id, module: "integracion", action: "merge", next: { changeOrderId, semver, integrationBranch, integrationCommit } });
  go(formData, "Integracion registrada. Pendiente validacion final QA.");
}

export async function finalQualityAction(formData: FormData) {
  const user = await requireUser("qa.final.manage");
  const changeOrderId = requireField(formData, "changeOrderId", "Orden");
  const result = requireField(formData, "result", "Resultado") as "PASSED" | "FAILED";
  const order = await prisma.changeOrder.findUniqueOrThrow({ where: { id: changeOrderId }, include: { changeRequest: true } });
  if (result === "FAILED") {
    const notes = requireField(formData, "notes", "Observaciones de calidad");
    await prisma.qaTest.create({ data: { changeOrderId, executedById: user.id, type: "FINAL_QUALITY", result, notes } });
    await prisma.changeRequest.update({ where: { id: order.changeRequestId }, data: { status: "FINAL_VALIDATION", observations: notes } });
    await audit({ userId: user.id, module: "validacion-final", action: "failed", next: { changeOrderId, notes } });
    go(formData, "Validacion final fallida. Requiere correccion integrada.", "error");
  }
  await prisma.qaTest.create({ data: { changeOrderId, executedById: user.id, type: "FINAL_QUALITY", result, notes: optionalValue(formData, "notes") } });
  const semver = optionalValue(formData, "semver") ?? nextSemver("1.0.0", order.changeRequest.type);
  const release = await prisma.release.create({
    data: {
      projectId: order.projectId,
      changeRequestId: order.changeRequestId,
      changeOrderId,
      version: semver,
      semver,
      environment: optionalValue(formData, "environment") ?? order.environment,
      status: "APPROVED",
      responsibleId: user.id,
      targetBranch: order.integrationBranch,
      mergeCommit: order.integrationCommit,
      tagName: `v${semver}`,
      approvedAt: new Date()
    }
  });
  await prisma.changeRequest.update({ where: { id: order.changeRequestId }, data: { status: "RELEASE_APPROVED" } });
  await audit({ userId: user.id, module: "validacion-final", action: "release_approved", next: { release: release.id, semver } });
  go(formData, "Release aprobado y senal enviada al gestor de liberacion.");
}

export async function executeReleaseAction(formData: FormData) {
  const user = await requireUser("release.manage");
  const releaseId = requireField(formData, "releaseId", "Release");
  const result = requireField(formData, "result", "Resultado");
  const release = await prisma.release.findUniqueOrThrow({
    where: { id: releaseId },
    include: { project: true, changeRequest: true }
  });
  if (release.status !== "APPROVED") go(formData, "El release debe estar aprobado. El gestor de liberacion no decide aprobaciones.", "error");
  const token = optionalValue(formData, "createGithubTag") === "on" ? await requireGithubToken(formData, user.id) : null;
  if (token && release.tagName && release.mergeCommit) {
    await createGithubTag(release.project, token, release.tagName, release.mergeCommit);
  }
  await prisma.release.update({ where: { id: releaseId }, data: { status: "EXECUTED", result, releasedAt: new Date(), responsibleId: user.id } });
  await prisma.releaseLog.create({ data: { releaseId, level: "INFO", message: result, createdById: user.id } });
  if (release.changeRequestId) {
    await prisma.changeRequest.update({ where: { id: release.changeRequestId }, data: { status: "RELEASED" } });
  }
  if (release.changeRequest?.requesterId) {
    await notify(release.changeRequest.requesterId, "Release ejecutado", `${release.changeRequest.ticketId} liberada en ${release.environment}.`, "/cambios/solicitudes", "SUCCESS");
  }
  await audit({ userId: user.id, module: "liberacion", action: "execute", next: { releaseId, result } });
  go(formData, "Liberacion ejecutada y registrada en log.");
}

export async function closeChangeRequestAction(formData: FormData) {
  const user = await requireUser("changes.requests.manage");
  const id = requireField(formData, "id", "Solicitud");
  const change = await prisma.changeRequest.findUniqueOrThrow({ where: { id }, include: { project: true } });
  if (change.status !== "RELEASED") go(formData, "La solicitud debe estar liberada antes de cerrar.", "error");
  const archive = await writeTextArtifact(
    `archive/${change.project.code}`,
    `${change.ticketId}.txt`,
    `Solicitud ${change.ticketId}\nTitulo: ${change.title}\nEstado final: Cerrada\nFecha: ${new Date().toISOString()}\n`
  );
  await prisma.attachment.create({
    data: {
      projectId: change.projectId,
      ownerType: "CHANGE_REQUEST",
      ownerId: change.id,
      fileName: archive.fileName,
      mimeType: archive.mimeType,
      storagePath: archive.storagePath,
      sha256Hash: archive.sha256Hash,
      version: "cierre",
      uploadedById: user.id
    }
  });
  await prisma.changeRequest.update({ where: { id }, data: { status: "CLOSED", closedAt: new Date() } });
  await notify(change.requesterId, "Solicitud cerrada", `${change.ticketId} cerrada exitosamente.`, "/cambios/solicitudes", "SUCCESS");
  await audit({ userId: user.id, module: "cierre", action: "close", next: { id, archive } });
  go(formData, "Solicitud archivada y cerrada.");
}
