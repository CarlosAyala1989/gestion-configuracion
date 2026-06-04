import { loginAction } from "@/app/login/actions";
import { inputClass } from "@/components/ui";
import { ShieldCheck } from "lucide-react";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : null;
  const next = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <main className="grid min-h-screen place-items-center bg-panel px-4 py-8">
      <section className="grid w-full max-w-4xl overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel md:grid-cols-[1fr_0.9fr]">
        <div className="relative bg-teal p-8 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.22),transparent_28%),radial-gradient(circle_at_0%_100%,rgba(15,36,56,0.35),transparent_32%)]" />
          <div className="relative">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/15">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h1 className="mt-8 text-3xl font-bold tracking-normal">SGCSW</h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/90">
              Acceso seguro al flujo de gestion de configuracion, cambios, auditoria e integridad.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="rounded-full bg-white/15 px-3 py-1">RBAC</span>
              <span className="rounded-full bg-white/15 px-3 py-1">SHA-256</span>
              <span className="rounded-full bg-white/15 px-3 py-1">GitFlow</span>
              <span className="rounded-full bg-white/15 px-3 py-1">Auditoria</span>
            </div>
          </div>
        </div>
        <form action={loginAction} className="grid gap-4 p-8">
          <input name="next" type="hidden" value={next} />
          <div>
            <h2 className="text-xl font-bold text-ink">Login</h2>
            <p className="mt-1 text-sm text-slate-500">Ingrese con un usuario activo del seed o de administracion.</p>
          </div>
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}
          <label className="grid gap-1.5 text-sm font-semibold text-ink">
            Email
            <input className={inputClass} name="email" placeholder="admin@sgcsw.local" required type="email" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-ink">
            Contrasena
            <input className={inputClass} name="password" placeholder="Sgcsw2026!" required type="password" />
          </label>
          <button className="mt-2 h-10 rounded-md bg-teal px-4 text-sm font-bold text-white hover:bg-teal/90" type="submit">
            Ingresar
          </button>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600">
            Seed: admin@sgcsw.local, solicitante@sgcsw.local, jefe@sgcsw.local, lider@sgcsw.local, ccb@sgcsw.local, bibliotecario@sgcsw.local, dev@sgcsw.local, qa@sgcsw.local. Password: Sgcsw2026!
          </div>
        </form>
      </section>
    </main>
  );
}
