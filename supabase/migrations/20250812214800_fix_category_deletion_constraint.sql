-- Fix category deletion by updating foreign key constraint
-- This allows categories to be deleted and sets related courses' category_id to NULL

-- First, make category_id nullable if it isn't already
ALTER TABLE courses 
ALTER COLUMN category_id DROP NOT NULL;

-- Drop the existing constraint
ALTER TABLE courses 
DROP CONSTRAINT IF EXISTS courses_category_id_fkey;

-- Add new constraint with SET NULL option
-- This will automatically set category_id to NULL in courses when a category is deleted
ALTER TABLE courses 
ADD CONSTRAINT courses_category_id_fkey 
FOREIGN KEY (category_id) 
REFERENCES course_categories(id) 
ON DELETE SET NULL;

-- Verify the constraint is updated correctly
-- You can check this with:
-- SELECT 
--     tc.constraint_name, 
--     tc.table_name, 
--     kcu.column_name, 
--     rc.delete_rule
-- FROM 
--     information_schema.table_constraints AS tc 
--     JOIN information_schema.key_column_usage AS kcu
--       ON tc.constraint_name = kcu.constraint_name
--     JOIN information_schema.referential_constraints AS rc
--       ON rc.constraint_name = tc.constraint_name
-- WHERE tc.constraint_type = 'FOREIGN KEY' 
--     AND tc.table_name='courses'
--     AND kcu.column_name='category_id';