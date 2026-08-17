'use client';

import { useState } from 'react';
import { AlertTriangle, MapPin, Phone, MessageSquare, X, Check, Loader2, Navigation, Wrench, ShieldAlert } from 'lucide-react';

interface EmergencySosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EMERGENCY_ISSUES = [
  { id: 'battery', label: '🔋 Dead Battery / Jumpstart' },
  { id: 'puncture', label: '🛞 Flat Tire / Wheel Puncture' },
  { id: 'overheat', label: '🔥 Engine Overheating / Smoke' },
  { id: 'towing', label: '🪝 Towing / Breakdown Pull' },
  { id: 'brakes', label: '🛑 Brake Failure / Jammed' },
  { id: 'fuel', label: '⛽ Fuel Empty / Roadside Assist' },
  { id: 'other', label: '⚠️ Other Mechanical Breakdown' },
];

export function EmergencySosModal({ isOpen, onClose }: EmergencySosModalProps) {
  const [issue, setIssue] = useState('battery');
  const [vehicle, setVehicle] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [landmark, setLandmark] = useState('');
  const [gpsLocation, setGpsLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  if (!isOpen) return null;

  const handleGetGps = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGpsLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (err) => {
        console.warn('GPS location error:', err);
        setGpsError('Could not fetch exact GPS. Please type nearby highway landmark.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleSendWhatsAppSos = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedIssueObj = EMERGENCY_ISSUES.find((i) => i.id === issue);
    const issueText = selectedIssueObj ? selectedIssueObj.label : issue;

    const mapsLink = gpsLocation
      ? `https://maps.google.com/?q=${gpsLocation.lat},${gpsLocation.lng}`
      : 'Location pin not provided';

    const message = `🚨 *EMERGENCY HIGHWAY BREAKDOWN ASSISTANCE REQUEST*
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏢 *MS Car Mechanic & Car Wash Srikalahasti*

⚠️ *EMERGENCY ISSUE:* ${issueText}
🚘 *VEHICLE:* ${vehicle || 'Car / Vehicle'}
👤 *CUSTOMER NAME:* ${name || 'Highway Traveler'}
📞 *CONTACT PHONE:* ${phone || 'Urgent Callback Needed'}
📍 *NEARBY LANDMARK:* ${landmark || 'Near Srikalahasti / Panagal Highway'}
🗺️ *LIVE GPS PIN:* ${mapsLink}

⏱️ *PLEASE SEND MECHANIC / ASSISTANCE IMMEDIATELY!*`;

    const whatsappUrl = `https://wa.me/918309390902?text=${encodeURIComponent(message)}`;
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-[#0E1420] rounded-3xl border-2 border-rose-500/50 shadow-2xl overflow-hidden relative flex flex-col max-h-[92vh]">
        
        {/* Urgent Header */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-sm animate-pulse">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-amber-200">
                <span>24/7 Roadside Assistance</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
              <h3 className="text-xl font-black tracking-tight">Highway Breakdown SOS</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-800 dark:text-slate-200">
          
          {/* Quick Info Alert */}
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Mechanic assistance available across <strong>Srikalahasti, Panagal, Naidupeta & Tirupati Highway</strong>. Share your live GPS location below for instant dispatch!
            </p>
          </div>

          <form onSubmit={handleSendWhatsAppSos} className="space-y-4">
            
            {/* Breakdown Type */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                What is the vehicle breakdown issue? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EMERGENCY_ISSUES.map((item) => {
                  const isSelected = issue === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIssue(item.id)}
                      className={`p-2.5 rounded-xl text-left text-xs font-bold transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-rose-500/15 dark:bg-rose-500/20 border-rose-500 text-rose-700 dark:text-rose-300 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#151D2A] border-black/8 dark:border-white/8 hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GPS Location Button */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-indigo-500" />
                  Live GPS Location
                </span>
                {gpsLocation ? (
                  <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> GPS Captured
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500">Not Captured</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleGetGps}
                disabled={isLocating}
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Detecting GPS Coordinates...</span>
                  </>
                ) : gpsLocation ? (
                  <>
                    <MapPin className="w-4 h-4 text-emerald-300" />
                    <span>Location Set: {gpsLocation.lat.toFixed(4)}, {gpsLocation.lng.toFixed(4)} (Tap to Refresh)</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    <span>📍 Tap to Fetch My Exact GPS Location</span>
                  </>
                )}
              </button>

              {gpsError && (
                <p className="text-[11px] text-rose-500 font-bold">{gpsError}</p>
              )}
            </div>

            {/* Vehicle & Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Vehicle Model *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swift Dzire / Creta / Splendor"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                  Your Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 8309390902"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-700 dark:text-slate-300">
                Your Name & Nearby Landmark
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="e.g. Near Toll Gate / HP Petrol Pump"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Direct Instant Action Buttons */}
            <div className="pt-3 space-y-2.5">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>Send Emergency SOS on WhatsApp with Location</span>
              </button>

              <a
                href="tel:8309390902"
                className="w-full py-3 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency Helpline Directly: 8309390902</span>
              </a>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}
