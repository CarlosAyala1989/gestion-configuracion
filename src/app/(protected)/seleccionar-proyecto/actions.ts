"use server";

import { projectUserToSession, requireUser, setSessionCookie, userToSession } from "@/lib/auth";
import { redirect } from "next/navigation";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function safeNext(raw: string) {
  if (!raw.startsWith("/") || raw.startsWith("//") || raw === "/login" || raw === "/seleccionar-proyecto") {
    return "/dashboard";
  }
  return raw;
}

function selectorError(message: string): never {
  redirect(`/seleccionar-proyecto?error=${encodeURIComponent(message)}`);
}

export async function selectProjectContextAction(formData: FormData) {
  const current = await requireUser();
  const next = safeNext(value(formData, "next") || "/dashboard");
  const mode = value(formData, "mode");

  if (mode === "global") {
    const session = await userToSession(current.id, { projectSelected: true });
    if (!session || !session.permissions.some((permission) => permission.startsWith("admin."))) {
      selectorError("No tiene permisos para ingresar al contexto global.");
    }
    await setSessionCookie(session);
    redirect(next);
  }

  const projectUserId = value(formData, "projectUserId");
  if (!projectUserId) selectorError("Seleccione un proyecto.");
  const session = await projectUserToSession(current.id, projectUserId);
  if (!session) selectorError("La asignacion de proyecto no esta activa.");
  await setSessionCookie(session);
  redirect(next);
}
