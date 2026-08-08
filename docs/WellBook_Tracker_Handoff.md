# WellBook TED Fund Tracker — Project Handoff & Knowledge Base

**เอกสารสำหรับส่งมอบ (Handoff Document)**
รวบรวมข้อมูลทั้งหมด (Context, Knowledge Base และ Implementation Plan) เพื่อนำไปให้ AI หรือ Developer สร้างแอปพลิเคชัน Project Tracker บนเครื่องอื่น (ที่มีสิทธิ์ติดตั้ง Node.js/Vite)

---

## 1. PROJECT CONTEXT & KNOWLEDGE BASE (บริบทโครงการ)

### 1.1 Project Identity
- **โครงการ:** WellBook Platform (ระบบจัดการการจองและลงทะเบียนสำหรับ Wellness Organizers)
- **ทุนสนับสนุน:** TED IDEATION Program ปีงบประมาณ 2569
- **งบประมาณรวม:** 150,000 บาท
- **ระยะเวลา:** ~6 เดือน (22 พ.ค. 2569 — 22 พ.ย. 2569)

### 1.2 The Team (3 คน)
- 🧊 **Ice (CEO + Marketing):** ดูแลทิศทางธุรกิจ, ภาพลักษณ์, คอมมูนิตี้, จัดอีเวนต์, ทดสอบตลาด (เป็น Bottleneck ของทีมที่ต้องช่วยกระจายงาน)
- 🟣 **Sim (COO + Operations):** เป็นเสาหลักด้าน Operations, PM, จัดการโครงสร้าง, ติดตามตัวชี้วัด (KPIs), ดูแลการเบิกจ่าย
- 🟢 **Tao (CTO + Tech / AI):** พัฒนาโปรดักต์, เขียนโค้ด, ทำ Webapp, สร้างระบบ Recommendation AI

### 1.3 Milestones & Fund Disbursement (การเบิกจ่าย)
- **งวดที่ 1 (75,000 บาท):** 15-22 มิ.ย. 69 — เงื่อนไข: ส่งแผนการดำเนินงาน, แผนงบประมาณ, เอกสารสัญญา (สถานะ: กำลังดำเนินการ/เสร็จสิ้นบางส่วน)
- **งวดที่ 2 (75,000 บาท):** 15-22 พ.ย. 69 — เงื่อนไข: ส่งรายงานฉบับสมบูรณ์ (Final Report), KPI Report, Pitch Deck

### 1.4 โครงสร้างงาน (26 Tasks ใน 4 Phases)

**Phase 1: Idea Validation & Market Research (พ.ค. - มิ.ย. 69)**
- วางแผนการตลาด + Go-to-Market (Ice) ✅
- ศึกษาตลาด + ความต้องการกลุ่มเป้าหมาย (Ice) ✅
- ปรึกษาผู้เชี่ยวชาญ NCDs (Sim) ✅
- ปรึกษาผู้เชี่ยวชาญ โภชนาการ (Sim) ✅
- ออกแบบผลิตภัณฑ์ + ศึกษาความเป็นไปได้ (Tao)
- นำข้อมูลเบื้องต้นไปพูดคุยกับกลุ่มเป้าหมาย (Ice)
- ◆ เบิกทุนงวดที่ 1 (75,000 บาท) (Sim)

**Phase 2: Prototyping — ออกแบบ + พัฒนาระบบ (มิ.ย. - ก.ย. 69)**
- UX Design: แบบประเมินโปรไฟล์สุขภาพ (Tao)
- โครงสร้าง Webapp + ระบบ Login/Auth (Tao)
- รวบรวมข้อมูล Wellness Knowledge Base (Sim)
- พัฒนาระบบเก็บ+วิเคราะห์โปรไฟล์สุขภาพ (Tao)
- ระบบ Recovery Password (Tao)
- จัดหมวดหมู่กิจกรรม + Rule-based Mapping (Sim)
- พัฒนา Matching Logic (Tao)
- หน้าแสดงผลคำแนะนำ + อธิบายเหตุผล (Tao)

**Phase 3: Testing & Market Validation (ก.ย. - ต.ค. 69)**
- Dashboard ผู้ใช้ (Tao)
- ทดสอบระบบภายใน + แก้บัก (Tao)
- ทดสอบรอบ 1: กลุ่มนำร่อง 30 ราย (Sim)
- เก็บ Feedback + ปรับปรุงระบบ (Tao)
- ทดสอบรอบ 2: ผู้ใช้ทั่วไป (Sim)
- ทดสอบตลาดกับ End User ≥ 100 ราย (Ice)

**Phase 4: Wrap-up & Business Plan (ต.ค. - พ.ย. 69)**
- สรุปผลการทดสอบ + วิเคราะห์ผล (Sim)
- จัดทำแผนธุรกิจฉบับสมบูรณ์ (Ice)
- จัดทำแผนพัฒนาต่อยอด (Tao)
- จัดทำรายงานสรุปโครงการ TED Fund (Sim)
- เตรียม Pitch Deck นำเสนอปิดโครงการ (Ice)
- ◆ เบิกทุนงวดที่ 2 (75,000 บาท) + ปิดโครงการ (Sim)

---

## 2. IMPLEMENTATION PLAN (แผนการสร้าง Web App)

ให้นำ Prompt / แผนนี้ไปป้อนให้ AI ในเครื่องใหม่ เพื่อให้สร้างโปรเจกต์ได้ทันที

### 2.1 Tech Stack & Requirements
- **Framework:** Vite + React 19 (สร้างด้วย `npx create-vite@latest`)
- **Styling:** Vanilla CSS หรือ Tailwind CSS (Dark Mode UI เน้นสีโทนเข้มแบบ Hacker/Startup)
- **Data Persistence:** ใช้ `localStorage` เพื่อเก็บข้อมูลให้อยู่ข้าม session (มีปุ่ม Export/Import JSON สำหรับแชร์ให้คนอื่นในทีม)
- **Deployment:** Vercel (เชื่อม GitHub Repo)
- **Routing:** React Router v7 สำหรับทำ Sidebar Navigation

### 2.2 App Architecture (7 หน้าหลัก)

1. **Dashboard:**
   - Stat cards (Total tasks, Done, Doing, Todo)
   - Progress bar ของโครงการ (186 วัน)
   - Countdown สู่งวดเบิกเงินถัดไป
   - Workload ของทีม 3 คน (Ice, Sim, Tao)
2. **Gantt Chart:**
   - แสดง Timeline แนวนอน
   - สี Bar ตาม Owner (Ice=Cyan, Sim=Violet, Tao=Green)
   - ซูมดูรายสัปดาห์ / รายเดือนได้
3. **Task Board (Kanban):**
   - 5 คอลัมน์: To Do, Doing, Blocked, Review, Done
   - Drag & Drop การ์ดงานได้ (เปลี่ยน Status และเซฟลง localStorage อัตโนมัติ)
4. **Team View:**
   - แยก Column ตามคน (Ice, Sim, Tao)
   - สรุปงานที่แต่ละคนต้องทำ และภาระงาน (Workload)
5. **Budget Tracking:**
   - เป้า 150,000 บาท
   - กราฟ Donut หรือ Progress bar
   - รายการเบิกจ่ายตามหมวดหมู่ (ค่าจ้าง, ค่า R&D, การตลาด ฯลฯ)
6. **Milestones:**
   - เช็คลิสต์เอกสารส่ง TED Fund งวด 1 และ งวด 2
7. **Documents:**
   - หน้าสำหรับรวมลิงก์ Google Drive / เอกสารประกอบโครงการ

### 2.3 Initial Data Model (JSON สำหรับ Seed Data)

คัดลอก Data นี้ไปใช้เป็น Initial State ใน React ได้เลย (อิงจาก Gantt Chart จริง):

```json
{
  "projectInfo": {
    "name": "WellBook TED IDEATION",
    "budget": 150000,
    "startDate": "2026-05-22",
    "endDate": "2026-11-22"
  },
  "tasks": [
    { "id": "T01", "name": "วางแผนการตลาด + กลยุทธ์ Go-to-Market", "owner": "Ice", "start": "2026-05-22", "end": "2026-06-10", "status": "Done", "phase": 1 },
    { "id": "T02", "name": "ศึกษาตลาด + ความต้องการกลุ่มเป้าหมาย", "owner": "Ice", "start": "2026-05-22", "end": "2026-06-15", "status": "Done", "phase": 1 },
    { "id": "T03", "name": "ปรึกษาผู้เชี่ยวชาญด้านการดูแลผู้ป่วย NCDs", "owner": "Sim", "start": "2026-05-26", "end": "2026-06-12", "status": "Done", "phase": 1 },
    { "id": "T04", "name": "ปรึกษาผู้เชี่ยวชาญด้านโภชนาการ / Wellness", "owner": "Sim", "start": "2026-05-26", "end": "2026-06-12", "status": "Done", "phase": 1 },
    { "id": "T05", "name": "ออกแบบผลิตภัณฑ์ + ศึกษาความเป็นไปได้", "owner": "Tao", "start": "2026-06-01", "end": "2026-06-20", "status": "Doing", "phase": 1 },
    { "id": "T06", "name": "นำข้อมูลเบื้องต้นไปพูดคุยกับกลุ่มเป้าหมาย", "owner": "Ice", "start": "2026-06-10", "end": "2026-06-21", "status": "Doing", "phase": 1 },
    { "id": "M01", "name": "◆ เบิกทุนงวดที่ 1 (75,000 บาท)", "owner": "Sim", "start": "2026-06-15", "end": "2026-06-22", "status": "Doing", "phase": 1, "isMilestone": true },
    { "id": "T07", "name": "UX Design: แบบประเมินโปรไฟล์สุขภาพ", "owner": "Tao", "start": "2026-06-22", "end": "2026-07-05", "status": "Doing", "phase": 2 },
    { "id": "T08", "name": "โครงสร้าง Webapp + ระบบ Login/Auth", "owner": "Tao", "start": "2026-06-22", "end": "2026-07-15", "status": "Doing", "phase": 2 },
    { "id": "T09", "name": "รวบรวมข้อมูล Wellness Knowledge Base", "owner": "Sim", "start": "2026-06-22", "end": "2026-07-25", "status": "Doing", "phase": 2 },
    { "id": "T10", "name": "พัฒนาระบบเก็บ+วิเคราะห์โปรไฟล์สุขภาพ", "owner": "Tao", "start": "2026-07-06", "end": "2026-07-31", "status": "To do", "phase": 2 },
    { "id": "T11", "name": "ระบบ Recovery Password", "owner": "Tao", "start": "2026-07-16", "end": "2026-07-25", "status": "To do", "phase": 2 },
    { "id": "T12", "name": "จัดหมวดหมู่กิจกรรม + Rule-based Mapping", "owner": "Sim", "start": "2026-07-20", "end": "2026-08-10", "status": "To do", "phase": 2 },
    { "id": "T13", "name": "พัฒนา Matching Logic", "owner": "Tao", "start": "2026-08-01", "end": "2026-08-31", "status": "To do", "phase": 2 },
    { "id": "T14", "name": "หน้าแสดงผลคำแนะนำ + อธิบายเหตุผล", "owner": "Tao", "start": "2026-08-25", "end": "2026-09-10", "status": "To do", "phase": 2 },
    { "id": "T15", "name": "Dashboard ผู้ใช้", "owner": "Tao", "start": "2026-09-01", "end": "2026-09-15", "status": "To do", "phase": 3 },
    { "id": "T16", "name": "ทดสอบระบบภายใน + แก้บัก", "owner": "Tao", "start": "2026-09-10", "end": "2026-09-21", "status": "To do", "phase": 3 },
    { "id": "T17", "name": "ทดสอบรอบ 1: กลุ่มนำร่อง 30 ราย", "owner": "Sim", "start": "2026-09-22", "end": "2026-10-05", "status": "To do", "phase": 3 },
    { "id": "T18", "name": "เก็บ Feedback + ปรับปรุงระบบ", "owner": "Tao", "start": "2026-10-06", "end": "2026-10-12", "status": "To do", "phase": 3 },
    { "id": "T19", "name": "ทดสอบรอบ 2: ผู้ใช้ทั่วไป", "owner": "Sim", "start": "2026-10-08", "end": "2026-10-18", "status": "To do", "phase": 3 },
    { "id": "T20", "name": "ทดสอบตลาดกับ End User ≥ 100 ราย", "owner": "Ice", "start": "2026-09-22", "end": "2026-10-21", "status": "To do", "phase": 3 },
    { "id": "T21", "name": "สรุปผลการทดสอบ + วิเคราะห์ผล", "owner": "Sim", "start": "2026-10-22", "end": "2026-10-31", "status": "To do", "phase": 4 },
    { "id": "T22", "name": "จัดทำแผนธุรกิจฉบับสมบูรณ์", "owner": "Ice", "start": "2026-10-22", "end": "2026-11-15", "status": "To do", "phase": 4 },
    { "id": "T23", "name": "จัดทำแผนพัฒนาต่อยอด", "owner": "Tao", "start": "2026-11-01", "end": "2026-11-15", "status": "To do", "phase": 4 },
    { "id": "T24", "name": "จัดทำรายงานสรุปโครงการ TED Fund", "owner": "Sim", "start": "2026-11-01", "end": "2026-11-15", "status": "To do", "phase": 4 },
    { "id": "T25", "name": "เตรียม Pitch Deck นำเสนอปิดโครงการ", "owner": "Ice", "start": "2026-11-10", "end": "2026-11-20", "status": "To do", "phase": 4 },
    { "id": "M02", "name": "◆ เบิกทุนงวดที่ 2 (75,000 บาท) + ปิดโครงการ", "owner": "Sim", "start": "2026-11-15", "end": "2026-11-22", "status": "To do", "phase": 4, "isMilestone": true }
  ]
}
```

---

## 3. ขั้นตอนการนำไปใช้บนเครื่องใหม่

เมื่อคุณย้ายไปเครื่องส่วนตัวที่มีสิทธิ์รัน Node.js แล้ว ให้ทำตามนี้:

1. โยนไฟล์นี้ (`WellBook_Tracker_Handoff.md`) ให้กับ AI Assistant (เช่น Claude หรือ Antigravity) บนเครื่องใหม่
2. พิมพ์คำสั่ง: **"ช่วยสร้าง React App สำหรับ WellBook Tracker ตามรายละเอียดในไฟล์นี้ให้หน่อย ขอให้ใช้ Vite, React Router และเซฟ State ลง localStorage"**
3. เมื่อ AI เขียนโค้ดเสร็จ ให้รัน `npm run dev` เพื่อทดสอบ
4. กด Push Code ขึ้น GitHub 
5. ล็อกอินเข้า Vercel (https://vercel.com) กด Add New Project จาก GitHub
6. แค่นี้แอปก็ออนไลน์ ใช้งานร่วมกับ Ice, Sim และ Tao ได้เลย! (การแชร์ข้อมูลในระยะแรก ให้ใช้ปุ่ม Export/Import JSON หรือถ้าเครื่องใหม่พร้อม AI สามารถช่วยติด Backend เช่น Firebase ได้ง่ายมากๆ)
