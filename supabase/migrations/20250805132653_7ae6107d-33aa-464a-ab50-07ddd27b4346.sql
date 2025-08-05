-- Create pattern_charts table for trading pattern analysis
CREATE TABLE public.pattern_charts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  pattern_type TEXT NOT NULL CHECK (pattern_type IN ('bullish', 'bearish', 'neutral')),
  timeframe TEXT NOT NULL,
  image_url TEXT NOT NULL,
  profit_loss DECIMAL(10,2),
  success_rate DECIMAL(5,2) CHECK (success_rate >= 0 AND success_rate <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pattern_charts ENABLE ROW LEVEL SECURITY;

-- Create policies for pattern charts access
CREATE POLICY "Users can view all pattern charts" 
ON public.pattern_charts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own pattern charts" 
ON public.pattern_charts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pattern charts" 
ON public.pattern_charts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pattern charts" 
ON public.pattern_charts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pattern_charts_updated_at
BEFORE UPDATE ON public.pattern_charts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for pattern chart images
INSERT INTO storage.buckets (id, name, public) VALUES ('pattern-charts', 'pattern-charts', true);

-- Create storage policies for pattern chart images
CREATE POLICY "Pattern chart images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'pattern-charts');

CREATE POLICY "Users can upload their own pattern chart images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'pattern-charts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own pattern chart images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'pattern-charts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own pattern chart images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'pattern-charts' AND auth.uid()::text = (storage.foldername(name))[1]);