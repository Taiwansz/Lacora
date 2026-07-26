'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatBRL, exportToCSV } from '@/lib/utils';
import { DollarSign, Plus, Download, TrendingUp, AlertTriangle, CheckCircle2, PieChart } from 'lucide-react';

export default function OrcamentoPage() {
  const {
    coupleProfile,
    budgetItems,
    payments,
    addBudgetItem,
    markPaymentAsPaid,
    getConfirmedGuestsCount,
    getCostPerGuestMetrics
  } = useAppStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('todas');

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

  const confirmedGuests = getConfirmedGuestsCount() || coupleProfile.estimatedGuestsCount || 1;
  const { plannedCostPerGuest, contractedCostPerGuest, paidCostPerGuest } = getCostPerGuestMetrics();

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
      Custo_Por_Convidado: Math.round(item.contractedCost / confirmedGuests),
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
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 bg-surface-muted text-charcoal rounded-xl border border-border hover:bg-rose-50"
          >
            <Download className="w-4 h-4" /> CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-4 py-2 rounded-xl shadow-card hover:bg-marsala-600"
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
          <span className="text-xs font-semibold text-slate-500 block">Custo por Convidado</span>
          <span className="font-serif text-2xl font-bold text-indigo-700 block mt-1">{formatBRL(contractedCostPerGuest)}</span>
          <span className="text-[11px] text-slate-400 mt-1 block">Baseado em {confirmedGuests} convidados</span>
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
                <th className="p-4">Custo / Convidado</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {budgetItems.map((item) => {
                const itemCostPerGuest = Math.round((item.contractedCost || item.estimatedCost) / confirmedGuests);
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Novo Item de Orçamento</h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Descrição</label>
              <input
                type="text"
                required
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="Ex: Cerimonial & Assessoria"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Custo Estimado (R$)</label>
                <input
                  type="number"
                  required
                  value={newItem.estimatedCost}
                  onChange={(e) => setNewItem({ ...newItem, estimatedCost: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Custo Contratado (R$)</label>
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
                onClick={() => setShowAddModal(false)}
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
