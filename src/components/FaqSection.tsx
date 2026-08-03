'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Search, X } from 'lucide-react';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Which is the top-rated water wash & car wash center in Srikalahasti (SKHT)?',
      a: 'MS Car Wash (located opposite Old RTO Office, beside Bharat Petroleum in Panagal, Srikalahasti) is rated #1 for high-pressure water washing, snow foam bath, underbody mud removal, and doorstep vehicle pickup.',
    },
    {
      q: 'Do you provide bike water wash in Srikalahasti?',
      a: 'Yes! We provide a fast 20-minute foam and pressure water wash for all bikes, scooters, and Bullet motorcycles starting at just ₹100, complete with chain cleaning & lube.',
    },
    {
      q: 'How does doorstep Pickup Wash work?',
      a: 'Our wash boy comes to your home or office in Srikalahasti, picks up your vehicle, brings it to MS Car Wash center, performs a full foam wash & underbody cleaning, and returns it spotless to your location.',
    },
    {
      q: 'Why do I need to book peak slots before 10 AM?',
      a: 'Peak hours (9 AM – 11 AM & 5 PM – 7 PM) fill up fast with local car owners and Tirupati travelers. Booking before 10 AM guarantees easy access without waiting in line.',
    },
    {
      q: 'Are the drinking water bottle and tissue box really free?',
      a: 'Yes, 100% free with every wash service! Every single vehicle wash comes with a complimentary chilled mineral water bottle and dashboard car tissue paper box.',
    },
    {
      q: 'What are the washing charges for heavy commercial vehicles (Truck, Tractor, JCB)?',
      a: 'Prices for heavy vehicles (Trucks, Vans, Tractors, Auto Rickshaws, and JCB machinery) vary depending on size and mud buildup. You can call us at 9494829450 or send a WhatsApp message for an instant quote.',
    },
    {
      q: 'Is the foam wash scratch-free for new cars?',
      a: 'Yes, we use 100% scratch-free microfiber wash mitts, neutral snow foam, and soft high-pressure nozzles safe for ceramic coatings and brand-new paint.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
