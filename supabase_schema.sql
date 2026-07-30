-- MS Car Wash — Supabase Database Schema (Clean & Idempotent)
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

-- Drop existing policies if present to prevent 42710 duplicate error
DROP POLICY IF EXISTS "Allow public insert" ON public.bookings;
DROP POLICY IF EXISTS "Allow public read and update" ON public.bookings;
DROP POLICY IF EXISTS "Allow public read" ON public.bookings;
DROP POLICY IF EXISTS "Allow public update" ON public.bookings;

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies cleanly
CREATE POLICY "Allow public insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON public.bookings FOR UPDATE USING (true);
