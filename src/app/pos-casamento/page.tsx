'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Plane, HeartHandshake, Gift, CheckCircle2 } from 'lucide-react';

export default function PosCasamentoPage() {
  const { gifts } = useAppStore();

  const totalGifts = gifts.length;
  const thankedGifts = gifts.filter((g) => g.thanked).length;

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
            Roteiro da Lua de Mel
          </h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong className="text-charcoal">Voo de Ida:</strong> Aeroporto Principal → Destino da Viagem</p>
            <p><strong className="text-charcoal">Hospedagem:</strong> Reserva de Hotel Confirmada</p>
            <p className="text-[11px] text-slate-400">Roteiro e passagens armazenadas no módulo de Documentos.</p>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            Agradecimentos de Presentes Enviados
          </h3>
          <p className="text-xs text-slate-600">
            {thankedGifts} de {totalGifts || 0} presentes recebidos já possuem mensagem de agradecimento disparada aos convidados.
          </p>
        </div>
      </div>
    </div>
  );
}
