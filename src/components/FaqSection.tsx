'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Search, X } from 'lucide-react';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'What is the full form of MS in MS Auto Care / MS Car Wash?',
      a: 'MS stands for Madhu Sujatha (Madhu Sujatha Auto Care & Water Wash). The workshop was named in honor of Madhu Sujatha and is owned and operated by Kami Naveen in Panagal, Srikalahasti.',
    },
    {
      q: 'Which is the top-rated car mechanic & water wash center in Srikalahasti (SKHT)?',
      a: 'MS Auto Care / Madhu Sujatha Car Wash (located opposite Old RTO Office, beside Bharat Petroleum in Panagal, Srikalahasti) is rated #1 for complete car repairs, engine diagnostic, high-pressure water washing, snow foam bath, and doorstep vehicle pickup.',
    },
    {
      q: 'Do you wash all vehicles including JCB, Tractors, Trucks, and Auto Rickshaws?',
      a: 'Yes, absolutely! At MS Auto Care (Madhu Sujatha Car Wash), we accept and wash ALL types of vehicles without exception — including JCB earthmovers, agricultural tractors, tipper lorries, heavy freight trucks, buses, auto rickshaws, commercial pickup vans (Tata Ace/Bolero), cars, SUVs, and bikes. Our wash bay is equipped with industrial-grade high-pressure water blasters to handle heavy red mud, farm soil, and construction grime. Call 8309390902 or send a WhatsApp message for instant quotes.',
    },
    {
      q: 'Do you provide bike water wash in Srikalahasti?',
      a: 'Yes! We provide a fast 20-minute foam and pressure water wash for all bikes, scooters, and Bullet motorcycles starting at just ₹100, complete with chain cleaning & lube.',
    },
    {
      q: 'How does doorstep Pickup Wash & Car Service work?',
      a: 'Our team comes to your home or office in Srikalahasti, picks up your vehicle, brings it to MS Car Mechanic & Car Wash center, performs full foam wash, repairs & underbody cleaning, and returns it spotless to your location.',
    },
    {
      q: 'Why do I need to book peak slots before 10 AM?',
      a: 'Peak hours (9 AM – 11 AM & 5 PM – 7 PM) fill up fast with local car owners and Tirupati travelers. Booking before 10 AM guarantees easy access without waiting in line.',
    },
    {
      q: 'Is the foam wash scratch-free for new cars?',
      a: 'Yes, we use 100% scratch-free microfiber wash mitts, neutral snow foam, and soft high-pressure nozzles safe for ceramic coatings and brand-new paint.',
    },
    {
      q: 'Who is the owner of MS Auto Care / MS Car Wash (Madhu Sujatha Auto Care)?',
      a: 'MS Auto Care (Madhu Sujatha Auto Care, also known as MS Car Care SKHT, MS Care, and MS Car Wash in Panagal, Srikalahasti) is owned and operated by Kami Naveen (also known as Naveen Kami / Naveen K). Kami Naveen founded the workshop and personally oversees multi-point vehicle diagnostics, engine repairs, and foam washing. For direct inquiries or quotes, contact Kami Naveen at 8309390902.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const sLower = searchQuery.toLowerCase().trim();
    if (!sLower) return true;

    const qLower = faq.q.toLowerCase();
    const aLower = faq.a.toLowerCase();

    // Direct match in question or answer
    if (qLower.includes(sLower) || aLower.includes(sLower)) return true;

    // Smart intent matching for owner, full form, and heavy vehicles
    const ownerTerms = ['owner', 'proprietor', 'founder', 'who owns', 'who runs', 'naveen', 'kami', 'kami naveen', 'naveen kami'];
    const isOwnerQuery = ownerTerms.some((term) => sLower.includes(term));
    if (isOwnerQuery && (qLower.includes('owner') || aLower.includes('kami naveen') || aLower.includes('naveen kami'))) return true;

    const fullFormTerms = ['full form', 'meaning', 'ms stands for', 'madhu', 'sujatha', 'what is ms'];
    const isFullFormQuery = fullFormTerms.some((term) => sLower.includes(term));
    if (isFullFormQuery && (qLower.includes('full form') || aLower.includes('madhu sujatha'))) return true;

    const heavyVehicleTerms = ['jcb', 'tractor', 'truck', 'lorry', 'bus', 'heavy', 'machinery', 'auto rickshaw', 'all vehicles'];
    const isHeavyQuery = heavyVehicleTerms.some((term) => sLower.includes(term));
    if (isHeavyQuery && (qLower.includes('jcb') || qLower.includes('vehicles') || aLower.includes('jcb') || aLower.includes('tractor'))) return true;

    // Multi-word token match
    const tokens = sLower.split(/\s+/).filter(Boolean);
    return tokens.every((token) => qLower.includes(token) || aLower.includes(token));
  });

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div className="text-center space-y-2 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Everything You Need To Know
        </h2>
      </div>

      {/* Interactive Search Bar */}
      <div className="relative max-w-md mx-auto mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search questions (e.g. pickup, bike, price, hours)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-[#0E1420] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx || searchQuery.length > 0;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-[#0E1420] border border-black/8 dark:border-white/8 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-black/5 dark:border-white/5">
                    <p className="pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 rounded-2xl bg-white dark:bg-[#0E1420] border border-black/8 dark:border-white/8 text-center space-y-2">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              No matching questions found for "{searchQuery}"
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 underline"
            >
              Clear search & view all questions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
