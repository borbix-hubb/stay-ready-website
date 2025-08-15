# Stay Ready Website - Crypto Trading Education Platform

แพลตฟอร์มการเรียนรู้การเทรด Crypto และ Forex ที่มีคอร์สเรียนครบครัน รวมถึงระบบสมาชิก และเครื่องมือการเรียนรู้ต่างๆ

## วิธีย้ายโปรเจค (Project Migration)

หากต้องการย้ายโปรเจคไปยังตำแหน่งใหม่:

```bash
# 1. เปิด Terminal และไปที่ Project 2025 folder
cd "/Users/borbix/Desktop/Project 2025"

# 2. สร้าง folder ใหม่ชื่อ stay-ready-website
mkdir -p "stay-ready-website"

# 3. ย้ายไฟล์ทั้งหมดจาก crypto-kanit-dark ไปยัง stay-ready-website
cp -r "wealth app2/wealth condo/crypto-kanit-dark/"* "stay-ready-website/"

# 4. ย้าย hidden files (.gitignore, etc.) ด้วย
cp -r "wealth app2/wealth condo/crypto-kanit-dark/".* "stay-ready-website/" 2>/dev/null || true

# 5. เข้าไปใน folder ใหม่
cd "stay-ready-website"

# 6. ตรวจสอบว่าไฟล์ครบหรือไม่
ls -la
```

## วิธีเปิดโปรเจค (How to Run the Project)

### Prerequisites
- Node.js (เวอร์ชัน 18 หรือสูงกว่า)
- npm หรือ yarn
- Git

### การติดตั้งและรัน

```bash
# 1. เข้าไปใน folder โปรเจค
cd "/Users/borbix/Desktop/Project 2025/stay-ready-website"

# 2. ติดตั้ง dependencies
npm install

# 3. เริ่มรัน development server
npm run dev

# 4. เปิดเบราว์เซอร์ไปที่ http://localhost:5173
```

### การใช้งาน Claude Code

```bash
# เปิด Claude Code ใน folder โปรเจค
cd "/Users/borbix/Desktop/Project 2025/stay-ready-website"
claude-code
```

### คำสั่งที่มีประโยชน์

```bash
# รัน development server
npm run dev

# Build สำหรับ production
npm run build

# Preview production build
npm run preview

# ตรวจสอบ linting
npm run lint

# ตรวจสอบ TypeScript
npm run typecheck
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/36b3821f-59a0-47cc-a564-95b9501e8880) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
