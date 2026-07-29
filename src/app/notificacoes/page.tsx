'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { Bell, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function NotificacoesPage() {
  const { notifications } = useAppStore();

  return (
    <div className="space-y-8 w-full">
      <div className="bg-surface p-6 rounded-3xl border border-border shadow-subtle">
        <h1 className="font-serif text-2xl font-bold text-charcoal">Central de Notificações & Alertas</h1>
        <p className="text-xs text-slate-500 mt-1">
          Alertas de vencimento de contratos, confirmações de RSVP e prazos de tarefas.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-3xl border border-border shadow-card space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="p-4 rounded-2xl border border-border bg-surface-muted/30 flex items-start justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-bold uppercase text-marsala-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {notif.type.replace('_', ' ')}
              </span>
              <h3 className="text-xs font-bold text-charcoal mt-1.5">{notif.title}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{notif.message}</p>
              <span className="text-[10px] text-slate-400 mt-1 block">{notif.createdAt}</span>
            </div>
            {!notif.read && (
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full shrink-0">
                Novo
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
