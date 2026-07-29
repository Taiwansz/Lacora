'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { formatBRL, getDaysCountdown } from '@/lib/utils';
import {
  Heart,
  CheckSquare,
  Users,
  DollarSign,
  Briefcase,
  Clock,
  ChevronRight,
  TrendingUp,
  Wine,
  Shield,
  Compass,
  Info
} from 'lucide-react';
import { LacoraMark } from '@/components/brand/LacoraLogo';

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    coupleProfile,
    tasks,
    guests,
    budgetItems,
    activityLogs,
    workspaces,
    activeWorkspaceId,
    getConfirmedGuestsCount,
    getCostPerGuestMetrics,
    getBuffetEstimates,
    getCurrentRole
  } = useAppStore();

  const currentRole = getCurrentRole();
  const activeWs = workspaces.find((w) => w.id === activeWorkspaceId);
  const isDemo = activeWs?.isDemoWorkspace;

  const countdown = getDaysCountdown(coupleProfile.weddingDate);
  const days = countdown.days;
  const isPast = countdown.isPast;

  const confirmedGuests = getConfirmedGuestsCount();
  const {
    targetCostPerPerson,
    contractedCostPerEstimatedGuest,
    projectedCostPerConfirmedGuest,
    paidCostPerGuest
  } = getCostPerGuestMetrics();

  const buffetEstimates = getBuffetEstimates();

  const totalBudgetSpent = budgetItems.reduce((acc, item) => acc + (item.contractedCost || item.estimatedCost || 0), 0);
  const urgentTasks = tasks.filter((t) => t.status !== 'concluida' && t.priority === 'urgente');
  const completedTasks = tasks.filter((task) => task.status === 'concluida').length;
  const taskCompletion = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // Role Restriction Message if Vendor
  if (currentRole === 'fornecedor') {
    return (
      <div className="bg-surface p-8 rounded-3xl border border-border text-center shadow-card max-w-xl mx-auto my-12 space-y-4">
        <Briefcase className="w-10 h-10 text-marsala-500 mx-auto" />
        <h2 className="font-serif text-xl font-bold text-charcoal">Portal do Fornecedor Contratado</h2>
        <p className="text-xs text-slate-600">
          Você possui acesso restrito ao contrato, cronograma de entregáveis e parcelas de pagamento do seu serviço.
        </p>
      </div>
    );
  }

  // Role Restriction Message if Guest
  if (currentRole === 'convidado') {
    return (
      <div className="bg-surface p-8 rounded-3xl border border-border text-center shadow-card max-w-xl mx-auto my-12 space-y-4">
        <Heart className="w-10 h-10 text-marsala-500 mx-auto" />
        <h2 className="font-serif text-xl font-bold text-charcoal">Área do Convidado</h2>
        <p className="text-xs text-slate-600">
          Bem-vindo ao espaço de {coupleProfile.partner1Name || 'Noivo(a) 1'} & {coupleProfile.partner2Name || 'Noivo(a) 2'}. Confirme sua presença no RSVP online.
        </p>
        <Link
          href="/site"
          className="inline-block px-6 py-2.5 bg-marsala-500 text-white font-bold text-xs rounded-xl shadow-card hover:bg-marsala-600"
        >
          Acessar Site do Casal & RSVP
        </Link>
      </div>
    );
  }

  // Empty State for New Workspace
  const isEmptyWorkspace = guests.length === 0 && tasks.length === 0 && budgetItems.length === 0 && !isDemo;

  return (
    <div className="space-y-8">
      {/* Demo Workspace Banner */}
      {isDemo && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Modo de Demonstração Fictício:</strong> Este é um workspace descartável de teste com dados modelo isolados.
            </span>
          </div>
          <Link href="/onboarding" className="font-bold text-amber-800 hover:underline shrink-0">
            Criar Meu Casamento Real
          </Link>
        </div>
      )}

      {/* Open page introduction — deliberately not wrapped in a floating box */}
      <div className="relative overflow-hidden border-b border-border pb-7">
        <LacoraMark className="absolute -right-3 -top-9 h-36 w-36 opacity-[0.08]" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-marsala-500">
              {coupleProfile.style || 'Planejamento do casamento'}
            </span>
            <h1 className="workspace-page-heading font-serif text-3xl sm:text-4xl font-medium text-charcoal leading-tight mt-1">
              Bem-vindos de volta.
            </h1>
            <p className="text-xs sm:text-sm text-[#756B5E] mt-2 max-w-xl">
              {coupleProfile.partner1Name || 'Noivo(a) 1'} & {coupleProfile.partner2Name || 'Noivo(a) 2'}, aqui está o panorama do grande dia.
            </p>
          </div>

          <div className="flex items-center gap-4 min-w-[230px] shrink-0 md:justify-end">
            <div className="h-px w-10 bg-marsala-500" />
            <div>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#756B5E] block font-semibold">
                Linha do tempo
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="font-serif text-3xl font-medium text-charcoal">
                  {!isMounted ? '...' : isPast ? 0 : days}
                </span>
                <span className="text-xs text-[#756B5E]">dias restantes</span>
              </div>
              <p className="text-[10px] text-[#8A7E70] mt-0.5">{coupleProfile.weddingDate || 'Data a definir'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State Banner if completely fresh account */}
      {isEmptyWorkspace && (
        <div className="bg-surface p-8 rounded-3xl border border-border text-center shadow-card space-y-4">
          <Compass className="w-10 h-10 text-marsala-500 mx-auto" />
          <h2 className="font-serif text-xl font-bold text-charcoal">Seu Casamento está Prontinho para Começar!</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Você ainda não cadastrou tarefas, convidados ou orçamento. Preencha o onboarding com seus dados reais para gerar sua estrutura inicial personalizada.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 bg-marsala-500 text-white font-bold text-xs rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
          >
            <Compass className="w-4 h-4" /> Iniciar Onboarding Personalizado
          </Link>
        </div>
      )}

      {/* KPI Key Indicators Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Budget */}
        <div className="bg-surface p-5 rounded-2xl border border-border border-t-2 border-t-marsala-500 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Orçamento Planejado</span>
            <div className="p-2 rounded-xl bg-rose-50 text-marsala-500">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-2xl font-bold text-charcoal block">
              {formatBRL(coupleProfile.totalBudgetPlanned)}
            </span>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-emerald-600 font-semibold">{formatBRL(totalBudgetSpent)} contratado</span>
            </div>
          </div>
        </div>

        {/* Card 2: RSVP */}
        <div className="bg-surface p-5 rounded-2xl border border-border border-t-2 border-t-sage-500 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Confirmados (RSVP)</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-2xl font-bold text-charcoal block">
              {confirmedGuests} <span className="text-xs font-sans font-normal text-slate-500">/ {coupleProfile.estimatedGuestsCount} estimados</span>
            </span>
            <div className="w-full bg-surface-muted h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((confirmedGuests / (coupleProfile.estimatedGuestsCount || 1)) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Cost per Guest (Corrected Logic) */}
        <div className="bg-surface p-5 rounded-2xl border border-border border-t-2 border-t-[#929779] shadow-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-slate-500">Custo Previsto / Convidado</span>
              <div title="Custo total contratado dividido pela lista total de convidados previstos." className="cursor-help">
                <Info className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-2xl font-bold text-charcoal block">
              {formatBRL(contractedCostPerEstimatedGuest)}
            </span>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Teto: {formatBRL(targetCostPerPerson)} / pessoa
            </span>
          </div>
        </div>

        {/* Card 4: Checklist */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Checklist de Tarefas</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <span className="font-serif text-2xl font-bold text-charcoal block">
                {completedTasks} <span className="text-xs font-sans font-normal text-slate-500">/ {tasks.length}</span>
              </span>
              <span className="text-[11px] text-rose-600 font-semibold mt-1 block">
                {urgentTasks.length} urgentes pendentes
              </span>
            </div>
            <div
              className="h-12 w-12 rounded-full p-[5px]"
              style={{
                background: `conic-gradient(#213D36 ${taskCompletion * 3.6}deg, #DED3C2 0deg)`,
              }}
              aria-label={`${taskCompletion}% das tarefas concluídas`}
            >
              <div className="h-full w-full rounded-full bg-surface flex items-center justify-center text-[10px] font-bold text-charcoal">
                {taskCompletion}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Cost per Guest Metrics Breakdown */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-card space-y-4">
        <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-marsala-500" />
          Análise Detalhada do Custo por Convidado
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-surface-muted rounded-xl border border-border">
            <span className="font-semibold text-slate-500 block">1. Orçamento Teto por Convidado</span>
            <span className="font-serif text-lg font-bold text-charcoal block mt-1">{formatBRL(targetCostPerPerson)}</span>
            <p className="text-[10px] text-slate-400 mt-1">Orçamento total planejado ÷ convidados previstos ({coupleProfile.estimatedGuestsCount}).</p>
          </div>
          <div className="p-4 bg-surface-muted rounded-xl border border-border">
            <span className="font-semibold text-slate-500 block">2. Custo Contratado / Convidado Previsto</span>
            <span className="font-serif text-lg font-bold text-emerald-600 block mt-1">{formatBRL(contractedCostPerEstimatedGuest)}</span>
            <p className="text-[10px] text-slate-400 mt-1">Valor contratado acumulado ÷ convidados previstos ({coupleProfile.estimatedGuestsCount}).</p>
          </div>
          <div className="p-4 bg-surface-muted rounded-xl border border-border">
            <span className="font-semibold text-slate-500 block">3. Custo Projetado / Convidado Confirmado</span>
            <span className="font-serif text-lg font-bold text-indigo-600 block mt-1">
              {confirmedGuests > 0 ? formatBRL(projectedCostPerConfirmedGuest) : 'Pendente RSVPs'}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Total contratado ÷ confirmações efetuadas ({confirmedGuests} confirmados).</p>
          </div>
          <div className="p-4 bg-surface-muted rounded-xl border border-border">
            <span className="font-semibold text-slate-500 block">4. Efetivamente Pago / Convidado</span>
            <span className="font-serif text-lg font-bold text-purple-600 block mt-1">{formatBRL(paidCostPerGuest)}</span>
            <p className="text-[10px] text-slate-400 mt-1">Total já pago ÷ convidados previstos ({coupleProfile.estimatedGuestsCount}).</p>
          </div>
        </div>
      </div>

      {/* Buffet & Drinks Impact */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-base font-bold text-charcoal flex items-center gap-2">
              <Wine className="w-4 h-4 text-marsala-500" />
              Estimativa do RSVP no Buffet
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cálculos em tempo real baseados em {confirmedGuests || coupleProfile.estimatedGuestsCount} convidados.
            </p>
          </div>
          <Link href="/convidados" className="text-xs font-semibold text-marsala-500 hover:underline flex items-center gap-1">
            Lista de Convidados <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-border">
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Refeições</span>
            <span className="font-bold text-charcoal text-sm mt-0.5 block">{buffetEstimates.buffetMeals}</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Bebidas (L)</span>
            <span className="font-bold text-charcoal text-sm mt-0.5 block">{buffetEstimates.softDrinksLiters} L</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Espumante</span>
            <span className="font-bold text-charcoal text-sm mt-0.5 block">{buffetEstimates.sparklingBottles} garrafas</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Doces Finos</span>
            <span className="font-bold text-charcoal text-sm mt-0.5 block">{buffetEstimates.sweetsCount} un</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Lembranças</span>
            <span className="font-bold text-charcoal text-sm mt-0.5 block">{buffetEstimates.favorsCount} un</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Convites</span>
            <span className="font-bold text-charcoal text-sm mt-0.5 block">{buffetEstimates.invitesCount} un</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle">
        <h2 className="font-serif text-base font-bold text-charcoal mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          Atividade Recente no Workspace
        </h2>
        <div className="space-y-2">
          {activityLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-center justify-between text-xs py-2 border-b border-border/60 last:border-none">
              <div>
                <span className="font-bold text-charcoal">{log.userName}</span>
                <span className="text-slate-500 ml-2">{log.action}: {log.details}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
            </div>
          ))}
          {activityLogs.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4">Nenhuma atividade recente registrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}
