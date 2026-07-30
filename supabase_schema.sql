-- MS Car Wash — Supabase Database Schema
-- Run this script in your Supabase project's SQL Editor

CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  mode TEXT NOT NULL, -- 'pickup' or 'slot'
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicleType TEXT NOT NULL,
  vehicleModel TEXT NOT NULL,
  address TEXT,
  timeWindow TEXT,
  date TEXT,
  timeSlot TEXT,
  notes TEXT,
  addOns TEXT[],
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  totalAmount NUMERIC DEFAULT 350
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anyone can create a booking)
CREATE POLICY "Allow public insert" ON public.bookings
  FOR INSERT WITH CHECK (true);

-- Allow public select & update for management
CREATE POLICY "Allow public read and update" ON public.bookings
  FOR SELECT USING (true);

CREATE POLICY "Allow public update" ON public.bookings
  FOR UPDATE USING (true);
