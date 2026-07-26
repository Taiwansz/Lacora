'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Sparkles, Heart, Calendar, DollarSign, Palette, Users, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const { coupleProfile, completeOnboarding } = useAppStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    partner1Name: coupleProfile.partner1Name || '',
    partner2Name: coupleProfile.partner2Name || '',
    weddingDate: coupleProfile.weddingDate || '2026-11-14',
    weddingTime: coupleProfile.weddingTime || '16:30',
    city: coupleProfile.city || 'Campos do Jordão',
    state: coupleProfile.state || 'SP',
    weddingType: coupleProfile.weddingType || 'civil_e_religioso',
    estimatedGuestsCount: coupleProfile.estimatedGuestsCount || 180,
    totalBudgetPlanned: coupleProfile.totalBudgetPlanned || 135000,
    style: coupleProfile.style || 'Botânico Chic & Sofisticado',
    formalityLevel: coupleProfile.formalityLevel || 'Semi-Formal',
    culturalTraditions: coupleProfile.culturalTraditions || '',
    accessibilityNeeds: coupleProfile.accessibilityNeeds || '',
    availableWeeklyHours: coupleProfile.availableWeeklyHours || 8,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinish = () => {
    completeOnboarding(formData);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header Wizard Progress Bar */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
              Onboarding Guiado — Passo {step} de 4
            </span>
            <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
              {step === 1 && 'Identificação & Estilo do Casal'}
              {step === 2 && 'Data, Horário & Localização'}
              {step === 3 && 'Convidados & Orçamento Estimado'}
              {step === 4 && 'Tradições & Preferências'}
            </h1>
          </div>
          <div className="w-12 h-12 rounded-2xl marsala-gradient flex items-center justify-center text-white shadow-subtle">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-marsala-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content Card */}
      <div className="bg-surface p-8 rounded-3xl border border-border shadow-card space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Passo 1: O Casal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Nome do Noivo(a) 1</label>
                <input
                  type="text"
                  value={formData.partner1Name}
                  onChange={(e) => handleChange('partner1Name', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                  placeholder="Ex: Matheus"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Nome do Noivo(a) 2</label>
                <input
                  type="text"
                  value={formData.partner2Name}
                  onChange={(e) => handleChange('partner2Name', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                  placeholder="Ex: Virginia"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Estilo do Casamento</label>
              <input
                type="text"
                value={formData.style}
                onChange={(e) => handleChange('style', e.target.value)}
                className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                placeholder="Ex: Botânico Chic, Modeno, Clássico, Rústico"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Passo 2: Data & Local</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Data do Casamento</label>
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) => handleChange('weddingDate', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Horário Previsto</label>
                <input
                  type="time"
                  value={formData.weddingTime}
                  onChange={(e) => handleChange('weddingTime', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Cidade</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                  placeholder="Ex: Campos do Jordão"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Estado (UF)</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                  placeholder="Ex: SP"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Passo 3: Estimativas Financeiras</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Número Estimado de Convidados</label>
                <input
                  type="number"
                  value={formData.estimatedGuestsCount}
                  onChange={(e) => handleChange('estimatedGuestsCount', Number(e.target.value))}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Orçamento Total Planejado (R$)</label>
                <input
                  type="number"
                  value={formData.totalBudgetPlanned}
                  onChange={(e) => handleChange('totalBudgetPlanned', Number(e.target.value))}
                  className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Passo 4: Acessibilidade & Tradições</h2>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Tradições Culturais, Familiares ou Religiosas</label>
              <textarea
                value={formData.culturalTraditions}
                onChange={(e) => handleChange('culturalTraditions', e.target.value)}
                className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none h-20"
                placeholder="Ex: Cerimônia das Areias, Quebra de taças, etc."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Necessidades de Acessibilidade</label>
              <textarea
                value={formData.accessibilityNeeds}
                onChange={(e) => handleChange('accessibilityNeeds', e.target.value)}
                className="w-full text-xs p-3 border border-border rounded-xl focus:ring-2 focus:ring-marsala-500 outline-none h-20"
                placeholder="Ex: Rampa de acesso ao altar para a avó, mesa próxima ao banheiro acessível."
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          {step > 1 ? (
            <button
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
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 text-xs font-semibold text-white bg-marsala-500 px-6 py-2.5 rounded-xl shadow-card hover:bg-marsala-600"
            >
              Próximo <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 px-6 py-2.5 rounded-xl shadow-card hover:bg-emerald-700"
            >
              <CheckCircle2 className="w-4 h-4" /> Gerar Planejamento Inteligente
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
