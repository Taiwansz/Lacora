'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Venue } from '@/types';
import { MapPin, Plus, Trash2, X } from 'lucide-react';
import { formatBRL } from '@/lib/utils';

const emptyVenue: Omit<Venue, 'id' | 'workspaceId'> = {
  name: '', type: 'ambos', address: '', city: '', state: '', seatedCapacity: 0, standingCapacity: 0,
  hasParking: false, valetAvailable: false, restroomsCount: 0, hasNursery: false, hasKitchen: false,
  hasDressingRoom: false, generatorPowerKva: 0, airConditioning: false, accessibleRoute: false,
  weatherBackupPlan: '', noiseRestrictions: '', exclusiveVendorsRule: '', overtimeFeePerHour: 0,
  rentalFee: 0, setupStartTime: '', teardownEndTime: '', notes: '',
};

export default function LocaisPage() {
  const { venues, addVenue, deleteVenue } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyVenue);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.city.trim() || !form.state.trim()) return;
    addVenue({ ...form, name: form.name.trim(), city: form.city.trim(), state: form.state.trim().toUpperCase().slice(0, 2) });
    setForm(emptyVenue);
    setIsOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <div>
          <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider block">
            Ficha Técnica dos Espaços
          </span>
          <h1 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Gestão de Locais & Plano de Chuva (Plano B)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Capacidade sentada, gerador, rotas acessíveis e regras de montagem.
          </p>
        </div>
        <button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center gap-2 rounded-xl bg-marsala-500 px-4 py-2.5 text-xs font-bold text-white"><Plus className="h-4 w-4" />Adicionar local</button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <h2 className="font-serif text-xl font-bold text-charcoal">{venue.name}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-marsala-500" /> {venue.address} — {venue.city}/{venue.state}
                </p>
              </div>
              <div className="flex items-center gap-2"><span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">{formatBRL(venue.rentalFee)}</span><button type="button" onClick={() => deleteVenue(venue.id)} aria-label={`Excluir ${venue.name}`} className="rounded-lg p-2 text-[#8A7E70] hover:bg-rose-50 hover:text-marsala-500"><Trash2 className="h-4 w-4" /></button></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Capacidade Sentada</span>
                <span className="font-bold text-charcoal text-sm mt-0.5 block">{venue.seatedCapacity} pessoas</span>
              </div>
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Potência do Gerador</span>
                <span className="font-bold text-charcoal text-sm mt-0.5 block">{venue.generatorPowerKva} kva</span>
              </div>
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Estacionamento / Valet</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block">{venue.hasParking ? (venue.valetAvailable ? 'Estacionamento + valet' : 'Estacionamento') : 'Não informado'}</span>
              </div>
              <div className="p-3 bg-surface-muted rounded-xl">
                <span className="text-slate-500 block">Acessibilidade</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block">{venue.accessibleRoute ? 'Rota acessível' : 'Verificar rota'}</span>
              </div>
            </div>

            <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-200 text-xs space-y-1">
              <span className="font-bold text-marsala-500 block">Plano de Chuva (Plano B Alternativo):</span>
              <p className="text-slate-700">{venue.weatherBackupPlan}</p>
            </div>
          </div>
        ))}
        {venues.length === 0 && <div className="rounded-3xl border border-dashed border-border bg-surface p-12 text-center"><MapPin className="mx-auto h-10 w-10 text-marsala-500" /><h2 className="mt-3 font-serif text-xl font-medium">Nenhum local cadastrado</h2><p className="mt-1 text-xs text-[#756B5E]">Compare capacidade, estrutura e plano de chuva dos espaços visitados.</p></div>}
      </div>

      {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090F24]/60 p-4 backdrop-blur-sm"><form onSubmit={submit} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-surface p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-xl font-medium">Adicionar local</h2><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 hover:bg-surface-muted"><X className="h-4 w-4" /></button></div><div className="space-y-4"><label className="block"><span className="mb-1 block text-xs font-semibold">Nome *</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><div className="grid gap-4 sm:grid-cols-[1fr_1fr_5rem]"><label><span className="mb-1 block text-xs font-semibold">Endereço</span><input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><label><span className="mb-1 block text-xs font-semibold">Cidade *</span><input required value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><label><span className="mb-1 block text-xs font-semibold">UF *</span><input required maxLength={2} value={form.state} onChange={(event) => setForm({ ...form, state: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs uppercase" /></label></div><div className="grid gap-4 sm:grid-cols-4"><label><span className="mb-1 block text-xs font-semibold">Uso</span><select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as Venue['type'] })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs"><option value="ceremonia">Cerimônia</option><option value="recepcao">Recepção</option><option value="ambos">Ambos</option></select></label><label><span className="mb-1 block text-xs font-semibold">Sentados</span><input type="number" min="0" value={form.seatedCapacity} onChange={(event) => setForm({ ...form, seatedCapacity: Number(event.target.value) })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><label><span className="mb-1 block text-xs font-semibold">Em pé</span><input type="number" min="0" value={form.standingCapacity} onChange={(event) => setForm({ ...form, standingCapacity: Number(event.target.value) })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><label><span className="mb-1 block text-xs font-semibold">Locação</span><input type="number" min="0" step="0.01" value={form.rentalFee} onChange={(event) => setForm({ ...form, rentalFee: Number(event.target.value) })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label></div><div className="grid gap-2 sm:grid-cols-3">{([['hasParking','Estacionamento'],['valetAvailable','Valet'],['hasKitchen','Cozinha'],['hasDressingRoom','Camarim'],['airConditioning','Ar-condicionado'],['accessibleRoute','Rota acessível']] as const).map(([key,label]) => <label key={key} className="flex items-center gap-2 rounded-xl bg-surface-muted p-3 text-xs"><input type="checkbox" checked={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.checked })} className="accent-[#7A2738]" />{label}</label>)}</div><label className="block"><span className="mb-1 block text-xs font-semibold">Plano de chuva</span><textarea rows={3} value={form.weatherBackupPlan} onChange={(event) => setForm({ ...form, weatherBackupPlan: event.target.value })} className="w-full resize-none rounded-xl border border-border px-3 py-2.5 text-xs" /></label></div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold">Cancelar</button><button type="submit" className="rounded-xl bg-marsala-500 px-5 py-2.5 text-xs font-bold text-white">Adicionar</button></div></form></div>}
    </div>
  );
}
