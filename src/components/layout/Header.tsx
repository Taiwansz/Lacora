'use client';

import React from 'react';
import { useAppStore } from '@/lib/store';
import { UserRole } from '@/types';
import { getDaysCountdown } from '@/lib/utils';
import { Bell, Heart, Shield, Plus, Sparkles, User, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    coupleProfile,
    activeRole,
    setActiveRole,
    notifications,
    resetToDemoData,
    createNewWorkspace,
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace
  } = useAppStore();

  const { days, isPast } = getDaysCountdown(coupleProfile.weddingDate);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'casal_admin', label: 'Casal (Administrador)' },
    { role: 'cerimonialista', label: 'Cerimonialista / Assessor' },
    { role: 'fornecedor', label: 'Fornecedor (Acesso Restrito)' },
    { role: 'convidado', label: 'Convidado (Visão Pública)' },
    { role: 'familiar', label: 'Familiar / Colaborador' },
    { role: 'admin_geral', label: 'Admin Geral SaaS' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between no-print">
      {/* Workspace & Couple Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full marsala-gradient flex items-center justify-center text-white font-serif font-bold shadow-subtle">
          {coupleProfile.partner1Name[0]}
          {coupleProfile.partner2Name[0]}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-charcoal text-base lg:text-lg leading-none">
              {coupleProfile.partner1Name} & {coupleProfile.partner2Name}
            </h1>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-marsala-500 border border-rose-300">
              {coupleProfile.style}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {coupleProfile.city} • {coupleProfile.weddingDate ? new Date(coupleProfile.weddingDate).toLocaleDateString('pt-BR') : 'Data a definir'}
          </p>
        </div>
      </div>

      {/* Middle: Days Countdown Widget */}
      <div className="hidden sm:flex items-center bg-surface-muted px-4 py-1.5 rounded-full border border-border">
        <Heart className="w-4 h-4 text-marsala-500 mr-2 animate-pulse" />
        <span className="text-xs text-charcoal font-medium">
          {isPast ? 'O Grande Dia Chegou!' : `Faltam ${days} dias para o casamento`}
        </span>
      </div>

      {/* Right Controls: Role Selector, Notifications & Reset */}
      <div className="flex items-center gap-3">
        {/* Role Selector Simulator */}
        <div className="hidden lg:flex items-center gap-1.5 bg-white border border-border rounded-lg px-2 py-1 shadow-subtle">
          <Shield className="w-3.5 h-3.5 text-marsala-500" />
          <span className="text-xs text-slate-500 font-medium">Perfil:</span>
          <select
            value={activeRole}
            onChange={(e) => setActiveRole(e.target.value as UserRole)}
            className="text-xs font-semibold text-charcoal bg-transparent border-none focus:ring-0 cursor-pointer"
          >
            {rolesList.map((r) => (
              <option key={r.role} value={r.role}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications Icon */}
        <button
          className="relative p-2 rounded-full text-slate-600 hover:bg-surface-muted transition-colors"
          title="Notificações & Alertas"
        >
          <Bell className="w-5 h-5 text-charcoal" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-marsala-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => {
            if (confirm('Deseja recarregar os dados demonstrativos de Matheus e Virginia?')) {
              resetToDemoData();
            }
          }}
          className="hidden md:flex items-center gap-1 text-xs text-slate-500 hover:text-marsala-500 px-2 py-1.5 border border-border rounded-lg hover:bg-surface-muted transition-colors"
          title="Restaurar dados fictícios de demonstração"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Demo</span>
        </button>
      </div>
    </header>
  );
};
