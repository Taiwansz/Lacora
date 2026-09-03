import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Laçora — O nosso grande dia',
    short_name: 'Laçora',
    description: 'Nossa história, os detalhes da celebração e a lista de presentes.',
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
