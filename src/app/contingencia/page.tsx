'use client';

import React from 'react';
import { ShieldAlert, Phone, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ContingenciaPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Matriz de Riscos & Segurança
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Plano de Contingência & Kit de Emergência
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Protocolos de ação rápida para quedas de energia, atrasos de fornecedores e suporte médico.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Contingência de Clima & Chuva Forte
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Decisão de acionamento do Plano B (Pergola envidraçada climatizada) tomada em conjunto com a cerimonialista Juliana até 3 horas antes da cerimônia (às 13:30h).
          </p>
        </div>

        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
          <h3 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <Phone className="w-5 h-5 text-marsala-500" />
            Contatos de Emergência do Evento
          </h3>
          <div className="space-y-2 text-xs text-slate-600">
            <p><strong className="text-charcoal">Hospital Mais Próximo:</strong> Santa Casa de Campos do Jordão — (12) 3662-1000</p>
            <p><strong className="text-charcoal">Gerador Responsável:</strong> Técnico Roberto — (12) 99887-7766</p>
          </div>
        </div>
      </div>
    </div>
  );
}
