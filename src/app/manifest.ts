import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MS Auto Care — Car Mechanic & Car Wash Srikalahasti (8309390902)',
    short_name: 'MS Auto Care',
    description: 'Top-rated car mechanic & water wash in Srikalahasti (SKHT). Call 8309390902 for doorstep pickup, car repairs, engine service & foam wash.',
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
