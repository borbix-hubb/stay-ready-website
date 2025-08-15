-- SIMPLE ENUM FIX - Copy and paste this into Supabase SQL Editor
-- Project: mzkznibbbyfkgyondduk

-- Create membership_status enum
CREATE TYPE IF NOT EXISTS public.membership_status_type AS ENUM (
    'free', 'basic', 'scalping', 'advanced', 'ema', 'premium'
);

-- Create role enum  
CREATE TYPE IF NOT EXISTS public.role_type AS ENUM (
    'user', 'admin', 'moderator'
);

-- Add membership_status column if needed
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS membership_status public.membership_status_type DEFAULT 'free';

-- Fix role column - remove old constraint first
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Update role column to use enum
ALTER TABLE public.profiles 
ALTER COLUMN role TYPE public.role_type 
USING (CASE WHEN role = 'instructor' THEN 'moderator' ELSE COALESCE(role, 'user') END)::public.role_type;

-- Set defaults
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::public.role_type;
ALTER TABLE public.profiles ALTER COLUMN membership_status SET DEFAULT 'free'::public.membership_status_type;

-- Grant permissions
GRANT USAGE ON TYPE public.membership_status_type TO anon, authenticated;
GRANT USAGE ON TYPE public.role_type TO anon, authenticated;