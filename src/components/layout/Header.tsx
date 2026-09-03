'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getDaysCountdown } from '@/lib/utils';
import { Bell, LogOut, User as UserIcon } from 'lucide-react';
import { navGroups } from './Sidebar';

export const Header: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    coupleProfile,
    currentUser,
    logout,
    notifications,
  } = useAppStore();

  const countdown = getDaysCountdown(coupleProfile.weddingDate);
  const days = countdown.days;
  const isPast = countdown.isPast;

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;
  const activePage =
    navGroups.flatMap((group) => group.items).find((item) => item.href === pathname)?.label ||
    'Planejamento';

  return (
    <>
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/70 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-3.5 flex items-center justify-between no-print">
        {/* Couple & Workspace Info */}
        <div className="min-w-0">
          <span className="text-[10px] uppercase tracking-[0.16em] font-semibold text-marsala-500">
            Espaço do casal
          </span>
          <div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="font-serif text-charcoal text-lg lg:text-xl leading-none tracking-[-0.02em]">
                {activePage}
              </p>
            </div>
            <p className="text-[11px] text-[#756B5E] mt-1 truncate">
              {coupleProfile.partner1Name || 'Noivo(a) 1'} & {coupleProfile.partner2Name || 'Noivo(a) 2'}
              <span className="hidden sm:inline"> · {coupleProfile.city || 'Cidade a definir'}</span>
            </p>
          </div>
        </div>

        {/* Days Countdown with Hydration Safety */}
        <div className="hidden sm:flex items-center bg-surface/70 px-3.5 py-1.5 rounded-full border border-border">
          <span className="text-xs text-charcoal font-medium">
            {!isMounted ? 'Carregando data...' : isPast ? 'Dia do Casamento' : `Faltam ${days} dias`}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Couple workspace identity */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600">
            <div className="h-8 w-8 rounded-full bg-[#213D36] text-[#F4EBDD] flex items-center justify-center border-2 border-white/60 shadow-subtle">
              <UserIcon className="h-3.5 w-3.5" />
            </div>
            <div className="leading-tight">
              <span className="font-semibold text-charcoal text-[11px] block">
                {currentUser?.name || 'Nós dois'}
              </span>
              <span className="text-[#817669] text-[9px]">Espaço privado</span>
            </div>
          </div>

          {/* Notifications Icon */}
          <Link
            href="/notificacoes"
            className="relative p-2 rounded-full text-slate-600 hover:bg-surface-muted transition-colors"
            title="Notificações"
            aria-label="Notificações do sistema"
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
              onClick={async () => {
                await logout();
                window.location.assign('/acesso');
              }}
              className="p-2 rounded-lg text-slate-500 hover:text-marsala-500 hover:bg-surface-muted transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Bloquear o espaço privado"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sair</span>
            </button>
          ) : (
            <Link
              href="/acesso"
              className="px-3.5 py-1.5 bg-marsala-500 hover:bg-marsala-600 text-white font-semibold text-xs rounded-lg shadow-card transition-colors"
            >
              Acessar
            </Link>
          )}
        </div>
      </header>
    </>
  );
};
