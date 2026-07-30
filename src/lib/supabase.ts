import { createClient } from '@supabase/supabase-js';
import { Booking } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// New clean key so old mock data cached in browser localStorage is ignored
const LOCAL_STORAGE_KEY = 'ms_car_wash_bookings_v2';

export async function saveBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>): Promise<Booking> {
  const newId = `MSCW-${Math.floor(1000 + Math.random() * 9000)}`;
  const newBooking: Booking = {
    ...bookingData,
    id: newId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select()
        .single();
      if (!error && data) {
        return data as Booking;
      }
    } catch (err) {
      console.warn('Supabase insert error:', err);
    }
  }

  // Fallback to local storage
  if (typeof window !== 'undefined') {
    const existing = getLocalBookings();
    const updated = [newBooking, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  return newBooking;
}

export async function getBookings(): Promise<Booking[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) {
        return data as Booking[];
      }
    } catch (err) {
      console.warn('Supabase fetch error:', err);
    }
  }

  return getLocalBookings();
}

export async function updateBookingStatus(id: string, status: Booking['status'], totalAmount?: number): Promise<boolean> {
  if (supabase) {
    try {
      const updatePayload: Partial<Booking> = { status };
      if (totalAmount !== undefined) updatePayload.totalAmount = totalAmount;
      const { error } = await supabase.from('bookings').update(updatePayload).eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.warn('Supabase update error:', err);
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
  return false;
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
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}
