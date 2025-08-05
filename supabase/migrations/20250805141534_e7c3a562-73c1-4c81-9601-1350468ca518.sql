-- แก้ไข RLS policies สำหรับ pattern_charts ให้เฉพาะแอดมินจัดการได้
DROP POLICY IF EXISTS "Users can create their own pattern charts" ON public.pattern_charts;
DROP POLICY IF EXISTS "Users can update their own pattern charts" ON public.pattern_charts;
DROP POLICY IF EXISTS "Users can delete their own pattern charts" ON public.pattern_charts;

-- สร้าง policies ใหม่สำหรับแอดมิน
CREATE POLICY "Admins can manage pattern charts" 
ON public.pattern_charts 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

-- แก้ไข RLS policies สำหรับ portfolio_items ให้เฉพาะแอดมินจัดการได้
DROP POLICY IF EXISTS "Users can create their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can update their own portfolio items" ON public.portfolio_items;
DROP POLICY IF EXISTS "Users can delete their own portfolio items" ON public.portfolio_items;

-- สร้าง policies ใหม่สำหรับแอดมิน
CREATE POLICY "Admins can manage portfolio items" 
ON public.portfolio_items 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));

-- แก้ไข RLS policies สำหรับ profiles ให้เฉพาะแอดมินแก้ไขได้
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- ให้แอดมินจัดการ profiles ได้ทั้งหมด และระบบสร้าง profile อัตโนมัติเมื่อมีผู้ใช้ใหม่
CREATE POLICY "System can insert profiles" 
ON public.profiles 
FOR INSERT 
WITH CHECK (true);

-- แก้ไข payment_confirmations ให้แอดมินจัดการได้ทั้งหมด
DROP POLICY IF EXISTS "Users can insert their own payment confirmations" ON public.payment_confirmations;

CREATE POLICY "Admins can manage payment confirmations" 
ON public.payment_confirmations 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() 
  AND profiles.role = 'admin'
));