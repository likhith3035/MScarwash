'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Tag, PhoneCall, Search, Sparkles } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isPricing = pathname === '/pricing';
  const isBook = pathname === '/book';
  const isTrack = pathname === '/track';

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/92 dark:bg-[#070B12]/95 backdrop-blur-2xl border-t border-black/[0.08] dark:border-white/[0.08] shadow-[0_-4px_25px_rgba(0,0,0,0.12)] transition-all"
      style={{ paddingBottom: 'max(0.4rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-5 items-center max-w-md mx-auto px-2 pt-1 pb-1">
        
        {/* 1. HOME */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 active:scale-90 ${
            isHome
              ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
          }`}
        >
          <div className="relative">
            <Home className="w-5 h-5" />
            {isHome && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Home</span>
        </Link>

        {/* 2. PRICING */}
        <Link
          href="/pricing"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 active:scale-90 ${
            isPricing
              ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
          }`}
        >
          <div className="relative">
            <Tag className="w-5 h-5" />
            {isPricing && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Rates</span>
        </Link>

        {/* 3. CENTER ELEVATED BOOK CTA */}
        <Link
          href="/book"
          className="flex flex-col items-center justify-center -mt-5 group active:scale-95 transition-transform duration-200"
        >
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/35 border-2 border-white dark:border-[#070B12] flex items-center justify-center transform group-hover:scale-105 transition-all relative">
            <Calendar className="w-6 h-6 fill-white/20" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white dark:border-[#070B12] animate-ping"></span>
          </div>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 tracking-wider uppercase mt-1">
            Book
          </span>
        </Link>

        {/* 4. TRACK LIVE STATUS */}
        <Link
          href="/track"
          className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 active:scale-90 ${
            isTrack
              ? 'text-emerald-600 dark:text-emerald-400 font-extrabold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
          }`}
        >
          <div className="relative">
            <Search className="w-5 h-5" />
            {isTrack && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]"></span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1">Track</span>
        </Link>

        {/* 5. DIRECT CALL DESK */}
        <a
          href="tel:8309390902"
          className="flex flex-col items-center justify-center py-1.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 active:scale-90"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-tight mt-1">
            Call
          </span>
        </a>

      </div>
    </nav>
  );
}
