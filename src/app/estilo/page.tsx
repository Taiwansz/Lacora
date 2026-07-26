'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { generateSimplePDF } from '@/lib/utils';
import { Palette as PaletteIcon, Image as ImageIcon, Download, Plus, ThumbsUp, Sparkles, Eye } from 'lucide-react';

export default function EstiloPage() {
  const { palette, moodboard, updatePaletteColor } = useAppStore();
  const [selectedPreview, setSelectedPreview] = useState<'convite' | 'site' | 'mesa' | 'buque' | 'traje'>('convite');

  const primaryColor = palette.colors.find((c) => c.role === 'principal')?.hex || '#8B263E';
  const secondaryColor = palette.colors.find((c) => c.role === 'secundaria')?.hex || '#C48B9F';
  const accentColor = palette.colors.find((c) => c.role === 'acento')?.hex || '#1E293B';

  const handleExportPDF = () => {
    const headers = ['Cor', 'HEX', 'RGB', 'Função & Aplicação'];
    const rows = palette.colors.map((c) => [c.name, c.hex, c.rgb, c.appliedTo.join(', ')]);
    generateSimplePDF('Guia de Identidade Visual - Nosso Grande Dia', headers, rows);
  };

  return (
    <div className="space-y-8">
      {/* Title Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Estúdio de Identidade Visual
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Paleta de Cores, Moodboard & Guia de Estilo
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Defina as cores HEX/RGB, tipografias, estilos fotográficos e visualize a paleta aplicada aos convites, trajes e mesa posta.
          </p>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
        >
          <Download className="w-4 h-4" /> Exportar Guia Visual em PDF
        </button>
      </div>

      {/* Palette Grid */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card">
        <h2 className="font-serif text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
          <PaletteIcon className="w-5 h-5 text-marsala-500" />
          Paleta de Cores Oficial
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {palette.colors.map((color) => (
            <div key={color.id} className="p-4 rounded-2xl border border-border bg-surface-muted/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-charcoal">{color.name}</span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    color.role === 'principal'
                      ? 'bg-rose-100 text-marsala-500'
                      : color.role === 'proibida'
                      ? 'bg-rose-500 text-white'
                      : 'bg-white text-slate-600'
                  }`}
                >
                  {color.role}
                </span>
              </div>

              {/* Color Box */}
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updatePaletteColor(color.id, e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border-none shadow-subtle shrink-0"
                />
                <div>
                  <span className="text-xs font-mono font-bold text-charcoal block">{color.hex}</span>
                  <span className="text-[10px] text-slate-500 block">RGB: {color.rgb}</span>
                </div>
              </div>

              {/* Applied to */}
              <div className="text-[11px] text-slate-600 border-t border-border/60 pt-2">
                <span className="font-semibold block mb-1">Aplicações:</span>
                <p className="text-[10px] text-slate-500">{color.appliedTo.join(' • ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Visual Palette Previewer */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <Eye className="w-5 h-5 text-marsala-500" />
              Pré-visualização em Tempo Real da Paleta
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Veja como suas cores personalizadas interagem no convite físico, site público e mesa posta.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['convite', 'site', 'mesa', 'buque', 'traje'] as const).map((prev) => (
              <button
                key={prev}
                onClick={() => setSelectedPreview(prev)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  selectedPreview === prev
                    ? 'bg-marsala-500 text-white shadow-card'
                    : 'bg-surface-muted text-slate-600 hover:bg-rose-50'
                }`}
              >
                {prev.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Mock Live Preview Box */}
        <div
          className="p-8 rounded-2xl border border-border text-center space-y-4 shadow-subtle transition-all duration-300"
          style={{ backgroundColor: selectedPreview === 'site' ? '#FAF8F5' : '#FFFFFF' }}
        >
          {selectedPreview === 'convite' && (
            <div className="max-w-md mx-auto p-6 rounded-2xl border-2 border-dashed border-rose-200 bg-amber-50/20 shadow-floating space-y-3">
              <span className="font-serif text-xl font-bold block" style={{ color: primaryColor }}>
                Matheus & Virginia
              </span>
              <p className="text-xs italic" style={{ color: secondaryColor }}>
                Convidam com imensa alegria para celebrar a união de suas vidas
              </p>
              <div className="w-16 h-0.5 mx-auto my-2" style={{ backgroundColor: primaryColor }} />
              <p className="text-xs font-mono font-bold" style={{ color: accentColor }}>
                14 DE NOVEMBRO DE 2026 • CAMPOS DO JORDÃO - SP
              </p>
            </div>
          )}

          {selectedPreview === 'site' && (
            <div className="max-w-lg mx-auto p-6 rounded-2xl border border-border bg-white shadow-card space-y-3">
              <div className="w-full h-32 rounded-xl marsala-gradient flex items-center justify-center text-white font-serif text-2xl font-bold">
                Matheus & Virginia
              </div>
              <p className="text-xs text-slate-600">
                Sejam bem-vindos ao nosso site de casamento! Confirme seu RSVP e veja a lista de presentes.
              </p>
            </div>
          )}

          {selectedPreview === 'mesa' && (
            <div className="max-w-md mx-auto p-6 rounded-2xl bg-surface-muted border border-border space-y-2">
              <span className="font-serif font-bold text-sm text-charcoal block">Mesa Posta & Guardanapos</span>
              <div className="flex justify-center gap-4 py-3">
                <div className="w-10 h-10 rounded-full shadow-card flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: primaryColor }}>
                  Prato
                </div>
                <div className="w-10 h-10 rounded-full shadow-card flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: secondaryColor }}>
                  Vela
                </div>
                <div className="w-10 h-10 rounded-full shadow-card flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: accentColor }}>
                  Sousplat
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Moodboard Reference Images Grid */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-marsala-500" />
            Moodboard & Referências Visuais
          </h2>
          <button className="flex items-center gap-1.5 text-xs font-semibold bg-rose-50 text-marsala-500 px-3 py-1.5 rounded-lg border border-rose-200">
            <Plus className="w-4 h-4" /> Adicionar Foto Referência
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {moodboard.map((item) => (
            <div key={item.id} className="rounded-2xl border border-border overflow-hidden bg-surface-muted/30 shadow-subtle">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-charcoal">{item.title}</h3>
                  <span className="text-[10px] text-slate-500 capitalize">{item.category}</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-marsala-500 font-bold px-2 py-1 bg-rose-50 rounded-lg">
                  <ThumbsUp className="w-3.5 h-3.5" /> {item.votesCount}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
