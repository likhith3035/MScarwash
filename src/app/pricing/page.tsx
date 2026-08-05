import type { Metadata } from 'next';
import Link from 'next/link';
import { Bike, Car, Gift, HelpCircle, Phone, MessageSquare, Check, Sparkles, ShieldCheck, ArrowRight, Wrench } from 'lucide-react';
import { TWO_WHEELER_PRICING, FOUR_WHEELER_PRICING, ADD_ONS } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Car & Bike Wash Package Pricing | MS Car Wash Srikalahasti',
  description: 'Transparent car & bike wash rates in Srikalahasti. Bike wash ₹100, Hatchback ₹350, Sedan ₹450, SUV ₹600. Includes free mineral water bottle + tissue box.',
  keywords: [
    'car wash price srikalahasti',
    'bike wash price srikalahasti',
    'foam wash cost skht',
    'car detailing package srikalahasti',
    'underbody wash rates srikalahasti',
    'ms car wash pricing',
  ],
  alternates: {
    canonical: 'https://mscarwash.vercel.app/pricing',
  },
  openGraph: {
    title: 'Car & Bike Wash Package Rates | MS Car Wash Srikalahasti',
    description: 'Upfront rates for bikes, scooters, hatchbacks, sedans & SUVs in Panagal, Srikalahasti. Free perks with every wash.',
    url: 'https://mscarwash.vercel.app/pricing',
    siteName: 'MS Car Wash Srikalahasti',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'MS Car Wash Pricing' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car & Bike Wash Pricing | MS Car Wash Srikalahasti',
    description: 'Clear pricing from ₹100 for bikes & ₹350 for cars in Srikalahasti. Call 9494829450.',
    images: ['/logo.png'],
  },
};

export default function PricingPage() {
  const packages = [
    {
      name: 'Basic Express Wash',
      desc: 'Quick exterior foam bath & tire gloss for daily maintenance.',
      price: 'From ₹100',
      tag: 'Express Clean',
      features: [
        'Exterior High-Pressure Rinse',
        'Snow Foam Bath',
        'Microfiber Hand Wipe',
        'Tire & Rim Scrubbing',
      ],
      popular: false,
    },
    {
      name: 'Standard Deep Wash',
      desc: 'Complete underbody blast, interior cabin vacuum & dashboard dusting.',
      price: 'From ₹350',
      tag: 'Most Popular',
      features: [
        'Everything in Express Wash',
        'Underbody Pressure Rinse',
        'Full Cabin Interior Vacuum',
        'Dashboard & Mat Cleaning',
        'Free Mineral Water Bottle',
      ],
      popular: true,
    },
    {
      name: 'Executive Detailing',
      desc: 'Full wash + body wax polish + interior sanitization + free perks.',
      price: 'From ₹500',
      tag: 'Deep Care',
      features: [
        'Everything in Standard Wash',
        'Body Wax Polish Coating',
        'Interior Deep Sanitization',
        'Free Mineral Water Bottle',
        'Free Car Tissue Box',
      ],
      popular: false,
    },
  ];

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 w-full space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clear & Transparent Rates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">Wash Package Pricing</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
          No hidden charges. Upfront rates for bikes, scooters, hatchbacks, sedans & SUVs in Srikalahasti.
        </p>
      </div>

      {/* TIERED PACKAGE COMPARISON GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-2xl flex flex-col justify-between relative transition-all duration-300 ${
              pkg.popular
                ? 'border-2 border-emerald-500 shadow-lg bg-slate-50 dark:bg-[#0E1420]'
                : 'border border-black/8 dark:border-white/8 bg-slate-50/50 dark:bg-[#0E1420]/50'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                ★ {pkg.tag} ★
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{pkg.tag}</span>
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white mt-1">{pkg.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium mt-1">{pkg.desc}</p>
              </div>

              <div className="pt-3 border-t border-black/8 dark:border-white/8">
                <span className="text-2xl font-black text-slate-900 dark:text-white block tracking-tight">{pkg.price}</span>
              </div>

              <ul className="space-y-2 pt-1 text-xs">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-black/8 dark:border-white/8">
              <Link
                href="/book"
                className={`w-full py-3 rounded-xl text-center font-black text-xs block transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs ${
                  pkg.popular
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950'
                }`}
              >
                Book {pkg.name}
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Two-Wheelers Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <Bike className="w-5 h-5 text-emerald-500" />
          <h2>Two-Wheelers (Bikes & Scooters)</h2>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 shadow-md text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 dark:bg-[#151D2A] border-b border-black/10 dark:border-white/10 text-slate-500 font-black uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Popular Models</th>
                <th className="py-4 px-6 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium">
              {TWO_WHEELER_PRICING.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-black text-slate-900 dark:text-white">{item.segment}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">{item.examples}</td>
                  <td className="py-4 px-6 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Four-Wheelers Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <Car className="w-5 h-5 text-emerald-500" />
          <h2>Four-Wheelers (Cars & SUVs)</h2>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 shadow-md text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-100 dark:bg-[#151D2A] border-b border-black/10 dark:border-white/10 text-slate-500 font-black uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Car Segment</th>
                <th className="py-4 px-6">Popular Models</th>
                <th className="py-4 px-6 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium">
              {FOUR_WHEELER_PRICING.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-black text-slate-900 dark:text-white">{item.segment}</td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400 font-medium">{item.examples}</td>
                  <td className="py-4 px-6 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Car Repairs & Mechanic Work - Inspection & Quote on Request */}
      <div className="p-7 rounded-3xl bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-500/20 space-y-4 text-xs shadow-md">
        <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base">
          <Wrench className="w-5 h-5 text-indigo-500" />
          <span>Car Repairs & Mechanic Work — Inspection & Quote</span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl text-xs">
          Repair charges for engine, brakes, AC gas, electrical, and suspension work depend on your vehicle model and spare parts needed. We provide a <strong>Comprehensive Vehicle Inspection & Upfront Quote</strong> before starting any repair.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <a href="tel:9494829450" className="px-5 py-3 rounded-full bg-indigo-600 text-white font-black flex items-center gap-2 shadow-md hover:bg-indigo-500 hover:scale-105 transition-all">
            <Phone className="w-4 h-4" /> Call Mechanic Desk: 9494829450
          </a>
          <a href="https://wa.me/918885426155?text=Hi%20MS%20Car%20Services,%20I%20need%20a%20car%20repair%20quote%20for%20my%20vehicle." target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black flex items-center gap-2 shadow-xs hover:scale-105 transition-all">
            <MessageSquare className="w-4 h-4 text-indigo-500" /> Request Repair Quote
          </a>
        </div>
      </div>

      {/* Price on Request Callout + WhatsApp Quick Callback */}
      <div className="p-7 rounded-3xl bg-slate-100 dark:bg-[#0D131D] border border-black/10 dark:border-white/10 space-y-4 text-xs shadow-md">
        <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Heavy Vehicles (Truck / Van / Tractor / Auto / JCB)</span>
        </div>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl text-xs">
          Washing charges vary depending on machinery size and mud accumulation. Contact our Srikalahasti wash center desk directly for instant quotes.
        </p>
        <div className="pt-2 flex flex-wrap gap-3">
          <a href="tel:9494829450" className="px-5 py-3 rounded-full bg-white dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-black flex items-center gap-2 shadow-xs hover:scale-105 transition-all">
            <Phone className="w-4 h-4 text-emerald-500" /> Call 9494829450
          </a>
          <a href="https://wa.me/918885426155?text=Hi%20MS%20Car%20Wash,%20I%20need%20a%20price%20quote%20for%20heavy%20vehicle%20wash." target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-full bg-emerald-600 text-white font-black flex items-center gap-2 shadow-md shadow-emerald-600/30 hover:bg-emerald-500 hover:scale-105 transition-all">
            <MessageSquare className="w-4 h-4" /> WhatsApp Quote Request
          </a>
        </div>
      </div>

      {/* Perks CTA Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-center space-y-4 shadow-xl">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 dark:text-amber-600">
          <Gift className="w-4 h-4 animate-pulse" /> Free Water Bottle + Car Tissue Box Included
        </span>
        <h2 className="text-3xl font-black tracking-tight">Ready to transform your ride?</h2>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/40 hover:scale-105 transition-all"
        >
          <span>Book Pickup or Wash Slot</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

