'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

export function BrandOpeningSplash() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Check if user already saw the splash in this browser session
    const hasSeen = typeof window !== 'undefined' ? sessionStorage.getItem('ms_splash_seen') : null;
    if (hasSeen === 'true') {
      setIsVisible(false);
      return;
    }

    // Step 1: Animate progress bar smoothly
    const progressTimer = setTimeout(() => {
      setProgress(100);
    }, 300);

    // Step 2: Trigger exit fade out after 1.8 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ms_splash_seen', 'true');
      }
    }, 1800);

    // Step 3: Completely unmount after fade-out transition completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2400);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('ms_splash_seen', 'true');
    }
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05080D] text-white select-none cursor-pointer overflow-hidden transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-[1.04] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ willChange: 'opacity, transform' }}
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none"></div>

      {/* Decorative Light Rays / Grid Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40"></div>

      {/* Center Branding Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm space-y-6">
        
        {/* Emblem with Glowing Aura */}
        <div className="relative group">
          {/* Animated Glow Halo */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-emerald-500/40 via-teal-500/20 to-cyan-500/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
          
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 p-3 rounded-3xl bg-[#0B101A] border-2 border-emerald-500/40 shadow-2xl flex items-center justify-center transform transition-transform duration-700 hover:scale-105">
            <Image
              src="/ms-auto-care-logo.png"
              alt="MS Auto Care Logo"
              width={120}
              height={120}
              priority
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(16,185,129,0.35)]"
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-2">
          {/* Main Title with letter spacing */}
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.22em] text-white uppercase drop-shadow-md">
            MS AUTO CARE
          </h1>

          {/* Subtitle with Emerald Accent Pill */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-emerald-400 uppercase">
              Car Mechanic &amp; Water Wash
            </span>
          </div>

          <p className="text-[10px] tracking-widest text-slate-400 font-extrabold uppercase">
            Panagal • Srikalahasti
          </p>
        </div>

        {/* Elegant Neon Progress Bar */}
        <div className="w-48 sm:w-56 h-1 rounded-full bg-white/10 overflow-hidden relative shadow-inner mt-4">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Subtle Tap to Skip Indicator */}
        <span className="text-[10px] text-slate-500 tracking-wider font-semibold opacity-60 animate-pulse pt-2">
          Tap anywhere to enter
        </span>

      </div>

      {/* Bottom Legal / Trust Watermark */}
      <div className="absolute bottom-6 text-center text-[10px] text-slate-500 font-bold tracking-wider uppercase">
        #1 Vehicle Service Center • Srikalahasti
      </div>
    </div>
  );
}
