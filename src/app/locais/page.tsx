'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { MapPin, Shield, Zap, Wind, Users, CheckCircle2 } from 'lucide-react';

export default function LocaisPage() {
  const { venues } = useAppStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Ficha Técnica dos Espaços
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Gestão de Locais & Plano de Chuva (Plano B)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Capacidade sentada, gerador, rotas acessíveis e regras de montagem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal">{venue.name}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-marsala-500" /> {venue.address} — {venue.city}/{venue.state}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Contratado
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Capacidade Sentada</span>
                <span className="font-bold text-charcoal text-sm mt-0.5 block">{venue.seatedCapacity} pessoas</span>
              </div>
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Potência do Gerador</span>
                <span className="font-bold text-charcoal text-sm mt-0.5 block">{venue.generatorPowerKva} kva</span>
              </div>
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Estacionamento / Valet</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block">Incluso</span>
              </div>
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Acessibilidade</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block">Rota Rampa OK</span>
              </div>
            </div>

            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 text-xs space-y-1">
              <span className="font-bold text-marsala-500 block">Plano de Chuva (Plano B Alternativo):</span>
              <p className="text-slate-700">{venue.weatherBackupPlan}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
