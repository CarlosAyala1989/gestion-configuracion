export type SessionUser = {
  id: string;
  name: string;
  email: string;
  roleSlug: string;
  roleName: string;
  permissions: string[];
  projectSelected: boolean;
  projectId?: string | null;
  projectCode?: string | null;
  projectName?: string | null;
  globalRoleSlug: string;
  globalRoleName: string;
};

export type MenuItem = {
  href: string;
  label: string;
  group: string;
  permission: string;
};

export const menuItems: MenuItem[] = [
  { href: "/dashboard", label: "Mi Panel de Trabajo", group: "Operacion", permission: "dashboard.read" },
  { href: "/boards/backlog", label: "Backlog", group: "Boards", permission: "boards.work.manage" },
  { href: "/boards/sprints", label: "Sprints", group: "Boards", permission: "boards.sprints.manage" },
  { href: "/boards/metodologia", label: "Metodologia", group: "Boards", permission: "boards.methodology.manage" },
  { href: "/boards/reportes-diarios", label: "Reportes diarios", group: "Boards", permission: "daily.logs.manage" },
  { href: "/admin/usuarios", label: "Usuarios", group: "Administracion", permission: "admin.users.manage" },
  { href: "/admin/roles", label: "Roles y permisos", group: "Administracion", permission: "admin.roles.manage" },
  { href: "/admin/proyectos", label: "Proyectos", group: "Administracion", permission: "admin.projects.manage" },
  { href: "/admin/auditoria", label: "Auditoria", group: "Administracion", permission: "admin.audit.read" },
  { href: "/admin/integridad", label: "Integridad", group: "Administracion", permission: "admin.integrity.read" },
  { href: "/github/workspace", label: "GitHub", group: "Integraciones", permission: "dashboard.read" },
  { href: "/configuracion/ecs", label: "Repositorio ECS", group: "Configuracion", permission: "config.ecs.manage" },
  { href: "/configuracion/versiones", label: "Versiones", group: "Configuracion", permission: "config.versions.manage" },
  { href: "/configuracion/bloqueos", label: "Bloqueos", group: "Configuracion", permission: "config.locks.manage" },
  { href: "/configuracion/bibliotecas", label: "Bibliotecas", group: "Configuracion", permission: "config.libraries.manage" },
  { href: "/configuracion/lineas-base", label: "Lineas base", group: "Configuracion", permission: "config.baselines.manage" },
  { href: "/configuracion/trazabilidad", label: "Trazabilidad", group: "Configuracion", permission: "config.traceability.read" },
  { href: "/cambios/solicitudes", label: "Solicitudes", group: "Cambios", permission: "changes.requests.manage" },
  { href: "/cambios/evaluacion-impacto", label: "Evaluacion de impacto", group: "Cambios", permission: "changes.impact.manage" },
  { href: "/cambios/aprobacion-tecnica", label: "Aprobacion tecnica", group: "Cambios", permission: "changes.technical.manage" },
  { href: "/cambios/ccb", label: "Comite CCB", group: "Cambios", permission: "changes.ccb.manage" },
  { href: "/cambios/ordenes", label: "Ordenes de cambio", group: "Cambios", permission: "changes.orders.manage" },
  { href: "/desarrollo/mis-ordenes", label: "Mis ordenes", group: "Desarrollo", permission: "dev.orders.manage" },
  { href: "/desarrollo/pruebas-unitarias", label: "Pruebas unitarias", group: "Desarrollo", permission: "dev.unit.manage" },
  { href: "/qa/pruebas", label: "Pruebas QA", group: "Calidad", permission: "qa.tests.manage" },
  { href: "/qa/defectos", label: "Defectos", group: "Calidad", permission: "qa.defects.manage" },
  { href: "/qa/uat", label: "UAT", group: "Calidad", permission: "qa.uat.manage" },
  { href: "/qa/validacion-final", label: "Validacion final", group: "Calidad", permission: "qa.final.manage" },
  { href: "/liberacion/releases", label: "Releases", group: "Liberacion", permission: "release.manage" },
  { href: "/soporte/incidencias", label: "Incidencias", group: "Soporte", permission: "support.incidents.manage" },
  { href: "/reportes", label: "Reportes", group: "Reportes", permission: "reports.read" }
];

export const routePermissions = menuItems.map((item) => ({
  prefix: item.href,
  permission: item.permission
}));

export function can(user: Pick<SessionUser, "permissions">, permission: string) {
  return user.permissions.includes(permission);
}

export function visibleMenu(user: Pick<SessionUser, "permissions">) {
  return menuItems.filter((item) => can(user, item.permission));
}

export function permissionForPath(pathname: string) {
  if (pathname === "/" || pathname === "/dashboard") return "dashboard.read";
  const match = routePermissions
    .filter((route) => pathname === route.prefix || pathname.startsWith(`${route.prefix}/`))
    .sort((a, b) => b.prefix.length - a.prefix.length)[0];
  return match?.permission;
}
