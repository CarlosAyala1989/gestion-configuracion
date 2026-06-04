import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";
import { createHash } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { encryptSecret, githubTokenLast4 } from "../src/lib/github";
const defaultPassword = "Sgcsw2026!";
const sharedGithubToken = process.env.GITHUB_WORKSPACE_TOKEN ?? process.env.GITHUB_TOKEN;

const permissionSeed = [
  ["dashboard.read", "dashboard", "read", "Ver dashboard"],
  ["boards.work.manage", "boards/backlog", "manage", "Gestionar backlog, work items y enlaces de desarrollo"],
  ["boards.sprints.manage", "boards/sprints", "manage", "Gestionar sprints, capacidad y taskboard"],
  ["boards.methodology.manage", "boards/metodologia", "manage", "Gestionar metodologia, fases y cronograma"],
  ["daily.logs.manage", "boards/reportes-diarios", "manage", "Registrar y revisar reportes diarios"],
  ["admin.users.manage", "admin/usuarios", "manage", "Gestionar usuarios"],
  ["admin.roles.manage", "admin/roles", "manage", "Gestionar roles y permisos"],
  ["admin.projects.manage", "admin/proyectos", "manage", "Gestionar proyectos"],
  ["admin.audit.read", "admin/auditoria", "read", "Consultar auditoria"],
  ["admin.integrity.read", "admin/integridad", "read", "Consultar alertas de integridad"],
  ["config.ecs.manage", "configuracion/ecs", "manage", "Gestionar ECS"],
  ["config.versions.manage", "configuracion/versiones", "manage", "Check-out, check-in y versiones"],
  ["config.locks.manage", "configuracion/bloqueos", "manage", "Gestionar bloqueos"],
  ["config.libraries.manage", "configuracion/bibliotecas", "manage", "Transferir bibliotecas"],
  ["config.baselines.manage", "configuracion/lineas-base", "manage", "Gestionar lineas base"],
  ["config.traceability.read", "configuracion/trazabilidad", "read", "Consultar trazabilidad"],
  ["changes.requests.manage", "cambios/solicitudes", "manage", "Gestionar solicitudes de cambio"],
  ["changes.impact.manage", "cambios/evaluacion-impacto", "manage", "Evaluar impacto"],
  ["changes.technical.manage", "cambios/aprobacion-tecnica", "manage", "Aprobacion tecnica"],
  ["changes.ccb.manage", "cambios/ccb", "manage", "Revision CCB"],
  ["changes.orders.manage", "cambios/ordenes", "manage", "Ordenes de cambio"],
  ["dev.orders.manage", "desarrollo/mis-ordenes", "manage", "Ordenes asignadas"],
  ["dev.unit.manage", "desarrollo/pruebas-unitarias", "manage", "Pruebas unitarias"],
  ["qa.tests.manage", "qa/pruebas", "manage", "Pruebas QA"],
  ["qa.defects.manage", "qa/defectos", "manage", "Defectos"],
  ["qa.uat.manage", "qa/uat", "manage", "UAT"],
  ["qa.final.manage", "qa/validacion-final", "manage", "Validacion final"],
  ["release.manage", "liberacion/releases", "manage", "Liberaciones"],
  ["support.incidents.manage", "soporte/incidencias", "manage", "Incidencias"],
  ["reports.read", "reportes", "read", "Reportes filtrables"]
] as const;

const roles = [
  ["ADMINISTRADOR", "Administrador del Sistema", "Gestiona usuarios, roles, proyectos, auditoria e integridad.", false],
  ["SOLICITANTE", "Solicitante / Cliente / Usuario Final", "Registra solicitudes, incidencias y ejecuta UAT.", false],
  ["JEFE_PROYECTO", "Director / Jefe de Proyecto", "Valida alineacion, evalua impacto y asigna recursos.", false],
  ["LIDER_TECNICO", "Lider Tecnico / Analista", "Aprueba o rechaza cambios de bajo impacto.", false],
  ["CCB", "Comite de Control de Cambios", "Evalua cambios de alto impacto.", false],
  ["BIBLIOTECARIO", "Administrador de Configuracion / Bibliotecario", "Gestiona ECS, bibliotecas, bloqueos y lineas base.", false],
  ["DESARROLLADOR", "Desarrollador Asignado", "Implementa cambios, check-in y pruebas unitarias.", false],
  ["QA", "Equipo QA / Tester", "Ejecuta QA, defectos, UAT y validacion final.", false],
  ["SISTEMA_CONFIGURACION", "Sistema Gestor de Configuracion", "Actor logico automatizado del flujo SGCSW.", true],
  ["SISTEMA_LIBERACION", "Sistema Gestor de Liberacion", "Actor logico de ejecucion o registro de release.", true]
] as const;

const rolePermissions: Record<string, string[]> = {
  ADMINISTRADOR: [
    "dashboard.read",
    "boards.work.manage",
    "boards.sprints.manage",
    "boards.methodology.manage",
    "daily.logs.manage",
    "admin.users.manage",
    "admin.roles.manage",
    "admin.projects.manage",
    "admin.audit.read",
    "admin.integrity.read",
    "config.traceability.read",
    "reports.read"
  ],
  SOLICITANTE: [
    "dashboard.read",
    "boards.work.manage",
    "daily.logs.manage",
    "changes.requests.manage",
    "support.incidents.manage",
    "qa.uat.manage",
    "config.traceability.read"
  ],
  JEFE_PROYECTO: [
    "dashboard.read",
    "boards.work.manage",
    "boards.sprints.manage",
    "boards.methodology.manage",
    "daily.logs.manage",
    "admin.projects.manage",
    "changes.requests.manage",
    "changes.impact.manage",
    "changes.orders.manage",
    "config.traceability.read",
    "reports.read"
  ],
  LIDER_TECNICO: [
    "dashboard.read",
    "boards.work.manage",
    "daily.logs.manage",
    "changes.technical.manage",
    "changes.requests.manage",
    "config.traceability.read"
  ],
  CCB: [
    "dashboard.read",
    "boards.work.manage",
    "changes.ccb.manage",
    "changes.requests.manage",
    "config.traceability.read",
    "reports.read"
  ],
  BIBLIOTECARIO: [
    "dashboard.read",
    "boards.work.manage",
    "boards.methodology.manage",
    "daily.logs.manage",
    "config.ecs.manage",
    "config.versions.manage",
    "config.locks.manage",
    "config.libraries.manage",
    "config.baselines.manage",
    "config.traceability.read",
    "reports.read"
  ],
  DESARROLLADOR: [
    "dashboard.read",
    "boards.work.manage",
    "boards.sprints.manage",
    "daily.logs.manage",
    "config.ecs.manage",
    "config.versions.manage",
    "dev.orders.manage",
    "dev.unit.manage",
    "support.incidents.manage",
    "changes.requests.manage"
  ],
  QA: [
    "dashboard.read",
    "boards.work.manage",
    "boards.sprints.manage",
    "daily.logs.manage",
    "qa.tests.manage",
    "qa.defects.manage",
    "qa.uat.manage",
    "qa.final.manage",
    "release.manage",
    "config.traceability.read",
    "reports.read"
  ],
  SISTEMA_CONFIGURACION: ["dashboard.read"],
  SISTEMA_LIBERACION: ["release.manage"]
};

const users = [
  ["admin@sgcsw.local", "Admin SGCSW", "ADMINISTRADOR"],
  ["solicitante@sgcsw.local", "Solicitante Demo", "SOLICITANTE"],
  ["jefe@sgcsw.local", "Jefe de Proyecto Demo", "JEFE_PROYECTO"],
  ["lider@sgcsw.local", "Lider Tecnico Demo", "LIDER_TECNICO"],
  ["ccb@sgcsw.local", "Miembro CCB Demo", "CCB"],
  ["bibliotecario@sgcsw.local", "Bibliotecario Demo", "BIBLIOTECARIO"],
  ["dev@sgcsw.local", "Desarrollador Demo", "DESARROLLADOR"],
  ["qa@sgcsw.local", "QA Tester Demo", "QA"]
] as const;

async function ensureSampleFile(projectCode: string, fileName: string, content: string) {
  const storageDir = process.env.SGCSW_STORAGE_DIR ?? "storage";
  const dir = path.join(process.cwd(), storageDir, "ecs", projectCode);
  await mkdir(dir, { recursive: true });
  const filePath = path.join(dir, fileName);
  await writeFile(filePath, content, "utf8");
  const hash = createHash("sha256").update(content).digest("hex");
  return { storagePath: path.relative(process.cwd(), filePath), sha256Hash: hash };
}

async function main() {
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  const permissionsByCode = new Map<string, { id: string }>();
  for (const [code, module, action, description] of permissionSeed) {
    const permission = await prisma.permission.upsert({
      where: { code },
      create: { code, module, action, description },
      update: { module, action, description }
    });
    permissionsByCode.set(code, permission);
  }

  const rolesBySlug = new Map<string, { id: string }>();
  for (const [slug, name, description, isSystem] of roles) {
    const role = await prisma.role.upsert({
      where: { slug },
      create: { slug, name, description, isSystem },
      update: { name, description, isSystem, active: true }
    });
    rolesBySlug.set(slug, role);
  }

  for (const [slug, codes] of Object.entries(rolePermissions)) {
    const role = rolesBySlug.get(slug);
    if (!role) continue;
    for (const code of codes) {
      const permission = permissionsByCode.get(code);
      if (!permission) continue;
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        create: { roleId: role.id, permissionId: permission.id },
        update: {}
      });
    }
  }

  const usersByEmail = new Map<string, { id: string; roleId: string }>();
  for (const [email, name, roleSlug] of users) {
    const role = rolesBySlug.get(roleSlug);
    if (!role) throw new Error(`Role not found: ${roleSlug}`);
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        email,
        name,
        roleId: role.id,
        passwordHash,
        status: "ACTIVE",
        ...(sharedGithubToken
          ? {
              githubTokenEncrypted: encryptSecret(sharedGithubToken),
              githubTokenLast4: githubTokenLast4(sharedGithubToken)
            }
          : {})
      },
      update: {
        name,
        roleId: role.id,
        status: "ACTIVE",
        ...(sharedGithubToken
          ? {
              githubTokenEncrypted: encryptSecret(sharedGithubToken),
              githubTokenLast4: githubTokenLast4(sharedGithubToken)
            }
          : {})
      }
    });
    usersByEmail.set(email, { id: user.id, roleId: role.id });
  }

  const project = await prisma.project.upsert({
    where: { code: "SGCSW-CORE" },
    create: {
      code: "SGCSW-CORE",
      name: "SGCSW Core",
      description: "Proyecto base del Sistema de Gestion de Configuracion de Software.",
      managerId: usersByEmail.get("jefe@sgcsw.local")!.id,
      createdById: usersByEmail.get("admin@sgcsw.local")!.id,
      githubOwner: "organizacion-demo",
      githubRepo: "sgcsw-core",
      methodologyType: "RUP",
      methodologyNotes: "RUP configurado como ejemplo: Iniciacion, Elaboracion, Construccion y Transicion con entregables obligatorios.",
      methodologyConfiguredAt: new Date()
    },
    update: {
      managerId: usersByEmail.get("jefe@sgcsw.local")!.id,
      githubOwner: "organizacion-demo",
      githubRepo: "sgcsw-core",
      methodologyType: "RUP",
      methodologyNotes: "RUP configurado como ejemplo: Iniciacion, Elaboracion, Construccion y Transicion con entregables obligatorios.",
      methodologyConfiguredAt: new Date()
    }
  });

  for (const user of usersByEmail.values()) {
    await prisma.projectUser.upsert({
      where: { projectId_userId: { projectId: project.id, userId: user.id } },
      create: { projectId: project.id, userId: user.id, roleId: user.roleId, roleNote: "Equipo seed SGCSW" },
      update: { roleId: user.roleId, active: true }
    });
  }

  const libraryByType = new Map<string, { id: string }>();
  for (const type of ["WORK", "INTEGRATION", "SUPPORT", "MASTER"] as const) {
    const library = await prisma.library.upsert({
      where: { projectId_type: { projectId: project.id, type } },
      create: {
        projectId: project.id,
        type,
        name: type === "WORK" ? "Trabajo" : type === "INTEGRATION" ? "Integracion" : type === "SUPPORT" ? "Soporte" : "Maestra",
        description: `Biblioteca ${type.toLowerCase()} del proyecto SGCSW.`
      },
      update: { active: true }
    });
    libraryByType.set(type, library);
  }

  const sample = await ensureSampleFile(
    project.code,
    "auth.controller.ts",
    "export function validateRbacAccess(role: string) { return Boolean(role); }\n"
  );

  const item = await prisma.configurationItem.upsert({
    where: { code: "ECS-API-001" },
    create: {
      code: "ECS-API-001",
      projectId: project.id,
      libraryId: libraryByType.get("WORK")!.id,
      type: "CODE",
      name: "auth.controller.ts",
      description: "Controlador de autenticacion y autorizacion RBAC.",
      currentVersion: "1.0.0",
      status: "AVAILABLE",
      metadata: "lenguaje=TypeScript; capa=backend",
      storagePath: sample.storagePath,
      sha256Hash: sample.sha256Hash,
      responsibleId: usersByEmail.get("bibliotecario@sgcsw.local")!.id
    },
    update: {
      libraryId: libraryByType.get("WORK")!.id,
      storagePath: sample.storagePath,
      sha256Hash: sample.sha256Hash,
      status: "AVAILABLE"
    }
  });

  const srsSample = await ensureSampleFile(
    project.code,
    "SRS.md",
    "# SRS\n\nRequisitos funcionales, casos de uso, narrativas y restricciones del SGCSW.\n"
  );
  const srsItem = await prisma.configurationItem.upsert({
    where: { code: "ECS-SRS-001" },
    create: {
      code: "ECS-SRS-001",
      projectId: project.id,
      libraryId: libraryByType.get("WORK")!.id,
      type: "DOCUMENT",
      name: "SRS.md",
      description: "Especificacion de requisitos del software con casos de uso y narrativas.",
      currentVersion: "1.0.0",
      status: "AVAILABLE",
      metadata: "metodologia=RUP; fase=Elaboracion",
      storagePath: srsSample.storagePath,
      sha256Hash: srsSample.sha256Hash,
      responsibleId: usersByEmail.get("jefe@sgcsw.local")!.id
    },
    update: {
      libraryId: libraryByType.get("WORK")!.id,
      storagePath: srsSample.storagePath,
      sha256Hash: srsSample.sha256Hash,
      status: "AVAILABLE"
    }
  });

  await prisma.configurationItemVersion.upsert({
    where: { itemId_version: { itemId: srsItem.id, version: "1.0.0" } },
    create: {
      itemId: srsItem.id,
      version: "1.0.0",
      storagePath: srsSample.storagePath,
      sha256Hash: srsSample.sha256Hash,
      comment: "SRS inicial para metodologia RUP.",
      createdById: usersByEmail.get("jefe@sgcsw.local")!.id,
      gitBranch: "docs/rup-srs",
      gitCommit: "seed-srs"
    },
    update: {
      storagePath: srsSample.storagePath,
      sha256Hash: srsSample.sha256Hash,
      comment: "SRS inicial para metodologia RUP."
    }
  });

  const sadSample = await ensureSampleFile(
    project.code,
    "SAD.md",
    "# SAD\n\nArquitectura, componentes, decisiones tecnicas y diagramas de clase/secuencia del SGCSW.\n"
  );
  const sadItem = await prisma.configurationItem.upsert({
    where: { code: "ECS-SAD-001" },
    create: {
      code: "ECS-SAD-001",
      projectId: project.id,
      libraryId: libraryByType.get("WORK")!.id,
      type: "DOCUMENT",
      name: "SAD.md",
      description: "Documento de arquitectura de software para el proyecto SGCSW.",
      currentVersion: "1.0.0",
      status: "AVAILABLE",
      metadata: "metodologia=RUP; fase=Elaboracion",
      storagePath: sadSample.storagePath,
      sha256Hash: sadSample.sha256Hash,
      responsibleId: usersByEmail.get("lider@sgcsw.local")!.id
    },
    update: {
      libraryId: libraryByType.get("WORK")!.id,
      storagePath: sadSample.storagePath,
      sha256Hash: sadSample.sha256Hash,
      status: "AVAILABLE"
    }
  });

  await prisma.configurationItemVersion.upsert({
    where: { itemId_version: { itemId: sadItem.id, version: "1.0.0" } },
    create: {
      itemId: sadItem.id,
      version: "1.0.0",
      storagePath: sadSample.storagePath,
      sha256Hash: sadSample.sha256Hash,
      comment: "SAD inicial para metodologia RUP.",
      createdById: usersByEmail.get("lider@sgcsw.local")!.id,
      gitBranch: "docs/rup-sad",
      gitCommit: "seed-sad"
    },
    update: {
      storagePath: sadSample.storagePath,
      sha256Hash: sadSample.sha256Hash,
      comment: "SAD inicial para metodologia RUP."
    }
  });

  await prisma.configurationItemVersion.upsert({
    where: { itemId_version: { itemId: item.id, version: "1.0.0" } },
    create: {
      itemId: item.id,
      version: "1.0.0",
      storagePath: sample.storagePath,
      sha256Hash: sample.sha256Hash,
      comment: "Version inicial seed del ECS.",
      createdById: usersByEmail.get("bibliotecario@sgcsw.local")!.id,
      gitBranch: "main",
      gitCommit: "seed-inicial"
    },
    update: {
      storagePath: sample.storagePath,
      sha256Hash: sample.sha256Hash,
      comment: "Version inicial seed del ECS."
    }
  });

  const incident = await prisma.incident.upsert({
    where: { ticketId: "INC-0001" },
    create: {
      ticketId: "INC-0001",
      projectId: project.id,
      reportedById: usersByEmail.get("solicitante@sgcsw.local")!.id,
      title: "Validacion RBAC incompleta",
      severity: "HIGH",
      description: "El menu debe ocultar acciones no autorizadas por rol.",
      reproductionSteps: "Ingresar con un rol limitado y revisar opciones visibles.",
      affectedItemId: item.id,
      assignedToId: usersByEmail.get("dev@sgcsw.local")!.id,
      status: "DERIVED_TO_CHANGE"
    },
    update: { affectedItemId: item.id, status: "DERIVED_TO_CHANGE" }
  });

  const change = await prisma.changeRequest.upsert({
    where: { ticketId: "SC-0001" },
    create: {
      ticketId: "SC-0001",
      projectId: project.id,
      requesterId: usersByEmail.get("solicitante@sgcsw.local")!.id,
      title: "Agregar validacion de permisos por modulo",
      description: "Fortalecer la validacion de acceso para rutas y acciones SGCSW.",
      justification: "Evitar que usuarios ejecuten acciones fuera de su rol.",
      type: "CORRECTIVE",
      priority: "HIGH",
      originIncidentId: incident.id,
      status: "IMPACT_ANALYSIS",
      observations: "Solicitud seed lista para evaluacion de impacto.",
      classificationCriteria: "Clasificada como correctiva por incidencia origen de control de acceso.",
      alignmentDecision: "ALIGNED",
      alignedById: usersByEmail.get("jefe@sgcsw.local")!.id,
      formalRegisteredAt: new Date()
    },
    update: {
      status: "IMPACT_ANALYSIS",
      originIncidentId: incident.id,
      alignmentDecision: "ALIGNED",
      alignedById: usersByEmail.get("jefe@sgcsw.local")!.id
    }
  });

  await prisma.changeRequestItem.upsert({
    where: { changeRequestId_itemId: { changeRequestId: change.id, itemId: item.id } },
    create: { changeRequestId: change.id, itemId: item.id, relationNote: "ECS afectado por validacion RBAC." },
    update: { relationNote: "ECS afectado por validacion RBAC." }
  });

  const rupPhases = [
    {
      name: "Inicio",
      sortOrder: 1,
      requiredDeliverables: "Vision del producto; alcance inicial; casos de uso de alto nivel; plan SCM inicial; lista preliminar de ECS.",
      acceptanceCriteria: "Alcance, riesgos, roles y ECS base aprobados antes de elaboracion."
    },
    {
      name: "Elaboracion",
      sortOrder: 2,
      requiredDeliverables: "SRS; diagramas de caso de uso; narrativas de caso de uso; diagramas de secuencia; diagramas de clase; SAD.",
      acceptanceCriteria: "SRS/SAD y modelos quedan versionados como ECS y trazados al cronograma."
    },
    {
      name: "Construccion",
      sortOrder: 3,
      requiredDeliverables: "Incrementos implementados; pruebas unitarias; cambios versionados; lineas base por incremento.",
      acceptanceCriteria: "Cada incremento tiene rama, commit, pruebas y evidencia de versionamiento."
    },
    {
      name: "Transicion",
      sortOrder: 4,
      requiredDeliverables: "UAT; acta de aceptacion; release; tag de GitHub; cierre de solicitud.",
      acceptanceCriteria: "La liberacion fue validada, aceptada y cerrada con trazabilidad completa."
    }
  ];

  const phasesByName = new Map<string, { id: string }>();
  for (const phaseSeed of rupPhases) {
    const existing = await prisma.methodologyPhase.findFirst({
      where: { projectId: project.id, methodologyType: "RUP", name: phaseSeed.name }
    });
    const phase = existing
      ? await prisma.methodologyPhase.update({
          where: { id: existing.id },
          data: {
            sortOrder: phaseSeed.sortOrder,
            requiredDeliverables: phaseSeed.requiredDeliverables,
            acceptanceCriteria: phaseSeed.acceptanceCriteria,
            ownerId: usersByEmail.get("jefe@sgcsw.local")!.id
          }
        })
      : await prisma.methodologyPhase.create({
          data: {
            projectId: project.id,
            methodologyType: "RUP",
            name: phaseSeed.name,
            sortOrder: phaseSeed.sortOrder,
            ownerId: usersByEmail.get("jefe@sgcsw.local")!.id,
            requiredDeliverables: phaseSeed.requiredDeliverables,
            acceptanceCriteria: phaseSeed.acceptanceCriteria,
            status: phaseSeed.name === "Inicio" ? "DONE" : phaseSeed.name === "Elaboracion" ? "IN_PROGRESS" : "PENDING"
          }
        });
    phasesByName.set(phaseSeed.name, phase);
  }

  const activitiesSeed = [
    {
      title: "Definir alcance y plan SCM inicial",
      phaseName: "Inicio",
      responsible: "jefe@sgcsw.local",
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-05-05"),
      deliverable: "Plan SCM inicial y lista preliminar de ECS.",
      progress: 100,
      status: "DONE"
    },
    {
      title: "Elaborar SRS con casos de uso",
      phaseName: "Elaboracion",
      responsible: "jefe@sgcsw.local",
      startDate: new Date("2026-05-06"),
      endDate: new Date("2026-05-14"),
      deliverable: "ECS-SRS-001 con diagramas, narrativas y requisitos.",
      progress: 75,
      status: "IN_PROGRESS"
    },
    {
      title: "Elaborar SAD y modelos de diseno",
      phaseName: "Elaboracion",
      responsible: "lider@sgcsw.local",
      startDate: new Date("2026-05-10"),
      endDate: new Date("2026-05-18"),
      deliverable: "ECS-SAD-001 con diagramas de clase y secuencia.",
      progress: 60,
      status: "IN_PROGRESS"
    },
    {
      title: "Implementar validacion RBAC",
      phaseName: "Construccion",
      responsible: "dev@sgcsw.local",
      startDate: new Date("2026-05-19"),
      endDate: new Date("2026-05-24"),
      deliverable: "ECS-API-001 versionado en rama feature/sc-0001-rbac.",
      progress: 35,
      status: "IN_PROGRESS"
    }
  ] as const;

  const activitiesByTitle = new Map<string, { id: string }>();
  for (const activitySeed of activitiesSeed) {
    const existing = await prisma.projectActivity.findFirst({
      where: { projectId: project.id, title: activitySeed.title }
    });
    const activity = existing
      ? await prisma.projectActivity.update({
          where: { id: existing.id },
          data: {
            phaseId: phasesByName.get(activitySeed.phaseName)!.id,
            responsibleId: usersByEmail.get(activitySeed.responsible)!.id,
            startDate: activitySeed.startDate,
            endDate: activitySeed.endDate,
            deliverable: activitySeed.deliverable,
            progress: activitySeed.progress,
            status: activitySeed.status
          }
        })
      : await prisma.projectActivity.create({
          data: {
            projectId: project.id,
            phaseId: phasesByName.get(activitySeed.phaseName)!.id,
            title: activitySeed.title,
            responsibleId: usersByEmail.get(activitySeed.responsible)!.id,
            startDate: activitySeed.startDate,
            endDate: activitySeed.endDate,
            deliverable: activitySeed.deliverable,
            progress: activitySeed.progress,
            status: activitySeed.status
          }
        });
    activitiesByTitle.set(activitySeed.title, activity);
  }

  const existingSprint = await prisma.projectSprint.findFirst({
    where: { projectId: project.id, name: "Sprint 1 - Trazabilidad GitHub" }
  });
  const sprint = existingSprint
    ? await prisma.projectSprint.update({
        where: { id: existingSprint.id },
        data: {
          goal: "Cerrar el flujo RBAC con rama, commit, PR, QA y reportes diarios.",
          startDate: new Date("2026-05-19"),
          endDate: new Date("2026-05-30"),
          capacityHours: 80,
          active: true
        }
      })
    : await prisma.projectSprint.create({
        data: {
          projectId: project.id,
          name: "Sprint 1 - Trazabilidad GitHub",
          goal: "Cerrar el flujo RBAC con rama, commit, PR, QA y reportes diarios.",
          startDate: new Date("2026-05-19"),
          endDate: new Date("2026-05-30"),
          capacityHours: 80
        }
      });

  const workItem = await prisma.workItem.upsert({
    where: { code: "WI-0001" },
    create: {
      code: "WI-0001",
      projectId: project.id,
      type: "USER_STORY",
      state: "ACTIVE",
      title: "Como jefe de proyecto quiero ver avances diarios del equipo",
      description: "Dashboard de avance por trabajador, reportes diarios y evidencia GitHub enlazada.",
      priority: "HIGH",
      storyPoints: 8,
      createdById: usersByEmail.get("jefe@sgcsw.local")!.id,
      assignedToId: usersByEmail.get("dev@sgcsw.local")!.id,
      sprintId: sprint.id,
      activityId: activitiesByTitle.get("Implementar validacion RBAC")!.id,
      changeRequestId: change.id,
      githubBranch: "feature/wi-0001-avances-diarios",
      githubIssueUrl: "https://github.com/organizacion-demo/sgcsw-core/issues/1",
      dueDate: new Date("2026-05-24")
    },
    update: {
      state: "ACTIVE",
      assignedToId: usersByEmail.get("dev@sgcsw.local")!.id,
      sprintId: sprint.id,
      activityId: activitiesByTitle.get("Implementar validacion RBAC")!.id,
      changeRequestId: change.id,
      githubBranch: "feature/wi-0001-avances-diarios",
      githubIssueUrl: "https://github.com/organizacion-demo/sgcsw-core/issues/1"
    }
  });

  const existingBranchLink = await prisma.workItemLink.findFirst({
    where: { sourceWorkItemId: workItem.id, linkType: "GITHUB_BRANCH", externalId: "feature/wi-0001-avances-diarios" }
  });
  if (!existingBranchLink) {
    await prisma.workItemLink.create({
      data: {
        sourceWorkItemId: workItem.id,
        linkType: "GITHUB_BRANCH",
        targetUrl: "https://github.com/organizacion-demo/sgcsw-core/tree/feature/wi-0001-avances-diarios",
        externalId: "feature/wi-0001-avances-diarios",
        createdById: usersByEmail.get("dev@sgcsw.local")!.id
      }
    });
  }

  const logDate = new Date("2026-05-30");
  const existingDailyLog = await prisma.dailyWorkLog.findFirst({
    where: {
      projectId: project.id,
      userId: usersByEmail.get("dev@sgcsw.local")!.id,
      workItemId: workItem.id,
      logDate
    }
  });
  if (!existingDailyLog) {
    await prisma.dailyWorkLog.create({
      data: {
        projectId: project.id,
        userId: usersByEmail.get("dev@sgcsw.local")!.id,
        workItemId: workItem.id,
        activityId: activitiesByTitle.get("Implementar validacion RBAC")!.id,
        logDate,
        hours: 6,
        completed: "Se enlazo el work item con rama GitHub y se avanzo el dashboard del jefe de proyecto.",
        nextPlan: "Completar PR, registrar pruebas unitarias y mover a QA.",
        blockers: "Pendiente confirmar criterios finales de la metodologia RUP.",
        githubBranch: "feature/wi-0001-avances-diarios",
        githubCommit: "seed-dashboard",
        githubPullRequestUrl: "https://github.com/organizacion-demo/sgcsw-core/pull/1"
      }
    });
  }

  await prisma.traceabilityLink.create({
    data: {
      projectId: project.id,
      sourceType: "INCIDENT",
      sourceId: incident.id,
      targetType: "CHANGE_REQUEST",
      targetId: change.id,
      relationType: "derived_to_change",
      createdById: usersByEmail.get("jefe@sgcsw.local")!.id
    }
  }).catch(() => undefined);

  await prisma.notification.create({
    data: {
      userId: usersByEmail.get("jefe@sgcsw.local")!.id,
      title: "Solicitud en analisis de impacto",
      message: "SC-0001 requiere registrar costo, ROI, riesgos y trazabilidad.",
      type: "INFO",
      link: "/cambios/evaluacion-impacto"
    }
  }).catch(() => undefined);

  await prisma.auditLog.create({
    data: {
      userId: usersByEmail.get("admin@sgcsw.local")!.id,
      module: "seed",
      action: "initialize",
      ip: "127.0.0.1",
      newDetail: "Seed SGCSW ejecutado con roles, permisos, usuarios, proyecto, bibliotecas, ECS, incidencia y solicitud."
    }
  });

  console.log(`Seed listo. Usuarios demo creados con password: ${defaultPassword}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
