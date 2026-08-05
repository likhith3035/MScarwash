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

export const metadata: Metadata = {
  metadataBase: new URL('https://mscarwash.vercel.app'),
  title: {
    default: 'MS Car Wash & Car Services — Best Water Wash & Car Maintenance in Srikalahasti (SKHT)',
    template: '%s | MS Car Wash & Car Services Srikalahasti',
  },
  description: 'MS Car Wash & Car Services (SKHT) — Top-rated water wash, scratch-free foam washing, engine repairs, brake service, AC gas top-up, oil change & doorstep pickup in Srikalahasti. Call 9494829450.',
  keywords: [
    'MS Car Wash',
    'MS Car Wash & Car Services',
    'MS Car Wash Srikalahasti',
    'ms car mechanics',
    'ms car mechanics srikalahasti',
    'best car mechanic shop near skht',
    'car mechanic shop near skht',
    'car mechanic srikalahasti',
    'best car mechanic in skht',
    'car repair srikalahasti',
    'car service center srikalahasti',
    'car breakdown service srikalahasti',
    'emergency car repair skht',
    'car breakdown assistance srikalahasti',
    'car engine service srikalahasti',
    'car ac repair srikalahasti',
    'car brake repair srikalahasti',
    'car oil change srikalahasti',
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
    'panagal car repair',
    'doorstep car wash srikalahasti',
    'foam car wash srikalahasti',
    'car pressure wash srikalahasti',
    'underbody wash srikalahasti',
    'bike wash srikalahasti',
    'suv wash srikalahasti',
    'car polish srikalahasti',
    'auto detailing srikalahasti',
    'car cleaning services srikalahasti',
    'శ్రీకాళహస్తి కార్ వాష్',
    'శ్రీకాళహస్తి కార్ రిపేర్',
    'శ్రీకాళహస్తి కార్ మెకానిక్',
    'శ్రీకాళహస్తి వాటర్ వాష్',
    'srikalahasti temple car wash',
    'tirupati srikalahasti car wash',
  ],
  authors: [{ name: 'MS Car Wash & Car Services Srikalahasti', url: 'https://mscarwash.vercel.app' }],
  creator: 'MS Car Wash Team',
  publisher: 'MS Car Wash & Car Services Srikalahasti',
  manifest: '/manifest.webmanifest',
  other: {
    'geo.region': 'IN-AP',
    'geo.placename': 'Srikalahasti',
    'geo.position': '13.742436;79.683298',
    'ICBM': '13.742436, 79.683298',
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
    title: 'MS Car Wash & Car Services (SKHT) — ⭐ 4.9 Water Wash & Full Car Service Center',
    description: '🚘 Scratch-Free Foam Wash, Pressure Underbody Rinse & All Types of Car Repairs (Engine, Brakes, AC & Electrical) | Doorstep Pickup & Slot Booking | Call 9494829450',
    siteName: 'MS Car Wash & Car Services Srikalahasti',
    images: [
      {
        url: 'https://mscarwash.vercel.app/logo.png',
        width: 1200,
        height: 630,
        alt: 'MS Car Wash & Car Services Srikalahasti Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MS Car Wash & Car Services — Water Wash & Complete Car Mechanic Services',
    description: '⭐ 4.9 Rated Water Wash & All Types of Car Repairs in Srikalahasti (SKHT). Foam wash, engine repair, AC gas top-up, brake service & doorstep pickup!',
    images: ['https://mscarwash.vercel.app/logo.png'],
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
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
            <Navbar />
            <main className="flex-1 pb-20 md:pb-0">
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
