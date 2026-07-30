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
  UserCheck
} from 'lucide-react';
import { VEHICLE_TYPES } from '@/lib/types';
import { QuickPriceEstimator } from '@/components/QuickPriceEstimator';
import { FaqSection } from '@/components/FaqSection';

export default function HomePage() {
  const servicesList = [
    {
      title: 'Snow Foam Wash',
      desc: 'Rich, thick snow-foam bath that safely dissolves road grime and mud without harsh scrubbing.',
      icon: Droplets,
      tag: 'Popular',
    },
    {
      title: 'Underbody Pressure Blast',
      desc: 'High-pressure underbody rinse removing mud buildup, salts and preventing rust formation.',
      icon: Zap,
      tag: 'Deep Clean',
    },
    {
      title: 'Interior Hygiene & Vacuum',
      desc: 'Thorough cabin vacuuming, mat wash, AC vent dusting, and premium dashboard wiping.',
      icon: ShieldCheck,
      tag: 'Hygiene',
    },
    {
      title: 'Body Polish & Gloss Layer',
      desc: 'Protective gloss coating that restores metallic shine and shields paint against sun & rain.',
      icon: Award,
      tag: 'Super Shine',
    },
    {
      title: 'Bike & Scooter Detailing',
      desc: 'Dedicated 2-wheeler foam bath, engine degreasing, and chain lube protection.',
      icon: Bike,
      tag: 'Fast 20-Min',
    },
    {
      title: 'Commercial & Heavy Wash',
      desc: 'Heavy-duty washing for Trucks, Vans, Tractors, Autos, and JCB heavy machinery.',
      icon: Truck,
      tag: 'Heavy Duty',
    },
  ];

  const reviews = [
    {
      name: 'Subba Rao K.',
      location: 'Panagal, Srikalahasti',
      vehicle: 'Hyundai Creta (Car)',
      quote: 'Best car wash in Srikalahasti! Completely scratch free and the underbody pressure washing removed all highway mud.',
      rating: 5,
    },
    {
      name: 'V. Naresh',
      location: 'RTO Office Area',
      vehicle: 'Royal Enfield Bullet (Bike)',
      quote: 'Quick 20-minute bike foam wash with chain lube. MS Car Wash SKHT is definitely the top choice.',
      rating: 5,
    },
    {
      name: 'Sekhar Reddy',
      location: 'Bypass Road, SKHT',
      vehicle: 'Toyota Innova (SUV)',
      quote: 'The doorstep pickup wash service near highway Srikalahasti is super convenient. They returned my Innova spotless.',
      rating: 5,
    },
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
    'Ford',
    'Chevrolet',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* HERO SECTION */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Calls to Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pulsing Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D1D1F]/5 dark:bg-white/10 text-xs font-semibold text-[#1D1D1F] dark:text-white border border-[#1D1D1F]/10 dark:border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Open 7 AM – 10 PM • Srikalahasti Best Car Wash</span>
            </div>

            {/* Main SEO Optimized Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] text-[#1D1D1F] dark:text-white">
              MS Car Wash. <br />
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                Srikalahasti Best Wash.
              </span>
            </h1>

            {/* Subtitle with SKHT & Highway Keywords */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              100% scratch-free snow foam washing, doorstep pickup service, and slot booking near highway & Panagal area in Srikalahasti (SKHT).
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/book"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-black font-bold text-sm hover:opacity-90 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Pickup or Slot</span>
              </Link>

              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white dark:bg-[#141416] text-[#1D1D1F] dark:text-white border border-[#E5E5EA] dark:border-[#27272A] text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-[#1C1C1F] transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Pricing (From ₹100)</span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-neutral-500 dark:text-neutral-400 border-t border-[#E5E5EA] dark:border-[#27272A]">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Scratch Free
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Gift className="w-4 h-4 text-amber-500" /> Free Water + Tissue Box
              </span>
            </div>

          </div>

          {/* Right Column: Emblem Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141416] border border-[#E5E5EA] dark:border-[#27272A] shadow-sm flex flex-col items-center text-center space-y-5 max-w-sm w-full transition-all">
              
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/5 dark:border-white/5">
                <Image
                  src="/logo.png"
                  alt="MS Car Wash Srikalahasti SKHT Logo"
                  width={180}
                  height={180}
                  className="w-40 h-40 object-contain"
                  priority
                />
              </div>

              <div>
                <h3 className="font-extrabold text-xl tracking-tight text-[#1D1D1F] dark:text-white">MS CAR WASH SKHT</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Near Highway Srikalahasti
                </p>
              </div>

              <div className="w-full pt-3 border-t border-[#E5E5EA] dark:border-[#27272A] flex items-center justify-between text-xs font-semibold">
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Open 7 AM – 10 PM
                </span>
                <span className="text-neutral-500">All Vehicles</span>
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* INSTANT PRICE ESTIMATOR WIDGET */}
      <section className="py-8 px-4 sm:px-6">
        <QuickPriceEstimator />
      </section>


      {/* PERKS SECTION WITH REAL PRODUCT PHOTOS */}
      <section className="py-14 bg-white dark:bg-[#0A0A0C] border-y border-[#E5E5EA] dark:border-[#27272A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center sm:text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>Complimentary Perks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] dark:text-white tracking-tight">
              Complimentary Perks With Every Wash
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Every single vehicle wash at MS Car Wash Srikalahasti comes with a sealed mineral water bottle & car tissue box.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Perk 1: Mineral Water Bottle */}
            <div className="overflow-hidden rounded-3xl bg-[#FBFBFC] dark:bg-[#141416] border border-[#E5E5EA] dark:border-[#27272A] flex flex-col sm:flex-row items-center group shadow-xs">
              <div className="relative w-full sm:w-52 h-52 bg-white dark:bg-[#1C1C1F] shrink-0 overflow-hidden">
                <Image
                  src="/water-bottle.png"
                  alt="Free Mineral Water Bottle Perk — MS Car Wash SKHT"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                  Free Perk #1
                </span>
                <h3 className="font-extrabold text-lg text-[#1D1D1F] dark:text-white">Free Mineral Water Bottle</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Chilled, sealed drinking water bottle handed over to every customer after wash completion.
                </p>
              </div>
            </div>

            {/* Perk 2: Car Tissue Box */}
            <div className="overflow-hidden rounded-3xl bg-[#FBFBFC] dark:bg-[#141416] border border-[#E5E5EA] dark:border-[#27272A] flex flex-col sm:flex-row items-center group shadow-xs">
              <div className="relative w-full sm:w-52 h-52 bg-white dark:bg-[#1C1C1F] shrink-0 overflow-hidden">
                <Image
                  src="/tissue-box.png"
                  alt="Free Car Tissue Paper Box Perk — Best Car Wash in Srikalahasti"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Free Perk #2
                </span>
                <h3 className="font-extrabold text-lg text-[#1D1D1F] dark:text-white">Free Car Tissue Paper Box</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  A premium dashboard tissue box included free with every car & SUV wash service.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* VERIFIED LOCAL CUSTOMER REVIEWS */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Top Rated Car Wash in SKHT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white">
            Trusted Near Highway Srikalahasti
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500">
            Real reviews for MS Car Wash SKHT from local car owners and highway commuters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bento-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-xs text-[#1D1D1F] dark:text-white block">{rev.name}</span>
                  <span className="text-[10px] text-neutral-400 block">{rev.location}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-[10px] font-bold text-neutral-600 dark:text-neutral-300">
                  {rev.vehicle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* SERVICES GRID */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F] dark:text-white">
            Wash & Detailing Services
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            High-pressure water washing, snow foam detailing, and interior hygiene treatment in SKHT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesList.map((service, index) => {
            const IconComp = service.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-3xl bg-white dark:bg-[#141416] border border-[#E5E5EA] dark:border-[#27272A] shadow-xs hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-[#1D1D1F]/5 dark:bg-white/10 text-[#1D1D1F] dark:text-white">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-600 dark:text-neutral-400">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg text-[#1D1D1F] dark:text-white group-hover:text-[#D97757] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E5EA] dark:border-[#27272A] flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-500">Fast turnaround</span>
                  <Link
                    href="/book"
                    className="text-xs font-bold text-[#1D1D1F] dark:text-white hover:underline flex items-center gap-1"
                  >
                    <span>Book Wash</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* VEHICLES SERVED */}
      <section className="py-12 bg-white dark:bg-[#0A0A0C] border-y border-[#E5E5EA] dark:border-[#27272A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-[#1D1D1F] dark:text-white">Vehicles We Wash in SKHT</h2>
            <Link href="/pricing" className="text-xs font-semibold text-neutral-500 hover:text-black dark:hover:text-white">
              View Price Tiers &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5 text-center text-xs">
            {VEHICLE_TYPES.map((v) => (
              <div key={v.id} className="p-3 rounded-2xl bg-[#FBFBFC] dark:bg-[#141416] border border-[#E5E5EA] dark:border-[#27272A] font-bold text-[#1D1D1F] dark:text-white shadow-xs">
                {v.id}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ SECTION */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <FaqSection />
      </section>


      {/* CAR BRANDS */}
      <section className="py-8 bg-[#FBFBFC] dark:bg-[#09090B] border-b border-[#E5E5EA] dark:border-[#27272A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">
            All Automobile Brands Serviced Daily in Srikalahasti
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">
            {brandLogos.map((brand) => (
              <span key={brand} className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#141416] border border-[#E5E5EA] dark:border-[#27272A] shadow-xs">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* LOCATION & GOOGLE MAP */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-5 text-xs">
            <div>
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Panagal & Near Highway</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] dark:text-white mt-1">Visit MS Car Wash SKHT</h2>
            </div>
            
            <div className="space-y-3.5 text-neutral-600 dark:text-neutral-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 shrink-0 text-[#1D1D1F] dark:text-white mt-0.5" />
                <span>Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Near Highway, Srikalahasti - 517644</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0 text-[#1D1D1F] dark:text-white" />
                <a href="tel:9494829450" className="font-bold text-[#1D1D1F] dark:text-white hover:underline">9494829450 / 8309390902</a>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 shrink-0 text-emerald-500" />
                <a href="https://wa.me/918885426155" target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-500 hover:underline">WhatsApp: 8885426155</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 shrink-0 text-[#1D1D1F] dark:text-white" />
                <span>7:00 AM – 10:00 PM (Monday to Sunday)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Panagal+Srikalahasti+Bharat+Petroleum"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-black font-bold text-xs shadow-sm hover:opacity-90 transition-all"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 h-[320px] rounded-3xl overflow-hidden border border-[#E5E5EA] dark:border-[#27272A] bg-white dark:bg-[#141416]">
            <iframe
              title="MS Car Wash Srikalahasti Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15486.294241761895!2d79.6914561!3d13.7538202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b1a45a33111%3A0x6b801a2f64126937!2sPanagal%2C%20Srikalahasti%2C%20Andhra%20Pradesh%20517644!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="w-full h-full grayscale opacity-85 hover:grayscale-0 transition-all duration-300"
            ></iframe>
          </div>

        </div>
      </section>

    </div>
  );
}
