-- Create storage bucket for payment slips
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-slips', 'payment-slips', true);

-- Create payment_confirmations table
CREATE TABLE public.payment_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payer_name TEXT NOT NULL,
  transfer_date DATE NOT NULL,
  bank_name TEXT NOT NULL,
  slip_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_confirmations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own payment confirmations"
ON public.payment_confirmations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payment confirmations"
ON public.payment_confirmations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payment confirmations"
ON public.payment_confirmations
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Admins can update payment confirmations"
ON public.payment_confirmations
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

-- Create storage policies
CREATE POLICY "Users can upload payment slips"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'payment-slips' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own payment slips"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-slips' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Payment slips are publicly viewable"
ON storage.objects
FOR SELECT
USING (bucket_id = 'payment-slips');

-- Create trigger for updating timestamps
CREATE TRIGGER update_payment_confirmations_updated_at
BEFORE UPDATE ON public.payment_confirmations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();