'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Maximize2, X, ShieldCheck, Camera } from 'lucide-react';

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; category: string } | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Snow Foam Bath & Wash Srikalahasti',
      category: 'Snow Foam Wash',
      src: '/gallery-foam-car.png',
      desc: 'Rich, thick snow-foam bath safely lifting dirt and highway mud at MS Car Wash Srikalahasti.',
    },
    {
      id: 2,
      title: 'High-Pressure Underbody Blast SKHT',
      category: 'Underbody Wash',
      src: '/gallery-underbody.png',
      desc: 'High-pressure underbody rinse removing mud buildup & salt in Panagal, Srikalahasti.',
    },
    {
      id: 3,
      title: 'Two-Wheeler Foam Detailing & Chain Lube',
      category: 'Bike Detailing',
      src: '/gallery-bike-foam.png',
      desc: 'Dedicated 2-wheeler foam bath with chain lube protection in Srikalahasti.',
    },
    {
      id: 4,
      title: 'Sanitized Cabin Interior Cleaning',
      category: 'Interior Detailing',
      src: '/gallery-interior.png',
      desc: 'Vacuumed carpets, mat wash, AC vent dusting & dashboard polish.',
    },
    {
      id: 5,
      title: 'Mirror Gloss Wax Polish Protection',
      category: 'Gloss Polish',
      src: '/gallery-car-shine.png',
      desc: 'Protective gloss coating with water-beading paint protection at MS Car Wash.',
    },
  ];

  const categories = ['All', 'Snow Foam Wash', 'Underbody Wash', 'Interior Detailing', 'Bike Detailing', 'Gloss Polish'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 sm:px-6 w-full">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
          <Camera className="w-3.5 h-3.5" />
          <span>Work Showcase</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Real Detailing Photo Gallery
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          Explore actual work photos from MS Car Wash Srikalahasti — snow foam baths, underbody pressure blasts, bike detailing & cabin vacuuming.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-black transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105'
                  : 'bg-slate-100 dark:bg-[#0D131D] text-slate-700 dark:text-slate-300 border border-black/5 dark:border-white/5 hover:border-emerald-500/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage({ src: item.src, title: item.title, category: item.category })}
            className="group relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#0D131D] border border-black/10 dark:border-white/10 shadow-md cursor-pointer hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full h-64 overflow-hidden bg-slate-900">
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Top Tag */}
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-white/10">
                {item.category}
              </span>

              {/* Hover Zoom Icon */}
              <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-md">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 inset-x-4 text-white space-y-1">
                <h3 className="font-black text-lg leading-tight tracking-tight drop-shadow-md">{item.title}</h3>
                <p className="text-[11px] text-slate-200/90 font-medium line-clamp-2">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all border border-white/20"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-[320px] sm:h-[460px] bg-black">
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                className="object-contain"
              />
            </div>

            {/* Footer Details */}
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-white/10">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/30">
                  {lightboxImage.category}
                </span>
                <h3 className="font-black text-xl mt-1 text-white">{lightboxImage.title}</h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-500/30 shrink-0 w-max">
                <ShieldCheck className="w-4 h-4" /> 100% Scratch-Free MS Detailing
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
