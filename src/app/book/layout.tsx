import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Car Repairs, Engine Service & Water Wash in Srikalahasti | MS Auto Care',
  description: 'Schedule instant doorstep pickup or drive-in slot for car repairs, engine diagnostics, oil change, brake/clutch service, AC gas top-up or scratch-free foam water wash in Srikalahasti (Panagal, near highway). Free water + tissue box with every wash. Call 8309390902.',
  keywords: [
    'MS Auto Care booking',
    'book car repairs srikalahasti',
    'book car mechanic srikalahasti',
    'car repair booking skht',
    'car engine service booking srikalahasti',
    'car ac repair booking srikalahasti',
    'car brake service booking srikalahasti',
    'car oil change booking srikalahasti',
    'book car wash srikalahasti',
    'doorstep car wash pickup srikalahasti',
    'doorstep car repair pickup srikalahasti',
    'foam wash slot booking srikalahasti',
    'bike wash booking srikalahasti',
    'ms car mechanic book online',
    'ms car wash book online',
    'panagal car mechanic booking',
  ],
  alternates: {
    canonical: 'https://mscarwash.vercel.app/book',
  },
  openGraph: {
    title: 'Book Car Repairs, Engine Service & Water Wash in Srikalahasti | MS Auto Care',
    description: 'Schedule doorstep pickup or drive-in slot for car repairs, engine service, AC gas top-up, or foam wash in Srikalahasti.',
    url: 'https://mscarwash.vercel.app/book',
    siteName: 'MS Auto Care — Car Mechanic & Car Wash Srikalahasti',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'MS Auto Care Booking Srikalahasti' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Car Repairs & Water Wash | MS Auto Care Srikalahasti',
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
