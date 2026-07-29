import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Laçora — Do primeiro plano ao grande dia',
    short_name: 'Laçora',
    description: 'Planejamento de casamentos: orçamento, convidados, RSVP, mesas e cronograma.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4EBDD',
    theme_color: '#213D36',
    icons: [
      {
        src: '/lacora-mark.svg',
        sizes: '80x80',
        type: 'image/svg+xml',
      },
    ],
  };
}
