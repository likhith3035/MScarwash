import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MS Car Mechanic & Car Wash Srikalahasti',
    short_name: 'MS Car Mechanic & Wash',
    description: 'Top-rated car mechanic & car wash in Srikalahasti (SKHT). Full vehicle repairs, engine diagnostics, scratch-free foam wash, underbody rinse & doorstep pickup.',
    start_url: '/',
    display: 'standalone',
    background_color: '#08080A',
    theme_color: '#059669',
    icons: [
      {
        src: '/logo.png',
        sizes: '500x500',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
