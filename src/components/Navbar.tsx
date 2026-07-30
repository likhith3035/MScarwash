'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Phone, Menu, X, CalendarCheck, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/book', label: t('bookWash') },
    { href: '/pricing', label: t('pricing') },
    { href: '/admin', label: t('adminDesk') },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBFBFC]/85 dark:bg-[#08080A]/85 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#FAFAFA] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1 rounded-2xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-xs group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="MS Car Wash"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#1D1D1F] dark:text-white">
                  MS CAR WASH
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-neutral-500 dark:text-neutral-400 tracking-wide uppercase mt-0.5">
                Clean Car... Happy Ride!
              </span>
            </div>
          </Link>

          {/* Desktop Nav Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-[#E5E5EA]/50 dark:bg-[#1C1C1F]/60 p-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.06] shadow-xs">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-[#2C2C30] text-black dark:text-white shadow-xs'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Small Round Language Icon + Phone + Book + Theme */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Small Round Language Icon Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-800 dark:text-white border border-black/[0.08] dark:border-white/[0.08] hover:scale-105 transition-all flex items-center justify-center relative group"
              title={`Switch language (Current: ${language === 'en' ? 'English' : 'Telugu'})`}
              aria-label="Toggle Language"
            >
              <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded-full bg-black text-white dark:bg-white dark:text-black text-[9px] font-extrabold leading-tight">
                {language === 'en' ? 'EN' : 'తె'}
              </span>
            </button>

            {/* Phone Call CTA */}
            <a
              href="tel:9494829450"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-neutral-100 dark:bg-[#1C1C1F] text-[#1D1D1F] dark:text-white border border-black/[0.08] dark:border-white/[0.08] hover:bg-neutral-200 dark:hover:bg-[#2C2C30] transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>9494829450</span>
            </a>

            {/* Book Now Button */}
            <Link
              href="/book"
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#1D1D1F] dark:bg-white text-white dark:text-black shadow-xs hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{t('bookWash')}</span>
            </Link>

            {/* Theme Switcher Button */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-700 dark:text-neutral-300 border border-black/[0.08] dark:border-white/[0.08] hover:scale-105 transition-all"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-neutral-700" />
                )}
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-800 dark:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#08080A]/95 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                pathname === link.href
                  ? 'bg-neutral-100 dark:bg-[#1C1C1F] text-black dark:text-white'
                  : 'text-neutral-600 dark:text-neutral-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col gap-2">
            <a
              href="tel:9494829450"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-[#1C1C1F] text-xs font-bold text-black dark:text-white"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              <span>Call 9494829450</span>
            </a>
            <Link
              href="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1D1D1F] dark:bg-white text-white dark:text-black font-bold text-xs"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('bookWash')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
