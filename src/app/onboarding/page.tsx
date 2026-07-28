'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ArrowRight, ArrowLeft, CheckCircle2, Compass } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { coupleProfile, completeRealOnboarding } = useAppStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    partner1Name: coupleProfile.partner1Name || '',
    partner2Name: coupleProfile.partner2Name || '',
    weddingDate: coupleProfile.weddingDate || '',
    weddingTime: coupleProfile.weddingTime || '16:00',
    city: coupleProfile.city || '',
    state: coupleProfile.state || '',
    weddingType: coupleProfile.weddingType || 'civil_e_religioso',
    estimatedGuestsCount: coupleProfile.estimatedGuestsCount || 100,
    totalBudgetPlanned: coupleProfile.totalBudgetPlanned || 80000,
    style: coupleProfile.style || 'Elegante e Moderno',
    formalityLevel: coupleProfile.formalityLevel || 'Semi-Formal',
    culturalTraditions: coupleProfile.culturalTraditions || '',
    accessibilityNeeds: coupleProfile.accessibilityNeeds || '',
    availableWeeklyHours: coupleProfile.availableWeeklyHours || 6,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinish = () => {
    completeRealOnboarding(formData);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Wizard Progress Header */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
              Configuração Inicial do Casamento — Passo {step} de 4
            </span>
            <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
              {step === 1 && 'Identificação do Casal'}
              {step === 2 && 'Data, Horário & Localização'}
              {step === 3 && 'Estimativa de Convidados & Orçamento'}
              {step === 4 && 'Preferências, Tradições & Acessibilidade'}
            </h1>
          </div>
          <div className="w-10 h-10 rounded-2xl marsala-gradient flex items-center justify-center text-white font-bold shadow-subtle">
            <Compass className="w-5 h-5" />
          </div>
        </div>

        <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-marsala-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Card */}
      <div className="bg-surface p-8 rounded-3xl border border-border shadow-card space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ob-p1" className="block text-xs font-semibold text-charcoal mb-1">Nome do Noivo(a) 1 *</label>
                <input
                  id="ob-p1"
                  type="text"
                  required
                  value={formData.partner1Name}
                  onChange={(e) => handleChange('partner1Name', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Nome de um dos noivos"
                />
              </div>
              <div>
                <label htmlFor="ob-p2" className="block text-xs font-semibold text-charcoal mb-1">Nome do Noivo(a) 2 *</label>
                <input
                  id="ob-p2"
                  type="text"
                  required
                  value={formData.partner2Name}
                  onChange={(e) => handleChange('partner2Name', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Nome do outro noivo(a)"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ob-style" className="block text-xs font-semibold text-charcoal mb-1">Estilo do Casamento</label>
              <input
                id="ob-style"
                type="text"
                value={formData.style}
                onChange={(e) => handleChange('style', e.target.value)}
                className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                placeholder="Ex: Botânico Chic, Moderno, Rústico Elegante"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ob-date" className="block text-xs font-semibold text-charcoal mb-1">Data Prevista do Casamento</label>
                <input
                  id="ob-date"
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => handleChange('weddingDate', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                />
              </div>
              <div>
                <label htmlFor="ob-time" className="block text-xs font-semibold text-charcoal mb-1">Horário Previsto</label>
                <input
                  id="ob-time"
                  type="time"
                  value={formData.weddingTime}
                  onChange={(e) => handleChange('weddingTime', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ob-city" className="block text-xs font-semibold text-charcoal mb-1">Cidade</label>
                <input
                  id="ob-city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Ex: São Paulo"
                />
              </div>
              <div>
                <label htmlFor="ob-state" className="block text-xs font-semibold text-charcoal mb-1">Estado (UF)</label>
                <input
                  id="ob-state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                  placeholder="Ex: SP"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ob-guests" className="block text-xs font-semibold text-charcoal mb-1">Número Estimado de Convidados</label>
                <input
                  id="ob-guests"
                  type="number"
                  value={formData.estimatedGuestsCount}
                  onChange={(e) => handleChange('estimatedGuestsCount', Number(e.target.value))}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                />
              </div>
              <div>
                <label htmlFor="ob-budget" className="block text-xs font-semibold text-charcoal mb-1">Orçamento Teto Planejado (R$)</label>
                <input
                  id="ob-budget"
                  type="number"
                  value={formData.totalBudgetPlanned}
                  onChange={(e) => handleChange('totalBudgetPlanned', Number(e.target.value))}
                  className="w-full text-xs p-3 border border-border rounded-xl outline-none focus:ring-2 focus:ring-marsala-500"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="ob-traditions" className="block text-xs font-semibold text-charcoal mb-1">Tradições Culturais ou Religiosas</label>
              <textarea
                id="ob-traditions"
                value={formData.culturalTraditions}
                onChange={(e) => handleChange('culturalTraditions', e.target.value)}
                className="w-full text-xs p-3 border border-border rounded-xl outline-none h-20 focus:ring-2 focus:ring-marsala-500"
                placeholder="Ex: Cerimônia das areias, quebra de taças..."
              />
            </div>
            <div>
              <label htmlFor="ob-accessibility" className="block text-xs font-semibold text-charcoal mb-1">Necessidades de Acessibilidade</label>
              <textarea
                id="ob-accessibility"
                value={formData.accessibilityNeeds}
                onChange={(e) => handleChange('accessibilityNeeds', e.target.value)}
                className="w-full text-xs p-3 border border-border rounded-xl outline-none h-20 focus:ring-2 focus:ring-marsala-500"
                placeholder="Ex: Rampa no altar, mesa estofada para avó..."
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 px-4 py-2 rounded-xl border border-border hover:bg-surface-muted"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 text-xs font-semibold text-white bg-marsala-500 px-6 py-2.5 rounded-xl shadow-card hover:bg-marsala-600"
            >
              Próximo <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 px-6 py-2.5 rounded-xl shadow-card hover:bg-emerald-700"
            >
              <CheckCircle2 className="w-4 h-4" /> Finalizar Onboarding
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
