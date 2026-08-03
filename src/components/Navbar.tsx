'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Phone, CalendarCheck, Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
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
    <header className="sticky top-0 z-50 bg-[#F8FAF9]/80 dark:bg-[#06090E]/80 backdrop-blur-xl border-b border-black/[0.08] dark:border-white/[0.08] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative p-1.5 rounded-2xl bg-white dark:bg-[#0D131D] border border-black/[0.08] dark:border-white/[0.08] shadow-sm group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-300">
              <Image
                src="/logo.png"
                alt="MS Car Wash"
                width={40}
                height={40}
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                priority
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#06090E] animate-pulse"></span>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  MS CAR WASH
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold tracking-wider uppercase border border-emerald-500/20">
                  SKHT
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wide uppercase mt-0.5">
                Clean Car... Happy Ride!
              </span>
            </div>
          </Link>

          {/* Desktop Nav Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-200/50 dark:bg-[#0E1420]/80 p-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.06] shadow-inner backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 relative ${
                    isActive
                      ? 'bg-white dark:bg-emerald-600 text-black dark:text-white shadow-sm scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Small Round Language Icon Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-[#0D131D] text-slate-800 dark:text-white border border-black/[0.08] dark:border-white/[0.08] hover:scale-105 hover:border-emerald-500/50 transition-all flex items-center justify-center relative shadow-xs"
              title={`Switch language (Current: ${language === 'en' ? 'English' : 'Telugu'})`}
              aria-label="Toggle Language"
            >
              <Languages className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 text-[9px] font-extrabold leading-tight">
                {language === 'en' ? 'EN' : 'తె'}
              </span>
            </button>

            {/* Phone Call CTA */}
            <a
              href="tel:9494829450"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-slate-100 dark:bg-[#0D131D] text-slate-900 dark:text-white border border-black/[0.08] dark:border-white/[0.08] hover:bg-slate-200 dark:hover:bg-white/10 transition-all shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>9494829450</span>
            </a>

            {/* Book Now Button with Glow Accent */}
            <Link
              href="/book"
              className="hidden lg:flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.03] active:scale-[0.98]"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('bookWash')}</span>
            </Link>

            {/* Theme Switcher Button */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-[#0D131D] text-slate-700 dark:text-slate-300 border border-black/[0.08] dark:border-white/[0.08] hover:scale-105 transition-all shadow-xs"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}

