import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runSimpleMigration() {
  console.log('🚀 Running simple membership status migration...\n');
  
  try {
    // Test connection by checking profiles table
    console.log('1. Testing connection...');
    const { data: profiles, error: testError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (testError) {
      console.error('❌ Connection test failed:', testError.message);
      return;
    } else {
      console.log('✅ Connected to Supabase successfully');
    }

    // Check if membership_status column already exists
    console.log('\n2. Checking current table structure...');
    try {
      const { data: testColumn, error: columnError } = await supabase
        .from('profiles')
        .select('membership_status')
        .limit(1);
      
      if (!columnError) {
        console.log('✅ membership_status column already exists');
        console.log('Current data sample:', testColumn);
      }
    } catch (err) {
      console.log('❌ membership_status column does not exist yet');
    }

    console.log('\n📋 MANUAL STEPS REQUIRED:');
    console.log('Since the RPC functions are not available, please follow these manual steps:');
    console.log('\n1. Open Supabase Dashboard: https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk');
    console.log('2. Go to SQL Editor (left sidebar)');
    console.log('3. Copy and paste this SQL and execute it:\n');

    // Read the SQL migration file we created earlier
    const sqlMigration = `
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
`;

    console.log('```sql');
    console.log(sqlMigration.trim());
    console.log('```');

    console.log('\n4. After running the SQL, go to Table Editor → profiles table');
    console.log('5. Click on any membership_status cell to see the dropdown');

    // Write the SQL to a file for easy copy-paste
    fs.writeFileSync('./membership-migration.sql', sqlMigration.trim());
    console.log('\n📁 SQL migration saved to: membership-migration.sql');

    console.log('\n✨ Expected result:');
    console.log('You should see a dropdown with these options:');
    console.log('• free - ฟรี (default)');
    console.log('• basic - คอร์สเบสิก');
    console.log('• scalping - คอร์สพาซิ่ง');
    console.log('• advanced - คอร์สแอดวานซ์');
    console.log('• ema - คอร์ส EMA');
    console.log('• premium - พรีเมี่ยมทุกคอร์ส');

  } catch (error) {
    console.error('💥 Error:', error);
  }
}

runSimpleMigration();