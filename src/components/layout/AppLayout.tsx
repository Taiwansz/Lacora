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
      setSessionReady(true);
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
        <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border px-4 lg:px-8 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <LacoraLogo compact markClassName="h-9 w-9" />
            <div>
              <span className="brand-wordmark text-2xl text-charcoal block leading-none">Laçora</span>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Gestão de casamentos</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <Link href="/#recursos" className="hover:text-marsala-500 transition-colors">
              Recursos
            </Link>
            <Link href="/#precos" className="hover:text-marsala-500 transition-colors">
              Planos & Preços
            </Link>
            <Link href="/#faq" className="hover:text-marsala-500 transition-colors">
              Dúvidas Frequentes
            </Link>
            <Link href="/privacidade" className="hover:text-marsala-500 transition-colors">
              Privacidade & Segurança
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-xs font-semibold text-charcoal hover:text-marsala-500 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="px-4 py-2 bg-marsala-500 hover:bg-marsala-600 text-white font-bold text-xs rounded-xl shadow-card transition-colors"
            >
              Criar Conta Grátis
            </Link>
          </div>
        </header>

        {/* Marketing Main Content */}
        <main className="flex-1">{children}</main>

        {/* Marketing Footer */}
        <footer className="bg-surface border-t border-border py-12 px-4 lg:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <LacoraMark className="h-8 w-8" />
                <span className="brand-wordmark text-2xl text-charcoal">Laçora</span>
              </div>
              <p className="text-slate-500 leading-relaxed">
                A plataforma SaaS inteligente para organização de casamentos. Gestão de convidados, controle orçamentário, cronograma e site público com RSVP.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-charcoal mb-3 uppercase tracking-wider text-[11px]">Produto</h4>
              <ul className="space-y-2">
                <li><Link href="/#recursos" className="hover:text-marsala-500">Recursos Mapeados</Link></li>
                <li><Link href="/#precos" className="hover:text-marsala-500">Planos Comerciais</Link></li>
                <li><Link href="/login" className="hover:text-marsala-500">Modo de Demonstração</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-charcoal mb-3 uppercase tracking-wider text-[11px]">Legal & Segurança</h4>
              <ul className="space-y-2">
                <li><Link href="/termos" className="hover:text-marsala-500">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-marsala-500">Política de Privacidade</Link></li>
                <li><Link href="/suporte" className="hover:text-marsala-500">Central de Ajuda</Link></li>
                <li><Link href="/contato" className="hover:text-marsala-500">Contato Comercial</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-charcoal mb-3 uppercase tracking-wider text-[11px]">Compromisso</h4>
              <p className="text-slate-500 leading-relaxed">
                Controles de acesso, criptografia em trânsito e recursos desenvolvidos com privacidade desde a concepção.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} Laçora. Todos os direitos reservados.</p>
            <p className="text-[11px]">Segurança e privacidade acompanhadas continuamente.</p>
          </div>
        </footer>
      </div>
    );
  }

  // 2. Auth Layout (Login, Registration, Password Recovery)
  if (isAuthRoute) {
    return (
      <div className="min-h-screen bg-background text-charcoal flex flex-col justify-center items-center p-4 selection:bg-rose-100 selection:text-marsala-500">
        <div className="w-full max-w-md">
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
