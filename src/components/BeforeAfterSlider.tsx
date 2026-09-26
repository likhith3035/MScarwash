'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Droplets, CheckCircle2 } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage = '/gallery-foam-car.png',
  afterImage = '/gallery-car-shine.png',
  beforeLabel = 'DURING: Thick Snow Foam Bath',
  afterLabel = 'AFTER: Mirror Gloss Ceramic Finish',
}: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPos);
    setHasInteracted(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    },
    [handleMove]
  );

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Transformation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            See The Transformation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
            Drag the slider to compare rich foam cleaning with showroom mirror gloss.
          </p>
        </div>

        {/* Quick Position Presets */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSliderPos(20)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              sliderPos === 20
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-100 dark:bg-[#141C2B] text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:border-black/20'
            }`}
          >
            Foam Wash
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(50)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              sliderPos === 50
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-100 dark:bg-[#141C2B] text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:border-black/20'
            }`}
          >
            50/50 Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPos(80)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              sliderPos === 80
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-100 dark:bg-[#141C2B] text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:border-black/20'
            }`}
          >
            Full Shine
          </button>
        </div>
      </div>

      {/* Interactive Slider Frame */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onClick={(e) => handleMove(e.clientX)}
        className="relative w-full h-72 sm:h-[440px] md:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize select-none border-2 border-black/8 dark:border-white/10 shadow-2xl group bg-slate-900"
      >
        {/* Underneath Layer: AFTER IMAGE */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt="After mirror gloss finish"
            fill
            className="object-cover"
            priority
          />
          {/* AFTER Label Pill */}
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider border border-white/20 shadow-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{afterLabel}</span>
          </div>
        </div>

        {/* Top Layer: BEFORE IMAGE (Clipped by sliderPos percentage) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="relative w-full h-full min-w-[300px]" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}>
            <Image
              src={beforeImage}
              alt="Before foam wash treatment"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* BEFORE Label Pill */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider border border-white/20 shadow-lg flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>{beforeLabel}</span>
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular Grab Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white dark:bg-[#0E1420] border-2 border-emerald-500 shadow-2xl flex items-center justify-center text-slate-800 dark:text-white transition-transform group-hover:scale-110 active:scale-95">
            <div className="flex items-center gap-1 text-[11px] font-black">
              <span>❮</span>
              <span>❯</span>
            </div>
          </div>
        </div>

        {/* Helper Drag Hint (disappears once dragged) */}
        {!hasInteracted && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-bold shadow-xl border border-white/20 pointer-events-none animate-bounce flex items-center gap-2">
            <span>◂ Drag slider horizontally to compare ▸</span>
          </div>
        )}
      </div>

      {/* Feature Badges & Fast Action */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1420] border border-black/8 dark:border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> pH-Neutral Snow Foam
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Scratch-Free Mitts
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> UV Paint Shield Wax
          </span>
        </div>

        <Link
          href="/book"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <span>Get This Shine for Your Vehicle</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
