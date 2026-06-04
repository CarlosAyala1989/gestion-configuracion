import {
  assignProjectRoleAction,
  ccbDecisionAction,
  checkInAction,
  checkOutAction,
  closeChangeRequestAction,
  configureProjectMethodologyAction,
  configureGithubWebhookAction,
  createBaselineAction,
  createChangeOrderAction,
  createChangeRequestAction,
  createEcsAction,
  createGithubBranchAction,
  createGithubIssueAction,
  createGithubProjectRepoAction,
  createGithubPullRequestAction,
  createGithubTagAction,
  createMethodologyPhaseAction,
  createProjectActivityAction,
  createImpactAssessmentAction,
  createIncidentAction,
  createProjectAction,
  createRoleAction,
  createSprintAction,
  createUserAction,
  createWorkItemAction,
  executeReleaseAction,
  finalQualityAction,
  forceUnlockAction,
  integrateChangeAction,
  linkWorkItemAction,
  observeFormatAction,
  recordQaTestAction,
  reviewArtifactRequirementAction,
  registerDailyWorkLogAction,
  recordUatAction,
  recordUnitTestAction,
  resubmitChangeRequestAction,
  setMethodologyPhaseStatusAction,
  setProjectActivityStatusAction,
  setProjectStatusAction,
  setProjectUserStatusAction,
  setRoleStatusAction,
  setUserStatusAction,
  setWorkItemStateAction,
  startImplementationAction,
  technicalDecisionAction,
  transferLibraryAction,
  updateDefectStatusAction,
  updateIncidentStatusAction,
  validateAlignmentAction,
  validateIntegrityAction
} from "@/app/(protected)/actions";
import { AppShell } from "@/components/app-shell";
import { Button, DataTable, EmptyState, Field, Panel, StatusBadge, inputClass, textareaClass } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { githubBranchUrl, githubCommitUrl, githubRepositoryUrl, hasGithubWorkspaceToken } from "@/lib/github";
import { labelFor } from "@/lib/labels";
import { prisma } from "@/lib/prisma";
import { permissionForPath, type SessionUser } from "@/lib/rbac";
import { AlertTriangle, CheckCircle2, ExternalLink, Filter, GitBranch, GitPullRequest, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type Search = Record<string, string | string[] | undefined>;
type Row = Record<string, any>;

const routeMeta: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Mi Panel de Trabajo", subtitle: "Indicadores, alertas y tareas segun rol" },
  "/boards/backlog": { title: "Backlog", subtitle: "Work items, jerarquia, ramas, issues, PRs y trazabilidad GitHub" },
  "/boards/sprints": { title: "Sprints", subtitle: "Iteraciones, capacidad y taskboard por estado" },
  "/boards/metodologia": { title: "Metodologia y Cronograma", subtitle: "Fases, actividades, responsables y entregables obligatorios por metodologia" },
  "/boards/reportes-diarios": { title: "Reportes diarios", subtitle: "Justificacion diaria de trabajo, horas, bloqueos y evidencia GitHub" },
  "/admin/usuarios": { title: "Gestion de usuarios", subtitle: "Usuarios activos, roles y credenciales GitHub cifradas" },
  "/admin/roles": { title: "Gestion de roles", subtitle: "Roles, permisos y menu dinamico RBAC" },
  "/admin/proyectos": { title: "Gestion de proyectos", subtitle: "Proyectos aislados con jefe obligatorio y repositorio GitHub referencial" },
  "/github/workspace": { title: "Workspace GitHub", subtitle: "Repositorios, ramas, PRs, tags, issues y webhook de entrega automatica a QA" },
  "/admin/auditoria": { title: "Auditoria", subtitle: "Acciones criticas, usuario, modulo e historial" },
  "/admin/integridad": { title: "Alertas de integridad", subtitle: "Verificacion SHA-256 de artefactos ECS" },
  "/configuracion/ecs": { title: "Repositorio ECS", subtitle: "Registro, metadatos, hash y responsable" },
  "/configuracion/versiones": { title: "Control de versiones", subtitle: "Check-out, check-in, rama y commit" },
  "/configuracion/bloqueos": { title: "Gestion de bloqueos", subtitle: "Bloqueos activos y desbloqueo autorizado" },
  "/configuracion/bibliotecas": { title: "Gestion de bibliotecas", subtitle: "Trabajo, Integracion, Soporte y Maestra" },
  "/configuracion/lineas-base": { title: "Gestion de lineas base", subtitle: "Congelamiento de versiones exactas de ECS" },
  "/configuracion/trazabilidad": { title: "Trazabilidad", subtitle: "Relaciones desde origen del cambio hasta liberacion" },
  "/cambios/solicitudes": { title: "Solicitudes de cambio", subtitle: "Registro formal, validacion, clasificacion y cierre" },
  "/cambios/evaluacion-impacto": { title: "Evaluacion de impacto", subtitle: "Costo, ROI, riesgo, recursos y ruta de aprobacion" },
  "/cambios/aprobacion-tecnica": { title: "Aprobacion tecnica", subtitle: "Cambios de bajo impacto para Lider Tecnico / Analista" },
  "/cambios/ccb": { title: "Comite de Control de Cambios", subtitle: "Revision formal de alto impacto" },
  "/cambios/ordenes": { title: "Ordenes de cambio", subtitle: "Asignacion de recursos, desarrollador y ambiente" },
  "/desarrollo/mis-ordenes": { title: "Mis ordenes asignadas", subtitle: "Rama GitFlow e inicio de implementacion" },
  "/desarrollo/pruebas-unitarias": { title: "Pruebas unitarias", subtitle: "Resultado local, errores, commit y push" },
  "/qa/pruebas": { title: "Pruebas QA", subtitle: "Funcionales, integracion y regresion" },
  "/qa/defectos": { title: "Defectos", subtitle: "Defectos asociados a prueba, orden, ECS y version" },
  "/qa/uat": { title: "UAT", subtitle: "Observaciones o acta de aceptacion firmada" },
  "/qa/validacion-final": { title: "Validacion final", subtitle: "Criterios finales y aprobacion de release" },
  "/liberacion/releases": { title: "Gestion de liberacion", subtitle: "Ejecucion o registro de liberacion aprobada" },
  "/soporte/incidencias": { title: "Incidencias y soporte", subtitle: "Registro, severidad y derivacion a cambios" },
  "/reportes": { title: "Reportes", subtitle: "Vistas filtrables por proyecto, estado, fecha y responsable" }
};

async function getData(user: SessionUser) {
  const projectId = user.projectId ?? undefined;
  const userWhere = projectId ? { projectUsers: { some: { projectId, active: true } } } : undefined;
  const projectWhere = projectId ? { id: projectId } : undefined;
  const scopedProjectWhere = projectId ? { projectId } : undefined;
  const itemProjectWhere = projectId ? { item: { projectId } } : undefined;
  const changeProjectWhere = projectId ? { changeRequest: { projectId } } : undefined;
  const orderProjectWhere = projectId ? { changeOrder: { projectId } } : undefined;

  const [
    users,
    roles,
    permissions,
    projects,
    projectUsers,
    libraries,
    items,
    versions,
    locks,
    transfers,
    baselines,
    incidents,
    changes,
    impactAssessments,
    technicalApprovals,
    ccbReviews,
    orders,
    unitTests,
    qaTests,
    defects,
    uatTests,
    releases,
    auditLogs,
    integrityAlerts,
    traceabilityLinks,
    methodologyPhases,
    projectActivities,
    sprints,
    workItems,
    artifactRequirements,
    artifactVersions,
    dailyWorkLogs,
    notifications
  ] = await Promise.all([
    prisma.user.findMany({ include: { role: true, projectUsers: { include: { project: true, role: true } } }, orderBy: { createdAt: "desc" }, where: userWhere }),
    prisma.role.findMany({ include: { rolePermissions: { include: { permission: true } } }, orderBy: { name: "asc" } }),
    prisma.permission.findMany({ orderBy: [{ module: "asc" }, { action: "asc" }] }),
    prisma.project.findMany({ include: { manager: true }, orderBy: { createdAt: "desc" }, where: projectWhere }),
    prisma.projectUser.findMany({ include: { project: true, user: { include: { role: true } }, role: true }, orderBy: { createdAt: "desc" }, where: scopedProjectWhere }),
    prisma.library.findMany({ include: { project: true }, orderBy: [{ projectId: "asc" }, { type: "asc" }], where: scopedProjectWhere }),
    prisma.configurationItem.findMany({ include: { project: true, library: true, responsible: true }, orderBy: { createdAt: "desc" }, where: scopedProjectWhere }),
    prisma.configurationItemVersion.findMany({ include: { item: true, createdBy: true, changeRequest: true, changeOrder: true }, orderBy: { createdAt: "desc" }, where: itemProjectWhere }),
    prisma.configurationItemLock.findMany({ include: { item: true, user: true, forcedBy: true }, orderBy: { lockedAt: "desc" }, where: itemProjectWhere }),
    prisma.libraryTransfer.findMany({ include: { item: true, fromLibrary: true, toLibrary: true, user: true }, orderBy: { createdAt: "desc" }, where: itemProjectWhere }),
    prisma.baseline.findMany({ include: { project: true, items: { include: { item: true, itemVersion: true } } }, orderBy: { createdAt: "desc" }, where: scopedProjectWhere }),
    prisma.incident.findMany({ include: { project: true, reportedBy: true, assignedTo: true, affectedItem: true }, orderBy: { createdAt: "desc" }, where: scopedProjectWhere }),
    prisma.changeRequest.findMany({
      include: {
        project: true,
        requester: true,
        alignedBy: true,
        originIncident: true,
        affectedItems: { include: { item: true } },
        impactAssessment: true,
        technicalApproval: true,
        ccbReviews: { include: { resolution: true, votes: { include: { voter: true } } } },
        changeOrder: true,
        acceptanceRecords: true,
        releases: true
      },
      orderBy: { createdAt: "desc" },
      where: scopedProjectWhere
    }),
    prisma.impactAssessment.findMany({ include: { changeRequest: true, assessedBy: true }, orderBy: { createdAt: "desc" }, where: changeProjectWhere }),
    prisma.technicalApproval.findMany({ include: { changeRequest: true, reviewer: true }, orderBy: { createdAt: "desc" }, where: changeProjectWhere }),
    prisma.ccbReview.findMany({ include: { changeRequest: true, resolution: true, votes: { include: { voter: true } } }, orderBy: { createdAt: "desc" }, where: changeProjectWhere }),
    prisma.changeOrder.findMany({
      include: {
        project: true,
        changeRequest: true,
        developer: true,
        assignments: { include: { user: true } },
        unitTests: true,
        qaTests: true,
        defects: true,
        releases: true
      },
      orderBy: { createdAt: "desc" },
      where: scopedProjectWhere
    }),
    prisma.unitTest.findMany({ include: { changeOrder: true, executedBy: true, itemVersion: true }, orderBy: { executedAt: "desc" }, where: orderProjectWhere }),
    prisma.qaTest.findMany({ include: { changeOrder: true, executedBy: true, defects: true }, orderBy: { executedAt: "desc" }, where: orderProjectWhere }),
    prisma.defect.findMany({ include: { changeOrder: true, qaTest: true, item: true, itemVersion: true, responsible: true }, orderBy: { createdAt: "desc" }, where: orderProjectWhere }),
    prisma.uatTest.findMany({ include: { changeRequest: true, changeOrder: true, executedBy: true, acceptance: true }, orderBy: { executedAt: "desc" }, where: changeProjectWhere }),
    prisma.release.findMany({ include: { project: true, changeRequest: true, changeOrder: true, responsible: true, logs: true }, orderBy: { createdAt: "desc" }, where: scopedProjectWhere }),
    prisma.auditLog.findMany({ include: { user: true }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.integrityAlert.findMany({ include: { project: true, item: true }, orderBy: { createdAt: "desc" }, where: scopedProjectWhere }),
    prisma.traceabilityLink.findMany({ include: { project: true, createdBy: true }, orderBy: { createdAt: "desc" }, take: 100, where: scopedProjectWhere }),
    prisma.methodologyPhase.findMany({
      include: { project: true, owner: true, activities: { include: { responsible: true, workItems: true } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      where: scopedProjectWhere
    }),
    prisma.projectActivity.findMany({
      include: {
        project: true,
        phase: true,
        responsible: true,
        workItems: true,
        dailyWorkLogs: { include: { user: true }, orderBy: { createdAt: "desc" }, take: 3 }
      },
      orderBy: [{ startDate: "asc" }, { endDate: "asc" }],
      where: scopedProjectWhere
    }),
    prisma.projectSprint.findMany({
      include: { project: true, workItems: { include: { assignedTo: true } } },
      orderBy: [{ startDate: "desc" }, { endDate: "desc" }],
      where: scopedProjectWhere
    }),
    prisma.workItem.findMany({
      include: {
        project: true,
        createdBy: true,
        assignedTo: true,
        sprint: true,
        activity: { include: { phase: true } },
        changeRequest: true,
        changeOrder: true,
        outgoingLinks: { include: { targetWorkItem: true, createdBy: true }, orderBy: { createdAt: "desc" } },
        incomingLinks: { include: { sourceWorkItem: true }, orderBy: { createdAt: "desc" } }
      },
      orderBy: { updatedAt: "desc" },
      where: scopedProjectWhere
    }),
    prisma.workItemArtifactRequirement.findMany({
      include: {
        workItem: { include: { project: true, assignedTo: true, changeOrder: true, changeRequest: true } },
        reviewedBy: true,
        versions: { include: { item: true, itemVersion: true, submittedBy: true }, orderBy: { submittedAt: "desc" } }
      },
      orderBy: [{ lifecycleStage: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
      where: projectId ? { workItem: { projectId } } : undefined
    }),
    prisma.workItemArtifactVersion.findMany({
      include: {
        workItem: { include: { project: true } },
        artifactRequirement: true,
        item: true,
        itemVersion: true,
        changeRequest: true,
        changeOrder: true,
        submittedBy: true
      },
      orderBy: { submittedAt: "desc" },
      where: projectId ? { workItem: { projectId } } : undefined
    }),
    prisma.dailyWorkLog.findMany({
      include: { project: true, user: true, workItem: true, changeOrder: true, activity: true },
      orderBy: [{ logDate: "desc" }, { createdAt: "desc" }],
      where: scopedProjectWhere
    }),
    prisma.notification.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" }, take: 8 })
  ]);

  return {
    currentProjectId: projectId ?? null,
    users,
    roles,
    permissions,
    projects,
    projectUsers,
    libraries,
    items,
    versions,
    locks,
    transfers,
    baselines,
    incidents,
    changes,
    impactAssessments,
    technicalApprovals,
    ccbReviews,
    orders,
    unitTests,
    qaTests,
    defects,
    uatTests,
    releases,
    auditLogs,
    integrityAlerts,
    traceabilityLinks,
    methodologyPhases,
    projectActivities,
    sprints,
    workItems,
    artifactRequirements,
    artifactVersions,
    dailyWorkLogs,
    notifications
  };
}

function HiddenPath({ path }: { path: string }) {
  return <input name="currentPath" type="hidden" value={path} />;
}

function Message({ params }: { params: Search }) {
  const ok = typeof params.ok === "string" ? params.ok : null;
  const error = typeof params.error === "string" ? params.error : null;
  if (!ok && !error) return null;
  return (
    <div className={`mb-4 flex items-start gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${error ? "border-red-200 bg-red-50 text-red-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
      {error ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />}
      <span>{error ?? ok}</span>
    </div>
  );
}

function Select({
  name,
  children,
  required,
  defaultValue
}: {
  name: string;
  children: ReactNode;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <select className={inputClass} defaultValue={defaultValue ?? ""} name={name} required={required}>
      <option value="">Seleccionar</option>
      {children}
    </select>
  );
}

function ProjectOptions({ projects }: { projects: Row[] }) {
  return projects.map((project) => (
    <option key={project.id} value={project.id}>{project.code} - {project.name}</option>
  ));
}

function roleForUser(user: Row, projectId?: string | null) {
  const assignment = projectId ? user.projectUsers?.find((projectUser: Row) => projectUser.projectId === projectId && projectUser.active) : null;
  return assignment?.role ?? user.role;
}

function UserOptions({ users, roleSlug, projectId }: { users: Row[]; roleSlug?: string; projectId?: string | null }) {
  return users
    .filter((user) => {
      const role = roleForUser(user, projectId);
      return !roleSlug || role.slug === roleSlug;
    })
    .map((user) => {
      const role = roleForUser(user, projectId);
      return <option key={user.id} value={user.id}>{user.name} ({role.name})</option>;
    });
}

function ItemOptions({ items }: { items: Row[] }) {
  return items.map((item) => <option key={item.id} value={item.id}>{item.code} - {item.name}</option>);
}

function ChangeOptions({ changes, statuses }: { changes: Row[]; statuses?: string[] }) {
  return changes
    .filter((change) => !statuses || statuses.includes(change.status))
    .map((change) => <option key={change.id} value={change.id}>{change.ticketId} - {change.title}</option>);
}

function OrderOptions({ orders, statuses }: { orders: Row[]; statuses?: string[] }) {
  return orders
    .filter((order) => !statuses || statuses.includes(order.status) || statuses.includes(order.changeRequest.status))
    .map((order) => <option key={order.id} value={order.id}>{order.code} - {order.changeRequest.title}</option>);
}

function PhaseOptions({ phases, projectId }: { phases: Row[]; projectId?: string | null }) {
  return phases
    .filter((phase) => !projectId || phase.projectId === projectId)
    .map((phase) => <option key={phase.id} value={phase.id}>{phase.project.code} - {phase.name}</option>);
}

function ActivityOptions({ activities, projectId }: { activities: Row[]; projectId?: string | null }) {
  return activities
    .filter((activity) => !projectId || activity.projectId === projectId)
    .map((activity) => <option key={activity.id} value={activity.id}>{activity.project.code} - {activity.title}</option>);
}

function SprintOptions({ sprints, projectId }: { sprints: Row[]; projectId?: string | null }) {
  return sprints
    .filter((sprint) => !projectId || sprint.projectId === projectId)
    .map((sprint) => <option key={sprint.id} value={sprint.id}>{sprint.project.code} - {sprint.name}</option>);
}

function WorkItemOptions({ workItems, excludeId }: { workItems: Row[]; excludeId?: string }) {
  return workItems
    .filter((item) => !excludeId || item.id !== excludeId)
    .map((item) => <option key={item.id} value={item.id}>{item.code} - {item.title}</option>);
}

function ArtifactRequirementOptions({ requirements, workItemId }: { requirements: Row[]; workItemId?: string | null }) {
  return requirements
    .filter((requirement) => !workItemId || requirement.workItemId === workItemId)
    .map((requirement) => (
      <option key={requirement.id} value={requirement.id}>
        {requirement.workItem.code} - {labelFor(requirement.lifecycleStage)} - {requirement.name}
      </option>
    ));
}

function formatDate(value?: Date | string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("es-PE");
}

function dateInputValue(value = new Date()) {
  return value.toISOString().slice(0, 10);
}

function phaseProgress(phase: Row) {
  const activities = phase.activities ?? [];
  if (activities.length === 0) return 0;
  return Math.round(activities.reduce((sum: number, activity: Row) => sum + Number(activity.progress ?? 0), 0) / activities.length);
}

function activityCompliance(activity: Row) {
  if (activity.status === "DONE" || Number(activity.progress ?? 0) >= 100) return "Cumplido";
  if (new Date(activity.endDate) < new Date()) return "Vencido";
  if (activity.status === "IN_PROGRESS") return "En ejecucion";
  return "Pendiente";
}

function branchSuggestion(order: Row) {
  const slug = String(order.changeRequest.title ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);
  return `feature/${String(order.changeRequest.ticketId ?? order.code).toLowerCase()}${slug ? `-${slug}` : ""}`;
}

function Filters({ projects, params, path }: { projects: Row[]; params: Search; path: string }) {
  return (
    <form className="mb-4 flex flex-wrap items-end gap-3 rounded-lg border border-slate-200 bg-white p-3" action={path}>
      <Field label="Proyecto">
        <select className={inputClass} defaultValue={String(params.projectId ?? "")} name="projectId">
          <option value="">Todos</option>
          <ProjectOptions projects={projects} />
        </select>
      </Field>
      <Field label="Estado">
        <input className={inputClass} defaultValue={String(params.status ?? "")} name="status" placeholder="Estado" />
      </Field>
      <Field label="Buscar">
        <input className={inputClass} defaultValue={String(params.q ?? "")} name="q" placeholder="Texto" />
      </Field>
      <Button variant="secondary"><Filter className="h-4 w-4" />Filtrar</Button>
    </form>
  );
}

function filterRows<T extends Row>(rows: T[], params: Search, fields: string[] = []) {
  const projectId = typeof params.projectId === "string" ? params.projectId : "";
  const status = typeof params.status === "string" ? params.status.toUpperCase() : "";
  const q = typeof params.q === "string" ? params.q.toLowerCase() : "";
  return rows.filter((row) => {
    const rowProject = row.projectId ?? row.project?.id;
    if (projectId && rowProject !== projectId) return false;
    if (status && String(row.status ?? "").toUpperCase() !== status) return false;
    if (!q) return true;
    return fields.some((field) => String(row[field] ?? row[field]?.name ?? "").toLowerCase().includes(q));
  });
}

function Dashboard({ data }: { data: Awaited<ReturnType<typeof getData>> }) {
  const today = dateInputValue();
  const activeWorkItems = data.workItems.filter((item) => !["CLOSED", "REMOVED"].includes(item.state));
  const overdueActivities = data.projectActivities.filter((activity) => activity.status !== "DONE" && new Date(activity.endDate) < new Date());
  const metrics = [
    ["Work items activos", activeWorkItems.length],
    ["Actividades vencidas", overdueActivities.length],
    ["Reportes de hoy", data.dailyWorkLogs.filter((log) => dateInputValue(log.logDate) === today).length],
    ["Bloqueos activos", data.locks.filter((lock) => lock.status === "ACTIVE").length]
  ];
  const workStates = ["NEW", "ACTIVE", "RESOLVED", "CLOSED"].map((state) => ({
    state,
    count: data.workItems.filter((item) => item.state === state).length
  }));
  const teamProgress = data.projectUsers
    .filter((assignment) => assignment.active)
    .map((assignment) => {
      const userItems = data.workItems.filter((item) => item.assignedToId === assignment.userId);
      const logs = data.dailyWorkLogs.filter((log) => log.userId === assignment.userId);
      return {
        assignment,
        active: userItems.filter((item) => !["CLOSED", "REMOVED"].includes(item.state)).length,
        closed: userItems.filter((item) => item.state === "CLOSED").length,
        hours: logs.reduce((sum, log) => sum + Number(log.hours), 0)
      };
    });
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 md:grid-cols-4">
        {metrics.map(([label, value]) => (
          <Panel key={label as string}>
            <div className="text-sm text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-bold text-ink">{value}</div>
          </Panel>
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Panel title="Avance del equipo">
          <DataTable headers={["Integrante", "Rol", "Activos", "Cerrados", "Horas"]}>
            {teamProgress.map(({ assignment, active, closed, hours }) => (
              <tr key={assignment.id}>
                <td className="px-3 py-2 font-semibold">{assignment.user.name}</td>
                <td className="px-3 py-2">{assignment.role.name}</td>
                <td className="px-3 py-2">{active}</td>
                <td className="px-3 py-2">{closed}</td>
                <td className="px-3 py-2">{hours.toFixed(1)}</td>
              </tr>
            ))}
          </DataTable>
        </Panel>
        <Panel title="Notificaciones">
          <div className="grid gap-2">
            {data.notifications.length === 0 ? <EmptyState>Sin notificaciones pendientes.</EmptyState> : data.notifications.map((notification) => (
              <Link className="rounded-md border border-slate-200 p-3 text-sm hover:bg-slate-50" href={notification.link ?? "/dashboard"} key={notification.id}>
                <div className="font-bold">{notification.title}</div>
                <div className="mt-1 text-slate-500">{notification.message}</div>
              </Link>
            ))}
          </div>
        </Panel>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Backlog por estado">
          <div className="grid gap-3 sm:grid-cols-4">
            {workStates.map((entry) => (
              <div className="rounded-md border border-slate-200 p-3" key={entry.state}>
                <StatusBadge value={entry.state} />
                <div className="mt-2 text-2xl font-bold">{entry.count}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Cronograma critico">
          <DataTable headers={["Actividad", "Responsable", "Fin", "Cumplimiento"]}>
            {data.projectActivities.slice(0, 6).map((activity) => (
              <tr key={activity.id}>
                <td className="px-3 py-2 font-semibold">{activity.title}</td>
                <td className="px-3 py-2">{activity.responsible.name}</td>
                <td className="px-3 py-2">{formatDate(activity.endDate)}</td>
                <td className="px-3 py-2"><StatusBadge value={activityCompliance(activity)} /></td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}

function UsersModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const userProjectRoles = (user: Row) =>
    user.projectUsers?.filter((projectUser: Row) => projectUser.active)
      .map((projectUser: Row) => `${projectUser.project.code}: ${projectUser.role.name}`)
      .join(", ") || "-";

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-[360px_1fr]">
        <Panel title="Crear usuario">
          <form action={createUserAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Nombre" required><input className={inputClass} name="name" required /></Field>
            <Field label="Email" required><input className={inputClass} name="email" required type="email" /></Field>
            <Field label="Contrasena" required><input className={inputClass} name="password" required type="password" /></Field>
            <Field label="Rol base" required><Select name="roleId" required>{data.roles.filter((role) => !role.isSystem && role.active).map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</Select></Field>
            <Field label="Token GitHub respaldo"><input className={inputClass} name="githubToken" placeholder="Opcional; se usa si no hay token compartido" type="password" /></Field>
            <Button><Plus className="h-4 w-4" />Crear usuario</Button>
          </form>
        </Panel>
        <Panel title="Usuarios">
          <DataTable headers={["Nombre", "Email", "Rol base", "Roles por proyecto", "GitHub", "Estado", "Accion"]}>
            {data.users.map((user) => (
              <tr key={user.id}>
                <td className="px-3 py-2 font-semibold">{user.name}</td>
                <td className="px-3 py-2">{user.email}</td>
                <td className="px-3 py-2">{user.role.name}</td>
                <td className="max-w-sm px-3 py-2 text-xs text-slate-600">{userProjectRoles(user)}</td>
                <td className="px-3 py-2">{user.githubTokenLast4 ? `****${user.githubTokenLast4}` : "-"}</td>
                <td className="px-3 py-2"><StatusBadge value={user.status} /></td>
                <td className="px-3 py-2">
                  <form action={setUserStatusAction}>
                    <HiddenPath path={path} />
                    <input name="id" type="hidden" value={user.id} />
                    <input name="status" type="hidden" value={user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"} />
                    <Button variant="secondary">{user.status === "ACTIVE" ? "Desactivar" : "Activar"}</Button>
                  </form>
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>

      <Panel title="Roles por proyecto" subtitle="Un mismo usuario puede tener roles distintos en proyectos distintos.">
        <form action={assignProjectRoleAction} className="mb-4 grid gap-3 rounded-md border border-slate-200 p-3 md:grid-cols-5">
          <HiddenPath path={path} />
          <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
          <Field label="Usuario" required><Select name="userId" required><UserOptions users={data.users} projectId={data.currentProjectId} /></Select></Field>
          <Field label="Rol en proyecto" required><Select name="roleId" required>{data.roles.filter((role) => !role.isSystem && role.active).map((role) => <option key={role.id} value={role.id}>{role.name}</option>)}</Select></Field>
          <Field label="Nota"><input className={inputClass} name="roleNote" placeholder="Equipo, guardia o responsabilidad" /></Field>
          <div className="flex items-end"><Button><Plus className="h-4 w-4" />Asignar</Button></div>
        </form>
        <DataTable headers={["Proyecto", "Usuario", "Rol en proyecto", "Rol base", "Estado", "Accion"]}>
          {data.projectUsers.map((assignment) => (
            <tr key={assignment.id}>
              <td className="px-3 py-2 font-semibold">{assignment.project.code}</td>
              <td className="px-3 py-2">{assignment.user.name}</td>
              <td className="px-3 py-2">{assignment.role.name}</td>
              <td className="px-3 py-2">{assignment.user.role.name}</td>
              <td className="px-3 py-2"><StatusBadge value={assignment.active ? "ACTIVE" : "INACTIVE"} /></td>
              <td className="px-3 py-2">
                <form action={setProjectUserStatusAction}>
                  <HiddenPath path={path} />
                  <input name="id" type="hidden" value={assignment.id} />
                  <input name="active" type="hidden" value={assignment.active ? "false" : "true"} />
                  <Button variant="secondary">{assignment.active ? "Desactivar" : "Activar"}</Button>
                </form>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function RolesModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
      <Panel title="Crear rol">
        <form action={createRoleAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Slug" required><input className={inputClass} name="slug" placeholder="ANALISTA_SCM" required /></Field>
          <Field label="Nombre" required><input className={inputClass} name="name" required /></Field>
          <Field label="Descripcion"><textarea className={textareaClass} name="description" /></Field>
          <Field label="Permisos">
            <select className="min-h-40 rounded-md border border-slate-300 px-3 py-2 text-sm" multiple name="permissionIds">
              {data.permissions.map((permission) => <option key={permission.id} value={permission.id}>{permission.code}</option>)}
            </select>
          </Field>
          <Button>Crear rol</Button>
        </form>
      </Panel>
      <Panel title="Roles registrados">
        <DataTable headers={["Rol", "Permisos", "Sistema", "Estado", "Accion"]}>
          {data.roles.map((role) => (
            <tr key={role.id}>
              <td className="px-3 py-2 font-semibold">{role.name}</td>
              <td className="px-3 py-2">{role.rolePermissions.map((rp) => rp.permission.code).join(", ") || "-"}</td>
              <td className="px-3 py-2">{role.isSystem ? "Si" : "No"}</td>
              <td className="px-3 py-2"><StatusBadge value={role.active ? "ACTIVE" : "INACTIVE"} /></td>
              <td className="px-3 py-2">
                {!role.isSystem ? (
                  <form action={setRoleStatusAction}>
                    <HiddenPath path={path} />
                    <input name="id" type="hidden" value={role.id} />
                    <input name="active" type="hidden" value={role.active ? "false" : "true"} />
                    <Button variant="secondary">{role.active ? "Desactivar" : "Activar"}</Button>
                  </form>
                ) : "-"}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function ProjectsModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[380px_1fr]">
      <Panel title="Crear proyecto">
        <form action={createProjectAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Codigo" required><input className={inputClass} name="code" required /></Field>
          <Field label="Nombre" required><input className={inputClass} name="name" required /></Field>
          <Field label="Jefe de Proyecto" required><Select name="managerId" required><UserOptions users={data.users} projectId={data.currentProjectId} roleSlug="JEFE_PROYECTO" /></Select></Field>
          <Field label="Descripcion"><textarea className={textareaClass} name="description" /></Field>
          <Field label="GitHub owner"><input className={inputClass} name="githubOwner" /></Field>
          <Field label="GitHub repo"><input className={inputClass} name="githubRepo" /></Field>
          <Field label="Visibilidad GitHub">
            <select className={inputClass} defaultValue="private" name="githubVisibility">
              <option value="private">Privado</option>
              <option value="public">Publico</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm font-semibold"><input defaultChecked name="githubAutoInit" type="checkbox" value="on" /> Inicializar con README</label>
          <label className="flex items-center gap-2 text-sm font-semibold"><input name="createGithubRepo" type="checkbox" /> Crear repositorio GitHub al guardar</label>
          <Button>Crear proyecto</Button>
        </form>
      </Panel>
      <Panel title="Proyectos">
        <DataTable headers={["Codigo", "Proyecto", "Jefe", "GitHub", "Estado", "Cambiar estado"]}>
          {data.projects.map((project) => (
            <tr key={project.id}>
              <td className="px-3 py-2 font-semibold">{project.code}</td>
              <td className="px-3 py-2">{project.name}</td>
              <td className="px-3 py-2">{project.manager.name}</td>
              <td className="px-3 py-2">{project.githubOwner && project.githubRepo ? `${project.githubOwner}/${project.githubRepo}` : "-"}</td>
              <td className="px-3 py-2"><StatusBadge value={project.status} /></td>
              <td className="px-3 py-2">
                <form action={setProjectStatusAction} className="flex gap-2">
                  <HiddenPath path={path} />
                  <input name="id" type="hidden" value={project.id} />
                  <select className={inputClass} name="status" defaultValue={project.status}>
                    <option value="ACTIVE">Activo</option>
                    <option value="PAUSED">Pausado</option>
                    <option value="CLOSED">Cerrado</option>
                  </select>
                  <Button variant="secondary">Guardar</Button>
                </form>
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function GithubWorkspaceModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const tokenReady = hasGithubWorkspaceToken();
  const webhookUrl = process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api/github/webhook` : "";

  return (
    <div className="grid gap-4">
      <Panel title="Token compartido" subtitle="Todas las operaciones usan GITHUB_WORKSPACE_TOKEN; el token por usuario queda solo como respaldo.">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <StatusBadge value={tokenReady ? "ACTIVE" : "PENDING"} />
          <div className="text-sm text-slate-600">
            {tokenReady ? "Workspace GitHub configurado para todos los usuarios." : "Falta configurar GITHUB_WORKSPACE_TOKEN en el entorno."}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Crear/vincular repositorio">
          <form action={createGithubProjectRepoAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <Field label="Owner u organizacion"><input className={inputClass} name="githubOwner" placeholder="mi-org" /></Field>
            <Field label="Repositorio"><input className={inputClass} name="githubRepo" placeholder="sgcsw-core" /></Field>
            <Field label="Descripcion"><textarea className={textareaClass} name="description" /></Field>
            <Field label="Visibilidad">
              <select className={inputClass} defaultValue="private" name="githubVisibility">
                <option value="private">Privado</option>
                <option value="public">Publico</option>
              </select>
            </Field>
            <label className="flex items-center gap-2 text-sm font-semibold"><input defaultChecked name="githubAutoInit" type="checkbox" /> Inicializar con README</label>
            <Button><Plus className="h-4 w-4" />Crear o vincular</Button>
          </form>
        </Panel>

        <Panel title="Ramas">
          <form action={createGithubBranchAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <Field label="Rama nueva" required><input className={inputClass} name="branchName" placeholder="feature/sc-0002-cambio" required /></Field>
            <Field label="Rama base"><input className={inputClass} name="baseBranch" placeholder="main" /></Field>
            <Button><GitBranch className="h-4 w-4" />Crear rama</Button>
          </form>
        </Panel>

        <Panel title="Pull request">
          <form action={createGithubPullRequestAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <Field label="Titulo" required><input className={inputClass} name="title" required /></Field>
            <Field label="Rama origen" required><input className={inputClass} name="headBranch" placeholder="feature/sc-0002-cambio" required /></Field>
            <Field label="Rama destino"><input className={inputClass} name="baseBranch" placeholder="main" /></Field>
            <Field label="Descripcion"><textarea className={textareaClass} name="body" /></Field>
            <Button><GitPullRequest className="h-4 w-4" />Crear PR</Button>
          </form>
        </Panel>

        <Panel title="Tags e issues">
          <div className="grid gap-4">
            <form action={createGithubTagAction} className="grid gap-3 rounded-md border border-slate-200 p-3">
              <HiddenPath path={path} />
              <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
              <Field label="Tag" required><input className={inputClass} name="tagName" placeholder="v1.2.0" required /></Field>
              <Field label="Commit SHA" required><input className={inputClass} name="commitSha" required /></Field>
              <Button variant="secondary">Crear tag</Button>
            </form>
            <form action={createGithubIssueAction} className="grid gap-3 rounded-md border border-slate-200 p-3">
              <HiddenPath path={path} />
              <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
              <Field label="Titulo issue" required><input className={inputClass} name="title" required /></Field>
              <Field label="Detalle"><textarea className={textareaClass} name="body" /></Field>
              <Button variant="secondary">Crear issue</Button>
            </form>
          </div>
        </Panel>
      </div>

      <Panel title="Webhook de entrega automatica a QA" subtitle="Cuando GitHub reciba un push en una rama asociada a una orden activa, SGCSW marca la orden como lista para QA y notifica al rol QA.">
        <form action={configureGithubWebhookAction} className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
          <HiddenPath path={path} />
          <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
          <Field label="URL webhook" required><input className={inputClass} defaultValue={webhookUrl} name="webhookUrl" placeholder="https://dominio.com/api/github/webhook" required /></Field>
          <Field label="Secret"><input className={inputClass} name="webhookSecret" placeholder="GITHUB_WEBHOOK_SECRET" type="password" /></Field>
          <Button>Registrar webhook</Button>
        </form>
      </Panel>

      <Panel title="Repositorios vinculados">
        <DataTable headers={["Proyecto", "Repositorio", "Rama orden", "Commit", "Estado"]}>
          {data.projects.map((project) => {
            const repoUrl = githubRepositoryUrl(project);
            const projectOrders = data.orders.filter((order) => order.projectId === project.id);
            return projectOrders.length ? projectOrders.map((order) => (
              <tr key={`${project.id}-${order.id}`}>
                <td className="px-3 py-2 font-semibold">{project.code}</td>
                <td className="px-3 py-2">
                  {repoUrl ? <a className="inline-flex items-center gap-1 font-semibold text-teal hover:underline" href={repoUrl} target="_blank" rel="noreferrer">{project.githubOwner}/{project.githubRepo}<ExternalLink className="h-3 w-3" /></a> : "-"}
                </td>
                <td className="px-3 py-2">
                  {githubBranchUrl(project, order.gitBranch) ? <a className="text-teal hover:underline" href={githubBranchUrl(project, order.gitBranch)!} target="_blank" rel="noreferrer">{order.gitBranch}</a> : (order.gitBranch ?? "-")}
                </td>
                <td className="px-3 py-2">
                  {githubCommitUrl(project, order.gitCommit) ? <a className="font-mono text-xs text-teal hover:underline" href={githubCommitUrl(project, order.gitCommit)!} target="_blank" rel="noreferrer">{order.gitCommit?.slice(0, 10)}</a> : (order.gitCommit?.slice(0, 10) ?? "-")}
                </td>
                <td className="px-3 py-2"><StatusBadge value={order.status} /></td>
              </tr>
            )) : (
              <tr key={project.id}>
                <td className="px-3 py-2 font-semibold">{project.code}</td>
                <td className="px-3 py-2">{repoUrl ? <a className="inline-flex items-center gap-1 font-semibold text-teal hover:underline" href={repoUrl} target="_blank" rel="noreferrer">{project.githubOwner}/{project.githubRepo}<ExternalLink className="h-3 w-3" /></a> : "-"}</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2">-</td>
                <td className="px-3 py-2"><StatusBadge value={project.status} /></td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>
    </div>
  );
}

function EcsModule({ data, path, params }: { data: Awaited<ReturnType<typeof getData>>; path: string; params: Search }) {
  const items = filterRows(data.items, params, ["code", "name", "description"]);
  return (
    <div className="grid gap-4 xl:grid-cols-[390px_1fr]">
      <Panel title="Registrar ECS">
        <form action={createEcsAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
          <Field label="Biblioteca" required><Select name="libraryId" required>{data.libraries.map((library) => <option key={library.id} value={library.id}>{library.project.code} - {labelFor(library.type)}</option>)}</Select></Field>
          <Field label="Codigo" required><input className={inputClass} name="code" placeholder="ECS-API-001" required /></Field>
          <Field label="Nombre" required><input className={inputClass} name="name" required /></Field>
          <Field label="Tipo" required>
            <Select name="type" required>{["CODE", "DOCUMENT", "SCRIPT", "MODEL", "CONFIGURATION", "OTHER"].map((type) => <option key={type} value={type}>{labelFor(type)}</option>)}</Select>
          </Field>
          <Field label="Version inicial"><input className={inputClass} name="version" placeholder="1.0.0" /></Field>
          <Field label="Work item"><Select name="workItemId"><WorkItemOptions workItems={data.workItems} /></Select></Field>
          <Field label="Artefacto requerido"><Select name="artifactRequirementId"><ArtifactRequirementOptions requirements={data.artifactRequirements} /></Select></Field>
          <Field label="Solicitud"><Select name="changeRequestId"><ChangeOptions changes={data.changes} /></Select></Field>
          <Field label="Orden"><Select name="changeOrderId"><OrderOptions orders={data.orders} /></Select></Field>
          <Field label="Responsable" required><Select name="responsibleId" required><UserOptions users={data.users} projectId={data.currentProjectId} /></Select></Field>
          <Field label="Descripcion" required><textarea className={textareaClass} name="description" required /></Field>
          <Field label="Metadatos"><input className={inputClass} name="metadata" placeholder="lenguaje=TypeScript; capa=backend" /></Field>
          <Field label="Archivo" required><input className={inputClass} name="file" required type="file" /></Field>
          <Button>Registrar ECS</Button>
        </form>
      </Panel>
      <div>
        <Filters projects={data.projects} params={params} path={path} />
        <Panel title="ECS actuales">
          <DataTable headers={["Codigo", "Nombre", "Tipo", "Biblioteca", "Version", "Hash", "Estado"]}>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-3 py-2 font-semibold">{item.code}</td>
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{labelFor(item.type)}</td>
                <td className="px-3 py-2">{labelFor(item.library.type)}</td>
                <td className="px-3 py-2">{item.currentVersion}</td>
                <td className="px-3 py-2 font-mono text-xs">{item.sha256Hash?.slice(0, 12)}...</td>
                <td className="px-3 py-2"><StatusBadge value={item.status} /></td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}

function VersionsModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="Check-out">
          <form action={checkOutAction} className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <HiddenPath path={path} />
            <Field label="ECS" required><Select name="itemId" required><ItemOptions items={data.items} /></Select></Field>
            <Field label="Motivo"><input className={inputClass} name="reason" /></Field>
            <Button>Bloquear</Button>
          </form>
        </Panel>
        <Panel title="Check-in">
          <form action={checkInAction} className="grid gap-3">
            <HiddenPath path={path} />
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="ECS" required><Select name="itemId" required><ItemOptions items={data.items} /></Select></Field>
              <Field label="Version" required><input className={inputClass} name="version" placeholder="1.0.1" required /></Field>
              <Field label="Work item"><Select name="workItemId"><WorkItemOptions workItems={data.workItems} /></Select></Field>
              <Field label="Artefacto requerido"><Select name="artifactRequirementId"><ArtifactRequirementOptions requirements={data.artifactRequirements} /></Select></Field>
              <Field label="Solicitud"><Select name="changeRequestId"><ChangeOptions changes={data.changes} /></Select></Field>
              <Field label="Orden"><Select name="changeOrderId"><OrderOptions orders={data.orders} /></Select></Field>
              <Field label="Rama Git"><input className={inputClass} name="gitBranch" /></Field>
              <Field label="Commit"><input className={inputClass} name="gitCommit" /></Field>
              <Field label="Push ref"><input className={inputClass} name="gitPushRef" /></Field>
              <Field label="Archivo" required><input className={inputClass} name="file" required type="file" /></Field>
            </div>
            <Field label="Comentario" required><textarea className={textareaClass} name="comment" required /></Field>
            <Button>Registrar check-in</Button>
          </form>
        </Panel>
      </div>
      <Panel title="Historial de versiones">
        <DataTable headers={["ECS", "Version", "Comentario", "Usuario", "Rama", "Commit", "Hash"]}>
          {data.versions.map((version) => (
            <tr key={version.id}>
              <td className="px-3 py-2 font-semibold">{version.item.code}</td>
              <td className="px-3 py-2">{version.version}</td>
              <td className="px-3 py-2">{version.comment}</td>
              <td className="px-3 py-2">{version.createdBy.name}</td>
              <td className="px-3 py-2">{version.gitBranch ?? "-"}</td>
              <td className="px-3 py-2">{version.gitCommit ?? "-"}</td>
              <td className="px-3 py-2 font-mono text-xs">{version.sha256Hash.slice(0, 12)}...</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function LocksModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const active = data.locks.filter((lock) => lock.status === "ACTIVE");
  return (
    <Panel title="Bloqueos activos">
      {active.length === 0 ? <EmptyState>No hay bloqueos activos.</EmptyState> : (
        <DataTable headers={["ECS", "Bloqueado por", "Desde", "Estado", "Desbloqueo autorizado"]}>
          {active.map((lock) => (
            <tr key={lock.id}>
              <td className="px-3 py-2 font-semibold">{lock.item.code}</td>
              <td className="px-3 py-2">{lock.user.name}</td>
              <td className="px-3 py-2">{lock.lockedAt.toLocaleString("es-PE")}</td>
              <td className="px-3 py-2"><StatusBadge value={lock.status} /></td>
              <td className="px-3 py-2">
                <form action={forceUnlockAction} className="flex gap-2">
                  <HiddenPath path={path} />
                  <input name="lockId" type="hidden" value={lock.id} />
                  <input className={inputClass} name="forceReason" placeholder="Motivo obligatorio" required />
                  <Button variant="danger">Force unlock</Button>
                </form>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </Panel>
  );
}

function LibrariesModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
      <Panel title="Transferir ECS">
        <form action={transferLibraryAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="ECS" required><Select name="itemId" required><ItemOptions items={data.items} /></Select></Field>
          <Field label="Biblioteca destino" required><Select name="toLibraryId" required>{data.libraries.map((library) => <option key={library.id} value={library.id}>{library.project.code} - {labelFor(library.type)}</option>)}</Select></Field>
          <Field label="Motivo" required><textarea className={textareaClass} name="reason" required /></Field>
          <Button>Transferir ECS</Button>
        </form>
      </Panel>
      <Panel title="Movimientos">
        <DataTable headers={["ECS", "Origen", "Destino", "Usuario", "Motivo", "Estado"]}>
          {data.transfers.map((transfer) => (
            <tr key={transfer.id}>
              <td className="px-3 py-2 font-semibold">{transfer.item.code}</td>
              <td className="px-3 py-2">{labelFor(transfer.fromLibrary.type)}</td>
              <td className="px-3 py-2">{labelFor(transfer.toLibrary.type)}</td>
              <td className="px-3 py-2">{transfer.user.name}</td>
              <td className="px-3 py-2">{transfer.reason}</td>
              <td className="px-3 py-2"><StatusBadge value={transfer.status} /></td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function BaselinesModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
      <Panel title="Crear linea base">
        <form action={createBaselineAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
          <Field label="Codigo" required><input className={inputClass} name="code" placeholder="LB-2026-01" required /></Field>
          <Field label="Nombre" required><input className={inputClass} name="name" required /></Field>
          <Field label="Hito"><input className={inputClass} name="milestone" /></Field>
          <Field label="Descripcion"><textarea className={textareaClass} name="description" /></Field>
          <Field label="Versiones exactas" required>
            <select className="min-h-44 rounded-md border border-slate-300 px-3 py-2 text-sm" multiple name="versionIds" required>
              {data.versions.map((version) => <option key={version.id} value={version.id}>{version.item.code} v{version.version}</option>)}
            </select>
          </Field>
          <Button>Congelar linea base</Button>
        </form>
      </Panel>
      <Panel title="Lineas base">
        <DataTable headers={["Codigo", "Proyecto", "Nombre", "Estado", "ECS incluidos"]}>
          {data.baselines.map((baseline) => (
            <tr key={baseline.id}>
              <td className="px-3 py-2 font-semibold">{baseline.code}</td>
              <td className="px-3 py-2">{baseline.project.code}</td>
              <td className="px-3 py-2">{baseline.name}</td>
              <td className="px-3 py-2"><StatusBadge value={baseline.status} /></td>
              <td className="px-3 py-2">{baseline.items.map((item) => `${item.item.code} v${item.versionLabel}`).join(", ")}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function IncidentsModule({ data, path, params }: { data: Awaited<ReturnType<typeof getData>>; path: string; params: Search }) {
  const incidents = filterRows(data.incidents, params, ["ticketId", "title", "description"]);
  return (
    <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
      <Panel title="Registrar incidencia">
        <form action={createIncidentAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
          <Field label="Titulo" required><input className={inputClass} name="title" required /></Field>
          <Field label="Severidad" required><Select name="severity" required>{["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => <option key={s} value={s}>{labelFor(s)}</option>)}</Select></Field>
          <Field label="ECS afectado"><Select name="affectedItemId"><ItemOptions items={data.items} /></Select></Field>
          <Field label="Responsable"><Select name="assignedToId"><UserOptions users={data.users} projectId={data.currentProjectId} /></Select></Field>
          <Field label="Descripcion" required><textarea className={textareaClass} name="description" required /></Field>
          <Field label="Pasos de reproduccion" required><textarea className={textareaClass} name="reproductionSteps" required /></Field>
          <Button>Registrar incidencia</Button>
        </form>
      </Panel>
      <div>
        <Filters projects={data.projects} params={params} path={path} />
        <Panel title="Incidencias">
          <DataTable headers={["Ticket", "Proyecto", "Titulo", "Severidad", "ECS", "Responsable", "Estado"]}>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td className="px-3 py-2 font-semibold">{incident.ticketId}</td>
                <td className="px-3 py-2">{incident.project.code}</td>
                <td className="px-3 py-2">{incident.title}</td>
                <td className="px-3 py-2"><StatusBadge value={incident.severity} /></td>
                <td className="px-3 py-2">{incident.affectedItem?.code ?? "-"}</td>
                <td className="px-3 py-2">{incident.assignedTo?.name ?? "-"}</td>
                <td className="px-3 py-2">
                  <form action={updateIncidentStatusAction} className="flex gap-2">
                    <HiddenPath path={path} />
                    <input name="id" type="hidden" value={incident.id} />
                    <select className={inputClass} defaultValue={incident.status} name="status">
                      {["OPEN", "ASSIGNED", "IN_PROGRESS", "DERIVED_TO_CHANGE", "RESOLVED", "CLOSED"].map((status) => <option key={status} value={status}>{labelFor(status)}</option>)}
                    </select>
                    <Button variant="secondary">Guardar</Button>
                  </form>
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}

function ChangesModule({ data, path, params }: { data: Awaited<ReturnType<typeof getData>>; path: string; params: Search }) {
  const changes = filterRows(data.changes, params, ["ticketId", "title", "description"]);
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Panel title="Crear solicitud de cambio">
          <form action={createChangeRequestAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <Field label="Titulo" required><input className={inputClass} name="title" required /></Field>
            <Field label="Prioridad" required><Select name="priority" required>{["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => <option key={s} value={s}>{labelFor(s)}</option>)}</Select></Field>
            <Field label="Incidencia origen"><Select name="originIncidentId">{data.incidents.map((i) => <option key={i.id} value={i.id}>{i.ticketId} - {i.title}</option>)}</Select></Field>
            <Field label="ECS afectado"><Select name="affectedItemId"><ItemOptions items={data.items} /></Select></Field>
            <Field label="Descripcion" required><textarea className={textareaClass} name="description" required /></Field>
            <Field label="Justificacion" required><textarea className={textareaClass} name="justification" required /></Field>
            <Button>Registrar solicitud</Button>
          </form>
        </Panel>
        <div>
          <Filters projects={data.projects} params={params} path={path} />
          <Panel title="Solicitudes">
            <DataTable headers={["Ticket", "Proyecto", "Tipo", "Prioridad", "Estado", "Trazabilidad"]}>
              {changes.map((change) => (
                <tr key={change.id}>
                  <td className="px-3 py-2 font-semibold">{change.ticketId}</td>
                  <td className="px-3 py-2">{change.project.code}</td>
                  <td className="px-3 py-2">{labelFor(change.type)}</td>
                  <td className="px-3 py-2"><StatusBadge value={change.priority} /></td>
                  <td className="px-3 py-2"><StatusBadge value={change.status} /></td>
                  <td className="px-3 py-2">{change.affectedItems.map((link) => link.item.code).join(", ") || "-"}</td>
                </tr>
              ))}
            </DataTable>
          </Panel>
        </div>
      </div>
      <Panel title="Validacion inicial y observaciones">
        <DataTable headers={["Solicitud", "Estado", "Alineacion", "Observar formato", "Corregir"]}>
          {data.changes.slice(0, 12).map((change) => (
            <tr key={change.id}>
              <td className="px-3 py-2 font-semibold">{change.ticketId} - {change.title}</td>
              <td className="px-3 py-2"><StatusBadge value={change.status} /></td>
              <td className="px-3 py-2">
                <form action={validateAlignmentAction} className="grid gap-2">
                  <HiddenPath path={path} />
                  <input name="id" type="hidden" value={change.id} />
                  <select className={inputClass} name="decision" defaultValue="ALIGNED">
                    <option value="ALIGNED">Alineada</option>
                    <option value="NOT_ALIGNED">No alineada</option>
                  </select>
                  <input className={inputClass} name="reason" placeholder="Motivo si rechaza" />
                  <Button variant="secondary">Validar</Button>
                </form>
              </td>
              <td className="px-3 py-2">
                <form action={observeFormatAction} className="grid gap-2">
                  <HiddenPath path={path} />
                  <input name="id" type="hidden" value={change.id} />
                  <input className={inputClass} name="observations" placeholder="Campos faltantes" required />
                  <Button variant="secondary">Observar</Button>
                </form>
              </td>
              <td className="px-3 py-2">
                {change.status === "FORMAT_OBSERVED" ? (
                  <form action={resubmitChangeRequestAction} className="grid min-w-72 gap-2">
                    <HiddenPath path={path} />
                    <input name="id" type="hidden" value={change.id} />
                    <input className={inputClass} name="title" defaultValue={change.title} required />
                    <textarea className={textareaClass} name="description" defaultValue={change.description} required />
                    <textarea className={textareaClass} name="justification" defaultValue={change.justification} required />
                    <select className={inputClass} name="priority" defaultValue={change.priority}>
                      {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => <option key={s} value={s}>{labelFor(s)}</option>)}
                    </select>
                    <Button>Reenviar</Button>
                  </form>
                ) : "-"}
              </td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function ImpactModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[460px_1fr]">
      <Panel title="Registrar evaluacion">
        <form action={createImpactAssessmentAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Solicitud clasificada" required><Select name="changeRequestId" required><ChangeOptions changes={data.changes} statuses={["CLASSIFIED", "IMPACT_ANALYSIS"]} /></Select></Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Costo estimado" required><input className={inputClass} min="0" name="costEstimated" required step="0.01" type="number" /></Field>
            <Field label="Horas estimadas" required><input className={inputClass} min="1" name="timeEstimatedHours" required type="number" /></Field>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold"><input name="highImpact" type="checkbox" /> Alto impacto</label>
          {["risks:Riesgos", "requiredResources:Recursos necesarios", "technicalImpact:Impacto tecnico", "functionalImpact:Impacto funcional", "affectedItemsImpact:ECS afectados", "roi:Beneficio o ROI"].map((entry) => {
            const [name, label] = entry.split(":");
            return <Field key={name} label={label} required><textarea className={textareaClass} name={name} required /></Field>;
          })}
          <Button>Derivar aprobacion</Button>
        </form>
      </Panel>
      <Panel title="Evaluaciones">
        <DataTable headers={["Solicitud", "Costo", "Horas", "Ruta", "Alto impacto"]}>
          {data.impactAssessments.map((assessment) => (
            <tr key={assessment.id}>
              <td className="px-3 py-2 font-semibold">{assessment.changeRequest.ticketId}</td>
              <td className="px-3 py-2">{String(assessment.costEstimated)}</td>
              <td className="px-3 py-2">{assessment.timeEstimatedHours}</td>
              <td className="px-3 py-2">{labelFor(assessment.route)}</td>
              <td className="px-3 py-2">{assessment.highImpact ? "Si" : "No"}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function TechnicalApprovalModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const changes = data.changes.filter((change) => change.status === "FAST_APPROVAL");
  return (
    <Panel title="Bandeja de bajo impacto">
      {changes.length === 0 ? <EmptyState>No hay solicitudes en aprobacion rapida.</EmptyState> : (
        <DataTable headers={["Solicitud", "Impacto", "Decision"]}>
          {changes.map((change) => (
            <tr key={change.id}>
              <td className="px-3 py-2 font-semibold">{change.ticketId} - {change.title}</td>
              <td className="px-3 py-2">{change.impactAssessment?.risks ?? "-"}</td>
              <td className="px-3 py-2">
                <form action={technicalDecisionAction} className="grid gap-2">
                  <HiddenPath path={path} />
                  <input name="changeRequestId" type="hidden" value={change.id} />
                  <select className={inputClass} name="decision" defaultValue="APPROVED">
                    <option value="APPROVED">Aprobar</option>
                    <option value="REJECTED">Rechazar</option>
                  </select>
                  <input className={inputClass} name="reason" placeholder="Motivo obligatorio si rechaza" />
                  <Button>Registrar decision</Button>
                </form>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </Panel>
  );
}

function CcbModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <Panel title="Revisiones CCB">
      <DataTable headers={["Solicitud", "Estado", "Votos", "Resolucion"]}>
        {data.ccbReviews.map((review) => (
          <tr key={review.id}>
            <td className="px-3 py-2 font-semibold">{review.changeRequest.ticketId} - {review.changeRequest.title}</td>
            <td className="px-3 py-2"><StatusBadge value={review.changeRequest.status} /></td>
            <td className="px-3 py-2">{review.votes.map((vote) => `${vote.voter.name}: ${labelFor(vote.decision)}`).join(", ") || "-"}</td>
            <td className="px-3 py-2">
              <form action={ccbDecisionAction} className="grid gap-2">
                <HiddenPath path={path} />
                <input name="reviewId" type="hidden" value={review.id} />
                <select className={inputClass} name="decision" defaultValue="APPROVED">
                  <option value="APPROVED">Aprobar</option>
                  <option value="REJECTED">Rechazar</option>
                  <option value="POSTPONED">Aplazar</option>
                </select>
                <textarea className={textareaClass} name="resolution" placeholder="Resolucion formal o motivo" required />
                <input className={inputClass} name="comment" placeholder="Voto o comentario" />
                <Button>Emitir resolucion</Button>
              </form>
            </td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function OrdersModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
      <Panel title="Crear orden desde solicitud aprobada">
        <form action={createChangeOrderAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Solicitud" required><Select name="changeRequestId" required><ChangeOptions changes={data.changes} statuses={["APPROVED"]} /></Select></Field>
          <Field label="Desarrollador" required><Select name="developerId" required><UserOptions users={data.users} projectId={data.currentProjectId} roleSlug="DESARROLLADOR" /></Select></Field>
          <Field label="Prioridad" required><Select name="priority" required>{["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => <option key={s} value={s}>{labelFor(s)}</option>)}</Select></Field>
          <Field label="Fecha limite"><input className={inputClass} name="dueDate" type="date" /></Field>
          <Field label="Horas estimadas"><input className={inputClass} name="estimatedHours" type="number" /></Field>
          <Field label="Personas y recursos" required><textarea className={textareaClass} name="peopleResources" required /></Field>
          <Field label="Ambiente" required><input className={inputClass} name="environment" required /></Field>
          <Button>Crear orden</Button>
        </form>
      </Panel>
      <Panel title="Ordenes">
        <DataTable headers={["OC", "Solicitud", "Desarrollador", "Prioridad", "Estado"]}>
          {data.orders.map((order) => (
            <tr key={order.id}>
              <td className="px-3 py-2 font-semibold">{order.code}</td>
              <td className="px-3 py-2">{order.changeRequest.ticketId}</td>
              <td className="px-3 py-2">{order.developer?.name ?? "-"}</td>
              <td className="px-3 py-2"><StatusBadge value={order.priority} /></td>
              <td className="px-3 py-2"><StatusBadge value={order.status} /></td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function DeveloperOrdersModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <Panel title="Implementacion GitFlow">
      <DataTable headers={["Orden", "Solicitud", "Rama", "Estado", "Iniciar"]}>
        {data.orders.map((order) => (
          <tr key={order.id}>
            <td className="px-3 py-2 font-semibold">{order.code}</td>
            <td className="px-3 py-2">{order.changeRequest.title}</td>
            <td className="px-3 py-2">{order.gitBranch ?? "-"}</td>
            <td className="px-3 py-2"><StatusBadge value={order.status} /></td>
            <td className="px-3 py-2">
              <form action={startImplementationAction} className="grid gap-2">
                <HiddenPath path={path} />
                <input name="orderId" type="hidden" value={order.id} />
                <input className={inputClass} defaultValue={order.gitBranch ?? branchSuggestion(order)} name="gitBranch" placeholder="feature/sc-0001-rbac" required />
                <input className={inputClass} name="baseBranch" placeholder="main" />
                <label className="flex items-center gap-2 text-xs font-semibold"><input defaultChecked name="createGithubBranch" type="checkbox" /> Crear rama en GitHub</label>
                <Button><GitBranch className="h-4 w-4" />Iniciar</Button>
              </form>
            </td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function UnitTestsModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
      <Panel title="Registrar prueba unitaria">
        <form action={recordUnitTestAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Orden" required><Select name="changeOrderId" required><OrderOptions orders={data.orders} /></Select></Field>
          <Field label="Version ECS"><Select name="itemVersionId">{data.versions.map((version) => <option key={version.id} value={version.id}>{version.item.code} v{version.version}</option>)}</Select></Field>
          <Field label="Resultado" required><Select name="result" required><option value="PASSED">OK</option><option value="FAILED">No OK</option></Select></Field>
          <Field label="Errores"><textarea className={textareaClass} name="errors" /></Field>
          <Field label="Notas"><textarea className={textareaClass} name="notes" /></Field>
          <Field label="Commit"><input className={inputClass} name="gitCommit" /></Field>
          <Field label="Push ref"><input className={inputClass} name="gitPushRef" /></Field>
          <Field label="Base PR"><input className={inputClass} name="baseBranch" placeholder="main" /></Field>
          <label className="flex items-center gap-2 text-sm font-semibold"><input defaultChecked name="createGithubPullRequest" type="checkbox" value="on" /> Crear PR y notificar QA automaticamente</label>
          <Button>Guardar prueba</Button>
        </form>
      </Panel>
      <Panel title="Historial unitario">
        <DataTable headers={["Orden", "Resultado", "Ejecutado por", "Errores", "Fecha"]}>
          {data.unitTests.map((test) => (
            <tr key={test.id}>
              <td className="px-3 py-2 font-semibold">{test.changeOrder.code}</td>
              <td className="px-3 py-2"><StatusBadge value={test.result} /></td>
              <td className="px-3 py-2">{test.executedBy.name}</td>
              <td className="px-3 py-2">{test.errors ?? "-"}</td>
              <td className="px-3 py-2">{test.executedAt.toLocaleString("es-PE")}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function QaTestsModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4">
      <Panel title="Puerta documental para QA" subtitle="QA solo puede aprobar si los artefactos obligatorios de analisis, diseno e implementacion estan versionados y aprobados.">
        <DataTable headers={["Orden", "Work items", "Pendientes", "Listo"]}>
          {data.orders.map((order) => {
            const linked = data.workItems.filter((item) => item.changeOrderId === order.id || item.changeRequestId === order.changeRequestId);
            const pending = data.artifactRequirements.filter((requirement) =>
              linked.some((item) => item.id === requirement.workItemId) &&
              requirement.required &&
              requirement.requiresQaApproval &&
              requirement.status !== "QA_APPROVED" &&
              requirement.status !== "WAIVED"
            );
            return (
              <tr key={order.id}>
                <td className="px-3 py-2 font-semibold">{order.code}</td>
                <td className="px-3 py-2">{linked.map((item) => item.code).join(", ") || "-"}</td>
                <td className="px-3 py-2">{pending.length === 0 ? "-" : pending.map((item) => `${item.workItem.code}: ${item.name}`).slice(0, 4).join("; ")}</td>
                <td className="px-3 py-2"><StatusBadge value={linked.length > 0 && pending.length === 0 ? "READY_FOR_QA" : "PENDING"} /></td>
              </tr>
            );
          })}
        </DataTable>
      </Panel>
      <div className="grid gap-4 xl:grid-cols-[430px_1fr]">
      <Panel title="Registrar prueba QA">
        <form action={recordQaTestAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Orden lista para QA" required><Select name="changeOrderId" required><OrderOptions orders={data.orders} statuses={["READY_FOR_QA"]} /></Select></Field>
          <Field label="Tipo" required><Select name="type" required>{["FUNCTIONAL", "INTEGRATION", "REGRESSION"].map((type) => <option key={type} value={type}>{labelFor(type)}</option>)}</Select></Field>
          <Field label="Resultado" required><Select name="result" required><option value="PASSED">OK</option><option value="FAILED">No OK</option></Select></Field>
          <Field label="Notas"><textarea className={textareaClass} name="notes" /></Field>
          <Field label="Severidad defecto"><Select name="severity">{["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((s) => <option key={s} value={s}>{labelFor(s)}</option>)}</Select></Field>
          <Field label="Descripcion defecto"><textarea className={textareaClass} name="defectDescription" /></Field>
          <Button>Registrar QA</Button>
        </form>
      </Panel>
      <Panel title="Pruebas QA">
        <DataTable headers={["Orden", "Tipo", "Resultado", "QA", "Defectos"]}>
          {data.qaTests.map((test) => (
            <tr key={test.id}>
              <td className="px-3 py-2 font-semibold">{test.changeOrder.code}</td>
              <td className="px-3 py-2">{labelFor(test.type)}</td>
              <td className="px-3 py-2"><StatusBadge value={test.result} /></td>
              <td className="px-3 py-2">{test.executedBy.name}</td>
              <td className="px-3 py-2">{test.defects.length}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
      </div>
    </div>
  );
}

function DefectsModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <Panel title="Defectos registrados">
      <DataTable headers={["Codigo", "Orden", "Severidad", "Responsable", "Estado", "Actualizar"]}>
        {data.defects.map((defect) => (
          <tr key={defect.id}>
            <td className="px-3 py-2 font-semibold">{defect.code}</td>
            <td className="px-3 py-2">{defect.changeOrder.code}</td>
            <td className="px-3 py-2"><StatusBadge value={defect.severity} /></td>
            <td className="px-3 py-2">{defect.responsible?.name ?? "-"}</td>
            <td className="px-3 py-2"><StatusBadge value={defect.status} /></td>
            <td className="px-3 py-2">
              <form action={updateDefectStatusAction} className="flex gap-2">
                <HiddenPath path={path} />
                <input name="id" type="hidden" value={defect.id} />
                <select className={inputClass} defaultValue={defect.status} name="status">
                  {["OPEN", "ASSIGNED", "FIXED", "RETEST", "CLOSED"].map((status) => <option key={status} value={status}>{labelFor(status)}</option>)}
                </select>
                <Button variant="secondary">Guardar</Button>
              </form>
            </td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function UatModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
      <Panel title="Registrar UAT">
        <form action={recordUatAction} className="grid gap-3">
          <HiddenPath path={path} />
          <Field label="Solicitud" required><Select name="changeRequestId" required><ChangeOptions changes={data.changes} statuses={["UAT", "UAT_OBSERVATIONS"]} /></Select></Field>
          <Field label="Orden"><Select name="changeOrderId"><OrderOptions orders={data.orders} /></Select></Field>
          <Field label="Resultado" required><Select name="result" required><option value="ACCEPTED">OK</option><option value="OBSERVED">No OK</option></Select></Field>
          <Field label="Observaciones"><textarea className={textareaClass} name="observations" /></Field>
          <Field label="Acta de aceptacion"><input className={inputClass} name="acceptanceFile" type="file" /></Field>
          <Button>Registrar UAT</Button>
        </form>
      </Panel>
      <Panel title="Historial UAT">
        <DataTable headers={["Solicitud", "Resultado", "Solicitante", "Acta", "Observaciones"]}>
          {data.uatTests.map((uat) => (
            <tr key={uat.id}>
              <td className="px-3 py-2 font-semibold">{uat.changeRequest.ticketId}</td>
              <td className="px-3 py-2"><StatusBadge value={uat.result} /></td>
              <td className="px-3 py-2">{uat.executedBy.name}</td>
              <td className="px-3 py-2">{uat.acceptance ? "Registrada" : "-"}</td>
              <td className="px-3 py-2">{uat.observations ?? "-"}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function FinalValidationModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <Panel title="Criterios finales de calidad">
      <form action={finalQualityAction} className="mb-4 grid gap-3 rounded-md border border-slate-200 p-3 md:grid-cols-3">
        <HiddenPath path={path} />
        <Field label="Orden integrada" required><Select name="changeOrderId" required><OrderOptions orders={data.orders} /></Select></Field>
        <Field label="Resultado" required><Select name="result" required><option value="PASSED">Todo correcto</option><option value="FAILED">Revalidar</option></Select></Field>
        <Field label="SemVer"><input className={inputClass} name="semver" placeholder="1.1.0" /></Field>
        <Field label="Ambiente"><input className={inputClass} name="environment" placeholder="produccion" /></Field>
        <Field label="Observaciones"><textarea className={textareaClass} name="notes" /></Field>
        <div className="flex items-end"><Button><ShieldCheck className="h-4 w-4" />Registrar</Button></div>
      </form>
      <DataTable headers={["Release", "Solicitud", "Version", "Estado", "Ambiente"]}>
        {data.releases.map((release) => (
          <tr key={release.id}>
            <td className="px-3 py-2 font-semibold">{release.tagName ?? release.version}</td>
            <td className="px-3 py-2">{release.changeRequest?.ticketId ?? "-"}</td>
            <td className="px-3 py-2">{release.semver}</td>
            <td className="px-3 py-2"><StatusBadge value={release.status} /></td>
            <td className="px-3 py-2">{release.environment}</td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function ReleasesModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <Panel title="Liberaciones">
      <DataTable headers={["Version", "Proyecto", "Solicitud", "Estado", "Ejecucion"]}>
        {data.releases.map((release) => (
          <tr key={release.id}>
            <td className="px-3 py-2 font-semibold">{release.semver}</td>
            <td className="px-3 py-2">{release.project.code}</td>
            <td className="px-3 py-2">{release.changeRequest?.ticketId ?? "-"}</td>
            <td className="px-3 py-2"><StatusBadge value={release.status} /></td>
            <td className="px-3 py-2">
              {release.status === "APPROVED" ? (
                <form action={executeReleaseAction} className="grid gap-2">
                  <HiddenPath path={path} />
                  <input name="releaseId" type="hidden" value={release.id} />
                  <input className={inputClass} name="result" placeholder="Release ejecutado en ambiente" required />
                  <label className="flex items-center gap-2 text-xs font-semibold"><input name="createGithubTag" type="checkbox" /> Crear tag GitHub</label>
                  <Button>Ejecutar o registrar</Button>
                </form>
              ) : "-"}
            </td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function ClosePanel({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const releasable = data.changes.filter((change) => change.status === "RELEASED");
  if (releasable.length === 0) return null;
  return (
    <Panel title="Cierre de solicitud">
      <DataTable headers={["Solicitud", "Estado", "Cerrar"]}>
        {releasable.map((change) => (
          <tr key={change.id}>
            <td className="px-3 py-2 font-semibold">{change.ticketId} - {change.title}</td>
            <td className="px-3 py-2"><StatusBadge value={change.status} /></td>
            <td className="px-3 py-2">
              <form action={closeChangeRequestAction}>
                <HiddenPath path={path} />
                <input name="id" type="hidden" value={change.id} />
                <Button>Cerrar y archivar</Button>
              </form>
            </td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function IntegrationModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <Panel title="Integracion del cambio">
      <form action={integrateChangeAction} className="grid gap-3 rounded-md border border-slate-200 p-3 md:grid-cols-4">
        <HiddenPath path={path} />
        <Field label="Orden" required><Select name="changeOrderId" required><OrderOptions orders={data.orders} /></Select></Field>
        <Field label="SemVer" required><input className={inputClass} name="semver" placeholder="1.1.0" required /></Field>
        <Field label="Rama destino" required><input className={inputClass} name="integrationBranch" placeholder="main" required /></Field>
        <Field label="Commit merge" required><input className={inputClass} name="integrationCommit" required /></Field>
        <div className="flex items-end"><Button>Registrar integracion</Button></div>
      </form>
    </Panel>
  );
}

function TraceabilityModule({ data }: { data: Awaited<ReturnType<typeof getData>> }) {
  return (
    <div className="grid gap-4">
      <Panel title="Ciclo completo por solicitud">
        <DataTable headers={["Solicitud", "Incidencia", "ECS", "Impacto", "Aprobacion", "Orden", "QA/UAT", "Release", "Estado"]}>
          {data.changes.map((change) => (
            <tr key={change.id}>
              <td className="px-3 py-2 font-semibold">{change.ticketId}</td>
              <td className="px-3 py-2">{change.originIncident?.ticketId ?? "-"}</td>
              <td className="px-3 py-2">{change.affectedItems.map((item) => item.item.code).join(", ") || "-"}</td>
              <td className="px-3 py-2">{change.impactAssessment ? (change.impactAssessment.highImpact ? "Alto" : "Bajo") : "-"}</td>
              <td className="px-3 py-2">{change.technicalApproval?.decision ?? change.ccbReviews[0]?.resolution?.decision ?? "-"}</td>
              <td className="px-3 py-2">{change.changeOrder?.code ?? "-"}</td>
              <td className="px-3 py-2">{change.acceptanceRecords.length ? "UAT aceptado" : "-"}</td>
              <td className="px-3 py-2">{change.releases.map((release) => release.semver).join(", ") || "-"}</td>
              <td className="px-3 py-2"><StatusBadge value={change.status} /></td>
            </tr>
          ))}
        </DataTable>
      </Panel>
      <Panel title="Enlaces trazables">
        <DataTable headers={["Proyecto", "Origen", "Relacion", "Destino", "Creado por"]}>
          {data.traceabilityLinks.map((link) => (
            <tr key={link.id}>
              <td className="px-3 py-2">{link.project.code}</td>
              <td className="px-3 py-2">{link.sourceType}:{link.sourceId.slice(0, 8)}</td>
              <td className="px-3 py-2">{link.relationType}</td>
              <td className="px-3 py-2">{link.targetType}:{link.targetId.slice(0, 8)}</td>
              <td className="px-3 py-2">{link.createdBy?.name ?? "Sistema"}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function AuditModule({ data }: { data: Awaited<ReturnType<typeof getData>> }) {
  return (
    <Panel title="Logs de auditoria">
      <DataTable headers={["Fecha", "Usuario", "Modulo", "Accion", "Detalle"]}>
        {data.auditLogs.map((log) => (
          <tr key={log.id}>
            <td className="px-3 py-2">{log.createdAt.toLocaleString("es-PE")}</td>
            <td className="px-3 py-2">{log.user?.name ?? "Sistema"}</td>
            <td className="px-3 py-2">{log.module}</td>
            <td className="px-3 py-2">{log.action}</td>
            <td className="max-w-lg truncate px-3 py-2">{log.newDetail ?? log.previousDetail ?? "-"}</td>
          </tr>
        ))}
      </DataTable>
    </Panel>
  );
}

function IntegrityModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  return (
    <div className="grid gap-4">
      <Panel title="Validar ECS">
        <form action={validateIntegrityAction} className="flex flex-wrap items-end gap-3">
          <HiddenPath path={path} />
          <Field label="ECS" required><Select name="itemId" required><ItemOptions items={data.items} /></Select></Field>
          <Button>Validar SHA-256</Button>
        </form>
      </Panel>
      <Panel title="Alertas">
        <DataTable headers={["Proyecto", "ECS", "Esperado", "Actual", "Estado", "Detalle"]}>
          {data.integrityAlerts.map((alert) => (
            <tr key={alert.id}>
              <td className="px-3 py-2">{alert.project?.code ?? "-"}</td>
              <td className="px-3 py-2">{alert.item?.code ?? "-"}</td>
              <td className="px-3 py-2 font-mono text-xs">{alert.expectedHash.slice(0, 12)}...</td>
              <td className="px-3 py-2 font-mono text-xs">{alert.actualHash.slice(0, 12)}...</td>
              <td className="px-3 py-2"><StatusBadge value={alert.status} /></td>
              <td className="px-3 py-2">{alert.detail}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function BacklogModule({ data, path, params }: { data: Awaited<ReturnType<typeof getData>>; path: string; params: Search }) {
  const workItems = filterRows(data.workItems, params, ["code", "title", "description"]);
  const linkTypes = ["PARENT", "CHILD", "RELATED", "PREDECESSOR", "SUCCESSOR", "GITHUB_BRANCH", "GITHUB_COMMIT", "GITHUB_PULL_REQUEST", "GITHUB_ISSUE", "CHANGE_REQUEST", "CHANGE_ORDER", "CONFIG_ITEM", "RELEASE"];
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Panel title="Crear work item">
          <form action={createWorkItemAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Tipo" required><Select name="type" required>{["EPIC", "FEATURE", "USER_STORY", "TASK", "BUG", "ISSUE"].map((type) => <option key={type} value={type}>{labelFor(type)}</option>)}</Select></Field>
              <Field label="Prioridad"><Select name="priority" defaultValue="MEDIUM">{["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((priority) => <option key={priority} value={priority}>{labelFor(priority)}</option>)}</Select></Field>
              <Field label="Estado"><Select name="state" defaultValue="NEW">{["NEW", "ACTIVE", "RESOLVED", "CLOSED"].map((state) => <option key={state} value={state}>{labelFor(state)}</option>)}</Select></Field>
              <Field label="Story points"><input className={inputClass} min="0" name="storyPoints" type="number" /></Field>
            </div>
            <Field label="Titulo" required><input className={inputClass} name="title" required /></Field>
            <Field label="Descripcion" required><textarea className={textareaClass} name="description" required /></Field>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Asignado a"><Select name="assignedToId"><UserOptions users={data.users} projectId={data.currentProjectId} /></Select></Field>
              <Field label="Sprint"><Select name="sprintId"><SprintOptions sprints={data.sprints} projectId={data.currentProjectId} /></Select></Field>
              <Field label="Actividad"><Select name="activityId"><ActivityOptions activities={data.projectActivities} projectId={data.currentProjectId} /></Select></Field>
              <Field label="Vence"><input className={inputClass} name="dueDate" type="date" /></Field>
              <Field label="Solicitud"><Select name="changeRequestId"><ChangeOptions changes={data.changes} /></Select></Field>
              <Field label="Orden"><Select name="changeOrderId"><OrderOptions orders={data.orders} /></Select></Field>
            </div>
            <div className="grid gap-3 rounded-md border border-slate-200 p-3">
              <Field label="Rama GitHub"><input className={inputClass} name="githubBranch" placeholder="feature/wi-0001-login" /></Field>
              <Field label="Rama base"><input className={inputClass} name="baseBranch" placeholder="main" /></Field>
              <label className="flex items-center gap-2 text-sm font-semibold"><input name="createGithubBranch" type="checkbox" value="on" /> Crear rama GitHub</label>
              <label className="flex items-center gap-2 text-sm font-semibold"><input name="createGithubIssue" type="checkbox" value="on" /> Crear issue GitHub</label>
            </div>
            <Button><Plus className="h-4 w-4" />Crear work item</Button>
          </form>
        </Panel>
        <div>
          <Filters projects={data.projects} params={params} path={path} />
          <Panel title="Backlog">
            <DataTable headers={["ID", "Tipo", "Titulo", "Estado", "Asignado", "Sprint", "GitHub", "Actualizar"]}>
              {workItems.map((item) => {
                const branchUrl = githubBranchUrl(item.project, item.githubBranch);
                return (
                  <tr key={item.id}>
                    <td className="px-3 py-2 font-semibold">{item.code}</td>
                    <td className="px-3 py-2">{labelFor(item.type)}</td>
                    <td className="max-w-sm px-3 py-2">{item.title}</td>
                    <td className="px-3 py-2"><StatusBadge value={item.state} /></td>
                    <td className="px-3 py-2">{item.assignedTo?.name ?? "-"}</td>
                    <td className="px-3 py-2">{item.sprint?.name ?? "-"}</td>
                    <td className="px-3 py-2">
                      <div className="grid gap-1 text-xs">
                        {branchUrl ? <a className="text-teal hover:underline" href={branchUrl} target="_blank" rel="noreferrer">{item.githubBranch}</a> : item.githubBranch ?? "-"}
                        {item.githubPullRequestUrl ? <a className="text-teal hover:underline" href={item.githubPullRequestUrl} target="_blank" rel="noreferrer">PR</a> : null}
                        {item.githubIssueUrl ? <a className="text-teal hover:underline" href={item.githubIssueUrl} target="_blank" rel="noreferrer">Issue</a> : null}
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <form action={setWorkItemStateAction} className="flex gap-2">
                        <HiddenPath path={path} />
                        <input name="id" type="hidden" value={item.id} />
                        <select className={inputClass} defaultValue={item.state} name="state">
                          {["NEW", "ACTIVE", "RESOLVED", "CLOSED", "REMOVED"].map((state) => <option key={state} value={state}>{labelFor(state)}</option>)}
                        </select>
                        <Button variant="secondary">Guardar</Button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </DataTable>
          </Panel>
        </div>
      </div>
      <Panel title="Matriz de analisis, diseno e implementacion">
        {data.artifactRequirements.length === 0 ? (
          <EmptyState>Cree un work item para generar automaticamente los artefactos requeridos segun la metodologia del proyecto.</EmptyState>
        ) : (
          <DataTable headers={["Work item", "Etapa", "Artefacto", "Versiones", "Estado", "Revision QA"]}>
            {data.artifactRequirements.map((requirement) => (
              <tr key={requirement.id}>
                <td className="px-3 py-2">
                  <div className="font-semibold">{requirement.workItem.code}</div>
                  <div className="text-xs text-slate-500">{requirement.workItem.title}</div>
                </td>
                <td className="px-3 py-2">{labelFor(requirement.lifecycleStage)}</td>
                <td className="px-3 py-2">
                  <div className="font-semibold">{requirement.name}</div>
                  <div className="max-w-md text-xs text-slate-500">{requirement.description}</div>
                  {!requirement.required ? <div className="mt-1 text-xs font-semibold text-slate-400">Opcional</div> : null}
                </td>
                <td className="px-3 py-2">
                  {requirement.versions.length === 0 ? "-" : requirement.versions.map((version) => (
                    <div className="text-xs" key={version.id}>
                      <span className="font-semibold">{version.item.code}</span> v{version.itemVersion.version}
                    </div>
                  ))}
                </td>
                <td className="px-3 py-2"><StatusBadge value={requirement.status} /></td>
                <td className="px-3 py-2">
                  <form action={reviewArtifactRequirementAction} className="grid min-w-48 gap-2">
                    <HiddenPath path={path} />
                    <input name="id" type="hidden" value={requirement.id} />
                    <select className={inputClass} defaultValue={requirement.status === "QA_REJECTED" ? "QA_REJECTED" : "QA_APPROVED"} name="decision">
                      <option value="QA_APPROVED">Aprobar</option>
                      <option value="QA_REJECTED">Rechazar</option>
                      <option value="WAIVED">Exceptuar</option>
                    </select>
                    <input className={inputClass} name="reviewNotes" placeholder="Observaciones" />
                    <Button variant="secondary">Registrar</Button>
                  </form>
                </td>
              </tr>
            ))}
          </DataTable>
        )}
      </Panel>
      <Panel title="Enlazar work items y evidencias">
        <form action={linkWorkItemAction} className="grid gap-3 md:grid-cols-6 md:items-end">
          <HiddenPath path={path} />
          <Field label="Origen" required><Select name="sourceWorkItemId" required><WorkItemOptions workItems={data.workItems} /></Select></Field>
          <Field label="Tipo" required><Select name="linkType" required>{linkTypes.map((type) => <option key={type} value={type}>{labelFor(type)}</option>)}</Select></Field>
          <Field label="Destino interno"><Select name="targetWorkItemId"><WorkItemOptions workItems={data.workItems} /></Select></Field>
          <Field label="URL externa"><input className={inputClass} name="targetUrl" placeholder="https://github.com/..." /></Field>
          <Field label="ID externo"><input className={inputClass} name="externalId" placeholder="SHA, rama o numero" /></Field>
          <Button>Enlazar</Button>
        </form>
      </Panel>
    </div>
  );
}

function SprintsModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const columns = ["NEW", "ACTIVE", "RESOLVED", "CLOSED"];
  return (
    <div className="grid gap-4">
      <Panel title="Crear sprint">
        <form action={createSprintAction} className="grid gap-3 md:grid-cols-6 md:items-end">
          <HiddenPath path={path} />
          <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
          <Field label="Nombre" required><input className={inputClass} name="name" placeholder="Sprint 1" required /></Field>
          <Field label="Inicio" required><input className={inputClass} name="startDate" required type="date" /></Field>
          <Field label="Fin" required><input className={inputClass} name="endDate" required type="date" /></Field>
          <Field label="Capacidad horas"><input className={inputClass} min="0" name="capacityHours" type="number" /></Field>
          <Button>Crear sprint</Button>
          <Field label="Objetivo"><textarea className={textareaClass} name="goal" /></Field>
        </form>
      </Panel>
      {data.sprints.length === 0 ? <EmptyState>No hay sprints registrados.</EmptyState> : data.sprints.map((sprint) => (
        <Panel key={sprint.id} title={`${sprint.project.code} - ${sprint.name}`} subtitle={`${formatDate(sprint.startDate)} a ${formatDate(sprint.endDate)} | Capacidad ${sprint.capacityHours ?? 0}h`}>
          <div className="grid gap-3 lg:grid-cols-4">
            {columns.map((state) => (
              <div className="rounded-md border border-slate-200" key={`${sprint.id}-${state}`}>
                <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold uppercase text-slate-500">{labelFor(state)}</div>
                <div className="grid min-h-28 gap-2 p-2">
                  {sprint.workItems.filter((item: Row) => item.state === state).map((item: Row) => (
                    <div className="rounded-md border border-slate-200 bg-white p-2 text-sm" key={item.id}>
                      <div className="font-bold">{item.code}</div>
                      <div className="mt-1 text-slate-600">{item.title}</div>
                      <div className="mt-2 text-xs text-slate-500">{item.assignedTo?.name ?? "Sin asignar"}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      ))}
    </div>
  );
}

function MethodologyModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const methodologyTypes = ["RUP", "SCRUM", "KANBAN", "CASCADA", "XP", "CUSTOM"];
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Panel title="Configurar metodologia">
          <form action={configureProjectMethodologyAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <Field label="Metodologia" required><Select name="methodologyType" required>{methodologyTypes.map((type) => <option key={type} value={type}>{labelFor(type)}</option>)}</Select></Field>
            <Field label="Notas"><textarea className={textareaClass} name="methodologyNotes" /></Field>
            <label className="flex items-center gap-2 text-sm font-semibold"><input defaultChecked name="createDefaultPhases" type="checkbox" value="on" /> Crear fases base</label>
            <Button>Guardar metodologia</Button>
          </form>
        </Panel>
        <Panel title="Metodologias por proyecto">
          <DataTable headers={["Proyecto", "Metodologia", "Fases", "Actividades", "Configurada"]}>
            {data.projects.map((project) => (
              <tr key={project.id}>
                <td className="px-3 py-2 font-semibold">{project.code}</td>
                <td className="px-3 py-2">{labelFor(project.methodologyType)}</td>
                <td className="px-3 py-2">{data.methodologyPhases.filter((phase) => phase.projectId === project.id).length}</td>
                <td className="px-3 py-2">{data.projectActivities.filter((activity) => activity.projectId === project.id).length}</td>
                <td className="px-3 py-2">{formatDate(project.methodologyConfiguredAt)}</td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Panel title="Agregar fase">
          <form action={createMethodologyPhaseAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <Field label="Metodologia"><Select name="methodologyType">{methodologyTypes.map((type) => <option key={type} value={type}>{labelFor(type)}</option>)}</Select></Field>
            <Field label="Fase" required><input className={inputClass} name="name" required /></Field>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Orden"><input className={inputClass} name="sortOrder" type="number" /></Field>
              <Field label="Responsable"><Select name="ownerId"><UserOptions users={data.users} projectId={data.currentProjectId} /></Select></Field>
              <Field label="Inicio"><input className={inputClass} name="startDate" type="date" /></Field>
              <Field label="Fin"><input className={inputClass} name="endDate" type="date" /></Field>
            </div>
            <Field label="Entregables obligatorios" required><textarea className={textareaClass} name="requiredDeliverables" required /></Field>
            <Field label="Criterios de aceptacion"><textarea className={textareaClass} name="acceptanceCriteria" /></Field>
            <Button>Agregar fase</Button>
          </form>
        </Panel>
        <Panel title="Fases y cumplimiento">
          <DataTable headers={["Fase", "Metodologia", "Responsable", "Entregables", "Avance", "Estado"]}>
            {data.methodologyPhases.map((phase) => (
              <tr key={phase.id}>
                <td className="px-3 py-2 font-semibold">{phase.project.code} - {phase.name}</td>
                <td className="px-3 py-2">{labelFor(phase.methodologyType)}</td>
                <td className="px-3 py-2">{phase.owner?.name ?? "-"}</td>
                <td className="max-w-md px-3 py-2 text-xs text-slate-600">{phase.requiredDeliverables}</td>
                <td className="px-3 py-2">{phaseProgress(phase)}%</td>
                <td className="px-3 py-2">
                  <form action={setMethodologyPhaseStatusAction} className="flex gap-2">
                    <HiddenPath path={path} />
                    <input name="id" type="hidden" value={phase.id} />
                    <select className={inputClass} defaultValue={phase.status} name="status">
                      {["PENDING", "IN_PROGRESS", "DONE", "BLOCKED"].map((status) => <option key={status} value={status}>{labelFor(status)}</option>)}
                    </select>
                    <Button variant="secondary">Guardar</Button>
                  </form>
                </td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Panel title="Registrar actividad">
          <form action={createProjectActivityAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <Field label="Fase"><Select name="phaseId"><PhaseOptions phases={data.methodologyPhases} projectId={data.currentProjectId} /></Select></Field>
            <Field label="Actividad" required><input className={inputClass} name="title" required /></Field>
            <Field label="Responsable" required><Select name="responsibleId" required><UserOptions users={data.users} projectId={data.currentProjectId} /></Select></Field>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Inicio" required><input className={inputClass} name="startDate" required type="date" /></Field>
              <Field label="Fin" required><input className={inputClass} name="endDate" required type="date" /></Field>
              <Field label="Avance %"><input className={inputClass} max="100" min="0" name="progress" type="number" /></Field>
              <Field label="Estado"><Select name="status" defaultValue="PLANNED">{["PLANNED", "IN_PROGRESS", "DONE", "BLOCKED"].map((status) => <option key={status} value={status}>{labelFor(status)}</option>)}</Select></Field>
            </div>
            <Field label="Entregable ECS/documento" required><textarea className={textareaClass} name="deliverable" required /></Field>
            <Field label="Descripcion"><textarea className={textareaClass} name="description" /></Field>
            <Button>Agregar actividad</Button>
          </form>
        </Panel>
        <Panel title="Cronograma por actividades">
          <DataTable headers={["Actividad", "Fase", "Responsable", "Fechas", "Entregable", "Avance", "Cumplimiento"]}>
            {data.projectActivities.map((activity) => (
              <tr key={activity.id}>
                <td className="px-3 py-2 font-semibold">{activity.title}</td>
                <td className="px-3 py-2">{activity.phase?.name ?? "-"}</td>
                <td className="px-3 py-2">{activity.responsible.name}</td>
                <td className="px-3 py-2">{formatDate(activity.startDate)} - {formatDate(activity.endDate)}</td>
                <td className="max-w-sm px-3 py-2 text-xs text-slate-600">{activity.deliverable}</td>
                <td className="px-3 py-2">
                  <form action={setProjectActivityStatusAction} className="grid min-w-36 gap-2">
                    <HiddenPath path={path} />
                    <input name="id" type="hidden" value={activity.id} />
                    <input className={inputClass} defaultValue={activity.progress} max="100" min="0" name="progress" type="number" />
                    <select className={inputClass} defaultValue={activity.status} name="status">
                      {["PLANNED", "IN_PROGRESS", "DONE", "BLOCKED"].map((status) => <option key={status} value={status}>{labelFor(status)}</option>)}
                    </select>
                    <Button variant="secondary">Guardar</Button>
                  </form>
                </td>
                <td className="px-3 py-2"><StatusBadge value={activityCompliance(activity)} /></td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
    </div>
  );
}

function DailyReportsModule({ data, path }: { data: Awaited<ReturnType<typeof getData>>; path: string }) {
  const teamHours = data.projectUsers
    .filter((assignment) => assignment.active)
    .map((assignment) => ({
      assignment,
      logs: data.dailyWorkLogs.filter((log) => log.userId === assignment.userId)
    }));
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 xl:grid-cols-[420px_1fr]">
        <Panel title="Registrar dia de trabajo">
          <form action={registerDailyWorkLogAction} className="grid gap-3">
            <HiddenPath path={path} />
            <Field label="Proyecto" required><Select name="projectId" required><ProjectOptions projects={data.projects} /></Select></Field>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Fecha" required><input className={inputClass} defaultValue={dateInputValue()} name="logDate" required type="date" /></Field>
              <Field label="Horas" required><input className={inputClass} min="0" name="hours" required step="0.25" type="number" /></Field>
              <Field label="Work item"><Select name="workItemId"><WorkItemOptions workItems={data.workItems} /></Select></Field>
              <Field label="Orden"><Select name="changeOrderId"><OrderOptions orders={data.orders} /></Select></Field>
              <Field label="Actividad"><Select name="activityId"><ActivityOptions activities={data.projectActivities} projectId={data.currentProjectId} /></Select></Field>
              <Field label="Estado item"><Select name="stateAfter"><option value="">Sin cambio</option>{["NEW", "ACTIVE", "RESOLVED", "CLOSED", "REMOVED"].map((state) => <option key={state} value={state}>{labelFor(state)}</option>)}</Select></Field>
            </div>
            <Field label="Trabajo realizado" required><textarea className={textareaClass} name="completed" required /></Field>
            <Field label="Plan siguiente" required><textarea className={textareaClass} name="nextPlan" required /></Field>
            <Field label="Bloqueos"><textarea className={textareaClass} name="blockers" /></Field>
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Rama GitHub"><input className={inputClass} name="githubBranch" /></Field>
              <Field label="Commit"><input className={inputClass} name="githubCommit" /></Field>
              <Field label="Pull request"><input className={inputClass} name="githubPullRequestUrl" placeholder="https://github.com/..." /></Field>
              <Field label="Avance actividad %"><input className={inputClass} max="100" min="0" name="activityProgress" type="number" /></Field>
            </div>
            <Button>Registrar reporte</Button>
          </form>
        </Panel>
        <Panel title="Horas por integrante">
          <DataTable headers={["Integrante", "Rol", "Reportes", "Horas", "Ultimo reporte"]}>
            {teamHours.map(({ assignment, logs }) => (
              <tr key={assignment.id}>
                <td className="px-3 py-2 font-semibold">{assignment.user.name}</td>
                <td className="px-3 py-2">{assignment.role.name}</td>
                <td className="px-3 py-2">{logs.length}</td>
                <td className="px-3 py-2">{logs.reduce((sum, log) => sum + Number(log.hours), 0).toFixed(1)}</td>
                <td className="px-3 py-2">{formatDate(logs[0]?.logDate)}</td>
              </tr>
            ))}
          </DataTable>
        </Panel>
      </div>
      <Panel title="Reportes diarios">
        <DataTable headers={["Fecha", "Usuario", "Work item", "Horas", "Realizado", "Siguiente", "GitHub", "Bloqueos"]}>
          {data.dailyWorkLogs.map((log) => (
            <tr key={log.id}>
              <td className="px-3 py-2">{formatDate(log.logDate)}</td>
              <td className="px-3 py-2 font-semibold">{log.user.name}</td>
              <td className="px-3 py-2">{log.workItem?.code ?? log.changeOrder?.code ?? log.activity?.title ?? "-"}</td>
              <td className="px-3 py-2">{String(log.hours)}</td>
              <td className="max-w-sm px-3 py-2">{log.completed}</td>
              <td className="max-w-sm px-3 py-2">{log.nextPlan}</td>
              <td className="px-3 py-2">
                <div className="grid gap-1 text-xs">
                  <span>{log.githubBranch ?? "-"}</span>
                  <span>{log.githubCommit ? log.githubCommit.slice(0, 10) : "-"}</span>
                  {log.githubPullRequestUrl ? <a className="text-teal hover:underline" href={log.githubPullRequestUrl} target="_blank" rel="noreferrer">PR</a> : null}
                </div>
              </td>
              <td className="max-w-xs px-3 py-2">{log.blockers ?? "-"}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function ReportsModule({ data, path, params }: { data: Awaited<ReturnType<typeof getData>>; path: string; params: Search }) {
  const changes = filterRows(data.changes, params, ["ticketId", "title"]);
  const items = filterRows(data.items, params, ["code", "name"]);
  const incidents = filterRows(data.incidents, params, ["ticketId", "title"]);
  return (
    <div className="grid gap-4">
      <Filters projects={data.projects} params={params} path={path} />
      <div className="flex justify-end">
        <Link className="inline-flex h-9 items-center rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-ink hover:bg-slate-50" href="/api/reportes/export">
          Exportar CSV
        </Link>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Panel title="Estado general del proyecto">
          <DataTable headers={["Proyecto", "ECS", "SC", "Incidencias", "Releases"]}>
            {data.projects.map((project) => (
              <tr key={project.id}>
                <td className="px-3 py-2 font-semibold">{project.code}</td>
                <td className="px-3 py-2">{data.items.filter((item) => item.projectId === project.id).length}</td>
                <td className="px-3 py-2">{data.changes.filter((change) => change.projectId === project.id).length}</td>
                <td className="px-3 py-2">{data.incidents.filter((incident) => incident.projectId === project.id).length}</td>
                <td className="px-3 py-2">{data.releases.filter((release) => release.projectId === project.id).length}</td>
              </tr>
            ))}
          </DataTable>
        </Panel>
        <Panel title="Inventario ECS"><div className="text-3xl font-bold">{items.length}</div><p className="mt-1 text-sm text-slate-500">Elementos filtrados</p></Panel>
        <Panel title="Solicitudes e incidencias"><div className="text-3xl font-bold">{changes.length}/{incidents.length}</div><p className="mt-1 text-sm text-slate-500">Solicitudes / incidencias</p></Panel>
      </div>
      <Panel title="Reporte de solicitudes">
        <DataTable headers={["Ticket", "Proyecto", "Tipo", "Estado", "Responsable"]}>
          {changes.map((change) => (
            <tr key={change.id}>
              <td className="px-3 py-2 font-semibold">{change.ticketId}</td>
              <td className="px-3 py-2">{change.project.code}</td>
              <td className="px-3 py-2">{labelFor(change.type)}</td>
              <td className="px-3 py-2"><StatusBadge value={change.status} /></td>
              <td className="px-3 py-2">{change.requester.name}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  );
}

function Module({
  path,
  data,
  params
}: {
  path: string;
  data: Awaited<ReturnType<typeof getData>>;
  params: Search;
}) {
  if (path === "/dashboard") return <Dashboard data={data} />;
  if (path === "/boards/backlog") return <BacklogModule data={data} path={path} params={params} />;
  if (path === "/boards/sprints") return <SprintsModule data={data} path={path} />;
  if (path === "/boards/metodologia") return <MethodologyModule data={data} path={path} />;
  if (path === "/boards/reportes-diarios") return <DailyReportsModule data={data} path={path} />;
  if (path === "/admin/usuarios") return <UsersModule data={data} path={path} />;
  if (path === "/admin/roles") return <RolesModule data={data} path={path} />;
  if (path === "/admin/proyectos") return <ProjectsModule data={data} path={path} />;
  if (path === "/github/workspace") return <GithubWorkspaceModule data={data} path={path} />;
  if (path === "/admin/auditoria") return <AuditModule data={data} />;
  if (path === "/admin/integridad") return <IntegrityModule data={data} path={path} />;
  if (path === "/configuracion/ecs") return <EcsModule data={data} path={path} params={params} />;
  if (path === "/configuracion/versiones") return <VersionsModule data={data} path={path} />;
  if (path === "/configuracion/bloqueos") return <LocksModule data={data} path={path} />;
  if (path === "/configuracion/bibliotecas") return <LibrariesModule data={data} path={path} />;
  if (path === "/configuracion/lineas-base") return <BaselinesModule data={data} path={path} />;
  if (path === "/configuracion/trazabilidad") return <TraceabilityModule data={data} />;
  if (path === "/cambios/solicitudes") return <div className="grid gap-4"><ChangesModule data={data} path={path} params={params} /><ClosePanel data={data} path={path} /></div>;
  if (path === "/cambios/evaluacion-impacto") return <ImpactModule data={data} path={path} />;
  if (path === "/cambios/aprobacion-tecnica") return <TechnicalApprovalModule data={data} path={path} />;
  if (path === "/cambios/ccb") return <CcbModule data={data} path={path} />;
  if (path === "/cambios/ordenes") return <OrdersModule data={data} path={path} />;
  if (path === "/desarrollo/mis-ordenes") return <DeveloperOrdersModule data={data} path={path} />;
  if (path === "/desarrollo/pruebas-unitarias") return <UnitTestsModule data={data} path={path} />;
  if (path === "/qa/pruebas") return <QaTestsModule data={data} path={path} />;
  if (path === "/qa/defectos") return <DefectsModule data={data} path={path} />;
  if (path === "/qa/uat") return <UatModule data={data} path={path} />;
  if (path === "/qa/validacion-final") return <div className="grid gap-4"><IntegrationModule data={data} path={path} /><FinalValidationModule data={data} path={path} /></div>;
  if (path === "/liberacion/releases") return <ReleasesModule data={data} path={path} />;
  if (path === "/soporte/incidencias") return <IncidentsModule data={data} path={path} params={params} />;
  if (path === "/reportes") return <ReportsModule data={data} path={path} params={params} />;
  return <EmptyState>Ruta no registrada en el SRS.</EmptyState>;
}

export default async function ProtectedPage({
  params,
  searchParams
}: {
  params: Promise<{ segments?: string[] }>;
  searchParams: Promise<Search>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const path = `/${resolvedParams.segments?.join("/") || "dashboard"}`;
  const permission = permissionForPath(path);
  const user = await requireUser(permission);
  const data = await getData(user);
  const meta = routeMeta[path] ?? routeMeta["/dashboard"];

  return (
    <AppShell currentPath={path} user={user}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">{meta.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{meta.subtitle}</p>
        </div>
      </div>
      <Message params={resolvedSearch} />
      <Module data={data} params={resolvedSearch} path={path} />
    </AppShell>
  );
}
