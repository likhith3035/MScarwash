import type { Metadata } from 'next';
import { BookingStatusTracker } from '@/components/BookingStatusTracker';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Track Live Vehicle Wash & Repair Status — MS Car Mechanic & Car Wash',
  description: 'Check real-time status of your vehicle water wash, foam cleaning, or car mechanic repair in Srikalahasti. Enter phone number or MSCW booking ID.',
};

export default function TrackPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-[#0E1420] text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-black/8 dark:border-white/8 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Tracker Container */}
      <BookingStatusTracker />
    </div>
  );
}
