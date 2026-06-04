import Link from "next/link";

import { loginAdminAction } from "@/app/login/actions";

type SearchParams = Promise<{
  error?: string;
  success?: string;
}>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error, success } = await searchParams;

  const errorMessage = resolveErrorMessage(error);

  return (
    <section className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Acceso administrativo
        </h2>
        <p className="text-muted-foreground">
          Ingrese sus credenciales para acceder al panel administrativo.
        </p>
      </div>

      {errorMessage ? (
        <article className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {errorMessage}
        </article>
      ) : null}

      {success ? (
        <article className="rounded-xl border border-emerald-500/30 bg-emerald-50 p-4 text-sm text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">
          {success}
        </article>
      ) : null}

      <form action={loginAdminAction} className="rounded-xl border bg-card p-5">
        <div className="grid gap-4">
          <label className="space-y-2 text-sm">
            <span className="font-medium">Correo electrónico</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ejemplo@correo.com"
              className="h-10 w-full rounded-md border bg-background px-3"
            />
          </label>
          <label className="space-y-2 text-sm">
            <span className="font-medium">Contraseña</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-10 w-full rounded-md border bg-background px-3"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-5 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
        >
          Iniciar sesión
        </button>
      </form>

      <Link href="/" className="text-sm text-primary underline-offset-4 hover:underline">
        Volver al portal público
      </Link>
    </section>
  );
}

function resolveErrorMessage(error: string | undefined): string | null {
  if (!error) return null;

  const errorMap: Record<string, string> = {
    "sesion-expirada": "La sesión ha expirado. Inicie sesión nuevamente.",
    "sin-sesion": "Debe iniciar sesión para acceder al panel administrativo.",
  };

  return errorMap[error] ?? error;
}
