import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nosso-grande-dia-omega.vercel.app';

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
