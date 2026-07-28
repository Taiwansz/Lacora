'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/utils';
import { Lock, Download, ShieldCheck, FileText } from 'lucide-react';

export default function PrivacidadePage() {
  const { guests } = useAppStore();

  const handleExportLGPD = () => {
    const data = guests.map((g) => ({
      Nome: g.fullName,
      Status: g.status,
      Consentimento: 'Concedido pelo Titular',
      Alergias: g.notes || 'Nenhuma informada',
    }));
    exportToCSV('exportacao_lgpd_titulares', data);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-6">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Política de Privacidade & Conformidade LGPD</h1>
        <p className="text-xs text-slate-500 mt-1">
          Transparência na coleta, retenção, portabilidade e proteção de dados pessoais (Lei nº 13.709/2018).
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-6">
        <div className="space-y-3">
          <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <Lock className="w-5 h-5 text-marsala-500" />
            Criptografia & Proteção de Dados
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Todos os dados de usuários e convidados (incluindo restrições alimentares e acessibilidade) são protegidos com <strong>criptografia em trânsito (HTTPS / TLS 1.3)</strong> e <strong>criptografia em repouso (AES-256)</strong> nos servidores de banco de dados. Cada conta possui um workspace isolado logicamente com políticas estritas de acesso (Row Level Security).
          </p>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-600" />
            Direito à Portabilidade dos Titulares
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conforme o Artigo 18 da LGPD, os titulares de dados ou administradores do workspace podem solicitar a exportação integral de seus registros a qualquer momento.
          </p>
          <button
            onClick={handleExportLGPD}
            className="flex items-center gap-2 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-card transition-colors"
          >
            <Download className="w-4 h-4" /> Exportar Dados de Convidados (CSV / LGPD)
          </button>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            Base Legal & Retenção
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Os dados dos convidados são coletados exclusivamente para a organização da recepção e lista do casamento, sob a base legal de consentimento ou execução de contrato. O casal responsável pode excluir dados ou remover o workspace a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}
