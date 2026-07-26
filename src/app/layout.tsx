import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'Nosso Grande Dia — Gestão Inteligente de Casamentos',
  description: 'Plataforma SaaS completa, responsiva e PWA para gestão de casamentos: convidados, orçamento, cronograma, fornecedores e site público.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-charcoal flex min-h-screen antialiased selection:bg-rose-100 selection:text-marsala-500">
        {/* Sidebar Navigation for Desktop */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
          <Header />
          <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Mobile Navigation Bar */}
        <MobileNav />
      </body>
    </html>
  );
}
