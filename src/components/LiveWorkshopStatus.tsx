'use client';

import { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';

interface LiveWorkshopStatusProps {
  compact?: boolean;
}

export function LiveWorkshopStatus({ compact = false }: LiveWorkshopStatusProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [currentIstTime, setCurrentIstTime] = useState('');

  useEffect(() => {
    setMounted(true);

    const updateStatus = () => {
      const now = new Date();
      // IST offset is UTC + 5:30 (330 minutes)
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utcTime + 330 * 60000);

      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();

      // Open from 7:00 AM to 10:00 PM IST (7 to 21 inclusive)
      const open = hours >= 7 && hours < 22;
      setIsOpen(open);

      const formattedTime = istDate.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setCurrentIstTime(formattedTime);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 text-xs font-bold border border-black/5 dark:border-white/5">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span>Checking Workshop Status...</span>
      </div>
    );
  }

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black transition-all ${
          isOpen
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
          }`}
        ></span>
        <span>{isOpen ? 'Open Now (7 AM – 10 PM)' : 'Closed • 24/7 Breakdown SOS Active'}</span>
      </div>
    );
  }

  return (
    <div className="p-3.5 sm:p-4 rounded-2xl bg-white/80 dark:bg-[#0E1420]/80 backdrop-blur-md border border-black/8 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
            isOpen
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
          }`}
        >
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            ></span>
            <span className="font-black text-slate-900 dark:text-white tracking-tight text-xs sm:text-sm">
              {isOpen ? 'Workshop Open Now' : 'Closed for the Night (Opens 7 AM)'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/10 text-[10px] font-extrabold text-slate-600 dark:text-slate-300">
              IST {currentIstTime}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {isOpen
              ? '3 Wash Bays Active • ~15 Min Turnaround • Walk-ins & Pickup Accepted'
              : 'Emergency roadside mechanic assistance available on highway 24/7'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <a
          href="tel:8309390902"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
          <span>Call Desk</span>
        </a>
      </div>
    </div>
  );
}
