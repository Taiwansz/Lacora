'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Flower2, Plus } from 'lucide-react';

export default function DecoracaoPage() {
  const { decorItems } = useAppStore();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Projeto Cenográfico & Floral
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Gestão de Decoração por Setor
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Arranjos de altar, mesa dos noivos, lounge, bouquet e espécies florais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {decorItems.map((item) => (
          <div key={item.id} className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-2">
            <span className="text-[10px] font-bold uppercase text-marsala-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 inline-block">
              Setor: {item.section}
            </span>
            <h3 className="font-serif text-base font-bold text-charcoal">{item.title}</h3>
            <p className="text-xs text-slate-600"><span className="font-semibold">Espécies / Materiais:</span> {item.floralsOrMaterials}</p>
            <p className="text-xs text-slate-500"><span className="font-semibold">Quantidade:</span> {item.quantity} conjunto(s)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
