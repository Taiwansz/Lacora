'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { Sidebar } from './Sidebar';

export function PrivateWorkspaceShell({ children }: { children: React.ReactNode }) {
  const initializeSession = useAppStore((state) => state.initializeSession);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    initializeSession().finally(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, [initializeSession]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4ebdd] text-[#675d52]">
        <p className="text-sm">Abrindo o espaço do casal...</p>
      </div>
    );
  }

  return (
    <div className="workspace-shell flex min-h-screen bg-background text-charcoal antialiased selection:bg-rose-100 selection:text-marsala-500">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col pb-16 md:pb-0">
        <Header />
        <main className="workspace-content w-full flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8 xl:px-10 2xl:px-12">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}

