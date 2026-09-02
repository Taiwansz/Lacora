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
  Lock,
  Bell,
  CreditCard,
  History,
  Camera,
  Send,
  ChevronDown,
  ChevronRight,
  Search
} from 'lucide-react';
import { LacoraLogo } from '@/components/brand/LacoraLogo';

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
      { label: 'Checklist de Tarefas', href: '/checklist', icon: CheckSquare },
      { label: 'Contingência & Riscos', href: '/contingencia', icon: ShieldAlert },
    ],
  },
  {
    title: 'Pessoas & Convidados',
    items: [
      { label: 'Lista de Convidados', href: '/convidados', icon: Users },
      { label: 'Equipe & Colaboradores', href: '/equipe', icon: UserCheck },
      { label: 'Lua de Mel & Pós', href: '/pos-casamento', icon: Plane },
    ],
  },
  {
    title: 'Financeiro & Contratos',
    items: [
      { label: 'Orçamento & Custos', href: '/orcamento', icon: DollarSign },
      { label: 'Fornecedores', href: '/fornecedores', icon: Briefcase },
      { label: 'Documentos & Contratos', href: '/documentos', icon: FileText },
    ],
  },
  {
    title: 'Estilo & Design',
    items: [
      { label: 'Identidade Visual', href: '/estilo', icon: Palette },
      { label: 'Papelaria & Convites', href: '/papelaria', icon: Send },
      { label: 'Vestuário & Beleza', href: '/vestuario', icon: Shirt },
      { label: 'Decoração & Flores', href: '/decoracao', icon: Flower2 },
    ],
  },
  {
    title: 'Dia do Evento',
    items: [
      { label: 'Locais & Espaços', href: '/locais', icon: MapPin },
      { label: 'Cerimônia & Recepção', href: '/evento', icon: Utensils },
      { label: 'Planta de Mesas', href: '/mesas', icon: Grid },
      { label: 'Cronograma Dia H', href: '/dia-h', icon: Clock },
      { label: 'Fotos & Momentos', href: '/midia', icon: Camera },
    ],
  },
  {
    title: 'Site Público & Divulgação',
    items: [
      { label: 'Site do Casal & RSVP', href: '/site', icon: Globe },
      { label: 'Casamento Civil', href: '/civil', icon: FileText },
    ],
  },
  {
    title: 'Configurações & Segurança',
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
  const [searchTerm, setSearchTerm] = useState('');

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <aside className="workspace-sidebar sticky top-0 h-screen w-[17.5rem] border-r hidden md:flex flex-col no-print shrink-0 text-[#F4EBDD]">
      {/* Brand Header */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/dashboard" aria-label="Laçora — início">
          <LacoraLogo inverted />
        </Link>
      </div>

      {/* Contextual Search Bar */}
      <div className="px-4 pt-5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#C9BDAA] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="sidebar-search"
            aria-label="Buscar menu ou módulo"
            type="text"
            placeholder="Buscar módulo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-xs text-[#F4EBDD] placeholder:text-[#AB9F8D] bg-white/[0.06] border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-[#B86645] focus:border-transparent"
          />
        </div>
      </div>

      {/* Grouped Navigation Accordion */}
      <nav className="flex-1 px-4 py-5 space-y-4 overflow-y-auto min-h-0 [scrollbar-color:#60756d_transparent]">
        {navGroups.map((group) => {
          const isCollapsed = collapsedGroups[group.title];

          const filteredItems = searchTerm.trim()
            ? group.items.filter((item) =>
                item.label.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : group.items;

          if (searchTerm.trim() && filteredItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1">
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#AFA593] hover:text-[#F4EBDD] transition-colors"
              >
                <span>{group.title}</span>
                {isCollapsed && !searchTerm.trim() ? (
                  <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {(!isCollapsed || !!searchTerm.trim()) && (
                <div className="space-y-0.5">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-150',
                          isActive
                            ? 'bg-marsala-500 text-white font-semibold shadow-[0_8px_24px_rgba(13,26,23,0.2)]'
                            : 'text-[#E7DCCB] hover:bg-white/[0.07] hover:text-white'
                        )}
                      >
                        <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-[#BFB4A2]')} />
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
      <div className="px-5 py-4 border-t border-white/10 text-[10px] text-[#AFA593]">
        <span className="block text-[#D8CBB8]">O começo de uma vida a dois.</span>
        <span className="mt-0.5 block">Laçora &copy; {new Date().getFullYear()}</span>
      </div>
    </aside>
  );
};
