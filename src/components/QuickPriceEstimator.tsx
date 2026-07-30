'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Bike, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Gift } from 'lucide-react';

export function QuickPriceEstimator() {
  const [selectedCategory, setSelectedCategory] = useState<'car' | 'bike'>('car');
  const [selectedSegment, setSelectedSegment] = useState('Hatchback');

  const carTiers = [
    { segment: 'Hatchback', price: 350, examples: 'Alto, Swift, i10, WagonR' },
    { segment: 'Sedan', price: 450, examples: 'Honda City, Verna, Ciaz, Dzire' },
    { segment: 'Compact SUV', price: 500, examples: 'Venue, Brezza, Nexon, Sonet' },
    { segment: 'SUV / MUV', price: 600, examples: 'Creta, Innova, XUV700, Fortuner' },
  ];

  const bikeTiers = [
    { segment: 'Standard Bike', price: 100, examples: 'Splendor, Pulsar, Shine, FZ' },
    { segment: 'Premium / Cruiser', price: 150, examples: 'Royal Enfield Bullet, Dominar' },
    { segment: 'Scooter', price: 100, examples: 'Activa, Jupiter, Access, Ntorq' },
  ];

  const currentList = selectedCategory === 'car' ? carTiers : bikeTiers;
  const currentItem = currentList.find(i => i.segment === selectedSegment) || currentList[0];

  return (
    <div className="bento-card p-6 sm:p-8 rounded-3xl max-w-3xl mx-auto space-y-6">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Rate Estimator</span>
          </div>
          <h3 className="font-extrabold text-xl text-[#1D1D1F] dark:text-white tracking-tight">Calculate Your Wash Charges</h3>
        </div>

        {/* Category Segment Control */}
        <div className="p-1.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] border border-black/[0.06] dark:border-white/[0.06] flex gap-1 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('car');
              setSelectedSegment('Hatchback');
            }}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              selectedCategory === 'car'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-extrabold'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Four-Wheeler</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('bike');
              setSelectedSegment('Standard Bike');
            }}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              selectedCategory === 'bike'
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-extrabold'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Two-Wheeler</span>
          </button>
        </div>
      </div>

      {/* Segment Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {currentList.map((item) => {
          const isSelected = item.segment === selectedSegment;
          return (
            <button
              key={item.segment}
              type="button"
              onClick={() => setSelectedSegment(item.segment)}
              className={`p-3.5 rounded-2xl border text-center transition-all duration-200 ${
                isSelected
                  ? 'bg-[#1D1D1F] dark:bg-white text-white dark:text-black border-[#1D1D1F] dark:border-white font-extrabold shadow-xs scale-[1.02]'
                  : 'bg-[#FBFBFC] dark:bg-[#1C1C1F] border-black/[0.08] dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'
              }`}
            >
              <span className="text-xs block leading-snug">{item.segment}</span>
              <span className="text-[10px] font-bold block mt-1 opacity-80">₹{item.price}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Pricing Card Result */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFC] dark:bg-[#18181B] border border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-500">
              {currentItem.segment} Wash Package
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
              100% Scratch Free
            </span>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Popular models: <strong className="text-black dark:text-white">{currentItem.examples}</strong>
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Snow Foam Bath
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Underbody Rinse
            </span>
            <span className="flex items-center gap-1">
              <Gift className="w-3.5 h-3.5 text-amber-500" /> Free Water + Tissue
            </span>
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0 space-y-2">
          <div>
            <span className="text-xs text-neutral-400 font-medium block">Total Charge</span>
            <span className="text-3xl font-extrabold text-[#1D1D1F] dark:text-white block">
              ₹{currentItem.price}
            </span>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xs transition-all hover:scale-105"
          >
            <span>Book This Rate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
