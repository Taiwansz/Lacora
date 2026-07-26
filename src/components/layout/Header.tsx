'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { getDaysCountdown } from '@/lib/utils';
import { Bell, LogOut, User as UserIcon, RefreshCw, Eye } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    coupleProfile,
    currentUser,
    getCurrentRole,
    logout,
    notifications,
    workspaces,
    activeWorkspaceId,
    setActiveWorkspace,
    enterDemoMode
  } = useAppStore();

  const currentRole = getCurrentRole();
  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);
  const isDemo = activeWorkspace?.isDemoWorkspace;

  const { days, isPast } = getDaysCountdown(coupleProfile.weddingDate);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between no-print">
      {/* Couple & Workspace Info */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full marsala-gradient flex items-center justify-center text-white font-serif font-bold text-sm shadow-subtle">
          {coupleProfile.partner1Name?.[0] || 'N'}
          {coupleProfile.partner2Name?.[0] || 'D'}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-charcoal text-sm lg:text-base leading-none">
              {coupleProfile.partner1Name} & {coupleProfile.partner2Name}
            </h1>
            {isDemo && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                Demonstração
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {coupleProfile.city || 'Cidade a definir'} • {coupleProfile.weddingDate || 'Data a definir'}
          </p>
        </div>
      </div>

      {/* Days Countdown */}
      <div className="hidden sm:flex items-center bg-surface-muted px-3.5 py-1.5 rounded-full border border-border">
        <span className="text-xs text-charcoal font-medium">
          {isPast ? 'Dia do Casamento' : `Faltam ${days} dias`}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Active Role Badge (Derived from DB, not selectable) */}
        <div className="hidden lg:flex items-center gap-1.5 bg-surface-muted px-2.5 py-1 rounded-lg border border-border text-xs text-slate-600">
          <span className="text-slate-400">Perfil:</span>
          <span className="font-semibold text-charcoal uppercase text-[10px] tracking-wider">
            {currentRole.replace('_', ' ')}
          </span>
        </div>

        {/* Notifications Icon */}
        <Link
          href="/notificacoes"
          className="relative p-2 rounded-full text-slate-600 hover:bg-surface-muted transition-colors"
          title="Notificações"
        >
          <Bell className="w-4 h-4 text-charcoal" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-marsala-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </Link>

        {/* User Account / Logout */}
        {currentUser ? (
          <button
            onClick={logout}
            className="p-2 rounded-lg text-slate-500 hover:text-marsala-500 hover:bg-surface-muted transition-colors flex items-center gap-1 text-xs font-semibold"
            title="Sair da Conta"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Sair</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="px-3 py-1.5 bg-marsala-500 text-white font-semibold text-xs rounded-lg shadow-card"
          >
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
};
