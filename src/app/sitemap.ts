import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nossograndedia.com.br';

  const publicRoutes = [
    '',
    '/termos',
    '/privacidade',
    '/suporte',
    '/contato',
    '/login',
    '/cadastro',
    '/recuperar-senha',
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
