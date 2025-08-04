-- เพิ่ม policy ให้ admin สามารถอัพเดต profile ของผู้ใช้คนอื่นได้
CREATE POLICY "Admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);