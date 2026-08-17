'use client';

import { useState } from 'react';
import { AlertTriangle, MapPin, Phone, MessageSquare, ShieldAlert, ArrowRight, Wrench, BatteryCharging, Flame } from 'lucide-react';
import { EmergencySosModal } from './EmergencySosModal';

export function HomeEmergencySosBanner() {
  const [showSosModal, setShowSosModal] = useState(false);

  return (
    <>
      <EmergencySosModal isOpen={showSosModal} onClose={() => setShowSosModal(false)} />

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950/40 via-red-950/20 to-[#0E1420] border-2 border-rose-500/30 p-6 sm:p-8 shadow-xl">
        {/* Glow Element */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-black uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>24/7 Roadside Assistance</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Vehicle Breakdown on Srikalahasti – Tirupati Highway?
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
              Dead battery, flat tire, engine overheating, or sudden breakdown near Panagal or highway? Share your live GPS pin with 1 tap for instant on-spot mechanic dispatch.
            </p>

            {/* Quick Pill Features */}
            <div className="flex flex-wrap gap-2 pt-1 text-xs font-bold text-slate-300">
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                <BatteryCharging className="w-3.5 h-3.5 text-amber-400" /> Battery Jumpstart
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-indigo-400" /> On-Spot Mechanic
              </span>
              <span className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> 1-Tap GPS Share
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setShowSosModal(true)}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Launch Emergency Breakdown SOS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:8309390902"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-black text-xs flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Helpline: 8309390902</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
