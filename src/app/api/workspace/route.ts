import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE_NAME } from '@/lib/access-constants';
import { createSupabaseAdminClient } from '@/lib/supabase-admin';

const WORKSPACE_KEY = 'couple';
const MAX_SNAPSHOT_BYTES = 1_000_000;

function unavailable() {
  return NextResponse.json(
    { error: 'Sincronização em nuvem indisponível.' },
    { status: 503 }
  );
}

async function edgeSync(method: 'GET' | 'PUT', token: string, snapshot?: unknown) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) return null;

  return fetch(`${supabaseUrl}/functions/v1/private-workspace`, {
    method,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    ...(snapshot ? { body: JSON.stringify({ snapshot }) } : {}),
    cache: 'no-store',
  });
}

export async function GET(request: NextRequest) {
  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Acesso negado.' }, { status: 401 });
    const response = await edgeSync('GET', token).catch(() => null);
    if (!response) return unavailable();
    return new NextResponse(response.body, {
      status: response.status,
      headers: { 'content-type': 'application/json', 'cache-control': 'private, no-store' },
    });
  }

  const { data, error } = await supabase
    .from('private_workspace_snapshots')
    .select('payload, updated_at')
    .eq('id', WORKSPACE_KEY)
    .maybeSingle();

  if (error) {
    console.error('workspace_sync_read_failed', error.code);
    return NextResponse.json({ error: 'Falha ao carregar o planejamento.' }, { status: 500 });
  }

  return NextResponse.json(
    { snapshot: data?.payload ?? null, updatedAt: data?.updated_at ?? null },
    { headers: { 'cache-control': 'private, no-store' } }
  );
}

export async function PUT(request: NextRequest) {
  const supabase = createSupabaseAdminClient();
  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_SNAPSHOT_BYTES) {
    return NextResponse.json({ error: 'Planejamento grande demais.' }, { status: 413 });
  }

  let snapshot: unknown;
  try {
    snapshot = JSON.parse(rawBody)?.snapshot;
  } catch {
    return NextResponse.json({ error: 'Conteúdo inválido.' }, { status: 400 });
  }

  if (!snapshot || typeof snapshot !== 'object' || Array.isArray(snapshot)) {
    return NextResponse.json({ error: 'Conteúdo inválido.' }, { status: 400 });
  }

  if (!supabase) {
    const token = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: 'Acesso negado.' }, { status: 401 });
    const response = await edgeSync('PUT', token, snapshot).catch(() => null);
    if (!response) return unavailable();
    return new NextResponse(response.body, {
      status: response.status,
      headers: { 'content-type': 'application/json', 'cache-control': 'private, no-store' },
    });
  }

  const { error } = await supabase.from('private_workspace_snapshots').upsert(
    {
      id: WORKSPACE_KEY,
      payload: snapshot,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' }
  );

  if (error) {
    console.error('workspace_sync_write_failed', error.code);
    return NextResponse.json({ error: 'Falha ao salvar o planejamento.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
