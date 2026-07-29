import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { hasSameOrigin } from '@/lib/request-security';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: 'Mensagem muito extensa.' }, { status: 413 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Dados inválidos.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const company = typeof body.company === 'string' ? body.company.trim() : '';

  // Honeypot: return a normal response so automated submissions receive no signal.
  if (company) {
    return NextResponse.json({ success: true }, { status: 202 });
  }

  if (
    name.length < 2 ||
    name.length > 120 ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email) ||
    message.length < 10 ||
    message.length > 3000
  ) {
    return NextResponse.json(
      { error: 'Preencha nome, e-mail e uma mensagem com pelo menos 10 caracteres.' },
      { status: 400 }
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Canal temporariamente indisponível.' },
      { status: 503 }
    );
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await admin.from('contact_requests').insert({
    name,
    email,
    message,
    source: 'contact_page',
  });

  if (error) {
    return NextResponse.json(
      { error: 'Não foi possível registrar sua mensagem. Tente novamente.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
