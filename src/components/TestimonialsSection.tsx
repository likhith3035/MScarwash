'use client';

import { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, ExternalLink, ThumbsUp, Sparkles } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  location: string;
  vehicle: string;
  rating: number;
  date: string;
  review: string;
  tag: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Kishore Reddy',
    role: 'Local Car Owner',
    location: 'Panagal, Srikalahasti',
    vehicle: 'Maruti Suzuki Swift Dzire',
    rating: 5,
    date: 'February 2025',
    review:
      'Best car wash in Srikalahasti! Completely scratch-free snow foam and the underbody pressure washing blasted off all the sticky highway mud. Complimentary chilled water bottle and tissue box were a wonderful touch!',
    tag: 'Snow Foam Wash',
  },
  {
    id: 2,
    name: 'Venkatesh Babu',
    role: 'Daily Commuter',
    location: 'Srikalahasti Town',
    vehicle: 'Royal Enfield Bullet 350',
    rating: 5,
    date: 'January 2025',
    review:
      'Quick 20-minute bike foam wash with chain cleaning and lube at just ₹100. The wash staff is very polite and takes care of electrical sensors. Definitely my go-to wash center in SKHT.',
    tag: 'Bike Wash',
  },
  {
    id: 3,
    name: 'Ravi Kumar',
    role: 'Highway Traveler',
    location: 'Tirupati – Chennai Route',
    vehicle: 'Hyundai Creta (Diesel)',
    rating: 5,
    date: 'January 2025',
    review:
      'Got a flat tire and engine temperature spike near Srikalahasti highway. Called their 24/7 breakdown helpline, and their mechanic arrived on the spot with jumpstart equipment within 25 minutes. Lifesavers!',
    tag: '24/7 Breakdown SOS',
  },
  {
    id: 4,
    name: 'Dr. Harish Varma',
    role: 'Resident',
    location: 'Subba Reddy Colony, SKHT',
    vehicle: 'Honda City',
    rating: 5,
    date: 'December 2024',
    review:
      'Booked doorstep pickup wash from my clinic. They picked up the vehicle, did deep foam washing, underbody rinse, and vacuumed the interior thoroughly. Returned on time in showroom shine condition.',
    tag: 'Doorstep Pickup',
  },
];

export function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredReviews =
    activeTab === 'All'
      ? REVIEWS
      : REVIEWS.filter((r) => r.tag.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Loved By 5,000+ Drivers
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Real feedback from car owners, commuters, and highway travelers in Srikalahasti.
          </p>
        </div>

        {/* Google Rating Hero Badge */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1420] border border-black/8 dark:border-white/10 shadow-sm flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-black text-xl">
            4.9
          </div>
          <div>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
              128+ Reviews on Google Maps
            </div>
            <a
              href="https://share.google/bN5KNns6mgg3uI4tP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 mt-0.5"
            >
              <span>Write a Google Review</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#0E1420] border border-black/8 dark:border-white/10 shadow-sm hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              {/* Top Row: Stars + Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                  {rev.tag}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                "{rev.review}"
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    {rev.name}
                  </span>
                  <span title="Verified Customer">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {rev.vehicle} • {rev.location}
                </div>
              </div>

              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">
                {rev.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
