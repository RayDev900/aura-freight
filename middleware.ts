import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;
    const role = token?.role as string | undefined;

  if (!token && isProtectedRoute(pathname)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (token && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL(getHomeByRole(role), req.url))
  }

  if (token && !canAccess(role, pathname)) {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
}

function isProtectedRoute(path: string) {
  return ['/dashboard', '/driver', '/portal'].some(r => path.startsWith(r))
}

function canAccess(role: string | undefined, path: string) {
  if (path.startsWith('/dashboard')) {
    return ['SUPER_ADMIN', 'OPERATOR'].includes(role ?? '')
  }
  if (path.startsWith('/driver')) {
    return role === 'DRIVER'
  }
  if (path.startsWith('/portal')) {
    return role === 'CLIENT'
  }
  return true
}

function getHomeByRole(role: string | undefined) {
  if (role === 'DRIVER') return '/driver'
  if (role === 'CLIENT') return '/portal'
  return '/dashboard'
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
}