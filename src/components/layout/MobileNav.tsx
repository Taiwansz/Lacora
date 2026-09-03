'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CheckSquare, Users, DollarSign, Menu, X } from 'lucide-react';
import { navGroups } from './Sidebar';
import { LacoraLogo } from '@/components/brand/LacoraLogo';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainTabs = [
    { label: 'Início', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Tarefas', href: '/checklist', icon: CheckSquare },
    { label: 'Convidados', href: '/convidados', icon: Users },
    { label: 'Orçamento', href: '/orcamento', icon: DollarSign },
  ];

  return (
    <>
      {/* Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111B3A]/95 backdrop-blur-md border-t border-white/10 flex items-center justify-around py-2 px-1 no-print">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors',
                isActive ? 'text-[#D7A1AD] font-bold' : 'text-[#D8CBB8] hover:text-white'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium text-[#D8CBB8] hover:text-white"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu de Navegação Mobile"
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end no-print"
        >
          <div className="w-4/5 max-w-xs bg-[#111B3A] text-[#F8F1DF] h-full p-5 overflow-y-auto flex flex-col shadow-floating space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <LacoraLogo inverted />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#C5B9A7] hover:text-white"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {navGroups.map((group) => (
                <div key={group.title} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#AFA593] block px-1">
                    {group.title}
                  </span>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-2.5 p-2.5 rounded-lg text-xs font-medium transition-colors',
                          pathname === item.href
                            ? 'bg-marsala-500 text-white'
                            : 'text-[#E7DCCB] hover:bg-white/[0.07]'
                        )}
                      >
                          <Icon className="w-4 h-4 text-[#BFB4A2]" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
