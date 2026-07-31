import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MS Car Wash Srikalahasti',
    short_name: 'MS Car Wash',
    description: 'Top-rated car wash in Srikalahasti (SKHT). Scratch-free snow foam wash, pressure underbody rinse, doorstep pickup & slot booking.',
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
