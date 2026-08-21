import type { Metadata } from 'next';
import { BookingStatusTracker } from '@/components/BookingStatusTracker';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Vehicle Repair & Wash Status Tracker (Call: 8309390902) | MS Auto Care Srikalahasti',
  description: 'Track real-time status of your car mechanic repair, foam cleaning, or doorstep pickup in Srikalahasti. For urgent updates or inquiries call 8309390902.',
  keywords: [
    '8309390902',
    'MS Auto Care live tracker 8309390902',
    'track car repair status srikalahasti 8309390902',
    'track car wash status srikalahasti',
    'ms car wash live tracking',
    'ms car mechanic status skht',
    'car service tracking srikalahasti',
  ],
  alternates: {
    canonical: 'https://mscarwash.vercel.app/track',
  },
  openGraph: {
    title: 'Live Vehicle Repair & Wash Status Tracker — Call 8309390902 | MS Auto Care',
    description: 'Track live progress of your vehicle wash or mechanic service in Srikalahasti. Call 8309390902 for assistance.',
    url: 'https://mscarwash.vercel.app/track',
    siteName: 'MS Auto Care Srikalahasti (Call: 8309390902)',
    images: [{ url: '/logo.png', width: 500, height: 500, alt: 'MS Auto Care Tracker — Call 8309390902' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Vehicle Repair & Wash Status (Call: 8309390902) | MS Auto Care',
    description: 'Live vehicle repair & water wash progress tracker in Srikalahasti. Call 8309390902.',
    images: ['/logo.png'],
  },
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
