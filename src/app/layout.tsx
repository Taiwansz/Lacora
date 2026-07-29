import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';

export const metadata: Metadata = {
  metadataBase: new URL('https://nosso-grande-dia-omega.vercel.app'),
  title: {
    default: 'Laçora — Do primeiro plano ao grande dia',
    template: '%s | Laçora',
  },
  description:
    'Planejamento de casamentos em um só lugar: convidados, orçamento, cronograma, fornecedores, mesas e RSVP.',
  keywords: [
    'gestão de casamentos',
    'plataforma de casamento',
    'organizar casamento',
    'rsvp online',
    'orçamento de casamento',
    'planta de mesas',
    'cronograma dia h',
  ],
  authors: [{ name: 'Laçora' }],
  creator: 'Laçora',
  publisher: 'Laçora',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://nosso-grande-dia-omega.vercel.app',
    siteName: 'Laçora',
    title: 'Laçora — Do primeiro plano ao grande dia',
    description:
      'Plataforma SaaS inteligente para gestão de casamentos: convidados, orçamento, cronograma e RSVP seguro.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laçora — Do primeiro plano ao grande dia',
    description:
      'Plataforma SaaS inteligente para gestão de casamentos: convidados, orçamento, cronograma e RSVP seguro.',
  },
};

export const viewport: Viewport = {
  themeColor: '#213D36',
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
