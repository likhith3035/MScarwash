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
  BellRing,
  Star,
  MapPin,
  ClipboardList,
  TrendingUp,
  Banknote,
  Wrench,
  Bike,
  Car,
  Truck,
  Zap,
  Activity,
  Layers,
  Filter,
  ArrowUpRight,
  CircleDollarSign,
  Check,
  Share2,
  Globe,
  Crown,
  CheckCheck,
  FileSpreadsheet,
  Receipt,
  Copy,
} from 'lucide-react';
import { Booking } from '@/lib/types';
import { getBookings, updateBookingStatus, saveBooking, clearAllLocalBookings, deleteBooking, deleteAllBookings } from '@/lib/supabase';
import { generateInvoicePDF } from '@/lib/invoice-generator';
import { JobCardModal } from '@/components/JobCardModal';

const ADMIN_PASSWORD = 'naveen@2026';
const AUTH_KEY = 'ms_car_wash_admin_authenticated';

export default function AdminPage() {
  // Password Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Bookings Data State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<
    'all' | 'pending' | 'in_progress' | 'completed' | 'pickup' | 'slot' | 'today_pickups' | 'in_progress_washes' | 'pending_mechanic'
  >('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | 'month'>('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [printingTokenBooking, setPrintingTokenBooking] = useState<Booking | null>(null);
  const prevBookingsCountRef = useRef<number>(0);

  // Growth, Review & Financial Export States
  const [reviewedBookingIds, setReviewedBookingIds] = useState<Set<string>>(new Set());
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [reviewLangModalBooking, setReviewLangModalBooking] = useState<Booking | null>(null);
  const [copiedReviewId, setCopiedReviewId] = useState<string | null>(null);

  // Edit / Invoice Modal State
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editVehicleType, setEditVehicleType] = useState('');
  const [editVehicleModel, setEditVehicleModel] = useState('');
  const [editAmount, setEditAmount] = useState<number>(350);
  const [editPaymentMethod, setEditPaymentMethod] = useState<string>('Cash');
  const [editBilledBy, setEditBilledBy] = useState<string>('Kami Naveen (Owner)');
  const [editAddOns, setEditAddOns] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState<Booking['status']>('pending');
  const [editBeforePhotoUrl, setEditBeforePhotoUrl] = useState<string>('');
  const [editAfterPhotoUrl, setEditAfterPhotoUrl] = useState<string>('');
  const [targetWhatsappPhone, setTargetWhatsappPhone] = useState<string>('');
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null);
  const [pdfPreviewModal, setPdfPreviewModal] = useState<{
    booking: Booking;
    blobUrl: string;
    download: () => void;
    fileName: string;
  } | null>(null);
  const [jobCardBooking, setJobCardBooking] = useState<Booking | null>(null);

  // Walk-in Manual Entry Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [walkinType, setWalkinType] = useState('Car');
  const [walkinModel, setWalkinModel] = useState('');
  const [walkinAmount, setWalkinAmount] = useState<number>(350);
  const [walkinPaymentMethod, setWalkinPaymentMethod] = useState('Cash');
  const [walkinBilledBy, setWalkinBilledBy] = useState('Kami Naveen (Owner)');
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
      const storedLocal = localStorage.getItem('ms_car_wash_bookings_v2');
      if (storedLocal && (storedLocal.includes('MSCW-TEST') || storedLocal.includes('MSCW-9999') || storedLocal.includes('Suresh Kumar') || storedLocal.includes('Test Customer'))) {
        localStorage.removeItem('ms_car_wash_bookings_v2');
      }
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

  // Auto-refresh every 10 seconds for live counter updates & load reviewed IDs
  useEffect(() => {
    try {
      const savedReviews = localStorage.getItem('ms_car_wash_reviewed_bookings');
      if (savedReviews) {
        setReviewedBookingIds(new Set(JSON.parse(savedReviews)));
      }
    } catch {}

    if (isAuthenticated) {
      fetchBookingsList();
      const interval = setInterval(() => {
        fetchBookingsList(true);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, soundEnabled]);

  const handleClearLocalData = async () => {
    if (confirm('Are you sure you want to delete ALL test bookings from the database and local cache?')) {
      await deleteAllBookings();
      setBookings([]);
    }
  };

  const handleDeleteBookingItem = async (id: string) => {
    if (confirm(`Are you sure you want to permanently delete booking #${id}?`)) {
      setBookings(prev => prev.filter(b => b.id !== id));
      await deleteBooking(id);
    }
  };

  // 👑 Customer Loyalty & Frequency Analysis
  const getCustomerLoyaltyInfo = (phone?: string) => {
    const clean = (phone || '').replace(/\D/g, '');
    const count = (clean && customerBookingCounts[clean]) || 1;
    if (count >= 5) {
      return {
        label: `VIP Patron (${count} Visits)`,
        badgeClass: 'bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300 font-black',
        icon: 'crown',
        count,
      };
    }
    if (count >= 2) {
      return {
        label: `Regular (${count} Visits)`,
        badgeClass: 'bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300 font-extrabold',
        icon: 'star',
        count,
      };
    }
    return {
      label: '1st Visit',
      badgeClass: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold',
      icon: 'new',
      count: 1,
    };
  };

  // 📊 Advanced Multi-Range CSV Financial Audit Export
  const handleExportEnhancedCSV = (targetRange: 'active' | 'today' | 'yesterday' | 'month' | 'all' = 'active') => {
    let targetList: Booking[] = [];
    let rangeLabel = 'Active Filter';

    if (targetRange === 'today') {
      targetList = bookings.filter((b) => getLocalDateFromIso(b.createdAt) === todayStr);
      rangeLabel = `Today (${todayStr})`;
    } else if (targetRange === 'yesterday') {
      targetList = bookings.filter((b) => getLocalDateFromIso(b.createdAt) === yesterdayStr);
      rangeLabel = `Yesterday (${yesterdayStr})`;
    } else if (targetRange === 'month') {
      targetList = bookings.filter((b) => {
        const d = getLocalDateFromIso(b.createdAt);
        return d && d.startsWith(monthStr);
      });
      rangeLabel = `This Month (${monthStr})`;
    } else if (targetRange === 'all') {
      targetList = bookings;
      rangeLabel = 'All Time Records';
    } else {
      targetList = filteredBookings;
      rangeLabel = `Current Filter (${filter.toUpperCase()} - ${dateFilter.toUpperCase()})`;
    }

    if (targetList.length === 0) {
      alert(`No booking records found for export scope: ${rangeLabel}`);
      return;
    }

    // Compute Executive Financial Metrics for Top Block
    const totalRev = targetList
      .filter((b) => b.status === 'completed')
      .reduce((sum, b) => sum + (b.totalAmount || getDefaultPrice(b.vehicleType)), 0);

    const cashRev = targetList
      .filter((b) => b.status === 'completed')
      .reduce((sum, b) => {
        const noteStr = (b.notes || '').toUpperCase();
        const isUpi = noteStr.includes('UPI') || noteStr.includes('GPAY') || noteStr.includes('PHONEPE') || noteStr.includes('ONLINE') || noteStr.includes('PAYTM');
        return !isUpi ? sum + (b.totalAmount || getDefaultPrice(b.vehicleType)) : sum;
      }, 0);

    const upiRev = targetList
      .filter((b) => b.status === 'completed')
      .reduce((sum, b) => {
        const noteStr = (b.notes || '').toUpperCase();
        const isUpi = noteStr.includes('UPI') || noteStr.includes('GPAY') || noteStr.includes('PHONEPE') || noteStr.includes('ONLINE') || noteStr.includes('PAYTM');
        return isUpi ? sum + (b.totalAmount || getDefaultPrice(b.vehicleType)) : sum;
      }, 0);

    const completedCount = targetList.filter((b) => b.status === 'completed').length;
    const bikesCount = targetList.filter((b) => b.vehicleType === 'Bike' || b.vehicleType === 'Scooter').length;
    const carsCount = targetList.filter((b) => b.vehicleType === 'Car' || b.vehicleType === 'SUV' || b.vehicleType === 'Van' || b.vehicleType === 'Sedan' || b.vehicleType === 'Hatchback').length;
    const heavyCount = targetList.filter((b) => b.vehicleType === 'Truck' || b.vehicleType === 'Tractor' || b.vehicleType === 'JCB' || b.vehicleType === 'Auto').length;

    const escapeCsv = (str: string | number | undefined | null) => {
      if (str === undefined || str === null) return '""';
      const clean = String(str).replace(/"/g, '""').replace(/\r?\n|\r/g, ' ');
      return `"${clean}"`;
    };

    let csvContent = 'data:text/csv;charset=utf-8,';

    // Top Block: Executive Financial & Operations Summary
    csvContent += '========================================================================================\r\n';
    csvContent += `MS CAR MECHANIC & CAR WASH — AUDIT & FINANCIAL REPORT\r\n`;
    csvContent += `Center Location: Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti - 517644\r\n`;
    csvContent += `Report Generated: ${new Date().toLocaleString('en-IN')} | Desk Owner: Kami Naveen\r\n`;
    csvContent += `Export Scope: ${rangeLabel} | Total Bookings Count: ${targetList.length} | Completed Jobs: ${completedCount}\r\n`;
    csvContent += `Total Completed Revenue: INR ${totalRev} | Cash: INR ${cashRev} | UPI: INR ${upiRev}\r\n`;
    csvContent += `Fleet Serviced: Bikes: ${bikesCount} | Cars/SUVs: ${carsCount} | Commercial/Heavy: ${heavyCount}\r\n`;
    csvContent += '========================================================================================\r\n\r\n';

    // CSV Table Headers
    const headers = [
      'Booking ID',
      'Date & Time (IST)',
      'Customer Name',
      'Phone Number',
      'Vehicle Category',
      'Vehicle Model',
      'Service Mode',
      'Status',
      'Gross Bill Amount (INR)',
      'Payment Mode',
      'Preferred Slot / Window',
      'Pickup Address / Landmark',
      'Service Notes & Add-Ons',
      'Live Tracking URL',
    ];

    csvContent += headers.map((h) => `"${h}"`).join(',') + '\r\n';

    // Data rows
    targetList.forEach((b) => {
      const noteStr = (b.notes || '').toUpperCase();
      const isUpi = noteStr.includes('UPI') || noteStr.includes('GPAY') || noteStr.includes('PHONEPE') || noteStr.includes('ONLINE') || noteStr.includes('PAYTM');
      const paymentMode = isUpi ? 'UPI / Online' : 'Cash';
      const billAmount = b.totalAmount || getDefaultPrice(b.vehicleType);

      const row = [
        escapeCsv(b.id),
        escapeCsv(formatTimestampWithSeconds(b.createdAt)),
        escapeCsv(b.name),
        escapeCsv(b.phone),
        escapeCsv(b.vehicleType),
        escapeCsv(b.vehicleModel),
        escapeCsv(b.mode === 'pickup' ? 'Doorstep Pickup' : 'Center Slot'),
        escapeCsv(b.status.toUpperCase()),
        escapeCsv(billAmount),
        escapeCsv(paymentMode),
        escapeCsv(b.mode === 'pickup' ? b.timeWindow : `${b.date || ''} (${b.timeSlot || ''})`),
        escapeCsv(b.address || 'In-Center Drive-In'),
        escapeCsv(b.notes || 'Water Wash'),
        escapeCsv(`https://mscarwash.vercel.app/track?id=${b.id}`),
      ];

      csvContent += row.join(',') + '\r\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const cleanRangeName = rangeLabel.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    link.setAttribute('download', `MS_Car_Wash_Audit_${cleanRangeName}_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
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
    setEditBilledBy('Kami Naveen (Owner)');
    setEditAddOns(b.addOns || []);
    setEditStatus(b.status);
    setEditBeforePhotoUrl(b.beforePhotoUrl || '');
    setEditAfterPhotoUrl(b.afterPhotoUrl || '');
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
          beforePhotoUrl: editBeforePhotoUrl,
          afterPhotoUrl: editAfterPhotoUrl,
        };
      }
      return b;
    });

    setBookings(updatedBookings);
    await updateBookingStatus(editingBooking.id, editStatus, Number(editAmount));
    setEditingBooking(null);
  };

  // Send Before/After Photo Wash Report to Customer via WhatsApp
  const sendMediaReportToWhatsApp = (booking: Booking) => {
    const phoneToUse = targetWhatsappPhone || booking.phone;
    const cleanPhone = phoneToUse.replace(/\D/g, '');
    const beforeUrl = editBeforePhotoUrl || booking.beforePhotoUrl || 'Not uploaded';
    const afterUrl = editAfterPhotoUrl || booking.afterPhotoUrl || 'Not uploaded';

    const text = `✨ MS CAR MECHANIC & CAR WASH — SERVICE COMPLETION REPORT ✨
-----------------------------------------------
Booking Ref: ${booking.id}
Customer: ${booking.name}
Vehicle: ${booking.vehicleType} - ${booking.vehicleModel}

📸 BEFORE WASH/SERVICE PHOTO:
${beforeUrl}

✨ AFTER WASH/SERVICE PHOTO:
${afterUrl}

Thank you for choosing MS Car Mechanic & Car Wash Srikalahasti! Call 8309390902 for your next doorstep or slot service.`;

    const encoded = encodeURIComponent(text);
    const waUrl = cleanPhone ? `https://wa.me/91${cleanPhone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  // WhatsApp Alert: Wash Started
  const sendWashStartWhatsApp = (booking: Booking) => {
    const cleanPhone = booking.phone.replace(/\D/g, '');
    const text = `🌊 MS CAR MECHANIC & CAR WASH — SERVICE STARTED
Hi ${booking.name}! We have started servicing your ${booking.vehicleType} (${booking.vehicleModel}) [Ref: ${booking.id}]. 
Our team is performing scratch-free foam washing, repairs & high-pressure underbody rinse. We will update you once ready!`;
    window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // WhatsApp Alert: Vehicle Ready for Pickup/Delivery
  const sendWashReadyWhatsApp = (booking: Booking) => {
    const cleanPhone = booking.phone.replace(/\D/g, '');
    const text = `✨ MS CAR MECHANIC & CAR WASH — VEHICLE READY!
Hi ${booking.name}! Great news! Your ${booking.vehicleType} (${booking.vehicleModel}) is clean, polished & ready for pickup/delivery! [Ref: ${booking.id}]
Thank you for choosing MS Car Mechanic & Car Wash Srikalahasti. Call 8309390902 for assistance!`;
    window.open(`https://wa.me/91${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // ⭐ Smart Bilingual Google Review Request Dispatch
  const handleSendReviewWhatsApp = (booking: Booking, lang: 'en' | 'te' = 'en') => {
    const cleanPhone = (booking.phone || '').replace(/\D/g, '');
    if (!cleanPhone) {
      alert('No valid phone number for customer.');
      return;
    }

    const enMsg = `Hi ${booking.name || 'there'}! 👋 Thank you for choosing *MS Car Mechanic & Car Wash Srikalahasti* for your ${booking.vehicleType} (${booking.vehicleModel || 'Vehicle'})! 🚗✨

Your service is completed, and your vehicle is sparkling clean and ready.

Could you please take 10 seconds to share your experience with a 5-star Google review? It helps our local team immensely:
⭐ https://share.google/bN5KNns6mgg3uI4tP

Thank you, and have a safe and happy ride! 🚘
— Kami Naveen (Owner), MS Auto Care / Madhu Sujatha Car Wash (Panagal, Srikalahasti)`;

    const teMsg = `నమస్కారం ${booking.name || 'గారు'}! 🙏

*MS కార్ మెకానిక్ & కార్ వాష్ (శ్రీకాళహస్తి)* వద్ద మీ ${booking.vehicleType} (${booking.vehicleModel || 'వాహనం'}) సర్వీస్ పూర్తయింది! 🚗✨

మీ వాహనం సర్వీస్ విజయవంతంగా పూర్తయింది మరియు డెలివరీకి సిద్ధంగా ఉంది.

మా సర్వీస్ మీకు నచ్చినట్లయితే, దయచేసి క్రింది లింక్ ద్వారా గూగుల్ లో 5-స్టార్ రేటింగ్ & రివ్యూ ఇవ్వండి:
⭐ https://share.google/bN5KNns6mgg3uI4tP

ధన్యవాదాలు! మీ ప్రయాణం సురక్షితంగా సాగాలని కోరుకుంటున్నాము! 🚘
— కామి నవీన్ (ఓనర్), MS ఆటో కేర్ / మధు సుజాత కార్ వాష్ (పనగల్, శ్రీకాళహస్తి)`;

    const message = lang === 'te' ? teMsg : enMsg;
    const url = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Mark as reviewed
    const updated = new Set(reviewedBookingIds);
    updated.add(booking.id);
    setReviewedBookingIds(updated);
    try {
      localStorage.setItem('ms_car_wash_reviewed_bookings', JSON.stringify(Array.from(updated)));
    } catch {}

    setReviewLangModalBooking(null);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  // 🧾 1-Click WhatsApp Digital Receipt Dispatch
  const handleSendReceiptWhatsApp = (booking: Booking) => {
    const cleanPhone = (booking.phone || '').replace(/\D/g, '');
    if (!cleanPhone) {
      alert('No valid phone number for customer.');
      return;
    }

    const amount = booking.totalAmount || getDefaultPrice(booking.vehicleType);
    const dateFormatted = formatTimestampWithSeconds(booking.createdAt);

    const message = `🧾 *MS CAR MECHANIC & CAR WASH — OFFICIAL PAYMENT RECEIPT*
🏢 *Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti (SKHT)*
📞 Helpline: 8309390902
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Booking ID:* ${booking.id}
👤 *Customer Name:* ${booking.name}
🚘 *Vehicle:* ${booking.vehicleType} - ${booking.vehicleModel}
📅 *Date & Time:* ${dateFormatted}
🛠️ *Service:* ${booking.notes || 'Water Wash & Complete Detailing'}
✨ *Add-ons:* ${booking.addOns && booking.addOns.length > 0 ? booking.addOns.join(', ') : 'Complimentary Package'}
💰 *Gross Bill Amount:* ₹${amount.toLocaleString('en-IN')} (PAID)
━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 *Track Status / Download Official Tax Invoice PDF:*
https://mscarwash.vercel.app/track?id=${booking.id}

*Thank you for trusting MS Car Mechanic & Car Wash Srikalahasti! Have a great ride!*`;

    const url = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  // Copy Google Review Link
  const handleCopyReviewLink = (bookingId: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://share.google/bN5KNns6mgg3uI4tP');
      setCopiedReviewId(bookingId);
      setTimeout(() => setCopiedReviewId(null), 2500);
    }
  };

  // Open Google Maps Directions for Pickup Wash Address
  const openGoogleMapsRoute = (address?: string) => {
    if (!address) return;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address + ', Srikalahasti')}`;
    window.open(mapsUrl, '_blank');
  };

  const handleDownloadInvoice = async (booking: Booking) => {
    setGeneratingPdfId(booking.id);
    try {
      const res = await generateInvoicePDF(
        booking,
        editBilledBy || 'Kami Naveen (Owner)',
        editPaymentMethod || 'Cash',
        false // Do NOT auto download
      );
      setPdfPreviewModal({
        booking,
        blobUrl: res.blobUrl,
        download: res.download,
        fileName: res.fileName
      });
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
    const staffName = editBilledBy || 'Kami Naveen (Owner)';

    const addOnText = editAddOns.length > 0 ? editAddOns.join(', ') : 'Standard Wash Services';

    const invoiceText = `🧾 MS CAR MECHANIC & CAR WASH — OFFICIAL TAX RECEIPT
-----------------------------------
Invoice No: ${booking.id}
Generated Time: ${exactTimeStr}
Billed By: ${staffName}

CUSTOMER DETAILS:
Customer Name: ${editName || booking.name}
Phone: ${editPhone || booking.phone}
Vehicle: ${editVehicleType || booking.vehicleType} (${editVehicleModel || booking.vehicleModel})

ITEMIZED BREAKDOWN:
1. Full Water & Snow Foam Wash / Repairs: ₹${amountVal}
2. Add-ons Included: ${addOnText}

TOTAL PAID AMOUNT: ₹${amountVal} (${editPaymentMethod})
PAYMENT STATUS: PAID / COMPLETED ✓
----------------------------------
Thank you for choosing MS Car Mechanic & Car Wash — Clean Car, Happy Ride!
📍 Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti
📞 Contact: 8309390902`;

    const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(invoiceText)}`;
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  // Direct 1-Tap Customer Chat on WhatsApp
  const openDirectCustomerWhatsApp = (phone: string, name: string, id: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    const msg = `Hi ${name}, regarding your service booking #${id} at MS Car Mechanic & Car Wash Srikalahasti: `;
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

  // Helper to detect mechanic repairs & inspections
  const isMechanicBooking = (b: Booking): boolean => {
    const text = `${b.notes || ''} ${b.vehicleModel || ''}`.toLowerCase();
    return (
      text.includes('repair') ||
      text.includes('mechanic') ||
      text.includes('engine') ||
      text.includes('brake') ||
      text.includes('ac gas') ||
      text.includes('oil change') ||
      text.includes('electrical') ||
      text.includes('suspension') ||
      text.includes('breakdown') ||
      b.totalAmount === 999
    );
  };

  // Metrics Calculations
  const totalBookingsCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const inProgressCount = bookings.filter(b => b.status === 'in_progress').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || getDefaultPrice(b.vehicleType)), 0);
  const pickupCount = bookings.filter(b => b.mode === 'pickup').length;
  const slotCount = bookings.filter(b => b.mode === 'slot').length;
  const avgTicketValue = totalBookingsCount > 0 ? Math.round(totalRevenue / totalBookingsCount) : 0;

  // Repeat Customer Phone Frequency
  const customerBookingCounts = bookings.reduce((acc, b) => {
    const clean = (b.phone || '').replace(/\D/g, '');
    if (clean) acc[clean] = (acc[clean] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const vehicleStats = bookings.reduce((acc, b) => {
    const v = b.vehicleType || 'Car';
    acc[v] = (acc[v] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getLocalDateString = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getLocalDateFromIso = (isoStr?: string): string => {
    if (!isoStr) return '';
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr.split('T')[0] || '';
    return getLocalDateString(d);
  };

  const now = new Date();
  const todayStr = getLocalDateString(now);

  const yesterdayObj = new Date(now);
  yesterdayObj.setDate(yesterdayObj.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterdayObj);
  const monthStr = todayStr.substring(0, 7);

  // Today's Detailed Shift Statistics
  const todayBookings = bookings.filter(b => getLocalDateFromIso(b.createdAt) === todayStr);
  const todayCompleted = todayBookings.filter(b => b.status === 'completed');
  const todayPending = todayBookings.filter(b => b.status !== 'completed');
  const todayRevenue = todayCompleted.reduce((sum, b) => sum + (b.totalAmount || getDefaultPrice(b.vehicleType)), 0);

  // Cash vs UPI Collections for Today
  const todayCashRevenue = todayCompleted.reduce((sum, b) => {
    const noteStr = (b.notes || '').toUpperCase();
    const isUpi = noteStr.includes('UPI') || noteStr.includes('GPAY') || noteStr.includes('PHONEPE') || noteStr.includes('ONLINE') || noteStr.includes('PAYTM');
    return isUpi ? sum : sum + (b.totalAmount || getDefaultPrice(b.vehicleType));
  }, 0);

  const todayUpiRevenue = todayCompleted.reduce((sum, b) => {
    const noteStr = (b.notes || '').toUpperCase();
    const isUpi = noteStr.includes('UPI') || noteStr.includes('GPAY') || noteStr.includes('PHONEPE') || noteStr.includes('ONLINE') || noteStr.includes('PAYTM');
    return isUpi ? sum + (b.totalAmount || getDefaultPrice(b.vehicleType)) : sum;
  }, 0);

  const cashPercent = todayRevenue > 0 ? Math.round((todayCashRevenue / todayRevenue) * 100) : 0;
  const upiPercent = todayRevenue > 0 ? Math.round((todayUpiRevenue / todayRevenue) * 100) : 0;

  // Fleet volume by vehicle category for Today
  const todayBikesCount = todayBookings.filter(b => b.vehicleType === 'Bike' || b.vehicleType === 'Scooter').length;
  const todayCarsCount = todayBookings.filter(b => b.vehicleType === 'Car' || b.vehicleType === 'SUV' || b.vehicleType === 'Van' || b.vehicleType === 'Sedan' || b.vehicleType === 'Hatchback').length;
  const todayHeavyCount = todayBookings.filter(b => b.vehicleType === 'Truck' || b.vehicleType === 'Tractor' || b.vehicleType === 'JCB' || b.vehicleType === 'Auto').length;

  // Quick Preset Counts
  const todayPickupsCount = bookings.filter(b => b.mode === 'pickup' && getLocalDateFromIso(b.createdAt) === todayStr).length;
  const inProgressWashesCount = inProgressCount;
  const pendingMechanicCount = bookings.filter(b => isMechanicBooking(b) && b.status === 'pending').length;

  // Turnaround and Completion Rate
  const completionRate = todayBookings.length > 0 ? Math.round((todayCompleted.length / todayBookings.length) * 100) : 0;

  const sendDailySummaryWhatsApp = () => {
    const avgTicket = todayCompleted.length > 0 ? Math.round(todayRevenue / todayCompleted.length) : 0;
    const dateFormatted = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const message = `📊 *MS CAR MECHANIC & CAR WASH — DAILY SHIFT CLOSING SUMMARY*
🏢 *Srikalahasti Center Desk*
📅 *Date:* ${dateFormatted}
━━━━━━━━━━━━━━━━━━━━━━━━━━
🚗 *FLEET VOLUME TODAY:* ${todayBookings.length} Vehicles
• 🏍️ Two-Wheelers (Bikes/Scooters): ${todayBikesCount}
• 🚘 Passenger Cars & SUVs: ${todayCarsCount}
• 🚛 Commercial & Heavy: ${todayHeavyCount}

✅ *JOB STATUS:*
• Completed & Delivered: ${todayCompleted.length} (${completionRate}%)
• In-Wash / Active: ${inProgressCount}
• Pending Orders: ${todayPending.length}
• Today's Doorstep Pickups: ${todayPickupsCount}

💰 *PAYMENT & CASHFLOW BREAKDOWN:*
• 💵 Cash Collections: ₹${todayCashRevenue.toLocaleString('en-IN')} (${cashPercent}%)
• 📱 UPI / Online Collections: ₹${todayUpiRevenue.toLocaleString('en-IN')} (${upiPercent}%)
• 💎 Total Today's Revenue: ₹${todayRevenue.toLocaleString('en-IN')}
• 🏷️ Avg Ticket Value: ₹${avgTicket}

⏱️ *EFFICIENCY & ALL-TIME:*
• Avg Turnaround Time: ~25 mins (Foam Wash) | ~1.5h (Mechanic)
• All-Time Recorded Revenue: ₹${totalRevenue.toLocaleString('en-IN')}

━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Panagal, Opp Old RTO Office, Near Highway Srikalahasti
📞 Owner: Kami Naveen | Helpline: 8309390902`;

    const url = `https://wa.me/918309390902?text=${encodeURIComponent(message)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  // Print End-of-Day Shift Summary Sheet
  const handlePrintShiftSummary = () => {
    if (typeof window === 'undefined') return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups to print the shift summary.');
      return;
    }
    const dateFormatted = new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const avgTicket = todayCompleted.length > 0 ? Math.round(todayRevenue / todayCompleted.length) : 0;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>MS Car Wash - Shift Summary (${dateFormatted})</title>
          <style>
            * { box-sizing: border-box; }
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 25px; color: #111; line-height: 1.4; }
            .header { text-align: center; border-bottom: 2px solid #059669; padding-bottom: 12px; margin-bottom: 18px; }
            .logo-text { font-size: 20px; font-weight: 900; letter-spacing: -0.5px; color: #111; }
            .sub { font-size: 11px; color: #555; margin-top: 2px; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
            .box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; background: #f8fafc; }
            .box-title { font-size: 10px; font-weight: 800; text-transform: uppercase; color: #64748b; }
            .box-val { font-size: 18px; font-weight: 900; color: #0f172a; margin-top: 4px; }
            .box-sub { font-size: 10px; color: #059669; font-weight: 700; margin-top: 2px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 11px; }
            th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }
            th { background: #f1f5f9; font-weight: 800; text-transform: uppercase; font-size: 10px; }
            .footer { margin-top: 24px; border-top: 1px dashed #94a3b8; padding-top: 14px; display: flex; justify-content: space-between; font-size: 11px; color: #475569; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo-text">MS CAR MECHANIC & CAR WASH — DAILY SHIFT SUMMARY</div>
            <div class="sub">Panagal, Opp Old RTO Office, Beside Bharat Petroleum, Srikalahasti | Helpline: 8309390902</div>
            <div class="sub"><strong>Date:</strong> ${dateFormatted} | <strong>Shift Billed By:</strong> Kami Naveen (Owner)</div>
          </div>

          <div class="grid">
            <div class="box">
              <div class="box-title">Today's Revenue</div>
              <div class="box-val">₹${todayRevenue.toLocaleString('en-IN')}</div>
              <div class="box-sub">Cash: ₹${todayCashRevenue.toLocaleString('en-IN')} (${cashPercent}%) | UPI: ₹${todayUpiRevenue.toLocaleString('en-IN')} (${upiPercent}%)</div>
            </div>
            <div class="box">
              <div class="box-title">Fleet Serviced</div>
              <div class="box-val">${todayBookings.length} Vehicles</div>
              <div class="box-sub">Bikes: ${todayBikesCount} | Cars: ${todayCarsCount} | Heavy: ${todayHeavyCount}</div>
            </div>
            <div class="box">
              <div class="box-title">Completion Status</div>
              <div class="box-val">${todayCompleted.length} Completed (${completionRate}%)</div>
              <div class="box-sub">Avg Ticket: ₹${avgTicket} | Active/Pending: ${todayPending.length}</div>
            </div>
          </div>

          <div style="font-weight: 800; font-size: 12px; margin-bottom: 4px;">Today's Serviced Vehicles (${todayBookings.length}):</div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Time</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Vehicle Model</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Bill (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${todayBookings.length === 0 ? '<tr><td colspan="8" style="text-align:center; padding:12px;">No bookings recorded for today.</td></tr>' : todayBookings.map(b => `
                <tr>
                  <td><strong>${b.id}</strong></td>
                  <td>${formatTimestampWithSeconds(b.createdAt).split(',')[1] || ''}</td>
                  <td>${b.name}</td>
                  <td>${b.phone}</td>
                  <td>${b.vehicleType} (${b.vehicleModel})</td>
                  <td>${b.mode === 'pickup' ? 'Doorstep Pickup' : 'Center Slot'}</td>
                  <td><strong>${b.status.toUpperCase()}</strong></td>
                  <td>₹${b.totalAmount || getDefaultPrice(b.vehicleType)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <div>Printed: ${new Date().toLocaleTimeString('en-IN')} | MS Car Wash Desk System</div>
            <div>Cashier / Manager Signoff: _________________________</div>
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const filteredBookings = bookings.filter(b => {
    const createdDateStr = getLocalDateFromIso(b.createdAt);

    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && b.status === 'pending') ||
      (filter === 'in_progress' && b.status === 'in_progress') ||
      (filter === 'completed' && b.status === 'completed') ||
      (filter === 'pickup' && b.mode === 'pickup') ||
      (filter === 'slot' && b.mode === 'slot') ||
      (filter === 'today_pickups' && b.mode === 'pickup' && createdDateStr === todayStr) ||
      (filter === 'in_progress_washes' && b.status === 'in_progress') ||
      (filter === 'pending_mechanic' && isMechanicBooking(b) && b.status === 'pending');

    const matchesDate =
      dateFilter === 'all' ||
      (dateFilter === 'today' && createdDateStr === todayStr) ||
      (dateFilter === 'yesterday' && createdDateStr === yesterdayStr) ||
      (dateFilter === 'month' && createdDateStr.startsWith(monthStr));

    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicleModel.toLowerCase().includes(search.toLowerCase()) ||
      (b.notes || '').toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesDate && matchesSearch;
  });

  // 1. PASSWORD GATE SCREEN (RESTRICTED TO OWNER & ADMIN ONLY)
  if (!isAuthenticated) {
    return (
      <div className="py-16 sm:py-24 bg-[#FBFBFC] dark:bg-[#08080A] text-[#1D1D1F] dark:text-[#FAFAFA] min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl space-y-6 text-center relative overflow-hidden">
          
          {/* Top Restricted Warning Banner */}
          <div className="px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            <span>Restricted — Admin & Owner Access Only</span>
          </div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-neutral-100 dark:bg-[#1C1C1F] text-black dark:text-white border border-black/[0.08] dark:border-white/[0.08] flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8 text-[#D97757]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              MS Car Wash Owner Control Panel
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs mx-auto">
              This page is <strong className="text-slate-900 dark:text-white font-bold">ONLY for MS Car Wash Owners & Managers</strong>. It is not open to general customers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Enter Secret Admin Passcode *
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin passcode..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {authError && (
              <p className="text-xs font-bold text-rose-500 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 text-center">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Desk</span>
            </button>
          </form>

          <div className="pt-4 border-t border-black/5 dark:border-white/5 text-center">
            <p className="text-[11px] text-neutral-400">Are you a customer trying to book a wash?</p>
            <Link
              href="/book"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline mt-0.5 inline-block"
            >
              Go to Customer Wash Booking Form →
            </Link>
          </div>

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
                src="/ms-auto-care-logo.png"
                alt="MS Auto Care Logo"
                width={44}
                height={44}
                className="w-11 h-11 object-contain"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                MS Auto Care — Admin Desk
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live Updates
                </span>
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Auto-refreshes every 10s. Direct WhatsApp helpline: 8309390902.
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

            {/* Export Audit CSV Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-3.5 py-2 rounded-full bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover:border-blue-500/40"
                title="Export sales data and audit sheets to CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
                <span>Export CSV ▾</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#1C1C1F] border border-black/10 dark:border-white/10 shadow-2xl p-2 z-50 space-y-1 text-xs font-bold animate-in fade-in zoom-in-95">
                  <span className="block px-2.5 py-1 text-[10px] uppercase font-black tracking-wider text-slate-400">
                    Export Financial Scope:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleExportEnhancedCSV('today')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center justify-between transition-colors"
                  >
                    <span>📅 Today&apos;s Shift</span>
                    <span className="text-[10px] opacity-70">({todayBookings.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportEnhancedCSV('yesterday')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 flex items-center justify-between transition-colors"
                  >
                    <span>📅 Yesterday</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportEnhancedCSV('month')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between transition-colors"
                  >
                    <span>📅 This Month</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportEnhancedCSV('active')}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-between transition-colors"
                  >
                    <span>⚡ Current Filter</span>
                    <span className="text-[10px] opacity-70">({filteredBookings.length})</span>
                  </button>
                  <div className="pt-1 border-t border-black/5 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => handleExportEnhancedCSV('all')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 flex items-center justify-between transition-colors"
                    >
                      <span>📁 All Time Records</span>
                      <span className="text-[10px] opacity-70">({bookings.length})</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          <div className="bento-card p-4 sm:p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">Total Washes</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] dark:text-white">
              {totalBookingsCount}
            </div>
            <span className="text-[10px] text-neutral-400 block">Recorded in database</span>
          </div>

          <div className="bento-card p-4 sm:p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500">Pending</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">
              {pendingCount}
            </div>
            <span className="text-[10px] text-neutral-400 block">Awaiting start</span>
          </div>

          <div className="bento-card p-4 sm:p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">In Wash</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-500 flex items-center gap-1.5">
              {inProgressCount}
              {inProgressCount > 0 && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>}
            </div>
            <span className="text-[10px] text-neutral-400 block">Currently cleaning</span>
          </div>

          <div className="bento-card p-4 sm:p-5 rounded-3xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">Completed</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500">
              {completedCount}
            </div>
            <span className="text-[10px] text-neutral-400 block">Finished & delivered</span>
          </div>

          <div className="bento-card p-4 sm:p-5 rounded-3xl space-y-1 col-span-2 lg:col-span-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-500">Est. Total Revenue</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] dark:text-white">
              ₹{totalRevenue}
            </div>
            <span className="text-[10px] text-neutral-400 block">Gross revenue total</span>
          </div>

        </div>

        {/* END-OF-DAY SHIFT & CASHFLOW SUMMARY WIDGET */}
        <div className="rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] p-6 shadow-sm space-y-5 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.08] dark:border-white/[0.08] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-tight">
                    End-of-Day Shift &amp; Cashflow Summary
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
                    Live Shift Desk
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                  Owner: Kami Naveen • Cash vs UPI collections &amp; fleet turnaround for today
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={sendDailySummaryWhatsApp}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
                title="Send today's shift summary report via WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WhatsApp Shift Report</span>
              </button>

              <button
                type="button"
                onClick={handlePrintShiftSummary}
                className="px-3.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-[#1C1C1F] text-slate-800 dark:text-slate-200 border border-black/[0.08] dark:border-white/[0.08] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-xs font-bold transition-all flex items-center gap-1.5"
                title="Print official shift closing summary"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Summary</span>
              </button>

              <button
                type="button"
                onClick={() => handleExportEnhancedCSV('today')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                title="Download today's shift spreadsheet for accounting"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export Shift CSV</span>
              </button>

              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="text-xs font-bold text-neutral-500 hover:text-emerald-500 transition-colors px-2 py-1"
              >
                {showAnalytics ? 'Hide Stats ↑' : 'Show Stats ↓'}
              </button>
            </div>
          </div>

          {showAnalytics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              
              {/* 1. Cash vs UPI Collections Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                    <Banknote className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Today&apos;s Revenue &amp; Payments</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold">
                    Total ₹{todayRevenue.toLocaleString('en-IN')}
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    ₹{todayRevenue.toLocaleString('en-IN')}
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold block mt-0.5">
                    {todayCompleted.length} Completed Vehicle Jobs
                  </span>
                </div>

                {/* Cash vs UPI Visual Progress Bar */}
                <div className="space-y-1.5 pt-1 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      💵 Cash: ₹{todayCashRevenue.toLocaleString('en-IN')} ({cashPercent}%)
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      📱 UPI: ₹{todayUpiRevenue.toLocaleString('en-IN')} ({upiPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${cashPercent}%` }}
                      title={`Cash: ${cashPercent}%`}
                    />
                    <div
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${upiPercent}%` }}
                      title={`UPI: ${upiPercent}%`}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Fleet Serviced Volume Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-blue-500" />
                    <span>Today&apos;s Fleet Volume</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold">
                    {todayBookings.length} Vehicles
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {todayBookings.length} <span className="text-xs font-bold text-neutral-400">Total Handled</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold block mt-0.5">
                    {todayCompleted.length} Delivered • {todayPending.length} Active
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-black/5 dark:border-white/5 text-[11px] font-bold">
                  <div className="p-1.5 rounded-xl bg-white dark:bg-[#141416] border border-black/5 dark:border-white/5 text-center">
                    <Bike className="w-3.5 h-3.5 mx-auto text-emerald-500 mb-0.5" />
                    <span className="text-slate-900 dark:text-white">{todayBikesCount}</span>
                    <span className="text-[9px] text-neutral-400 block font-normal">Bikes</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white dark:bg-[#141416] border border-black/5 dark:border-white/5 text-center">
                    <Car className="w-3.5 h-3.5 mx-auto text-blue-500 mb-0.5" />
                    <span className="text-slate-900 dark:text-white">{todayCarsCount}</span>
                    <span className="text-[9px] text-neutral-400 block font-normal">Cars</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white dark:bg-[#141416] border border-black/5 dark:border-white/5 text-center">
                    <Truck className="w-3.5 h-3.5 mx-auto text-amber-500 mb-0.5" />
                    <span className="text-slate-900 dark:text-white">{todayHeavyCount}</span>
                    <span className="text-[9px] text-neutral-400 block font-normal">Heavy</span>
                  </div>
                </div>
              </div>

              {/* 3. Turnaround & Completion Efficiency Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Turnaround &amp; Efficiency</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold">
                    {completionRate}% Delivered
                  </span>
                </div>

                <div>
                  <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                    ~25 mins <span className="text-xs font-bold text-neutral-400">Avg Wash</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold block mt-0.5">
                    Mechanic Service: ~1.5 hrs avg
                  </span>
                </div>

                <div className="space-y-1 pt-1 border-t border-black/5 dark:border-white/5 text-[11px] font-bold text-neutral-600 dark:text-neutral-300">
                  <div className="flex justify-between">
                    <span>Avg Ticket Value:</span>
                    <span className="text-slate-900 dark:text-white font-extrabold">₹{avgTicketValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>All-Time Gross:</span>
                    <span className="text-slate-900 dark:text-white font-extrabold">₹{totalRevenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* 4. Active Operations Summary Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.06] dark:border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-rose-500" />
                    <span>Active Shift Tasks</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-extrabold">
                    Live
                  </span>
                </div>

                <div className="space-y-2 text-xs font-bold">
                  <div
                    onClick={() => {
                      setFilter('today_pickups');
                      setDateFilter('today');
                    }}
                    className="p-2 rounded-xl bg-white dark:bg-[#141416] border border-black/5 dark:border-white/5 flex items-center justify-between cursor-pointer hover:border-emerald-500 transition-all"
                  >
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Today&apos;s Pickups:</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-black">
                      {todayPickupsCount}
                    </span>
                  </div>

                  <div
                    onClick={() => setFilter('in_progress_washes')}
                    className="p-2 rounded-xl bg-white dark:bg-[#141416] border border-black/5 dark:border-white/5 flex items-center justify-between cursor-pointer hover:border-blue-500 transition-all"
                  >
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Zap className="w-3.5 h-3.5 text-blue-500" />
                      <span>In-Wash Right Now:</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-black flex items-center gap-1">
                      {inProgressWashesCount > 0 && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>}
                      {inProgressWashesCount}
                    </span>
                  </div>

                  <div
                    onClick={() => setFilter('pending_mechanic')}
                    className="p-2 rounded-xl bg-white dark:bg-[#141416] border border-black/5 dark:border-white/5 flex items-center justify-between cursor-pointer hover:border-indigo-500 transition-all"
                  >
                    <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                      <Wrench className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Mechanic Quotes Pending:</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 text-xs font-black">
                      {pendingMechanicCount}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>


        {/* QUICK FILTER PRESETS BAR & SEARCH CONTROLS */}
        <div className="space-y-3">
          
          {/* QUICK OPERATIONAL PRESET SHORTCUT TABS */}
          <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-emerald-500" />
                <span>⚡ Quick Operations Presets</span>
              </span>

              {(filter === 'today_pickups' || filter === 'in_progress_washes' || filter === 'pending_mechanic') && (
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  <span>Clear Preset Filter</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* Preset 1: Today's Doorstep Pickups */}
              <button
                type="button"
                onClick={() => {
                  setFilter(filter === 'today_pickups' ? 'all' : 'today_pickups');
                  setDateFilter('today');
                }}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-xs ${
                  filter === 'today_pickups'
                    ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-500/30'
                    : 'bg-white dark:bg-[#1C1C1F] text-slate-800 dark:text-slate-200 border-black/[0.08] dark:border-white/[0.08] hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${filter === 'today_pickups' ? 'bg-white/20 text-white' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black leading-tight">Today&apos;s Doorstep Pickups</span>
                    <span className={`text-[10px] ${filter === 'today_pickups' ? 'text-white/80' : 'text-neutral-400'}`}>Panagal &amp; Srikalahasti</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                  filter === 'today_pickups'
                    ? 'bg-white text-emerald-700'
                    : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {todayPickupsCount}
                </span>
              </button>

              {/* Preset 2: In-Progress Washes */}
              <button
                type="button"
                onClick={() => setFilter(filter === 'in_progress_washes' ? 'all' : 'in_progress_washes')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-xs ${
                  filter === 'in_progress_washes'
                    ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-500/30'
                    : 'bg-white dark:bg-[#1C1C1F] text-slate-800 dark:text-slate-200 border-black/[0.08] dark:border-white/[0.08] hover:border-blue-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${filter === 'in_progress_washes' ? 'bg-white/20 text-white' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'}`}>
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black leading-tight">In-Progress Washes</span>
                    <span className={`text-[10px] ${filter === 'in_progress_washes' ? 'text-white/80' : 'text-neutral-400'}`}>Active cleaning on floor</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black flex items-center gap-1 ${
                  filter === 'in_progress_washes'
                    ? 'bg-white text-blue-700'
                    : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                }`}>
                  {inProgressWashesCount > 0 && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping"></span>}
                  {inProgressWashesCount}
                </span>
              </button>

              {/* Preset 3: Pending Mechanic Estimates */}
              <button
                type="button"
                onClick={() => setFilter(filter === 'pending_mechanic' ? 'all' : 'pending_mechanic')}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between shadow-xs ${
                  filter === 'pending_mechanic'
                    ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-500/30'
                    : 'bg-white dark:bg-[#1C1C1F] text-slate-800 dark:text-slate-200 border-black/[0.08] dark:border-white/[0.08] hover:border-indigo-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${filter === 'pending_mechanic' ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'}`}>
                    <Wrench className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black leading-tight">Pending Mechanic Estimates</span>
                    <span className={`text-[10px] ${filter === 'pending_mechanic' ? 'text-white/80' : 'text-neutral-400'}`}>Repairs awaiting quote</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                  filter === 'pending_mechanic'
                    ? 'bg-white text-indigo-700'
                    : 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                }`}>
                  {pendingMechanicCount}
                </span>
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search bar */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by ID, Customer Name, Phone, Vehicle, Notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none"
              />
            </div>

            {/* Date Range Filter Selector */}
            <div className="flex items-center gap-1 bg-neutral-200/50 dark:bg-[#1C1C1F]/60 p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] text-xs font-bold shrink-0">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider px-2 font-black">Date:</span>
              <button
                onClick={() => setDateFilter('all')}
                className={`py-1.5 px-3 rounded-xl transition-all ${
                  dateFilter === 'all'
                    ? 'bg-white dark:bg-[#2C2C30] text-black dark:text-white shadow-xs font-extrabold'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setDateFilter('today')}
                className={`py-1.5 px-3 rounded-xl transition-all ${
                  dateFilter === 'today'
                    ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setDateFilter('yesterday')}
                className={`py-1.5 px-3 rounded-xl transition-all ${
                  dateFilter === 'yesterday'
                    ? 'bg-amber-500 text-white shadow-xs font-extrabold'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Yesterday
              </button>
              <button
                onClick={() => setDateFilter('month')}
                className={`py-1.5 px-3 rounded-xl transition-all ${
                  dateFilter === 'month'
                    ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                    : 'text-neutral-500 hover:text-black dark:hover:text-white'
                }`}
              >
                This Month
              </button>
            </div>
          </div>

          {/* Standard Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-neutral-200/50 dark:bg-[#1C1C1F]/60 p-1 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] text-xs font-bold overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 min-w-[70px] py-2 rounded-xl transition-all ${
                filter === 'all'
                  ? 'bg-white dark:bg-[#2C2C30] text-black dark:text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`flex-1 min-w-[80px] py-2 rounded-xl transition-all ${
                filter === 'pending'
                  ? 'bg-amber-500 text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`flex-1 min-w-[80px] py-2 rounded-xl transition-all ${
                filter === 'in_progress'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              In Wash ({inProgressCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`flex-1 min-w-[90px] py-2 rounded-xl whitespace-nowrap transition-all ${
                filter === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setFilter('pickup')}
              className={`flex-1 min-w-[70px] py-2 rounded-xl whitespace-nowrap transition-all ${
                filter === 'pickup'
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Pickup ({pickupCount})
            </button>
            <button
              onClick={() => setFilter('slot')}
              className={`flex-1 min-w-[70px] py-2 rounded-xl whitespace-nowrap transition-all ${
                filter === 'slot'
                  ? 'bg-teal-600 text-white shadow-xs font-extrabold'
                  : 'text-neutral-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Slots ({slotCount})
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
            <>
              {/* Mobile Card List View (Visible on smartphones < md) */}
              <div className="block md:hidden divide-y divide-black/10 dark:divide-white/10">
                {filteredBookings.map((b) => {
                  const loyalty = getCustomerLoyaltyInfo(b.phone);
                  const isReviewed = reviewedBookingIds.has(b.id);

                  return (
                    <div key={b.id} className="p-4 space-y-3 bg-white dark:bg-[#141416]">
                      {/* Header Row: ID, Time, Loyalty Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-[#D97757] text-sm">{b.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase flex items-center gap-1 border ${loyalty.badgeClass}`}>
                            {loyalty.count >= 5 ? (
                              <Crown className="w-3 h-3 text-purple-500 fill-purple-500" />
                            ) : loyalty.count >= 2 ? (
                              <Star className="w-3 h-3 text-blue-500 fill-blue-500" />
                            ) : (
                              <Sparkles className="w-3 h-3 text-emerald-500" />
                            )}
                            <span>{loyalty.label}</span>
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-neutral-400">
                          {formatTimestampWithSeconds(b.createdAt)}
                        </span>
                      </div>

                      {/* Customer & Vehicle Info */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-extrabold text-sm text-[#1D1D1F] dark:text-white flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{b.name}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <a href={`tel:${b.phone}`} className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{b.phone}</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => openDirectCustomerWhatsApp(b.phone, b.name, b.id)}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                            >
                              Chat
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-base block">
                            ₹{b.totalAmount || getDefaultPrice(b.vehicleType)}
                          </span>
                          <span className="text-[11px] text-neutral-400 block font-medium">
                            {b.vehicleType} ({b.vehicleModel})
                          </span>
                        </div>
                      </div>

                      {/* Mode, Slot, Address */}
                      <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/5 dark:border-white/5 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-neutral-500">Mode / Time:</span>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#1D1D1F] dark:text-white">
                              {b.mode === 'pickup' ? 'Doorstep Pickup' : 'Center Slot'}
                            </span>
                            {b.mode === 'pickup' && b.address && (
                              <button
                                type="button"
                                onClick={() => openGoogleMapsRoute(b.address)}
                                className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5"
                              >
                                <MapPin className="w-3 h-3" /> Maps
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          {b.mode === 'pickup' ? b.timeWindow || 'Morning' : `${b.date || 'Today'} (${b.timeSlot})`}
                        </p>
                      </div>

                      {/* Status Stepper & Quick Action Buttons */}
                      <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                            b.status === 'completed'
                              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                              : b.status === 'in_progress'
                              ? 'bg-blue-500/10 text-blue-600 border border-blue-500/30 animate-pulse'
                              : 'bg-amber-500/10 text-amber-600 border border-amber-500/30'
                          }`}>
                            {b.status === 'completed' ? 'Completed ✓' : b.status === 'in_progress' ? 'In Wash 🧼' : 'Pending ⏳'}
                          </span>

                          {b.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(b.id, 'in_progress')}
                              className="px-2 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px]"
                            >
                              Wash ➔
                            </button>
                          )}
                          {(b.status === 'pending' || b.status === 'in_progress') && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(b.id, 'completed')}
                              className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
                            >
                              Done ✓
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-1 flex-wrap">
                          <button
                            type="button"
                            onClick={() => setReviewLangModalBooking(b)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                              isReviewed
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                            }`}
                            title="Send Google Review Request via WhatsApp"
                          >
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span>{isReviewed ? 'Review ✓' : 'Review'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSendReceiptWhatsApp(b)}
                            className="px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-0.5"
                            title="Send WhatsApp Receipt"
                          >
                            <Receipt className="w-3 h-3" />
                            <span>Receipt</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setJobCardBooking(b)}
                            className="p-1.5 rounded-lg bg-indigo-600 text-white font-bold text-[10px] flex items-center gap-1"
                            title="Vehicle Intake Job Card"
                          >
                            <ClipboardList className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setPrintingTokenBooking(b)}
                            className="p-1.5 rounded-lg bg-slate-800 text-white text-[10px]"
                            title="Print Token"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(b)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-[#1C1C1F] text-slate-900 dark:text-white font-bold text-[10px]"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownloadInvoice(b)}
                            className="p-1.5 rounded-lg bg-slate-900 text-white font-bold text-[10px]"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Desktop Table View (Visible on laptops >= md) */}
              <div className="hidden md:block overflow-x-auto">
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
                  {filteredBookings.map((b) => {
                    const loyalty = getCustomerLoyaltyInfo(b.phone);
                    const isReviewed = reviewedBookingIds.has(b.id);

                    return (
                      <tr key={b.id} className="hover:bg-neutral-50/80 dark:hover:bg-[#1C1C1F]/50 transition-colors">
                        
                        {/* ID */}
                        <td className="py-4 px-4 font-mono font-bold text-[#D97757]">
                          {b.id}
                        </td>

                        {/* Exact Time with Seconds */}
                        <td className="py-4 px-4 font-mono text-[11px] text-neutral-600 dark:text-neutral-300">
                          {formatTimestampWithSeconds(b.createdAt)}
                        </td>

                        {/* Customer Details & Loyalty Badge */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-[#1D1D1F] dark:text-white flex items-center gap-1.5 flex-wrap">
                            <User className="w-3.5 h-3.5 text-neutral-400" />
                            <span>{b.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase flex items-center gap-1 border ${loyalty.badgeClass}`} title={`${loyalty.count} Total Bookings`}>
                              {loyalty.count >= 5 ? (
                                <Crown className="w-3 h-3 text-purple-500 fill-purple-500" />
                              ) : loyalty.count >= 2 ? (
                                <Star className="w-3 h-3 text-blue-500 fill-blue-500" />
                              ) : (
                                <Sparkles className="w-3 h-3 text-emerald-500" />
                              )}
                              <span>{loyalty.label}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <a
                              href={`tel:${b.phone}`}
                              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1"
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
                              Chat
                            </button>
                          </div>
                        </td>

                        {/* Mode & Time / Address Directions */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              b.mode === 'pickup'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                : 'bg-neutral-100 dark:bg-[#2C2C30] text-neutral-700 dark:text-neutral-300 border border-black/[0.06] dark:border-white/[0.06]'
                            }`}>
                              {b.mode === 'pickup' ? 'Doorstep Pickup' : 'Center Slot'}
                            </span>
                            {b.mode === 'pickup' && b.address && (
                              <button
                                type="button"
                                onClick={() => openGoogleMapsRoute(b.address)}
                                className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-500 hover:text-white transition-all flex items-center gap-0.5"
                                title="Open Google Maps Directions"
                              >
                                <MapPin className="w-3 h-3" />
                                Maps
                              </button>
                            )}
                          </div>
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

                        {/* Status Stepper Badge */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                              b.status === 'completed'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                : b.status === 'in_progress'
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30 animate-pulse'
                                : b.status === 'cancelled'
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                            }`}>
                              {b.status === 'completed' ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Completed</span>
                                </>
                              ) : b.status === 'in_progress' ? (
                                <>
                                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                                  <span>In Wash</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>Pending</span>
                                </>
                              )}
                            </span>

                            {/* 1-Click Status Advance Stepper */}
                            <div className="flex gap-1 text-[10px] font-bold pt-0.5">
                              {b.status === 'pending' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(b.id, 'in_progress')}
                                  className="px-2 py-0.5 rounded-md bg-blue-500/10 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-500/20 transition-all"
                                  title="Start washing vehicle"
                                >
                                  Wash ➔
                                </button>
                              )}
                              {(b.status === 'pending' || b.status === 'in_progress') && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(b.id, 'completed')}
                                  className="px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-500/20 transition-all"
                                  title="Mark wash completed"
                                >
                                  Done ✓
                                </button>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Action Shortcuts */}
                        <td className="py-4 px-4 text-right space-y-1">
                          <div className="flex items-center justify-end gap-1 flex-wrap">
                            
                            {/* 1-Click Bilingual Google Review Trigger */}
                            <button
                              type="button"
                              onClick={() => setReviewLangModalBooking(b)}
                              className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 shadow-xs ${
                                isReviewed
                                  ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                  : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500 hover:text-white border border-amber-500/30'
                              }`}
                              title="Send 5-Star Google Review Request on WhatsApp"
                            >
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              <span>{isReviewed ? 'Review ✓' : '⭐ Review'}</span>
                            </button>

                            {/* 1-Click WhatsApp Official Receipt */}
                            <button
                              type="button"
                              onClick={() => handleSendReceiptWhatsApp(b)}
                              className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white font-bold text-[10px] transition-all flex items-center gap-0.5"
                              title="Send official payment receipt to customer WhatsApp"
                            >
                              <Receipt className="w-3 h-3" />
                              <span>Receipt</span>
                            </button>

                            {/* WhatsApp Alerts */}
                            <button
                              type="button"
                              onClick={() => sendWashStartWhatsApp(b)}
                              className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-bold text-[10px] transition-all"
                              title="Send 'Wash Started' alert on WhatsApp"
                            >
                              Start
                            </button>

                            <button
                              type="button"
                              onClick={() => sendWashReadyWhatsApp(b)}
                              className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white font-bold text-[10px] transition-all"
                              title="Send 'Vehicle Ready' alert on WhatsApp"
                            >
                              Ready
                            </button>

                            {/* Vehicle Intake Job Card */}
                            <button
                              type="button"
                              onClick={() => setJobCardBooking(b)}
                              className="px-2.5 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1"
                              title="Create / Print Vehicle Intake Job Card & Inspection Slip"
                            >
                              <ClipboardList className="w-3 h-3" />
                              <span>Job Card</span>
                            </button>

                            {/* Job Token Printer Button */}
                            <button
                              type="button"
                              onClick={() => setPrintingTokenBooking(b)}
                              className="p-1.5 rounded-md bg-neutral-100 dark:bg-[#1C1C1F] text-slate-700 dark:text-slate-300 hover:bg-slate-800 hover:text-white text-[11px] font-bold transition-all"
                              title="Print Shop-Floor Wash Slip / Token"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit & Bill Button */}
                            <button
                              type="button"
                              onClick={() => openEditModal(b)}
                              className="px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-black dark:text-white border border-black/[0.08] dark:border-white/[0.08] hover:bg-black hover:text-white text-[11px] font-bold transition-all inline-flex items-center gap-1"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>

                            {/* PDF Download Button */}
                            <button
                              type="button"
                              onClick={() => handleDownloadInvoice(b)}
                              disabled={generatingPdfId === b.id}
                              className="px-2.5 py-1 rounded-full bg-[#1D1D1F] dark:bg-white text-white dark:text-black text-[11px] font-bold transition-all shadow-xs inline-flex items-center gap-1"
                            >
                              <FileText className="w-3 h-3" />
                              <span>{generatingPdfId === b.id ? 'PDF...' : 'PDF'}</span>
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteBookingItem(b.id)}
                              className="p-1.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] text-neutral-400 hover:text-rose-500 transition-all inline-flex items-center"
                              title="Delete booking item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
          )}
        </div>


        {/* 3. ADD WALK-IN MANUAL ENTRY MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 space-y-5">
              
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
                    placeholder="e.g. 8309390902"
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
                    placeholder="e.g. Kami Naveen (Owner)"
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
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white dark:bg-[#141416] border border-black/[0.08] dark:border-white/[0.08] shadow-2xl p-6 sm:p-8 space-y-6">
              
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
                      placeholder="e.g. Kami Naveen (Owner)"
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

                  {/* Before & After Photo Attachments */}
                  <div className="space-y-2 pt-2 border-t border-black/[0.08] dark:border-white/[0.08]">
                    <label className="block text-xs font-bold uppercase text-neutral-500">
                      📸 Vehicle Before & After Wash Photos (Image URLs)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="url"
                        value={editBeforePhotoUrl}
                        onChange={(e) => setEditBeforePhotoUrl(e.target.value)}
                        placeholder="Before Wash Photo URL..."
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                      />
                      <input
                        type="url"
                        value={editAfterPhotoUrl}
                        onChange={(e) => setEditAfterPhotoUrl(e.target.value)}
                        placeholder="After Wash Photo URL..."
                        className="w-full px-3 py-2 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Target WhatsApp Number */}
                  <div className="space-y-1.5 pt-2 border-t border-black/[0.08] dark:border-white/[0.08]">
                    <label className="block text-xs font-bold uppercase text-neutral-500">
                      Target WhatsApp Number for Invoice & Reports
                    </label>
                    <input
                      type="tel"
                      value={targetWhatsappPhone}
                      onChange={(e) => setTargetWhatsappPhone(e.target.value)}
                      placeholder="e.g. 9848012345"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/[0.08] dark:border-white/[0.08] text-xs font-medium"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
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
                      <span>Send Bill</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => sendMediaReportToWhatsApp(editingBooking)}
                      className="py-3 px-4 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-xs shadow-xs flex items-center justify-center gap-1.5"
                      title="Send Before & After photo report via WhatsApp"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Photo Report</span>
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
                          src="/ms-auto-care-logo.png"
                          alt="Logo"
                          width={36}
                          height={36}
                          className="w-9 h-9 object-contain"
                          style={{ width: 'auto', height: 'auto' }}
                        />
                        <div>
                          <h4 className="font-extrabold text-sm text-[#1D1D1F] dark:text-white leading-none">MS AUTO CARE</h4>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">Car Mechanic &amp; Water Wash</span>
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

        {/* 5. PRINTABLE SHOP-FLOOR WASH TOKEN SLIP MODAL */}
        {printingTokenBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-[#141416] border border-black/10 dark:border-white/10 shadow-2xl space-y-4 font-sans text-xs">
              
              {/* Ticket Header */}
              <div className="text-center border-b border-dashed border-black/20 dark:border-white/20 pb-4 space-y-1">
                <h3 className="text-base font-black text-[#1D1D1F] dark:text-white uppercase tracking-wider">MS CAR WASH SRIKALAHASTI</h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Shop-Floor Wash Token Slip</p>
                <span className="font-mono text-sm font-black text-[#D97757] block">Token ID: {printingTokenBooking.id}</span>
              </div>

              {/* Ticket Details */}
              <div className="space-y-2 py-2">
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-neutral-500 font-bold">Customer Name:</span>
                  <span className="font-black text-slate-900 dark:text-white">{printingTokenBooking.name}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-neutral-500 font-bold">Phone Number:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{printingTokenBooking.phone}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-neutral-500 font-bold">Vehicle:</span>
                  <span className="font-black text-slate-900 dark:text-white">{printingTokenBooking.vehicleType} ({printingTokenBooking.vehicleModel})</span>
                </div>
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-neutral-500 font-bold">Wash Type / Slot:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{printingTokenBooking.mode === 'pickup' ? 'Doorstep Pickup' : printingTokenBooking.timeSlot}</span>
                </div>
                {printingTokenBooking.address && (
                  <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                    <span className="text-neutral-500 font-bold">Pickup Address:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200 text-right max-w-[200px]">{printingTokenBooking.address}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-1">
                  <span className="text-neutral-500 font-bold">Add-on Services:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{printingTokenBooking.addOns?.length ? printingTokenBooking.addOns.join(', ') : 'Standard Wash'}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-500 font-bold">Billed Total Amount:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">₹{printingTokenBooking.totalAmount || getDefaultPrice(printingTokenBooking.vehicleType)}</span>
                </div>
              </div>

              {/* Floor Checklist */}
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-[#1C1C1F] border border-black/10 dark:border-white/10 space-y-1 text-[10px] text-neutral-500 font-medium">
                <p className="font-bold text-slate-900 dark:text-white uppercase">Floor Washer Checklist:</p>
                <div className="grid grid-cols-2 gap-1 pt-1 font-mono">
                  <span>[ ] Snow Foam Wash</span>
                  <span>[ ] Underbody Rinse</span>
                  <span>[ ] Tyre Polish</span>
                  <span>[ ] Interior Vacuum</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPrintingTokenBooking(null)}
                  className="flex-1 py-2.5 rounded-full bg-neutral-100 dark:bg-[#1C1C1F] font-bold text-neutral-600 dark:text-neutral-300"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Token Slip</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 6. LIVE PDF INVOICE PREVIEW & DOWNLOAD CONFIRMATION MODAL */}
        {pdfPreviewModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-3xl bg-[#141416] border border-white/10 shadow-2xl flex flex-col text-white">
              
              {/* Modal Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    PDF Tax Invoice Preview — <span className="text-[#D97757] font-mono">{pdfPreviewModal.booking.id}</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Inspect the official invoice document below before downloading it to your device.
                  </p>
                </div>
                <button
                  onClick={() => setPdfPreviewModal(null)}
                  className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* PDF Document Live Preview Frame */}
              <div className="flex-1 bg-slate-900 p-2 sm:p-4 overflow-hidden">
                <iframe
                  src={pdfPreviewModal.blobUrl}
                  title={`PDF Preview ${pdfPreviewModal.booking.id}`}
                  className="w-full h-[55vh] rounded-2xl border border-slate-800 bg-white"
                />
              </div>

              {/* Modal Footer with Download Confirmation */}
              <div className="p-4 bg-[#1C1C1F] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-300">
                  Customer: <span className="font-bold text-white">{pdfPreviewModal.booking.name}</span> ({pdfPreviewModal.booking.vehicleType} - {pdfPreviewModal.booking.vehicleModel}) — <span className="font-bold text-emerald-400">₹{pdfPreviewModal.booking.totalAmount || 350}</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setPdfPreviewModal(null)}
                    className="flex-1 sm:flex-none py-2.5 px-5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
                  >
                    Cancel / Close
                  </button>
                  <button
                    onClick={() => {
                      pdfPreviewModal.download();
                      setPdfPreviewModal(null);
                    }}
                    className="flex-1 sm:flex-none py-2.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Confirm & Download PDF</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 5. VEHICLE INTAKE JOB CARD & INSPECTION SLIP MODAL */}
        <JobCardModal
          booking={jobCardBooking}
          isOpen={!!jobCardBooking}
          onClose={() => setJobCardBooking(null)}
        />

        {/* 6. BILINGUAL GOOGLE REVIEW DISPATCH MODAL */}
        {reviewLangModalBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#141416] border border-black/10 dark:border-white/10 shadow-2xl p-6 space-y-5 relative overflow-hidden">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      Request 5-Star Google Review
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Customer: <span className="font-bold text-slate-900 dark:text-white">{reviewLangModalBooking.name}</span> ({reviewLangModalBooking.vehicleModel})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReviewLangModalBooking(null)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Language Selection Buttons */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                  Select WhatsApp Message Language:
                </span>

                {/* English Option */}
                <button
                  type="button"
                  onClick={() => handleSendReviewWhatsApp(reviewLangModalBooking, 'en')}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1F] hover:bg-emerald-500/10 border border-black/8 dark:border-white/8 hover:border-emerald-500/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        🇬🇧 Send in English
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-extrabold">
                        Travellers &amp; Visitors
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      &quot;Thank you for visiting MS Car Mechanic... Could you take 10s to leave a 5-star review?&quot;
                    </p>
                  </div>
                  <Send className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 shrink-0 ml-2" />
                </button>

                {/* Telugu Option */}
                <button
                  type="button"
                  onClick={() => handleSendReviewWhatsApp(reviewLangModalBooking, 'te')}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1F] hover:bg-emerald-500/10 border border-black/8 dark:border-white/8 hover:border-emerald-500/30 text-left transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        🇮🇳 Send in Telugu (తెలుగు)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold">
                        Local Residents
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      &quot;నమస్కారం! మీ వాహన సర్వీస్ పూర్తయింది... దయచేసి 5-స్టార్ రివ్యూ ఇవ్వండి&quot;
                    </p>
                  </div>
                  <Send className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 shrink-0 ml-2" />
                </button>
              </div>

              {/* Copy Direct Review Link */}
              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Official Review URL:</span>
                <button
                  type="button"
                  onClick={() => handleCopyReviewLink(reviewLangModalBooking.id)}
                  className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-white/10 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-800 dark:text-slate-200 font-bold transition-all flex items-center gap-1.5"
                >
                  {copiedReviewId === reviewLangModalBooking.id ? (
                    <>
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
