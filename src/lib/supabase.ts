import { createClient } from '@supabase/supabase-js';
import { Booking } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== 'undefined') {
    console.warn('MS Car Wash: Supabase environment variables are missing. Using local storage fallback.');
  }
}

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const LOCAL_STORAGE_KEY = 'ms_car_wash_bookings_v2';
let isSupabaseDisabled = false;

// Convert JS Booking object to Postgres DB row (matching column casing)
function toDbRow(booking: Booking): Record<string, unknown> {
  const row: Record<string, unknown> = {
    id: booking.id,
    mode: booking.mode,
    name: booking.name,
    phone: booking.phone,
    vehicletype: booking.vehicleType,
    vehiclemodel: booking.vehicleModel,
    address: booking.address || null,
    timewindow: booking.timeWindow || null,
    date: booking.date || null,
    timeslot: booking.timeSlot || null,
    notes: booking.notes || null,
    addons: booking.addOns || [],
    status: booking.status,
    createdat: booking.createdAt,
    totalamount: booking.totalAmount || 350,
  };

  if (booking.beforePhotoUrl) {
    row.beforephotourl = booking.beforePhotoUrl;
  }
  if (booking.afterPhotoUrl) {
    row.afterphotourl = booking.afterPhotoUrl;
  }

  return row;
}

// Convert Postgres DB row to JS Booking object
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromDbRow(row: any): Booking {
  return {
    id: row.id,
    mode: row.mode,
    name: row.name,
    phone: row.phone,
    vehicleType: row.vehicletype || row.vehicleType || 'Car',
    vehicleModel: row.vehiclemodel || row.vehicleModel || '',
    address: row.address || undefined,
    timeWindow: row.timewindow || row.timeWindow || undefined,
    date: row.date || undefined,
    timeSlot: row.timeslot || row.timeSlot || undefined,
    notes: row.notes || undefined,
    addOns: row.addons || row.addOns || [],
    status: row.status || 'pending',
    createdAt: row.createdat || row.createdAt || new Date().toISOString(),
    totalAmount: row.totalamount ?? row.totalAmount ?? 350,
    beforePhotoUrl: row.beforephotourl || row.beforePhotoUrl || undefined,
    afterPhotoUrl: row.afterphotourl || row.afterPhotoUrl || undefined,
  };
}

export async function saveBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
  const newId = `MSCW-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking: Booking = {
    ...bookingData,
    id: newId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  let savedBooking = newBooking;

  if (supabase) {
    try {
      const dbRow = toDbRow(newBooking);
      const { data, error } = await supabase
        .from('bookings')
        .insert([dbRow])
        .select()
        .single();

      if (!error && data) {
        savedBooking = fromDbRow(data);
      } else if (error) {
        console.error('Supabase insert error details:', error.message, error.code, error.details);
      }
    } catch (err) {
      console.error('Supabase insert exception:', err);
    }
  }

  // Keep local storage in sync as fallback cache
  if (typeof window !== 'undefined') {
    const existing = getLocalBookings();
    const filtered = existing.filter(b => b.id !== savedBooking.id);
    const updated = [savedBooking, ...filtered];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  return savedBooking;
}

function isTestBooking(b: Booking): boolean {
  if (!b) return false;
  const legacyIds = ['MSCW-TEST-672', 'MSCW-9999', 'MSCW-TEST-162', 'MSCW-5047'];
  return legacyIds.includes(b.id);
}

export async function getBookings(): Promise<Booking[]> {
  let dbBookings: Booking[] = [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*');

      if (!error && data) {
        dbBookings = data.map(fromDbRow);
      } else if (error) {
        console.error('Supabase fetch error:', error.message, error.code);
      }
    } catch (err) {
      console.error('Supabase fetch exception:', err);
    }
  }

  // Merge with local storage bookings (eliminating duplicates)
  const localBookings = getLocalBookings();
  const dbIds = new Set(dbBookings.map(b => b.id));
  const uniqueLocalBookings = localBookings.filter(b => !dbIds.has(b.id));

  const allBookings = [...dbBookings, ...uniqueLocalBookings];
  const cleanBookings = allBookings.filter(b => !isTestBooking(b));

  // Sort descending by createdAt
  return cleanBookings.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });
}

export async function updateBookingStatus(id: string, status: Booking['status'], totalAmount?: number): Promise<boolean> {
  let updatedInDb = false;

  if (supabase && !isSupabaseDisabled) {
    try {
      const updatePayload: Record<string, unknown> = { status };
      if (totalAmount !== undefined) {
        updatePayload.totalamount = totalAmount;
      }
      const { error } = await supabase.from('bookings').update(updatePayload).eq('id', id);
      if (!error) {
        updatedInDb = true;
      } else if (error && (error.code === 'PGRST301' || error.code === '401')) {
        isSupabaseDisabled = true;
      }
    } catch (err) {
      console.warn('Supabase update exception:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const existing = getLocalBookings();
    const updated = existing.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status,
          ...(totalAmount !== undefined ? { totalAmount } : {}),
        };
      }
      return b;
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    return true;
  }
  return updatedInDb;
}

export async function deleteBooking(id: string): Promise<boolean> {
  let deletedInDb = false;

  if (supabase && !isSupabaseDisabled) {
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (!error) {
        deletedInDb = true;
      }
    } catch (err) {
      console.warn('Supabase delete exception:', err);
    }
  }

  if (typeof window !== 'undefined') {
    const existing = getLocalBookings();
    const updated = existing.filter(b => b.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  return deletedInDb;
}

export async function deleteAllBookings(): Promise<boolean> {
  let deletedInDb = false;

  if (supabase && !isSupabaseDisabled) {
    try {
      const { error } = await supabase.from('bookings').delete().neq('id', 'NONE_RESERVED');
      if (!error) {
        deletedInDb = true;
      }
    } catch (err) {
      console.warn('Supabase delete all exception:', err);
    }
  }

  clearAllLocalBookings();
  return deletedInDb;
}

export function clearAllLocalBookings(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem('ms_car_wash_bookings');
  }
}

function getLocalBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return [];
    const parsed: Booking[] = JSON.parse(stored);
    
    // Auto-purge any legacy test/dummy data
    const cleaned = parsed.filter(b => !isTestBooking(b));

    if (cleaned.length !== parsed.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleaned));
    }

    return cleaned;
  } catch (e) {
    return [];
  }
}
