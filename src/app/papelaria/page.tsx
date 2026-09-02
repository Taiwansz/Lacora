'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { StationeryItem } from '@/types';
import { CalendarDays, PackageCheck, Plus, Send, Trash2, X } from 'lucide-react';

const categories: Array<{ value: StationeryItem['category']; label: string }> = [
  { value: 'save_the_date', label: 'Save the date' },
  { value: 'convite', label: 'Convite' },
  { value: 'padrinhos', label: 'Padrinhos' },
  { value: 'sinalizacao', label: 'Sinalização' },
  { value: 'menu', label: 'Menu' },
  { value: 'lembranca', label: 'Lembrança' },
  { value: 'outro', label: 'Outro' },
];

const statuses: Array<{ value: StationeryItem['status']; label: string }> = [
  { value: 'ideia', label: 'Ideia' },
  { value: 'criacao', label: 'Criação' },
  { value: 'aprovacao', label: 'Aprovação' },
  { value: 'producao', label: 'Produção' },
  { value: 'entregue', label: 'Entregue' },
];

const statusStyle: Record<StationeryItem['status'], string> = {
  ideia: 'bg-surface-muted text-[#655B50]',
  criacao: 'bg-blue-100 text-blue-800',
  aprovacao: 'bg-amber-100 text-amber-800',
  producao: 'bg-[#F1D5B9] text-[#7A3A24]',
  entregue: 'bg-emerald-100 text-emerald-800',
};

export default function PapelariaPage() {
  const { stationeryItems, addStationeryItem, updateStationeryItemStatus, deleteStationeryItem } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Omit<StationeryItem, 'id' | 'workspaceId'>>({ title: '', category: 'convite', status: 'ideia', quantity: 1, dueDate: '', vendorName: '', notes: '' });

  const delivered = stationeryItems.filter((item) => item.status === 'entregue').length;
  const inProduction = stationeryItems.filter((item) => item.status === 'producao').length;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    addStationeryItem({ ...form, title: form.title.trim(), quantity: Math.max(1, form.quantity) });
    setForm({ title: '', category: 'convite', status: 'ideia', quantity: 1, dueDate: '', vendorName: '', notes: '' });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><span className="brand-kicker">Detalhes impressos e digitais</span><h1 className="workspace-page-heading mt-1 font-serif text-3xl font-medium text-charcoal">Papelaria & convites</h1><p className="mt-2 text-sm text-[#756B5E]">Acompanhe criação, aprovação, produção e entrega de cada peça.</p></div>
        <button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-marsala-500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-marsala-600"><Plus className="h-4 w-4" />Nova peça</button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-4"><span className="text-[11px] text-[#756B5E]">Total de peças</span><strong className="mt-1 block font-serif text-2xl font-medium text-charcoal">{stationeryItems.length}</strong></div>
        <div className="rounded-2xl border border-border bg-surface p-4"><span className="text-[11px] text-[#756B5E]">Em produção</span><strong className="mt-1 block font-serif text-2xl font-medium text-marsala-500">{inProduction}</strong></div>
        <div className="rounded-2xl border border-border bg-surface p-4"><span className="text-[11px] text-[#756B5E]">Entregues</span><strong className="mt-1 block font-serif text-2xl font-medium text-sage-500">{delivered}</strong></div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-subtle">
        {stationeryItems.length === 0 ? <div className="p-12 text-center"><Send className="mx-auto h-9 w-9 text-marsala-500" /><h2 className="mt-3 font-serif text-xl font-medium text-charcoal">Nenhuma peça cadastrada</h2><p className="mt-1 text-xs text-[#756B5E]">Comece pelo save the date ou convite principal.</p></div> : <div className="divide-y divide-border">{stationeryItems.map((item) => <article key={item.id} className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-bold uppercase tracking-[.12em] text-marsala-500">{categories.find((category) => category.value === item.category)?.label}</span><span className={`rounded-full px-2.5 py-1 text-[9px] font-bold ${statusStyle[item.status]}`}>{statuses.find((status) => status.value === item.status)?.label}</span></div><h2 className="mt-2 font-serif text-lg font-medium text-charcoal">{item.title}</h2><div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-[#756B5E]"><span>{item.quantity} unidade{item.quantity === 1 ? '' : 's'}</span>{item.dueDate && <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{new Date(`${item.dueDate}T12:00:00`).toLocaleDateString('pt-BR')}</span>}{item.vendorName && <span>{item.vendorName}</span>}</div>{item.notes && <p className="mt-2 text-xs text-[#655B50]">{item.notes}</p>}</div><div className="flex items-center gap-2"><select aria-label={`Status de ${item.title}`} value={item.status} onChange={(event) => updateStationeryItemStatus(item.id, event.target.value as StationeryItem['status'])} className="rounded-xl border border-border bg-surface-muted px-3 py-2 text-[11px] font-semibold text-charcoal outline-none focus:ring-2 focus:ring-marsala-500">{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select><button type="button" onClick={() => deleteStationeryItem(item.id)} aria-label={`Excluir ${item.title}`} className="rounded-xl p-2 text-[#8A7E70] transition hover:bg-rose-50 hover:text-marsala-500"><Trash2 className="h-4 w-4" /></button></div></article>)}</div>}
      </div>

      {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102D28]/60 p-4 backdrop-blur-sm"><form onSubmit={submit} className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-marsala-500"><PackageCheck className="h-4 w-4" /></span><h2 className="font-serif text-xl font-medium text-charcoal">Nova peça de papelaria</h2></div><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-[#756B5E] hover:bg-surface-muted"><X className="h-4 w-4" /></button></div><div className="space-y-4"><label className="block"><span className="mb-1 block text-xs font-semibold">Nome da peça *</span><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs outline-none focus:ring-2 focus:ring-marsala-500" placeholder="Ex: convite principal" /></label><div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-1 block text-xs font-semibold">Categoria</span><select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as StationeryItem['category'] })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs">{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></label><label><span className="mb-1 block text-xs font-semibold">Status</span><select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as StationeryItem['status'] })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs">{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label><label><span className="mb-1 block text-xs font-semibold">Quantidade</span><input type="number" min="1" value={form.quantity} onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><label><span className="mb-1 block text-xs font-semibold">Prazo</span><input type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label></div><label className="block"><span className="mb-1 block text-xs font-semibold">Fornecedor</span><input value={form.vendorName} onChange={(event) => setForm({ ...form, vendorName: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><label className="block"><span className="mb-1 block text-xs font-semibold">Observações</span><textarea rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="w-full resize-none rounded-xl border border-border px-3 py-2.5 text-xs" /></label></div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold">Cancelar</button><button type="submit" className="rounded-xl bg-marsala-500 px-5 py-2.5 text-xs font-bold text-white">Adicionar peça</button></div></form></div>}
    </div>
  );
}
