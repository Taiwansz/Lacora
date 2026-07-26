'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatBRL } from '@/lib/utils';
import { DollarSign, Plus, CheckCircle2, Clock, AlertCircle, PieChart, TrendingDown, ArrowUpRight } from 'lucide-react';

export default function OrcamentoPage() {
  const { coupleProfile, budgetItems, payments, markPaymentAsPaid, addBudgetItem } = useAppStore();
  const [showModal, setShowModal] = useState(false);

  const [newItem, setNewItem] = useState({
    description: '',
    categoryId: 'cat-geral',
    quantity: 1,
    unitPrice: 0,
    estimatedCost: 0,
    contractedCost: 0,
    payerName: 'Casal',
  });

  const totalPlanned = coupleProfile.totalBudgetPlanned;
  const totalContracted = budgetItems.reduce((acc, item) => acc + (item.contractedCost || item.estimatedCost || 0), 0);
  const totalPaid = budgetItems.reduce((acc, item) => acc + item.paidAmount, 0);
  const totalPending = totalContracted - totalPaid;
  const availableBalance = totalPlanned - totalContracted;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addBudgetItem({
      ...newItem,
      negotiatedCost: newItem.contractedCost,
      payerName: newItem.payerName,
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Gestão Financeira & Centro de Custos
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Orçamento, Contratos & Fluxo de Pagamentos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Compare Planejado vs. Contratado vs. Pago, acompanhe parcelas e gerencie o custo por convidado.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600"
        >
          <Plus className="w-4 h-4" /> Adicionar Item de Orçamento
        </button>
      </div>

      {/* Financial Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500">Orçamento Teto Planejado</span>
          <span className="font-serif text-2xl font-bold text-charcoal block mt-2">
            {formatBRL(totalPlanned)}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">Teto definido no Onboarding</span>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500">Total Contratado</span>
          <span className="font-serif text-2xl font-bold text-marsala-500 block mt-2">
            {formatBRL(totalContracted)}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            {availableBalance >= 0 ? `${formatBRL(availableBalance)} disponível` : 'Orçamento excedido!'}
          </span>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500">Total Já Pago</span>
          <span className="font-serif text-2xl font-bold text-emerald-600 block mt-2">
            {formatBRL(totalPaid)}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {Math.round((totalPaid / totalContracted) * 100 || 0)}% do contratado quitado
          </span>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500">Saldo Pendente a Pagar</span>
          <span className="font-serif text-2xl font-bold text-amber-600 block mt-2">
            {formatBRL(totalPending)}
          </span>
          <span className="text-[11px] text-amber-700 font-semibold mt-1 block">
            {payments.filter((p) => p.status === 'pendente').length} parcelas abertas
          </span>
        </div>
      </div>

      {/* Budget Items Breakdown Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-charcoal">Itens & Contratos Financeiros</h2>
          <span className="text-xs text-slate-500">{budgetItems.length} fornecedores/serviços</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted border-b border-border text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">Descrição do Serviço / Contrato</th>
                <th className="p-4">Pagador</th>
                <th className="p-4">Qtd</th>
                <th className="p-4">Valor Estimado</th>
                <th className="p-4">Valor Contratado</th>
                <th className="p-4">Pago</th>
                <th className="p-4">Custo / Convidado</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {budgetItems.map((item) => (
                <tr key={item.id} className="hover:bg-surface-muted/40 transition-colors">
                  <td className="p-4 font-bold text-charcoal">{item.description}</td>
                  <td className="p-4 text-slate-600">{item.payerName}</td>
                  <td className="p-4 text-slate-500">{item.quantity}</td>
                  <td className="p-4 text-slate-500">{formatBRL(item.estimatedCost)}</td>
                  <td className="p-4 font-bold text-charcoal">{formatBRL(item.contractedCost)}</td>
                  <td className="p-4 text-emerald-600 font-semibold">{formatBRL(item.paidAmount)}</td>
                  <td className="p-4 text-slate-500">{formatBRL(item.costPerGuest)}</td>
                  <td className="p-4 text-right">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.paidAmount >= item.contractedCost
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.paidAmount >= item.contractedCost ? 'Quitado' : 'Parcial'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Schedule & Installments Section */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <Clock className="w-5 h-5 text-marsala-500" />
          Cronograma de Vencimento de Parcelas
        </h2>
        <div className="space-y-3">
          {payments.map((pay) => (
            <div
              key={pay.id}
              className="p-4 rounded-2xl border border-border bg-surface-muted/30 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-charcoal block">
                  Parcela {pay.installmentNumber}/{pay.totalInstallments} — Quinta das Flores
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Vencimento: {new Date(pay.dueDate).toLocaleDateString('pt-BR')} • Via {pay.paymentMethod.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-serif font-bold text-base text-charcoal">
                  {formatBRL(pay.amount)}
                </span>
                {pay.status === 'pago' ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Pago em {pay.paidDate}
                  </span>
                ) : (
                  <button
                    onClick={() => markPaymentAsPaid(pay.id)}
                    className="text-xs font-bold text-white bg-marsala-500 hover:bg-marsala-600 px-3 py-1.5 rounded-xl shadow-card transition-colors"
                  >
                    Dar Baixa (Marcar Pago)
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Add Budget Item */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Adicionar Item ao Orçamento</h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Descrição do Serviço / Contrato</label>
              <input
                type="text"
                required
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="Ex: Serviço de Bar de Drinks"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Valor Estimado (R$)</label>
                <input
                  type="number"
                  required
                  value={newItem.estimatedCost}
                  onChange={(e) => setNewItem({ ...newItem, estimatedCost: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Valor Contratado (R$)</label>
                <input
                  type="number"
                  required
                  value={newItem.contractedCost}
                  onChange={(e) => setNewItem({ ...newItem, contractedCost: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 rounded-xl border border-border"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-marsala-500 rounded-xl shadow-card"
              >
                Salvar Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
