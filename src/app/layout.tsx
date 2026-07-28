import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://nossograndedia.com.br'),
  title: {
    default: 'Nosso Grande Dia — Gestão Comercial de Casamentos SaaS',
    template: '%s | Nosso Grande Dia',
  },
  description:
    'Plataforma SaaS inteligente para gestão de casamentos: convidados, orçamento, cronograma, fornecedores, planta de mesas e site público com RSVP.',
  keywords: [
    'gestão de casamentos',
    'plataforma de casamento',
    'organizar casamento',
    'rsvp online',
    'orçamento de casamento',
    'planta de mesas',
    'cronograma dia h',
  ],
  authors: [{ name: 'Nosso Grande Dia Tecnologia Ltda.' }],
  creator: 'Nosso Grande Dia Tecnologia Ltda.',
  publisher: 'Nosso Grande Dia Tecnologia Ltda.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://nossograndedia.com.br',
    siteName: 'Nosso Grande Dia',
    title: 'Nosso Grande Dia — Gestão Comercial de Casamentos SaaS',
    description:
      'Plataforma SaaS inteligente para gestão de casamentos: convidados, orçamento, cronograma e RSVP seguro.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosso Grande Dia — Gestão Comercial de Casamentos SaaS',
    description:
      'Plataforma SaaS inteligente para gestão de casamentos: convidados, orçamento, cronograma e RSVP seguro.',
  },
};

export const viewport: Viewport = {
  themeColor: '#8B263E',
  width: 'device-width',
  initialScale: 1,
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
