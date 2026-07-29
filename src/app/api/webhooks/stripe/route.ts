import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe-server';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!signature || !webhookSecret || !supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Webhook não configurado.' }, { status: 503 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret
    );
  } catch {
    return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 400 });
  }

  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const subscription = event.data.object as Stripe.Subscription;
    const workspaceId = subscription.metadata.workspace_id;
    if (workspaceId) {
      const admin = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
      await admin.from('workspace_subscriptions').upsert(
        {
          workspace_id: workspaceId,
          stripe_customer_id:
            typeof subscription.customer === 'string'
              ? subscription.customer
              : subscription.customer.id,
          stripe_subscription_id: subscription.id,
          plan_id: subscription.metadata.plan_id || 'pro',
          status: subscription.status,
          trial_end: subscription.trial_end
            ? new Date(subscription.trial_end * 1000).toISOString()
            : null,
          current_period_end: new Date(
            subscription.items.data[0]?.current_period_end * 1000
          ).toISOString(),
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'workspace_id' }
      );
    }
  }

  return NextResponse.json({ received: true });
}
