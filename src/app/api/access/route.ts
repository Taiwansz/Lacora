import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_COOKIE_MAX_AGE,
  ACCESS_COOKIE_NAME,
  isSafeInternalPath,
} from '@/lib/access-constants';
import { verifyAccessToken } from '@/lib/access-token';

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const attempts = new Map<string, { count: number; resetAt: number }>();

function requestKey(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + ATTEMPT_WINDOW_MS });
    return false;
  }
  return current.count >= MAX_ATTEMPTS;
}

function registerFailure(key: string) {
  const current = attempts.get(key);
  attempts.set(key, {
    count: (current?.count || 0) + 1,
    resetAt: current?.resetAt || Date.now() + ATTEMPT_WINDOW_MS,
  });
}

export async function POST(request: NextRequest) {
  const key = requestKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde alguns minutos.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === 'string' ? body.password.trim() : '';
  const nextPath = isSafeInternalPath(body.next) ? body.next : '/dashboard';

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Acesso temporariamente indisponível.' }, { status: 503 });
  }

  const verifier = await fetch(`${supabaseUrl}/functions/v1/private-access`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ password }),
    cache: 'no-store',
  }).catch((error) => {
    console.error('[api/access] private-access request failed', {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  });
  const verification = await verifier?.json().catch(() => ({}));

  if (
    !verifier ||
    !verifier.ok ||
    typeof verification.token !== 'string' ||
    !(await verifyAccessToken(verification.token))
  ) {
    registerFailure(key);
    return NextResponse.json(
      { error: verification?.error || 'Não foi possível validar a senha.' },
      { status: verifier?.status || 503 }
    );
  }

  attempts.delete(key);
  const response = NextResponse.json({ ok: true, next: nextPath });
  response.cookies.set(ACCESS_COOKIE_NAME, verification.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ACCESS_COOKIE_MAX_AGE,
  });
  return response;
}
