import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';
import { StructuredData } from '@/components/StructuredData';
import { PwaInstallPrompt } from '@/components/PwaInstallPrompt';
import { MobileBottomNav } from '@/components/MobileBottomNav';
import { BrandOpeningSplash } from '@/components/BrandOpeningSplash';

export const metadata: Metadata = {
  metadataBase: new URL('https://mscarwash.vercel.app'),
  title: {
    default: 'MS Auto Care Srikalahasti (Call 8309390902) — #1 Car Repairs, Auto Repairs & Water Wash',
    template: '%s | MS Auto Care Srikalahasti (Call 8309390902)',
  },
  description: 'MS Auto Care Srikalahasti (Call 8309390902) — #1 rated center for car repairs, auto repairs, and water wash in Srikalahasti. Complete car mechanic services, engine diagnostics, oil change, brake overhaul, car AC gas refilling, 100% scratch-free foam washing & doorstep pickup.',
  keywords: [
    'water wash',
    'water wash srikalahasti',
    'car repairs',
    'car repairs srikalahasti',
    'auto repairs',
    'auto repairs srikalahasti',
    'car wash',
    'car wash srikalahasti',
    'best water wash in srikalahasti',
    'best car repairs in srikalahasti',
    'best auto repairs in srikalahasti',
    'auto repair shop srikalahasti',
    'car service srikalahasti',
    'water wash near me',
    'car repairs near me',
    'auto repairs near me',
    '8309390902',
    '+918309390902',
    'MS Auto Care 8309390902',
    'car mechanic srikalahasti 8309390902',
    'car wash srikalahasti 8309390902',
    'car breakdown srikalahasti 8309390902',
    'MS Auto Care',
    'MS Auto Care Srikalahasti',
    'MS Auto Care Car Mechanic & Car Wash',
    'ms auto care skht',
    'MS Car Mechanic & Car Wash',
    'MS Car Mechanic & Car Wash Srikalahasti',
    'MS Car mechanic & Car Wash Srikalahasti',
    'ms car mechanic',
    'ms car mechanics',
    'ms car mechanics srikalahasti',
    'car repairs srikalahasti',
    'best car mechanic shop near skht',
    'car mechanic shop near skht',
    'car mechanic srikalahasti',
    'best car mechanic in skht',
    'car repair srikalahasti',
    'car service center srikalahasti',
    'auto repair garage srikalahasti',
    'car breakdown service srikalahasti',
    'emergency car repair skht',
    'car breakdown assistance srikalahasti',
    'car engine service srikalahasti',
    'car engine diagnostic srikalahasti',
    'car oil change srikalahasti',
    'car synthetic oil service srikalahasti',
    'car ac repair srikalahasti',
    'car ac gas refill srikalahasti',
    'car brake repair srikalahasti',
    'car brake pad replacement srikalahasti',
    'car clutch repair srikalahasti',
    'car electrical repair srikalahasti',
    'car battery jumpstart srikalahasti',
    '24/7 highway breakdown assistance srikalahasti',
    'panagal car repair',
    'panagal car mechanic',
    'MS Car Wash',
    'MS Car Wash & Car Services',
    'water wash in srikalahasti',
    'best water wash in skht',
    'top water wash skht',
    'car water wash srikalahasti',
    'water wash skht',
    'skht car wash',
    'car wash skht',
    'car wash near me srikalahasti',
    'near highway car wash srikalahasti',
    'highway car wash srikalahasti',
    'panagal car wash srikalahasti',
    'doorstep car wash srikalahasti',
    'doorstep car repair srikalahasti',
    'foam car wash srikalahasti',
    'car pressure wash srikalahasti',
    'underbody wash srikalahasti',
    'bike wash srikalahasti',
    'suv wash srikalahasti',
    'car polish srikalahasti',
    'auto detailing srikalahasti',
    'car cleaning services srikalahasti',
    'శ్రీకాళహస్తి ఆటో కేర్',
    'శ్రీకాళహస్తి కార్ మెకానిక్ 8309390902',
    'శ్రీకాళహస్తి కార్ రిపేర్',
    'శ్రీకాళహస్తి కార్ రిపేర్ సర్వీస్',
    'శ్రీకాళహస్తి కార్ వాష్',
    'శ్రీకాళహస్తి వాటర్ వాష్',
    'శ్రీకాళహస్తి కార్ బ్రేక్‌డౌన్ సహాయం',
    'srikalahasti temple car wash',
    'tirupati srikalahasti car wash',
    'highway car mechanic panagal',
  ],
  authors: [
    { name: 'Naveen Kami (Naveen K) — Owner, MS Auto Care', url: 'https://mscarwash.vercel.app' },
    { name: 'MS Auto Care — Car Mechanic & Car Wash Srikalahasti (Call 8309390902)', url: 'https://mscarwash.vercel.app' },
    { name: 'Likhith', url: 'https://devlikhith.vercel.app/' },
  ],
  creator: 'Likhith (https://devlikhith.vercel.app/)',
  publisher: 'MS Auto Care Srikalahasti (8309390902)',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  other: {
    'geo.region': 'IN-AP',
    'geo.placename': 'Srikalahasti',
    'geo.position': '13.742436;79.683298',
    'ICBM': '13.742436, 79.683298',
    'contact:phone_number': '+918309390902',
    'owner': 'Naveen Kami (Naveen K)',
    'founder': 'Naveen Kami (Naveen K)',
    'business:contact_data:founder': 'Naveen Kami (Naveen K)',
  },
  verification: {
    google: 'Y9Pz6KKF2dRqhHD68hqf5NrUjcpR2ULh8je2rh_8Kyw',
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mscarwash.vercel.app',
    title: 'MS Auto Care Srikalahasti (Call: 8309390902) — ⭐ 4.9 Car Mechanic & Water Wash',
    description: '📞 Call 8309390902 for instant doorstep pickup, car mechanic repairs (engine, AC, brakes) & scratch-free snow foam wash in Srikalahasti (Panagal, near highway). 24/7 Breakdown Help.',
    siteName: 'MS Auto Care Srikalahasti (Call: 8309390902)',
    images: [
      {
        url: 'https://mscarwash.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MS Auto Care Srikalahasti — Call 8309390902',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MS Auto Care Srikalahasti (Call: 8309390902) — Car Repairs & Water Wash',
    description: '📞 Call 8309390902 — Top-rated car repairs, engine diagnostics, AC gas refilling & foam water wash in Srikalahasti.',
    images: ['https://mscarwash.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mscarwash.vercel.app',
    languages: {
      'en-IN': 'https://mscarwash.vercel.app',
      'te-IN': 'https://mscarwash.vercel.app',
      'x-default': 'https://mscarwash.vercel.app',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FAFCFA] dark:bg-[#05080D] text-slate-900 dark:text-white antialiased transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <BrandOpeningSplash />
            <Navbar />
            <main className="flex-1 pb-16 md:pb-0">
              {children}
            </main>
            <Footer />
            <FloatingContactButtons />
            <PwaInstallPrompt />
            <MobileBottomNav />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
