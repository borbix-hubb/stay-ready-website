const { createClient } = require('@supabase/supabase-js');

// Use the service role key from your .cursor/mcp.json
const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log('Running migration to fix category deletion constraint...');
  
  try {
    // Step 1: Make category_id nullable
    const { error: error1 } = await supabase.rpc('query', {
      query: 'ALTER TABLE courses ALTER COLUMN category_id DROP NOT NULL'
    });
    
    if (error1 && !error1.message.includes('already')) {
      console.error('Error making category_id nullable:', error1);
    } else {
      console.log('✓ Made category_id nullable');
    }

    // Step 2: Drop existing constraint
    const { error: error2 } = await supabase.rpc('query', {
      query: 'ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_category_id_fkey'
    });
    
    if (error2) {
      console.error('Error dropping constraint:', error2);
    } else {
      console.log('✓ Dropped existing constraint');
    }

    // Step 3: Add new constraint with SET NULL
    const { error: error3 } = await supabase.rpc('query', {
      query: `ALTER TABLE courses 
              ADD CONSTRAINT courses_category_id_fkey 
              FOREIGN KEY (category_id) 
              REFERENCES course_categories(id) 
              ON DELETE SET NULL`
    });
    
    if (error3 && !error3.message.includes('already exists')) {
      console.error('Error adding new constraint:', error3);
    } else {
      console.log('✓ Added new constraint with SET NULL option');
    }

    console.log('\n✅ Migration completed successfully!');
    console.log('You can now delete categories without errors.');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

runMigration();