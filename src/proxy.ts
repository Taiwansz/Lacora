import { NextResponse, type NextRequest } from 'next/server';
import { ACCESS_COOKIE_NAME } from '@/lib/access-constants';
import { verifyAccessToken } from '@/lib/access-token';

const PUBLIC_PAGES = new Set([
  '/',
  '/presentes',
  '/acesso',
]);

const LEGACY_SAAS_PAGES = new Set([
  '/login',
  '/cadastro',
  '/recuperar-senha',
  '/redefinir-senha',
  '/onboarding',
  '/assinatura',
  '/conta',
  '/equipe',
  '/auditoria',
]);

function isPublicApi(pathname: string) {
  return (
    pathname === '/api/access' ||
    pathname === '/api/access/logout' ||
    pathname.startsWith('/api/rsvp/')
  );
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const authorized = await verifyAccessToken(
    request.cookies.get(ACCESS_COOKIE_NAME)?.value
  );

  if (LEGACY_SAAS_PAGES.has(pathname)) {
    const destination = request.nextUrl.clone();
    destination.pathname = authorized ? '/dashboard' : '/acesso';
    destination.search = '';
    return NextResponse.redirect(destination);
  }

  if (pathname === '/acesso' && authorized) {
    const dashboard = request.nextUrl.clone();
    dashboard.pathname = '/dashboard';
    dashboard.search = '';
    return NextResponse.redirect(dashboard);
  }

  if (pathname.startsWith('/api/')) {
    if (isPublicApi(pathname) || authorized) return NextResponse.next();
    return NextResponse.json({ error: 'Acesso restrito ao casal.' }, { status: 401 });
  }

  if (
    PUBLIC_PAGES.has(pathname) ||
    pathname.startsWith('/w/') ||
    pathname.startsWith('/rsvp/') ||
    /^\/site\/[^/]+\/?$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (!authorized) {
    const accessUrl = request.nextUrl.clone();
    accessUrl.pathname = '/acesso';
    accessUrl.search = '';
    accessUrl.searchParams.set('next', `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(accessUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff|woff2)$).*)',
  ],
};
