import { permissionForPath } from "@/lib/rbac";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const cookieName = "sgcsw_session";
const projectSelectorPath = "/seleccionar-proyecto";

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "sgcsw-local-dev-secret-change-before-production"
  );
}

function redirectToSelector(request: NextRequest) {
  const selector = new URL(projectSelectorPath, request.url);
  const next = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  selector.searchParams.set("next", next === projectSelectorPath ? "/dashboard" : next);
  return NextResponse.redirect(selector);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(cookieName)?.value;

  if (pathname === "/login") {
    if (!token) return NextResponse.next();
    try {
      await jwtVerify(token, secret());
      return NextResponse.redirect(new URL(projectSelectorPath, request.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (!token) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  try {
    const { payload } = await jwtVerify(token, secret());
    if (pathname !== projectSelectorPath && !payload.projectSelected) {
      return redirectToSelector(request);
    }
    if (pathname === projectSelectorPath) return NextResponse.next();

    const permission = permissionForPath(pathname);
    const permissions = Array.isArray(payload.permissions) ? payload.permissions : [];
    if (permission && !permissions.includes(permission)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
