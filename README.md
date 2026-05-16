# YSC Digital Platform — Documentation (Local Working Folder)

โฟลเดอร์ทำงานท้องถิ่นสำหรับเอกสารโครงการ YSC ทั้งหมด

**เปิดเริ่มที่:** `index.html` (ดับเบิลคลิกเปิดใน Browser)

---

## โครงสร้าง

```
ysc-docs/
├── README.md                       ← ไฟล์นี้
│
├── index.html                      ← Landing page (เริ่มที่นี่)
├── ysc_sitemap.html                ← แผนผังเอกสารทั้งหมด
│
├── ── Master Documents ────────────────
├── ysc_master_brd.html             ← Master BRD (Umbrella)
├── ysc_business_rules.html         ← Business Rules v2.2 (22 หมวด)
├── ysc_mom_summary.html            ← สรุป MoM 7 ครั้ง
│
├── ── Backoffice 7 Modules (71 UCs) ──
├── ysc_prd_brd.html                ← Product Management (10 UC)
├── ysc_crm_brd.html                ← Customer Management (11 UC)
├── ysc_oms_brd.html                ← Order Management (14 UC)
├── ysc_wms_brd.html                ← Warehouse Management (12 UC)
├── ysc_promotion_brd.html          ← Promotion Engine (8 UC)
├── ysc_cms_brd.html                ← Content Management (7 UC)
├── ysc_reporting_brd.html          ← Reporting & Analytics (9 UC)
│
├── ── Channels (45 UCs) ───────────────
├── ysc_storefront_brd.html         ← Storefront / Web (32 UC)
├── ysc_pos_brd.html                ← POS (13 UC)
│
├── assets/                         ← Brand assets
│   └── adeptio_logo.png            ← Adeptio logo
│
└── ysc_screens/                    ← Screenshots / Mockups
    ├── overview_*.png              ← System overview (Backoffice/Storefront/POS)
    ├── web_*.png                   ← Storefront mockups
    ├── pos_*.png                   ← POS mockups
    └── {module}_uc{NNN}.png        ← Per Use Case screenshots
```

---

## ภาพรวมสถิติ

| รายการ | จำนวน |
|---|---|
| เอกสาร HTML ทั้งหมด | 14 ไฟล์ |
| Use Cases รวม | **116 UCs** |
| Business Rules | 22 หมวด + 45 Decisions |
| Sales Channels | 3 (Web / CC / POS) |
| Backoffice Modules | 7 |

---

## วิธีใช้ Upload รูป Screenshot

1. เปิด BRD ใดก็ได้ใน Browser (ดับเบิลคลิก HTML)
2. คลิกที่กรอบรูปใดก็ได้ — File Picker จะเปิด
3. เลือกรูป Screenshot จากเครื่อง
4. ระบบจะ:
   - บันทึกใน Browser localStorage (เห็นได้เมื่อเปิดใหม่)
   - ดาวน์โหลดไฟล์ให้อัตโนมัติ ตามชื่อที่ถูกต้อง (เช่น `prd_uc001.png`)
5. ลากไฟล์ที่ดาวน์โหลดมาวางใน `ysc_screens/`
6. รูปจะแสดงในเอกสารเลย ไม่ต้องอัพโหลดใหม่
7. เมื่อพร้อม → Commit เข้า GitHub (บอก Claude เมื่อต้องการ)

---

## การเชื่อมโยงกับ Git Repo

โฟลเดอร์นี้เป็น **Working Copy ท้องถิ่น** เพื่อความสะดวกในการเปิด/แก้ไข

Git Repo จริงอยู่ที่:
```
C:\Users\GPR_S\Downloads\ysc-business-rules\.claude\worktrees\heuristic-sanderson-8375ac\docs\
```

เมื่อพร้อม Commit + Push → Claude จะ:
1. Sync ไฟล์จาก `ysc-docs/` ไป `docs/` ใน Repo
2. `git add` + `git commit` + `git push`
3. GitHub Actions จะ deploy ไปยัง https://cklyuyee.github.io/ysc-business-rules/docs/ อัตโนมัติ

---

*Documentation by Adeptio — บริษัท อะเดพทิโอ จำกัด · พฤษภาคม 2569*
