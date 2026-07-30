import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://mscarwash.vercel.app'),
  title: {
    default: 'MS Car Wash — Best Car Wash in Srikalahasti (SKHT) | Near Highway',
    template: '%s | MS Car Wash Srikalahasti',
  },
  description: 'MS Car Wash (SKHT) — Top-rated car wash in Srikalahasti near highway & Panagal. 100% scratch-free foam washing, pressure underbody rinse, doorstep pickup & slot booking for cars, SUVs, bikes & commercial vehicles. Call 9494829450.',
  keywords: [
    'MS Car Wash',
    'MS Car Wash Srikalahasti',
    'srikalahasti best car wash',
    'best car wash in srikalahasti',
    'near highway car wash srikalahasti',
    'highway car wash srikalahasti',
    'ms car wash skht',
    'skht car wash',
    'car wash skht',
    'panagal car wash srikalahasti',
    'doorstep car wash srikalahasti',
    'foam car wash srikalahasti',
    'bike wash srikalahasti',
    'suv wash srikalahasti',
    'car polish srikalahasti',
  ],
  authors: [{ name: 'MS Car Wash Srikalahasti' }],
  creator: 'MS Car Wash Team',
  publisher: 'MS Car Wash Srikalahasti',
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
    title: 'MS Car Wash — Best Car Wash in Srikalahasti (SKHT) | Near Highway',
    description: 'Top-rated car & bike wash center in Srikalahasti near highway, Panagal. Scratch-free foam wash, doorstep pickup & complimentary water bottle + tissue box.',
    siteName: 'MS Car Wash Srikalahasti',
    images: [
      {
        url: '/logo.png',
        width: 500,
        height: 500,
        alt: 'MS Car Wash Srikalahasti Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MS Car Wash — Best Car Wash in Srikalahasti (SKHT)',
    description: '100% scratch-free foam washing & doorstep vehicle pickup in Srikalahasti near highway. Call 9494829450.',
    images: ['/logo.png'],
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
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingContactButtons />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
