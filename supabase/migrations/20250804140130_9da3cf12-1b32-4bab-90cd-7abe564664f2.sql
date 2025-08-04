-- Create payments table for payment tracking
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_confirmation_id UUID REFERENCES public.payment_confirmations(id) ON DELETE CASCADE,
  plan_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT DEFAULT 'bank_transfer',
  payment_status TEXT DEFAULT 'pending', -- pending, verified, rejected, refunded
  processed_by UUID REFERENCES auth.users(id),
  processed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payments table
CREATE POLICY "Users can view their own payments"
ON public.payments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
ON public.payments
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "Admins can update payments"
ON public.payments
FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "System can insert payments"
ON public.payments
FOR INSERT
WITH CHECK (true);

-- Create trigger for updating timestamps
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_status ON public.payments(payment_status);
CREATE INDEX idx_payments_created_at ON public.payments(created_at);

-- Create payment_logs table for audit trail
CREATE TABLE public.payment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES public.payments(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- created, verified, rejected, refunded
  old_status TEXT,
  new_status TEXT,
  performed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS for payment_logs
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for payment_logs
CREATE POLICY "Admins can view all payment logs"
ON public.payment_logs
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

CREATE POLICY "System can insert payment logs"
ON public.payment_logs
FOR INSERT
WITH CHECK (true);

-- Create function to automatically create payment record when payment_confirmation is created
CREATE OR REPLACE FUNCTION public.create_payment_from_confirmation()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.payments (
    user_id,
    payment_confirmation_id,
    plan_name,
    amount,
    payment_method,
    payment_status
  ) VALUES (
    NEW.user_id,
    NEW.id,
    NEW.plan_name,
    NEW.amount,
    'bank_transfer',
    'pending'
  );
  
  -- Log the creation
  INSERT INTO public.payment_logs (
    payment_id,
    action,
    new_status,
    performed_by,
    notes
  ) VALUES (
    (SELECT id FROM public.payments WHERE payment_confirmation_id = NEW.id),
    'created',
    'pending',
    NEW.user_id,
    'Payment confirmation submitted'
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;