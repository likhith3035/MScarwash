'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getBookings } from '@/lib/supabase';
import { Booking } from '@/lib/types';
import { generateInvoicePDF } from '@/lib/invoice-generator';
import {
  Search,
  CheckCircle2,
  Clock,
  Car,
  Wrench,
  Sparkles,
  Gift,
  FileText,
  Phone,
  MessageSquare,
  Star,
  Loader2,
  AlertCircle,
  Calendar,
  MapPin,
  Share2,
} from 'lucide-react';

const STATUS_STEPS = [
  { key: 'pending', label: 'Booking Confirmed', desc: 'Slot booked & technician assigned' },
  { key: 'in_progress', label: 'Service / Wash Active', desc: 'Scratch-free foam wash or mechanic work in progress' },
  { key: 'completed', label: 'Ready & Quality Checked', desc: 'Free water bottle + tissue box loaded' },
];

function TrackerContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<Booking[]>([]);

  const performSearch = async (searchTerm: string) => {
    const cleanQuery = searchTerm.trim().toUpperCase();
    if (!cleanQuery) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const all = await getBookings();
      const matched = all.filter((b) => {
        const idMatch = b.id.toUpperCase().includes(cleanQuery);
        const phoneMatch = b.phone.replace(/\D/g, '').includes(cleanQuery.replace(/\D/g, ''));
        return idMatch || (cleanQuery.length >= 4 && phoneMatch);
      });
      setResults(matched);
    } catch (err) {
      console.warn('Error fetching booking tracker:', err);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Auto-search if URL contains ?id=... or ?phone=...
  useEffect(() => {
    const idParam = searchParams.get('id');
    const phoneParam = searchParams.get('phone');
    const initialQuery = idParam || phoneParam;
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [searchParams]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await performSearch(query);
  };

  const getStepIndex = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'in_progress':
        return 1;
      case 'completed':
        return 2;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Search Bar Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#0E1420] border border-black/8 dark:border-white/8 shadow-xl relative overflow-hidden">
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Live Vehicle Service Tracker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Track Your Wash & Repair Status
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Enter your 10-digit Phone Number or Booking ID (e.g. <code className="font-bold text-emerald-600">MSCW-1024</code>)
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="Enter Phone Number or MSCW-ID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track Vehicle</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results List */}
      {hasSearched && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
          {results.length === 0 ? (
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0E1420] border border-black/8 dark:border-white/8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                No Active Bookings Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                We couldn&apos;t find any records matching &quot;{query}&quot;. Please double-check your phone number or call our desk at{' '}
                <a href="tel:8309390902" className="text-emerald-600 dark:text-emerald-400 font-bold underline">
                  8309390902
                </a>.
              </p>
            </div>
          ) : (
            results.map((booking) => {
              const currentStepIdx = getStepIndex(booking.status);
              const isCancelled = booking.status === 'cancelled';

              return (
                <div
                  key={booking.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E1420] border border-black/8 dark:border-white/8 shadow-xl space-y-6"
                >
                  {/* Top Meta Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-black/8 dark:border-white/8">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-lg text-slate-900 dark:text-white">
                          {booking.id}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                            booking.status === 'completed'
                              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                              : booking.status === 'in_progress'
                              ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 animate-pulse'
                              : isCancelled
                              ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                              : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {booking.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 font-bold">
                        <Car className="w-3.5 h-3.5 text-slate-400" />
                        <span>{booking.vehicleType} • {booking.vehicleModel}</span>
                        <span>•</span>
                        <span>{booking.name}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-500 block">Total Amount</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        ₹{booking.totalAmount || 350}
                      </span>
                    </div>
                  </div>

                  {/* Visual Stepper */}
                  {!isCancelled ? (
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Live Progress Pipeline
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {STATUS_STEPS.map((step, idx) => {
                          const isPast = idx < currentStepIdx;
                          const isCurrent = idx === currentStepIdx;

                          return (
                            <div
                              key={step.key}
                              className={`p-3.5 rounded-2xl border transition-all ${
                                isCurrent
                                  ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/30'
                                  : isPast
                                  ? 'bg-slate-100/70 dark:bg-[#151D2A] border-emerald-500/30 text-slate-700 dark:text-slate-300'
                                  : 'bg-slate-50 dark:bg-[#121824] border-black/5 dark:border-white/5 opacity-50 text-slate-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-black uppercase tracking-wider">
                                  Step 0{idx + 1}
                                </span>
                                {isPast || isCurrent ? (
                                  <CheckCircle2
                                    className={`w-4 h-4 ${
                                      isCurrent
                                        ? 'text-emerald-600 dark:text-emerald-400 animate-bounce'
                                        : 'text-emerald-500'
                                    }`}
                                  />
                                ) : (
                                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                                )}
                              </div>
                              <h5 className="text-xs font-black leading-tight">{step.label}</h5>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                                {step.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>This booking was marked as cancelled. Please contact our desk for rebooking.</span>
                    </div>
                  )}

                  {/* Included Perks & Details Strip */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#151D2A] border border-black/5 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold">
                      <Gift className="w-4 h-4" />
                      <span>Complimentary Water Bottle & Car Tissue Box Included</span>
                    </div>
                    {booking.mode === 'pickup' && booking.address && (
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-bold">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Doorstep: {booking.address}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: Invoice, Review, WhatsApp & Share */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {booking.status === 'completed' && (
                        <button
                          type="button"
                          onClick={() => generateInvoicePDF(booking)}
                          className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
                        >
                          <FileText className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                          <span>Download Tax Invoice</span>
                        </button>
                      )}

                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `🚗 *MS Car Mechanic & Car Wash Srikalahasti — Live Status*\nVehicle: ${booking.vehicleType} (${booking.vehicleModel})\nStatus: ${booking.status.toUpperCase()}\nBooking ID: ${booking.id}\nTrack Live: https://mscarwash.vercel.app/track?id=${booking.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
                        title="Share live tracking link with family or driver"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share Tracking</span>
                      </a>

                      <a
                        href={`https://wa.me/918309390902?text=${encodeURIComponent(
                          `Hi MS Car Mechanic Desk! I am checking on my booking #${booking.id} (${booking.vehicleModel}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-white" />
                        <span>WhatsApp Desk</span>
                      </a>
                    </div>

                    <a
                      href="tel:8309390902"
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20 font-bold text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Call 8309390902</span>
                    </a>
                  </div>

                </div>
              );
            })
          )}
        </div>
      )}

    </div>
  );
}

export function BookingStatusTracker() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xs font-bold text-slate-400">Loading tracker...</div>}>
      <TrackerContent />
    </Suspense>
  );
}
