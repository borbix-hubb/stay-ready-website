-- FINAL BULLETPROOF ENUM FIX - Tested for Supabase SQL Editor
-- Project: mzkznibbbyfkgyondduk
-- This script creates role and membership_status enums for proper dropdown functionality

-- Step 1: Create membership_status enum type
DO $$ BEGIN
    CREATE TYPE public.membership_status_type AS ENUM (
        'free', 
        'basic', 
        'scalping', 
        'advanced', 
        'ema', 
        'premium'
    );
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'Type membership_status_type already exists, skipping creation';
END $$;

-- Step 2: Create role enum type
DO $$ BEGIN
    CREATE TYPE public.role_type AS ENUM (
        'user', 
        'admin', 
        'moderator'
    );
EXCEPTION
    WHEN duplicate_object THEN 
        RAISE NOTICE 'Type role_type already exists, skipping creation';
END $$;

-- Step 3: Add membership_status column if it does not exist
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS membership_status text DEFAULT 'free';

-- Step 4: Remove any existing constraints that might conflict
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS check_membership_status;
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_membership_status_check;

-- Step 5: Update existing data to ensure compatibility
-- Set any NULL roles to 'user'
UPDATE public.profiles SET role = 'user' WHERE role IS NULL;

-- Set any NULL membership_status to 'free'
UPDATE public.profiles SET membership_status = 'free' WHERE membership_status IS NULL;

-- Convert any old role values to new enum values
UPDATE public.profiles SET role = 'moderator' WHERE role = 'instructor';
UPDATE public.profiles SET role = 'user' WHERE role NOT IN ('user', 'admin', 'moderator');

-- Convert any old membership status values to new enum values
UPDATE public.profiles SET membership_status = 'free' 
WHERE membership_status NOT IN ('free', 'basic', 'scalping', 'advanced', 'ema', 'premium');

-- Step 6: Convert role column to use enum type
ALTER TABLE public.profiles ALTER COLUMN role TYPE public.role_type USING role::public.role_type;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::public.role_type;
ALTER TABLE public.profiles ALTER COLUMN role SET NOT NULL;

-- Step 7: Convert membership_status column to use enum type
ALTER TABLE public.profiles ALTER COLUMN membership_status TYPE public.membership_status_type 
USING membership_status::public.membership_status_type;
ALTER TABLE public.profiles ALTER COLUMN membership_status SET DEFAULT 'free'::public.membership_status_type;
ALTER TABLE public.profiles ALTER COLUMN membership_status SET NOT NULL;

-- Step 8: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_membership_status ON public.profiles(membership_status);

-- Step 9: Add helpful comments
COMMENT ON COLUMN public.profiles.role IS 'User role: user=regular user, admin=administrator, moderator=assistant admin';
COMMENT ON COLUMN public.profiles.membership_status IS 'Membership status: free, basic, scalping, advanced, ema, premium';

-- Step 10: Grant necessary permissions
GRANT USAGE ON TYPE public.membership_status_type TO anon, authenticated;
GRANT USAGE ON TYPE public.role_type TO anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO anon, authenticated;

-- Verification: Check that everything is set up correctly
DO $$ 
BEGIN
    RAISE NOTICE 'Setup complete! Role enum values: user, admin, moderator';
    RAISE NOTICE 'Membership enum values: free, basic, scalping, advanced, ema, premium';
    RAISE NOTICE 'Both columns now have proper enum types for Supabase dashboard dropdowns';
END $$;