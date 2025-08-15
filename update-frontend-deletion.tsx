// Updated deletion handler for the frontend
// Add this to your component that handles category deletion

import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const handleCategoryDelete = async (categoryId: string) => {
  try {
    // Option 1: Use the custom function (recommended)
    const { error } = await supabase.rpc('delete_category_with_courses', {
      category_id_param: categoryId
    });

    if (error) {
      console.error('Deletion error:', error);
      
      // If the function doesn't exist, try direct deletion
      if (error.message.includes('function') || error.message.includes('does not exist')) {
        // First delete courses
        const { error: coursesError } = await supabase
          .from('courses')
          .delete()
          .eq('category_id', categoryId);

        if (coursesError) {
          throw coursesError;
        }

        // Then delete category
        const { error: categoryError } = await supabase
          .from('course_categories')
          .delete()
          .eq('id', categoryId);

        if (categoryError) {
          throw categoryError;
        }
      } else {
        throw error;
      }
    }

    toast.success('Category deleted successfully');
    // Refresh your data here
    
  } catch (error) {
    console.error('Error deleting category:', error);
    toast.error('Failed to delete category');
  }
};

// Alternative: Update courses to NULL category before deletion
export const handleCategorySafeDelete = async (categoryId: string) => {
  try {
    // First, set all courses with this category to NULL
    const { error: updateError } = await supabase
      .from('courses')
      .update({ category_id: null })
      .eq('category_id', categoryId);

    if (updateError) {
      throw updateError;
    }

    // Then delete the category
    const { error: deleteError } = await supabase
      .from('course_categories')
      .delete()
      .eq('id', categoryId);

    if (deleteError) {
      throw deleteError;
    }

    toast.success('Category deleted successfully');
    // Refresh your data here
    
  } catch (error) {
    console.error('Error deleting category:', error);
    toast.error('Failed to delete category');
  }
};