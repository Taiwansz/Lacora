'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { LacoraLogo, LacoraMark } from '@/components/brand/LacoraLogo';
import { LacoraGlyph, LacoraGlyphName } from '@/components/brand/LacoraGlyph';
import { SUBSCRIPTION_PLANS } from '@/lib/plans';
import { formatBRL } from '@/lib/utils';

type TourId = 'overview' | 'guests' | 'budget' | 'timeline';

const productTour: Array<{
  id: TourId;
  label: string;
  glyph: LacoraGlyphName;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    id: 'overview',
    label: 'Visão geral',
    glyph: 'planning',
    eyebrow: 'Panorama do evento',
    title: 'O que precisa da sua atenção, sem procurar em dez lugares.',
    description: 'Prazos, orçamento, confirmações e decisões recentes aparecem no mesmo contexto.',
  },
  {
    id: 'guests',
    label: 'Convidados',
    glyph: 'guests',
    eyebrow: 'Convidados e RSVP',
    title: 'Da primeira lista à confirmação de cada família.',
    description: 'Organize grupos, acompanhantes, restrições e respostas sem perder o histórico.',
  },
  {
    id: 'budget',
    label: 'Orçamento',
    glyph: 'budget',
    eyebrow: 'Financeiro sem surpresas',
    title: 'Planejado, contratado e pago contam histórias diferentes.',
    description: 'A Laçora separa cada visão para mostrar quanto já foi comprometido e o que vem pela frente.',
  },
  {
    id: 'timeline',
    label: 'Dia H',
    glyph: 'timeline',
    eyebrow: 'Operação do grande dia',
    title: 'Um roteiro claro para o casal, a assessoria e os fornecedores.',
    description: 'Horários, responsáveis, locais e planos alternativos ficam conectados em uma linha do tempo.',
  },
];

const featureCards: Array<{
  glyph: LacoraGlyphName;
  kicker: string;
  title: string;
  text: string;
}> = [
  { glyph: 'planning', kicker: '01', title: 'Planejamento', text: 'Checklist orientado por fase, prioridade e prazo.' },
  { glyph: 'guests', kicker: '02', title: 'Convidados', text: 'Famílias, acompanhantes, RSVP e necessidades especiais.' },
  { glyph: 'budget', kicker: '03', title: 'Financeiro', text: 'Custos, contratos, parcelas e impacto por convidado.' },
  { glyph: 'vendors', kicker: '04', title: 'Fornecedores', text: 'Contatos, propostas, entregas e decisões em um histórico.' },
  { glyph: 'timeline', kicker: '05', title: 'Dia H', text: 'Cronograma operacional, responsáveis e contingências.' },
  { glyph: 'website', kicker: '06', title: 'Site e RSVP', text: 'Uma experiência pública conectada ao planejamento interno.' },
];

const faqItems = [
  {
    question: 'Posso conhecer a plataforma antes de criar uma conta?',
    answer: 'Sim. O modo de demonstração abre um casamento fictício completo em ambiente somente leitura, para você explorar os módulos sem alterar dados.',
  },
  {
    question: 'Meu parceiro ou minha assessoria podem participar?',
    answer: 'Sim. O workspace aceita colaboradores com funções diferentes, para que cada pessoa veja e cuide apenas do que faz sentido para ela.',
  },
  {
    question: 'O site do casal conversa com a lista de convidados?',
    answer: 'Sim. O site público, os links de RSVP e a lista administrativa fazem parte da mesma experiência, reduzindo retrabalho nas confirmações.',
  },
  {
    question: 'Como a Laçora organiza os dados de cada casamento?',
    answer: 'Cada evento vive em um workspace próprio. A aplicação usa sessões autenticadas, regras de acesso e políticas de isolamento no banco para separar os dados.',
  },
];

function OverviewPreview() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {[
        ['Orçamento comprometido', formatBRL(92100), '68% do planejado'],
        ['RSVP confirmado', '86 pessoas', '12 respostas esta semana'],
        ['Checklist', '74% concluído', '4 itens pedem atenção'],
      ].map(([label, value, note], index) => (
        <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
          <span className="text-[11px] text-[#CFC5B5]">{label}</span>
          <strong className="mt-2 block font-serif text-xl font-medium text-white">{value}</strong>
          <span className={index === 2 ? 'mt-1 block text-[10px] text-[#E6A37C]' : 'mt-1 block text-[10px] text-[#AFC7BA]'}>{note}</span>
        </div>
      ))}
    </div>
  );
}

function GuestsPreview() {
  return (
    <div className="space-y-2">
      {[
        ['Família Andrade', '3 pessoas', 'Confirmado'],
        ['Marina e acompanhante', '2 pessoas', 'Aguardando'],
        ['Rafael Nunes', '1 pessoa · vegetariano', 'Confirmado'],
      ].map(([name, detail, status]) => (
        <div key={name} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B86645] text-[10px] font-bold text-white">{name.charAt(0)}</span>
            <div className="min-w-0"><strong className="block truncate text-xs text-white">{name}</strong><span className="text-[10px] text-[#CFC5B5]">{detail}</span></div>
          </div>
          <span className={status === 'Confirmado' ? 'rounded-full bg-[#AFC7BA]/15 px-2.5 py-1 text-[10px] font-semibold text-[#CBE0D4]' : 'rounded-full bg-[#E6A37C]/15 px-2.5 py-1 text-[10px] font-semibold text-[#F1C4A8]'}>{status}</span>
        </div>
      ))}
    </div>
  );
}

function BudgetPreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-[1.3fr_.7fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
        <div className="flex h-28 items-end gap-2">
          {[42, 68, 54, 86, 63, 78].map((height, index) => <span key={index} className="flex-1 rounded-t-md bg-[#C8875F]" style={{ height: `${height}%`, opacity: .45 + index * .08 }} />)}
        </div>
        <div className="mt-3 flex justify-between text-[9px] uppercase tracking-[0.14em] text-[#AFA593]"><span>Planejamento</span><span>Próximos 6 meses</span></div>
      </div>
      <div className="flex flex-col justify-between rounded-2xl bg-[#F4EBDD] p-4 text-[#302824]">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[#756B5E]">Saldo previsto</span>
        <strong className="font-serif text-2xl font-medium">{formatBRL(42900)}</strong>
        <span className="text-[10px] text-[#756B5E]">8 parcelas agendadas</span>
      </div>
    </div>
  );
}

function TimelinePreview() {
  return (
    <div className="space-y-3">
      {[
        ['14:30', 'Making of e retratos', 'Suíte do casal'],
        ['16:20', 'Posicionamento da cerimônia', 'Jardim'],
        ['17:00', 'Entrada do cortejo', 'Altar'],
      ].map(([time, title, place]) => (
        <div key={time} className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3">
          <strong className="font-serif text-lg font-medium text-[#E5A27A]">{time}</strong>
          <div className="relative border-l border-white/20 pl-4"><span className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-[#C8875F]" /><span className="block text-xs font-semibold text-white">{title}</span><span className="text-[10px] text-[#AFA593]">Responsável confirmado</span></div>
          <span className="hidden text-[10px] text-[#CFC5B5] sm:block">{place}</span>
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const [activeTour, setActiveTour] = useState<TourId>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const active = productTour.find((item) => item.id === activeTour) ?? productTour[0];

  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-border px-4 pb-20 pt-12 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="landing-orbit landing-orbit-one" />
        <div className="landing-orbit landing-orbit-two" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.92fr_1.08fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C8875F]/35 bg-[#F8EEE5] px-3 py-1.5 text-[11px] font-semibold text-[#8F4A31]">
              <Sparkles className="h-3.5 w-3.5" />
              Um lugar para todas as decisões do casamento
            </div>
            <h1 className="max-w-xl font-serif text-[clamp(2.9rem,7vw,5.8rem)] font-medium leading-[.94] tracking-[-.055em] text-charcoal">
              Planejar bem também faz parte da <em className="font-normal text-marsala-500">história.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#655B50] sm:text-lg">
              A Laçora conecta convidados, orçamento, fornecedores e o Dia H em um workspace feito para decisões claras — do primeiro plano ao grande dia.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/cadastro" className="brand-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold">
                Começar meu planejamento <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-charcoal transition hover:border-[#C8875F] hover:bg-[#F8EEE5]">
                Explorar demonstração
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#756B5E]">
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-sage-500" /> Plano gratuito disponível</span>
              <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-sage-500" /> Demonstração sem cadastro</span>
            </div>
          </div>

          <div className="relative min-h-[32rem]">
            <div className="absolute -right-8 -top-8 h-32 w-32 text-[#C8875F]/20"><LacoraMark className="h-full w-full" /></div>
            <div className="landing-product-shell relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[#183A33] p-3 shadow-[0_36px_90px_rgba(32,47,41,.25)] sm:p-5">
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                <LacoraLogo inverted compact markClassName="h-8 w-8" />
                <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#B86645]" /><span className="h-2 w-2 rounded-full bg-[#C8875F]" /><span className="h-2 w-2 rounded-full bg-[#F4EBDD]/40" /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
                <aside className="hidden space-y-2 sm:block">
                  {productTour.map((item) => <div key={item.id} className={item.id === activeTour ? 'flex items-center gap-2 rounded-xl bg-[#B86645] px-3 py-2.5 text-[11px] font-semibold text-white' : 'flex items-center gap-2 rounded-xl px-3 py-2.5 text-[11px] text-[#CFC5B5]'}><LacoraGlyph name={item.glyph} className="h-7 w-7 rounded-lg border-0 bg-white/[0.06]" />{item.label}</div>)}
                </aside>
                <div className="rounded-[1.3rem] bg-[#F4EBDD] p-5 sm:p-6">
                  <span className="text-[10px] font-bold uppercase tracking-[.16em] text-marsala-500">Visão geral</span>
                  <div className="mt-2 flex items-end justify-between gap-4"><div><h2 className="font-serif text-2xl font-medium text-charcoal">Boa tarde, Marina & Caio.</h2><p className="mt-1 text-[11px] text-[#756B5E]">Seu casamento está ganhando forma.</p></div><div className="text-right"><strong className="font-serif text-3xl font-medium text-charcoal">184</strong><span className="block text-[9px] uppercase tracking-wider text-[#756B5E]">dias</span></div></div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/70 p-4"><span className="text-[10px] text-[#756B5E]">Convidados</span><strong className="mt-1 block font-serif text-2xl font-medium">86</strong><span className="text-[9px] text-sage-500">+12 esta semana</span></div>
                    <div className="rounded-2xl bg-white/70 p-4"><span className="text-[10px] text-[#756B5E]">Planejado</span><strong className="mt-1 block font-serif text-2xl font-medium">{formatBRL(135000)}</strong><span className="text-[9px] text-marsala-500">68% contratado</span></div>
                  </div>
                  <div className="mt-3 rounded-2xl bg-white/70 p-4"><div className="flex items-center justify-between text-[10px]"><span className="font-semibold">Checklist do mês</span><span>8 de 11</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#EDE2D2]"><div className="h-full w-[73%] rounded-full bg-[#B86645]" /></div></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-7 -left-5 z-20 max-w-[15rem] rounded-2xl border border-border bg-surface p-4 shadow-xl sm:-left-9"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E4ECE7] text-sage-500"><Users className="h-4 w-4" /></span><div><strong className="block text-xs text-charcoal">12 novos RSVPs</strong><span className="text-[10px] text-[#756B5E]">Lista atualizada agora</span></div></div></div>
          </div>
        </div>
      </section>

      <section id="recursos" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div><span className="brand-kicker">Por dentro da Laçora</span><h2 className="mt-3 max-w-lg font-serif text-4xl font-medium leading-tight tracking-[-.035em] text-charcoal sm:text-5xl">O produto aparece. A complexidade, não.</h2></div>
            <p className="max-w-2xl text-base leading-7 text-[#655B50] lg:justify-self-end">Cada módulo compartilha o mesmo contexto do casamento. Uma confirmação altera a projeção do buffet; um contrato afeta o orçamento; um fornecedor entra no cronograma.</p>
          </div>

          <div className="mt-10 grid gap-2 rounded-2xl border border-border bg-surface p-2 sm:grid-cols-4">
            {productTour.map((item) => <button key={item.id} type="button" onClick={() => setActiveTour(item.id)} className={item.id === activeTour ? 'flex items-center gap-3 rounded-xl bg-[#213D36] px-4 py-3 text-left text-xs font-semibold text-white' : 'flex items-center gap-3 rounded-xl px-4 py-3 text-left text-xs font-semibold text-[#655B50] transition hover:bg-surface-muted'}><LacoraGlyph name={item.glyph} className="h-8 w-8 rounded-lg" />{item.label}</button>)}
          </div>

          <div className="mt-4 grid overflow-hidden rounded-[1.75rem] bg-[#183A33] lg:grid-cols-[.72fr_1.28fr]">
            <div className="p-7 sm:p-10 lg:p-12"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#E5A27A]">{active.eyebrow}</span><h3 className="mt-4 font-serif text-3xl font-medium leading-tight text-white sm:text-4xl">{active.title}</h3><p className="mt-4 text-sm leading-6 text-[#CFC5B5]">{active.description}</p><Link href="/login" className="mt-7 inline-flex items-center gap-2 text-xs font-bold text-[#F4EBDD]">Ver na demonstração <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="border-t border-white/10 bg-[#102D28] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">{activeTour === 'overview' && <OverviewPreview />}{activeTour === 'guests' && <GuestsPreview />}{activeTour === 'budget' && <BudgetPreview />}{activeTour === 'timeline' && <TimelinePreview />}</div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((feature) => <article key={feature.title} className="group bg-surface p-6 transition hover:bg-[#F8EEE5] sm:p-8"><div className="flex items-start justify-between"><LacoraGlyph name={feature.glyph} className="text-marsala-500 transition group-hover:-translate-y-1" /><span className="font-serif text-sm text-[#A69A8C]">{feature.kicker}</span></div><h3 className="mt-8 font-serif text-2xl font-medium text-charcoal">{feature.title}</h3><p className="mt-2 text-sm leading-6 text-[#756B5E]">{feature.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-[#EDE2D2] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.18fr_.82fr]">
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] shadow-[0_32px_70px_rgba(68,48,35,.18)]"><Image src="/brand/lacora-brand-suite.webp" alt="Aplicações da identidade Laçora em pasta, papelaria e aplicativo móvel" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" /></div>
          <div><span className="brand-kicker">Uma marca que vive fora da tela</span><h2 className="mt-3 font-serif text-4xl font-medium leading-tight tracking-[-.035em] text-charcoal sm:text-5xl">Duas fitas, um eixo comum e espaço para seguir.</h2><p className="mt-5 text-base leading-7 text-[#655B50]">O símbolo da Laçora nasce do encontro de duas trajetórias. A identidade combina verde profundo, terracota e papel natural para equilibrar método e afeto sem recorrer aos clichês visuais de casamento.</p><div className="mt-7 grid grid-cols-3 gap-3"><div className="h-16 rounded-xl bg-[#213D36] p-2 text-[9px] text-[#F4EBDD]">Floresta<br />#213D36</div><div className="h-16 rounded-xl bg-[#B86645] p-2 text-[9px] text-white">Terracota<br />#B86645</div><div className="h-16 rounded-xl border border-border bg-[#F4EBDD] p-2 text-[9px] text-[#302824]">Marfim<br />#F4EBDD</div></div></div>
        </div>
      </section>

      <section id="precos" className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl"><div className="max-w-2xl"><span className="brand-kicker">Planos claros</span><h2 className="mt-3 font-serif text-4xl font-medium tracking-[-.035em] text-charcoal sm:text-5xl">Comece pequeno. Leve tudo quando precisar.</h2><p className="mt-4 text-base leading-7 text-[#655B50]">O plano gratuito organiza o essencial; os planos pagos ampliam convidados, colaboração, site e operação.</p></div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">{Object.values(SUBSCRIPTION_PLANS).map((plan) => { const featured = plan.id === 'pro'; return <article key={plan.id} className={featured ? 'relative flex flex-col rounded-[1.75rem] border-2 border-[#B86645] bg-surface p-7 shadow-[0_24px_60px_rgba(101,63,44,.14)]' : 'flex flex-col rounded-[1.75rem] border border-border bg-surface p-7'}>{featured && <span className="absolute -top-3 left-7 rounded-full bg-[#B86645] px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-white">Mais completo</span>}<span className="text-[11px] font-bold uppercase tracking-[.14em] text-[#756B5E]">{plan.name}</span><div className="mt-4 flex items-end gap-2"><strong className="font-serif text-4xl font-medium text-charcoal">{plan.formattedPrice}</strong><span className="pb-1 text-xs text-[#756B5E]">{plan.price === 0 ? '' : `/ ${plan.billingPeriod}`}</span></div><p className="mt-3 min-h-12 text-sm leading-6 text-[#756B5E]">{plan.description}</p><ul className="mt-6 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-2.5 text-xs leading-5 text-[#50483F]"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-500" />{feature}</li>)}</ul><Link href="/cadastro" className={featured ? 'mt-8 inline-flex items-center justify-center rounded-xl bg-[#B86645] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#9B4E30]' : 'mt-8 inline-flex items-center justify-center rounded-xl border border-border bg-surface-muted px-5 py-3 text-xs font-bold text-charcoal transition hover:border-[#C8875F]'}>{plan.price === 0 ? 'Criar conta grátis' : 'Começar teste de 14 dias'}</Link></article>; })}</div>
        </div>
      </section>

      <section id="faq" className="border-t border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><span className="brand-kicker">Dúvidas frequentes</span><h2 className="mt-3 font-serif text-4xl font-medium tracking-[-.035em] text-charcoal">Antes de começar.</h2><div className="mt-7 space-y-3 text-xs text-[#756B5E]"><span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-marsala-500" /> Demonstração disponível agora</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sage-500" /> Ambiente de demonstração somente leitura</span></div></div><div className="divide-y divide-border border-y border-border">{faqItems.map((item, index) => { const isOpen = openFaq === index; return <div key={item.question}><button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left"><span className="font-serif text-xl font-medium text-charcoal">{item.question}</span><ChevronDown className={isOpen ? 'h-5 w-5 shrink-0 rotate-180 text-marsala-500 transition' : 'h-5 w-5 shrink-0 text-[#756B5E] transition'} /></button>{isOpen && <p className="max-w-2xl pb-6 text-sm leading-6 text-[#655B50]">{item.answer}</p>}</div>; })}</div></div></section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#183A33] px-6 py-12 text-center sm:px-12 sm:py-16"><div className="absolute -right-10 -top-14 h-56 w-56 opacity-[.08]"><LacoraMark className="h-full w-full" inverted /></div><div className="relative mx-auto max-w-2xl"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#E5A27A]">Seu planejamento começa aqui</span><h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-white sm:text-5xl">Menos abas abertas. Mais clareza para decidir.</h2><p className="mt-4 text-sm leading-6 text-[#CFC5B5]">Crie seu workspace ou conheça um casamento fictício completo antes de começar.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/cadastro" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B86645] px-6 py-3.5 text-sm font-bold text-white">Criar minha conta <ArrowRight className="h-4 w-4" /></Link><Link href="/login" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/5">Explorar demonstração</Link></div></div></div></section>
    </div>
  );
}
