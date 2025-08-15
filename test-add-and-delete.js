import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzkznibbbyfkgyondduk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16a3puaWJiYnlma2d5b25kZHVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM4NDQ4MSwiZXhwIjoyMDY1OTYwNDgxfQ.MTsoRsOXbn3oGovSzTMEcaAkZWMfAJA-qmNKRGrgL5g';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAddAndDelete() {
  console.log('Testing add and delete category with MCP/Supabase...\n');

  try {
    // 1. Add a test category
    console.log('1. Adding test category "Test MCP"...');
    const { data: newCategory, error: addError } = await supabase
      .from('course_categories')
      .insert({ name: 'Test MCP' })
      .select()
      .single();
    
    if (addError) {
      console.error('Error adding category:', addError);
      return;
    }
    
    console.log(`✓ Category added: ${newCategory.name} (${newCategory.id})`);

    // 2. Add a test course using this category
    console.log('\n2. Adding test course with this category...');
    const { data: newCourse, error: courseError } = await supabase
      .from('courses')
      .insert({ 
        title: 'Test Course for MCP',
        category_id: newCategory.id,
        description: 'Test course to verify deletion'
      })
      .select()
      .single();
    
    if (courseError) {
      console.error('Error adding course:', courseError);
    } else {
      console.log(`✓ Course added: ${newCourse.title}`);
    }

    // 3. Try to delete the category directly (should fail)
    console.log('\n3. Attempting to delete category with course (should fail)...');
    const { error: deleteError1 } = await supabase
      .from('course_categories')
      .delete()
      .eq('id', newCategory.id);
    
    if (deleteError1) {
      console.log(`❌ Expected error: ${deleteError1.message}`);
    } else {
      console.log('✓ Category deleted (unexpected - constraint may be fixed)');
    }

    // 4. Update course to remove category reference
    if (newCourse) {
      console.log('\n4. Updating course to remove category reference...');
      const { error: updateError } = await supabase
        .from('courses')
        .update({ category_id: null })
        .eq('id', newCourse.id);
      
      if (updateError) {
        console.error('Error updating course:', updateError);
      } else {
        console.log('✓ Course updated');
      }
    }

    // 5. Now delete the category (should work)
    console.log('\n5. Attempting to delete category after removing references...');
    const { error: deleteError2 } = await supabase
      .from('course_categories')
      .delete()
      .eq('id', newCategory.id);
    
    if (deleteError2) {
      console.error(`❌ Error: ${deleteError2.message}`);
      console.log('\n⚠️  The constraint still prevents deletion.');
      console.log('To fix this, run the SQL migration in Supabase Dashboard.');
    } else {
      console.log('✅ Category deleted successfully!');
    }

    // 6. Clean up test course if it exists
    if (newCourse) {
      console.log('\n6. Cleaning up test course...');
      const { error: cleanupError } = await supabase
        .from('courses')
        .delete()
        .eq('id', newCourse.id);
      
      if (!cleanupError) {
        console.log('✓ Test course cleaned up');
      }
    }

    // Show final state
    console.log('\n=== Final State ===');
    const { data: finalCategories } = await supabase
      .from('course_categories')
      .select('name');
    
    console.log('Categories:');
    finalCategories?.forEach(cat => console.log(`- ${cat.name}`));

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

testAddAndDelete();