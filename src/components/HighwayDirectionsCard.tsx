'use client';

import { MapPin, Navigation, Phone, Clock, Compass, ExternalLink, ShieldCheck } from 'lucide-react';

export function HighwayDirectionsCard() {
  const directionsUrl = 'https://maps.app.goo.gl/i8Wa5ef1dZZwnJmF9';

  return (
    <div className="w-full rounded-3xl bg-gradient-to-br from-slate-900 via-[#0E1626] to-slate-950 text-white p-6 sm:p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Landmark & Proximity */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Prime Highway Location</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Easy To Find On Highway
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
              Located conveniently in <strong className="text-white">Panagal, Srikalahasti</strong> with massive turning space for large SUVs, trucks, and multi-vehicle parking.
            </p>
          </div>

          {/* Exact Address Box */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <address className="not-italic text-xs text-slate-200 font-bold leading-normal">
                Panagal, Opposite Old RTO Office, Beside Bharat Petroleum, Srikalahasti - 517644 (Near Highway)
              </address>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium pl-6">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Open 7:00 AM – 10:00 PM Daily • 24/7 Roadside Assistance</span>
            </div>
          </div>

          {/* Quick Distance Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] font-extrabold text-slate-300">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>2 Mins: Panagal Circle</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              <span>5 Mins: SKHT Temple</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 col-span-2 sm:col-span-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>35 Mins: Tirupati NH</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Navigation Actions */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
          <div className="space-y-1">
            <h4 className="text-base font-black text-white">Driving Down Right Now?</h4>
            <p className="text-xs text-slate-400 font-medium">
              Tap below to open Google Maps turn-by-turn live navigation directly to our workshop gate.
            </p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Navigation className="w-4 h-4 fill-current" />
            <span>Open in Google Maps Navigation</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>

          <a
            href="tel:8309390902"
            className="w-full py-3 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center justify-center gap-2 border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Call Workshop Desk: 8309390902</span>
          </a>

          <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Doorstep Vehicle Pickup & Drop Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}
