import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Gift,
  Heart,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { LacoraMark } from '@/components/brand/LacoraLogo';
import { weddingContent } from '@/lib/wedding-content';

export default function WeddingLandingPage() {
  return (
    <div className="wedding-landing overflow-hidden">
      <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-[#d9c7ad] px-5 py-14 sm:px-8 lg:px-12">
        <div className="wedding-hero-glow" />
        <div className="wedding-ribbon wedding-ribbon-a" />
        <div className="wedding-ribbon wedding-ribbon-b" />

        <div className="relative mx-auto grid min-h-[calc(100svh-11.5rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b86645]/25 bg-[#fbf5ec]/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.2em] text-[#8d4932]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {weddingContent.hero.eyebrow}
            </span>

            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.35rem,9vw,7.5rem)] font-medium leading-[.88] tracking-[-.065em] text-[#263c35]">
              {weddingContent.hero.title}
              <em className="mt-2 block font-normal text-[#b86645]">
                {weddingContent.hero.emphasis}
              </em>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-[#675d52] sm:text-lg sm:leading-8">
              {weddingContent.hero.introduction}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/presentes"
                className="brand-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold"
              >
                Ver lista de presentes <Gift className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#nossa-historia"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d9c7ad] bg-[#fbf6ee]/75 px-6 py-3.5 text-sm font-semibold text-[#2f463f] transition hover:border-[#b86645]/60 hover:bg-white"
              >
                Conhecer nossa história <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center lg:justify-self-end">
            <div className="wedding-seal absolute inset-[8%] rounded-full border border-[#c8875f]/30" />
            <div className="wedding-seal absolute inset-[18%] rounded-full border border-[#213d36]/15" />
            <div className="relative flex h-[68%] w-[68%] items-center justify-center rounded-full bg-[#213d36] shadow-[0_35px_90px_rgba(24,58,51,.24)]">
              <div className="absolute inset-0 rounded-full bg-[url('/brand/lacora-ribbon-pattern.svg')] bg-cover bg-center opacity-25" />
              <LacoraMark inverted className="relative h-[58%] w-[58%]" />
            </div>
            <span className="absolute bottom-[7%] right-[4%] max-w-[11rem] rotate-3 rounded-2xl border border-[#d9c7ad] bg-[#fbf6ee] px-4 py-3 text-center font-serif text-sm italic leading-5 text-[#5f554b] shadow-[0_18px_45px_rgba(71,53,39,.12)]">
              “A melhor parte da vida é encontrar com quem dividi-la.”
            </span>
          </div>
        </div>
      </section>

      <section id="nossa-historia" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <span className="brand-kicker">Nossa história</span>
              <h2 className="mt-3 font-serif text-4xl font-medium leading-[1.02] tracking-[-.045em] text-[#2f2925] sm:text-6xl">
                Antes do grande dia, vieram todos os dias que nos trouxeram até aqui.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-[#6b6156] lg:justify-self-end">
              O casamento é um capítulo importante, mas o que mais amamos é tudo o que existe ao redor dele: a rotina, os planos, as pessoas e as pequenas escolhas feitas a dois.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-[#d9c7ad] bg-[#d9c7ad] md:grid-cols-3">
            {weddingContent.story.map((chapter) => (
              <article key={chapter.number} className="bg-[#fbf6ee] p-7 sm:p-9">
                <span className="font-serif text-sm italic text-[#b86645]">{chapter.number}</span>
                <h3 className="mt-14 font-serif text-3xl font-medium text-[#2f2925]">{chapter.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#6b6156]">{chapter.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="grande-dia" className="scroll-mt-24 bg-[#183a33] px-5 py-20 text-[#f4ebdd] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[.22em] text-[#e5a27a]">O grande dia</span>
            <h2 className="mt-4 max-w-xl font-serif text-5xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">
              Guarde um espaço no coração. Os detalhes chegam logo.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#d5c8b6] sm:text-base">
              Estamos cuidando de cada escolha com calma. Assim que tudo estiver pronto, esta página reunirá horário, endereço, traje e as orientações para celebrar conosco.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-white/[.055] p-6">
              <CalendarDays className="h-5 w-5 text-[#e5a27a]" aria-hidden="true" />
              <span className="mt-8 block text-[10px] uppercase tracking-[.17em] text-[#bcb09f]">Quando</span>
              <strong className="mt-2 block font-serif text-2xl font-medium">{weddingContent.event.dateLabel}</strong>
              <span className="mt-1 block text-xs text-[#cfc5b5]">{weddingContent.event.timeLabel}</span>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/[.055] p-6">
              <MapPin className="h-5 w-5 text-[#e5a27a]" aria-hidden="true" />
              <span className="mt-8 block text-[10px] uppercase tracking-[.17em] text-[#bcb09f]">Onde</span>
              <strong className="mt-2 block font-serif text-2xl font-medium">{weddingContent.event.venueLabel}</strong>
              <span className="mt-1 block text-xs text-[#cfc5b5]">{weddingContent.event.cityLabel}</span>
            </article>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-[#e9ddca] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute -left-16 -top-20 h-52 w-52 rounded-full border border-[#b86645]/20" />
          <div className="absolute -bottom-28 -right-12 h-64 w-64 rounded-full border border-[#213d36]/15" />
          <Heart className="relative mx-auto h-6 w-6 text-[#b86645]" aria-hidden="true" />
          <span className="relative mt-5 block text-[10px] font-bold uppercase tracking-[.2em] text-[#8d4932]">Com carinho</span>
          <h2 className="relative mx-auto mt-3 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-[-.04em] text-[#2f2925] sm:text-6xl">
            A presença de vocês é o presente. Mas preparamos uma lista para quem quiser participar dos nossos próximos capítulos.
          </h2>
          <Link href="/presentes" className="brand-button-primary relative mt-9 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold">
            Ir para a lista <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
