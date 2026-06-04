import { logoutAction } from "@/app/(protected)/actions";
import { selectProjectContextAction } from "@/app/(protected)/seleccionar-proyecto/actions";
import { Button, EmptyState, Panel, StatusBadge } from "@/components/ui";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Boxes, ShieldCheck } from "lucide-react";

function safeNext(raw?: string | string[]) {
  const next = typeof raw === "string" ? raw : "/dashboard";
  if (!next.startsWith("/") || next.startsWith("//") || next === "/login" || next === "/seleccionar-proyecto") {
    return "/dashboard";
  }
  return next;
}

export default async function SelectProjectPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const next = safeNext(params.next);
  const error = typeof params.error === "string" ? params.error : null;
  const session = await requireUser();

  const [user, assignments] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.id },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: { permission: true }
            }
          }
        }
      }
    }),
    prisma.projectUser.findMany({
      where: {
        userId: session.id,
        active: true,
        role: { active: true },
        project: { status: { in: ["ACTIVE", "PAUSED"] } }
      },
      include: {
        project: true,
        role: {
          include: {
            rolePermissions: {
              include: { permission: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const globalPermissions = user?.role.rolePermissions.map((rp) => rp.permission.code) ?? [];
  const canUseGlobal = globalPermissions.some((permission) => permission.startsWith("admin."));

  return (
    <main className="min-h-screen bg-panel px-4 py-8 text-ink lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-5">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-teal text-white">
              <Boxes className="h-6 w-6" />
            </div>
            <h1 className="mt-4 text-2xl font-bold">Seleccion de proyecto y rol</h1>
            <p className="mt-1 text-sm text-slate-500">{session.name} - {session.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              <span className="font-semibold">Rol base:</span> {user?.role.name ?? session.globalRoleName}
            </div>
            <form action={logoutAction}>
              <Button variant="secondary">Salir</Button>
            </form>
          </div>
        </header>

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
          <Panel title="Acceso global" subtitle="Disponible para administradores del sistema.">
            {canUseGlobal ? (
              <form action={selectProjectContextAction} className="grid gap-3">
                <input name="mode" type="hidden" value="global" />
                <input name="next" type="hidden" value={next} />
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
                  <div className="flex items-center gap-2 font-bold"><ShieldCheck className="h-4 w-4" />{user?.role.name}</div>
                  <div className="mt-1 text-slate-500">Gestion de usuarios, roles, proyectos y auditoria.</div>
                </div>
                <Button>
                  {session.projectSelected && !session.projectId ? "Continuar" : "Entrar"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <EmptyState>Sin acceso global para este usuario.</EmptyState>
            )}
          </Panel>

          <Panel title="Proyectos asignados" subtitle="Cada proyecto aplica su propio rol y menu.">
            {assignments.length === 0 ? (
              <EmptyState>No hay proyectos activos asignados.</EmptyState>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {assignments.map((assignment) => {
                  const active = session.projectId === assignment.projectId && session.roleSlug === assignment.role.slug;
                  return (
                    <form action={selectProjectContextAction} className="rounded-md border border-slate-200 p-3" key={assignment.id}>
                      <input name="projectUserId" type="hidden" value={assignment.id} />
                      <input name="next" type="hidden" value={next} />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold">{assignment.project.code}</div>
                          <div className="mt-1 text-sm text-slate-500">{assignment.project.name}</div>
                        </div>
                        <StatusBadge value={assignment.project.status} />
                      </div>
                      <div className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-sm">
                        <div className="font-semibold">{assignment.role.name}</div>
                        <div className="mt-1 text-xs text-slate-500">{assignment.role.rolePermissions.length} permisos habilitados</div>
                      </div>
                      <Button className="mt-3 w-full">
                        {active ? "Continuar" : "Entrar"}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </form>
                  );
                })}
              </div>
            )}
          </Panel>
        </div>
      </div>
    </main>
  );
}
