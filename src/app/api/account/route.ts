import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { hasSameOrigin } from '@/lib/request-security';

export async function DELETE(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return NextResponse.json(
      { error: 'Exclusão de conta temporariamente indisponível.' },
      { status: 503 }
    );
  }

  const { password } = await request.json().catch(() => ({ password: '' }));
  if (typeof password !== 'string' || !password) {
    return NextResponse.json({ error: 'Confirme sua senha.' }, { status: 400 });
  }

  const {
    data: { user },
  } = await (await createServerSupabaseClient()).auth.getUser();
  if (!user?.email) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const verifier = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: passwordError } = await verifier.auth.signInWithPassword({
    email: user.email,
    password,
  });
  if (passwordError) {
    return NextResponse.json({ error: 'Senha incorreta.' }, { status: 403 });
  }

  const admin = createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error: deletionError } = await admin.auth.admin.deleteUser(user.id);
  if (deletionError) {
    return NextResponse.json(
      { error: 'Não foi possível excluir a conta.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
