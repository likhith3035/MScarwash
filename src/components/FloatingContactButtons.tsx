'use client';

import { useState } from 'react';
import { Phone, MessageSquare, X } from 'lucide-react';

export function FloatingContactButtons() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const whatsappUrl = `https://wa.me/918885426155?text=${encodeURIComponent(
    'Hi MS Car Wash! I would like to inquire about booking a vehicle wash.'
  )}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 flex items-center gap-2 bg-white/95 dark:bg-[#0E1420]/95 p-1.5 rounded-full border border-black/8 dark:border-white/10 shadow-lg backdrop-blur-md transition-all">
      {/* WhatsApp Mini Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xs"
        aria-label="WhatsApp Us"
        title="WhatsApp Us"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
      </a>

      {/* Call Mini Button */}
      <a
        href="tel:9494829450"
        className="p-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 transition-all shadow-xs"
        aria-label="Call 9494829450"
        title="Call 9494829450"
      >
        <Phone className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
      </a>

      {/* Close / Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all ml-0.5"
        aria-label="Hide contact buttons"
        title="Hide"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
