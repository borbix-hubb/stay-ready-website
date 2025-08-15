-- Create custom enum type for membership status with proper dropdown in Supabase Dashboard
CREATE TYPE public.membership_status_type AS ENUM (
    'free',
    'basic', 
    'scalping',
    'advanced',
    'ema',
    'premium'
);

-- Add membership_status column using the enum type
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS membership_status membership_status_type DEFAULT 'free';

-- Update existing rows to have 'free' status if null
UPDATE public.profiles SET membership_status = 'free' WHERE membership_status IS NULL;

-- Add comment to describe the column
COMMENT ON COLUMN public.profiles.membership_status IS 'สถานะสมาชิก: free=ฟรี, basic=คอร์สเบสิก, scalping=คอร์สพาซิ่ง, advanced=คอร์สแอดวานซ์, ema=คอร์ส EMA, premium=พรีเมี่ยมทุกคอร์ส';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_membership_status ON public.profiles(membership_status);

-- Grant necessary permissions
GRANT USAGE ON TYPE public.membership_status_type TO anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO anon, authenticated;