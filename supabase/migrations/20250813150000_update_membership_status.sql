-- Add membership_status column to profiles table if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_status TEXT DEFAULT 'free';

-- Create enum type for membership statuses
DO $$ BEGIN
    CREATE TYPE membership_status_enum AS ENUM ('free', 'basic', 'scalping', 'advanced', 'ema', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update the column to use the enum type (only if column exists and is text type)
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'profiles' AND column_name = 'membership_status' AND data_type = 'text') THEN
        ALTER TABLE profiles ALTER COLUMN membership_status TYPE membership_status_enum USING membership_status::membership_status_enum;
    END IF;
END $$;

-- Set default value
ALTER TABLE profiles ALTER COLUMN membership_status SET DEFAULT 'free';

-- Add constraint to ensure valid values
ALTER TABLE profiles ADD CONSTRAINT check_membership_status 
CHECK (membership_status IN ('free', 'basic', 'scalping', 'advanced', 'ema', 'premium'));