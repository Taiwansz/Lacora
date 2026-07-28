import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nosso Grande Dia — Gestão de Casamentos SaaS',
    short_name: 'NossoGrandeDia',
    description: 'Plataforma SaaS para gestão de casamentos: orçamento, convidados, RSVP online, planta de mesas e cronograma.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF8F5',
    theme_color: '#8B263E',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
