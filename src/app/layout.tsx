import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppLayout } from '@/components/layout/AppLayout';

const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(publicSiteUrl ? { metadataBase: new URL(publicSiteUrl) } : {}),
  title: {
    default: 'Laçora — O nosso grande dia',
    template: '%s | Laçora',
  },
  description:
    'Conheça a nossa história, veja os detalhes do grande dia e encontre a lista de presentes.',
  keywords: [
    'casamento',
    'site dos noivos',
    'lista de presentes',
    'nosso grande dia',
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
    ...(publicSiteUrl ? { url: publicSiteUrl } : {}),
    siteName: 'Laçora',
    title: 'Laçora — O nosso grande dia',
    description:
      'Conheça a nossa história, veja os detalhes do grande dia e encontre a lista de presentes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laçora — O nosso grande dia',
    description:
      'Conheça a nossa história, veja os detalhes do grande dia e encontre a lista de presentes.',
  },
};

export const viewport: Viewport = {
  themeColor: '#111B3A',
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
