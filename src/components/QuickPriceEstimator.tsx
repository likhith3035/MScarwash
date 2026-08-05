'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Car, Bike, ShieldCheck, ArrowRight, CheckCircle2, Sparkles, Gift, Clock } from 'lucide-react';

export function QuickPriceEstimator() {
  const [selectedCategory, setSelectedCategory] = useState<'car' | 'bike' | 'repair'>('car');
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

  const repairTiers = [
    { segment: 'Engine Oil Change', price: 999, examples: 'Synthetic oil, oil filter & checkup' },
    { segment: 'Brake Service', price: 850, examples: 'Front/rear pads & disc check' },
    { segment: 'AC Gas Top-Up', price: 1200, examples: 'AC filter clean & cooling gas' },
    { segment: 'Electrical Fix', price: 450, examples: 'Battery, wiring & headlight fix' },
  ];

  const getList = () => {
    if (selectedCategory === 'car') return carTiers;
    if (selectedCategory === 'bike') return bikeTiers;
    return repairTiers;
  };

  const currentList = getList();
  const currentItem = currentList.find(i => i.segment === selectedSegment) || currentList[0];

  return (
    <div className="bento-card p-6 sm:p-9 rounded-3xl max-w-4xl mx-auto space-y-7 border border-black/[0.08] dark:border-white/[0.08] shadow-lg relative overflow-hidden">
      
      {/* Background Subtle Accent Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.08] dark:border-white/[0.08] pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-2 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Rate Estimator</span>
          </div>
          <h3 className="font-black text-2xl text-slate-900 dark:text-white tracking-tight">Calculate Wash & Service Rates</h3>
        </div>

        {/* Category Segment Control */}
        <div className="p-1.5 rounded-full bg-slate-200/80 dark:bg-[#0D131D] border border-black/[0.06] dark:border-white/[0.06] flex flex-wrap gap-1 text-xs font-bold shrink-0 shadow-inner">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('car');
              setSelectedSegment('Hatchback');
            }}
            className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              selectedCategory === 'car'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Car Wash</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('bike');
              setSelectedSegment('Standard Bike');
            }}
            className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              selectedCategory === 'bike'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Bike Wash</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('repair');
              setSelectedSegment('Engine Oil Change');
            }}
            className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
              selectedCategory === 'repair'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-black'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Car Repairs</span>
          </button>
        </div>
      </div>

      {/* Segment Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {currentList.map((item) => {
          const isSelected = item.segment === selectedSegment;
          return (
            <button
              key={item.segment}
              type="button"
              onClick={() => setSelectedSegment(item.segment)}
              className={`p-4 rounded-2xl border text-center transition-all duration-200 relative ${
                isSelected
                  ? selectedCategory === 'repair'
                    ? 'bg-indigo-600 text-white border-indigo-600 font-black shadow-md scale-[1.03]'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white font-black shadow-md scale-[1.03]'
                  : 'bg-white dark:bg-[#0D131D] border-black/[0.08] dark:border-white/[0.08] text-slate-700 dark:text-slate-300 hover:border-emerald-500/50'
              }`}
            >
              <span className="text-xs font-black block leading-snug">{item.segment}</span>
              <span className={`text-xs font-extrabold block mt-1.5 px-2 py-0.5 rounded-full w-max mx-auto ${
                isSelected ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-100 dark:bg-white/10 text-emerald-600 dark:text-emerald-400'
              }`}>
                {selectedCategory === 'repair' ? 'Get Quote' : `₹${item.price}`}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Pricing Card Result */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#06090E] border border-black/[0.08] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-inner">
        <div className="space-y-2.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {currentItem.segment} Service Package
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-black border border-emerald-500/20">
              {selectedCategory === 'repair' ? 'Inspection & Diagnosis' : '100% Scratch Free'}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
            Service details: <strong className="text-slate-900 dark:text-white font-bold">{currentItem.examples}</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 pt-1 text-xs font-bold text-slate-700 dark:text-slate-300">
            {selectedCategory === 'repair' ? (
              <>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> Computer Diagnosis
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> Expert Mechanic
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" /> Genuine Spare Parts
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Snow Foam Bath
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Underbody Rinse
                </span>
                <span className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-amber-500 shrink-0 animate-pulse" /> Free Water + Tissue Box
                </span>
              </>
            )}
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0 space-y-2.5 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-black/10 dark:border-white/10">
          <div>
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">Est. Cost</span>
            <span className="text-2xl font-black text-slate-900 dark:text-white block tracking-tight">
              {selectedCategory === 'repair' ? 'Quote on Request' : `₹${currentItem.price}`}
            </span>
          </div>

          <Link
            href={selectedCategory === 'repair' ? `/book?service=Repair&type=${encodeURIComponent(currentItem.segment)}` : `/book?vehicle=${selectedCategory === 'bike' ? 'Bike' : 'Car'}`}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 ${
              selectedCategory === 'repair' ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
            }`}
          >
            <span>Book {currentItem.segment}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}

