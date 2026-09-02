'use client';

import React, { useMemo, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Notification } from '@/types';
import { Bell, Check, CheckCheck, CircleAlert, Clock3, MailOpen } from 'lucide-react';

const typeLabel: Record<Notification['type'], string> = {
  alerta_urgente: 'Alerta urgente',
  vencimento: 'Vencimento',
  rsvp: 'RSVP',
  orcamento_excedido: 'Orçamento',
  tarefa_atrasada: 'Tarefa atrasada',
};

export default function NotificacoesPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();
  const [filter, setFilter] = useState<'todas' | 'nao_lidas'>('todas');
  const unread = notifications.filter((notification) => !notification.read).length;
  const visible = useMemo(() => filter === 'nao_lidas' ? notifications.filter((notification) => !notification.read) : notifications, [filter, notifications]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between"><div><span className="brand-kicker">O que mudou no seu planejamento</span><h1 className="workspace-page-heading mt-1 font-serif text-3xl font-medium text-charcoal">Notificações</h1><p className="mt-2 text-sm text-[#756B5E]">Prazos, respostas e alertas reunidos em ordem de atenção.</p></div>{unread > 0 && <button type="button" onClick={markAllNotificationsRead} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-charcoal hover:bg-surface-muted"><CheckCheck className="h-4 w-4 text-sage-500" />Marcar todas como lidas</button>}</div>

      <div className="flex gap-2"><button type="button" onClick={() => setFilter('todas')} className={filter === 'todas' ? 'rounded-full bg-[#213D36] px-4 py-2 text-[11px] font-bold text-white' : 'rounded-full border border-border bg-surface px-4 py-2 text-[11px] font-semibold text-[#655B50]'}>Todas ({notifications.length})</button><button type="button" onClick={() => setFilter('nao_lidas')} className={filter === 'nao_lidas' ? 'rounded-full bg-[#213D36] px-4 py-2 text-[11px] font-bold text-white' : 'rounded-full border border-border bg-surface px-4 py-2 text-[11px] font-semibold text-[#655B50]'}>Não lidas ({unread})</button></div>

      <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-subtle">{visible.length === 0 ? <div className="p-12 text-center"><MailOpen className="mx-auto h-9 w-9 text-marsala-500" /><h2 className="mt-3 font-serif text-xl font-medium text-charcoal">Tudo em dia por aqui</h2><p className="mt-1 text-xs text-[#756B5E]">Nenhuma notificação corresponde a este filtro.</p></div> : <div className="divide-y divide-border">{visible.map((notification) => <article key={notification.id} className={notification.read ? 'grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-start' : 'grid gap-4 bg-[#F8EEE5]/65 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-start'}><span className={notification.type === 'alerta_urgente' || notification.type === 'tarefa_atrasada' ? 'flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-marsala-500' : notification.type === 'rsvp' ? 'flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700' : 'flex h-10 w-10 items-center justify-center rounded-xl bg-surface-muted text-[#756B5E]'}>{notification.type === 'rsvp' ? <Bell className="h-4 w-4" /> : notification.type === 'vencimento' ? <Clock3 className="h-4 w-4" /> : <CircleAlert className="h-4 w-4" />}</span><div><div className="flex flex-wrap items-center gap-2"><span className="text-[9px] font-bold uppercase tracking-[.14em] text-marsala-500">{typeLabel[notification.type]}</span>{!notification.read && <span className="h-1.5 w-1.5 rounded-full bg-marsala-500" />}</div><h2 className="mt-1 font-serif text-lg font-medium text-charcoal">{notification.title}</h2><p className="mt-1 text-xs leading-5 text-[#655B50]">{notification.message}</p><span className="mt-2 block text-[10px] text-[#8A7E70]">{notification.createdAt}</span></div>{!notification.read && <button type="button" onClick={() => markNotificationRead(notification.id)} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] font-bold text-sage-500 hover:bg-emerald-50"><Check className="h-3.5 w-3.5" />Marcar como lida</button>}</article>)}</div>}</div>
    </div>
  );
}
