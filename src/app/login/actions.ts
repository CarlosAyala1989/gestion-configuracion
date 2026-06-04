"use server";

import { setSessionCookie, userToSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard") || "/dashboard";
  const safeNext = next.startsWith("/") && !next.startsWith("//") && next !== "/login" ? next : "/dashboard";

  const fail = (): never => redirect(`/login?error=${encodeURIComponent("Credenciales invalidas o usuario inactivo.")}`);

  if (!email || !password) fail();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.status !== "ACTIVE") fail();
  const activeUser = user!;
  const ok = await bcrypt.compare(password, activeUser.passwordHash);
  if (!ok) fail();

  await prisma.user.update({ where: { id: activeUser.id }, data: { lastLoginAt: new Date() } });
  const session = await userToSession(activeUser.id);
  if (!session) fail();
  await setSessionCookie(session!);
  redirect(`/seleccionar-proyecto?next=${encodeURIComponent(safeNext === "/seleccionar-proyecto" ? "/dashboard" : safeNext)}`);
}
