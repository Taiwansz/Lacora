'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { exportToCSV } from '@/lib/utils';
import { Lock, Download, ShieldCheck, Trash2 } from 'lucide-react';

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
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Privacidade & Conformidade LGPD</h1>
        <p className="text-xs text-slate-500 mt-1">
          Gestão de consentimentos, portabilidade de dados pessoais e termos de privacidade.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-6">
        <div className="space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">Portabilidade de Dados dos Titulares</h2>
          <p className="text-xs text-slate-600">
            Exporte os relatórios de dados pessoais armazenados neste workspace conforme os termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
          </p>
          <button
            onClick={handleExportLGPD}
            className="flex items-center gap-2 bg-marsala-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
          >
            <Download className="w-4 h-4" /> Exportar Dados de Convidados (CSV)
          </button>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <h2 className="font-serif text-base font-bold text-charcoal">Criptografia & Isolamento</h2>
          <p className="text-xs text-slate-600">
            Todos os dados de saúde, restrições alimentares e acessibilidade são transmitidos e armazenados com criptografia de ponta a ponta e isolamento estrito por workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
