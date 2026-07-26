'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { formatBRL } from '@/lib/utils';
import { Shirt, Calendar, Plus, Scissors, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';

export default function VestuarioPage() {
  const { outfits, addOutfit, updateOutfitStatus } = useAppStore();
  const [showModal, setShowModal] = useState(false);
  const [newOutfit, setNewOutfit] = useState({
    participantName: '',
    role: 'madrinha' as any,
    color: '',
    itemDescription: '',
    rentalOrBuy: 'aluguel' as any,
    totalCost: 0,
    paidBy: 'Participante',
    status: 'pesquisando' as any,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addOutfit(newOutfit);
    setShowModal(false);
    setNewOutfit({
      participantName: '',
      role: 'madrinha',
      color: '',
      itemDescription: '',
      rentalOrBuy: 'aluguel',
      totalCost: 0,
      paidBy: 'Participante',
      status: 'pesquisando',
    });
  };

  return (
    <div className="space-y-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Módulo de Trajes, Vestidos & Beleza
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Harmonia de Looks do Casal & Cortejo
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Gerencie trajes da noiva, noivo, madrinhas, padrinhos, pais e pajens com medidas, fornecedores e agenda de provas.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-marsala-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
        >
          <Plus className="w-4 h-4" /> Cadastrar Novo Traje / Look
        </button>
      </div>

      {/* Looks Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {outfits.map((outfit) => (
          <div key={outfit.id} className="bg-surface p-6 rounded-3xl border border-border shadow-card flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-marsala-500 font-bold">
                    <Shirt className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-charcoal">{outfit.participantName}</h3>
                    <span className="text-[11px] text-slate-500 capitalize">Papel: {outfit.role}</span>
                  </div>
                </div>
                <select
                  value={outfit.status}
                  onChange={(e) => updateOutfitStatus(outfit.id, e.target.value as any)}
                  className="text-xs font-bold px-3 py-1 rounded-full border border-border bg-surface-muted text-charcoal cursor-pointer"
                >
                  <option value="pesquisando">Pesquisando</option>
                  <option value="escolhido">Escolhido</option>
                  <option value="em_ajuste">Em Ajuste / Prova</option>
                  <option value="pronto">Pronto</option>
                  <option value="entregue">Entregue</option>
                </select>
              </div>

              {/* Look Info */}
              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <p><span className="font-semibold text-charcoal">Descrição:</span> {outfit.itemDescription}</p>
                <p><span className="font-semibold text-charcoal">Cor Definida:</span> <span className="font-bold text-marsala-500">{outfit.color}</span></p>
                <p><span className="font-semibold text-charcoal">Modalidade:</span> <span className="capitalize">{outfit.rentalOrBuy}</span></p>
                {outfit.sizesAndMeasurements && (
                  <p className="bg-surface-muted p-2 rounded-xl text-[11px] text-slate-500">
                    <span className="font-semibold text-charcoal block">Medidas / Observações:</span> {outfit.sizesAndMeasurements}
                  </p>
                )}
                {outfit.accessoriesNotes && (
                  <p className="text-[11px] text-slate-500">
                    <span className="font-semibold text-charcoal">Acessórios:</span> {outfit.accessoriesNotes}
                  </p>
                )}
              </div>
            </div>

            {/* Footer Cost & Payer */}
            <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
              <span className="text-slate-500">Pago por: <strong className="text-charcoal">{outfit.paidBy}</strong></span>
              <span className="font-serif font-bold text-base text-marsala-500">{formatBRL(outfit.totalCost)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Appointment Schedule for Fittings & Makeup */}
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card">
        <h2 className="font-serif text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-marsala-500" />
          Agenda de Provas, Ajustes & Testes de Cabelo/Make
        </h2>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl border border-border bg-surface-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-50 text-purple-600 font-bold">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal">Segunda Prova do Vestido da Noiva com Véu</h4>
                <p className="text-[11px] text-slate-500">Ateliê Zibelina Silk • 18/08/2026 às 14:00h</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Agendado
            </span>
          </div>

          <div className="p-4 rounded-2xl border border-border bg-surface-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-charcoal">Teste de Maquiagem & Penteado com Grinalda</h4>
                <p className="text-[11px] text-slate-500">Studio Bella Noivas • 25/08/2026 às 10:00h</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
              Agendado
            </span>
          </div>
        </div>
      </div>

      {/* Modal Add Outfit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-surface p-6 rounded-3xl border border-border max-w-md w-full shadow-floating space-y-4">
            <h3 className="font-serif text-lg font-bold text-charcoal">Cadastrar Traje do Cortejo</h3>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Nome / Participante</label>
              <input
                type="text"
                required
                value={newOutfit.participantName}
                onChange={(e) => setNewOutfit({ ...newOutfit, participantName: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="Ex: Madrinhas / Pai da Noiva"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Papel</label>
                <select
                  value={newOutfit.role}
                  onChange={(e) => setNewOutfit({ ...newOutfit, role: e.target.value as any })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                >
                  <option value="noiva">Noiva</option>
                  <option value="noivo">Noivo</option>
                  <option value="madrinha">Madrinha</option>
                  <option value="padrinho">Padrinho</option>
                  <option value="pai">Pai</option>
                  <option value="mae">Mãe</option>
                  <option value="dama">Dama / Pajem</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal mb-1">Cor</label>
                <input
                  type="text"
                  required
                  value={newOutfit.color}
                  onChange={(e) => setNewOutfit({ ...newOutfit, color: e.target.value })}
                  className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                  placeholder="Ex: Rosa Antigo"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">Descrição do Item</label>
              <input
                type="text"
                required
                value={newOutfit.itemDescription}
                onChange={(e) => setNewOutfit({ ...newOutfit, itemDescription: e.target.value })}
                className="w-full text-xs p-2.5 border border-border rounded-xl outline-none"
                placeholder="Ex: Vestido longo fluído"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 rounded-xl border border-border"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-marsala-500 rounded-xl shadow-card"
              >
                Salvar Traje
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
