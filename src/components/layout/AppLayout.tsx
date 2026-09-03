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
      <div className="flex min-h-screen items-center justify-center bg-[#F6F0DF] text-sm text-[#5F6170]">
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
    return <main className="min-h-screen bg-[#F6F0DF] text-charcoal">{children}</main>;
  }

  if (weddingPublicRoutes.has(pathname)) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F6F0DF] text-charcoal selection:bg-[#E4BBC4] selection:text-[#111B3A]">
        <header className="sticky top-0 z-40 border-b border-[#D8CDBD]/80 bg-[#F8F1DF]/92 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
            <Link href="/" aria-label="Laçora — início">
              <LacoraLogo className="gap-2.5 [&>div]:hidden sm:[&>div]:block" markClassName="h-9 w-9" />
            </Link>
            <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[.08em] text-[#4D536B] md:flex" aria-label="Navegação do casamento">
              <Link href="/#nossa-historia" className="transition hover:text-[#7A2738]">Nossa história</Link>
              <Link href="/#padrinhos" className="transition hover:text-[#7A2738]">Padrinhos</Link>
              <Link href="/#grande-dia" className="transition hover:text-[#7A2738]">O grande dia</Link>
              <Link href="/presentes" className="transition hover:text-[#7A2738]">Presentes</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/presentes" className="inline-flex items-center gap-2 rounded-full bg-[#7A2738] px-3.5 py-2 text-[11px] font-bold text-white transition hover:bg-[#5E1D2B] sm:px-4">
                <Gift className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Lista de presentes</span>
                <span className="sm:hidden">Presentes</span>
              </Link>
              <Link href="/acesso" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D8CDBD] text-[#4D536B] transition hover:border-[#7A2738] hover:text-[#7A2738]" aria-label="Área do casal">
                <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-[#090F24] px-5 py-12 text-[#D0CBC4] sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-3">
              <LacoraMark inverted className="h-9 w-9" />
              <div>
                <span className="brand-wordmark block text-2xl text-[#F8F1DF]">Laçora</span>
                <span className="text-[9px] uppercase tracking-[.15em] text-[#CBA0A9]">O começo da nossa vida a dois</span>
              </div>
            </div>
            <p className="max-w-md text-xs leading-5 text-[#AAA9B1]">Feito com carinho para reunir nossa história, os detalhes da celebração e as pessoas que amamos.</p>
          </div>
        </footer>
      </div>
    );
  }

  return <PrivateWorkspaceShell>{children}</PrivateWorkspaceShell>;
}
