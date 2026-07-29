'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Settings, Shield, Plus, UserPlus, RefreshCw, Key } from 'lucide-react';

export default function ConfiguracoesPage() {
  const { coupleProfile, updateCoupleProfile, getCurrentRole } = useAppStore();
  const [partner1, setPartner1] = useState(coupleProfile.partner1Name);
  const [partner2, setPartner2] = useState(coupleProfile.partner2Name);
  const [budget, setBudget] = useState(coupleProfile.totalBudgetPlanned);
  const [saved, setSaved] = useState(false);

  const currentRole = getCurrentRole();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCoupleProfile({
      partner1Name: partner1,
      partner2Name: partner2,
      totalBudgetPlanned: Number(budget),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
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
