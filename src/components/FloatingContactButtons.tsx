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
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 bg-white/90 dark:bg-[#1F1E1C]/90 p-1.5 rounded-full border border-[#E6E4DF] dark:border-[#2E2D29] shadow-lg backdrop-blur-md transition-all">
      {/* WhatsApp Mini Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
        aria-label="WhatsApp Us"
        title="WhatsApp Us"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
      </a>

      {/* Call Mini Button */}
      <a
        href="tel:9494829450"
        className="p-2.5 rounded-full bg-[#D97757] hover:bg-[#C15C3D] text-white transition-all"
        aria-label="Call 9494829450"
        title="Call 9494829450"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Close / Dismiss Button */}
      <button
        onClick={() => setDismissed(true)}
        className="p-1.5 rounded-full text-[#78756D] hover:text-[#1F1E1D] dark:hover:text-white transition-all ml-0.5"
        aria-label="Hide contact buttons"
        title="Hide"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
