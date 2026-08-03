import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Heart, Sparkles, Code, Star } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-[#04060A] text-slate-500 dark:text-slate-400 border-t border-black/[0.08] dark:border-white/[0.08] py-14 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-xl bg-white dark:bg-[#0D131D] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
                <Image
                  src="/logo.png"
                  alt="MS Car Wash"
                  width={36}
                  height={36}
                  className="w-9 h-9 object-contain"
                />
              </div>
              <div>
                <span className="text-slate-900 dark:text-white font-black text-base tracking-tight block">MS CAR WASH</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold tracking-widest uppercase">Srikalahasti</span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Srikalahasti’s #1 premium vehicle wash center. High-pressure foam wash, underbody blast, interior detailing & doorstep pickup service.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Open Daily: 7 AM – 10 PM</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-extrabold text-xs uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-bold">
              <li><Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home Page</Link></li>
              <li><Link href="/book" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Book Pickup or Slot</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Wash Rate Card</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-slate-900 dark:text-white font-extrabold text-xs uppercase tracking-wider mb-2">
              Contact & Location
            </h4>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti - 517644</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Open 7:00 AM – 10:00 PM Daily</span>
              </div>
            </div>

            {/* 1-Tap Direct Action Pills */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:9494829450"
                className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                <span>Call Desk: 9494829450</span>
              </a>
              <div className="flex gap-2">
                <a
                  href="https://wa.me/918885426155"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3 h-3 fill-current" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://maps.app.goo.gl/i8Wa5ef1dZZwnJmF9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-200/80 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-[11px] flex items-center justify-center gap-1.5 border border-black/5 dark:border-white/5 transition-all"
                >
                  <MapPin className="w-3 h-3 text-emerald-500" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>

          {/* Perks */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#0D131D] border border-black/[0.08] dark:border-white/[0.08] space-y-2.5 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 dark:text-white">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              <span>Free Wash Perks</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              Every single wash comes with a complimentary <strong className="text-slate-900 dark:text-white">Mineral Water Bottle</strong> & <strong className="text-slate-900 dark:text-white">Car Tissue Box</strong>.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-col md:flex-row items-center justify-between text-xs gap-3">
          <p>&copy; {new Date().getFullYear()} MS Car Wash Srikalahasti. All rights reserved.</p>
          
          <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Scratch-Free Snow Foam Technology
          </span>

          <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
            <span>Designed & Developed by</span>
            <a
              href="https://devlikhith.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-black text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-all px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 hover:scale-105"
            >
              <Code className="w-3.5 h-3.5 text-emerald-500" />
              <span>Likhith</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

