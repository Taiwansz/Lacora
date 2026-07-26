'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { Globe, Eye, Copy, Heart, MapPin, Calendar, CheckCircle2, Gift } from 'lucide-react';

export default function SitePage() {
  const { coupleProfile, palette, gifts } = useAppStore();
  const [copied, setCopied] = useState(false);

  const publicUrl = `https://nossograndedia.app/site/${coupleProfile.partner1Name.toLowerCase()}-${coupleProfile.partner2Name.toLowerCase()}`;

  const copyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Construtor de Site Público & Lista de Presentes
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Site Oficial do Casal & Formulário de RSVP
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalize a história, dress code, mapas, lista de cotas de presentes e receba RSVPs online.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 bg-surface-muted text-charcoal font-semibold text-xs px-4 py-2.5 rounded-xl border border-border hover:bg-rose-50"
          >
            <Copy className="w-4 h-4" /> {copied ? 'Link Copiado!' : 'Copiar Link Público'}
          </button>
          <Link
            href="/rsvp/token-demo-123"
            target="_blank"
            className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600"
          >
            <Eye className="w-4 h-4" /> Visualizar Formulário RSVP
          </Link>
        </div>
      </div>

      {/* Website Preview Banner */}
      <div className="bg-surface rounded-3xl border border-border shadow-card overflow-hidden">
        {/* Hero Section Preview */}
        <div className="relative h-64 marsala-gradient flex flex-col items-center justify-center text-white text-center p-6">
          <span className="text-xs uppercase tracking-widest text-rose-200 font-semibold">
            Salvem esta Data
          </span>
          <h2 className="font-serif text-4xl font-bold mt-2">
            {coupleProfile.partner1Name} & {coupleProfile.partner2Name}
          </h2>
          <p className="text-xs text-rose-100 mt-2 font-mono">
            14 DE NOVEMBRO DE 2026 • CAMPOS DO JORDÃO - SP
          </p>
        </div>

        {/* Story Section */}
        <div className="p-8 space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <Heart className="w-8 h-8 text-marsala-500 mx-auto animate-pulse" />
            <h3 className="font-serif text-2xl font-bold text-charcoal">Nossa História de Amor</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              "Nos conhecemos na faculdade e, desde o primeiro café compartilhado em uma tarde fria, soubemos que estávamos construindo algo verdadeiramente especial..."
            </p>
          </div>

          {/* Gift List Grid Preview */}
          <div className="pt-6 border-t border-border">
            <h4 className="font-serif text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-marsala-500" />
              Lista Virtual de Presentes & Cotas de Lua de Mel
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {gifts.map((gift) => (
                <div key={gift.id} className="p-4 rounded-2xl border border-border bg-surface-muted/30 space-y-2">
                  <span className="text-xs font-bold text-charcoal block">{gift.title}</span>
                  <span className="font-serif font-bold text-sm text-marsala-500 block">
                    R$ {gift.price.toLocaleString('pt-BR')}
                  </span>
                  {gift.purchased ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full inline-block">
                      Presenteado por {gift.giverName}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                      Disponível
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
