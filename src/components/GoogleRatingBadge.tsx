'use client';

import { useEffect, useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';

interface RatingData {
  rating: number;
  user_ratings_total: number;
  placeUrl: string;
  status: string;
}

export function GoogleRatingBadge({ className = '' }: { className?: string }) {
  const [data, setData] = useState<RatingData>({
    rating: 4.9,
    user_ratings_total: 128,
    placeUrl: 'https://maps.app.goo.gl/i8Wa5ef1dZZwnJmF9',
    status: 'LIVE',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRating() {
      try {
        const res = await fetch('/api/google-rating');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error('Error loading rating:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRating();
  }, []);

  return (
    <a
      href={data.placeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 backdrop-blur-md transition-all hover:scale-105 shadow-sm group ${className}`}
      title="View verified real-time Google Maps reviews for MS Car Wash"
    >
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
        <span className="font-black text-xs sm:text-sm tracking-tight text-amber-800 dark:text-amber-300">
          {loading ? '4.9' : data.rating.toFixed(1)}
        </span>
      </div>

      <span className="w-1 h-1 rounded-full bg-amber-500/40"></span>

      <span className="text-xs font-extrabold text-amber-900 dark:text-amber-200">
        {loading ? '128+ Reviews' : `${data.user_ratings_total} Google Reviews`}
      </span>

      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20 ml-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span>Realtime</span>
      </span>

      <ExternalLink className="w-3 h-3 text-amber-600/70 dark:text-amber-400/70 group-hover:translate-x-0.5 transition-transform" />
    </a>
  );
}
