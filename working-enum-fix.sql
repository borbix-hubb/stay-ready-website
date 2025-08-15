-- WORKING ENUM FIX - Copy and paste this into Supabase SQL Editor
-- Project: mzkznibbbyfkgyondduk

-- Create membership_status enum (PostgreSQL compatible)
DO $$ BEGIN
    CREATE TYPE public.membership_status_type AS ENUM (
        'free', 'basic', 'scalping', 'advanced', 'ema', 'premium'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create role enum (PostgreSQL compatible)
DO $$ BEGIN
    CREATE TYPE public.role_type AS ENUM (
        'user', 'admin', 'moderator'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add membership_status column if needed
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS membership_status text DEFAULT 'free';

-- Remove old constraints
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS check_membership_status;

-- Update role column to use enum
ALTER TABLE public.profiles ALTER COLUMN role TYPE public.role_type USING role::public.role_type;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::public.role_type;

-- Update membership_status column to use enum  
ALTER TABLE public.profiles ALTER COLUMN membership_status TYPE public.membership_status_type USING membership_status::public.membership_status_type;
ALTER TABLE public.profiles ALTER COLUMN membership_status SET DEFAULT 'free'::public.membership_status_type;

-- Grant permissions
GRANT USAGE ON TYPE public.membership_status_type TO anon, authenticated;
GRANT USAGE ON TYPE public.role_type TO anon, authenticated;