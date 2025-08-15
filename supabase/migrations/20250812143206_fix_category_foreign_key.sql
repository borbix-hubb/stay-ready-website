-- Fix foreign key constraint to allow SET NULL on category deletion
-- This allows course_categories to be deleted without constraint errors

-- Make category_id nullable
ALTER TABLE courses 
ALTER COLUMN category_id DROP NOT NULL;

-- Drop existing constraint
ALTER TABLE courses 
DROP CONSTRAINT IF EXISTS courses_category_id_fkey;

-- Add new constraint with SET NULL
ALTER TABLE courses 
ADD CONSTRAINT courses_category_id_fkey 
FOREIGN KEY (category_id) 
REFERENCES course_categories(id) 
ON DELETE SET NULL;