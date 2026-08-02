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
    default: 'MS Car Wash — Best Car & Water Wash in Srikalahasti (SKHT) | Near Highway',
    template: '%s | MS Car Wash Srikalahasti',
  },
  description: 'MS Car Wash (SKHT) — Top-rated car & water wash in Srikalahasti near highway & Panagal. 100% scratch-free foam washing, pressure underbody rinse, doorstep pickup & slot booking for cars, SUVs, bikes & commercial vehicles. Call 9494829450.',
  keywords: [
    'MS Car Wash',
    'MS Car Wash Srikalahasti',
    'ms car wash skht',
    'best car wash in srikalahasti',
    'best car wash skht',
    'car wash srikalahasti',
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
    'panagal water wash',
    'doorstep car wash srikalahasti',
    'foam car wash srikalahasti',
    'car pressure wash srikalahasti',
    'underbody wash srikalahasti',
    'bike wash srikalahasti',
    'bike water wash srikalahasti',
    'suv wash srikalahasti',
    'car polish srikalahasti',
    'auto detailing srikalahasti',
    'car cleaning services srikalahasti',
  ],
  authors: [{ name: 'MS Car Wash Srikalahasti', url: 'https://mscarwash.vercel.app' }],
  creator: 'MS Car Wash Team',
  publisher: 'MS Car Wash Srikalahasti',
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
    title: 'MS Car Wash (SKHT) — ⭐ 4.9 Top Rated Water & Car Wash in Srikalahasti',
    description: '🚘 100% Scratch-Free Foam Wash & Underbody Rinse | Doorstep Pickup & Slot Booking Available | Complimentary Water & Tissue Box | Call 9494829450',
    siteName: 'MS Car Wash Srikalahasti',
    images: [
      {
        url: 'https://mscarwash.vercel.app/logo.png',
        width: 1200,
        height: 630,
        alt: 'MS Car Wash Srikalahasti Logo & Premium Detailing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MS Car Wash Srikalahasti — Premium Doorstep & Slot Car Wash',
    description: '⭐ 4.9 Google Rated | Scratch-free foam wash & underbody pressure wash in Srikalahasti (SKHT). Book your slot online!',
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
      <body className="min-h-screen flex flex-col bg-[#FBFBFC] dark:bg-[#08080A] text-[#1D1D1F] dark:text-white antialiased transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
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
