'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Clock, Plus, Phone, MapPin, User, CheckCircle2 } from 'lucide-react';

export default function DiaHPage() {
  const { timeline, addTimelineItem, getCurrentRole } = useAppStore();
  const [filterProfile, setFilterProfile] = useState<string>('todos');

  const currentRole = getCurrentRole();

  const filteredTimeline = timeline.filter((item) => {
    if (filterProfile === 'todos') return true;
    return item.visibleToProfiles.includes(filterProfile as any);
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Operação do Grande Dia
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Cronograma Minuto a Minuto (Dia H)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Guia de execução com responsáveis, fornecedores envolvidos, horários e notas de contingência.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Filtrar para:</span>
          <select
            value={filterProfile}
            onChange={(e) => setFilterProfile(e.target.value)}
            className="text-xs font-semibold p-2 border border-border rounded-xl bg-surface-muted outline-none"
          >
            <option value="todos">Todos os Eventos</option>
            <option value="casal_admin">Casal & Padrinhos</option>
            <option value="cerimonialista">Cerimonial & Staff</option>
            <option value="fornecedor">Fornecedores</option>
          </select>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-surface p-6 sm:p-8 rounded-3xl border border-border shadow-card space-y-6">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <Clock className="w-5 h-5 text-marsala-500" />
          Roteiro Oficial do Casamento
        </h2>

        <div className="relative pl-6 border-l-2 border-border space-y-6">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Point Dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 border-marsala-500 bg-surface group-hover:bg-marsala-500 transition-colors" />

              <div className="p-4 rounded-2xl border border-border bg-surface-muted/30 space-y-2 hover:bg-surface-muted transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-marsala-500">{item.time}</span>
                  <span className="text-[10px] text-slate-400 font-medium">{item.durationMinutes} minutos</span>
                </div>

                <h3 className="font-serif text-base font-bold text-charcoal">{item.title}</h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-charcoal">
                    <User className="w-3.5 h-3.5 text-slate-400" /> {item.responsiblePerson}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                  </span>
                  {item.phoneContact && (
                    <span className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {item.phoneContact}
                    </span>
                  )}
                </div>

                {item.instructions && (
                  <p className="text-xs text-slate-600 bg-surface p-2.5 rounded-xl border border-border/80">
                    <strong>Instruções:</strong> {item.instructions}
                  </p>
                )}

                {item.contingencyNote && (
                  <p className="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <strong>Contingência:</strong> {item.contingencyNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
