'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Gift,
  Car,
  Clock,
  Sparkles,
  ShieldCheck,
  User,
  PhoneCall,
  Star
} from 'lucide-react';
import { BookingMode, TIME_SLOTS, VEHICLE_TYPES, ADD_ONS, Booking } from '@/lib/types';
import { saveBooking, getBookings } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';
import MapPinPickerModal from '@/components/MapPinPickerModal';

const MAX_SLOTS_PER_HOUR = 2;

export default function BookingPage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<BookingMode>('pickup');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [vehicleModel, setVehicleModel] = useState('');
  const [address, setAddress] = useState('');
  const [timeWindow, setTimeWindow] = useState('10:00 AM – 12:00 PM');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('9:00 AM – 11:00 AM');
  const [notes, setNotes] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Rapido-style GPS & Interactive Map Modal States
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // Rapido / Uber Style High-Accuracy GPS Location Detector
  const handleDetectLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationSuccess(false);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const latStr = latitude.toFixed(6);
        const lngStr = longitude.toFixed(6);
        const mapsUrl = `https://maps.google.com/?q=${latStr},${lngStr}`;

        let areaText = '';
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          const locality = data.locality || data.city || '';
          const state = data.principalSubdivision || '';
          areaText = [locality, state].filter(Boolean).join(', ');
        } catch (err) {
          // silent fallback
        }

        const gpsHeader = `📍 [Exact GPS]: ${latStr}, ${lngStr} (±${Math.round(accuracy || 10)}m)`;
        const areaLine = areaText ? `\n🏢 Locality: ${areaText}` : '';
        const mapsLine = `\n🗺️ Google Maps Pin: ${mapsUrl}`;

        setAddress(`${gpsHeader}${areaLine}${mapsLine}`);
        setLocationSuccess(true);
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsError('Location permission denied. Please enable location in your browser or select an area chip below.');
        } else {
          setGpsError('Unable to detect GPS location. Please tap an area chip below or type address manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{ id: string; whatsappUrl: string } | null>(null);

  // Fetch bookings to calculate slot capacity
  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await getBookings();
        setExistingBookings(data || []);
      } catch (err) {
        console.warn('Could not load existing bookings for slot locking:', err);
      }
    }
    loadBookings();
  }, []);

  // Compute counts per slot for current date
  const slotCountsForDate = existingBookings.reduce((acc, b) => {
    if (b.mode === 'slot' && b.date === date && b.timeSlot && b.status !== 'cancelled') {
      acc[b.timeSlot] = (acc[b.timeSlot] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Live Price Calculation
  const selectedVehicleObj = VEHICLE_TYPES.find(v => v.id === vehicleType) || VEHICLE_TYPES[0];
  const vehicleBasePrice = selectedVehicleObj.basePrice || 350;
  const addOnsTotalPrice = selectedAddOns.reduce((sum, addOnId) => {
    const found = ADD_ONS.find(a => a.id === addOnId);
    return sum + (found?.price || 0);
  }, 0);
  const calculatedTotalAmount = vehicleBasePrice + addOnsTotalPrice;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !vehicleModel) {
      alert('Please fill in your name, phone number, and vehicle model.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save to Database
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
        totalAmount: calculatedTotalAmount,
      });

      // 2. Trigger Automated Telegram Bot Notification in Background
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(saved),
        });
      } catch (err) {
        console.log('Telegram API call error:', err);
      }

      // 3. Prepare WhatsApp Direct Alert
      const waText = mode === 'pickup'
        ? `New Booking Request — MS Car Wash
Type: Pickup Wash (Doorstep)
Name: ${name}
Phone: ${phone}
Vehicle: ${vehicleType} - ${vehicleModel}
Pickup Address: ${address || 'Provided on call'}
Preferred Time: ${timeWindow}
Add-ons: ${selectedAddOns.length > 0 ? selectedAddOns.join(', ') : 'None'}
Notes: ${notes || 'None'}
Booking ID: ${saved.id}`
        : `New Booking Request — MS Car Wash
Type: Slot Booking (Wash Center)
Name: ${name}
Phone: ${phone}
Vehicle: ${vehicleType} - ${vehicleModel}
Date: ${date}
Preferred Slot: ${timeSlot}
Add-ons: ${selectedAddOns.length > 0 ? selectedAddOns.join(', ') : 'None'}
Notes: ${notes || 'None'}
Booking ID: ${saved.id}`;

      const whatsappUrl = `https://wa.me/918885426155?text=${encodeURIComponent(waText)}`;

      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }

      setSubmittedBooking({
        id: saved.id,
        whatsappUrl,
      });
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Something went wrong. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('easyBooking')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">{t('bookVehicleWash')}</h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium max-w-lg mx-auto">
          {t('selectModeDesc')}
        </p>
      </div>

      {/* MODE TOGGLE BUTTONS */}
      <div className="p-2 rounded-2xl bg-slate-200/80 dark:bg-[#0D131D] grid grid-cols-2 gap-2 text-xs sm:text-sm font-black shadow-inner border border-black/5 dark:border-white/5">
        <button
          type="button"
          onClick={() => setMode('pickup')}
          className={`py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2.5 ${
            mode === 'pickup'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-[1.01]'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MapPin className="w-4.5 h-4.5 shrink-0" />
          <span>{t('doorstepPickup')}</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('slot')}
          className={`py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2.5 ${
            mode === 'slot'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-[1.01]'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-4.5 h-4.5 shrink-0" />
          <span>{t('centerDriveIn')}</span>
        </button>
      </div>

      {/* Slot Warning Banner */}
      {mode === 'slot' && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-medium flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong className="font-black">Center Slot Note:</strong> {t('slotRule')}
          </span>
        </div>
      )}

      {/* SUCCESS CONFIRMATION */}
      {submittedBooking ? (
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">{t('bookingReceived')}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Booking Reference ID: <span className="font-mono font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-md">{submittedBooking.id}</span></p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Your wash slot request has been generated. Notifications have been dispatched to our Srikalahasti wash center desk on WhatsApp & Telegram.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <a
              href={submittedBooking.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-4 px-5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>{t('openWhatsapp')}</span>
            </a>
            <a
              href="https://maps.app.goo.gl/i8Wa5ef1dZZwnJmF9"
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex items-center justify-center gap-2 border border-amber-500/30 hover:scale-105 transition-all"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Google Review</span>
            </a>
          </div>
        </div>
      ) : (
        /* EASY FORM CARD */
        <form onSubmit={handleSubmit} className="p-6 sm:p-9 rounded-3xl bg-white dark:bg-[#0D131D] border border-black/10 dark:border-white/10 shadow-lg space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {t('yourName')}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {t('phoneNumber')}
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9494829450"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>

            {/* Vehicle Type */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {t('vehicleType')}
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Model */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {t('vehicleModel')}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Swift, Creta, Bullet, Activa"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              />
            </div>

          </div>

          {/* Conditional Mode Fields */}
          {mode === 'pickup' ? (
            <div className="space-y-5 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {t('pickupAddress')}
                  </label>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {/* RAPIDO / UBER STYLE GPS BUTTON */}
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={isLocating}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-black border border-emerald-500/30 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
                    >
                      <MapPin className={`w-3.5 h-3.5 ${isLocating ? 'animate-bounce text-emerald-500' : ''}`} />
                      {isLocating ? '📡 Locating GPS...' : '📍 My Live GPS'}
                    </button>

                    {/* RAPIDO / UBER STYLE INTERACTIVE DRAGGABLE MAP BUTTON */}
                    <button
                      type="button"
                      onClick={() => setIsMapModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-black border border-blue-500/30 transition-all active:scale-95 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>🗺️ Adjust Pin on Interactive Map</span>
                    </button>
                  </div>
                </div>

                {locationSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                    <span>✓ Exact GPS location & Google Maps pin captured!</span>
                  </div>
                )}

                {gpsError && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
                    <span>{gpsError}</span>
                  </div>
                )}

                <textarea
                  rows={3}
                  placeholder="Door No., Street name, Landmark in Srikalahasti (or tap 'Use My Live GPS Location' above for pinpoint accuracy)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />

                {/* 1-Tap Popular Srikalahasti Area Chips */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    ⚡ 1-Tap Select Popular Srikalahasti Areas:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Panagal',
                      'Car Street (Near Temple)',
                      'RTC Bus Stand Road',
                      'Railway Station Road',
                      'Bapuji Nagar',
                      'Swarnamukhi Bank Area',
                      'Tirupati Road Bunk',
                    ].map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => {
                          const formatted = `${area}, Srikalahasti`;
                          setAddress((prev) => (prev ? `${prev}\n📍 Landmark: ${formatted}` : `📍 Area: ${formatted}`));
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#1A2332] hover:bg-emerald-500/10 hover:text-emerald-500 text-slate-700 dark:text-slate-300 text-[11px] font-bold border border-black/5 dark:border-white/5 transition-all active:scale-95"
                      >
                        📍 {area}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {t('pickupWindow')}
                </label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                  className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-black text-slate-900 dark:text-white"
                >
                  <option value="8:00 AM – 10:00 AM">8:00 AM – 10:00 AM</option>
                  <option value="10:00 AM – 12:00 PM">10:00 AM – 12:00 PM</option>
                  <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
                  <option value="2:00 PM – 4:00 PM">2:00 PM – 4:00 PM</option>
                  <option value="4:00 PM – 6:00 PM">4:00 PM – 6:00 PM</option>
                  <option value="6:00 PM – 8:00 PM">6:00 PM – 8:00 PM</option>
                  <option value="8:00 PM – 10:00 PM">8:00 PM – 10:00 PM</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {t('preferredDate')}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-black text-slate-900 dark:text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {t('timeSlot')}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-black text-slate-900 dark:text-white"
                >
                  {TIME_SLOTS.map((ts) => {
                    const bookedCount = slotCountsForDate[ts.slot] || 0;
                    const isLocked = bookedCount >= MAX_SLOTS_PER_HOUR;
                    return (
                      <option key={ts.slot} value={ts.slot} disabled={isLocked}>
                        {ts.slot} {ts.isPeak ? '⚡ (Peak)' : ''} {isLocked ? '🔒 [FULLY BOOKED]' : bookedCount > 0 ? `(${MAX_SLOTS_PER_HOUR - bookedCount} left)` : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          {/* Included Free Perks Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300 shadow-xs">
            <span className="flex items-center gap-2">
              <Gift className="w-4.5 h-4.5 text-amber-500 animate-pulse" /> 
              <span>{t('freePerks')} (Free Water Bottle + Car Tissue Box Included)</span>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 hover:scale-[1.01] active:scale-[0.98]"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>{isSubmitting ? 'Saving Request...' : t('submitWhatsapp')}</span>
          </button>

        </form>
      )}

      {/* RAPIDO-STYLE INTERACTIVE VISUAL MAP PIN PICKER MODAL */}
      <MapPinPickerModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onConfirm={(confirmedText) => {
          setAddress(confirmedText);
          setLocationSuccess(true);
        }}
      />

    </div>
  );
}

