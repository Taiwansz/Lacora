'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { RiskItem } from '@/types';
import { ShieldAlert, Plus, AlertTriangle, Phone, Grid, X } from 'lucide-react';

export default function ContingenciaPage() {
  const { risks, addRiskItem, updateRiskStatus } = useAppStore();
  const [showModal, setShowModal] = useState(false);

  const [newRisk, setNewRisk] = useState({
    description: '',
    category: 'clima' as any,
    probability: 'media' as any,
    impact: 'alto' as any,
    ownerName: '',
    triggerEvent: '',
    preventivePlan: '',
    responsePlan: '',
    status: 'monitorando' as any,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addRiskItem(newRisk);
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Matriz de Riscos & Gestão de Emergências
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Plano de Contingência do Casamento
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Mapeamento preventivo de probabilidade, impacto, gatilhos de acionamento e planos de resposta imediata.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Mapear Novo Risco
        </button>
      </div>

      {/* Visual Risk Matrix Summary Grid */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <Grid className="w-5 h-5 text-marsala-500" />
          Matriz Visual de Severidade (Probabilidade × Impacto)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
            <span className="font-bold text-rose-900 block">Riscos Críticos (Alto Impacto)</span>
            <span className="font-serif text-2xl font-bold text-rose-700 block">
              {risks.filter((r) => r.impact === 'alto').length}
            </span>
            <p className="text-[10px] text-rose-800">Requerem plano de resposta testado e acionamento rápido.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
            <span className="font-bold text-amber-900 block">Riscos Moderados</span>
            <span className="font-serif text-2xl font-bold text-amber-700 block">
              {risks.filter((r) => r.impact === 'medio').length}
            </span>
            <p className="text-[10px] text-amber-800">Monitorados pela equipe de cerimonial.</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-900 block">Riscos Baixos / Mitigados</span>
            <span className="font-serif text-2xl font-bold text-emerald-700 block">
              {risks.filter((r) => r.status === 'mitigado' || r.impact === 'baixo').length}
            </span>
            <p className="text-[10px] text-emerald-800">Sob controle prévio com fornecedores.</p>
          </div>
        </div>
      </div>

      {/* Risk Matrix Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="font-serif text-lg font-bold text-charcoal">Riscos Mapeados & Planos de Resposta</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted border-b border-border text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="p-4">Descrição do Risco</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Probabilidade / Impacto</th>
                <th className="p-4">Responsável & Gatilho</th>
                <th className="p-4">Plano Preventivo & Resposta</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {risks.map((rk) => (
                <tr key={rk.id} className="hover:bg-surface-muted/40 transition-colors">
                  <td className="p-4 font-bold text-charcoal max-w-xs">{rk.description}</td>
                  <td className="p-4 text-slate-500 uppercase text-[10px] font-bold">{rk.category}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {rk.probability} / {rk.impact}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 text-[11px]">
                    <span className="font-semibold text-charcoal block">{rk.ownerName}</span>
                    <span className="text-[10px] text-slate-400">Gatilho: {rk.triggerEvent || 'Definido'}</span>
                  </td>
                  <td className="p-4 text-slate-600 text-[11px] max-w-sm space-y-1">
                    <p><strong className="text-charcoal">Preventivo:</strong> {rk.preventivePlan}</p>
                    <p><strong className="text-charcoal">Resposta:</strong> {rk.responsePlan}</p>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      aria-label={`Alterar status do risco ${rk.description}`}
                      value={rk.status}
                      onChange={(e) => updateRiskStatus(rk.id, e.target.value as any)}
                      className="text-xs font-bold px-2.5 py-1 rounded-full border border-border bg-surface-muted text-charcoal cursor-pointer"
                    >
                      <option value="monitorando">Monitorando</option>
                      <option value="mitigado">Mitigado</option>
                      <option value="critico">Crítico</option>
                    </select>
                  </td>
                </tr>
              ))}
              {risks.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Nenhum risco mapeado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Phone & Medical Kit Contacts */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <Phone className="w-5 h-5 text-marsala-500" />
          Kit de Emergência & Telefones Úteis no Dia H
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="p-4 rounded-2xl bg-surface-muted border border-border space-y-1">
            <span className="font-bold text-charcoal block">Hospital & Suporte Médico Próximo</span>
            <p className="text-slate-500">Pronto Socorro Central / Ambulância de Plantão</p>
          </div>
          <div className="p-4 rounded-2xl bg-surface-muted border border-border space-y-1">
            <span className="font-bold text-charcoal block">Técnico de Gerador & Elétrica</span>
            <p className="text-slate-500">Suporte 24h para chaveamento automático de energia</p>
          </div>
        </div>
      </div>

      {/* Modal Add Risk */}
      {showModal && (
        <div role="dialog" aria-modal="true" aria-labelledby="modal-risk-title" className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h3 id="modal-risk-title" className="font-serif text-lg font-bold text-charcoal">Mapear Risco no Plano de Contingência</h3>
              <button type="button" onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-charcoal">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label htmlFor="risk-desc" className="block text-xs font-semibold text-charcoal mb-1">Descrição do Risco *</label>
              <input
                id="risk-desc"
                type="text"
                required
                value={newRisk.description}
                onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                placeholder="Ex: Queda de energia elétrica na recepção"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="risk-cat" className="block text-xs font-semibold text-charcoal mb-1">Categoria *</label>
                <select
                  id="risk-cat"
                  value={newRisk.category}
                  onChange={(e) => setNewRisk({ ...newRisk, category: e.target.value as any })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                >
                  <option value="clima">Clima / Tempo</option>
                  <option value="energia">Energia / Gerador</option>
                  <option value="fornecedor">Fornecedor / Atraso</option>
                  <option value="saude">Saúde / Emergência</option>
                  <option value="transporte">Transporte</option>
                  <option value="seguranca">Segurança</option>
                </select>
              </div>
              <div>
                <label htmlFor="risk-owner" className="block text-xs font-semibold text-charcoal mb-1">Responsável *</label>
                <input
                  id="risk-owner"
                  type="text"
                  required
                  value={newRisk.ownerName}
                  onChange={(e) => setNewRisk({ ...newRisk, ownerName: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Ex: Cerimonialista"
                />
              </div>
            </div>
            <div>
              <label htmlFor="risk-prev" className="block text-xs font-semibold text-charcoal mb-1">Plano Preventivo *</label>
              <textarea
                id="risk-prev"
                required
                value={newRisk.preventivePlan}
                onChange={(e) => setNewRisk({ ...newRisk, preventivePlan: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none h-16 focus:ring-2 focus:ring-marsala-500"
                placeholder="Ação prévia de prevenção..."
              />
            </div>
            <div>
              <label htmlFor="risk-resp" className="block text-xs font-semibold text-charcoal mb-1">Plano de Resposta *</label>
              <textarea
                id="risk-resp"
                required
                value={newRisk.responsePlan}
                onChange={(e) => setNewRisk({ ...newRisk, responsePlan: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none h-16 focus:ring-2 focus:ring-marsala-500"
                placeholder="Ação imediata caso acionado..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 rounded-xl border border-border hover:bg-surface-muted"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-marsala-500 hover:bg-marsala-600 rounded-xl shadow-card"
              >
                Salvar Risco
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
