'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which is the top-rated water wash & car wash center in Srikalahasti (SKHT)?',
      a: 'MS Car Wash (located opposite Old RTO Office, beside Bharat Petroleum in Panagal, Srikalahasti) is rated #1 for high-pressure water washing, snow foam bath, underbody mud removal, and doorstep vehicle pickup.'
    },
    {
      q: 'Do you provide bike water wash in Srikalahasti?',
      a: 'Yes! We provide a fast 20-minute foam and pressure water wash for all bikes, scooters, and Bullet motorcycles starting at just ₹100, complete with chain cleaning & lube.'
    },
    {
      q: 'How does doorstep Pickup Wash work?',
      a: 'Our wash boy comes to your home or office in Srikalahasti, picks up your vehicle, brings it to MS Car Wash center, performs a full foam wash & underbody cleaning, and returns it spotless to your location.'
    },
    {
      q: 'Why do I need to book peak slots before 10 AM?',
      a: 'Peak hours (9 AM – 11 AM & 5 PM – 7 PM) fill up fast with local car owners and Tirupati travelers. Booking before 10 AM guarantees easy access without waiting in line.'
    },
    {
      q: 'Are the drinking water bottle and tissue box really free?',
      a: 'Yes, 100% free with every wash service! Every single vehicle wash comes with a complimentary chilled mineral water bottle and dashboard car tissue paper box.'
    },
    {
      q: 'What are the washing charges for heavy commercial vehicles (Truck, Tractor, JCB)?',
      a: 'Prices for heavy vehicles (Trucks, Vans, Tractors, Auto Rickshaws, and JCB machinery) vary depending on size and mud buildup. You can call us at 9494829450 or send a WhatsApp message for an instant quote.'
    },
    {
      q: 'Is the foam wash scratch-free for new cars?',
      a: 'Yes, we use 100% scratch-free microfiber wash mitts, neutral snow foam, and soft high-pressure nozzles safe for ceramic coatings and brand-new paint.'
    }
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-xs font-semibold text-neutral-600 dark:text-neutral-300">
          <HelpCircle className="w-3.5 h-3.5 text-[#D97757]" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white">
          Everything You Need To Know
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white dark:bg-[#141416] border border-[#E5E5EA] dark:border-[#27272A] overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#1D1D1F] dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-black dark:text-white' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-[#E5E5EA]/50 dark:border-[#27272A]/50">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
