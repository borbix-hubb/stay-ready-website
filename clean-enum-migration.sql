-- =====================================================
-- CLEAN ENUM MIGRATION FOR SUPABASE DASHBOARD
-- =====================================================
-- This SQL creates proper enum types for role and membership_status columns
-- Run this entire script in Supabase SQL Editor in one go
-- Project: mzkznibbbyfkgyondduk
-- =====================================================

-- Step 1: Create membership_status_type enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'membership_status_type') THEN
        CREATE TYPE public.membership_status_type AS ENUM (
            'free',
            'basic',
            'scalping',
            'advanced',
            'ema',
            'premium'
        );
    END IF;
END $$;

-- Step 2: Create role_type enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_type') THEN
        CREATE TYPE public.role_type AS ENUM (
            'user',
            'admin',
            'moderator'
        );
    END IF;
END $$;

-- Step 3: Add membership_status column if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS membership_status public.membership_status_type DEFAULT 'free';

-- Step 4: Update existing membership_status column to use enum type (if it's currently text)
DO $$
BEGIN
    -- Check if membership_status column exists and is not already the enum type
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'membership_status'
        AND data_type != 'USER-DEFINED'
    ) THEN
        -- Convert existing column to enum type
        ALTER TABLE public.profiles 
        ALTER COLUMN membership_status TYPE public.membership_status_type 
        USING COALESCE(membership_status::text, 'free')::public.membership_status_type;
    END IF;
END $$;

-- Step 5: Remove existing role constraint and update role column to use enum type
DO $$
BEGIN
    -- Drop existing constraint if it exists
    ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
    
    -- Update role column to use enum type
    ALTER TABLE public.profiles 
    ALTER COLUMN role TYPE public.role_type 
    USING (
        CASE 
            WHEN role = 'instructor' THEN 'moderator'
            WHEN role IN ('user', 'admin') THEN role
            ELSE 'user'
        END
    )::public.role_type;
END $$;

-- Step 6: Set proper defaults
ALTER TABLE public.profiles ALTER COLUMN membership_status SET DEFAULT 'free'::public.membership_status_type;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::public.role_type;

-- Step 7: Update any null values to defaults
UPDATE public.profiles SET membership_status = 'free' WHERE membership_status IS NULL;
UPDATE public.profiles SET role = 'user' WHERE role IS NULL;

-- Step 8: Add descriptive comments
COMMENT ON COLUMN public.profiles.membership_status IS 'สถานะสมาชิก: free=ฟรี, basic=คอร์สเบสิก, scalping=คอร์สพาซิ่ง, advanced=คอร์สแอดวานซ์, ema=คอร์ส EMA, premium=พรีเมี่ยมทุกคอร์ส';
COMMENT ON COLUMN public.profiles.role IS 'บทบาทผู้ใช้: user=ผู้ใช้ทั่วไป, admin=ผู้ดูแลระบบ, moderator=ผู้ช่วยดูแล';

-- Step 9: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_membership_status ON public.profiles(membership_status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Step 10: Grant necessary permissions
GRANT USAGE ON TYPE public.membership_status_type TO anon, authenticated;
GRANT USAGE ON TYPE public.role_type TO anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO anon, authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these after the migration to verify everything worked

-- Check enum types were created
SELECT 
    t.typname as enum_name,
    string_agg(e.enumlabel, ', ' ORDER BY e.enumsortorder) as values
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid 
WHERE t.typname IN ('membership_status_type', 'role_type')
GROUP BY t.typname;

-- Check column types
SELECT 
    column_name,
    data_type,
    udt_name,
    column_default,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name IN ('role', 'membership_status')
ORDER BY column_name;

-- Check current data distribution
SELECT 'role' as column_name, role::text as value, COUNT(*) as count 
FROM public.profiles 
GROUP BY role
UNION ALL
SELECT 'membership_status', membership_status::text, COUNT(*) 
FROM public.profiles 
GROUP BY membership_status
ORDER BY column_name, count DESC;