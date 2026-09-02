'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { formatDateLong } from '@/lib/utils';
import { Check, Copy, Eye, Globe2, Heart, Link2, MapPin, Settings2 } from 'lucide-react';

function normalizeSlug(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
}

export default function SitePage() {
  const { coupleProfile, websiteSettings, updateWebsiteSettings } = useAppStore();
  const [copied, setCopied] = useState(false);

  const partner1 = coupleProfile.partner1Name || 'Parceiro 1';
  const partner2 = coupleProfile.partner2Name || 'Parceiro 2';
  const fallbackSlug = normalizeSlug(`${partner1}-${partner2}`);
  const slug = websiteSettings.customSlug || coupleProfile.customSlug || fallbackSlug;
  const dateText = coupleProfile.weddingDate ? formatDateLong(coupleProfile.weddingDate).toUpperCase() : 'DATA A DEFINIR';
  const cityText = coupleProfile.city ? `${coupleProfile.city}${coupleProfile.state ? `, ${coupleProfile.state}` : ''}` : 'LOCAL A DEFINIR';

  const publicPath = useMemo(() => `/w/${slug}`, [slug]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}${publicPath}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="brand-kicker">Presença digital do casal</span>
          <h1 className="workspace-page-heading mt-1 font-serif text-3xl font-medium text-charcoal">Site, informações e RSVP</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#756B5E]">Edite a experiência dos convidados e acompanhe o endereço que será compartilhado.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={websiteSettings.isPublished ? 'rounded-full bg-emerald-100 px-3 py-2 text-[10px] font-bold text-emerald-800' : 'rounded-full bg-amber-100 px-3 py-2 text-[10px] font-bold text-amber-800'}>
            {websiteSettings.isPublished ? 'PUBLICADO' : 'RASCUNHO'}
          </span>
          <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-charcoal transition hover:bg-surface-muted">
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}{copied ? 'Link copiado' : 'Copiar link'}
          </button>
          <Link href={publicPath} target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-marsala-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-marsala-600"><Eye className="h-4 w-4" />Abrir site</Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[.78fr_1.22fr]">
        <section className="space-y-5 rounded-3xl border border-border bg-surface p-5 shadow-subtle sm:p-6" aria-labelledby="editor-title">
          <div className="flex items-center gap-3 border-b border-border pb-4"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-marsala-500"><Settings2 className="h-4 w-4" /></span><div><h2 id="editor-title" className="font-serif text-lg font-medium text-charcoal">Conteúdo do site</h2><p className="text-[11px] text-[#756B5E]">As alterações são salvas no seu workspace.</p></div></div>

          <label className="block"><span className="mb-1.5 block text-xs font-semibold text-charcoal">Título de abertura</span><input value={websiteSettings.title} onChange={(event) => updateWebsiteSettings({ title: event.target.value })} maxLength={80} className="w-full rounded-xl border border-border bg-white/60 px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-marsala-500" placeholder={`${partner1} & ${partner2}`} /></label>

          <label className="block"><span className="mb-1.5 block text-xs font-semibold text-charcoal">Nossa história</span><textarea value={websiteSettings.storyText} onChange={(event) => updateWebsiteSettings({ storyText: event.target.value })} rows={5} maxLength={900} className="w-full resize-none rounded-xl border border-border bg-white/60 px-3.5 py-2.5 text-sm leading-6 outline-none focus:ring-2 focus:ring-marsala-500" placeholder="Conte aos convidados como essa história começou..." /><span className="mt-1 block text-right text-[10px] text-[#8A7E70]">{websiteSettings.storyText.length}/900</span></label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-charcoal">Dress code</span><textarea value={websiteSettings.dressCodeNotes} onChange={(event) => updateWebsiteSettings({ dressCodeNotes: event.target.value })} rows={4} className="w-full resize-none rounded-xl border border-border bg-white/60 px-3.5 py-2.5 text-xs leading-5 outline-none focus:ring-2 focus:ring-marsala-500" placeholder="Traje, cores ou observações..." /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-charcoal">Hospedagem e deslocamento</span><textarea value={websiteSettings.lodgingNotes} onChange={(event) => updateWebsiteSettings({ lodgingNotes: event.target.value })} rows={4} className="w-full resize-none rounded-xl border border-border bg-white/60 px-3.5 py-2.5 text-xs leading-5 outline-none focus:ring-2 focus:ring-marsala-500" placeholder="Hotéis, transporte e horários..." /></label>
          </div>

          <label className="block"><span className="mb-1.5 block text-xs font-semibold text-charcoal">Endereço personalizado</span><div className="flex overflow-hidden rounded-xl border border-border bg-white/60 focus-within:ring-2 focus-within:ring-marsala-500"><span className="flex items-center border-r border-border bg-surface-muted px-3 text-[11px] text-[#756B5E]">/w/</span><input value={websiteSettings.customSlug || fallbackSlug} onChange={(event) => updateWebsiteSettings({ customSlug: normalizeSlug(event.target.value) })} className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-xs outline-none" /></div></label>

          <button type="button" onClick={() => updateWebsiteSettings({ isPublished: !websiteSettings.isPublished })} className={websiteSettings.isPublished ? 'flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-muted px-4 py-3 text-xs font-bold text-charcoal' : 'flex w-full items-center justify-center gap-2 rounded-xl bg-[#213D36] px-4 py-3 text-xs font-bold text-white'}><Globe2 className="h-4 w-4" />{websiteSettings.isPublished ? 'Voltar para rascunho' : 'Publicar site do casal'}</button>
        </section>

        <section className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card" aria-label="Prévia do site do casal">
          <div className="flex items-center justify-between border-b border-border bg-[#183A33] px-4 py-3 text-[#F4EBDD]"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#B86645]" /><span className="text-[10px] font-semibold uppercase tracking-[.14em]">Prévia ao vivo</span></div><span className="flex items-center gap-1.5 text-[10px] text-[#CFC5B5]"><Link2 className="h-3 w-3" />{publicPath}</span></div>
          <div className="relative flex min-h-[24rem] flex-col items-center justify-center overflow-hidden bg-[#213D36] px-6 py-14 text-center text-[#F4EBDD]"><div className="absolute inset-0 bg-[url('/brand/lacora-ribbon-pattern.svg')] bg-cover bg-center opacity-60" /><div className="relative"><span className="text-[10px] font-bold uppercase tracking-[.28em] text-[#E5A27A]">Celebre conosco</span><h2 className="mt-4 font-serif text-5xl font-medium sm:text-6xl">{websiteSettings.title || `${partner1} & ${partner2}`}</h2><div className="mx-auto my-6 h-px w-14 bg-[#C8875F]" /><p className="text-xs tracking-[.12em] text-[#DED3C2]">{dateText}</p><p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#CFC5B5]"><MapPin className="h-3.5 w-3.5" />{cityText}</p></div></div>
          <div className="space-y-8 p-6 sm:p-9"><div className="mx-auto max-w-2xl text-center"><Heart className="mx-auto h-6 w-6 text-marsala-500" /><h3 className="mt-3 font-serif text-2xl font-medium text-charcoal">Nossa história</h3><p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#655B50]">{websiteSettings.storyText || 'Conte aqui a história que vocês querem dividir com os convidados.'}</p></div><div className="grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-surface-muted p-4"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-marsala-500">Dress code</span><p className="mt-2 text-xs leading-5 text-[#655B50]">{websiteSettings.dressCodeNotes || 'Adicione orientações de traje e cores.'}</p></div><div className="rounded-2xl bg-surface-muted p-4"><span className="text-[10px] font-bold uppercase tracking-[.14em] text-marsala-500">Como chegar</span><p className="mt-2 text-xs leading-5 text-[#655B50]">{websiteSettings.lodgingNotes || 'Adicione hospedagem, transporte e outras orientações.'}</p></div></div></div>
        </section>
      </div>
    </div>
  );
}
