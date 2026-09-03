import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/acesso',
          '/api/',
          '/dashboard',
          '/orcamento',
          '/convidados',
          '/rsvp/',
          '/onboarding',
          '/checklist',
          '/contingencia',
          '/fornecedores',
          '/documentos',
          '/estilo',
          '/vestuario',
          '/mesas',
          '/dia-h',
          '/civil',
          '/locais',
          '/evento',
          '/decoracao',
          '/pos-casamento',
          '/equipe',
          '/notificacoes',
          '/conta',
          '/assinatura',
          '/auditoria',
          '/configuracoes',
          '/midia',
          '/papelaria',
          '/site',
        ],
      },
    ],
    ...(baseUrl ? { sitemap: `${baseUrl}/sitemap.xml` } : {}),
  };
}
