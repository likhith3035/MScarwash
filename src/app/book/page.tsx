'use client';

import { useState } from 'react';
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
import { BookingMode, TIME_SLOTS, VEHICLE_TYPES, ADD_ONS } from '@/lib/types';
import { saveBooking } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

export default function BookingPage() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<BookingMode>('pickup');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [vehicleModel, setVehicleModel] = useState('');
  const [address, setAddress] = useState('');
  const [timeWindow, setTimeWindow] = useState('10:00 AM – 12:00 PM');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[1].slot);
  const [notes, setNotes] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

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
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {t('pickupAddress')}
                </label>
                <textarea
                  rows={2}
                  placeholder="Door No., Street name, Landmark in Srikalahasti (e.g. Panagal, near Petrol bunk)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4.5 py-3.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/10 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />
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
                  {TIME_SLOTS.map((ts) => (
                    <option key={ts.slot} value={ts.slot}>
                      {ts.slot} {ts.isPeak ? '(Peak Hour)' : ''}
                    </option>
                  ))}
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

    </div>
  );
}

