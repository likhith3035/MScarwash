-- MS Car Wash — Supabase Database Schema (Clean & Idempotent)
-- Run this script in your Supabase project's SQL Editor

CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  mode TEXT NOT NULL, -- 'pickup' or 'slot'
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicletype TEXT NOT NULL,
  vehiclemodel TEXT NOT NULL,
  address TEXT,
  timewindow TEXT,
  date TEXT,
  timeslot TEXT,
  notes TEXT,
  addons TEXT[],
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  createdat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  totalamount NUMERIC DEFAULT 350,
  beforephotourl TEXT,
  afterphotourl TEXT
);

-- Ensure photo columns exist if table was already created earlier
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS beforephotourl TEXT;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS afterphotourl TEXT;

-- Drop existing policies if present to prevent 42710 duplicate error
DROP POLICY IF EXISTS "Allow public insert" ON public.bookings;
DROP POLICY IF EXISTS "Allow public read and update" ON public.bookings;
DROP POLICY IF EXISTS "Allow public read" ON public.bookings;
DROP POLICY IF EXISTS "Allow public update" ON public.bookings;
DROP POLICY IF EXISTS "Allow public delete" ON public.bookings;

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies cleanly for anonymous client access
CREATE POLICY "Allow public insert" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public update" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.bookings FOR DELETE USING (true);
