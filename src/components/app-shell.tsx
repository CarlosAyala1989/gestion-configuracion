import { logoutAction } from "@/app/(protected)/actions";
import { SessionUser, visibleMenu } from "@/lib/rbac";
import {
  Archive,
  Bell,
  Boxes,
  CalendarDays,
  ClipboardCheck,
  Code2,
  FileClock,
  FileText,
  GitBranch,
  LayoutDashboard,
  Library,
  ListChecks,
  LockKeyhole,
  LogOut,
  Network,
  PackageCheck,
  ShieldCheck,
  ClipboardList,
  UserCog,
  Users
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const iconMap = [
  ["/dashboard", LayoutDashboard],
  ["/boards/backlog", ClipboardList],
  ["/boards/sprints", CalendarDays],
  ["/boards/metodologia", Network],
  ["/boards/reportes-diarios", FileClock],
  ["/admin/usuarios", Users],
  ["/admin/roles", UserCog],
  ["/admin/proyectos", Boxes],
  ["/admin/auditoria", FileClock],
  ["/admin/integridad", ShieldCheck],
  ["/github/workspace", GitBranch],
  ["/configuracion/ecs", Archive],
  ["/configuracion/versiones", GitBranch],
  ["/configuracion/bloqueos", LockKeyhole],
  ["/configuracion/bibliotecas", Library],
  ["/configuracion/lineas-base", PackageCheck],
  ["/configuracion/trazabilidad", Network],
  ["/cambios/solicitudes", FileText],
  ["/cambios/evaluacion-impacto", ClipboardCheck],
  ["/cambios/aprobacion-tecnica", ListChecks],
  ["/cambios/ccb", Users],
  ["/cambios/ordenes", Code2],
  ["/desarrollo/mis-ordenes", Code2],
  ["/desarrollo/pruebas-unitarias", ClipboardCheck],
  ["/qa/pruebas", ListChecks],
  ["/qa/defectos", Bell],
  ["/qa/uat", FileText],
  ["/qa/validacion-final", ShieldCheck],
  ["/liberacion/releases", PackageCheck],
  ["/soporte/incidencias", Bell],
  ["/reportes", FileText]
] as const;

function iconFor(href: string) {
  return iconMap.find(([prefix]) => href.startsWith(prefix))?.[1] ?? FileText;
}

export function AppShell({
  user,
  children,
  currentPath
}: {
  user: SessionUser;
  children: ReactNode;
  currentPath: string;
}) {
  const menu = visibleMenu(user);
  const grouped = new Map<string, typeof menu>();
  for (const item of menu) {
    grouped.set(item.group, [...(grouped.get(item.group) ?? []), item]);
  }

  async function goDashboard() {
    "use server";
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-panel text-ink">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 bg-navy p-4 text-white lg:block">
        <div className="rounded-lg border border-white/10 bg-white/8 p-4">
          <div className="text-base font-bold">SGCSW</div>
          <div className="text-xs text-slate-300">Sistema de Gestion de Configuracion</div>
        </div>
        <nav className="mt-4 space-y-5">
          {[...grouped.entries()].map(([group, items]) => (
            <div key={group}>
              <div className="px-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">{group}</div>
              <div className="mt-2 space-y-1">
                {items.map((item) => {
                  const Icon = iconFor(item.href);
                  const active = currentPath === item.href;
                  return (
                    <Link
                      className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${active ? "bg-teal text-white" : "text-slate-200 hover:bg-white/10"}`}
                      href={item.href}
                      key={item.href}
                    >
                      <Icon aria-hidden className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-white/10 bg-white/8 p-3">
          <div className="text-sm font-bold">{user.roleName}</div>
          <div className="mt-1 truncate text-xs text-slate-300">{user.projectCode ? `${user.projectCode} - ${user.projectName}` : "Contexto global"}</div>
          <div className="mt-1 truncate text-xs text-slate-300">{user.email}</div>
        </div>
      </aside>

      <main className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur lg:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <form action={goDashboard}>
              <button className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-ink lg:hidden" type="submit">
                Menu
              </button>
            </form>
            <div>
              <div className="text-sm font-bold text-ink">{user.name}</div>
              <div className="text-xs text-slate-500">{user.roleName}{user.projectCode ? ` en ${user.projectCode}` : " - Global"}</div>
            </div>
            <div className="flex items-center gap-2">
              <Link className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-ink hover:bg-slate-50" href="/seleccionar-proyecto">
                <Boxes className="h-4 w-4" />
                Cambiar proyecto
              </Link>
              <form action={logoutAction}>
                <button className="inline-flex h-9 items-center gap-2 rounded-md bg-red-50 px-3 text-sm font-semibold text-red-700 hover:bg-red-100" type="submit">
                  <LogOut className="h-4 w-4" />
                  Salir
                </button>
              </form>
            </div>
          </div>
        </header>
        <div className="px-4 py-5 lg:px-6">{children}</div>
      </main>
    </div>
  );
}
