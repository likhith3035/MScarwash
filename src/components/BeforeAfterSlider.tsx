'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-[#E5E5EA] dark:border-[#27272A] shadow-xl bg-black select-none">
      
      {/* Container aspect ratio */}
      <div className="relative w-full h-[280px] sm:h-[380px] md:h-[440px]">
        
        {/* AFTER WASH IMAGE (Layer 1 - Bottom) */}
        <div className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-full bg-slate-900">
            {/* Glossy Clean Car Visual representation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-emerald-950/80 via-slate-900 to-sky-950/80 text-white text-center p-6 space-y-3">
              <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase tracking-widest border border-emerald-500/30">
                AFTER MS FOAM WASH
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                100% Scratch-Free Metallic Gloss
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 max-w-md">
                Clean body, polished dashboard, mud-free underbody & tire shine finish.
              </p>
            </div>
          </div>
        </div>

        {/* BEFORE WASH IMAGE (Layer 2 - Top clipped) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-[100vw] max-w-4xl h-full bg-stone-900">
            {/* Muddy Dusty Car Visual representation */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-amber-950/80 to-stone-950 text-white text-center p-6 space-y-3">
              <div className="p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-widest border border-amber-500/30">
                BEFORE WASH (DIRTY & MUDDY)
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-stone-200 tracking-tight">
                Heavy Highway Dust & Road Mud
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 max-w-md">
                Stubborn dirt buildup on wheels, bumpers, underbody & foggy windows.
              </p>
            </div>
          </div>
        </div>

        {/* SLIDER DIVIDER LINE & DRAGGER HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize z-20 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-9 h-9 rounded-full bg-white dark:bg-[#1C1C1F] text-black dark:text-white border-2 border-slate-300 dark:border-slate-700 shadow-2xl flex items-center justify-center shrink-0 -translate-x-1/2 hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-4 h-4 text-black dark:text-white rotate-90" />
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
          aria-label="Before and after wash comparison slider"
        />

      </div>

      {/* Helper label below */}
      <div className="p-3 bg-neutral-900 text-neutral-400 text-center text-xs font-medium flex items-center justify-center gap-2">
        <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
        <span>Drag the slider left or right to see the transformation before & after MS Car Wash</span>
      </div>

    </div>
  );
}
