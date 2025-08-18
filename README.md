# CryptoLearn Pro - แพลตฟอร์มเรียนรู้คริปโตแบบมืออาชีพ

🚀 **Live Website:** https://borbix-hubb.github.io/stay-ready-website/

แพลตฟอร์มการเรียนรู้การเทรด Crypto และ Forex ที่มีคอร์สเรียนครบครัน รวมถึงระบบสมาชิก และเครื่องมือการเรียนรู้ต่างๆ

## 📋 คุณสมบัติหลัก

- 📚 คอร์สเรียนคริปโตครบวงจร
- 💹 การวิเคราะห์ทางเทคนิค
- 💰 การบริหารจัดการเงิน (Money Management)
- 📊 Dashboard สำหรับติดตามความคืบหน้า
- 🎓 ระบบสมาชิกและการชำระเงิน
- 📱 รองรับการใช้งานบนมือถือ
- 🔒 ระบบ Authentication ด้วย Supabase

## 🚀 การติดตั้งและรันโปรเจค

### ข้อกำหนดเบื้องต้น
- Node.js 18+ 
- npm หรือ yarn
- Git

### ขั้นตอนการติดตั้ง

1. **Clone repository**
```bash
git clone https://github.com/borbix-hubb/stay-ready-website.git
cd stay-ready-website
```

2. **ติดตั้ง dependencies**
```bash
npm install
```

3. **รันในโหมด development**
```bash
npm run dev
```
เว็บจะเปิดที่ http://localhost:3000

## 📦 คำสั่งที่ใช้บ่อย

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy

# Run linter
npm run lint
```

## 🚀 การ Deploy

### Deploy ไปยัง GitHub Pages

1. แก้ไขโค้ดตามต้องการ
2. รันคำสั่ง deploy:
```bash
npm run deploy
```

คำสั่งนี้จะ:
- Build โปรเจคโดยอัตโนมัติ
- Push ไปยัง gh-pages branch
- อัพเดทเว็บไซต์ที่ GitHub Pages

เว็บจะอัพเดทภายใน 1-2 นาที

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend:** React + TypeScript
- **UI Framework:** Tailwind CSS + shadcn/ui
- **Build Tool:** Vite
- **Database:** Supabase
- **Deployment:** GitHub Pages
- **Package Manager:** npm

## 📁 โครงสร้างโปรเจค

```
crypto-kanit-dark/
├── src/
│   ├── components/     # React components
│   ├── pages/          # หน้าต่างๆ
│   ├── contexts/       # React contexts
│   ├── lib/           # Utilities และ helpers
│   └── main.tsx       # Entry point
├── public/            # Static files
├── dist/              # Production build
└── package.json       # Dependencies และ scripts
```

## 📱 หน้าหลักของเว็บ

- **/** - หน้าแรก
- **/courses** - รายการคอร์สทั้งหมด
- **/dashboard** - แดชบอร์ดผู้ใช้
- **/auth** - หน้าเข้าสู่ระบบ/สมัครสมาชิก
- **/payment** - หน้าชำระเงิน
- **/portfolio** - พอร์ตโฟลิโอ
- **/pattern-chart** - กราฟรูปแบบการเทรด

## 📞 ติดต่อ

- GitHub: [@borbix-hubb](https://github.com/borbix-hubb)
- Website: https://borbix-hubb.github.io/stay-ready-website/

---

Built with ❤️ using React, Vite, and Tailwind CSS
