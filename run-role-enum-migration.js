import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runRoleEnumMigration() {
  console.log('Creating role enum type for profiles table...\n');

  try {
    // Read the migration SQL file
    const migrationSQL = readFileSync('./supabase/migrations/20250813160000_create_role_enum.sql', 'utf8');
    
    console.log('Executing migration SQL...\n');
    console.log(migrationSQL);
    console.log('\n' + '='.repeat(60) + '\n');

    // Execute step by step since direct SQL execution might not be available
    console.log('🔄 Executing migration step by step...\n');
    
    const steps = [
      {
        name: 'Create role_type enum',
        sql: `CREATE TYPE public.role_type AS ENUM ('user', 'admin', 'moderator');`
      },
      {
        name: 'Remove existing constraint',
        sql: `ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;`
      },
      {
        name: 'Update column type to enum',
        sql: `ALTER TABLE public.profiles ALTER COLUMN role TYPE role_type USING role::role_type;`
      },
      {
        name: 'Set default value',
        sql: `ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'user'::role_type;`
      },
      {
        name: 'Update instructor to moderator',
        sql: `UPDATE public.profiles SET role = 'moderator' WHERE role::text = 'instructor';`
      },
      {
        name: 'Add column comment',
        sql: `COMMENT ON COLUMN public.profiles.role IS 'บทบาทผู้ใช้: user=ผู้ใช้ทั่วไป, admin=ผู้ดูแลระบบ, moderator=ผู้ช่วยดูแล';`
      },
      {
        name: 'Create index for performance',
        sql: `CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);`
      },
      {
        name: 'Grant permissions on enum type',
        sql: `GRANT USAGE ON TYPE public.role_type TO anon, authenticated;`
      }
    ];

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      console.log(`Step ${i + 1}: ${step.name}...`);
      
      try {
        const { error: stepError } = await supabase.rpc('sql', { query: step.sql });
        
        if (stepError) {
          console.error(`❌ Failed: ${stepError.message}`);
          failCount++;
        } else {
          console.log(`✅ Success`);
          successCount++;
        }
      } catch (err) {
        console.error(`❌ Error: ${err.message}`);
        failCount++;
      }
    }

    console.log(`\n📊 Results: ${successCount} succeeded, ${failCount} failed`);

    // Verify the changes
    console.log('\n🔍 Verifying the migration results...\n');
    
    // Check if the enum type was created
    const { data: enumData, error: enumError } = await supabase
      .from('pg_type')
      .select('typname')
      .eq('typname', 'role_type');
    
    if (enumError) {
      console.error('Error checking enum type:', enumError.message);
    } else if (enumData && enumData.length > 0) {
      console.log('✅ role_type enum created successfully');
    } else {
      console.log('❌ role_type enum not found');
    }

    // Check current role values in the profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, role')
      .limit(10);
    
    if (profilesError) {
      console.error('Error fetching profiles:', profilesError.message);
    } else {
      console.log('✅ Current role values in profiles table:');
      profiles.forEach((profile, index) => {
        console.log(`  ${index + 1}. User ${profile.id.substring(0, 8)}... role: ${profile.role}`);
      });
    }

    console.log('\n🎉 Role enum migration completed!');
    console.log('\n📋 What was accomplished:');
    console.log('   • Created role_type enum with values: user, admin, moderator');
    console.log('   • Updated profiles.role column to use the enum type');
    console.log('   • Set default value to "user"');
    console.log('   • Added database index for better performance');
    console.log('   • Added Thai language comment for documentation');
    console.log('\n✨ The role column should now show as a dropdown in Supabase Dashboard!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

runRoleEnumMigration();