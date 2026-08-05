'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Tag, ShieldCheck, PhoneCall } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { label: t('home') || 'Home', href: '/', icon: Home },
    { label: t('book') || 'Book Wash', href: '/book', icon: Calendar, badge: 'Book' },
    { label: t('pricing') || 'Pricing', href: '/pricing', icon: Tag },
    { label: 'Admin', href: '/admin', icon: ShieldCheck },
    { label: 'Call Us', href: 'tel:9494829450', icon: PhoneCall, isExternal: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-[#0E1420]/95 backdrop-blur-xl border-t border-black/8 dark:border-white/10 shadow-2xl px-2 py-1.5 transition-all">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isExternal && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));

          if (item.isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors active:scale-95"
              >
                <div className="relative p-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[10px] font-extrabold uppercase mt-1 tracking-tight text-emerald-600 dark:text-emerald-400">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-slate-500 dark:text-slate-400'}`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-emerald-500 text-slate-950 text-[8px] font-black rounded-full uppercase tracking-tighter">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] uppercase tracking-tight mt-1 ${isActive ? 'font-black text-emerald-400' : 'font-semibold text-slate-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
