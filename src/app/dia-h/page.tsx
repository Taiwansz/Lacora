'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { generateSimplePDF } from '@/lib/utils';
import { Clock, Download, Printer, Plus, Phone, MapPin, UserCheck, Shield } from 'lucide-react';

export default function DiaHPage() {
  const { timeline, addTimelineItem, activeRole } = useAppStore();
  const [filterProfile, setFilterProfile] = useState<string>('todos');

  const filteredTimeline = timeline.filter((item) => {
    if (filterProfile !== 'todos' && !item.visibleToProfiles.includes(filterProfile as any)) return false;
    return true;
  });

  const handlePrintPDF = () => {
    const headers = ['Horário', 'Evento / Etapa', 'Local', 'Responsável & Instruções'];
    const rows = filteredTimeline.map((item) => [
      item.time,
      item.title,
      item.location,
      `${item.responsiblePerson} — ${item.instructions || ''}`,
    ]);
    generateSimplePDF('Cronograma Operacional do Grande Dia - Minuto a Minuto', headers, rows);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Operacional do Grande Dia (Dia H)
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Cronograma Minuto a Minuto & Visões por Perfil
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Planejamento sequencial da montagem, beleza, cerimônia, recepção e desmontagem com acesso offline e PDF.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
          >
            <Printer className="w-4 h-4" /> Exportar PDF / Imprimir
          </button>
        </div>
      </div>

      {/* Profile Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto bg-surface p-3 rounded-2xl border border-border">
        <span className="text-xs font-bold text-slate-500 mr-2 shrink-0">Filtrar Visão:</span>
        {[
          { id: 'todos', label: 'Visão Completa (Cerimonial)' },
          { id: 'casal_admin', label: 'Visão do Casal' },
          { id: 'fornecedor', label: 'Visão Fornecedores & Equipes' },
          { id: 'convidado', label: 'Visão dos Convidados' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterProfile(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              filterProfile === tab.id
                ? 'bg-marsala-500 text-white shadow-subtle'
                : 'bg-surface-muted text-slate-600 hover:bg-rose-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline Minute-by-Minute Table */}
      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        <div className="divide-y divide-border">
          {filteredTimeline.map((item) => (
            <div key={item.id} className="p-6 hover:bg-surface-muted/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-16 text-center shrink-0">
                  <span className="font-serif text-xl font-bold text-marsala-500 block leading-none">{item.time}</span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">{item.durationMinutes} min</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-charcoal">{item.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}</span>
                    <span className="flex items-center gap-1"><UserCheck className="w-3.5 h-3.5 text-slate-400" /> {item.responsiblePerson}</span>
                  </div>
                  {item.instructions && (
                    <p className="text-xs text-slate-600 bg-surface-muted p-2.5 rounded-xl mt-2 border border-border/50">
                      {item.instructions}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
