import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Gift,
  Heart,
  MapPin,
  Quote,
  UsersRound,
} from 'lucide-react';
import { weddingContent } from '@/lib/wedding-content';

const floralAsset = '/identity/floral-corner.webp';

export default function WeddingLandingPage() {
  return (
    <div className="wedding-landing overflow-hidden">
      <section className="invitation-hero relative isolate overflow-hidden bg-[#111B3A] px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
        <Image
          src={floralAsset}
          alt=""
          width={1100}
          height={1005}
          priority
          sizes="(max-width: 768px) 72vw, 34vw"
          className="floral-linework pointer-events-none absolute -right-16 -top-14 w-[19rem] opacity-[.16] sm:w-[27rem] lg:w-[34rem]"
        />

        <div className="invitation-card relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-7xl items-center justify-center overflow-hidden rounded-[1.4rem] bg-[#F8F1DF] px-6 py-20 text-center shadow-[0_34px_100px_rgba(4,8,23,.34)] sm:rounded-[2.3rem] sm:px-12 lg:px-20">
          <div className="invitation-border pointer-events-none absolute inset-3 rounded-[1rem] sm:inset-5 sm:rounded-[1.8rem]" />
          <Image
            src={floralAsset}
            alt=""
            width={1100}
            height={1005}
            priority
            sizes="(max-width: 768px) 68vw, 34vw"
            className="pointer-events-none absolute -right-16 -top-10 w-[18rem] sm:-right-20 sm:-top-14 sm:w-[27rem] lg:w-[32rem]"
          />
          <Image
            src={floralAsset}
            alt=""
            width={1100}
            height={1005}
            sizes="(max-width: 768px) 58vw, 28vw"
            className="pointer-events-none absolute -bottom-16 -left-16 w-[16rem] rotate-180 opacity-85 sm:-bottom-24 sm:-left-20 sm:w-[25rem] lg:w-[29rem]"
          />

          <div className="relative z-10 mx-auto max-w-4xl py-10">
            <span className="invitation-kicker">{weddingContent.hero.eyebrow}</span>
            <span className="mx-auto mt-5 block h-px w-12 bg-[#7A2738]" />
            <h1 className="mt-7 font-serif text-[clamp(3.1rem,8vw,7rem)] font-normal leading-[.91] tracking-[-.055em] text-[#111B3A]">
              {weddingContent.hero.title}
              <em className="mt-3 block font-normal text-[#7A2738]">
                {weddingContent.hero.emphasis}
              </em>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#575B6C] sm:text-base sm:leading-8">
              {weddingContent.hero.introduction}
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/presentes" className="brand-button-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-[.08em]">
                Lista de presentes <Gift className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#nossa-historia" className="brand-button-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-[.08em]">
                Nossa história <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="nossa-historia" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="brand-kicker">Nossa história</span>
            <h2 className="mt-5 font-serif text-4xl font-normal leading-[1.02] tracking-[-.04em] text-[#111B3A] sm:text-6xl">
              Antes do grande dia, vieram todos os dias que nos trouxeram até aqui.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#626474] sm:text-base">
              O casamento é um capítulo importante, mas o que mais amamos é tudo o que existe ao redor dele: a rotina, os planos e as pequenas escolhas feitas a dois.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {weddingContent.story.map((chapter) => (
              <article key={chapter.number} className="stationery-card relative overflow-hidden p-7 sm:p-9">
                <span className="font-serif text-sm italic text-[#7A2738]">{chapter.number}</span>
                <span className="mt-6 block h-px w-9 bg-[#A95768]" />
                <h3 className="mt-8 font-serif text-3xl font-normal text-[#111B3A]">{chapter.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#626474]">{chapter.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="padrinhos" className="relative isolate scroll-mt-24 overflow-hidden bg-[#111B3A] px-5 py-20 text-[#F8F1DF] sm:px-8 lg:px-12 lg:py-28">
        <Image src={floralAsset} alt="" width={1100} height={1005} sizes="38vw" className="floral-linework pointer-events-none absolute -right-28 -top-24 w-[34rem] opacity-[.13]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <UsersRound className="h-6 w-6 text-[#C77A8B]" aria-hidden="true" />
            <span className="mt-6 block text-[10px] font-bold uppercase tracking-[.24em] text-[#D7A1AD]">Pessoas escolhidas pelo coração</span>
            <h2 className="mt-4 max-w-xl font-serif text-5xl font-normal leading-[.98] tracking-[-.04em] sm:text-6xl">
              Aos que caminham tão perto de nós.
            </h2>
          </div>
          <div className="border-l border-white/15 pl-7 sm:pl-10">
            <Quote className="h-7 w-7 text-[#C77A8B]" aria-hidden="true" />
            <p className="mt-6 max-w-2xl font-serif text-2xl font-normal leading-relaxed text-[#F8F1DF] sm:text-3xl">
              Nosso sim também carrega um pouco de cada conselho, abraço e memória que compartilhamos com vocês.
            </p>
            <p className="mt-6 text-sm leading-7 text-[#C9C4BD]">
              Em breve, este espaço receberá uma homenagem especial aos nossos padrinhos e madrinhas.
            </p>
          </div>
        </div>
      </section>

      <section id="grande-dia" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
          <div>
            <span className="brand-kicker">O grande dia</span>
            <h2 className="mt-5 max-w-2xl font-serif text-5xl font-normal leading-[.98] tracking-[-.045em] text-[#111B3A] sm:text-6xl">
              Guarde um espaço no coração. Os detalhes chegam logo.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#626474] sm:text-base">
              Estamos cuidando de cada escolha com calma. Assim que tudo estiver pronto, esta página reunirá horário, endereço, traje e as orientações para celebrar conosco.
            </p>
          </div>

          <div className="invitation-panel relative overflow-hidden rounded-[2rem] bg-[#7A2738] p-7 text-[#F8F1DF] shadow-[0_26px_70px_rgba(60,15,29,.18)] sm:p-10">
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="border border-white/15 bg-white/[.055] p-6">
                <CalendarDays className="h-5 w-5 text-[#E3B7C0]" aria-hidden="true" />
                <span className="mt-8 block text-[9px] uppercase tracking-[.2em] text-[#E3B7C0]">Quando</span>
                <strong className="mt-2 block font-serif text-2xl font-normal">{weddingContent.event.dateLabel}</strong>
                <span className="mt-1 block text-xs text-[#E8DADD]">{weddingContent.event.timeLabel}</span>
              </article>
              <article className="border border-white/15 bg-white/[.055] p-6">
                <MapPin className="h-5 w-5 text-[#E3B7C0]" aria-hidden="true" />
                <span className="mt-8 block text-[9px] uppercase tracking-[.2em] text-[#E3B7C0]">Onde</span>
                <strong className="mt-2 block font-serif text-2xl font-normal">{weddingContent.event.venueLabel}</strong>
                <span className="mt-1 block text-xs text-[#E8DADD]">{weddingContent.event.cityLabel}</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="confirmar-presenca" className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="stationery-card relative mx-auto max-w-7xl overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
          <Image src={floralAsset} alt="" width={1100} height={1005} sizes="28vw" className="pointer-events-none absolute -right-16 -top-16 w-[18rem] opacity-90 sm:w-[24rem]" />
          <div className="relative mx-auto max-w-3xl">
            <Heart className="mx-auto h-6 w-6 text-[#7A2738]" aria-hidden="true" />
            <span className="mt-5 block text-[10px] font-bold uppercase tracking-[.22em] text-[#7A2738]">Com carinho</span>
            <h2 className="mt-4 font-serif text-4xl font-normal leading-tight tracking-[-.04em] text-[#111B3A] sm:text-6xl">
              Sua presença é parte da nossa história.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#626474]">
              A confirmação será feita pelo link pessoal enviado junto ao convite. Para quem quiser nos presentear, preparamos uma lista com os próximos capítulos da nossa vida a dois.
            </p>
            <Link href="/presentes" className="brand-button-primary mt-8 inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-[.08em]">
              Ver lista de presentes <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
