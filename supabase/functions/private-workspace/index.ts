import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.49.8';

const PUBLIC_KEY: JsonWebKey = {
  kty: 'EC',
  crv: 'P-256',
  x: 'm2lwu2GcROfJF3M-lA7dF8ko8OKpBNC8NQ2yDubLHXk',
  y: 'pr-Gvhau8QuEZPAsrs7ejFUzzOKrmzeuraG62oJDEKQ',
};
const encoder = new TextEncoder();

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function verifyToken(token: string) {
  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const key = await crypto.subtle.importKey(
      'jwk',
      PUBLIC_KEY,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify']
    );
    const valid = await crypto.subtle.verify(
      { name: 'ECDSA', hash: 'SHA-256' },
      key,
      decodeBase64Url(parts[2]),
      encoder.encode(`${parts[0]}.${parts[1]}`)
    );
    if (!valid) return false;

    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[1])));
    return (
      payload.scope === 'lacora-private' &&
      typeof payload.exp === 'number' &&
      payload.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

Deno.serve(async (request: Request) => {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!(await verifyToken(token))) return json({ error: 'Não autorizado' }, 401);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: 'Configuração indisponível' }, 503);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (request.method === 'GET') {
    const { data, error } = await supabase
      .from('private_workspace_snapshots')
      .select('payload, updated_at')
      .eq('id', 'couple')
      .maybeSingle();
    if (error) return json({ error: 'Não foi possível carregar os dados' }, 500);
    return json({ snapshot: data?.payload ?? null, updatedAt: data?.updated_at ?? null });
  }

  if (request.method === 'PUT') {
    let body: { snapshot?: unknown };
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Corpo inválido' }, 400);
    }
    if (!body || typeof body.snapshot !== 'object' || body.snapshot === null) {
      return json({ error: 'Snapshot inválido' }, 400);
    }

    const { error } = await supabase.from('private_workspace_snapshots').upsert({
      id: 'couple',
      payload: body.snapshot,
      updated_at: new Date().toISOString(),
    });
    if (error) return json({ error: 'Não foi possível salvar os dados' }, 500);
    return json({ ok: true });
  }

  return json({ error: 'Método não permitido' }, 405);
});
