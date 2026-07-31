'use client';

import { useState } from 'react';
import { Sparkles, SlidersHorizontal, ShieldCheck, Droplets } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-black/[0.1] dark:border-white/[0.1] shadow-2xl bg-slate-950 select-none group">
      
      {/* Container aspect ratio */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[460px]">
        
        {/* AFTER WASH IMAGE (Layer 1 - Bottom: Deep Emerald Gloss & Clean Visual) */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full bg-[#06141B]">
            {/* Ambient Gloss Background Effects */}
            <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10 animate-bounce">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-widest border border-emerald-500/30 shadow-xs">
                AFTER MS FOAM WASH & GLOSS POLISH
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                100% Scratch-Free Metallic Mirror Shine
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/90 max-w-md font-medium leading-relaxed">
                Crystal clean paint, wet-look tire shine, underbody mud removal & sanitized cabin interior.
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-4 h-4" /> 100% Paint Safe
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                  <Droplets className="w-4 h-4" /> Snow Foam Bath
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE WASH IMAGE (Layer 2 - Top clipped: Dusty Muddy Visual) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-[100vw] max-w-4xl h-full bg-[#18110B]">
            {/* Dusty Background Effects */}
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-700/20 blur-3xl pointer-events-none"></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6 space-y-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <SlidersHorizontal className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-500/30 shadow-xs">
                BEFORE WASH (DIRTY HIGHWAY MUD)
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-amber-100/90 tracking-tight">
                Highway Dust, Bugs & Mud Buildup
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 max-w-md font-medium leading-relaxed">
                Stubborn road grime, dried splash marks, dusty glass & stained wheels before detailing.
              </p>
            </div>
          </div>
        </div>

        {/* SLIDER DIVIDER LINE & GLOWING DRAGGER HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-white to-cyan-400 shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-ew-resize z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-white dark:bg-[#06090E] text-slate-900 dark:text-white border-2 border-emerald-500 shadow-2xl shadow-emerald-500/50 flex items-center justify-center shrink-0 -translate-x-1/2 hover:scale-115 active:scale-95 transition-transform duration-150">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400 rotate-90" />
          </div>
        </div>

        {/* RANGE INPUT INTERACTION */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          aria-label="Before and after car wash comparison slider"
        />

      </div>

      {/* Helper label below */}
      <div className="p-3.5 bg-slate-900 text-slate-300 text-center text-xs font-bold flex items-center justify-center gap-2 border-t border-white/10">
        <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
        <span>Drag or click slider left/right to compare vehicle before & after MS Car Wash</span>
      </div>

    </div>
  );
}

