import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://nossograndedia.com.br';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
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
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
