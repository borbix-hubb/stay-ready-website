# Manual Database Migration Instructions

เนื่องจากไม่สามารถรัน migration อัตโนมัติได้ กรุณาทำการอัปเดต database manually ดังนี้:

## 1. เข้า Supabase Dashboard
1. ไปที่ https://supabase.com/dashboard
2. เลือกโปรเจกต์ `mzkznibbbyfkgyondduk`
3. ไปที่ SQL Editor

## 2. รัน SQL นี้เพื่ออัปเดต profiles table:

```sql
-- Add membership_status column to profiles table if it doesn't exist
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_status TEXT DEFAULT 'free';

-- Update existing rows to have 'free' status if null
UPDATE profiles SET membership_status = 'free' WHERE membership_status IS NULL;

-- Add constraint to ensure valid values
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS check_membership_status;
ALTER TABLE profiles ADD CONSTRAINT check_membership_status 
CHECK (membership_status IN ('free', 'basic', 'scalping', 'advanced', 'ema', 'premium'));
```

## 3. ตรวจสอบการเปลี่ยนแปลง
หลังจากรัน SQL แล้ว ให้ตรวจสอบว่า column `membership_status` ถูกเพิ่มเข้าไปใน `profiles` table แล้ว

## 4. Values ที่ใช้ได้:
- `free` - ฟรี (default)
- `basic` - Basic Course
- `scalping` - Scalping Course  
- `advanced` - Advanced Course
- `ema` - EMA Course
- `premium` - Premium (All Courses)

ระบบจะใช้ค่าเหล่านี้ในการแสดงสถานะสมาชิกและการจัดการสิทธิ์