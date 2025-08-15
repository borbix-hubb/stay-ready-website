# ✅ การสร้าง Dropdown ใน Supabase Dashboard

## 📋 **ขั้นตอนที่ 1: เข้า Supabase Dashboard**

1. ไปที่ https://supabase.com/dashboard
2. เลือกโปรเจกต์ `crypto-kanit-dark` (mzkznibbbyfkgyondduk)
3. ไปที่ **SQL Editor** (ในเมนูซ้าย)

## 🚀 **ขั้นตอนที่ 2: สร้าง Custom Enum Type**

คัดลอกและรัน SQL นี้:

```sql
-- สร้าง custom enum type สำหรับ dropdown
CREATE TYPE public.membership_status_type AS ENUM (
    'free',
    'basic', 
    'scalping',
    'advanced',
    'ema',
    'premium'
);

-- เพิ่ม column ใหม่ที่ใช้ enum type
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS membership_status membership_status_type DEFAULT 'free';

-- อัปเดตข้อมูลเดิมให้เป็น 'free'
UPDATE public.profiles SET membership_status = 'free' WHERE membership_status IS NULL;

-- เพิ่มคำอธิบาย
COMMENT ON COLUMN public.profiles.membership_status IS 'สถานะสมาชิก: free=ฟรี, basic=คอร์สเบสิก, scalping=คอร์สพาซิ่ง, advanced=คอร์สแอดวานซ์, ema=คอร์ส EMA, premium=พรีเมี่ยมทุกคอร์ส';

-- สร้าง index เพื่อประสิทธิภาพ
CREATE INDEX IF NOT EXISTS idx_profiles_membership_status ON public.profiles(membership_status);

-- กำหนดสิทธิ์
GRANT USAGE ON TYPE public.membership_status_type TO anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO anon, authenticated;
```

## 🎯 **ขั้นตอนที่ 3: ตรวจสอบ Dropdown**

1. ไปที่ **Table Editor** (ในเมนูซ้าย)
2. เลือกตาราง `profiles`
3. คลิกที่ column `membership_status` 
4. ตอนนี้คุณจะเห็น **dropdown** ที่มีตัวเลือก:
   - `free` (ฟรี)
   - `basic` (Basic Course)
   - `scalping` (Scalping Course) 
   - `advanced` (Advanced Course)
   - `ema` (EMA Course)
   - `premium` (Premium All Courses)

## 📊 **ขั้นตอนที่ 4: ทดสอบการเปลี่ยนค่า**

1. ในหน้า Table Editor
2. คลิกที่เซลล์ใน column `membership_status` 
3. จะเห็น dropdown ให้เลือก
4. เลือกค่าที่ต้องการ (เช่น `basic`, `premium`)
5. กด Enter หรือ Save

## 🎨 **ผลลัพธ์ที่ได้:**

- ✅ Dropdown ใน Supabase Dashboard พร้อมใช้
- ✅ ป้องกันข้อมูลผิดพลาด (เลือกได้เฉพาะค่าที่กำหนด)
- ✅ มี Comment อธิบายแต่ละค่า
- ✅ Performance ดีขึ้นด้วย Index
- ✅ ระบบ Web App จะแสดงสถานะสมาชิกถูกต้องอัตโนมัติ

## 🔧 **การใช้งานใน Admin Panel:**

หลังจากอัปเดต database แล้ว:
1. Admin เข้าหน้า Dashboard → จัดการสมาชิก
2. คลิก "แก้ไข" สมาชิกที่ต้องการ
3. เลือกสถานะจาก dropdown
4. บันทึก → สมาชิกจะเห็นสถานะใหม่ทันที

## ✨ **Bonus: การแสดงผลใน Web App:**

- 📚 **Basic Course** - Badge สีน้ำเงิน
- ⚡ **Scalping Course** - Badge สีฟ้า
- 🎯 **Advanced Course** - Badge สีม่วง  
- 🧠 **EMA Course** - Badge สีทอง
- ⭐ **Premium** - Badge สีทอง-ส้ม
- 🆓 **Free** - Badge สีเทา