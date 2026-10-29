import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book All Vehicle Water Wash & Car Repairs Srikalahasti (Call: 8309390902) | MS Auto Care',
  description: '📞 Call 8309390902 or book online for doorstep pickup & center slots for ALL vehicles (Bikes, Autos, Cars, SUVs, Tractors, Trucks, JCB Earthmovers) & complete car repairs in Srikalahasti. 100% scratch-free wash & expert mechanics.',
  keywords: [
    '8309390902',
    'all vehicle wash booking srikalahasti',
    'book bike wash srikalahasti',
    'book tractor wash srikalahasti',
    'book jcb wash srikalahasti',
    'book truck wash srikalahasti',
    'book auto rickshaw wash srikalahasti',
    'madhu sujatha car wash booking',
    'book car repairs srikalahasti 8309390902',
    'book car mechanic srikalahasti 8309390902',
    'car repair booking skht',
    'car engine service booking srikalahasti',
    'car ac repair booking srikalahasti',
    'car brake service booking srikalahasti',
    'car oil change booking srikalahasti',
    'doorstep car wash pickup srikalahasti',
    'doorstep car repair pickup srikalahasti',
    'foam wash slot booking srikalahasti',
    'panagal car mechanic booking',
  ],
  alternates: {
    canonical: 'https://mscarwash.vercel.app/book',
  },
  openGraph: {
    title: 'Book All Vehicle Water Wash & Car Repairs — Call 8309390902 | MS Auto Care',
    description: '📞 Call 8309390902 to schedule doorstep pickup or drive-in slot for all vehicles (Bikes, Autos, Cars, Tractors, Trucks) & car repairs in Srikalahasti.',
    url: 'https://mscarwash.vercel.app/book',
    siteName: 'MS Auto Care — All Vehicle Water Wash & Car Repairs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MS Auto Care Booking — Call 8309390902' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book All Vehicle Water Wash & Repairs (Call: 8309390902) | MS Auto Care',
    description: 'Instant doorstep pickup or center slot booking in Srikalahasti for all vehicles. Call 8309390902.',
    images: ['/og-image.png'],
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
