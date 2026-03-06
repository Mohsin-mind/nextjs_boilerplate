import { NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { AUTH_ROUTES, PUBLIC_ROUTES, DEFAULT_LOGIN_REDIRECT, ROUTES } from '@/constants/routes';

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const sessionCookie = getSessionCookie(request);

  // Redirect authenticated users away from auth pages (login, register)
  if (AUTH_ROUTES.some((route) => pathname.startsWith(route))) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return NextResponse.next();
  }

  // Protect all non-public routes
  if (!PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - api routes (handled by Better Auth and other handlers)
     * - _next/static (static files)
     * - _next/image (image optimisation)
     * - favicon.ico
     * - metadata files and all files with an extension (e.g. .svg, .png, .css, .js)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
