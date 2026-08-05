import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Droplets,
  Award,
  Gift,
  Clock,
  MapPin,
  Phone,
  MessageSquare,
  CalendarCheck,
  Car,
  Bike,
  Zap,
  Truck,
  ChevronRight,
  Sparkles,
  Star,
  ThumbsUp,
  Sliders,
  CheckCircle2,
  Wrench,
  Gauge,
  BatteryCharging,
  Wind,
} from 'lucide-react';
import { QuickPriceEstimator } from '@/components/QuickPriceEstimator';
import { GallerySection } from '@/components/GallerySection';
import { FaqSection } from '@/components/FaqSection';

export default function HomePage() {
  const precisionFeatures = [
    {
      title: '100% Scratch-Free Foam',
      desc: 'Rich, thick snow-foam bath that safely dissolves road mud without scrubbing.',
      icon: Droplets,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      title: 'Doorstep Pickup & Drop',
      desc: 'Our wash boy picks up your car/bike from home or office in Srikalahasti.',
      icon: MapPin,
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Full Mechanic Repairs',
      desc: 'Engine diagnostic, oil change, brake repair & complete auto service by expert mechanics.',
      icon: Wrench,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'Underbody Pressure Blast',
      desc: 'High-pressure rinse removing mud buildup & preventing chassis rust.',
      icon: Zap,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
  ];

  const repairServices = [
    {
      title: 'Engine Checkup & Synthetic Oil Change',
      desc: 'Complete engine diagnostics, oil filter replacement, spark plug cleaning & fluid top-up.',
      icon: Gauge,
      badge: 'POPULAR SERVICE',
      price: 'Inspection & Quote',
      color: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5',
    },
    {
      title: 'Brake Pad & Suspension Overhaul',
      desc: 'Brake pad replacement, disc rotor inspection, clutch adjustment & suspension noise fix.',
      icon: ShieldCheck,
      badge: 'SAFETY ESSENTIAL',
      price: 'Quote on Request',
      color: 'border-red-500/30 text-red-600 dark:text-red-400 bg-red-500/5',
    },
    {
      title: 'Car AC Service & Cooling Gas Top-Up',
      desc: 'AC cabin filter cleaning, leak detection, & high-efficiency refrigerant gas refilling.',
      icon: Wind,
      badge: 'COOLING SPECIAL',
      price: 'Diagnosis & Quote',
      color: 'border-cyan-500/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5',
    },
    {
      title: 'Electrical Repairs & Battery Care',
      desc: 'Wiring diagnosis, battery health test, alternator check, headlights & fuse replacement.',
      icon: BatteryCharging,
      badge: 'FAST REPAIR',
      price: 'Quote on Request',
      color: 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5',
    },
  ];

  const customizeServices = [
    {
      title: 'Snow Foam Wash',
      subtitle: 'Rich, thick snow-foam bath that safely dissolves road grime & mud.',
      price: 'Starting at ₹100',
      tag: 'MOST POPULAR',
      image: '/logo.png',
      href: '/book?vehicle=Car',
    },
    {
      title: 'Underbody Pressure Blast',
      subtitle: 'High-pressure underbody rinse removing mud buildup & chassis salts.',
      price: 'Deep Protection',
      tag: 'HIGHWAY SPECIAL',
      image: '/logo.png',
      href: '/book?vehicle=Car',
    },
    {
      title: 'Complete Mechanic Repair',
      subtitle: 'All types of car engine, brake, AC, oil change & electrical repairs.',
      price: 'Full Car Service',
      tag: 'MECHANIC SPECIAL',
      image: '/logo.png',
      href: '/book?service=Repair',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-white dark:bg-[#05080D]">
      
      {/* DRIVEU STYLE HERO SECTION WITH MS CAR WASH DATA */}
      <section className="pt-8 pb-14 lg:pt-16 lg:pb-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* DriveU Green Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black tracking-widest uppercase border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>OPEN NOW • WATER WASH & ALL CAR REPAIRS • SRIKALAHASTI</span>
            </div>

            {/* Main MS Car Wash SEO Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              MS CAR WASH & CAR SERVICES — Best Water Wash & Car Service in Srikalahasti
            </h1>

            {/* Subtitle with MS Car Wash Data */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Top-rated water wash, 100% scratch-free foam washing, and <strong className="text-slate-900 dark:text-white font-black">all types of car mechanic repairs</strong> in Srikalahasti (Panagal, near highway). Engine service, AC repair, brake work & doorstep pickup, <strong className="text-slate-900 dark:text-white font-extrabold">starting at ₹100.</strong>
            </p>

            {/* DriveU Solid Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-sm transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                <span>Book Wash or Car Repair</span>
              </Link>

              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-100 dark:bg-[#0E1420] text-slate-900 dark:text-white border border-black/8 dark:border-white/10 text-xs font-extrabold hover:bg-slate-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <span>View All Services & Rates</span>
              </Link>
            </div>

            {/* Feature Perks Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-600 dark:text-slate-400 font-bold border-t border-black/8 dark:border-white/8">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Scratch Free
              </span>
              <span className="flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-indigo-500" /> All Car Repairs
              </span>
              <span className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-500 animate-pulse" /> Free Water + Tissue Box
              </span>
            </div>

          </div>

          {/* Right Column: MS Car Wash Emblem Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md p-6 rounded-3xl bg-slate-50 dark:bg-[#0E1420] border border-black/8 dark:border-white/8 shadow-xl flex flex-col items-center text-center space-y-5 relative overflow-hidden group">
              
              <div className="relative w-48 h-48 flex items-center justify-center p-4 bg-white dark:bg-[#141C2B] rounded-2xl border border-black/5 dark:border-white/5 shadow-inner">
                <Image
                  src="/logo.png"
                  alt="MS Car Wash & Car Services Srikalahasti Logo"
                  width={180}
                  height={180}
                  className="w-40 h-40 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>

              <div>
                <h3 className="font-black text-xl text-slate-900 dark:text-white">MS CAR WASH & CAR SERVICES</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                  Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Near Highway Srikalahasti - 517644
                </p>
              </div>

              <div className="w-full pt-3 border-t border-black/8 dark:border-white/8 flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Open 7 AM – 10 PM
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-200/70 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                  Wash & Full Mechanic Service
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* DRIVEU STYLE "PRECISION CAR CLEANING" SECTION WITH MS CAR WASH FEATURES */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-black/8 dark:border-white/8">
        <div className="text-left mb-8 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Complete Auto Care & Wash Features
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Car Wash & Mechanic Service trusted by 5,000+ Vehicle Owners in Srikalahasti
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {precisionFeatures.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0E1420] border border-black/8 dark:border-white/8 space-y-3 hover:border-emerald-500/30 transition-all shadow-xs"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feat.color}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* NEW SECTION: ALL TYPES OF CAR REPAIRS & MECHANIC WORK */}
      <section className="py-14 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-black/8 dark:border-white/8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-wider border border-indigo-500/20">
              <Wrench className="w-3.5 h-3.5" /> EXPERT MECHANIC WORK
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              All Types of Car Repairs in Srikalahasti
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              From engine oil changes to complex mechanical & electrical fixes by expert mechanics.
            </p>
          </div>

          <Link
            href="/book?service=Repair"
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs transition-all shadow-md flex items-center gap-2"
          >
            <span>Book Mechanic Service</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repairServices.map((rep, idx) => {
            const IconComponent = rep.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-slate-50 dark:bg-[#0E1420] border ${rep.color} transition-all hover:shadow-lg flex flex-col justify-between space-y-4`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900/5 dark:bg-white/5 flex items-center justify-center">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase opacity-80">
                        {rep.badge}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                        {rep.title}
                      </h3>
                    </div>
                  </div>
                  <span className="font-black text-xs px-2.5 py-1 rounded-full bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white shrink-0">
                    {rep.price}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {rep.desc}
                </p>

                <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Genuine Spare Parts Used
                  </span>
                  <Link
                    href={`/book?service=Repair&type=${encodeURIComponent(rep.title)}`}
                    className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>Request Quote</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DRIVEU STYLE "CUSTOMISE YOUR CAR WASH" GRID WITH MS CAR WASH SERVICES */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-black/8 dark:border-white/8">
        <div className="text-left mb-8 space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Customise your vehicle service
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
            Explore foam washing & car repair packages
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customizeServices.map((srv, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-50 dark:bg-[#0E1420] border border-black/8 dark:border-white/8 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="p-6 space-y-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                  {srv.tag}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {srv.subtitle}
                </p>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-black/5 dark:border-white/5 mt-4">
                <span className="font-black text-sm text-slate-900 dark:text-white">
                  {srv.price}
                </span>
                <Link
                  href={srv.href}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-extrabold text-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-all flex items-center gap-1"
                >
                  <span>Book Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK PRICE ESTIMATOR & CALCULATOR */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-black/8 dark:border-white/8">
        <QuickPriceEstimator />
      </section>

      {/* BEFORE / AFTER PHOTO GALLERY */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-black/8 dark:border-white/8">
        <GallerySection />
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full border-t border-black/8 dark:border-white/8">
        <FaqSection />
      </section>

    </div>
  );
}
