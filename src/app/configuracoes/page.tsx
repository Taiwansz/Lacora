'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Settings } from 'lucide-react';

export default function ConfiguracoesPage() {
  const { coupleProfile, updateCoupleProfile } = useAppStore();
  const [partner1, setPartner1] = useState(coupleProfile.partner1Name);
  const [partner2, setPartner2] = useState(coupleProfile.partner2Name);
  const [weddingDate, setWeddingDate] = useState(coupleProfile.weddingDate);
  const [weddingTime, setWeddingTime] = useState(coupleProfile.weddingTime);
  const [city, setCity] = useState(coupleProfile.city);
  const [state, setState] = useState(coupleProfile.state);
  const [estimatedGuests, setEstimatedGuests] = useState(coupleProfile.estimatedGuestsCount);
  const [budget, setBudget] = useState(coupleProfile.totalBudgetPlanned);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoupleProfile({
      partner1Name: partner1,
      partner2Name: partner2,
      weddingDate,
      weddingTime,
      city,
      state: state.toUpperCase(),
      estimatedGuestsCount: Number(estimatedGuests),
      totalBudgetPlanned: Number(budget),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 w-full">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal flex items-center gap-2">
          <Settings className="w-6 h-6 text-marsala-500" />
          Configurações do Casamento
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Gerencie os parâmetros do casamento, nomes do casal, fuso horário e teto orçamentário.
        </p>
      </div>

      {/* Settings Form */}
      {saved && <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-semibold text-emerald-800">Configurações salvas.</p>}
      <form onSubmit={handleSave} className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-base font-bold text-charcoal">Parâmetros Principais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Nome do Noivo(a) 1</label>
            <input
              type="text"
              value={partner1}
              onChange={(e) => setPartner1(e.target.value)}
              className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Nome do Noivo(a) 2</label>
            <input
              type="text"
              value={partner2}
              onChange={(e) => setPartner2(e.target.value)}
              className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_.7fr]">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Data do casamento</label>
            <input
              type="date"
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Horário</label>
            <input
              type="time"
              value={weddingTime}
              onChange={(e) => setWeddingTime(e.target.value)}
              className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_6rem_1fr]">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Cidade</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">UF</label>
            <input
              type="text"
              maxLength={2}
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full text-xs p-3 border border-border rounded-xl uppercase outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">Convidados previstos</label>
            <input
              type="number"
              min="0"
              value={estimatedGuests}
              onChange={(e) => setEstimatedGuests(Number(e.target.value))}
              className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">Orçamento Teto Planejado (R$)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-marsala-500 text-white font-bold text-xs rounded-xl shadow-card hover:bg-marsala-600"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
