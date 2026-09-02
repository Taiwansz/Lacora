'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import Link from 'next/link';
import { LacoraLogo, LacoraMark } from '@/components/brand/LacoraLogo';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  const initializeSession = useAppStore((state) => state.initializeSession);
  const isReadOnlyMode = useAppStore((state) => state.isReadOnlyMode());

  const isPublicMarketingRoute =
    pathname === '/' ||
    pathname === '/termos' ||
    pathname === '/privacidade' ||
    pathname === '/suporte' ||
    pathname === '/contato';

  const isAuthRoute =
    pathname === '/login' ||
    pathname === '/cadastro' ||
    pathname === '/recuperar-senha';

  const isPublicWeddingOrRSVP =
    pathname.startsWith('/rsvp/') ||
    pathname.startsWith('/w/') ||
    (pathname.startsWith('/site/') && pathname !== '/site');

  const isOnboardingRoute = pathname === '/onboarding';
  const isPrivateWorkspaceRoute =
    !isPublicMarketingRoute &&
    !isAuthRoute &&
    !isPublicWeddingOrRSVP;
  const [sessionReady, setSessionReady] = useState(!isPrivateWorkspaceRoute);

  useEffect(() => {
    if (!isPrivateWorkspaceRoute) {
      return;
    }

    let active = true;
    setSessionReady(false);
    initializeSession().finally(() => {
      if (active) setSessionReady(true);
    });
    return () => {
      active = false;
    };
  }, [initializeSession, isPrivateWorkspaceRoute]);

  if (isPrivateWorkspaceRoute && !sessionReady) {
    return (
      <div className="min-h-screen bg-background text-charcoal flex items-center justify-center">
        <p className="text-sm text-slate-500">Carregando seu workspace...</p>
      </div>
    );
  }

  // 1. Marketing Layout
  if (isPublicMarketingRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-charcoal selection:bg-rose-100 selection:text-marsala-500">
        {/* Marketing Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-[#F4EBDD]/90 px-4 py-3.5 backdrop-blur-xl lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <Link href="/" aria-label="Laçora — página inicial">
              <LacoraLogo className="gap-2.5 [&>div]:hidden sm:[&>div]:block" markClassName="h-9 w-9" />
            </Link>

            <nav className="hidden items-center gap-7 text-xs font-semibold text-[#655B50] md:flex" aria-label="Navegação principal">
              <Link href="/#recursos" className="transition-colors hover:text-marsala-500">Produto</Link>
              <Link href="/#precos" className="transition-colors hover:text-marsala-500">Planos</Link>
              <Link href="/#faq" className="transition-colors hover:text-marsala-500">Dúvidas</Link>
              <Link href="/privacidade" className="transition-colors hover:text-marsala-500">Privacidade</Link>
            </nav>

            <div className="flex items-center gap-1 sm:gap-3">
              <Link href="/login" className="px-3 py-2 text-xs font-semibold text-charcoal transition-colors hover:text-marsala-500 sm:px-4">Entrar</Link>
              <Link href="/cadastro" className="brand-button-primary px-3.5 py-2 text-xs font-bold sm:px-4">Criar conta</Link>
            </div>
          </div>
        </header>

        {/* Marketing Main Content */}
        <main className="flex-1">{children}</main>

        {/* Marketing Footer */}
        <footer className="border-t border-border bg-[#183A33] px-4 py-14 text-xs text-[#CFC5B5] lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <LacoraMark className="h-9 w-9" inverted />
                <span className="brand-wordmark text-2xl text-[#F4EBDD]">Laçora</span>
              </div>
              <p className="leading-relaxed text-[#BDB2A1]">
                Do primeiro plano ao grande dia: decisões, pessoas e prazos no mesmo lugar.
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#E5A27A]">Produto</h4>
              <ul className="space-y-2">
                <li><Link href="/#recursos" className="hover:text-white">Conhecer a plataforma</Link></li>
                <li><Link href="/#precos" className="hover:text-white">Planos</Link></li>
                <li><Link href="/login" className="hover:text-white">Demonstração</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#E5A27A]">Informações</h4>
              <ul className="space-y-2">
                <li><Link href="/termos" className="hover:text-white">Termos de uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-white">Privacidade</Link></li>
                <li><Link href="/suporte" className="hover:text-white">Central de ajuda</Link></li>
                <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#E5A27A]">Princípio</h4>
              <p className="leading-relaxed text-[#BDB2A1]">
                Clareza para planejar, privacidade para compartilhar e calma para viver o processo.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-9 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center text-[10px] text-[#9F9585] sm:flex-row sm:text-left">
            <p>&copy; {new Date().getFullYear()} Laçora. Todos os direitos reservados.</p>
            <p>Planejamento de casamentos, do começo ao depois.</p>
          </div>
        </footer>
      </div>
    );
  }

  // 2. Auth Layout (Login, Registration, Password Recovery)
  if (isAuthRoute) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#EDE2D2] text-charcoal flex flex-col justify-center items-center p-4 selection:bg-rose-100 selection:text-marsala-500">
        <div className="absolute inset-x-0 top-0 h-2/5 bg-[url('/brand/lacora-ribbon-pattern.svg')] bg-cover bg-center opacity-100" />
        <div className="relative w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }

  // 3. Public Wedding Site & RSVP Layout (Clean view without admin controls)
  if (isPublicWeddingOrRSVP) {
    return (
      <div className="min-h-screen bg-background text-charcoal selection:bg-rose-100 selection:text-marsala-500">
        <main className="max-w-4xl mx-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    );
  }

  // 4. Onboarding Layout
  if (isOnboardingRoute) {
    return (
      <div className="min-h-screen bg-background text-charcoal selection:bg-rose-100 selection:text-marsala-500">
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
          {children}
        </div>
      </div>
    );
  }

  // 5. Authenticated Private Workspace Layout
  return (
    <div className="workspace-shell bg-background text-charcoal flex min-h-screen antialiased selection:bg-rose-100 selection:text-marsala-500">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header />
        <main className="workspace-content flex-1 w-full px-4 py-5 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 lg:py-8">
          <fieldset disabled={isReadOnlyMode} className="contents">
            {children}
          </fieldset>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
