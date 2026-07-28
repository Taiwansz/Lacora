'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { FileCheck, AlertCircle, CheckCircle2, ShieldCheck, Scale, ExternalLink } from 'lucide-react';

export default function CivilPage() {
  const { civilInfo, updateCivilChecklist } = useAppStore();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Guia de Cartório & Trâmites Legais
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Checklist de Casamento Civil
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Documentação necessária, prazos de habilitação (30 a 90 dias) e regimes de bens.
          </p>
        </div>
      </div>

      {/* Official Disclaimer & Source Note */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1">
        <div className="flex items-center gap-2 font-bold">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Aviso Legal & Jurisdição (Última Revisão: Julho/2026)</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          As exigências documentais e prazos cartorários variam conforme a legislação do estado e o município do Cartório de Registro Civil. As informações exibidas nesta plataforma possuem caráter orientativo. Para confirmação oficial, consulte o portal da{' '}
          <a
            href="https://www.arpenbrasil.org.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline text-amber-950 inline-flex items-center gap-0.5"
          >
            ARPEN Brasil <ExternalLink className="w-3 h-3" />
          </a>{' '}
          ou o Cartório de sua região.
        </p>
      </div>

      {/* Regime de Bens Explanation */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <Scale className="w-5 h-5 text-marsala-500" />
          Regimes de Bens no Código Civil Brasileiro
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-surface-muted rounded-2xl border border-border space-y-1">
            <span className="font-bold text-charcoal block">Comunhão Parcial de Bens (Padrão)</span>
            <p className="text-slate-600 text-[11px]">
              Bens adquiridos antes do casamento permanecem individuais. Bens adquiridos onerosamente durante o casamento pertencem a ambos os cônjuges.
            </p>
          </div>

          <div className="p-4 bg-surface-muted rounded-2xl border border-border space-y-1">
            <span className="font-bold text-charcoal block">Separação Total de Bens</span>
            <p className="text-slate-600 text-[11px]">
              Todos os bens presentes e futuros permanecem no patrimônio exclusivo de cada cônjuge (exige Pacto Antenupcial por Escritura Pública).
            </p>
          </div>

          <div className="p-4 bg-surface-muted rounded-2xl border border-border space-y-1">
            <span className="font-bold text-charcoal block">Comunhão Universal de Bens</span>
            <p className="text-slate-600 text-[11px]">
              Todos os bens presentes e futuros de ambos os cônjuges passam a integrar um patrimônio comum (exige Pacto Antenupcial).
            </p>
          </div>

          <div className="p-4 bg-surface-muted rounded-2xl border border-border space-y-1">
            <span className="font-bold text-charcoal block">Participação Final nos Aquestos</span>
            <p className="text-slate-600 text-[11px]">
              Cada cônjuge mantém seu patrimônio próprio durante o casamento, e na dissolução apuram-se os bens adquiridos para divisão.
            </p>
          </div>
        </div>
      </div>

      {/* Cartório Checklist Box */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-marsala-500" />
          Documentos Obrigatórios para Entrada na Habilitação
        </h2>
        <div className="space-y-3 text-xs text-slate-700">
          {civilInfo.checklists.map((item) => (
            <div
              key={item.id}
              onClick={() => updateCivilChecklist(item.id, !item.completed)}
              className="p-3 bg-surface-muted rounded-xl flex items-center gap-3 cursor-pointer hover:bg-rose-50/50 transition-colors"
            >
              <input
                id={`civil-check-${item.id}`}
                type="checkbox"
                checked={item.completed}
                onChange={() => {}}
                className="w-4 h-4 rounded text-marsala-500 focus:ring-marsala-500 border-border cursor-pointer"
              />
              <label htmlFor={`civil-check-${item.id}`} className="cursor-pointer font-medium text-charcoal">
                {item.title}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
