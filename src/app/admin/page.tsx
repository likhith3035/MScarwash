'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  FileText,
  Phone,
  RefreshCw,
  Search,
  User,
  CalendarCheck,
  Lock,
  Unlock,
  Edit3,
  MessageSquare,
  Eye,
  X,
  Send,
  Trash2,
  Plus,
  Download,
  CreditCard,
  Printer,
  ShieldCheck,
  Sparkles,
  Award,
  CheckCircle,
  Volume2,
  VolumeX,
  BellRing
} from 'lucide-react';
import { Booking } from '@/lib/types';
import { getBookings, updateBookingStatus, saveBooking, clearAllLocalBookings } from '@/lib/supabase';
import { generateInvoicePDF } from '@/lib/invoice-generator';

const ADMIN_PASSWORD = 'naveen@2026';
const AUTH_KEY = 'ms_car_wash_admin_authenticated';

export default function AdminPage() {
  // Password Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Bookings Data State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'pickup' | 'slot'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const prevBookingsCountRef = useRef<number>(0);

  // Edit / Invoice Modal State
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editVehicleType, setEditVehicleType] = useState('');
  const [editVehicleModel, setEditVehicleModel] = useState('');
  const [editAmount, setEditAmount] = useState<number>(350);
  const [editPaymentMethod, setEditPaymentMethod] = useState<string>('Cash');
  const [editBilledBy, setEditBilledBy] = useState<string>('Naveen (Manager)');
  const [editAddOns, setEditAddOns] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState<Booking['status']>('pending');
  const [targetWhatsappPhone, setTargetWhatsappPhone] = useState('');
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null);

  // Walk-in Manual Entry Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [walkinType, setWalkinType] = useState('Car');
  const [walkinModel, setWalkinModel] = useState('');
  const [walkinAmount, setWalkinAmount] = useState<number>(350);
  const [walkinPaymentMethod, setWalkinPaymentMethod] = useState('Cash');
  const [walkinBilledBy, setWalkinBilledBy] = useState('Naveen (Manager)');
  const [walkinNotes, setWalkinNotes] = useState('');
  const [isAddingWalkin, setIsAddingWalkin] = useState(false);

  // Web Audio Chime Sound Producer
  const playNotificationChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio chime error:', e);
    }
  };

  // Check auth session storage on mount & clear old legacy cache
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(AUTH_KEY);
      if (stored === 'true') {
        setIsAuthenticated(true);
      }
      localStorage.removeItem('ms_car_wash_bookings');
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(AUTH_KEY, 'true');
      }
    } else {
      setAuthError('Incorrect password! Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(AUTH_KEY);
    }
  };

  const fetchBookingsList = async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const data = await getBookings();
      
      // Play sound alert if new booking arrived
      if (silent && soundEnabled && data.length > prevBookingsCountRef.current && prevBookingsCountRef.current > 0) {
        playNotificationChime();
      }

      prevBookingsCountRef.current = data.length;
      setBookings(data);
    } catch (e) {
      console.error('Failed to load bookings:', e);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  // Auto-refresh every 10 seconds for live counter updates
  useEffect(() => {
    if (isAuthenticated) {
      fetchBookingsList();
      const interval = setInterval(() => {
        fetchBookingsList(true);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, soundEnabled]);

  const handleClearLocalData = () => {
    if (confirm('Clear local cache? This will reset local test items.')) {
      clearAllLocalBookings();
      setBookings([]);
    }
  };

  const handleDeleteBookingItem = (id: string) => {
    if (confirm(`Are you sure you want to remove booking #${id}?`)) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  // Export Bookings to CSV File
  const exportToCSV = () => {
    if (bookings.length === 0) {
      alert('No booking records to export.');
      return;
    }

    const headers = ['Booking ID', 'Exact Time (With Seconds)', 'Customer Name', 'Phone', 'Mode', 'Vehicle Type', 'Vehicle Model', 'Bill Amount (INR)', 'Status'];
    const rows = bookings.map(b => [
      b.id,
      formatTimestampWithSeconds(b.createdAt),
      `"${b.name}"`,
      b.phone,
      b.mode,
      b.vehicleType,
      `"${b.vehicleModel}"`,
      b.totalAmount || getDefaultPrice(b.vehicleType),
      b.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ms_car_wash_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = async (id: string, newStatus: Booking['status']) => {
    const success = await updateBookingStatus(id, newStatus);
    if (success) {
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
  };

  // Open Edit & Preview Modal
  const openEditModal = (b: Booking) => {
    setEditingBooking(b);
    setEditName(b.name);
    setEditPhone(b.phone);
    setEditVehicleType(b.vehicleType);
    setEditVehicleModel(b.vehicleModel);
    setEditAmount(b.totalAmount || getDefaultPrice(b.vehicleType));
    setEditPaymentMethod('Cash');
    setEditBilledBy('Naveen (Manager)');
    setEditAddOns(b.addOns || []);
    setEditStatus(b.status);
    setTargetWhatsappPhone(b.phone);
  };

  const handleSaveEdit = async () => {
    if (!editingBooking) return;
    const updatedBookings = bookings.map(b => {
      if (b.id === editingBooking.id) {
        return {
          ...b,
          name: editName,
          phone: editPhone,
          vehicleType: editVehicleType,
          vehicleModel: editVehicleModel,
          totalAmount: Number(editAmount),
          addOns: editAddOns,
          status: editStatus,
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    await updateBookingStatus(editingBooking.id, editStatus, Number(editAmount));
    setEditingBooking(null);
  };

  const handleDownloadInvoice = async (booking: Booking) => {
    setGeneratingPdfId(booking.id);
    try {
      await generateInvoicePDF(booking, editBilledBy || 'Naveen (Manager)', editPaymentMethod || 'Cash');
    } catch (e) {
      console.error('PDF generation error:', e);
      alert('Could not generate PDF invoice.');
    } finally {
      setGeneratingPdfId(null);
    }
  };

  // Format exact date & time WITH SECONDS
  const formatTimestampWithSeconds = (isoString?: string): string => {
    const dateObj = isoString ? new Date(isoString) : new Date();
    return dateObj.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Direct WhatsApp Invoice Sender
  const sendInvoiceToWhatsApp = (booking: Booking) => {
    const phoneToUse = targetWhatsappPhone || booking.phone;
    const cleanPhone = phoneToUse.replace(/\D/g, '');
    const amountVal = editAmount || booking.totalAmount || getDefaultPrice(booking.vehicleType);
    const exactTimeStr = formatTimestampWithSeconds(booking.createdAt);
    const staffName = editBilledBy || 'Naveen (Manager)';

    const addOnText = editAddOns.length > 0 ? editAddOns.join(', ') : 'Standard Wash Services';

    const invoiceText = `🧾 MS CAR WASH — OFFICIAL TAX RECEIPT
----------------------------------
Invoice No: ${booking.id}
Generated Time: ${exactTimeStr}
Billed By: ${staffName}

CUSTOMER DETAILS:
Customer Name: ${editName || booking.name}
Phone: ${editPhone || booking.phone}
Vehicle: ${editVehicleType || booking.vehicleType} (${editVehicleModel || booking.vehicleModel})

ITEMIZED BREAKDOWN:
1. Full Water & Snow Foam Wash: ₹${amountVal}
2. Add-ons Included: ${addOnText}
3. Free Perks: Chilled Water Bottle + Car Tissue Box (FREE)

TOTAL PAID AMOUNT: ₹${amountVal} (${editPaymentMethod})
PAYMENT STATUS: PAID / COMPLETED ✓
----------------------------------
Thank you for choosing MS Car Wash — Clean Car, Happy Ride!
📍 Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti
📞 Contact: 9494829450 / 8309390902`;

    const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(invoiceText)}`;
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  // Direct 1-Tap Customer Chat on WhatsApp
  const openDirectCustomerWhatsApp = (phone: string, name: string, id: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const msg = `Hi ${name}, regarding your wash booking #${id} at MS Car Wash Srikalahasti: `;
    const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`;
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  // Walk-in Manual Wash Creation
  const handleAddWalkinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName || !walkinPhone || !walkinModel) {
      alert('Please enter customer name, phone, and vehicle model.');
      return;
    }

    setIsAddingWalkin(true);
    try {
      const newBooking = await saveBooking({
        mode: 'slot',
        name: walkinName,
        phone: walkinPhone,
        vehicleType: walkinType,
        vehicleModel: walkinModel,
        date: new Date().toISOString().split('T')[0],
        timeSlot: 'Walk-In Customer',
        notes: walkinNotes ? `Walk-In (${walkinPaymentMethod}) [Billed by ${walkinBilledBy}]: ${walkinNotes}` : `Walk-In (${walkinPaymentMethod}) [Billed by ${walkinBilledBy}]`,
      });

      // Update total amount & set completed
      await updateBookingStatus(newBooking.id, 'completed', Number(walkinAmount));
      
      setShowAddModal(false);
      setWalkinName('');
      setWalkinPhone('');
      setWalkinModel('');
      setWalkinNotes('');
      fetchBookingsList();
    } catch (error) {
      console.error('Walkin save error:', error);
      alert('Failed to save walk-in wash entry.');
    } finally {
      setIsAddingWalkin(false);
    }
  };

  const getDefaultPrice = (type: string): number => {
    if (type === 'Bike' || type === 'Scooter') return 100;
    if (type === 'Car' || type === 'Hatchback') return 350;
    if (type === 'Sedan') return 450;
    if (type === 'SUV' || type === 'Compact SUV') return 600;
    return 350;
  };

  // Metrics Calculations
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || getDefaultPrice(b.vehicleType)), 0);

  const filteredBookings = bookings.filter(b => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && b.status === 'pending') ||
      (filter === 'completed' && b.status === 'completed') ||
      (filter === 'pickup' && b.mode === 'pickup') ||
      (filter === 'slot' && b.mode === 'slot');

    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleModel.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // 1. PASSWORD GATE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-[#FBFBFC] dark:bg-[#08080A] text-[#1D1D1F] dark:text-[#FAFAFA] min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl space-y-6 text-center">
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 dark:bg-[#1C1C1F] text-black dark:text-white border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#D97757]" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight">MS Car Wash Admin Gate</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Enter the admin desk password to access billing management & invoices.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                Admin Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-sm font-medium focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
              />
            </div>

            {authError && (
              <p className="text-xs font-bold text-rose-500 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20 text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-black font-extrabold text-sm shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Desk</span>
            </button>
          </form>

        </div>
      </div>
    );
  }

  // 2. UNLOCKED ADMIN DASHBOARD
  return (
    <div className="py-10 bg-[#FBFBFC] dark:bg-[#08080A] text-[#1D1D1F] dark:text-[#FAFAFA] min-h-screen transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center gap-3.5">
            <div className="p-2 rounded-2xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shrink-0 shadow-xs">
              <Image
                src="/logo.png"
                alt="MS Car Wash Logo"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                MS Car Wash — Admin Desk
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Updates
                </span>
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Auto-refreshes every 10s. Direct WhatsApp notifications active for Naveen (8885426155).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Audio Sound Alert Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playNotificationChime();
              }}
              className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                soundEnabled
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  : 'bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-400 border-black/[0.08] dark:border-white/[0.08]'
              }`}
              title="Toggle sound chime on new bookings"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? 'Chime ON' : 'Chime OFF'}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Walk-In</span>
            </button>

            <button
              onClick={exportToCSV}
              className="px-3.5 py-2 rounded-full bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
              title="Export sales data to CSV file"
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => fetchBookingsList()}
              className="px-3.5 py-2 rounded-full bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            {bookings.length > 0 && (
              <button
                onClick={handleClearLocalData}
                className="px-3.5 py-2 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-500 hover:text-rose-500 border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold transition-all flex items-center gap-1.5"
                title="Clear local test data"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>


        {/* METRICS SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bento-card p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Total Washes</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] dark:text-white">
              {totalBookingsCount}
            </div>
            <span className="text-[10px] text-neutral-400 block">Recorded in database</span>
          </div>

          <div className="bento-card p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">Pending Washes</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">
              {pendingCount}
            </div>
            <span className="text-[10px] text-neutral-400 block">Awaiting completion</span>
          </div>

          <div className="bento-card p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">Completed Washes</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500">
              {completedCount}
            </div>
            <span className="text-[10px] text-neutral-400 block">Finished & delivered</span>
          </div>

          <div className="bento-card p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">Est. Total Revenue</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] dark:text-white">
              ₹{totalRevenue}
            </div>
            <span className="text-[10px] text-neutral-400 block">Gross revenue total</span>
          </div>

        </div>


        {/* FILTER & SEARCH CONTROLS */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          
          {/* Search bar */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by ID, Customer Name, Phone, Vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="sm:col-span-6 flex items-center gap-1 bg-neutral-200/50 dark:bg-[#1C1C1F]/60 p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] text-xs font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-[#2C2C30] text-black dark:text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === 'pending'
                  ? 'bg-amber-500 text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setFilter('pickup')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                filter === 'pickup'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Pickup
            </button>
          </div>

        </div>


        {/* BOOKINGS TABLE WITH EXACT TIMESTAMPS (WITH SECONDS) */}
        <div className="overflow-hidden rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-neutral-500 text-xs font-medium">
              Loading bookings data...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 text-xs space-y-3">
              <p className="font-bold text-sm text-[#1D1D1F] dark:text-white">No bookings found in database.</p>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Submit a new wash request from the booking page or click &quot;+ Add Walk-In Wash&quot; to create a new manual entry.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs hover:bg-emerald-500 transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Walk-In Wash</span>
                </button>
                <Link
                  href="/book"
                  className="px-4 py-2 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-black dark:text-white text-xs font-bold border border-black/[0.08] dark:border-white/[0.08]"
                >
                  Go to Booking Form
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 dark:bg-[#1C1C1F] border-b border-black/[0.08] dark:border-white/[0.08] text-neutral-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Booking ID</th>
                    <th className="py-3.5 px-4">Exact Time (w/ Seconds)</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Mode & Slot</th>
                    <th className="py-3.5 px-4">Vehicle Model</th>
                    <th className="py-3.5 px-4">Bill Total</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.06] font-medium">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-50/80 dark:hover:bg-[#1C1C1F]/50 transition-colors">
                      
                      {/* ID */}
                      <td className="py-4 px-4 font-mono font-bold text-[#D97757]">
                        {b.id}
                      </td>

                      {/* Exact Time with Seconds */}
                      <td className="py-4 px-4 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                        {formatTimestampWithSeconds(b.createdAt)}
                      </td>

                      {/* Customer Details */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-[#1D1D1F] dark:text-white flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{b.name}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <a
                            href={`tel:${b.phone}`}
                            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{b.phone}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => openDirectCustomerWhatsApp(b.phone, b.name, b.id)}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white font-bold transition-all"
                            title="Direct 1-tap WhatsApp chat"
                          >
                            WA Chat
                          </button>
                        </div>
                      </td>

                      {/* Mode & Time */}
                      <td className="py-4 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase mb-1 ${
                          b.mode === 'pickup'
                            ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-neutral-100 dark:bg-[#2C2C30] text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.06]'
                        }`}>
                          {b.mode === 'pickup' ? 'Doorstep Pickup' : 'Center Slot'}
                        </span>
                        <div className="text-xs text-neutral-500">
                          {b.mode === 'pickup' ? b.timeWindow || 'Morning' : `${b.date || 'Today'} (${b.timeSlot})`}
                        </div>
                      </td>

                      {/* Vehicle */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-[#1D1D1F] dark:text-white block">{b.vehicleType}</span>
                        <span className="text-xs text-neutral-500 block">{b.vehicleModel}</span>
                      </td>

                      {/* Bill Total */}
                      <td className="py-4 px-4 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                        ₹{b.totalAmount || getDefaultPrice(b.vehicleType)}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          b.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 animate-pulse'
                        }`}>
                          {b.status === 'completed' ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Completed</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5" />
                              <span>Pending</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right space-x-1.5">
                        {/* Quick Toggle Status */}
                        {b.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white text-[11px] font-bold transition-all"
                            title="Mark as completed"
                          >
                            Done ✓
                          </button>
                        )}

                        {/* Edit & Preview Button */}
                        <button
                          onClick={() => openEditModal(b)}
                          className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-black dark:text-white border border-black/[0.08] dark:border-white/[0.08] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-bold transition-all inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit & Bill</span>
                        </button>

                        {/* PDF Download Button */}
                        <button
                          onClick={() => handleDownloadInvoice(b)}
                          disabled={generatingPdfId === b.id}
                          className="px-3 py-1.5 rounded-full bg-[#1D1D1F] dark:bg-white disabled:bg-neutral-500 text-white dark:text-black text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{generatingPdfId === b.id ? 'PDF...' : 'PDF'}</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteBookingItem(b.id)}
                          className="p-1.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-400 hover:text-rose-500 transition-all inline-flex items-center"
                          title="Delete booking item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>


        {/* 3. ADD WALK-IN MANUAL ENTRY MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 space-y-5">
              
              <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-3">
                <div>
                  <h2 className="text-lg font-extrabold text-[#1D1D1F] dark:text-white">+ Add Walk-In Customer</h2>
                  <p className="text-xs text-neutral-500">Record a new walk-in wash entry directly in the system.</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-500 hover:text-black dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddWalkinSubmit} className="space-y-4 text-xs">
                
                <div className="space-y-1">
                  <label className="block font-bold uppercase text-neutral-500">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={walkinName}
                    onChange={(e) => setWalkinName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold uppercase text-neutral-500">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9494829450"
                    value={walkinPhone}
                    onChange={(e) => setWalkinPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold uppercase text-neutral-500">Vehicle Type</label>
                    <select
                      value={walkinType}
                      onChange={(e) => {
                        setWalkinType(e.target.value);
                        setWalkinAmount(getDefaultPrice(e.target.value));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] font-medium"
                    >
                      <option value="Car">Car (Hatchback)</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV / MUV</option>
                      <option value="Bike">Standard Bike</option>
                      <option value="Scooter">Scooter</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold uppercase text-neutral-500">Vehicle Model *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Swift, Creta"
                      value={walkinModel}
                      onChange={(e) => setWalkinModel(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-bold uppercase text-neutral-500">Bill Amount (₹ INR)</label>
                    <input
                      type="number"
                      value={walkinAmount}
                      onChange={(e) => setWalkinAmount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] font-extrabold text-sm text-emerald-600 dark:text-emerald-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-bold uppercase text-neutral-500">Payment Mode</label>
                    <select
                      value={walkinPaymentMethod}
                      onChange={(e) => setWalkinPaymentMethod(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] font-medium"
                    >
                      <option value="Cash">Cash</option>
                      <option value="UPI / PhonePe">UPI / PhonePe</option>
                      <option value="Google Pay">Google Pay</option>
                      <option value="Paytm / Card">Paytm / Card</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold uppercase text-neutral-500">Billed By (Staff Member)</label>
                  <input
                    type="text"
                    value={walkinBilledBy}
                    onChange={(e) => setWalkinBilledBy(e.target.value)}
                    placeholder="e.g. Naveen (Manager)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] font-medium"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-2.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] font-bold text-neutral-700 dark:text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isAddingWalkin}
                    className="flex-1 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-xs"
                  >
                    {isAddingWalkin ? 'Saving...' : 'Save Walk-In Entry'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}


        {/* 4. EDIT BILLING & LIVE INVOICE PREVIEW MODAL */}
        {editingBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#1D1D1F] dark:text-white flex items-center gap-2">
                    Edit Billing & Invoice Preview — <span className="text-[#D97757] font-mono">{editingBooking.id}</span>
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Modify bill amounts, staff attribution, or customer details and generate live WhatsApp invoices.
                  </p>
                </div>
                <button
                  onClick={() => setEditingBooking(null)}
                  className="p-2 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-500 hover:text-black dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Editable Form Controls */}
                <div className="lg:col-span-6 space-y-4">
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                        Vehicle Type
                      </label>
                      <input
                        type="text"
                        value={editVehicleType}
                        onChange={(e) => setEditVehicleType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        value={editVehicleModel}
                        onChange={(e) => setEditVehicleModel(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Total Bill Amount in INR */}
                    <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                      <label className="block text-[11px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                        Final Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#141416] border border-emerald-500/30 text-base font-extrabold text-emerald-600 dark:text-emerald-400 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                        Payment Method
                      </label>
                      <select
                        value={editPaymentMethod}
                        onChange={(e) => setEditPaymentMethod(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                      >
                        <option value="Cash">Cash</option>
                        <option value="UPI / PhonePe">UPI / PhonePe</option>
                        <option value="Google Pay">Google Pay</option>
                        <option value="Paytm / Card">Paytm / Card</option>
                      </select>
                    </div>
                  </div>

                  {/* Billed By Staff Member */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                      Billed By (Staff Member Name)
                    </label>
                    <input
                      type="text"
                      value={editBilledBy}
                      onChange={(e) => setEditBilledBy(e.target.value)}
                      placeholder="e.g. Naveen (Manager)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                    />
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-500 mb-1">
                      Wash Status
                    </label>
                    <div className="flex gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => setEditStatus('pending')}
                        className={`flex-1 py-2.5 rounded-xl transition-all ${
                          editStatus === 'pending'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-500'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditStatus('completed')}
                        className={`flex-1 py-2.5 rounded-xl transition-all ${
                          editStatus === 'completed'
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-500'
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>

                  {/* Target WhatsApp Number */}
                  <div className="space-y-1.5 pt-2 border-t border-black/[0.08] dark:border-white/[0.08]">
                    <label className="block text-xs font-bold uppercase text-neutral-500">
                      Target WhatsApp Number for Invoice
                    </label>
                    <input
                      type="tel"
                      value={targetWhatsappPhone}
                      onChange={(e) => setTargetWhatsappPhone(e.target.value)}
                      placeholder="e.g. 9848012345"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="flex-1 py-3 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-black font-extrabold text-xs shadow-xs"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => sendInvoiceToWhatsApp(editingBooking)}
                      className="flex-1 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send WhatsApp Bill</span>
                    </button>
                  </div>

                </div>


                {/* Professional Live Invoice Receipt Preview */}
                <div className="lg:col-span-6 p-6 rounded-3xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] space-y-4">
                  
                  <div className="flex items-center justify-between border-b border-black/[0.08] dark:border-white/[0.08] pb-3">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-extrabold uppercase text-[#1D1D1F] dark:text-white">Professional Live Receipt</span>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-[#D97757]">{editingBooking.id}</span>
                  </div>

                  {/* Receipt Card Body */}
                  <div className="bg-white dark:bg-[#141416] p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] space-y-3.5 text-xs shadow-xs font-sans">
                    
                    {/* Header Emblem */}
                    <div className="flex items-start justify-between border-b border-dashed border-black/[0.1] dark:border-white/[0.1] pb-3">
                      <div className="flex items-center gap-2.5">
                        <Image
                          src="/logo.png"
                          alt="Logo"
                          width={36}
                          height={36}
                          className="w-9 h-9 object-contain"
                        />
                        <div>
                          <h4 className="font-extrabold text-sm text-[#1D1D1F] dark:text-white leading-none">MS CAR WASH</h4>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">Clean Car... Happy Ride!</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-400 block font-mono font-semibold">
                          {formatTimestampWithSeconds(editingBooking.createdAt)}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-bold block">
                          Billed By: {editBilledBy}
                        </span>
                      </div>
                    </div>

                    {/* Customer & Vehicle Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-[11px] bg-neutral-50 dark:bg-[#1C1C1F] p-3 rounded-xl border border-black/[0.05] dark:border-white/[0.05]">
                      <div>
                        <span className="text-neutral-400 block uppercase text-[9px] font-bold">Customer Info</span>
                        <span className="font-bold block text-black dark:text-white">{editName}</span>
                        <span className="text-[10px] text-neutral-500 font-medium">+91 {editPhone}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 block uppercase text-[9px] font-bold">Vehicle Details</span>
                        <span className="font-bold block text-black dark:text-white">{editVehicleType}</span>
                        <span className="text-[10px] text-neutral-500 font-medium">{editVehicleModel}</span>
                      </div>
                    </div>

                    {/* Line Items */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between font-bold text-[#1D1D1F] dark:text-white">
                        <span>1. Full Water & Snow Foam Wash</span>
                        <span>₹{editAmount}</span>
                      </div>

                      {editAddOns.length > 0 && (
                        <div className="text-[10px] text-neutral-400 flex justify-between">
                          <span>2. Add-ons ({editAddOns.join(', ')})</span>
                          <span>Included</span>
                        </div>
                      )}

                      <div className="text-[10px] text-amber-600 dark:text-amber-400 flex justify-between font-bold bg-amber-500/10 p-2 rounded-lg">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" /> Complimentary Water Bottle + Car Tissue Box
                        </span>
                        <span>FREE</span>
                      </div>
                    </div>

                    {/* Grand Total */}
                    <div className="pt-3 border-t border-black/[0.08] dark:border-white/[0.08] flex justify-between items-center text-sm font-extrabold">
                      <span>TOTAL PAID ({editPaymentMethod}):</span>
                      <span className="text-emerald-600 dark:text-emerald-400 text-lg">₹{editAmount}</span>
                    </div>

                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(editingBooking)}
                      className="flex-1 py-2 rounded-full bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-500" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => sendInvoiceToWhatsApp(editingBooking)}
                      className="flex-1 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>WhatsApp Bill</span>
                    </button>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
