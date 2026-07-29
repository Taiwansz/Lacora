import Stripe from 'stripe';

let stripe: Stripe | null = null;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error('Stripe não configurado.');
  if (!stripe) stripe = new Stripe(secretKey);
  return stripe;
}

export function stripePriceForPlan(planId: string) {
  if (planId === 'pro') return process.env.STRIPE_PRICE_PRO;
  if (planId === 'assessoria') return process.env.STRIPE_PRICE_ASSESSORIA;
  return undefined;
}
