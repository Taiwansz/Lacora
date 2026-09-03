import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Flower2, Gift } from 'lucide-react';
import { weddingContent } from '@/lib/wedding-content';
import { formatBRL } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Lista de presentes',
  description: 'Um jeito carinhoso de participar do começo da nossa vida a dois.',
};

export default function GiftsPage() {
  const destination = weddingContent.registryUrl || '#como-presentear';

  return (
    <div className="min-h-screen bg-[#F6F0DF]">
      <header className="relative isolate overflow-hidden bg-[#111B3A] px-5 pb-20 pt-10 text-[#F8F1DF] sm:px-8 lg:px-12 lg:pb-28">
        <Image
          src="/identity/floral-corner.webp"
          alt=""
          width={1100}
          height={1005}
          priority
          sizes="(max-width: 768px) 70vw, 38vw"
          className="floral-linework pointer-events-none absolute -right-20 -top-20 w-[24rem] opacity-[.17] sm:w-[36rem]"
        />
        <div className="relative mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-[#D7D2CB] transition hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Voltar para nossa história
          </Link>
          <div className="mt-16 max-w-4xl">
            <span className="text-[10px] font-bold uppercase tracking-[.24em] text-[#D7A1AD]">Lista de presentes</span>
            <h1 className="mt-5 font-serif text-[clamp(3.5rem,9vw,7rem)] font-normal leading-[.88] tracking-[-.055em]">
              Presentes que viram <em className="font-normal text-[#D7A1AD]">memórias.</em>
            </h1>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#D0CBC4] sm:text-base">
              Estar com vocês nesse dia já significa tudo. Para quem quiser nos presentear, reunimos algumas ideias que farão parte da nossa casa e da nossa lua de mel.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {weddingContent.gifts.map((gift, index) => (
            <article key={gift.id} className="gift-card group flex min-h-[22rem] flex-col overflow-hidden bg-[#FFFAF0] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(17,27,58,.11)] sm:p-7">
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1E2E2] text-[#7A2738]">
                  {index % 2 === 0 ? <Gift className="h-4 w-4" aria-hidden="true" /> : <Flower2 className="h-4 w-4" aria-hidden="true" />}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#7A2738]">{gift.category}</span>
              </div>
              <span className="mt-8 block h-px w-10 bg-[#CBA0A9]" />
              <h2 className="mt-7 font-serif text-3xl font-normal leading-tight text-[#111B3A]">{gift.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#656777]">{gift.description}</p>
              <div className="mt-7 flex items-end justify-between gap-4 border-t border-[#DED2C0] pt-5">
                <strong className="font-serif text-2xl font-normal text-[#111B3A]">
                  {gift.price === null ? 'Você escolhe' : formatBRL(gift.price)}
                </strong>
                <a href={destination} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111B3A] text-white transition group-hover:bg-[#7A2738]" aria-label={`Escolher ${gift.title}`}>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <section id="como-presentear" className="relative my-16 overflow-hidden rounded-[2rem] bg-[#7A2738] px-6 py-14 text-center text-[#F8F1DF] sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-3 rounded-[1.4rem] border border-white/15" />
          <Gift className="relative mx-auto h-6 w-6 text-[#E3B7C0]" aria-hidden="true" />
          <h2 className="relative mx-auto mt-5 max-w-2xl font-serif text-4xl font-normal tracking-[-.035em]">A lista oficial será conectada aqui.</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-sm leading-6 text-[#E8DADD]">
            Os presentes já estão organizados visualmente. Falta apenas adicionar o link da loja ou as instruções de pagamento do casal.
          </p>
        </section>
      </main>
    </div>
  );
}
