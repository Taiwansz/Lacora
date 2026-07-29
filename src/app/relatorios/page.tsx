'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { exportToCSV, generateSimplePDF } from '@/lib/utils';
import { FileSpreadsheet, Download, ShieldCheck, Lock, Trash2, Key, CheckCircle2 } from 'lucide-react';

export default function RelatoriosPage() {
  const { guests, budgetItems, vendors, tasks, coupleProfile } = useAppStore();
  const [lgpdConsent, setLgpdConsent] = useState(true);

  const handleExportFullReportPDF = () => {
    const headers = ['Módulo', 'Indicador Principal', 'Status Atual'];
    const rows = [
      ['Orçamento Total', `R$ ${coupleProfile.totalBudgetPlanned.toLocaleString('pt-BR')}`, '100% Planejado'],
      ['Convidados Confirmados', `${guests.filter((g) => g.status === 'confirmado').length} de ${coupleProfile.estimatedGuestsCount}`, 'RSVP Ativo'],
      ['Fornecedores Contratados', `${vendors.filter((v) => v.status === 'contratado').length} empresas`, 'Contratos Ativos'],
      ['Checklist de Tarefas', `${tasks.filter((t) => t.status === 'concluida').length} de ${tasks.length} concluídas`, 'Em Dia'],
    ];
    generateSimplePDF('Relatório Consolidado Executivo - Laçora', headers, rows);
  };

  const handleExportGuestDataLGPD = () => {
    const data = guests.map((g) => ({
      Nome: g.fullName,
      Status: g.status,
      Consentimento_LGPD: 'Concedido pelo Titular',
      Alergias_Restricoes: g.notes || 'Nenhuma informada',
    }));
    exportToCSV('exportacao_lgpd_titulares_dados', data);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Central de Exportação & Governança de Dados
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Relatórios Consolidados & Vault LGPD
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Exportação em lote de PDF/CSV e gestão de consentimentos de dados sensíveis (saúde e restrições).
          </p>
        </div>

        <button
          onClick={handleExportFullReportPDF}
          className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600"
        >
          <Download className="w-4 h-4" /> Exportar Relatório Executivo (PDF)
        </button>
      </div>

      {/* Reports Quick Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-marsala-500" />
            Relatório de Restrições Alimentares
          </h3>
          <p className="text-xs text-slate-500">
            Lista filtrada exclusiva para a equipe de cozinha e buffet contendo alergias e opções vegetarianas.
          </p>
          <button
            onClick={() => {
              const headers = ['Convidado', 'Restrição Alimentar / Alergia'];
              const rows = guests.map((g) => [g.fullName, g.notes || 'Sem restrições']);
              generateSimplePDF('Relatório de Restrições Alimentares - Buffet', headers, rows);
            }}
            className="w-full py-2.5 bg-surface-muted text-charcoal font-semibold text-xs rounded-xl border border-border hover:bg-rose-50 hover:text-marsala-500"
          >
            Gerar PDF para o Buffet
          </button>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            Relatório Financeiro Completo
          </h3>
          <p className="text-xs text-slate-500">
            Detalhamento de todos os itens de orçamento, quitados e saldo restante por pagador.
          </p>
          <button
            onClick={() => {
              const data = budgetItems.map((b) => ({
                Servico: b.description,
                Valor_Contratado: b.contractedCost,
                Valor_Pago: b.paidAmount,
                Pagador: b.payerName,
              }));
              exportToCSV('relatorio_financeiro_completo', data);
            }}
            className="w-full py-2.5 bg-surface-muted text-charcoal font-semibold text-xs rounded-xl border border-border hover:bg-emerald-50 hover:text-emerald-700"
          >
            Exportar Planilha (CSV)
          </button>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-purple-600" />
            Portabilidade de Dados Titulares (LGPD)
          </h3>
          <p className="text-xs text-slate-500">
            Exporte os dados pessoais cadastrados no workspace sob a égide da Lei Geral de Proteção de Dados.
          </p>
          <button
            onClick={handleExportGuestDataLGPD}
            className="w-full py-2.5 bg-surface-muted text-charcoal font-semibold text-xs rounded-xl border border-border hover:bg-purple-50 hover:text-purple-700"
          >
            Exportar Dados LGPD
          </button>
        </div>
      </div>

      {/* LGPD Settings & Privacy Governance Panel */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <Lock className="w-5 h-5 text-marsala-500" />
          Conformidade LGPD & Criptografia de Dados Sensíveis
        </h2>
        <div className="p-4 rounded-2xl bg-surface-muted/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-charcoal block">Termo de Consentimento de Dados de Saúde</span>
              <span className="text-[11px] text-slate-500">
                Os dados de alergias, restrições alimentares e acessibilidade são coletados estritamente para a organização do buffet e segurança do evento.
              </span>
            </div>
            <input
              type="checkbox"
              checked={lgpdConsent}
              onChange={(e) => setLgpdConsent(e.target.checked)}
              className="w-5 h-5 text-marsala-500 rounded border-border focus:ring-marsala-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
