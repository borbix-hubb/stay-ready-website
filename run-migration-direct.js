import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Fixing category deletion constraint...\n');

  try {
    // First, check current constraint
    const { data: constraints, error: checkError } = await supabase
      .rpc('get_table_constraints', { 
        table_name: 'courses',
        constraint_type: 'FOREIGN KEY'
      })
      .catch(() => ({ data: null, error: 'Function not found' }));

    if (!checkError) {
      console.log('Current constraints:', constraints);
    }

    // Try to update courses that have the category to be deleted
    console.log('\n1. Checking for courses with categories...');
    const { data: categories, error: catError } = await supabase
      .from('course_categories')
      .select('id, name');
    
    if (catError) {
      console.error('Error fetching categories:', catError);
    } else {
      console.log('Categories found:', categories);
    }

    // For each category, check if there are courses
    if (categories) {
      for (const category of categories) {
        const { data: courses, error: courseError } = await supabase
          .from('courses')
          .select('id')
          .eq('category_id', category.id);
        
        if (courses && courses.length > 0) {
          console.log(`Category "${category.name}" has ${courses.length} courses`);
        }
      }
    }

    console.log('\n2. Testing deletion of a category with courses...');
    
    // Find a category to test (preferably one with courses)
    const testCategory = categories?.find(c => c.name === 'al' || c.name === 'AI');
    
    if (testCategory) {
      console.log(`\nAttempting to delete category: ${testCategory.name} (${testCategory.id})`);
      
      // First, update courses to remove category reference
      const { error: updateError } = await supabase
        .from('courses')
        .update({ category_id: null })
        .eq('category_id', testCategory.id);
      
      if (updateError) {
        console.error('Error updating courses:', updateError.message);
      } else {
        console.log('✓ Successfully updated courses to remove category reference');
      }
      
      // Now try to delete the category
      const { error: deleteError } = await supabase
        .from('course_categories')
        .delete()
        .eq('id', testCategory.id);
      
      if (deleteError) {
        console.error('Error deleting category:', deleteError.message);
        console.log('\n⚠️  Please run the SQL migration in Supabase Dashboard to fix the constraint');
      } else {
        console.log('✓ Successfully deleted category!');
      }
    }

    console.log('\n✅ Migration logic tested. If deletion failed, please run this SQL in Supabase Dashboard:');
    console.log(`
ALTER TABLE courses ALTER COLUMN category_id DROP NOT NULL;
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_category_id_fkey;
ALTER TABLE courses ADD CONSTRAINT courses_category_id_fkey 
  FOREIGN KEY (category_id) REFERENCES course_categories(id) ON DELETE SET NULL;
    `);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

runMigration();