'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Compass,
  Palette,
  Shirt,
  CheckSquare,
  Users,
  Globe,
  DollarSign,
  Briefcase,
  FileText,
  FileCheck,
  MapPin,
  Utensils,
  Grid,
  Flower2,
  Clock,
  ShieldAlert,
  Plane,
  FileSpreadsheet,
  Settings,
  HeartHandshake
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

export const sidebarItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Onboarding', href: '/onboarding', icon: Compass },
  { label: 'Estúdio de Estilo', href: '/estilo', icon: Palette },
  { label: 'Vestuário & Beleza', href: '/vestuario', icon: Shirt },
  { label: 'Checklist Inteligente', href: '/checklist', icon: CheckSquare },
  { label: 'CRM de Convidados', href: '/convidados', icon: Users },
  { label: 'Site Público & RSVP', href: '/site', icon: Globe },
  { label: 'Orçamento & Finanças', href: '/orcamento', icon: DollarSign },
  { label: 'Pipeline Fornecedores', href: '/fornecedores', icon: Briefcase },
  { label: 'Cofre de Documentos', href: '/documentos', icon: FileText },
  { label: 'Casamento Civil', href: '/civil', icon: FileCheck },
  { label: 'Locais & Espaços', href: '/locais', icon: MapPin },
  { label: 'Cerimônia & Recepção', href: '/evento', icon: Utensils },
  { label: 'Mapa de Mesas', href: '/mesas', icon: Grid },
  { label: 'Decoração & Flores', href: '/decoracao', icon: Flower2 },
  { label: 'Cronograma do Dia', href: '/dia-h', icon: Clock },
  { label: 'Plano de Contingência', href: '/contingencia', icon: ShieldAlert },
  { label: 'Lua de Mel & Pós', href: '/pos-casamento', icon: Plane },
  { label: 'Relatórios & LGPD', href: '/relatorios', icon: FileSpreadsheet },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-border min-h-screen hidden md:flex flex-col no-print shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl marsala-gradient flex items-center justify-center text-white shadow-subtle">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <div>
          <span className="font-serif font-bold text-lg text-charcoal block leading-none">
            Nosso Grande Dia
          </span>
          <span className="text-[10px] uppercase tracking-wider font-semibold text-rose-500 mt-1 block">
            Plataforma SaaS Premium
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group',
                isActive
                  ? 'bg-marsala-500 text-white shadow-card font-semibold'
                  : 'text-slate-600 hover:bg-surface-muted hover:text-marsala-500'
              )}
            >
              <Icon
                className={cn(
                  'w-4 h-4 transition-transform group-hover:scale-110',
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-marsala-500'
                )}
              />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-rose-100 text-marsala-500 font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Branding */}
      <div className="p-4 border-t border-border bg-surface-muted/50 text-center">
        <p className="text-[11px] text-slate-500">
          Nosso Grande Dia &copy; 2026
        </p>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Gestão Inteligente & Isolamento LGPD
        </p>
      </div>
    </aside>
  );
};
