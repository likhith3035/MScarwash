'use client';

import { useState } from 'react';
import { Phone, MessageSquare, X, AlertTriangle } from 'lucide-react';
import { EmergencySosModal } from './EmergencySosModal';

export function FloatingContactButtons() {
  const [dismissed, setDismissed] = useState(false);
  const [showSosModal, setShowSosModal] = useState(false);

  const whatsappUrl = `https://wa.me/918309390902?text=${encodeURIComponent(
    'Hi MS Car Mechanic & Car Wash! I would like to inquire about booking a vehicle service or wash.'
  )}`;

  return (
    <>
      <EmergencySosModal isOpen={showSosModal} onClose={() => setShowSosModal(false)} />

      {!dismissed && (
        <div className="fixed bottom-20 md:bottom-6 right-3.5 z-40 flex items-center gap-1.5 bg-white/95 dark:bg-[#0E1420]/95 p-1 rounded-full border border-black/8 dark:border-white/10 shadow-lg backdrop-blur-md transition-all">
          {/* Emergency SOS Button */}
          <button
            type="button"
            onClick={() => setShowSosModal(true)}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-rose-600/30 hover:scale-105 active:scale-95 transition-all animate-pulse"
            title="24/7 Highway Breakdown Assistance SOS"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SOS</span>
          </button>

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
            href="tel:8309390902"
            className="p-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 transition-all shadow-xs"
            aria-label="Call 8309390902"
            title="Call 8309390902"
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
      )}
    </>
  );
}
