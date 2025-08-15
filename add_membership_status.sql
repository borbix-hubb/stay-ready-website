-- Add membership_status column to profiles table if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_status TEXT DEFAULT 'free';

-- Create enum type for membership statuses if it doesn't exist
DO $$ BEGIN
    CREATE TYPE membership_status_enum AS ENUM ('free', 'basic', 'scalping', 'advanced', 'ema', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update the column to use the enum type
ALTER TABLE profiles ALTER COLUMN membership_status TYPE membership_status_enum USING membership_status::membership_status_enum;

-- Set default value
ALTER TABLE profiles ALTER COLUMN membership_status SET DEFAULT 'free';

-- Add some sample data for testing
UPDATE profiles SET membership_status = 'free' WHERE membership_status IS NULL;