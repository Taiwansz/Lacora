import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getStripe } from '@/lib/stripe-server';
import { hasSameOrigin } from '@/lib/request-security';

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  }
  const { workspaceId } = await request.json().catch(() => ({}));
  if (!workspaceId) {
    return NextResponse.json({ error: 'Workspace obrigatório.' }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const { data } = await supabase
    .from('workspace_subscriptions')
    .select('stripe_customer_id')
    .eq('workspace_id', workspaceId)
    .maybeSingle();
  if (!data?.stripe_customer_id) {
    return NextResponse.json({ error: 'Assinatura não encontrada.' }, { status: 404 });
  }

  const session = await getStripe().billingPortal.sessions.create({
    customer: data.stripe_customer_id,
    return_url: new URL('/assinatura', request.url).toString(),
  });
  return NextResponse.json({ url: session.url });
}
