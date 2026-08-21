'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Tag, ShieldCheck, PhoneCall, Search } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Book', href: '/book', icon: Calendar },
    { label: 'Track', href: '/track', icon: Search },
    { label: 'Pricing', href: '/pricing', icon: Tag },
    { label: 'Admin', href: '/admin', icon: ShieldCheck },
    { label: 'Call', href: 'tel:8309390902', icon: PhoneCall, isExternal: true },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-[#0A0E17]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] py-1 px-1 transition-all"
    >
      <div className="grid grid-cols-6 items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.isExternal && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));

          if (item.isExternal) {
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center py-1 px-0.5 rounded-lg text-emerald-600 dark:text-emerald-400 hover:opacity-80 transition-all active:scale-95 text-center"
              >
                <div className="h-5 w-5 flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px] text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold tracking-tight mt-0.5 truncate w-full text-center leading-none text-emerald-600 dark:text-emerald-400">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all active:scale-95 text-center ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium'
              }`}
            >
              <div className="h-5 w-5 flex items-center justify-center relative">
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'text-slate-500 dark:text-slate-400'}`} />
              </div>
              <span className={`text-[10px] tracking-tight mt-0.5 truncate w-full text-center leading-none ${isActive ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'font-medium text-slate-500 dark:text-slate-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
