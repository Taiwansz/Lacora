import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getStripe, stripePriceForPlan } from '@/lib/stripe-server';
import { hasSameOrigin } from '@/lib/request-security';

export async function POST(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  }

  const { workspaceId, planId } = await request.json().catch(() => ({}));
  const price = stripePriceForPlan(planId);
  if (!workspaceId || !price || !['pro', 'assessoria'].includes(planId)) {
    return NextResponse.json({ error: 'Plano ou workspace inválido.' }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });

  const { data: membership } = await supabase
    .from('memberships')
    .select('role')
    .eq('workspace_id', workspaceId)
    .eq('user_id', user.id)
    .eq('status', 'ativo')
    .maybeSingle();
  if (!membership || !['casal_admin', 'admin_geral'].includes(membership.role)) {
    return NextResponse.json({ error: 'Permissão insuficiente.' }, { status: 403 });
  }

  const { data: current } = await supabase
    .from('workspace_subscriptions')
    .select('stripe_customer_id')
    .eq('workspace_id', workspaceId)
    .maybeSingle();

  const stripe = getStripe();
  let customerId = current?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      name: user.user_metadata?.full_name,
      metadata: { workspace_id: workspaceId },
    });
    customerId = customer.id;
    const { error: customerSaveError } = await supabase
      .from('workspace_subscriptions')
      .upsert(
        { workspace_id: workspaceId, stripe_customer_id: customerId, plan_id: 'starter' },
        { onConflict: 'workspace_id' }
      );
    if (customerSaveError) {
      return NextResponse.json({ error: 'Não foi possível preparar a cobrança.' }, { status: 500 });
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price, quantity: 1 }],
    subscription_data: {
      trial_period_days: 14,
      metadata: { workspace_id: workspaceId, plan_id: planId },
    },
    metadata: { workspace_id: workspaceId, plan_id: planId },
    success_url: new URL('/assinatura?checkout=success', request.url).toString(),
    cancel_url: new URL('/assinatura?checkout=cancel', request.url).toString(),
  });

  return NextResponse.json({ url: session.url });
}
