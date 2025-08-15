-- Simple fix for category deletion
-- Run this in Supabase SQL Editor

-- Make category_id nullable
ALTER TABLE courses ALTER COLUMN category_id DROP NOT NULL;

-- Drop and recreate constraint with SET NULL
ALTER TABLE courses DROP CONSTRAINT IF EXISTS courses_category_id_fkey;
ALTER TABLE courses ADD CONSTRAINT courses_category_id_fkey FOREIGN KEY (category_id) REFERENCES course_categories(id) ON DELETE SET NULL;