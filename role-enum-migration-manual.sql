-- =====================================================
-- ROLE ENUM MIGRATION - Run this SQL in Supabase Dashboard
-- =====================================================
-- 
-- Instructions:
-- 1. Open Supabase Dashboard: https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk
-- 2. Go to SQL Editor
-- 3. Copy and paste this entire SQL block
-- 4. Click "Run" to execute
--
-- This will create a dropdown for the role column in the profiles table
-- =====================================================

-- Step 1: Create custom enum type for user roles
CREATE TYPE public.role_type AS ENUM (
    'user',
    'admin',
    'moderator'
);

-- Step 2: Remove the existing CHECK constraint on the role column
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Step 3: Update the role column to use the enum type
-- This preserves existing data since 'user' and 'admin' are valid enum values
ALTER TABLE public.profiles ALTER COLUMN role TYPE role_type USING role::role_type;

-- Step 4: Set the default value to 'user'
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::role_type;

-- Step 5: Update any existing rows that might have 'instructor' to 'moderator'
-- (This handles the old constraint that allowed 'instructor')
UPDATE public.profiles SET role = 'moderator' WHERE role::text = 'instructor';

-- Step 6: Add descriptive comment for documentation
COMMENT ON COLUMN public.profiles.role IS 'บทบาทผู้ใช้: user=ผู้ใช้ทั่วไป, admin=ผู้ดูแลระบบ, moderator=ผู้ช่วยดูแล';

-- Step 7: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Step 8: Grant necessary permissions for the enum type
GRANT USAGE ON TYPE public.role_type TO anon, authenticated;

-- =====================================================
-- VERIFICATION QUERIES (Optional - run these to verify)
-- =====================================================

-- Check if the enum type was created successfully
SELECT enumlabel as role_values 
FROM pg_enum e 
JOIN pg_type t ON e.enumtypid = t.oid 
WHERE t.typname = 'role_type'
ORDER BY enumsortorder;

-- Check current role values in the profiles table
SELECT role, COUNT(*) as count 
FROM public.profiles 
GROUP BY role;

-- Check column information
SELECT 
    column_name,
    data_type,
    column_default,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND column_name = 'role'
    AND table_schema = 'public';