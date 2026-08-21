import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MS Auto Care — Car Mechanic & Car Wash Srikalahasti',
    short_name: 'MS Auto Care',
    description: 'Top-rated car mechanic & car wash in Srikalahasti (SKHT). Full vehicle repairs, engine diagnostics, scratch-free foam wash, underbody rinse & doorstep pickup.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08080A',
    theme_color: '#059669',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
