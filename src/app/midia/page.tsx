'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { PhotoShot } from '@/types';
import { Camera, Check, Circle, Plus, Trash2, X } from 'lucide-react';

const moments: Array<{ value: PhotoShot['moment']; label: string }> = [
  { value: 'pre_cerimonia', label: 'Pré-cerimônia' },
  { value: 'cerimonia', label: 'Cerimônia' },
  { value: 'protocolo_familia', label: 'Família e protocolo' },
  { value: 'recepcao', label: 'Recepção' },
  { value: 'festa', label: 'Festa' },
];

export default function MidiaPage() {
  const { photoShots, addPhotoShot, togglePhotoShot, deletePhotoShot } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Omit<PhotoShot, 'id' | 'workspaceId'>>({ moment: 'cerimonia', title: '', peopleInvolved: '', priority: 'media', taken: false });
  const captured = photoShots.filter((shot) => shot.taken).length;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    addPhotoShot({ ...form, title: form.title.trim() });
    setForm({ moment: 'cerimonia', title: '', peopleInvolved: '', priority: 'media', taken: false });
    setIsOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><span className="brand-kicker">Memórias que não podem faltar</span><h1 className="workspace-page-heading mt-1 font-serif text-3xl font-medium text-charcoal">Fotos & momentos</h1><p className="mt-2 text-sm text-[#756B5E]">Monte a lista com o fotógrafo e marque cada registro durante o evento.</p></div><button type="button" onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-marsala-500 px-4 py-2.5 text-xs font-bold text-white"><Plus className="h-4 w-4" />Novo momento</button></div>

      <div className="rounded-2xl border border-border bg-surface p-4"><div className="flex items-center justify-between text-xs"><span className="font-semibold text-charcoal">Progresso da lista</span><span className="text-[#756B5E]">{captured} de {photoShots.length}</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted"><div className="h-full rounded-full bg-[#111B3A] transition-all" style={{ width: `${photoShots.length ? Math.round(captured / photoShots.length * 100) : 0}%` }} /></div></div>

      {moments.map((moment) => { const shots = photoShots.filter((shot) => shot.moment === moment.value); if (!shots.length) return null; return <section key={moment.value} className="overflow-hidden rounded-3xl border border-border bg-surface"><div className="flex items-center justify-between border-b border-border bg-surface-muted/60 px-5 py-3"><h2 className="font-serif text-lg font-medium text-charcoal">{moment.label}</h2><span className="text-[10px] font-semibold text-[#756B5E]">{shots.filter((shot) => shot.taken).length}/{shots.length} capturadas</span></div><div className="divide-y divide-border">{shots.map((shot) => <article key={shot.id} className="flex items-center gap-3 p-4 sm:p-5"><button type="button" onClick={() => togglePhotoShot(shot.id)} aria-label={shot.taken ? `Marcar ${shot.title} como pendente` : `Marcar ${shot.title} como capturada`} className={shot.taken ? 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111B3A] text-white' : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-[#A69A8C] hover:border-[#7A2738]'}>{shot.taken ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}</button><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className={shot.taken ? 'text-xs font-semibold text-[#8A7E70] line-through' : 'text-xs font-semibold text-charcoal'}>{shot.title}</h3><span className={shot.priority === 'alta' ? 'rounded-full bg-rose-100 px-2 py-0.5 text-[9px] font-bold text-marsala-500' : 'rounded-full bg-surface-muted px-2 py-0.5 text-[9px] font-bold text-[#756B5E]'}>{shot.priority}</span></div><p className="mt-1 text-[11px] text-[#756B5E]">{shot.peopleInvolved || 'Pessoas a definir'}</p></div><button type="button" onClick={() => deletePhotoShot(shot.id)} aria-label={`Excluir ${shot.title}`} className="rounded-lg p-2 text-[#8A7E70] hover:bg-rose-50 hover:text-marsala-500"><Trash2 className="h-4 w-4" /></button></article>)}</div></section>; })}

      {photoShots.length === 0 && <div className="rounded-3xl border border-dashed border-border bg-surface p-12 text-center"><Camera className="mx-auto h-10 w-10 text-marsala-500" /><h2 className="mt-3 font-serif text-xl font-medium">Sua lista de momentos começa aqui</h2><p className="mt-1 text-xs text-[#756B5E]">Adicione retratos, detalhes e encontros que vocês querem guardar.</p></div>}

      {isOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#090F24]/60 p-4 backdrop-blur-sm"><form onSubmit={submit} className="w-full max-w-lg rounded-3xl border border-border bg-surface p-6 shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-xl font-medium text-charcoal">Adicionar momento</h2><button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 hover:bg-surface-muted"><X className="h-4 w-4" /></button></div><div className="space-y-4"><label className="block"><span className="mb-1 block text-xs font-semibold">Descrição *</span><input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" placeholder="Ex: abraço com os avós após a cerimônia" /></label><label className="block"><span className="mb-1 block text-xs font-semibold">Pessoas envolvidas</span><input value={form.peopleInvolved} onChange={(event) => setForm({ ...form, peopleInvolved: event.target.value })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs" /></label><div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-1 block text-xs font-semibold">Momento</span><select value={form.moment} onChange={(event) => setForm({ ...form, moment: event.target.value as PhotoShot['moment'] })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs">{moments.map((moment) => <option key={moment.value} value={moment.value}>{moment.label}</option>)}</select></label><label><span className="mb-1 block text-xs font-semibold">Prioridade</span><select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value as PhotoShot['priority'] })} className="w-full rounded-xl border border-border px-3 py-2.5 text-xs"><option value="alta">Alta</option><option value="media">Média</option><option value="opcional">Opcional</option></select></label></div></div><div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => setIsOpen(false)} className="rounded-xl border border-border px-4 py-2.5 text-xs font-semibold">Cancelar</button><button type="submit" className="rounded-xl bg-marsala-500 px-5 py-2.5 text-xs font-bold text-white">Adicionar</button></div></form></div>}
    </div>
  );
}
