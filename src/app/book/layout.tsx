import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Car Wash & Pickup Slot | MS Car Wash Srikalahasti',
  description: 'Book instant doorstep car wash pickup or wash center slot in Srikalahasti (Panagal, near highway). 100% scratch-free foam washing, pressure underbody rinse & free water bottle + tissue box.',
  keywords: [
    'book car wash srikalahasti',
    'doorstep car wash pickup srikalahasti',
    'car wash booking skht',
    'foam wash slot booking srikalahasti',
    'bike wash booking srikalahasti',
    'ms car wash book online',
  ],
  alternates: {
    canonical: 'https://mscarwash.vercel.app/book',
  },
  openGraph: {
    title: 'Book Doorstep Car Wash or Center Slot | MS Car Wash Srikalahasti',
    description: 'Schedule doorstep pickup or drive-in wash slot for car, SUV, bike or heavy vehicle in Srikalahasti.',
    url: 'https://mscarwash.vercel.app/book',
    siteName: 'MS Car Wash Srikalahasti',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'MS Car Wash Booking' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Car Wash Slot | MS Car Wash Srikalahasti',
    description: 'Instant doorstep pickup or center slot booking in Srikalahasti near highway. Call 9494829450.',
    images: ['/logo.png'],
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
