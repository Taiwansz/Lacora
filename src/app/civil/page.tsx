'use client';

import React from 'react';
import { FileCheck, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function CivilPage() {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Guia de Cartório & Trâmites Legais
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Checklist de Casamento Civil
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Documentação necessária, prazos de habilitação (30 a 90 dias) e regimes de bens.
          </p>
        </div>
      </div>

      {/* Cartório Checklist Box */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-marsala-500" />
          Documentos Obrigatórios para Entrada na Habilitação
        </h2>
        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3 bg-surface-muted rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Certidão de Nascimento atualizada em até 90 dias (ou Certidão de Casamento com averbação de divórcio)</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span> Documento de Identidade oficial (RG / CNH) e CPF de ambos os noivos</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span> Comprovante de residência atualizado do casal</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span> Dados e RG de 2 testemunhas maiores de 18 anos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
