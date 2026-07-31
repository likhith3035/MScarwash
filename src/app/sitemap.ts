import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mscarwash.vercel.app';
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      images: ['https://mscarwash.vercel.app/logo.png'],
    },
    {
      url: `${baseUrl}/book`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
      images: ['https://mscarwash.vercel.app/logo.png'],
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      images: ['https://mscarwash.vercel.app/logo.png'],
    },
  ];
}
