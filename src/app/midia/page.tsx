'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Camera, CheckCircle2 } from 'lucide-react';

export default function MidiaPage() {
  const { photoShots } = useAppStore();

  return (
    <div className="space-y-8">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Shot List & Mídia Fotográfica</h1>
        <p className="text-xs text-slate-500 mt-1">
          Lista de fotos indispensáveis para a equipe de fotografia e filmagem.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
        {photoShots.map((shot) => (
          <div key={shot.id} className="p-4 rounded-2xl border border-border bg-surface-muted/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-marsala-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {shot.moment.replace('_', ' ')}
              </span>
              <h3 className="text-xs font-bold text-charcoal mt-1">{shot.title}</h3>
              <p className="text-[11px] text-slate-500">Pessoas: {shot.peopleInvolved}</p>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${shot.taken ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              {shot.taken ? 'Capturada' : 'Pendente'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
