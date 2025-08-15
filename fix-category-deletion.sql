-- Complete solution to fix category deletion issues
-- This script handles the foreign key constraint error when deleting categories

-- Step 1: First, let's check what courses are linked to categories
SELECT 
    cc.id as category_id,
    cc.name as category_name,
    COUNT(c.id) as course_count
FROM course_categories cc
LEFT JOIN courses c ON c.category_id = cc.id
GROUP BY cc.id, cc.name;

-- Step 2: Create a function to safely delete categories
CREATE OR REPLACE FUNCTION delete_category_with_courses(category_id_param UUID)
RETURNS void AS $$
BEGIN
    -- First delete all courses associated with this category
    DELETE FROM courses WHERE category_id = category_id_param;
    
    -- Then delete the category itself
    DELETE FROM course_categories WHERE id = category_id_param;
    
    -- Return success
    RETURN;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Alternative - Update the foreign key to allow NULL and set courses to NULL when category is deleted
-- First, make category_id nullable if it isn't already
ALTER TABLE courses 
ALTER COLUMN category_id DROP NOT NULL;

-- Drop the existing constraint
ALTER TABLE courses 
DROP CONSTRAINT IF EXISTS courses_category_id_fkey;

-- Add new constraint with SET NULL option
ALTER TABLE courses 
ADD CONSTRAINT courses_category_id_fkey 
FOREIGN KEY (category_id) 
REFERENCES course_categories(id) 
ON DELETE SET NULL;

-- Step 4: Create a trigger to handle deletions automatically
CREATE OR REPLACE FUNCTION handle_category_deletion()
RETURNS TRIGGER AS $$
BEGIN
    -- Log the deletion attempt
    RAISE NOTICE 'Attempting to delete category %', OLD.id;
    
    -- Update courses to set category_id to NULL
    UPDATE courses 
    SET category_id = NULL 
    WHERE category_id = OLD.id;
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS before_category_delete ON course_categories;
CREATE TRIGGER before_category_delete
BEFORE DELETE ON course_categories
FOR EACH ROW
EXECUTE FUNCTION handle_category_deletion();

-- Step 5: Grant necessary permissions
GRANT EXECUTE ON FUNCTION delete_category_with_courses(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION delete_category_with_courses(UUID) TO anon;

-- Step 6: Test the solution
-- To delete a category and its courses, use:
-- SELECT delete_category_with_courses('your-category-id-here');

-- Or simply DELETE and let the trigger handle it:
-- DELETE FROM course_categories WHERE id = 'your-category-id-here';

-- Verify the constraints are updated
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    rc.delete_rule
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.referential_constraints AS rc
      ON rc.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name='courses'
    AND kcu.column_name='category_id';