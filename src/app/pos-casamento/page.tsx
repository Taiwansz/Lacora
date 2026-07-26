'use client';

import React from 'react';
import { Plane, HeartHandshake, Gift, Star, CheckCircle2 } from 'lucide-react';

export default function PosCasamentoPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Roteiro de Viagem & Fechamento
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Lua de Mel & Tarefas Pós-Casamento
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gestão do roteiro de viagem, cartões de agradecimento de presentes e avaliações de fornecedores.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <Plane className="w-5 h-5 text-marsala-500" />
            Roteiro da Lua de Mel (Santorini & Atenas)
          </h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong className="text-charcoal">Voo de Ida:</strong> SP (GRU) $\rightarrow$ Atenas (ATH) em 17/11/2026</p>
            <p><strong className="text-charcoal">Hotel Reserva:</strong> Grace Hotel Santorini (7 noites)</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            Agradecimentos de Presentes Enviados
          </h3>
          <p className="text-xs text-slate-600">
            18 de 24 presentes recebidos já possuem mensagem de agradecimento disparada aos convidados.
          </p>
        </div>
      </div>
    </div>
  );
}
