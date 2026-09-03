import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Gift, Heart, Sparkles } from 'lucide-react';
import { weddingContent } from '@/lib/wedding-content';
import { formatBRL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Lista de presentes',
  description: 'Um jeito carinhoso de participar do começo da nossa vida a dois.',
};

export default function GiftsPage() {
  const destination = weddingContent.registryUrl || '#como-presentear';

  return (
    <div className="min-h-screen bg-[#f4ebdd] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#5d554c] transition hover:text-[#b86645]">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para nossa história
        </Link>

        <header className="grid gap-10 pb-14 pt-14 lg:grid-cols-[1fr_.65fr] lg:items-end lg:pb-20">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#a05235]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Lista de presentes
            </span>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(3.3rem,8vw,6.8rem)] font-medium leading-[.9] tracking-[-.06em] text-[#263c35]">
              Presentes que viram memórias.
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#675d52] lg:justify-self-end">
            Estar com vocês nesse dia já significa tudo. Para quem quiser nos presentear, reunimos algumas ideias que farão parte da nossa casa e da nossa lua de mel.
          </p>
        </header>

        <main className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weddingContent.gifts.map((gift, index) => (
            <article key={gift.id} className="group flex min-h-[21rem] flex-col rounded-[1.75rem] border border-[#dac7ac] bg-[#fbf6ee] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c8875f] hover:shadow-[0_24px_55px_rgba(70,48,33,.1)]">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e8ddd0] text-[#a05235]">
                  {index % 2 === 0 ? <Gift className="h-4 w-4" aria-hidden="true" /> : <Heart className="h-4 w-4" aria-hidden="true" />}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#8b8175]">{gift.category}</span>
              </div>
              <h2 className="mt-10 font-serif text-3xl font-medium leading-tight text-[#2f2925]">{gift.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#6b6156]">{gift.description}</p>
              <div className="mt-7 flex items-end justify-between gap-4 border-t border-[#e3d4c0] pt-5">
                <strong className="font-serif text-2xl font-medium text-[#263c35]">
                  {gift.price === null ? 'Você escolhe' : formatBRL(gift.price)}
                </strong>
                <a href={destination} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#213d36] text-white transition group-hover:bg-[#b86645]" aria-label={`Escolher ${gift.title}`}>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </main>

        <section id="como-presentear" className="my-16 scroll-mt-24 rounded-[2rem] bg-[#183a33] px-6 py-12 text-center text-[#f4ebdd] sm:px-12 sm:py-16">
          <Gift className="mx-auto h-6 w-6 text-[#e5a27a]" aria-hidden="true" />
          <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl font-medium tracking-[-.035em]">A lista oficial será conectada aqui.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#cfc5b5]">
            Os presentes já estão organizados visualmente. Falta apenas adicionar o link da loja ou as instruções de pagamento do casal no arquivo de conteúdo.
          </p>
        </section>
      </div>
    </div>
  );
}

