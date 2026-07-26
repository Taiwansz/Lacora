'use client';

import React from 'react';
import { CreditCard, CheckCircle2, Zap } from 'lucide-react';

export default function AssinaturaPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Plano & Assinatura</h1>
        <p className="text-xs text-slate-500 mt-1">
          Gerencie o plano do seu casamento, limites do workspace e comprovantes de assinatura.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Plano Ativo
            </span>
            <h2 className="font-serif text-2xl font-bold text-charcoal mt-2">Plano Nosso Grande Dia Pro</h2>
            <p className="text-xs text-slate-500 mt-1">Workspace completo com convidados ilimitados, cofre de documentos e site público.</p>
          </div>
          <span className="font-serif text-2xl font-bold text-marsala-500 shrink-0">
            R$ 89,90 <span className="text-xs font-sans font-normal text-slate-400">/ mês</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-surface-muted border border-border">
            <span className="text-slate-500 block">Convidados Cadastrados</span>
            <span className="font-bold text-charcoal text-base mt-1 block">Ilimitado</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface-muted border border-border">
            <span className="text-slate-500 block">Armazenamento de Documentos</span>
            <span className="font-bold text-charcoal text-base mt-1 block">10 GB</span>
          </div>
          <div className="p-4 rounded-2xl bg-surface-muted border border-border">
            <span className="text-slate-500 block">Status da Assinatura</span>
            <span className="font-bold text-emerald-700 text-base mt-1 block">Ativa & Regular</span>
          </div>
        </div>
      </div>
    </div>
  );
}
