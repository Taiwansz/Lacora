import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const DEMO_COOKIE = 'nosso_grande_dia_demo_mode';

function isPublicPage(pathname: string) {
  const exactPublicPages = new Set([
    '/',
    '/login',
    '/cadastro',
    '/recuperar-senha',
    '/termos',
    '/privacidade',
    '/suporte',
    '/contato',
    '/auth/callback',
  ]);

  if (exactPublicPages.has(pathname)) return true;
  if (pathname.startsWith('/w/')) return true;
  if (pathname.startsWith('/rsvp/')) return true;

  // Temporary compatibility alias for the old public wedding URL. The
  // administrative editor remains the exact protected route `/site`.
  if (/^\/site\/[^/]+\/?$/.test(pathname)) return true;

  return false;
}

function isPublicApi(pathname: string) {
  return (
    pathname === '/api/demo/session' ||
    pathname.startsWith('/api/rsvp/') ||
    pathname === '/api/webhooks/stripe'
  );
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let user = null;
  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    const {
      data: { user: authenticatedUser },
    } = await supabase.auth.getUser();
    user = authenticatedUser;
  }

  const isApi = pathname.startsWith('/api/');
  const hasDemoPageSession = request.cookies.get(DEMO_COOKIE)?.value === 'true';

  // Demo mode is never an API credential. Public APIs must validate their own
  // narrowly scoped input; every other endpoint requires a real Supabase user.
  if (isApi && !isPublicApi(pathname) && !user) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  if (!isApi && !isPublicPage(pathname) && !user && !hasDemoPageSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = '';
    loginUrl.searchParams.set(
      'redirect',
      `${pathname}${request.nextUrl.search}`
    );
    return NextResponse.redirect(loginUrl);
  }

  if (user && (pathname === '/login' || pathname === '/cadastro')) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = '/dashboard';
    dashboardUrl.search = '';
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|map|woff|woff2)$).*)',
  ],
};
