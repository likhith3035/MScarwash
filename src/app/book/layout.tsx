import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Car Wash & Mechanic Slot | MS Car Mechanic & Car Wash Srikalahasti',
  description: 'Book instant doorstep car service, mechanic pickup or wash center slot in Srikalahasti (Panagal, near highway). 100% scratch-free foam washing, pressure underbody rinse & free water bottle + tissue box. Call 8309390902.',
  keywords: [
    'book car mechanic srikalahasti',
    'book car wash srikalahasti',
    'doorstep car wash pickup srikalahasti',
    'car repair booking skht',
    'foam wash slot booking srikalahasti',
    'bike wash booking srikalahasti',
    'ms car mechanic book online',
    'ms car wash book online',
  ],
  alternates: {
    canonical: 'https://mscarwash.vercel.app/book',
  },
  openGraph: {
    title: 'Book Doorstep Car Service or Center Slot | MS Car Mechanic & Car Wash Srikalahasti',
    description: 'Schedule doorstep pickup or drive-in slot for car repairs, SUV, bike or heavy vehicle in Srikalahasti.',
    url: 'https://mscarwash.vercel.app/book',
    siteName: 'MS Car Mechanic & Car Wash Srikalahasti',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'MS Car Mechanic & Car Wash Booking' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Service Slot | MS Car Mechanic & Car Wash Srikalahasti',
    description: 'Instant doorstep pickup or center slot booking in Srikalahasti near highway. Call 8309390902.',
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
