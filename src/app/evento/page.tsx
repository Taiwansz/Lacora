'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Utensils, Music, CheckCircle2, Heart } from 'lucide-react';

export default function EventoPage() {
  const { menuItems } = useAppStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Protocolo da Festa & Cardápios
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Planejamento de Gastronomia & Músicas da Cerimônia
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Degustações aprovadas, opções vegetarianas, menu infantil e refeições da equipe.
          </p>
        </div>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <Utensils className="w-5 h-5 text-marsala-500" />
          Cardápio Oficial Aprovado na Degustação
        </h2>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl border border-border bg-surface-muted/40 flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">{item.course}</span>
                <h3 className="text-sm font-bold text-charcoal mt-0.5">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.description}</p>

                <div className="flex items-center gap-2 mt-2">
                  {item.isVegetarian && (
                    <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Vegetariano
                    </span>
                  )}
                  {item.isGlutenFree && (
                    <span className="text-[9px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                      Sem Glúten
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                Aprovado na Degustação
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
