import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getStripe } from '@/lib/stripe-server';

export async function GET(request: NextRequest) {
  const workspaceId = request.nextUrl.searchParams.get('workspaceId');
  if (!workspaceId) {
    return NextResponse.json({ error: 'Workspace obrigatório.' }, { status: 400 });
  }

  const supabase = await createServerSupabaseClient();
  const { data: subscription, error } = await supabase
    .from('workspace_subscriptions')
    .select('*')
    .eq('workspace_id', workspaceId)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ error: 'Não foi possível consultar a assinatura.' }, { status: 500 });
  }

  let invoices: Array<{ id: string; date: string; amount: number; status: string; url: string | null }> = [];
  if (subscription?.stripe_customer_id && process.env.STRIPE_SECRET_KEY) {
    const result = await getStripe().invoices.list({
      customer: subscription.stripe_customer_id,
      limit: 12,
    });
    invoices = result.data.map((invoice) => ({
      id: invoice.number || invoice.id || `invoice-${invoice.created}`,
      date: new Date(invoice.created * 1000).toISOString(),
      amount: invoice.amount_paid / 100,
      status: invoice.status || 'open',
      url: invoice.hosted_invoice_url ?? null,
    }));
  }

  return NextResponse.json({
    planId: subscription?.plan_id || 'starter',
    status: subscription?.status || 'inactive',
    trialEnd: subscription?.trial_end || null,
    currentPeriodEnd: subscription?.current_period_end || null,
    cancelAtPeriodEnd: subscription?.cancel_at_period_end || false,
    billingConfigured: Boolean(
      process.env.STRIPE_SECRET_KEY &&
      process.env.STRIPE_PRICE_PRO &&
      process.env.STRIPE_PRICE_ASSESSORIA
    ),
    invoices,
  });
}
