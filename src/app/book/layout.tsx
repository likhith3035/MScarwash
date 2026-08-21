import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Car Repairs & Water Wash Srikalahasti (Call: 8309390902) | MS Auto Care',
  description: '📞 Call 8309390902 or book online for instant doorstep pickup, car mechanic repairs, engine diagnostics, oil change, AC gas top-up & foam water wash in Srikalahasti. Free water bottle + car tissue box.',
  keywords: [
    '8309390902',
    'MS Auto Care booking 8309390902',
    'book car repairs srikalahasti 8309390902',
    'book car mechanic srikalahasti 8309390902',
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
    title: 'Book Car Repairs & Water Wash in Srikalahasti — Call 8309390902 | MS Auto Care',
    description: '📞 Call 8309390902 to schedule doorstep pickup or drive-in slot for car repairs, engine service, AC gas top-up, or foam wash in Srikalahasti.',
    url: 'https://mscarwash.vercel.app/book',
    siteName: 'MS Auto Care Srikalahasti (Call: 8309390902)',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'MS Auto Care Booking — Call 8309390902' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Car Repairs & Water Wash (Call: 8309390902) | MS Auto Care',
    description: 'Instant doorstep pickup or center slot booking in Srikalahasti. Call 8309390902.',
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
