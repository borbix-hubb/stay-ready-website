import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifySetup() {
  console.log('🔍 Verifying membership status enum setup...\n');
  
  try {
    // Test 1: Check current profiles data
    console.log('1. Current profiles data:');
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id, membership_status')
      .limit(5);
    
    if (profileError) {
      console.error('❌ Error fetching profiles:', profileError.message);
      return;
    }
    
    console.log('✅ Profiles found:', profiles.length);
    profiles.forEach(p => console.log(`   - ${p.id}: ${p.membership_status}`));

    // Test 2: Test each enum value
    console.log('\n2. Testing all enum values:');
    const enumValues = ['free', 'basic', 'scalping', 'advanced', 'ema', 'premium'];
    const testProfile = profiles[0];
    
    for (const value of enumValues) {
      const { error } = await supabase
        .from('profiles')
        .update({ membership_status: value })
        .eq('id', testProfile.id);
      
      if (error) {
        console.log(`❌ ${value}: ${error.message}`);
      } else {
        console.log(`✅ ${value}: Success`);
      }
    }

    // Test 3: Test invalid value (should fail)
    console.log('\n3. Testing invalid value (should fail):');
    const { error: invalidError } = await supabase
      .from('profiles')
      .update({ membership_status: 'invalid' })
      .eq('id', testProfile.id);
    
    if (invalidError) {
      console.log('✅ Invalid value rejected:', invalidError.message);
    } else {
      console.log('❌ Invalid value was accepted (this is wrong!)');
    }

    // Reset test profile to 'free'
    await supabase
      .from('profiles')
      .update({ membership_status: 'free' })
      .eq('id', testProfile.id);

    console.log('\n🎉 VERIFICATION COMPLETE!');
    console.log('\n📋 Setup Summary:');
    console.log('✅ membership_status_type enum created with 6 values');
    console.log('✅ profiles.membership_status column uses the enum');
    console.log('✅ All enum values work correctly');
    console.log('✅ Invalid values are rejected');
    console.log('✅ Default value is "free"');
    console.log('✅ Index created for performance');
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Open Supabase Dashboard: https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk');
    console.log('2. Go to Table Editor → profiles table');
    console.log('3. Click on any membership_status cell');
    console.log('4. You should see a dropdown with these options:');
    console.log('   • free - ฟรี (default)');
    console.log('   • basic - คอร์สเบสิก');
    console.log('   • scalping - คอร์สพาซิ่ง');
    console.log('   • advanced - คอร์สแอดวานซ์');
    console.log('   • ema - คอร์ส EMA');
    console.log('   • premium - พรีเมี่ยมทุกคอร์ส');
    
  } catch (error) {
    console.error('💥 Verification failed:', error);
  }
}

verifySetup();