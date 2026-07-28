import type { Metadata } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  title: 'Nosso Grande Dia — Gestão Comercial de Casamentos',
  description: 'Plataforma SaaS inteligente para gestão de casamentos: convidados, orçamento, cronograma, fornecedores e site público com RSVP.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-background text-charcoal antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
