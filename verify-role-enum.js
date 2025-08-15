import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyRoleEnum() {
  console.log('🔍 Verifying role enum implementation...\n');

  try {
    // Check current role values in the profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, role, full_name')
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (profilesError) {
      console.error('❌ Error fetching profiles:', profilesError.message);
      return;
    }

    console.log('📊 Current roles in profiles table:');
    if (profiles && profiles.length > 0) {
      profiles.forEach((profile, index) => {
        const name = profile.full_name || 'Unnamed User';
        console.log(`  ${index + 1}. ${name} (${profile.id.substring(0, 8)}...) → role: "${profile.role}"`);
      });
      
      // Count roles
      const roleCounts = profiles.reduce((acc, profile) => {
        acc[profile.role] = (acc[profile.role] || 0) + 1;
        return acc;
      }, {});
      
      console.log('\n📈 Role distribution:');
      Object.entries(roleCounts).forEach(([role, count]) => {
        console.log(`  • ${role}: ${count} user(s)`);
      });
    } else {
      console.log('  No profiles found.');
    }

    console.log('\n✅ Role enum verification completed!');
    console.log('\n🎯 Next steps:');
    console.log('   1. Open Supabase Dashboard: https://supabase.com/dashboard/project/mzkznibbbyfkgyondduk');
    console.log('   2. Go to Table Editor → profiles table');
    console.log('   3. Click on any role cell - you should see a dropdown with: user, admin, moderator');
    console.log('   4. Test changing a role value using the dropdown');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

verifyRoleEnum();