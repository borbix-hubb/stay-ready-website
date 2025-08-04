-- Add membership_status column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN membership_status TEXT DEFAULT 'free';

-- Add a check constraint to ensure valid membership status values
ALTER TABLE public.profiles 
ADD CONSTRAINT check_membership_status 
CHECK (membership_status IN ('free', 'premium'));