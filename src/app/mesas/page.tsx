'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Grid, Users, AlertTriangle, Plus, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function MesasPage() {
  const { tables, guests, assignGuestToSeat } = useAppStore();
  const [selectedTableId, setSelectedTableId] = useState<string | null>(tables[0]?.id || null);

  const confirmedGuests = guests.filter((g) => g.status === 'confirmado');
  const unassignedGuests = confirmedGuests.filter((g) => !g.tableId);

  const selectedTable = tables.find((t) => t.id === selectedTableId);
  const seatedInSelectedTable = guests.filter((g) => g.tableId === selectedTableId);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Planta de Layout & Setorização
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Mapa Interativo de Mesas & Assentos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Alocação visual sincronizada em tempo real com o RSVP, alertas de capacidade e restrições alimentares.
          </p>
        </div>
      </div>

      {/* Warnings & Alerts Header Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <span className="text-xs font-bold text-amber-900 block">Convidados sem Assento</span>
            <span className="text-[11px] text-amber-700">{unassignedGuests.length} confirmados pendentes de alocação</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <div>
            <span className="text-xs font-bold text-emerald-900 block">Mesas Configuradas</span>
            <span className="text-[11px] text-emerald-700">{tables.length} mesas na planta baixa</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-purple-700 shrink-0" />
          <div>
            <span className="text-xs font-bold text-purple-900 block">Acessibilidade Garantida</span>
            <span className="text-[11px] text-purple-700">Mesa 01 com rampa próxima ao sanitário</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Visual Floorplan & Seating List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Floorplan View */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4 min-h-[400px]">
          <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
            <Grid className="w-5 h-5 text-marsala-500" />
            Planta Baixa do Salão (Quinta das Flores)
          </h2>

          {/* Interactive Layout Box */}
          <div className="relative w-full h-[360px] bg-surface-muted/60 rounded-2xl border-2 border-dashed border-border p-6 flex flex-wrap gap-6 items-center justify-center overflow-auto">
            {tables.map((table) => {
              const currentCount = guests.filter((g) => g.tableId === table.id).length;
              const isSelected = selectedTableId === table.id;
              return (
                <div
                  key={table.id}
                  onClick={() => setSelectedTableId(table.id)}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center shadow-subtle ${
                    table.shape === 'imperial'
                      ? 'w-64 h-24 rounded-2xl bg-amber-100 border-amber-400'
                      : 'w-36 h-36 rounded-full bg-white border-rose-300'
                  } ${isSelected ? 'ring-4 ring-marsala-500 scale-105 shadow-card' : ''}`}
                >
                  <span className="font-serif font-bold text-xs text-charcoal text-center">{table.name}</span>
                  <span className="text-[10px] text-slate-500 mt-1">
                    {currentCount} / {table.capacity} assentos
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Table Seating Manager */}
        <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
          {selectedTable ? (
            <div>
              <h3 className="font-serif text-base font-bold text-charcoal">{selectedTable.name}</h3>
              <p className="text-xs text-slate-500">Capacidade: {selectedTable.capacity} pessoas</p>

              <div className="mt-4 space-y-3">
                <span className="text-xs font-bold text-charcoal block">Convidados Alocados nesta Mesa:</span>
                {seatedInSelectedTable.map((guest) => (
                  <div key={guest.id} className="p-3 rounded-xl bg-surface-muted border border-border flex items-center justify-between text-xs">
                    <span className="font-bold text-charcoal">{guest.fullName}</span>
                    <button
                      onClick={() => assignGuestToSeat(guest.id, '')}
                      className="text-[10px] text-rose-500 font-semibold hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                ))}

                {seatedInSelectedTable.length === 0 && (
                  <p className="text-xs text-slate-400 py-4 text-center">Nenhum convidado sentado nesta mesa.</p>
                )}
              </div>

              {/* Unassigned Guests Quick Add */}
              {unassignedGuests.length > 0 && (
                <div className="mt-6 pt-4 border-t border-border space-y-2">
                  <span className="text-xs font-bold text-charcoal block">Alocar Convidado Pendente:</span>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {unassignedGuests.map((g) => (
                      <button
                        key={g.id}
                        onClick={() => assignGuestToSeat(g.id, selectedTable.id)}
                        className="w-full text-left p-2 rounded-lg bg-white border border-border text-xs text-charcoal hover:bg-rose-50 flex items-center justify-between"
                      >
                        <span>{g.fullName}</span>
                        <Plus className="w-3.5 h-3.5 text-marsala-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-400">Selecione uma mesa na planta.</p>
          )}
        </div>
      </div>
    </div>
  );
}
