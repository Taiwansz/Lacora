import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'M & V — O nosso grande dia',
    short_name: 'M & V',
    description: 'Nossa história, os detalhes da celebração e a lista de presentes.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8F1DF',
    theme_color: '#111B3A',
    icons: [
      {
        src: '/identity/mv-monogram-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
