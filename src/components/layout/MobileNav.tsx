'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CheckSquare, Users, DollarSign, Menu, X } from 'lucide-react';
import { navGroups } from './Sidebar';

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
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg text-[10px] font-medium text-slate-500 hover:text-charcoal"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end no-print">
          <div className="w-4/5 max-w-xs bg-surface h-full p-5 overflow-y-auto flex flex-col shadow-floating space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-serif font-bold text-base text-charcoal">Menu Completo</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {navGroups.map((group) => (
                <div key={group.title} className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block px-1">
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
                          className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-surface-muted"
                        >
                          <Icon className="w-4 h-4 text-slate-400" />
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
