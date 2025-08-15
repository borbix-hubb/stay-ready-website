import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDeleteCategory() {
  console.log('Testing category deletion...\n');

  try {
    // 1. List all categories
    const { data: categories, error: catError } = await supabase
      .from('course_categories')
      .select('*');
    
    if (catError) {
      console.error('Error fetching categories:', catError);
      return;
    }
    
    console.log('Current categories:');
    categories.forEach(cat => {
      console.log(`- ${cat.name} (${cat.id})`);
    });

    // 2. Find the "al" category
    const alCategory = categories.find(c => c.name === 'al' || c.name === 'AI');
    
    if (!alCategory) {
      console.log('\nNo "al" or "AI" category found to delete');
      return;
    }

    console.log(`\nAttempting to delete category: "${alCategory.name}" (${alCategory.id})`);

    // 3. Check for courses using this category
    const { data: courses, error: courseError } = await supabase
      .from('courses')
      .select('id, title')
      .eq('category_id', alCategory.id);
    
    if (courseError) {
      console.error('Error checking courses:', courseError);
      return;
    }

    if (courses && courses.length > 0) {
      console.log(`Found ${courses.length} courses using this category:`);
      courses.forEach(course => console.log(`  - ${course.title}`));
      
      // 4. Update courses to remove category reference
      console.log('\nUpdating courses to remove category reference...');
      const { error: updateError } = await supabase
        .from('courses')
        .update({ category_id: null })
        .eq('category_id', alCategory.id);
      
      if (updateError) {
        console.error('Error updating courses:', updateError);
        return;
      }
      console.log('✓ Courses updated successfully');
    }

    // 5. Try to delete the category
    console.log('\nDeleting category...');
    const { error: deleteError } = await supabase
      .from('course_categories')
      .delete()
      .eq('id', alCategory.id);
    
    if (deleteError) {
      console.error('❌ Error deleting category:', deleteError.message);
      console.log('\n⚠️  The database constraint needs to be updated.');
      console.log('Please run this SQL in Supabase Dashboard SQL Editor:');
      console.log('----------------------------------------');
      console.log(`ALTER TABLE courses ALTER COLUMN category_id DROP NOT NULL;`);
      console.log(`ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_category_id_fkey;`);
      console.log(`ALTER TABLE courses ADD CONSTRAINT courses_category_id_fkey`);
      console.log(`  FOREIGN KEY (category_id) REFERENCES course_categories(id)`);
      console.log(`  ON DELETE SET NULL;`);
      console.log('----------------------------------------');
    } else {
      console.log('✅ Category deleted successfully!');
      
      // Verify deletion
      const { data: remainingCategories } = await supabase
        .from('course_categories')
        .select('name');
      
      console.log('\nRemaining categories:');
      remainingCategories?.forEach(cat => console.log(`- ${cat.name}`));
    }
    
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testDeleteCategory();