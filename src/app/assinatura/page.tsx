'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, CreditCard, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { SUBSCRIPTION_PLANS } from '@/lib/plans';
import { formatBRL } from '@/lib/utils';

interface BillingStatus {
  planId: 'starter' | 'pro' | 'assessoria';
  status: string;
  trialEnd: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  billingConfigured: boolean;
  invoices: Array<{ id: string; date: string; amount: number; status: string; url: string | null }>;
}

export default function AssinaturaPage() {
  const activeWorkspaceId = useAppStore((state) => state.activeWorkspaceId);
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [error, setError] = useState('');
  const [loadingAction, setLoadingAction] = useState('');

  useEffect(() => {
    let active = true;
    fetch(`/api/billing/status?workspaceId=${encodeURIComponent(activeWorkspaceId)}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Falha ao consultar assinatura.');
        if (active) setBilling(result);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });
    return () => {
      active = false;
    };
  }, [activeWorkspaceId]);

  const openBillingFlow = async (endpoint: 'checkout' | 'portal', planId?: string) => {
    setLoadingAction(planId || endpoint);
    setError('');
    const response = await fetch(`/api/billing/${endpoint}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ workspaceId: activeWorkspaceId, planId }),
    });
    const result = await response.json().catch(() => ({}));
    setLoadingAction('');
    if (!response.ok || !result.url) {
      setError(result.error || 'Não foi possível abrir o faturamento.');
      return;
    }
    window.location.assign(result.url);
  };

  const activePlan = SUBSCRIPTION_PLANS[billing?.planId || 'starter'];

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-border bg-surface p-6 shadow-subtle sm:flex-row sm:items-center">
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-rose-500">Faturamento</span>
          <h1 className="mt-1 font-serif text-2xl font-bold text-charcoal">Plano e assinatura</h1>
          <p className="mt-1 text-xs text-slate-500">Cobranças processadas pelo Stripe; dados de cartão não passam pelo aplicativo.</p>
        </div>
        {billing && (
          <span className="rounded-xl border border-emerald-300 bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800">
            {activePlan.name} — {billing.status}
          </span>
        )}
      </div>

      {error && <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">{error}</p>}
      {!billing && !error && <p className="text-center text-sm text-slate-500">Carregando assinatura...</p>}

      {billing && (
        <>
          {!billing.billingConfigured && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              O faturamento ainda não foi ativado neste ambiente. Nenhuma cobrança pode ser criada até que as variáveis do Stripe sejam configuradas.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-3">
            {Object.values(SUBSCRIPTION_PLANS).map((plan) => {
              const selected = plan.id === billing.planId;
              return (
                <section key={plan.id} className={`rounded-3xl border bg-surface p-6 shadow-card ${selected ? 'border-marsala-500' : 'border-border'}`}>
                  <h2 className="font-serif text-xl font-bold text-charcoal">{plan.name}</h2>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{plan.description}</p>
                  <p className="mt-5 font-serif text-2xl font-bold text-marsala-500">{plan.formattedPrice}</p>
                  <ul className="mt-5 space-y-2 text-xs text-slate-600">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> {feature}</li>
                    ))}
                  </ul>
                  {plan.id === 'starter' ? (
                    <p className="mt-6 text-center text-xs font-semibold text-slate-500">{selected ? 'Plano atual' : 'Disponível após cancelamento'}</p>
                  ) : (
                    <button
                      onClick={() => openBillingFlow('checkout', plan.id)}
                      disabled={!billing.billingConfigured || selected || Boolean(loadingAction)}
                      className="mt-6 w-full rounded-xl bg-marsala-500 px-4 py-2.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loadingAction === plan.id ? 'Abrindo checkout...' : selected ? 'Plano atual' : `Escolher ${plan.name}`}
                    </button>
                  )}
                </section>
              );
            })}
          </div>

          {billing.planId !== 'starter' && (
            <button onClick={() => openBillingFlow('portal')} disabled={!billing.billingConfigured || Boolean(loadingAction)} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-charcoal">
              <CreditCard className="h-4 w-4" /> Gerenciar pagamento e cancelamento no Stripe
            </button>
          )}

          <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
            <div className="border-b border-border p-6"><h2 className="font-serif text-lg font-bold text-charcoal">Faturas</h2></div>
            {billing.invoices.length === 0 ? (
              <p className="p-6 text-xs text-slate-500">Nenhuma fatura emitida.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-muted text-[10px] uppercase text-slate-500"><tr><th className="p-3">Fatura</th><th className="p-3">Data</th><th className="p-3">Valor</th><th className="p-3">Status</th><th className="p-3">Ação</th></tr></thead>
                  <tbody className="divide-y divide-border">
                    {billing.invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="p-3 font-mono font-bold">{invoice.id}</td>
                        <td className="p-3">{new Date(invoice.date).toLocaleDateString('pt-BR')}</td>
                        <td className="p-3">{formatBRL(invoice.amount)}</td>
                        <td className="p-3">{invoice.status}</td>
                        <td className="p-3">{invoice.url ? <a href={invoice.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-marsala-500">Abrir <ExternalLink className="h-3 w-3" /></a> : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
