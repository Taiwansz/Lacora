'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CheckSquare, Users, DollarSign, Menu } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const mainTabs = [
    { label: 'Inicio', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Tarefas', href: '/checklist', icon: CheckSquare },
    { label: 'Convidados', href: '/convidados', icon: Users },
    { label: 'Orçamento', href: '/orcamento', icon: DollarSign },
  ];

  return (
    <>
      {/* Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border flex items-center justify-around py-2 px-1 no-print">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors',
                isActive ? 'text-marsala-500 font-bold' : 'text-slate-500 hover:text-charcoal'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium text-slate-500 hover:text-charcoal"
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Full Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end no-print">
          <div className="w-4/5 max-w-xs bg-surface h-full p-5 overflow-y-auto flex flex-col shadow-floating">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <span className="font-serif font-bold text-lg text-charcoal">Menu Completo</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-slate-500 p-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-2">
              <Link
                href="/onboarding"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-semibold text-marsala-500 bg-rose-50 rounded-lg"
              >
                ✨ Novo Onboarding Wizard
              </Link>
              <Link
                href="/estilo"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                🎨 Estúdio de Estilo & Paleta
              </Link>
              <Link
                href="/vestuario"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                👗 Vestuário & Beleza
              </Link>
              <Link
                href="/fornecedores"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                💼 Pipeline de Fornecedores
              </Link>
              <Link
                href="/documentos"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                📄 Cofre de Documentos
              </Link>
              <Link
                href="/civil"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                ⚖️ Casamento Civil
              </Link>
              <Link
                href="/locais"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                🏰 Locais & Espaços
              </Link>
              <Link
                href="/evento"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                🍽️ Cerimônia & Recepção
              </Link>
              <Link
                href="/mesas"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                🪑 Mapa Interativo de Mesas
              </Link>
              <Link
                href="/decoracao"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                🌸 Decoração & Flores
              </Link>
              <Link
                href="/site"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                🌐 Site Público & RSVP
              </Link>
              <Link
                href="/dia-h"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                ⏱️ Cronograma Minuto a Minuto
              </Link>
              <Link
                href="/contingencia"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                🚨 Plano de Contingência
              </Link>
              <Link
                href="/pos-casamento"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                ✈️ Lua de Mel & Pós
              </Link>
              <Link
                href="/relatorios"
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2 text-xs font-medium text-slate-700 hover:bg-surface-muted rounded-lg"
              >
                📊 Relatórios Exportáveis & LGPD
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
