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
  Heart,
  Sparkles,
  ArrowUpRight,
  Star,
  UserCheck,
  CheckCircle2,
  ThumbsUp,
  Map
} from 'lucide-react';
import { VEHICLE_TYPES } from '@/lib/types';
import { QuickPriceEstimator } from '@/components/QuickPriceEstimator';
import { GallerySection } from '@/components/GallerySection';
import { FaqSection } from '@/components/FaqSection';

export default function HomePage() {
  const servicesList = [
    {
      title: 'Snow Foam Wash',
      desc: 'Rich, thick snow-foam bath that safely dissolves road grime and mud without harsh scrubbing.',
      icon: Droplets,
      tag: 'Most Popular',
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
    },
    {
      title: 'Underbody Pressure Blast',
      desc: 'High-pressure underbody rinse removing mud buildup, salts and preventing rust formation.',
      icon: Zap,
      tag: 'Deep Protection',
      color: 'from-cyan-500/20 to-blue-500/20 text-cyan-500',
    },
    {
      title: 'Interior Hygiene & Vacuum',
      desc: 'Thorough cabin vacuuming, mat wash, AC vent dusting, and premium dashboard wiping.',
      icon: ShieldCheck,
      tag: 'Sanitized Cabin',
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-500',
    },
    {
      title: 'Body Polish & Gloss Layer',
      desc: 'Protective gloss coating that restores metallic shine and shields paint against sun & rain.',
      icon: Award,
      tag: 'Super Shine',
      color: 'from-amber-500/20 to-orange-500/20 text-amber-500',
    },
    {
      title: 'Bike & Scooter Detailing',
      desc: 'Dedicated 2-wheeler foam bath, engine degreasing, and chain lube protection.',
      icon: Bike,
      tag: 'Fast 20-Min',
      color: 'from-emerald-500/20 to-lime-500/20 text-emerald-500',
    },
    {
      title: 'Commercial & Heavy Wash',
      desc: 'Heavy-duty washing for Trucks, Vans, Tractors, Autos, and JCB heavy machinery.',
      icon: Truck,
      tag: 'Heavy Duty',
      color: 'from-blue-500/20 to-slate-500/20 text-blue-500',
    },
  ];

  const reviews = [
    {
      name: 'Subba Rao K.',
      location: 'Panagal, Srikalahasti',
      vehicle: 'Hyundai Creta (SUV)',
      quote: 'Best car wash in Srikalahasti! Completely scratch-free snow foam and the underbody pressure washing removed all highway mud.',
      rating: 5,
      avatar: 'SR',
    },
    {
      name: 'V. Naresh',
      location: 'RTO Office Area',
      vehicle: 'Royal Enfield Bullet',
      quote: 'Quick 20-minute bike foam wash with chain lube. MS Car Wash SKHT is definitely the top choice for daily commuters.',
      rating: 5,
      avatar: 'VN',
    },
    {
      name: 'Sekhar Reddy',
      location: 'Bypass Road, SKHT',
      vehicle: 'Toyota Innova Crysta',
      quote: 'The doorstep pickup wash service near highway Srikalahasti is super convenient. Returned my Innova spotless & shiny.',
      rating: 5,
      avatar: 'SR',
    },
  ];

  const stats = [
    { label: 'Vehicles Washed', value: '5,000+', icon: Car },
    { label: 'Customer Rating', value: '4.9 ★', icon: Star },
    { label: 'Scratch-Free Wash', value: '100%', icon: ShieldCheck },
    { label: 'Turnaround Time', value: '20 Min', icon: Clock },
  ];

  const brandLogos = [
    'Maruti Suzuki',
    'Hyundai',
    'Tata Motors',
    'Mahindra',
    'Toyota',
    'Honda',
    'Kia',
    'Volkswagen',
    'BMW',
    'Royal Enfield',
  ];

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      
      {/* BACKGROUND AMBIENT GLOW ORBS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none -z-10 animate-glow-float"></div>
      <div className="absolute top-[600px] right-0 w-[500px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/15 blur-[140px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[1400px] left-0 w-[600px] h-[600px] bg-amber-500/10 dark:bg-amber-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      {/* HERO SECTION */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pulsing Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/10 text-xs font-extrabold text-slate-900 dark:text-white border border-slate-900/10 dark:border-white/15 backdrop-blur-md shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500"></span>
              <span>OPEN NOW • 7 AM to 10 PM • Srikalahasti Detailing Center</span>
            </div>

            {/* Main SEO Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              <span className="text-slate-900 dark:text-white block">MS CAR WASH.</span>
              <span className="text-gradient-emerald block mt-1">
                Srikalahasti’s #1 Detailing.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              100% scratch-free snow foam wash, underbody pressure blast, cabin sanitization, and doorstep pickup near Panagal & highway Srikalahasti.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/book"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all shadow-lg shadow-emerald-600/30 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 group"
              >
                <CalendarCheck className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Book Pickup or Slot</span>
              </Link>

              <Link
                href="/pricing"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white dark:bg-[#0D131D] text-slate-900 dark:text-white border border-black/10 dark:border-white/10 text-sm font-extrabold hover:bg-slate-100 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <span>View Rates (From ₹100)</span>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
              </Link>
            </div>

            {/* Feature Highlights Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600 dark:text-slate-300 border-t border-black/10 dark:border-white/10 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Scratch Free
              </span>
              <span className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-500 animate-pulse" /> Free Water + Tissue Box
              </span>
              <span className="flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-cyan-500" /> Doorstep Pickup Available
              </span>
            </div>

          </div>

          {/* Right Column: Emblem Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 rounded-3xl bg-white/80 dark:bg-[#0D131D]/90 border border-black/10 dark:border-white/10 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center space-y-6 max-w-sm w-full transition-all hover:border-emerald-500/40 relative overflow-hidden group">
              
              {/* Subtle top glow line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500"></div>

              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#151D2A] border border-black/5 dark:border-white/5 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="MS Car Wash Srikalahasti Logo"
                  width={180}
                  height={180}
                  className="w-40 h-40 object-contain drop-shadow-md"
                  priority
                />
              </div>

              <div>
                <h3 className="font-black text-2xl tracking-tight text-slate-900 dark:text-white">MS CAR WASH SKHT</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-relaxed">
                  Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Near Highway Srikalahasti
                </p>
              </div>

              <div className="w-full pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-black">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Open 7 AM – 10 PM
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                  All Vehicles
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* STATS METRICS BAR */}
      <section className="py-8 bg-slate-900 dark:bg-[#04060A] text-white border-y border-black/10 dark:border-white/10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((st, idx) => {
              const IconComp = st.icon;
              return (
                <div key={idx} className="space-y-1.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <IconComp className="w-5 h-5 text-emerald-400 mx-auto" />
                  <span className="text-2xl sm:text-3xl font-black block tracking-tight text-white">{st.value}</span>
                  <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">{st.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* INSTANT PRICE ESTIMATOR WIDGET */}
      <section className="py-8 px-4 sm:px-6">
        <QuickPriceEstimator />
      </section>

      {/* COMPLIMENTARY PERKS SECTION WITH REAL PRODUCT PHOTOS */}
      <section className="py-16 bg-white dark:bg-[#06090E] border-y border-black/10 dark:border-white/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="text-center sm:text-left space-y-2">
            <div className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-black uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-rose-500 animate-pulse" />
              <span>Complimentary Gifts</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Complimentary Perks With Every Wash
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-xl">
              Every single vehicle wash at MS Car Wash Srikalahasti includes a sealed mineral water bottle & car tissue box at zero extra cost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Perk 1: Mineral Water Bottle */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 dark:bg-[#0D131D] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center group shadow-md hover:border-emerald-500/40 transition-all duration-300">
              <div className="relative w-full sm:w-56 h-56 bg-white dark:bg-[#151D2A] shrink-0 overflow-hidden">
                <Image
                  src="/water-bottle.png"
                  alt="Free Mineral Water Bottle Perk — MS Car Wash SKHT"
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Gift #1
                </span>
              </div>
              <div className="p-7 space-y-3">
                <h3 className="font-black text-xl text-slate-900 dark:text-white">Chilled Mineral Water Bottle</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  Refreshing, sealed drinking water handed over to every customer upon completion of vehicle wash.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>100% Free with Every Service</span>
                </div>
              </div>
            </div>

            {/* Perk 2: Car Tissue Box */}
            <div className="overflow-hidden rounded-3xl bg-slate-50 dark:bg-[#0D131D] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center group shadow-md hover:border-amber-500/40 transition-all duration-300">
              <div className="relative w-full sm:w-56 h-56 bg-white dark:bg-[#151D2A] shrink-0 overflow-hidden">
                <Image
                  src="/tissue-box.png"
                  alt="Free Car Tissue Paper Box Perk — Best Car Wash in Srikalahasti"
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                  Gift #2
                </span>
              </div>
              <div className="p-7 space-y-3">
                <h3 className="font-black text-xl text-slate-900 dark:text-white">Dashboard Tissue Box</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  A premium dashboard car tissue paper box included free with every car & SUV detailing package.
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dashboard Gift Included</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-wider border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Top Rated Car Wash SKHT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Loved By Local Car Owners
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Real customer feedback for MS Car Wash SKHT from Panagal, Highway & Srikalahasti residents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bento-card p-7 rounded-3xl space-y-5 flex flex-col justify-between hover:border-emerald-500/40 shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Verified Customer
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-medium italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {rev.avatar}
                  </div>
                  <div>
                    <span className="font-black text-xs text-slate-900 dark:text-white block">{rev.name}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">{rev.location}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                  {rev.vehicle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES BENTO GRID */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Wash & Detailing Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            High-pressure water washing, snow foam detailing, and interior hygiene treatment in SKHT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => {
            const IconComp = service.icon;
            return (
              <div
                key={index}
                className="p-7 rounded-3xl bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 shadow-md hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-black text-xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Fast turnaround</span>
                  <Link
                    href="/book"
                    className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Book Service</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* VEHICLES SERVED */}
      <section className="py-12 bg-white dark:bg-[#06090E] border-y border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Vehicles We Service Daily</h2>
            <Link href="/pricing" className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline">
              View All Tiers &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3 text-center text-xs">
            {VEHICLE_TYPES.map((v) => (
              <div key={v.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0D131D] border border-black/10 dark:border-white/10 font-extrabold text-slate-900 dark:text-white shadow-xs hover:border-emerald-500/40 transition-colors">
                {v.id}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK SHOWCASE PHOTO GALLERY */}
      <section className="py-16 bg-white/50 dark:bg-[#080C14]/50 border-y border-black/5 dark:border-white/5">
        <GallerySection />
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <FaqSection />
      </section>

      {/* CAR BRANDS */}
      <section className="py-10 bg-slate-100/70 dark:bg-[#04060A] border-b border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
            All Automobile Brands Serviced Daily in Srikalahasti
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-xs font-extrabold text-slate-700 dark:text-slate-300">
            {brandLogos.map((brand) => (
              <span key={brand} className="px-4 py-2 rounded-full bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 shadow-xs hover:border-emerald-500/30 transition-all">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION & GOOGLE MAP */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-xs">
            <div>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">Panagal & Near Highway</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">Visit MS Car Wash SKHT</h2>
            </div>
            
            <div className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-emerald-500 mt-0.5" />
                <span>Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Near Highway, Srikalahasti - 517644</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-emerald-500" />
                <a href="tel:9494829450" className="font-black text-slate-900 dark:text-white hover:underline text-sm">9494829450 / 8309390902</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 shrink-0 text-emerald-500" />
                <a href="https://wa.me/918885426155" target="_blank" rel="noopener noreferrer" className="font-black text-emerald-600 dark:text-emerald-400 hover:underline text-sm">WhatsApp: 8885426155</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 shrink-0 text-slate-400" />
                <span>7:00 AM – 10:00 PM (Monday to Sunday)</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=Panagal+Srikalahasti+Bharat+Petroleum"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs shadow-md hover:scale-105 transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href="https://wa.me/918885426155"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/30 transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Instant Chat</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-[360px] rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#0D131D] shadow-xl relative">
            <iframe
              title="MS Car Wash Srikalahasti Map Location"
              src="https://maps.google.com/maps?q=13.742436,79.683298&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="w-full h-full grayscale opacity-85 hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}
