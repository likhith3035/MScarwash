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
    <div className="py-8 max-w-2xl mx-auto px-4 sm:px-6 w-full space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block">
          {t('easyBooking')}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{t('bookVehicleWash')}</h1>
        <p className="text-xs text-neutral-500">
          {t('selectModeDesc')}
        </p>
      </div>

      {/* MODE TOGGLE BUTTONS */}
      <div className="p-1.5 rounded-2xl bg-neutral-200/70 dark:bg-[#1C1C1F] grid grid-cols-2 gap-1 text-xs sm:text-sm font-extrabold shadow-xs">
        <button
          type="button"
          onClick={() => setMode('pickup')}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            mode === 'pickup'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-md scale-[1.01]'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <MapPin className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{t('doorstepPickup')}</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('slot')}
          className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            mode === 'slot'
              ? 'bg-black text-white dark:bg-white dark:text-black shadow-md scale-[1.01]'
              : 'text-neutral-600 dark:text-neutral-400'
          }`}
        >
          <Calendar className="w-4 h-4 shrink-0 text-amber-500" />
          <span>{t('centerDriveIn')}</span>
        </button>
      </div>

      {/* Slot Warning Banner */}
      {mode === 'slot' && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong>Slot Rule:</strong> {t('slotRule')}
          </span>
        </div>
      )}

      {/* SUCCESS CONFIRMATION */}
      {submittedBooking ? (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] text-center space-y-4 shadow-lg">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#1D1D1F] dark:text-white">{t('bookingReceived')}</h2>
            <p className="text-xs text-neutral-500 mt-1">Booking ID: <span className="font-mono font-bold text-black dark:text-white">{submittedBooking.id}</span></p>
          </div>
          <p className="text-xs text-neutral-500">
            Notifications have been dispatched to the wash center team on WhatsApp & Telegram.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <a
              href={submittedBooking.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('openWhatsapp')}</span>
            </a>
            <button
              type="button"
              onClick={() => setSubmittedBooking(null)}
              className="px-5 py-3.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-xs font-bold text-neutral-700 dark:text-neutral-300"
            >
              {t('bookAnother')}
            </button>
          </div>
        </div>
      ) : (
        /* EASY FORM */
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-xs space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name Input */}
            <div className="space-y-1">
              <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                {t('yourName')}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-1">
              <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                {t('phoneNumber')}
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9848012345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
              />
            </div>

            {/* Vehicle Type */}
            <div className="space-y-1">
              <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                {t('vehicleType')}
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Model */}
            <div className="space-y-1">
              <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                {t('vehicleModel')}
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Swift, Creta, Pulsar, Activa"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
              />
            </div>

          </div>

          {/* Conditional Mode Fields */}
          {mode === 'pickup' ? (
            <div className="space-y-4 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                  {t('pickupAddress')}
                </label>
                <textarea
                  rows={2}
                  placeholder="House no, street name, landmark in Srikalahasti"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                  {t('pickupWindow')}
                </label>
                <select
                  value={timeWindow}
                  onChange={(e) => setTimeWindow(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                  {t('preferredDate')}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-[#1D1D1F] dark:text-white">
                  {t('timeSlot')}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold"
                >
                  {TIME_SLOTS.map((ts) => (
                    <option key={ts.slot} value={ts.slot}>
                      {ts.slot} {ts.isPeak ? '(Peak)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Included Free Perks Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-300">
            <span className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-500" /> 
              <span>{t('freePerks')} (Free Water Bottle + Car Tissue Box Included)</span>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
            <span>{isSubmitting ? 'Saving Request...' : t('submitWhatsapp')}</span>
          </button>

        </form>
      )}

    </div>
  );
}
