-- Create custom enum type for user roles with proper dropdown in Supabase Dashboard
CREATE TYPE public.role_type AS ENUM (
    'user',
    'admin',
    'moderator'
);

-- First, remove the existing CHECK constraint on the role column
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;

-- Update the role column to use the enum type
-- This preserves existing data since 'user' and 'admin' are valid enum values
ALTER TABLE public.profiles ALTER COLUMN role TYPE role_type USING role::role_type;

-- Ensure the default is set to 'user'
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::role_type;

-- Update any existing rows that might have 'instructor' to 'moderator'
UPDATE public.profiles SET role = 'moderator' WHERE role::text = 'instructor';

-- Add comment to describe the role column
COMMENT ON COLUMN public.profiles.role IS 'บทบาทผู้ใช้: user=ผู้ใช้ทั่วไป, admin=ผู้ดูแลระบบ, moderator=ผู้ช่วยดูแล';

-- Create index for better performance on role queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Grant necessary permissions for the enum type
GRANT USAGE ON TYPE public.role_type TO anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO anon, authenticated;