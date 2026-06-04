import { prisma } from "@/lib/prisma";
import { SessionUser } from "@/lib/rbac";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const sessionCookieName = "sgcsw_session";

type SessionPayload = SessionUser & {
  exp?: number;
  iat?: number;
};

type RoleWithPermissions = {
  slug: string;
  name: string;
  rolePermissions: Array<{ permission: { code: string } }>;
};

function authSecret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "sgcsw-local-dev-secret-change-before-production"
  );
}

function permissionsFromRole(role: RoleWithPermissions) {
  return role.rolePermissions.map((rp) => rp.permission.code);
}

export async function signSession(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(authSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, authSecret());
  return payload as SessionPayload;
}

export async function setSessionCookie(user: SessionUser) {
  const token = await signSession(user);
  const cookieStore = await cookies();
  cookieStore.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookieName);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  if (!token) return null;
  try {
    const payload = await verifySessionToken(token);
    const roleSlug = String(payload.roleSlug ?? "");
    const roleName = String(payload.roleName ?? "");
    return {
      id: String(payload.id ?? ""),
      name: String(payload.name ?? ""),
      email: String(payload.email ?? ""),
      roleSlug,
      roleName,
      permissions: Array.isArray(payload.permissions) ? payload.permissions.map(String) : [],
      projectSelected: Boolean(payload.projectSelected),
      projectId: typeof payload.projectId === "string" ? payload.projectId : null,
      projectCode: typeof payload.projectCode === "string" ? payload.projectCode : null,
      projectName: typeof payload.projectName === "string" ? payload.projectName : null,
      globalRoleSlug: typeof payload.globalRoleSlug === "string" ? payload.globalRoleSlug : roleSlug,
      globalRoleName: typeof payload.globalRoleName === "string" ? payload.globalRoleName : roleName
    };
  } catch {
    return null;
  }
}

export async function userToSession(
  userId: string,
  options: { projectSelected?: boolean } = {}
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: { permission: true }
          }
        }
      }
    }
  });
  if (!user || user.status !== "ACTIVE" || !user.role.active) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roleSlug: user.role.slug,
    roleName: user.role.name,
    permissions: permissionsFromRole(user.role),
    projectSelected: options.projectSelected ?? false,
    projectId: null,
    projectCode: null,
    projectName: null,
    globalRoleSlug: user.role.slug,
    globalRoleName: user.role.name
  };
}

export async function projectUserToSession(userId: string, projectUserId: string): Promise<SessionUser | null> {
  const membership = await prisma.projectUser.findFirst({
    where: {
      id: projectUserId,
      userId,
      active: true,
      project: { status: { in: ["ACTIVE", "PAUSED"] } },
      role: { active: true },
      user: { status: "ACTIVE" }
    },
    include: {
      project: true,
      role: {
        include: {
          rolePermissions: {
            include: { permission: true }
          }
        }
      },
      user: {
        include: { role: true }
      }
    }
  });

  if (!membership || !membership.user.role.active) return null;
  return {
    id: membership.user.id,
    name: membership.user.name,
    email: membership.user.email,
    roleSlug: membership.role.slug,
    roleName: membership.role.name,
    permissions: permissionsFromRole(membership.role),
    projectSelected: true,
    projectId: membership.project.id,
    projectCode: membership.project.code,
    projectName: membership.project.name,
    globalRoleSlug: membership.user.role.slug,
    globalRoleName: membership.user.role.name
  };
}

export async function requireUser(permission?: string) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (permission && !session.permissions.includes(permission)) redirect("/dashboard");
  return session;
}
