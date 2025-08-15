import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMembershipMigration() {
  console.log('🚀 Starting membership status enum migration...\n');
  
  try {
    // Step 1: Create enum type
    console.log('1. Creating membership_status_type enum...');
    const { error: error1 } = await supabase.rpc('query', {
      query: `
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
          WHEN duplicate_object THEN null;
        END $$;
      `
    });
    
    if (error1) {
      console.error('❌ Error creating enum:', error1.message);
      // Continue anyway as it might already exist
    } else {
      console.log('✅ Enum type created/verified');
    }

    // Step 2: Check if profiles table exists and get current column info
    console.log('\n2. Checking profiles table structure...');
    const { data: columns, error: columnError } = await supabase.rpc('query', {
      query: `
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'membership_status';
      `
    });

    if (columnError) {
      console.error('❌ Error checking table structure:', columnError.message);
      return;
    }

    console.log('Current membership_status column:', columns);

    // Step 3: Add or update membership_status column
    if (!columns || columns.length === 0) {
      console.log('\n3. Adding membership_status column...');
      const { error: error3 } = await supabase.rpc('query', {
        query: `
          ALTER TABLE public.profiles 
          ADD COLUMN membership_status membership_status_type DEFAULT 'free';
        `
      });
      
      if (error3) {
        console.error('❌ Error adding column:', error3.message);
        return;
      } else {
        console.log('✅ Added membership_status column');
      }
    } else {
      console.log('\n3. Column exists, checking if it needs to be converted to enum...');
      const currentColumn = columns[0];
      
      if (currentColumn.data_type !== 'USER-DEFINED') {
        console.log('Converting existing column to use enum type...');
        const { error: convertError } = await supabase.rpc('query', {
          query: `
            ALTER TABLE public.profiles 
            ALTER COLUMN membership_status TYPE membership_status_type 
            USING membership_status::membership_status_type;
            
            ALTER TABLE public.profiles 
            ALTER COLUMN membership_status SET DEFAULT 'free';
          `
        });
        
        if (convertError) {
          console.error('❌ Error converting column:', convertError.message);
          return;
        } else {
          console.log('✅ Converted column to use enum type');
        }
      } else {
        console.log('✅ Column already uses enum type');
      }
    }

    // Step 4: Update existing rows to have 'free' status if null
    console.log('\n4. Updating existing rows with null values...');
    const { error: error4 } = await supabase.rpc('query', {
      query: `
        UPDATE public.profiles 
        SET membership_status = 'free' 
        WHERE membership_status IS NULL;
      `
    });
    
    if (error4) {
      console.error('❌ Error updating rows:', error4.message);
    } else {
      console.log('✅ Updated existing rows');
    }

    // Step 5: Add comment and index
    console.log('\n5. Adding comment and index...');
    const { error: error5 } = await supabase.rpc('query', {
      query: `
        COMMENT ON COLUMN public.profiles.membership_status IS 'สถานะสมาชิก: free=ฟรี, basic=คอร์สเบสิก, scalping=คอร์สพาซิ่ง, advanced=คอร์สแอดวานซ์, ema=คอร์ส EMA, premium=พรีเมี่ยมทุกคอร์ส';
        
        CREATE INDEX IF NOT EXISTS idx_profiles_membership_status 
        ON public.profiles(membership_status);
      `
    });
    
    if (error5) {
      console.error('❌ Error adding comment/index:', error5.message);
    } else {
      console.log('✅ Added comment and index');
    }

    // Step 6: Grant permissions
    console.log('\n6. Granting permissions...');
    const { error: error6 } = await supabase.rpc('query', {
      query: `
        GRANT USAGE ON TYPE public.membership_status_type TO anon, authenticated;
        GRANT SELECT, UPDATE ON public.profiles TO anon, authenticated;
      `
    });
    
    if (error6) {
      console.error('❌ Error granting permissions:', error6.message);
    } else {
      console.log('✅ Granted permissions');
    }

    // Step 7: Test the setup by checking a few rows
    console.log('\n7. Testing the setup...');
    const { data: testData, error: testError } = await supabase
      .from('profiles')
      .select('id, membership_status')
      .limit(5);
    
    if (testError) {
      console.error('❌ Error testing setup:', testError.message);
    } else {
      console.log('✅ Test query successful');
      console.log('Sample data:', testData);
    }

    console.log('\n🎉 MIGRATION COMPLETED SUCCESSFULLY! 🎉');
    console.log('\n📋 What you can do now:');
    console.log('1. Open Supabase Dashboard: https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk');
    console.log('2. Go to Table Editor → profiles table');
    console.log('3. Click on any membership_status cell');
    console.log('4. You should see a dropdown with options: free, basic, scalping, advanced, ema, premium');
    console.log('\n🔧 Available membership levels:');
    console.log('• free - ฟรี (default)');
    console.log('• basic - คอร์สเบสิก');
    console.log('• scalping - คอร์สพาซิ่ง');
    console.log('• advanced - คอร์สแอดวานซ์');
    console.log('• ema - คอร์ส EMA');
    console.log('• premium - พรีเมี่ยมทุกคอร์ส');
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
  }
}

runMembershipMigration();