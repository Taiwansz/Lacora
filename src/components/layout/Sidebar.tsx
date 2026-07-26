'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Compass,
  CheckSquare,
  ShieldAlert,
  Users,
  UserCheck,
  Plane,
  DollarSign,
  Briefcase,
  FileText,
  Palette,
  Shirt,
  Flower2,
  MapPin,
  Utensils,
  Grid,
  Clock,
  Globe,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Lock,
  History,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface NavGroup {
  title: string;
  items: { label: string; href: string; icon: React.ElementType }[];
}

export const navGroups: NavGroup[] = [
  {
    title: 'Planejamento',
    items: [
      { label: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Onboarding', href: '/onboarding', icon: Compass },
      { label: 'Checklist', href: '/checklist', icon: CheckSquare },
      { label: 'Contingência & Riscos', href: '/contingencia', icon: ShieldAlert },
    ],
  },
  {
    title: 'Pessoas',
    items: [
      { label: 'CRM de Convidados', href: '/convidados', icon: Users },
      { label: 'Equipe & Permissões', href: '/equipe', icon: UserCheck },
      { label: 'Lua de Mel & Pós', href: '/pos-casamento', icon: Plane },
    ],
  },
  {
    title: 'Financeiro',
    items: [
      { label: 'Orçamento', href: '/orcamento', icon: DollarSign },
      { label: 'Fornecedores', href: '/fornecedores', icon: Briefcase },
      { label: 'Documentos & Contratos', href: '/documentos', icon: FileText },
    ],
  },
  {
    title: 'Estilo',
    items: [
      { label: 'Identidade Visual', href: '/estilo', icon: Palette },
      { label: 'Vestuário & Beleza', href: '/vestuario', icon: Shirt },
      { label: 'Decoração & Flores', href: '/decoracao', icon: Flower2 },
    ],
  },
  {
    title: 'Evento',
    items: [
      { label: 'Locais & Espaços', href: '/locais', icon: MapPin },
      { label: 'Cerimônia & Recepção', href: '/evento', icon: Utensils },
      { label: 'Mapa de Mesas', href: '/mesas', icon: Grid },
      { label: 'Cronograma (Dia H)', href: '/dia-h', icon: Clock },
    ],
  },
  {
    title: 'Site & Mídia',
    items: [
      { label: 'Site do Casal & RSVP', href: '/site', icon: Globe },
      { label: 'Casamento Civil', href: '/civil', icon: FileText },
    ],
  },
  {
    title: 'Configurações',
    items: [
      { label: 'Minha Conta', href: '/conta', icon: Settings },
      { label: 'Configurações', href: '/configuracoes', icon: Settings },
      { label: 'Notificações', href: '/notificacoes', icon: Bell },
      { label: 'Assinatura', href: '/assinatura', icon: CreditCard },
      { label: 'Privacidade & LGPD', href: '/privacidade', icon: Lock },
      { label: 'Auditoria & Logs', href: '/auditoria', icon: History },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="w-64 bg-surface border-r border-border min-h-screen hidden md:flex flex-col no-print shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl marsala-gradient flex items-center justify-center text-white font-serif font-bold text-sm shadow-subtle">
          ND
        </div>
        <div>
          <span className="font-serif font-bold text-base text-charcoal block leading-none">
            Nosso Grande Dia
          </span>
          <span className="text-[10px] text-slate-400 font-medium block mt-1">
            Gestão de Casamentos
          </span>
        </div>
      </div>

      {/* Grouped Navigation Accordion */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
        {navGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.title];
          const hasActiveChild = group.items.some((item) => pathname === item.href);

          return (
            <div key={group.title} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-charcoal transition-colors"
              >
                <span>{group.title}</span>
                {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150',
                          isActive
                            ? 'bg-marsala-500 text-white font-semibold shadow-card'
                            : 'text-slate-600 hover:bg-surface-muted hover:text-marsala-500'
                        )}
                      >
                        <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border text-center text-[10px] text-slate-400">
        Nosso Grande Dia &copy; 2026
      </div>
    </aside>
  );
};
