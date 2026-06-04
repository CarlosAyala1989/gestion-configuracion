(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push(["chunks/[root-of-the-server]__0-dr1gh._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/lib/rbac.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "can",
    ()=>can,
    "menuItems",
    ()=>menuItems,
    "permissionForPath",
    ()=>permissionForPath,
    "routePermissions",
    ()=>routePermissions,
    "visibleMenu",
    ()=>visibleMenu
]);
const menuItems = [
    {
        href: "/dashboard",
        label: "Mi Panel de Trabajo",
        group: "Operacion",
        permission: "dashboard.read"
    },
    {
        href: "/boards/backlog",
        label: "Backlog",
        group: "Boards",
        permission: "boards.work.manage"
    },
    {
        href: "/boards/sprints",
        label: "Sprints",
        group: "Boards",
        permission: "boards.sprints.manage"
    },
    {
        href: "/boards/metodologia",
        label: "Metodologia",
        group: "Boards",
        permission: "boards.methodology.manage"
    },
    {
        href: "/boards/reportes-diarios",
        label: "Reportes diarios",
        group: "Boards",
        permission: "daily.logs.manage"
    },
    {
        href: "/admin/usuarios",
        label: "Usuarios",
        group: "Administracion",
        permission: "admin.users.manage"
    },
    {
        href: "/admin/roles",
        label: "Roles y permisos",
        group: "Administracion",
        permission: "admin.roles.manage"
    },
    {
        href: "/admin/proyectos",
        label: "Proyectos",
        group: "Administracion",
        permission: "admin.projects.manage"
    },
    {
        href: "/admin/auditoria",
        label: "Auditoria",
        group: "Administracion",
        permission: "admin.audit.read"
    },
    {
        href: "/admin/integridad",
        label: "Integridad",
        group: "Administracion",
        permission: "admin.integrity.read"
    },
    {
        href: "/github/workspace",
        label: "GitHub",
        group: "Integraciones",
        permission: "dashboard.read"
    },
    {
        href: "/configuracion/ecs",
        label: "Repositorio ECS",
        group: "Configuracion",
        permission: "config.ecs.manage"
    },
    {
        href: "/configuracion/versiones",
        label: "Versiones",
        group: "Configuracion",
        permission: "config.versions.manage"
    },
    {
        href: "/configuracion/bloqueos",
        label: "Bloqueos",
        group: "Configuracion",
        permission: "config.locks.manage"
    },
    {
        href: "/configuracion/bibliotecas",
        label: "Bibliotecas",
        group: "Configuracion",
        permission: "config.libraries.manage"
    },
    {
        href: "/configuracion/lineas-base",
        label: "Lineas base",
        group: "Configuracion",
        permission: "config.baselines.manage"
    },
    {
        href: "/configuracion/trazabilidad",
        label: "Trazabilidad",
        group: "Configuracion",
        permission: "config.traceability.read"
    },
    {
        href: "/cambios/solicitudes",
        label: "Solicitudes",
        group: "Cambios",
        permission: "changes.requests.manage"
    },
    {
        href: "/cambios/evaluacion-impacto",
        label: "Evaluacion de impacto",
        group: "Cambios",
        permission: "changes.impact.manage"
    },
    {
        href: "/cambios/aprobacion-tecnica",
        label: "Aprobacion tecnica",
        group: "Cambios",
        permission: "changes.technical.manage"
    },
    {
        href: "/cambios/ccb",
        label: "Comite CCB",
        group: "Cambios",
        permission: "changes.ccb.manage"
    },
    {
        href: "/cambios/ordenes",
        label: "Ordenes de cambio",
        group: "Cambios",
        permission: "changes.orders.manage"
    },
    {
        href: "/desarrollo/mis-ordenes",
        label: "Mis ordenes",
        group: "Desarrollo",
        permission: "dev.orders.manage"
    },
    {
        href: "/desarrollo/pruebas-unitarias",
        label: "Pruebas unitarias",
        group: "Desarrollo",
        permission: "dev.unit.manage"
    },
    {
        href: "/qa/pruebas",
        label: "Pruebas QA",
        group: "Calidad",
        permission: "qa.tests.manage"
    },
    {
        href: "/qa/defectos",
        label: "Defectos",
        group: "Calidad",
        permission: "qa.defects.manage"
    },
    {
        href: "/qa/uat",
        label: "UAT",
        group: "Calidad",
        permission: "qa.uat.manage"
    },
    {
        href: "/qa/validacion-final",
        label: "Validacion final",
        group: "Calidad",
        permission: "qa.final.manage"
    },
    {
        href: "/liberacion/releases",
        label: "Releases",
        group: "Liberacion",
        permission: "release.manage"
    },
    {
        href: "/soporte/incidencias",
        label: "Incidencias",
        group: "Soporte",
        permission: "support.incidents.manage"
    },
    {
        href: "/reportes",
        label: "Reportes",
        group: "Reportes",
        permission: "reports.read"
    }
];
const routePermissions = menuItems.map((item)=>({
        prefix: item.href,
        permission: item.permission
    }));
function can(user, permission) {
    return user.permissions.includes(permission);
}
function visibleMenu(user) {
    return menuItems.filter((item)=>can(user, item.permission));
}
function permissionForPath(pathname) {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard.read";
    const match = routePermissions.filter((route)=>pathname === route.prefix || pathname.startsWith(`${route.prefix}/`)).sort((a, b)=>b.prefix.length - a.prefix.length)[0];
    return match?.permission;
}
}),
"[project]/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/rbac.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/verify.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
;
;
;
const cookieName = "sgcsw_session";
const projectSelectorPath = "/seleccionar-proyecto";
function secret() {
    return new TextEncoder().encode(process.env.AUTH_SECRET ?? "sgcsw-local-dev-secret-change-before-production");
}
function redirectToSelector(request) {
    const selector = new URL(projectSelectorPath, request.url);
    const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    selector.searchParams.set("next", next === projectSelectorPath ? "/dashboard" : next);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(selector);
}
async function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(cookieName)?.value;
    if (pathname === "/login") {
        if (!token) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret());
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(projectSelectorPath, request.url));
        } catch  {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        }
    }
    if (!token) {
        const login = new URL("/login", request.url);
        login.searchParams.set("next", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(login);
    }
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["jwtVerify"])(token, secret());
        if (pathname !== projectSelectorPath && !payload.projectSelected) {
            return redirectToSelector(request);
        }
        if (pathname === projectSelectorPath) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
        const permission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$rbac$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["permissionForPath"])(pathname);
        const permissions = Array.isArray(payload.permissions) ? payload.permissions : [];
        if (permission && !permissions.includes(permission)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/login", request.url));
    }
}
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0-dr1gh._.js.map