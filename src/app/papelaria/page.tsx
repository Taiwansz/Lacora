'use client';

import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';

export default function PapelariaPage() {
  return (
    <div className="space-y-8">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Papelaria, Convites & Lembrancinhas</h1>
        <p className="text-xs text-slate-500 mt-1">
          Gestão de Save the Date, convites físicos, manuais dos padrinhos, marcadores de mesa e lembranças.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-base font-bold text-charcoal">Status dos Itens de Papelaria</h2>
        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3 bg-surface-muted rounded-xl flex items-center justify-between">
            <span>Save the Date Digital</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px]">Entregue / Disparado</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl flex items-center justify-between">
            <span>Convite Físico em Papel Algodão 600g com Lacre de Cera Marsala</span>
            <span className="font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full text-[10px]">Em Impressão</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl flex items-center justify-between">
            <span>Manual dos Padrinhos com Gravatas e Guia de Cores</span>
            <span className="font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full text-[10px]">Entregue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
