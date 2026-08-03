'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Car,
  Clock,
  Sparkles,
  User,
  PhoneCall,
  Star,
  ChevronDown,
  Gift,
  Building2,
  Compass,
} from 'lucide-react';
import { BookingMode, TIME_SLOTS, VEHICLE_TYPES, ADD_ONS, Booking } from '@/lib/types';
import { saveBooking, getBookings } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

const MAX_SLOTS_PER_HOUR = 2;

function BookingForm() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();

  // Mode
  const [mode, setMode] = useState<BookingMode>('pickup');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [vehicleModel, setVehicleModel] = useState('');

  // Handle URL vehicle pre-selection
  useEffect(() => {
    const param = searchParams.get('vehicle');
    if (param && VEHICLE_TYPES.some((v) => v.id === param)) {
      setVehicleType(param);
    }
  }, [searchParams]);
  const [address, setAddress] = useState('');
  const [timeWindow, setTimeWindow] = useState('10:00 AM – 12:00 PM');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('9:00 AM – 11:00 AM');
  const [notes, setNotes] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [showAddOns, setShowAddOns] = useState(false);

  // Existing bookings for slot limits
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings();
        setExistingBookings(data || []);
      } catch (err) {
        console.warn('Could not load bookings:', err);
      }
    }
    loadBookings();
  }, []);

  const slotCountsForDate = existingBookings.reduce((acc, b) => {
    if (b.mode === 'slot' && b.date === date && b.timeSlot && b.status !== 'cancelled') {
      acc[b.timeSlot] = (acc[b.timeSlot] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Live Price
  const selectedVehicleObj = VEHICLE_TYPES.find((v) => v.id === vehicleType) || VEHICLE_TYPES[0];
  const vehicleBasePrice = selectedVehicleObj.basePrice || 350;
  const totalAmount = vehicleBasePrice;

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{ id: string; whatsappUrl: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !vehicleModel) {
      alert('Please fill in your name, phone number, and vehicle model.');
      return;
    }

    setIsSubmitting(true);

    try {
      const saved = await saveBooking({
        mode,
        name,
        phone,
        vehicleType,
        vehicleModel,
        address: mode === 'pickup' ? address : undefined,
        timeWindow: mode === 'pickup' ? timeWindow : undefined,
        date: mode === 'slot' ? date : undefined,
        timeSlot: mode === 'slot' ? timeSlot : undefined,
        notes,
        addOns: selectedAddOns,
        totalAmount,
      });

      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch (err) {
        console.log('Telegram API call error:', err);
      }

      const waText =
        mode === 'pickup'
          ? `New Booking — MS Car Wash
Mode: Doorstep Pickup
Name: ${name}
Phone: ${phone}
Vehicle: ${vehicleType} - ${vehicleModel}
Address: ${address || 'Srikalahasti'}
Time: ${timeWindow}
Add-ons: ${selectedAddOns.length > 0 ? selectedAddOns.join(', ') : 'None'}
Booking ID: ${saved.id}`
          : `New Booking — MS Car Wash
Mode: Center Slot
Name: ${name}
Phone: ${phone}
Vehicle: ${vehicleType} - ${vehicleModel}
Date: ${date} (${timeSlot})
Add-ons: ${selectedAddOns.length > 0 ? selectedAddOns.join(', ') : 'None'}
Booking ID: ${saved.id}`;

      const whatsappUrl = `https://wa.me/918885426155?text=${encodeURIComponent(waText)}`;

      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }

      setSubmittedBooking({ id: saved.id, whatsappUrl });
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Something went wrong. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="py-8 sm:py-12 max-w-lg mx-auto px-4 w-full space-y-6">
      {/* ── Title Header ── */}
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {t('bookVehicleWash')}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Fast & easy booking • Free water bottle + tissue box
        </p>
      </div>

      {/* ── Success Confirmation Screen ── */}
      {submittedBooking ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 text-center space-y-5 shadow-xl">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Booking Confirmed!</h2>
            <p className="text-xs text-slate-500 mt-1">
              Ref ID: <span className="font-mono font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded">{submittedBooking.id}</span>
            </p>
          </div>
          <a
            href={submittedBooking.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat</span>
          </a>
          <button
            type="button"
            onClick={() => setSubmittedBooking(null)}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 underline block mx-auto"
          >
            Book Another Wash
          </button>
        </div>
      ) : (
        /* ── Minimalist Single-Card Form ── */
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-[#0D131D] border border-black/8 dark:border-white/8 shadow-xl space-y-4">
          
          {/* Mode Switcher */}
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-[#151D2A] grid grid-cols-2 gap-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode('pickup')}
              className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'pickup'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Doorstep Pickup</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('slot')}
              className={`py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'slot'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Center Drive-In</span>
            </button>
          </div>

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Name *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone *
              </label>
              <div className="relative">
                <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9494829450"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Vehicle Type & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Vehicle Type
              </label>
              <div className="relative">
                <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none appearance-none"
                >
                  {VEHICLE_TYPES.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name.split('/')[0]} (₹{v.basePrice})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                Model Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Swift, Creta, Activa"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Pickup Details OR Slot Booking */}
          {mode === 'pickup' ? (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Pickup Address / Landmark in Srikalahasti
                </label>
                <input
                  type="text"
                  placeholder="e.g. Panagal, near Swarnamukhi Bank"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Time Window
                </label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white"
                >
                  <option value="8:00 AM – 10:00 AM">8:00 AM – 10:00 AM</option>
                  <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM</option>
                  <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
                  <option value="2:00 PM – 4:00 PM">2:00 PM – 4:00 PM</option>
                  <option value="4:00 PM – 6:00 PM">4:00 PM – 6:00 PM</option>
                  <option value="6:00 PM – 8:00 PM">6:00 PM – 8:00 PM</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Wash Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white"
                >
                  {TIME_SLOTS.map((ts) => {
                    const bookedCount = slotCountsForDate[ts.slot] || 0;
                    const isLocked = bookedCount >= MAX_SLOTS_PER_HOUR;
                    return (
                      <option key={ts.slot} value={ts.slot} disabled={isLocked}>
                        {ts.slot} {isLocked ? '🔒 [Full]' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          {/* Optional Add-Ons Expandable */}
          <div className="border-t border-black/5 dark:border-white/5 pt-3">
            <button
              type="button"
              onClick={() => setShowAddOns(!showAddOns)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Add Services / Extras ({selectedAddOns.length} selected)</span>
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAddOns ? 'rotate-180' : ''}`} />
            </button>
            {showAddOns && (
              <div className="mt-2.5 space-y-1.5 animate-fade-in-up">
                {ADD_ONS.map((addon) => {
                  const isActive = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-all ${
                        isActive
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold'
                          : 'border-black/5 dark:border-white/5 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                          {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span>{addon.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">{addon.desc}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Price Bar & Submit */}
          <div className="border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">Estimated Total:</span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                ₹{totalAmount} <span className="text-[10px] text-amber-500 font-bold ml-1">(Free Perks Included)</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-60"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{isSubmitting ? 'Saving Request...' : 'Book Wash via WhatsApp'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Trust Line */}
      <p className="text-center text-[10px] font-bold text-slate-400 dark:text-slate-500">
        ⚡ 100% Scratch Free • Free Mineral Water Bottle + Car Tissue Box Included
      </p>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-xs text-slate-400 font-bold">Loading booking form...</div>}>
      <BookingForm />
    </Suspense>
  );
}
