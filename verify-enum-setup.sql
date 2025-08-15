-- VERIFICATION SCRIPT - Run this after the main script to confirm everything works
-- This script will show you the current state of your enums and table structure

-- Check if enum types exist and show their values
SELECT 
    t.typname as enum_name,
    array_agg(e.enumlabel ORDER BY e.enumsortorder) as enum_values
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname IN ('role_type', 'membership_status_type')
GROUP BY t.typname
ORDER BY t.typname;

-- Check the profiles table structure for role and membership_status columns
SELECT 
    column_name, 
    data_type, 
    udt_name,
    column_default,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
    AND table_schema = 'public'
    AND column_name IN ('role', 'membership_status')
ORDER BY column_name;

-- Show sample data from profiles table
SELECT 
    id,
    role,
    membership_status,
    created_at
FROM public.profiles 
ORDER BY created_at DESC 
LIMIT 5;

-- Count users by role and membership status
SELECT 
    role,
    membership_status,
    count(*) as user_count
FROM public.profiles 
GROUP BY role, membership_status
ORDER BY role, membership_status;