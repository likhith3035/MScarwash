import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';

export const metadata: Metadata = {
  title: 'MS Car Wash — Clean Car... Happy Ride! | Srikalahasti',
  description: 'MS Car Wash in Srikalahasti, Andhra Pradesh. Doorstep pickup wash & slot booking. Foam wash, pressure wash, vacuum cleaning, polish & shine for cars, bikes, SUVs & heavy vehicles.',
  keywords: 'MS Car Wash, Car Wash Srikalahasti, Bike Wash Panagal, Doorstep Pickup Car Wash, Pressure Wash Srikalahasti',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
