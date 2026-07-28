'use client';

import React, { useState } from 'react';
import { CreditCard, CheckCircle2, Zap, AlertTriangle, ShieldCheck, Download, Clock, ArrowUpRight } from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '@/lib/plans';
import { formatBRL } from '@/lib/utils';

export default function AssinaturaPage() {
  const [activePlanId, setActivePlanId] = useState<'starter' | 'pro' | 'assessoria'>('pro');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [canceled, setCanceled] = useState(false);

  const activePlan = SUBSCRIPTION_PLANS[activePlanId];

  const invoices = [
    { id: 'INV-2026-001', date: '15/07/2026', amount: 89.90, status: 'Pago', pdf: '#' },
    { id: 'INV-2026-002', date: '15/06/2026', amount: 89.90, status: 'Pago', pdf: '#' },
  ];

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setCanceled(true);
    setShowCancelModal(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Faturamento & Entitlements
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">Plano & Assinatura do Workspace</h1>
          <p className="text-xs text-slate-500 mt-1">
            Gerencie seu plano ativo, período de teste, limites de convidados, cartões cadastrados e faturas.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
            {canceled ? 'Cancelamento Agendado' : 'Assinatura Ativa (14 Dias de Teste)'}
          </span>
        </div>
      </div>

      {/* Current Active Plan Card */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-marsala-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Plano Atual
            </span>
            <h2 className="font-serif text-2xl font-bold text-charcoal mt-2">{activePlan.name}</h2>
            <p className="text-xs text-slate-500 mt-1">{activePlan.description}</p>
          </div>
          <div className="text-right">
            <span className="font-serif text-3xl font-bold text-marsala-500 block">
              {activePlan.formattedPrice}{' '}
              <span className="text-xs font-sans font-normal text-slate-400">/ {activePlan.billingPeriod}</span>
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Próxima renovação: 15/08/2026</span>
          </div>
        </div>

        {/* Feature & Limits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-muted border border-border">
            <span className="text-slate-500 block">Limite de Convidados</span>
            <span className="font-bold text-charcoal text-base mt-1 block">
              {activePlan.maxGuests > 10000 ? 'Ilimitado' : activePlan.maxGuests}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-surface-muted border border-border">
            <span className="text-slate-500 block">Armazenamento de Documentos</span>
            <span className="font-bold text-charcoal text-base mt-1 block">{activePlan.maxStorageGB} GB</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface-muted border border-border">
            <span className="text-slate-500 block">Status de Faturamento</span>
            <span className="font-bold text-emerald-700 text-base mt-1 block">
              {canceled ? 'Acesso garantido até o fim do ciclo' : '14 Dias Grátis Ativos'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePlanId(activePlanId === 'pro' ? 'assessoria' : 'pro')}
              className="px-4 py-2 bg-marsala-500 hover:bg-marsala-600 text-white font-bold rounded-xl shadow-card transition-colors flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{activePlanId === 'pro' ? 'Upgrade para Assessoria' : 'Alternar para Plano Pro'}</span>
            </button>
          </div>

          {!canceled && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="text-slate-500 hover:text-rose-600 font-semibold underline text-xs"
            >
              Cancelar Assinatura
            </button>
          )}
        </div>
      </div>

      {/* Invoice History */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal">Histórico de Faturas & Recibos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted border-b border-border text-slate-500 uppercase text-[10px] font-semibold">
              <tr>
                <th className="p-3">Identificador</th>
                <th className="p-3">Data</th>
                <th className="p-3">Valor</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Comprovante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-muted/40">
                  <td className="p-3 font-mono font-bold text-charcoal">{inv.id}</td>
                  <td className="p-3 text-slate-600">{inv.date}</td>
                  <td className="p-3 font-bold text-charcoal">{formatBRL(inv.amount)}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => alert(`Download da fatura ${inv.id}`)}
                      className="text-marsala-500 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="modal-cancel-title" className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCancel} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 id="modal-cancel-title" className="font-serif text-lg font-bold text-charcoal">Confirmar Cancelamento</h3>
            <p className="text-xs text-slate-600">
              Conforme nossos termos de serviço, você manterá acesso total aos recursos do Plano Pro até o final do ciclo de cobrança vigente em 15/08/2026.
            </p>

            <div>
              <label htmlFor="cancel-reason-select" className="block text-xs font-semibold text-charcoal mb-1">
                Motivo do cancelamento (opcional)
              </label>
              <select
                id="cancel-reason-select"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
              >
                <option value="">Selecione um motivo...</option>
                <option value="casamento_realizado">Casamento já realizado</option>
                <option value="custo">Razões financeiras</option>
                <option value="outro">Outro motivo</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 rounded-xl border border-border"
              >
                Manter Assinatura
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-card"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
