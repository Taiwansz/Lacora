'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gift, LockKeyhole } from 'lucide-react';
import { LacoraLogo, LacoraMark } from '@/components/brand/LacoraLogo';

const PrivateWorkspaceShell = dynamic(
  () => import('./PrivateWorkspaceShell').then((module) => module.PrivateWorkspaceShell),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-[#f4ebdd] text-sm text-[#675d52]">
        Abrindo o espaço do casal...
      </div>
    ),
  }
);

const cleanPublicRoutes = new Set(['/acesso']);
const weddingPublicRoutes = new Set(['/', '/presentes']);

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/';

  if (cleanPublicRoutes.has(pathname)) return children;

  if (pathname.startsWith('/w/') || pathname.startsWith('/rsvp/') || /^\/site\/[^/]+\/?$/.test(pathname)) {
    return <main className="min-h-screen bg-[#f4ebdd] text-charcoal">{children}</main>;
  }

  if (weddingPublicRoutes.has(pathname)) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f4ebdd] text-charcoal selection:bg-[#ead5c6] selection:text-[#703920]">
        <header className="sticky top-0 z-40 border-b border-[#d9c7ad]/80 bg-[#f4ebdd]/90 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <Link href="/" aria-label="Laçora — início">
              <LacoraLogo className="gap-2.5 [&>div]:hidden sm:[&>div]:block" markClassName="h-9 w-9" />
            </Link>
            <nav className="hidden items-center gap-7 text-xs font-semibold text-[#62584d] md:flex" aria-label="Navegação do casamento">
              <Link href="/#nossa-historia" className="transition hover:text-[#a05235]">Nossa história</Link>
              <Link href="/#grande-dia" className="transition hover:text-[#a05235]">O grande dia</Link>
              <Link href="/presentes" className="transition hover:text-[#a05235]">Presentes</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/presentes" className="inline-flex items-center gap-2 rounded-full bg-[#213d36] px-3.5 py-2 text-[11px] font-bold text-white transition hover:bg-[#b86645] sm:px-4">
                <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Lista de presentes</span>
                <span className="sm:hidden">Presentes</span>
              </Link>
              <Link href="/acesso" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9c7ad] text-[#62584d] transition hover:border-[#b86645] hover:text-[#a05235]" aria-label="Área do casal">
                <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-[#102d28] px-5 py-12 text-[#cfc5b5] sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <LacoraMark inverted className="h-9 w-9" />
              <div>
                <span className="brand-wordmark block text-2xl text-[#f4ebdd]">Laçora</span>
                <span className="text-[9px] uppercase tracking-[.15em] text-[#a99e8e]">O começo da nossa vida a dois</span>
              </div>
            </div>
            <p className="max-w-md text-xs leading-5 text-[#a99e8e]">Feito com carinho para reunir nossa história, os detalhes da celebração e as pessoas que amamos.</p>
          </div>
        </footer>
      </div>
    );
  }

  return <PrivateWorkspaceShell>{children}</PrivateWorkspaceShell>;
}
