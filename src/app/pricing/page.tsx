import Link from 'next/link';
import { Bike, Car, Gift, HelpCircle, Phone, MessageSquare, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { TWO_WHEELER_PRICING, FOUR_WHEELER_PRICING, ADD_ONS } from '@/lib/types';

export default function PricingPage() {
  const packages = [
    {
      name: 'Basic Express Wash',
      desc: 'Quick exterior foam bath & tire gloss for daily maintenance.',
      price: 'From ₹100',
      tag: 'Express',
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
      name: 'Executive Shine Detailing',
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
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clear & Transparent Rates</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Wash Package Pricing</h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto">
          No hidden charges. Upfront rates for bikes, scooters, hatchbacks, sedans & SUVs in Srikalahasti.
        </p>
      </div>

      {/* TIERED PACKAGE COMPARISON GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg, idx) => (
          <div
            key={idx}
            className={`bento-card p-6 rounded-3xl flex flex-col justify-between relative transition-all ${
              pkg.popular
                ? 'border-2 border-emerald-500 dark:border-emerald-400 shadow-md scale-[1.02]'
                : 'border border-black/[0.08] dark:border-white/[0.08]'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                {pkg.tag}
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{pkg.tag}</span>
                <h3 className="font-extrabold text-xl text-[#1D1D1F] dark:text-white mt-0.5">{pkg.name}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed mt-1">{pkg.desc}</p>
              </div>

              <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                <span className="text-2xl font-extrabold text-[#1D1D1F] dark:text-white block">{pkg.price}</span>
              </div>

              <ul className="space-y-2 pt-2 text-xs">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-medium">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
              <Link
                href="/book"
                className={`w-full py-3 rounded-full text-center font-extrabold text-xs block transition-all ${
                  pkg.popular
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                    : 'bg-[#1D1D1F] dark:bg-white text-white dark:text-black hover:opacity-90'
                }`}
              >
                Book {pkg.name}
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Two-Wheelers Table */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-extrabold text-lg text-[#1D1D1F] dark:text-white">
          <Bike className="w-5 h-5 text-neutral-500" />
          <h2>Two-Wheelers (Bikes & Scooters)</h2>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-xs text-xs">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 dark:bg-[#1C1C1F] border-b border-black/[0.08] dark:border-white/[0.08] text-neutral-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Examples</th>
                <th className="py-3.5 px-5 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] font-medium">
              {TWO_WHEELER_PRICING.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3.5 px-5 font-bold text-[#1D1D1F] dark:text-white">{item.segment}</td>
                  <td className="py-3.5 px-5 text-neutral-500">{item.examples}</td>
                  <td className="py-3.5 px-5 text-right font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Four-Wheelers Table */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 font-extrabold text-lg text-[#1D1D1F] dark:text-white">
          <Car className="w-5 h-5 text-neutral-500" />
          <h2>Four-Wheelers (Cars & SUVs)</h2>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-xs text-xs">
          <table className="w-full text-left">
            <thead className="bg-neutral-50 dark:bg-[#1C1C1F] border-b border-black/[0.08] dark:border-white/[0.08] text-neutral-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Car Segment</th>
                <th className="py-3.5 px-5">Models</th>
                <th className="py-3.5 px-5 text-right">Price</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] font-medium">
              {FOUR_WHEELER_PRICING.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3.5 px-5 font-bold text-[#1D1D1F] dark:text-white">{item.segment}</td>
                  <td className="py-3.5 px-5 text-neutral-500">{item.examples}</td>
                  <td className="py-3.5 px-5 text-right font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price on Request Callout + WhatsApp Quick Callback */}
      <div className="p-6 rounded-3xl bg-[#FBFBFC] dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] space-y-3 text-xs">
        <div className="flex items-center gap-2 font-extrabold text-[#1D1D1F] dark:text-white text-sm">
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>Truck / Van / Tractor / Auto / JCB — Price on Request</span>
        </div>
        <p className="text-neutral-500 leading-relaxed max-w-2xl">
          Washing charges vary depending on machinery size and heavy mud buildup. Contact our wash center team for instant custom quotes.
        </p>
        <div className="pt-2 flex flex-wrap gap-2">
          <a href="tel:9494829450" className="px-4 py-2.5 rounded-full bg-white dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-black dark:text-white font-bold flex items-center gap-1.5 shadow-xs">
            <Phone className="w-3.5 h-3.5 text-emerald-500" /> Call 9494829450
          </a>
          <a href="https://wa.me/918885426155?text=Hi%20MS%20Car%20Wash,%20I%20need%20a%20price%20quote%20for%20heavy%20vehicle%20wash." target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-full bg-emerald-600 text-white font-bold flex items-center gap-1.5 shadow-xs hover:bg-emerald-500">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Quote Request
          </a>
        </div>
      </div>

      {/* Perks CTA Banner */}
      <div className="p-8 rounded-3xl bg-[#1D1D1F] dark:bg-white text-white dark:text-black text-center space-y-3 shadow-md">
        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-400 dark:text-amber-600">
          <Gift className="w-4 h-4" /> Free Water Bottle + Car Tissue Box Included
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight">Ready to book your wash?</h2>
        <Link
          href="/book"
          className="inline-block px-7 py-3 rounded-full bg-white dark:bg-black text-black dark:text-white font-extrabold text-xs shadow-xs hover:scale-105 transition-all"
        >
          Book Pickup or Slot
        </Link>
      </div>

    </div>
  );
}
