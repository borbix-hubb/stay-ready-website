-- Create course_documents table for managing course materials
CREATE TABLE public.course_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  file_type TEXT,
  file_size INTEGER,
  document_order INTEGER DEFAULT 0,
  is_downloadable BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.course_documents ENABLE ROW LEVEL SECURITY;

-- Create policies for course documents
CREATE POLICY "Documents are viewable by everyone" 
ON public.course_documents 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage documents" 
ON public.course_documents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_course_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_course_documents_updated_at
  BEFORE UPDATE ON public.course_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_course_documents_updated_at();