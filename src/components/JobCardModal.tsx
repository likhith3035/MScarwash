'use client';

import { useState } from 'react';
import { Booking } from '@/lib/types';
import { generateJobCardPDF, JobCardData } from '@/lib/jobcard-generator';
import {
  FileText,
  Printer,
  MessageSquare,
  X,
  Check,
  Car,
  Fuel,
  Gauge,
  UserCheck,
  Clock,
  ShieldCheck,
  IndianRupee,
} from 'lucide-react';

interface JobCardModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobCardModal({ booking, isOpen, onClose }: JobCardModalProps) {
  const [fuelLevel, setFuelLevel] = useState('50%');
  const [odometer, setOdometer] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [mechanicAssigned, setMechanicAssigned] = useState('Naveen K (Owner & Lead Specialist)');
  const [scratchNotes, setScratchNotes] = useState('Minor bumper scratches noted');
  const [hasValuablesRemoved, setHasValuablesRemoved] = useState(true);
  const [promisedTime, setPromisedTime] = useState('Within 90 Mins');
  const [estimatedCost, setEstimatedCost] = useState(booking?.totalAmount || 350);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen || !booking) return null;

  const handlePrintOrDownload = async () => {
    setIsGenerating(true);
    try {
      const details: JobCardData = {
        fuelLevel,
        odometer,
        regNumber,
        mechanicAssigned,
        scratchNotes,
        hasValuablesRemoved,
        promisedTime,
        estimatedCost: Number(estimatedCost),
      };
      await generateJobCardPDF(booking, details, true);
    } catch (err) {
      console.warn('Could not generate job card:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleWhatsAppJobCard = () => {
    const text = `📋 *VEHICLE INTAKE JOB CARD #${booking.id}*
🏢 *MS Car Mechanic & Car Wash Srikalahasti*
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${booking.name}
🚘 *Vehicle:* ${booking.vehicleType} (${booking.vehicleModel})
🔢 *Reg No:* ${regNumber || 'Recorded'}
⛽ *Fuel Level:* ${fuelLevel}
🧭 *Odometer:* ${odometer || 'Checked'}
👨‍🔧 *Mechanic Assigned:* ${mechanicAssigned}
🔍 *Inspection Notes:* ${scratchNotes}
⏰ *Estimated Delivery:* ${promisedTime}
💰 *Estimated Total:* ₹${estimatedCost}
🎁 *Complimentary:* 1 Chilled Mineral Water Bottle + 1 Car Tissue Box

📞 *Desk Hotline:* 8309390902`;

    const cleanPhone = booking.phone.replace(/\D/g, '');
    const targetPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white dark:bg-[#0E1420] rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                Workshop Operations
              </div>
              <h3 className="text-lg font-black tracking-tight">
                Create Vehicle Job Intake Slip ({booking.id})
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs font-bold text-slate-700 dark:text-slate-300">
          
          {/* Customer & Vehicle Info Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-[#151D2A] border border-black/5 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-emerald-500" />
              <span>
                {booking.name} — <strong>{booking.vehicleType} ({booking.vehicleModel})</strong>
              </span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-black">
              +91 {booking.phone}
            </span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-[11px] font-black uppercase text-slate-500">
                Vehicle Registration No.
              </label>
              <input
                type="text"
                placeholder="e.g. AP 39 AB 1234"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value.toUpperCase())}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-slate-900 dark:text-white font-black uppercase focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-[11px] font-black uppercase text-slate-500">
                Odometer / KM Reading
              </label>
              <input
                type="text"
                placeholder="e.g. 45,200 KM"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Fuel Level Selector */}
          <div>
            <label className="block mb-1 text-[11px] font-black uppercase text-slate-500">
              Fuel Tank Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['25%', '50%', '75%', '100% Full'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFuelLevel(level)}
                  className={`py-2 rounded-xl text-xs font-black transition-all border ${
                    fuelLevel === level
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-[#151D2A] border-black/8 dark:border-white/8 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 text-[11px] font-black uppercase text-slate-500">
                Mechanic / Lead Assigned
              </label>
              <input
                type="text"
                value={mechanicAssigned}
                onChange={(e) => setMechanicAssigned(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 text-[11px] font-black uppercase text-slate-500">
                Estimated Delivery Time
              </label>
              <input
                type="text"
                value={promisedTime}
                onChange={(e) => setPromisedTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-[11px] font-black uppercase text-slate-500">
              Visual Scratch / Dent Inspection Notes
            </label>
            <input
              type="text"
              value={scratchNotes}
              onChange={(e) => setScratchNotes(e.target.value)}
              placeholder="e.g. Scratches on left fender, minor scratch on boot"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            <div>
              <label className="block mb-1 text-[11px] font-black uppercase text-slate-500">
                Estimated Cost (INR)
              </label>
              <input
                type="number"
                value={estimatedCost}
                onChange={(e) => setEstimatedCost(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 text-emerald-600 dark:text-emerald-400 font-black text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#151D2A] border border-black/8 dark:border-white/8 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={hasValuablesRemoved}
                onChange={(e) => setHasValuablesRemoved(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Valuables Checked / Removed
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={handlePrintOrDownload}
              disabled={isGenerating}
              className="flex-1 py-3 px-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Printer className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
              <span>{isGenerating ? 'Generating PDF...' : 'Download / Print Job Card (PDF)'}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppJobCard}
              className="flex-1 py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Job Card to Customer WhatsApp</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
