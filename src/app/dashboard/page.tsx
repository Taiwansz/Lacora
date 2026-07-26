'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { formatBRL, getDaysCountdown } from '@/lib/utils';
import {
  Heart,
  CheckSquare,
  Users,
  DollarSign,
  Briefcase,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  Wine,
  Gift
} from 'lucide-react';

export default function DashboardPage() {
  const {
    coupleProfile,
    activeRole,
    tasks,
    guests,
    vendors,
    budgetItems,
    payments,
    notifications,
    activityLogs,
    getConfirmedGuestsCount,
    getTotalBudgetSpent,
    getCostPerGuest,
    getBuffetEstimates
  } = useAppStore();

  const { days, hours, isPast } = getDaysCountdown(coupleProfile.weddingDate);
  const confirmedGuests = getConfirmedGuestsCount();
  const totalBudgetSpent = getTotalBudgetSpent();
  const costPerGuest = getCostPerGuest();
  const buffetEstimates = getBuffetEstimates();

  const totalPaid = budgetItems.reduce((acc, item) => acc + item.paidAmount, 0);
  const totalPending = totalBudgetSpent - totalPaid;
  const remainingBudget = coupleProfile.totalBudgetPlanned - totalBudgetSpent;

  const urgentTasks = tasks.filter((t) => t.status !== 'concluida' && t.priority === 'urgente');
  const upcomingPayments = payments.filter((p) => p.status === 'pendente');

  // Role Restriction Message if Vendor or Guest
  if (activeRole === 'fornecedor') {
    return (
      <div className="bg-surface p-8 rounded-2xl border border-border text-center shadow-card max-w-xl mx-auto my-12">
        <Briefcase className="w-12 h-12 text-marsala-500 mx-auto mb-3" />
        <h2 className="font-serif text-2xl font-bold text-charcoal">Portal do Fornecedor Contratado</h2>
        <p className="text-sm text-slate-600 mt-2">
          Você está acessando o ambiente seguro de fornecedor. Aqui você tem acesso exclusivo ao seu contrato, cronograma dos entregáveis e parcelas de pagamento.
        </p>
        <div className="mt-6 p-4 bg-surface-muted rounded-xl text-left border border-border">
          <p className="text-xs font-semibold text-charcoal">Empresa: Quinta das Flores Gastronomia</p>
          <p className="text-xs text-slate-500 mt-1">Status: Contrato Assinado (R$ 57.600,00)</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Próxima Parcela: R$ 19.200,00 em 30/10/2026</p>
        </div>
      </div>
    );
  }

  if (activeRole === 'convidado') {
    return (
      <div className="bg-surface p-8 rounded-2xl border border-border text-center shadow-card max-w-xl mx-auto my-12">
        <Heart className="w-12 h-12 text-marsala-500 mx-auto mb-3 animate-pulse" />
        <h2 className="font-serif text-2xl font-bold text-charcoal">Área Secreta dos Convidados</h2>
        <p className="text-sm text-slate-600 mt-2">
          Bem-vindo ao espaço especial de {coupleProfile.partner1Name} & {coupleProfile.partner2Name}. Confirme sua presença (RSVP) e acompanhe a programação oficial.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/site"
            className="px-6 py-3 bg-marsala-500 text-white font-semibold text-xs rounded-xl shadow-card hover:bg-marsala-600 transition-colors"
          >
            Acessar Site do Casal & RSVP
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl marsala-gradient text-white p-6 sm:p-8 shadow-card">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-champagne-400" />
              Casamento Botânico Chic & Sofisticado
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              {coupleProfile.partner1Name} & {coupleProfile.partner2Name}
            </h1>
            <p className="text-xs sm:text-sm text-rose-100 mt-2 max-w-xl">
              Toda a jornada do seu grande dia centralizada, sem planilhas espalhadas e com sincronização automática entre todos os módulos.
            </p>
          </div>

          {/* Large Countdown Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-center min-w-[200px] shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-rose-200 block font-semibold">
              Contagem Regressiva
            </span>
            <div className="flex items-baseline justify-center gap-2 mt-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-white">
                {isPast ? 0 : days}
              </span>
              <span className="text-xs font-medium text-rose-200">dias</span>
            </div>
            <p className="text-[11px] text-rose-100 mt-1">
              {coupleProfile.weddingDate ? new Date(coupleProfile.weddingDate).toLocaleDateString('pt-BR', { dateStyle: 'full' }) : ''}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Key Indicators Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Budget Overview */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Orçamento Planejado</span>
            <div className="p-2 rounded-xl bg-rose-50 text-marsala-500">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-2xl font-bold text-charcoal block">
              {formatBRL(coupleProfile.totalBudgetPlanned)}
            </span>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-emerald-600 font-semibold">
                {formatBRL(totalBudgetSpent)} contratado
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">{Math.round((totalBudgetSpent / coupleProfile.totalBudgetPlanned) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Card 2: RSVP Progress */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Evolução do RSVP</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-2xl font-bold text-charcoal block">
              {confirmedGuests} <span className="text-sm font-sans font-normal text-slate-500">/ {coupleProfile.estimatedGuestsCount}</span>
            </span>
            <div className="w-full bg-surface-muted h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round((confirmedGuests / coupleProfile.estimatedGuestsCount) * 100))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Cost Per Guest */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Custo por Convidado</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-2xl font-bold text-charcoal block">
              {formatBRL(costPerGuest)}
            </span>
            <p className="text-xs text-slate-500 mt-2">
              Estimativa atual baseada em {confirmedGuests || coupleProfile.estimatedGuestsCount} convidados
            </p>
          </div>
        </div>

        {/* Card 4: Tasks Progress */}
        <div className="bg-surface p-5 rounded-2xl border border-border shadow-subtle hover:shadow-card transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Checklist Concluído</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="font-serif text-2xl font-bold text-charcoal block">
              {tasks.filter((t) => t.status === 'concluida').length} <span className="text-sm font-sans font-normal text-slate-500">/ {tasks.length}</span>
            </span>
            <p className="text-xs text-amber-600 font-medium mt-2 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              {urgentTasks.length} decisões urgentes pendentes
            </p>
          </div>
        </div>
      </div>

      {/* Cross-Module Live Estimates Section */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <Wine className="w-5 h-5 text-marsala-500" />
              Impacto Dinâmico do RSVP em Buffet & Bebidas
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cálculo automático em tempo real gerado pela lista de convidados confirmados.
            </p>
          </div>
          <Link
            href="/convidados"
            className="text-xs font-semibold text-marsala-500 hover:text-marsala-600 flex items-center gap-1"
          >
            Gerenciar CRM <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-border">
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Refeições Buffet</span>
            <span className="font-bold text-charcoal text-base mt-0.5 block">{buffetEstimates.buffetMeals}</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Refrigerante/Suco</span>
            <span className="font-bold text-charcoal text-base mt-0.5 block">{buffetEstimates.softDrinksLiters} L</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Espumantes / Garrafas</span>
            <span className="font-bold text-charcoal text-base mt-0.5 block">{buffetEstimates.sparklingBottles}</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Doces Finos</span>
            <span className="font-bold text-charcoal text-base mt-0.5 block">{buffetEstimates.sweetsCount} un</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Lembrancinhas</span>
            <span className="font-bold text-charcoal text-base mt-0.5 block">{buffetEstimates.favorsCount} un</span>
          </div>
          <div className="p-3 bg-surface-muted rounded-xl text-center">
            <span className="text-[11px] text-slate-500 block">Convites Físicos</span>
            <span className="font-bold text-charcoal text-base mt-0.5 block">{buffetEstimates.invitesCount} un</span>
          </div>
        </div>
      </div>

      {/* Split Grid: Urgent Tasks & Next Financial Commitments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Urgent Tasks */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-marsala-500" />
                Próximas Decisões & Tarefas Urgentes
              </h2>
              <Link href="/checklist" className="text-xs text-marsala-500 font-semibold hover:underline">
                Ver Todas
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-xl border border-border bg-surface-muted/60 flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-3.5 h-3.5 rounded-full mt-1 shrink-0 ${
                        task.status === 'concluida'
                          ? 'bg-emerald-500'
                          : task.priority === 'urgente'
                          ? 'bg-rose-500 animate-pulse'
                          : 'bg-amber-400'
                      }`}
                    />
                    <div>
                      <h3 className="text-xs font-semibold text-charcoal">{task.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Categoria: {task.category} • Prazo: {task.dueDate}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-border text-slate-600">
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/checklist"
            className="mt-4 w-full py-2.5 bg-surface-muted text-charcoal font-semibold text-xs rounded-xl border border-border text-center hover:bg-rose-50 hover:text-marsala-500 transition-colors block"
          >
            Abrir Checklist em Kanban / Calendário
          </Link>
        </div>

        {/* Upcoming Financial Due Dates */}
        <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
                <Clock className="w-5 h-5 text-marsala-500" />
                Próximos Vencimentos de Contratos
              </h2>
              <Link href="/orcamento" className="text-xs text-marsala-500 font-semibold hover:underline">
                Ver Orçamento
              </Link>
            </div>
            <div className="space-y-3">
              {upcomingPayments.map((pay) => (
                <div
                  key={pay.id}
                  className="p-3.5 rounded-xl border border-border bg-amber-50/40 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-charcoal block">
                      Parcela {pay.installmentNumber}/{pay.totalInstallments} — Quinta das Flores
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Vencimento: {new Date(pay.dueDate).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-sm font-bold text-marsala-500 block">
                      {formatBRL(pay.amount)}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      Pendente
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/orcamento"
            className="mt-4 w-full py-2.5 bg-marsala-500 text-white font-semibold text-xs rounded-xl text-center hover:bg-marsala-600 transition-colors block shadow-card"
          >
            Gerenciar Fluxo Financeiro & Comprovantes
          </Link>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-surface p-6 rounded-2xl border border-border shadow-subtle">
        <h2 className="font-serif text-lg font-bold text-charcoal mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-500" />
          Atividade Recente & Auditoria no Workspace
        </h2>
        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between text-xs py-2 border-b border-border/60 last:border-none">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-marsala-500" />
                <div>
                  <span className="font-semibold text-charcoal">{log.userName}</span>
                  <span className="text-slate-500 ml-2">{log.action}: {log.details}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
