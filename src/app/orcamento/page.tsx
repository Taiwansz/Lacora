'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatBRL, exportToCSV } from '@/lib/utils';
import { DollarSign, Plus, Download, TrendingUp, Info, X } from 'lucide-react';

export default function OrcamentoPage() {
  const {
    coupleProfile,
    budgetItems,
    addBudgetItem,
    getConfirmedGuestsCount,
    getCostPerGuestMetrics
  } = useAppStore();

  const [showAddModal, setShowAddModal] = useState(false);

  const [newItem, setNewItem] = useState({
    categoryId: 'c1',
    description: '',
    quantity: 1,
    unitPrice: 0,
    estimatedCost: 0,
    negotiatedCost: 0,
    contractedCost: 0,
    payerName: 'Casal',
  });

  const estimatedGuests = coupleProfile.estimatedGuestsCount || 100;
  const confirmedGuests = getConfirmedGuestsCount();
  const {
    targetCostPerPerson,
    contractedCostPerEstimatedGuest,
    projectedCostPerConfirmedGuest,
    paidCostPerGuest
  } = getCostPerGuestMetrics();

  const totalPlanned = coupleProfile.totalBudgetPlanned;
  const totalContracted = budgetItems.reduce((acc, i) => acc + (i.contractedCost || i.estimatedCost || 0), 0);
  const totalPaid = budgetItems.reduce((acc, i) => acc + i.paidAmount, 0);
  const totalPending = totalContracted - totalPaid;

  const handleExportCSV = () => {
    const data = budgetItems.map((item) => ({
      Descrição: item.description,
      Estimado: item.estimatedCost,
      Contractado: item.contractedCost,
      Pago: item.paidAmount,
      Custo_Por_Convidado_Estimado: Math.round(item.contractedCost / estimatedGuests),
      Pagador: item.payerName,
    }));
    exportToCSV('orcamento_nosso_grande_dia', data);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addBudgetItem({
      ...newItem,
      negotiatedCost: newItem.contractedCost,
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Gestão Financeira & Fluxo de Caixa
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Orçamento, Pagamentos & Custo por Convidado
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Acompanhe o teto orçamentário, valores contratados, pagamentos efetuados e parcelamento futuro.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 bg-surface-muted text-charcoal rounded-xl border border-border hover:bg-rose-50 transition-colors"
          >
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-marsala-500 hover:bg-marsala-600 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-card transition-colors"
          >
            <Plus className="w-4 h-4" /> Novo Item Financeiro
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 block">Teto Planejado</span>
          <span className="font-serif text-2xl font-bold text-charcoal block mt-1">{formatBRL(totalPlanned)}</span>
          <span className="text-[11px] text-slate-400 mt-1 block">Teto global do casal</span>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 block">Total Contratado</span>
          <span className="font-serif text-2xl font-bold text-charcoal block mt-1">{formatBRL(totalContracted)}</span>
          <span className={`text-[11px] font-semibold mt-1 block ${totalContracted > totalPlanned ? 'text-rose-600' : 'text-emerald-600'}`}>
            {totalContracted > totalPlanned ? 'Excede o teto planejado' : 'Dentro do limite teto'}
          </span>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 block">Total Quitado</span>
          <span className="font-serif text-2xl font-bold text-emerald-700 block mt-1">{formatBRL(totalPaid)}</span>
          <span className="text-[11px] text-amber-700 font-medium mt-1 block">Pendente: {formatBRL(totalPending)}</span>
        </div>

        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <span className="text-xs font-semibold text-slate-500 block">Custo Contratado / Convidado Previsto</span>
          <span className="font-serif text-2xl font-bold text-indigo-700 block mt-1">{formatBRL(contractedCostPerEstimatedGuest)}</span>
          <span className="text-[11px] text-slate-400 mt-1 block">Baseado em {estimatedGuests} convidados previstos</span>
        </div>
      </div>

      {/* Detailed Cost Breakdown Box */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-marsala-500" />
          Fórmulas & Métricas do Custo por Convidado
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-surface-muted rounded-2xl border border-border">
            <span className="font-semibold text-slate-500 block">Teto por Convidado</span>
            <span className="font-serif text-lg font-bold text-charcoal block mt-1">{formatBRL(targetCostPerPerson)}</span>
            <p className="text-[10px] text-slate-400 mt-1">Orçamento planejado ÷ {estimatedGuests} convidados previstos.</p>
          </div>
          <div className="p-4 bg-surface-muted rounded-2xl border border-border">
            <span className="font-semibold text-slate-500 block">Contratado / Convidado Previsto</span>
            <span className="font-serif text-lg font-bold text-emerald-600 block mt-1">{formatBRL(contractedCostPerEstimatedGuest)}</span>
            <p className="text-[10px] text-slate-400 mt-1">Total contratado ÷ {estimatedGuests} convidados previstos no contrato.</p>
          </div>
          <div className="p-4 bg-surface-muted rounded-2xl border border-border">
            <span className="font-semibold text-slate-500 block">Projetado / Convidado Confirmado</span>
            <span className="font-serif text-lg font-bold text-indigo-600 block mt-1">
              {confirmedGuests > 0 ? formatBRL(projectedCostPerConfirmedGuest) : 'Sem RSVPs'}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Total contratado ÷ {confirmedGuests} confirmações atuais.</p>
          </div>
          <div className="p-4 bg-surface-muted rounded-2xl border border-border">
            <span className="font-semibold text-slate-500 block">Pago / Convidado</span>
            <span className="font-serif text-lg font-bold text-purple-600 block mt-1">{formatBRL(paidCostPerGuest)}</span>
            <p className="text-[10px] text-slate-400 mt-1">Total já quitado ÷ {estimatedGuests} convidados previstos.</p>
          </div>
        </div>
      </div>

      {/* Budget Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-charcoal">Itens Financeiros & Contratos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted border-b border-border text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">Descrição do Item</th>
                <th className="p-4">Custo Estimado</th>
                <th className="p-4">Custo Contratado</th>
                <th className="p-4">Valor Pago</th>
                <th className="p-4">Custo / Convidado Previsto</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {budgetItems.map((item) => {
                const itemCostPerGuest = Math.round((item.contractedCost || item.estimatedCost) / estimatedGuests);
                const isFullyPaid = item.paidAmount >= item.contractedCost && item.contractedCost > 0;
                return (
                  <tr key={item.id} className="hover:bg-surface-muted/40 transition-colors">
                    <td className="p-4 font-bold text-charcoal">{item.description}</td>
                    <td className="p-4 text-slate-500">{formatBRL(item.estimatedCost)}</td>
                    <td className="p-4 font-bold text-charcoal">{formatBRL(item.contractedCost)}</td>
                    <td className="p-4 text-emerald-600 font-semibold">{formatBRL(item.paidAmount)}</td>
                    <td className="p-4 text-slate-500">{formatBRL(itemCostPerGuest)}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isFullyPaid
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.paidAmount > 0
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isFullyPaid ? 'Quitado' : item.paidAmount > 0 ? 'Parcial' : 'Pendente'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {budgetItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Nenhum item orçamentário cadastrado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Item */}
      {showAddModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="modal-budget-title" className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 id="modal-budget-title" className="font-serif text-lg font-bold text-charcoal">Novo Item de Orçamento</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 text-slate-400 hover:text-charcoal">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label htmlFor="bi-description" className="block text-xs font-semibold text-charcoal mb-1">Descrição *</label>
              <input
                id="bi-description"
                type="text"
                required
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                placeholder="Ex: Cerimonial & Assessoria"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="bi-estimated" className="block text-xs font-semibold text-charcoal mb-1">Custo Estimado (R$) *</label>
                <input
                  id="bi-estimated"
                  type="number"
                  required
                  value={newItem.estimatedCost}
                  onChange={(e) => setNewItem({ ...newItem, estimatedCost: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                />
              </div>
              <div>
                <label htmlFor="bi-contracted" className="block text-xs font-semibold text-charcoal mb-1">Custo Contratado (R$) *</label>
                <input
                  id="bi-contracted"
                  type="number"
                  required
                  value={newItem.contractedCost}
                  onChange={(e) => setNewItem({ ...newItem, contractedCost: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 rounded-xl border border-border hover:bg-surface-muted"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-marsala-500 hover:bg-marsala-600 rounded-xl shadow-card"
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
