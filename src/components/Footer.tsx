import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0A0A0B] text-neutral-500 dark:text-neutral-400 border-t border-[#E5E5EA] dark:border-[#2C2C2E] py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="MS Car Wash"
                width={36}
                height={36}
                className="w-9 h-9 object-contain"
              />
              <span className="text-black dark:text-white font-extrabold text-base tracking-tight">MS CAR WASH</span>
            </div>
            <p className="text-xs leading-relaxed">
              Srikalahasti’s vehicle wash center. Professional foam wash, pressure wash, interior cleaning & doorstep pickup.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-black dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/book" className="hover:text-black dark:hover:text-white transition-colors">Book Wash</Link></li>
              <li><Link href="/pricing" className="hover:text-black dark:hover:text-white transition-colors">Pricing Tiers</Link></li>
              <li><Link href="/admin" className="hover:text-black dark:hover:text-white transition-colors">Admin Desk</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-black dark:text-white font-bold text-xs uppercase tracking-wider mb-3">
              Contact & Location
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti - 517644</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <a href="tel:9494829450" className="hover:text-black dark:hover:text-white font-semibold">9494829450 / 8309390902</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <a href="https://wa.me/918885426155" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 font-semibold">WhatsApp: 8885426155</a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>7:00 AM – 10:00 PM Daily</span>
              </li>
            </ul>
          </div>

          {/* Perks */}
          <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#121214] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-black dark:text-white">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Complimentary Perks</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Every wash includes a <span className="font-semibold text-black dark:text-white">Free Water Bottle</span> and <span className="font-semibold text-black dark:text-white">Free Tissue Box</span>.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-[#E5E5EA] dark:border-[#2C2C2E] flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <p>&copy; {new Date().getFullYear()} MS Car Wash Srikalahasti.</p>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Scratch Free Water Wash
          </span>
        </div>
      </div>
    </footer>
  );
}
