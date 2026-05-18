# YSC Documentation — Design System

> ระบบดีไซน์สำหรับเอกสาร BRD ทั้งชุดของ YSC Digital Platform
> เป็นมาตรฐานกลางสำหรับสี ฟอนต์ ส่วนประกอบ และรูปแบบการใช้งาน
> เพื่อให้เอกสารทุกฉบับ (Master, Backoffice 7 โมดูล, ช่องทางการขาย 3 ช่องทาง) มีรูปลักษณ์เป็นชุดเดียวกัน

**เวอร์ชัน:** 1.0 · **วันที่:** พฤษภาคม 2569
**เจ้าของ:** Adeptio · **ผู้ใช้:** UX/UI Designer, BA, Developer
**ไฟล์อ้างอิง:** `ysc_oms_brd.html`, `ysc_crm_brd.html`, `ysc_saleagent_brd.html` (ใช้เป็น Template)

---

## สารบัญ

1. [หลักการออกแบบ](#1-หลักการออกแบบ)
2. [Design Tokens](#2-design-tokens)
   1. [สี (Colors)](#21-สี-colors)
   2. [ฟอนต์ (Typography)](#22-ฟอนต์-typography)
   3. [ระยะห่าง (Spacing)](#23-ระยะห่าง-spacing)
   4. [มุมโค้งและเงา (Radius & Shadow)](#24-มุมโค้งและเงา-radius--shadow)
3. [Layout](#3-layout)
4. [Components](#4-components)
   1. [Top Navigation Bar](#41-top-navigation-bar)
   2. [Cover Banner](#42-cover-banner)
   3. [หัวข้อ (Headings)](#43-หัวข้อ-headings)
   4. [Callout 4 รูปแบบ](#44-callout-4-รูปแบบ)
   5. [ตาราง (Tables)](#45-ตาราง-tables)
   6. [Badges & Tags](#46-badges--tags)
   7. [Pills อ้างอิง (Reference Pills)](#47-pills-อ้างอิง-reference-pills)
   8. [Use Case Block](#48-use-case-block)
   9. [Flow Diagram](#49-flow-diagram)
   10. [สารบัญ (TOC)](#410-สารบัญ-toc)
   11. [Cards (หน้า Index)](#411-cards-หน้า-index)
   12. [Screen Figure](#412-screen-figure)
5. [Print Styles](#5-print-styles)
6. [แนวทางการใช้งาน](#6-แนวทางการใช้งาน)
7. [Checklist ก่อนส่งมอบ](#7-checklist-ก่อนส่งมอบ)

---

## 1. หลักการออกแบบ

| หลักการ | คำอธิบาย |
|---------|---------|
| **เอกสาร ไม่ใช่เว็บไซต์** | ออกแบบให้เน้นการอ่าน พิมพ์เป็น PDF ได้สวย ไม่เน้น interaction |
| **ภาษาไทยนำหน้า** | หัวข้อหลักภาษาไทย ภาษาอังกฤษอยู่ในวงเล็บเฉพาะตอนแรก |
| **สีเดียวต่อบทบาท** | ไม่ใช้สีรุ้งใน rule-id หรือ badge — แต่ละชนิดมีสีเดียว |
| **Rainbow ใช้เฉพาะ Brand** | gradient รุ้งใช้กับเส้นใต้ h1 และ accent หลักเท่านั้น |
| **Black + Navy + Accent** | สีหลักของเนื้อหา = ดำ/เทาเข้ม; สี accent ใช้เน้นเฉพาะจุด |
| **Code/Tech ไม่อยู่ในเนื้อหา** | ใช้ภาษาทางการ ไม่ใช่ jargon (`Webhook` → "การแจ้งกลับอัตโนมัติ") |

---

## 2. Design Tokens

### 2.1 สี (Colors)

#### 2.1.1 Neutrals (เนื้อหาหลัก)

| Token | Hex | การใช้งาน |
|-------|-----|-----------|
| `--bg` | `#FFFFFF` | พื้นหลังเอกสาร (`#doc`) |
| `--bg-soft` | `#FAFAFA` | พื้นหลังของ body, ตารางแถวคู่ |
| `--ink` | `#0A0A0A` | ตัวอักษรหลัก, Header ของตาราง, Cover banner |
| `--ink-2` | `#2B2B2B` | ตัวอักษรรอง (ข้อความ secondary) |
| `--ink-3` | `#525252` | ลิงก์ในแถบ Navigation, label เล็ก |
| `--ink-4` | `#8A8A8A` | ตัวอักษรอ่อน, separator |
| `--line` | `#EDEDED` | เส้นแบ่ง (border ของ nav) |
| `--line-2` | `#E5E7EB` | เส้นแบ่งตาราง, Use Case border |

#### 2.1.2 Accent (สำหรับ Gradient & Brand)

| Token | Hex | การใช้งาน |
|-------|-----|-----------|
| `--teal` | `#14E4C7` | จุดเริ่มของ gradient หลัก |
| `--blue` | `#3B82F6` | h3 (Subsection title), accent secondary |
| `--purple` | `#8B5CF6` | กลาง gradient, UC-flow circle |
| `--pink` | `#EC4899` | ปลาย gradient |
| `--coral` | `#FB7185` | ปลายสุด gradient (เฉพาะ rainbow) |

#### 2.1.3 Semantic Colors (ตามความหมาย)

| สี | Hex | ใช้กับ |
|----|-----|--------|
| **Info / Note** (blue) | `#3B82F6` (text), `#EFF6FF` (bg) | Callout ทั่วไป, "หมายเหตุ" |
| **Success / Confirmed** (green) | `#10B981` (border), `#ECFDF5` (bg), `#065F46` (text), `#A7F3D0` (light border) | Acceptance Criteria, Tag "ยืนยัน" |
| **Warning / Pending** (amber) | `#F59E0B` (border), `#FFFBEB` (bg), `#92400E` (text), `#FDE68A` (border) | Alternative Flow, Tag "รอยืนยัน", BR-ref |
| **Danger / Exception** (red) | `#E11D48` (border), `#FEF2F2` (bg) | Exception Flow, Error |
| **Design Pending** (purple) | `#8B5CF6` (border), `#F5F3FF` (bg), `#5B21B6` (text) | Tag "รอออกแบบ", Callout เฉพาะ |

#### 2.1.4 Gradients

```css
/* gradient หลัก (ใช้บน h1 border และเส้น brand) */
--gradient: linear-gradient(90deg, #14E4C7 0%, #3B82F6 30%, #8B5CF6 55%, #EC4899 80%, #FB7185 100%);

/* gradient สั้น 2 สี — ใช้บน accent เล็ก */
.cover .tag       → linear-gradient(90deg, #14E4C7, #3B82F6)   /* Cover tag */
.uc-flow circle   → linear-gradient(90deg, #3B82F6, #8B5CF6)   /* ตัวเลข Flow */
.card-icon (S)    → linear-gradient(135deg, #8B5CF6, #EC4899)  /* ไอคอน Sale Agent card */
```

#### 2.1.5 กฎการใช้สี

- ❌ **ห้าม** ใช้สี rainbow บน rule-id (`.br-ref`) หรือ badge — ต้องเป็นสีเดียวเสมอ
- ❌ **ห้าม** ใช้สีหลายโทนใน Use Case header — เป็นดำ `#0A0A0A` เท่านั้น
- ✅ **rainbow gradient** อนุญาตเฉพาะ: เส้นใต้ h1, brand banner, gradient ตัวเลข
- ✅ **สีบทบาท** ต้องคงที่: ยืนยัน = เขียว, รอยืนยัน = เหลือง, รอออกแบบ = ม่วง

---

### 2.2 ฟอนต์ (Typography)

#### 2.2.1 Font Family

```css
font-family: 'Plus Jakarta Sans', 'Sarabun', Tahoma, sans-serif;
```

**โหลดจาก Google Fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Sarabun:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

> **Plus Jakarta Sans** = ภาษาอังกฤษ / ตัวเลข / UI label
> **Sarabun** = ภาษาไทย (มี fallback ผ่าน font stack)

#### 2.2.2 ขนาด & น้ำหนัก

| Element | Size | Weight | Color | Line-height |
|---------|------|--------|-------|-------------|
| `h1` (Section) | 24px | 700 | `#0A0A0A` | 1.3 |
| `h2` (Subsection) | 18px | 700 | `#0A0A0A` | 1.4 |
| `h3` (Sub-sub) | 15px | 700 | `#3B82F6` | 1.4 |
| `p` (Body) | 13.5px | 400 | `#0A0A0A` | 1.65 |
| `li` (List item) | 13.5px | 400 | `#0A0A0A` | 1.7 |
| `td` (Table cell) | 12.5px | 400 | `#0A0A0A` | 1.6 |
| `th` (Table head) | 12.5px | 600 | `#FFFFFF` | 1.6 |
| `.cover h1` | 32px | 700 | `#FFFFFF` | 1.25 |
| `.cover .sub` | 16px | 300 | rgba(255,255,255,.65) | 1.5 |
| `.uc-title` | 14px | 600 | `#FFFFFF` | 1.5 |
| `.tag-*` (Badge) | 10.5px | 700 | varies | — |
| `.br-ref` (Rule pill) | 11px | 600 | `#92400E` | — |
| `.screen-ref` (Screen pill) | 11.5px | 600 | `#374151` | — |

#### 2.2.3 หลักการใช้ขนาด

- **เนื้อหาหลัก = 13.5px** (อ่านได้ง่าย, พิมพ์ลง A4 ได้สวย)
- **ตัวเลข & code ในตาราง** ใช้ 12.5px
- **Heading ลำดับชั้น** ขึ้นทีละ 3px (15 → 18 → 24)
- **Cover h1** = 32px เป็นข้อยกเว้นเดียวที่ใหญ่กว่า h1 ปกติ

---

### 2.3 ระยะห่าง (Spacing)

| Token | Value | ใช้กับ |
|-------|-------|--------|
| `xs` | 4px | gap ในป้าย, padding ของ tag |
| `sm` | 8px | padding ตาราง, ขอบใน |
| `md` | 12–14px | padding ของ callout, body ของ Use Case |
| `lg` | 18–22px | padding ของ Use Case body |
| `xl` | 28px | padding ของ TOC |
| `2xl` | 36px | margin ระหว่าง Cover และเนื้อหา |
| `3xl` | 42px | margin บนของ h1 |
| `4xl` | 64px | padding ภายในของ `#doc` |

**กฎ:**
- Section ใหม่ (h1) → margin-top: 42px
- Subsection (h2) → margin-top: 30px
- Subsection ลึก (h3) → margin-top: 22px
- ระหว่าง paragraph → margin-bottom: 12px

---

### 2.4 มุมโค้งและเงา (Radius & Shadow)

| Element | Border Radius | Shadow |
|---------|--------------|--------|
| `#doc` (กล่องเอกสาร) | 6px | `0 6px 28px rgba(0,0,0,.12)` |
| `.use-case` (กล่อง UC) | 10px | ไม่มี (เน้น border 1px) |
| `.callout` (กล่องข้อความ) | 0 6px 6px 0 (เฉพาะมุมขวา) | ไม่มี |
| `.toc` (สารบัญ) | 8px | ไม่มี |
| `.uc-ac` (Acceptance Criteria) | 6px | ไม่มี |
| `.screen-ref` / `.br-ref` (Pill) | 4px | ไม่มี |
| `.tag-*` (Badge) | 10px (capsule) | ไม่มี |
| `.card` (Index card) | 12–16px | hover: `0 6px 18px rgba(59,130,246,0.25)` |

---

## 3. Layout

### 3.1 Document Container

```css
#doc {
  max-width: 920px;
  margin: 36px auto;
  background: #fff;
  padding: 64px 72px;
  box-shadow: 0 6px 28px rgba(0,0,0,.12);
  border-radius: 6px;
}
```

**กฎ:**
- ความกว้างสูงสุด = **920px** เท่ากันทุก BRD
- Padding ภายใน = **64px บน/ล่าง · 72px ซ้าย/ขวา**
- ต้องอยู่กึ่งกลางหน้าจอด้วย `margin: 36px auto`
- **ห้าม** ขยายเกิน 920px แม้บนหน้าจอใหญ่ — เป็นเอกสาร ไม่ใช่ web app

### 3.2 Body Background

```css
body {
  background: #FAFAFA;
  font-family: 'Plus Jakarta Sans', 'Sarabun', Tahoma, sans-serif;
  color: #0A0A0A;
  padding: 0 0 80px;
  line-height: 1.65;
}
```

---

## 4. Components

### 4.1 Top Navigation Bar

แถบสารบัญแบบ sticky อยู่บนสุด มีโลโก้ Adeptio + ชื่อเอกสาร + ปุ่มพิมพ์

```html
<nav style="position:sticky;top:0;z-index:200;background:rgba(255,255,255,.9);backdrop-filter:blur(20px);border-bottom:1px solid #EDEDED;display:flex;align-items:center;justify-content:space-between;padding:10px 28px;">
  <div style="display:flex;align-items:center;gap:16px;">
    <a href="index.html"><img src="assets/adeptio_logo.png" alt="Adeptio" style="height:26px;display:block"></a>
    <span style="width:1px;height:20px;background:#EDEDED"></span>
    <a href="index.html" style="font-size:13px;font-weight:600;color:#525252;text-decoration:none;">สารบัญ</a>
    <span style="font-size:13px;color:#8A8A8A;">|</span>
    <span style="font-size:13px;font-weight:600;color:#2B2B2B;">[ชื่อเอกสาร]</span>
  </div>
  <button onclick="window.print()" style="padding:8px 18px;border-radius:999px;font-size:13px;font-weight:700;border:1.5px solid #EDEDED;background:#fff;color:#0A0A0A;">พิมพ์ / PDF</button>
</nav>
```

**ห้าม:**
- ใช้ emoji ใดๆ ใน nav
- เพิ่มเมนูอื่นนอกจาก "สารบัญ" + ปุ่มพิมพ์
- ใช้สีอื่นบน background

---

### 4.2 Cover Banner

แถบดำขนาดใหญ่ด้านบนของเอกสาร แสดงชื่อโมดูล + Project info grid

```html
<div class="cover">
  <div class="tag">เอกสารโมดูล · BACKOFFICE · OMS</div>
  <h1>ระบบจัดการคำสั่งซื้อ<br>(Order Management)</h1>
  <div class="sub">เอกสารข้อกำหนดเชิงธุรกิจ โมดูลย่อยที่ 3 ของระบบหลังบ้าน</div>
  <div class="info-grid">
    <div class="info-cell"><div class="info-label">รหัสโมดูล</div><div class="info-value">OMS (Order)</div></div>
    <div class="info-cell"><div class="info-label">วันที่จัดทำ</div><div class="info-value">พฤษภาคม 2569</div></div>
    <!-- ... 4 cells อื่น ... -->
  </div>
</div>
```

**CSS หลัก:**

```css
.cover {
  background: #0A0A0A;
  color: #fff;
  margin: -64px -72px 36px;
  padding: 64px 72px 48px;
  border-radius: 6px 6px 0 0;
}
.cover .tag {
  display: inline-block;
  background: linear-gradient(90deg, #14E4C7, #3B82F6);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  padding: 5px 14px;
  border-radius: 4px;
  margin-bottom: 24px;
}
.cover h1 {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.25;
  color: #fff;
  border: none;
  padding: 0;
}
.cover .info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 8px;
}
```

**กฎ:**
- Cover banner ต้องมี: tag, h1, sub, info-grid (6 cells: รหัสโมดูล, วันที่, เจ้าของโครงการ, ผู้พัฒนา, ระบบที่เชื่อมต่อ, อ้างอิงเอกสารแม่บท)
- พื้นหลังเป็น **`#0A0A0A`** เท่านั้น (ไม่ใช่สีอื่น)
- tag ใช้ **teal-blue gradient** เสมอ

---

### 4.3 หัวข้อ (Headings)

#### 4.3.1 h1 — Section Title (ใหญ่สุด)

```css
h1 {
  font-size: 24px;
  color: #0A0A0A;
  margin: 42px 0 14px;
  font-weight: 700;
  padding-bottom: 8px;
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(90deg, #14E4C7, #3B82F6, #8B5CF6, #EC4899) 1;
}
```

มี **rainbow gradient underline** อัตโนมัติ — เป็นเอกลักษณ์ของ YSC BRD

#### 4.3.2 h2 — Subsection (ในแต่ละ Section)

```css
h2 {
  font-size: 18px;
  color: #0A0A0A;
  margin: 30px 0 12px;
  font-weight: 700;
}
```

ไม่มีเส้นใต้ ใช้ขนาดและความหนาแยก hierarchy

#### 4.3.3 h3 — Sub-subsection (ในกล่อง)

```css
h3 {
  font-size: 15px;
  color: #3B82F6;  /* สีน้ำเงิน */
  margin: 22px 0 10px;
  font-weight: 700;
}
```

**ใช้สีน้ำเงิน `#3B82F6`** เพื่อแยกจาก h1/h2 ที่เป็นสีดำ

---

### 4.4 Callout 4 รูปแบบ

กล่องข้อความที่ดึงดูดความสนใจ — มี **4 variant** ตามความหมาย

#### 4.4.1 Info (Blue) — Default

```html
<div class="callout">
  <strong>หัวเรื่อง:</strong>
  <p>เนื้อหา...</p>
</div>
```

```css
.callout {
  border-left: 4px solid #3B82F6;
  background: #EFF6FF;
  padding: 14px 18px;
  margin: 14px 0;
  border-radius: 0 6px 6px 0;
}
.callout strong { color: #0A0A0A; }
```

**ใช้เมื่อ:** หมายเหตุทั่วไป, คำอธิบาย, "วัตถุประสงค์ของเอกสาร"

#### 4.4.2 Success (Green)

```html
<div class="callout callout-green">
  <strong>อยู่ในขอบเขต:</strong>
  <p>...</p>
</div>
```

```css
.callout-green {
  border-left-color: #10B981;
  background: #ECFDF5;
}
.callout-green strong { color: #065F46; }
```

**ใช้เมื่อ:** In Scope, Confirmed Decision, Best Practice, "เอกสารที่เกี่ยวข้อง"

#### 4.4.3 Warning (Amber)

```html
<div class="callout callout-amber">
  <strong>นอกขอบเขต:</strong>
  <p>...</p>
</div>
```

```css
.callout-amber {
  border-left-color: #F59E0B;
  background: #FFFBEB;
}
.callout-amber strong { color: #92400E; }
```

**ใช้เมื่อ:** Out of Scope, ประเด็นเปิด/รอยืนยัน, ข้อควรระวัง

#### 4.4.4 Pending Design (Purple)

```html
<div class="callout callout-purple">
  <strong>หมายเหตุ:</strong>
  <p>...</p>
</div>
```

```css
.callout-purple {
  border-left-color: #8B5CF6;
  background: #F5F3FF;
}
.callout-purple strong { color: #4C1D95; }
```

**ใช้เมื่อ:** Feature วางแผนไว้ (planned), Use Case รอออกแบบ

---

### 4.5 ตาราง (Tables)

```css
table {
  width: 100%;
  border-collapse: collapse;
  margin: 14px 0 22px;
  font-size: 12.5px;
}
thead th {
  background: #0A0A0A;
  color: #fff;
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  border: 1px solid #0A0A0A;
}
tbody td {
  padding: 9px 12px;
  border: 1px solid #D1D5DB;
  vertical-align: top;
  line-height: 1.6;
}
tbody tr:nth-child(even) td {
  background: #F9FAFB;
}
td strong { color: #0A0A0A; }
```

**กฎ:**
- Header เป็น **`#0A0A0A` (ดำ) + ตัวอักษรขาว** เสมอ — ไม่ใช่สีอื่น
- แถวคู่ใช้ `#F9FAFB` (เทาอ่อนมาก) เพื่อให้อ่านง่าย
- vertical-align: top เสมอ — ไม่ใช่ middle
- font-size: 12.5px (เล็กกว่า body 1px)

---

### 4.6 Badges & Tags

#### 4.6.1 Status Tags (สถานะของ Use Case)

| Tag | สี | ใช้กับ |
|-----|-----|--------|
| `.tag-confirmed` | เขียว (`#DCFCE7` bg, `#166534` text) | ยืนยันแล้ว |
| `.tag-pending` | เหลือง (`#FEF3C7` bg, `#92400E` text) | รอยืนยัน |
| `.tag-design` | ม่วง (`#F5F3FF` bg, `#5B21B6` text) | รอออกแบบ |

```html
<span class="tag-confirmed">ยืนยัน</span>
<span class="tag-pending">รอยืนยัน</span>
<span class="tag-design">รอออกแบบ</span>
```

```css
.tag-confirmed, .tag-pending, .tag-design {
  display: inline-block;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;  /* capsule */
}
.tag-confirmed { background: #DCFCE7; color: #166534; }
.tag-pending   { background: #FEF3C7; color: #92400E; }
.tag-design    { background: #F5F3FF; color: #5B21B6; }
```

#### 4.6.2 UC Code Badge

ตัวอย่าง: `UC-SA-001`, `UC-OMS-005`

```html
<span class="badge-sa">UC-SA-001</span>
```

```css
.badge-sa {
  display: inline-block;
  background: #1E293B;  /* slate-800 */
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Sarabun', monospace;
}
```

**กฎ:** สีเดียวเสมอ (slate-800 navy) — ไม่ใช่สีตามโมดูล

#### 4.6.3 Planned Badge

```html
<span class="planned-badge">feature วางแผนไว้</span>
```

```css
.planned-badge {
  background: linear-gradient(90deg, #8B5CF6, #EC4899);
  color: #fff;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 9px;
  border-radius: 10px;
}
```

**ใช้กับ:** ฟีเจอร์ที่ยังไม่ได้พัฒนาแต่ออกแบบไว้แล้ว

---

### 4.7 Pills อ้างอิง (Reference Pills)

#### 4.7.1 Business Rule Reference (`.br-ref`)

```html
<span class="br-ref">SO-01</span>
```

```css
.br-ref {
  display: inline-block;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  color: #92400E;
  font-size: 11px;
  font-weight: 600;
  padding: 1px 7px;
  border-radius: 4px;
}
```

**กฎ:** สีเหลือง/น้ำตาลเสมอ — เป็น **single color** (ไม่ใช่ rainbow ตาม domain) เพื่อให้อ่านง่าย

#### 4.7.2 Screen Reference (`.screen-ref`)

```html
<span class="screen-ref">หน้าจอสร้างคำสั่งซื้อ</span>
```

```css
.screen-ref {
  display: inline-block;
  background: #FAFAFA;
  border: 1px solid #D1D5DB;
  color: #374151;
  font-size: 11.5px;
  font-weight: 600;
  padding: 1px 8px;
  border-radius: 4px;
}
```

**กฎ:** ใช้ชื่อหน้าจอภาษาไทยทางการ — ตรงกับไฟล์ `.tsx` ใน `src/app/pages/`

| Page file | Formal Thai screen name |
|-----------|------------------------|
| `CreateOrder.tsx` | หน้าจอสร้างคำสั่งซื้อ |
| `Orders.tsx` | หน้าจอรายการคำสั่งซื้อ |
| `OrderDetailRevised.tsx` | หน้าจอรายละเอียดคำสั่งซื้อ |
| `Customers.tsx` | หน้าจอรายการลูกค้า |
| `CustomerDetail.tsx` | หน้าจอข้อมูลลูกค้า |
| `CreateQuote.tsx` | หน้าจอสร้างใบเสนอราคา |
| `QuoteList.tsx` | หน้าจอรายการใบเสนอราคา |
| `QuoteDetail.tsx` | หน้าจอรายละเอียดใบเสนอราคา |
| `CreditManagement.tsx` | หน้าจอจัดการวงเงินเครดิต |
| `ApprovalsPage.tsx` | หน้าจออนุมัติ |
| `CustomerConnectMultiAgent.tsx` | หน้าจอ Customer Connect (มัลติเอเจนต์) |

---

### 4.8 Use Case Block

ส่วนประกอบสำคัญที่สุดของ BRD — แต่ละ Use Case ใช้ pattern ตายตัว

```html
<div class="use-case">
  <div class="uc-header">
    <span class="uc-num">UC-SA-003</span>
    <span class="uc-title">สร้างคำสั่งซื้อปกติแทนลูกค้า</span>
    <span class="tag-confirmed">ยืนยัน</span>
  </div>
  <div class="uc-body">

    <div class="uc-section">
      <div class="uc-section-label">จุดประสงค์</div>
      <p>...</p>
    </div>

    <div class="uc-section">
      <div class="uc-section-label">เงื่อนไขก่อนเริ่มต้น</div>
      <ul>...</ul>
    </div>

    <div class="uc-section">
      <div class="uc-section-label">ขั้นตอนหลัก</div>
      <ol class="uc-flow">
        <li>ขั้นตอนที่ 1</li>
        <li>ขั้นตอนที่ 2</li>
      </ol>
    </div>

    <div class="uc-section">
      <div class="uc-section-label">ขั้นตอนทางเลือก</div>
      <div class="uc-alt"><strong>A1 — กรณี X:</strong> ...</div>
    </div>

    <div class="uc-section">
      <div class="uc-section-label">ขั้นตอนกรณีผิดพลาด</div>
      <div class="uc-exc"><strong>E1 — Error X:</strong> ...</div>
    </div>

    <div class="uc-section">
      <div class="uc-section-label">เกณฑ์การยอมรับผลงาน</div>
      <div class="uc-ac"><strong>AC-SA-003-01:</strong> ...</div>
    </div>

    <div class="uc-section">
      <div class="uc-section-label">หน้าจอที่เกี่ยวข้อง</div>
      <p><span class="screen-ref">...</span></p>
    </div>

  </div>
</div>
```

**CSS หลัก:**

```css
.use-case {
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  margin: 18px 0;
  background: #fff;
  overflow: hidden;
}
.uc-header {
  background: #0A0A0A;
  color: #fff;
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.uc-header .uc-num   { font-size: 13px; font-weight: 700; letter-spacing: .04em; }
.uc-header .uc-title { font-size: 14px; font-weight: 600; flex: 1; }
.uc-body { padding: 16px 22px; }
.uc-section { margin: 12px 0; }
.uc-section-label {
  font-size: 11.5px;
  font-weight: 700;
  color: #0A0A0A;
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 6px;
}

/* Main Flow — ตัวเลขในวงกลม gradient */
.uc-flow {
  counter-reset: flow;
  list-style: none;
  margin-left: 0;
}
.uc-flow > li {
  counter-increment: flow;
  position: relative;
  padding: 5px 0 5px 32px;
  font-size: 13px;
}
.uc-flow > li::before {
  content: counter(flow);
  position: absolute;
  left: 0; top: 5px;
  width: 22px; height: 22px;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

/* Alternative Flow — amber */
.uc-alt {
  background: #FFFBEB;
  border-left: 3px solid #F59E0B;
  padding: 8px 14px;
  margin: 6px 0;
  border-radius: 0 6px 6px 0;
  font-size: 12.5px;
}

/* Exception Flow — red */
.uc-exc {
  background: #FEF2F2;
  border-left: 3px solid #E11D48;
  padding: 8px 14px;
  margin: 6px 0;
  border-radius: 0 6px 6px 0;
  font-size: 12.5px;
}

/* Acceptance Criteria — green */
.uc-ac {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  border-radius: 6px;
  padding: 10px 14px;
  margin: 4px 0;
  font-size: 12.5px;
}
.uc-ac strong { color: #065F46; }
```

**กฎสำคัญ:**
- UC Header เป็น **`#0A0A0A` ดำ + ตัวอักษรขาว** เสมอ
- `uc-flow` ใช้ **blue-purple gradient** ในวงกลม
- `uc-alt` (Alt) = **amber**, `uc-exc` (Exception) = **red**, `uc-ac` (AC) = **green** — ห้ามสลับ
- ทุก UC ต้องมีอย่างน้อย: จุดประสงค์, ขั้นตอนหลัก, เกณฑ์การยอมรับผลงาน

---

### 4.9 Flow Diagram

แผนภาพ flow แบบง่ายๆ ใช้ box + arrow

```html
<div class="flow-diagram">
  <div class="flow-row">
    <div class="flow-step">รับสาย</div>
    <div class="flow-arrow">→</div>
    <div class="flow-step">ค้นหาลูกค้า</div>
    <div class="flow-arrow">→</div>
    <div class="flow-step success">สร้าง SO</div>
  </div>
</div>
```

```css
.flow-diagram {
  background: #F8FAFC;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px 24px;
  margin: 14px 0;
  font-size: 13px;
  overflow-x: auto;
}
.flow-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 6px 0;
}
.flow-step {
  background: #1E3A5F;  /* navy default */
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}
.flow-step.alt     { background: #8B5CF6; }  /* purple — ทางเลือก */
.flow-step.warn    { background: #F59E0B; color: #1c1c1c; }  /* amber — ปัญหา */
.flow-step.success { background: #10B981; }  /* green — สำเร็จ */
.flow-arrow {
  color: #8A8A8A;
  font-weight: 700;
  font-size: 16px;
}
```

---

### 4.10 สารบัญ (TOC)

```html
<div class="toc">
  <ol>
    <li>หัวข้อที่ 1
      <ol>
        <li>หัวข้อย่อย</li>
      </ol>
    </li>
    <li>หัวข้อที่ 2</li>
  </ol>
</div>
```

```css
.toc {
  background: #F8FAFC;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 20px 28px;
  margin: 20px 0;
}
.toc ol {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: toc;
  font-size: 13px;
}
.toc ol > li {
  counter-increment: toc;
  padding: 4px 0;
  border-bottom: 1px dashed #E5E7EB;
}
.toc ol > li::before {
  content: counter(toc) ". ";
  font-weight: 700;
  color: #0A0A0A;
  margin-right: 6px;
}
.toc ol ol {
  margin: 4px 0 4px 24px;
  font-size: 12px;
  color: #6B7280;
  counter-reset: sub;
}
.toc ol ol li {
  counter-increment: sub;
  padding: 1px 0;
  border: none;
}
.toc ol ol li::before {
  content: counter(toc) "." counter(sub) " ";
  color: #6B7280;
  font-weight: 600;
  margin-right: 4px;
}
```

**กฎ:**
- รองรับ 2 ระดับ (main + sub) เท่านั้น
- ตัวเลขใส่อัตโนมัติด้วย `counter()` — ไม่ต้องพิมพ์เลข
- ใช้ `font-size: 13px` (เท่ากับ body)

---

### 4.11 Cards (หน้า Index)

ใช้บนหน้า `index.html` เพื่อแสดงเอกสารแต่ละโมดูล

```html
<a href="ysc_oms_brd.html" class="card featured">
  <span class="card-badge" style="background:#0A0A0A;color:#fff">14 UC</span>
  <div class="card-row">
    <div class="card-icon" style="background:#1E3A5F">O</div>
    <div class="card-titles">
      <div class="card-title th">OMS</div>
      <div class="card-sub">ระบบจัดการคำสั่งซื้อ</div>
    </div>
  </div>
  <div class="card-desc th">รายละเอียดของโมดูล...</div>
  <div class="card-meta">
    <span class="who th">CC · CS · Admin</span>
    <span class="link">เปิดอ่าน →</span>
  </div>
</a>
```

**ไอคอนของ Card แต่ละโมดูล:**

| โมดูล | ไอคอน | สีพื้นไอคอน |
|-------|-------|-------------|
| Storefront | W | linear-gradient(135deg, #14E4C7, #3B82F6) |
| POS | P | linear-gradient(135deg, #3B82F6, #8B5CF6) |
| Sale Agent | S | linear-gradient(135deg, #8B5CF6, #EC4899) |
| OMS | O | navy `#1E3A5F` |
| CRM | C | navy `#1E3A5F` |
| WMS | W | navy `#1E3A5F` |
| Promotion | P | navy `#1E3A5F` |
| CMS | C | navy `#1E3A5F` |
| Reporting | R | navy `#1E3A5F` |
| Product | P | navy `#1E3A5F` |
| Master / Business Rules | B | navy `#1E3A5F` |

**กฎ:**
- **ช่องทางการขาย 3 ช่อง** (Storefront/POS/Sale Agent) ใช้ gradient
- **Backoffice 7 โมดูล** ใช้สี navy เท่ากันหมด
- Badge มุมขวาบนใส่จำนวน UC เช่น `"14 UC"`, `"32 UC"`

---

### 4.12 Screen Figure

กล่องแสดงรูปภาพ Mockup ของหน้าจอ — รองรับ upload และไม่มีรูป

```html
<div class="screen-figure">
  <img src="ysc_screens/oms_uc003.png" alt="หน้าจอสร้างคำสั่งซื้อ">
  <div class="screen-caption">
    <span>หน้าจอสร้างคำสั่งซื้อ</span>
    <span class="ref">UC-OMS-003 · CreateOrder.tsx</span>
  </div>
</div>
```

**Variant: no-image** (ยังไม่มี Mockup)

```html
<div class="screen-figure no-image">
  <div class="upload-overlay">
    <div class="upload-icon">+</div>
    <div class="upload-text">ยังไม่มี Mockup</div>
    <div class="upload-filename">oms_uc003.png</div>
  </div>
</div>
```

```css
.screen-figure {
  position: relative;
  cursor: pointer;
  transition: transform .15s, box-shadow .15s;
  margin: 14px 0 18px;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  overflow: hidden;
  background: #FAFAFA;
}
.screen-figure:hover {
  box-shadow: 0 6px 18px rgba(59,130,246,0.25);
}
.screen-figure img {
  display: block;
  width: 100%;
  height: auto;
}
.screen-caption {
  padding: 10px 16px;
  background: #0A0A0A;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
.screen-caption .ref {
  font-size: 10.5px;
  color: rgba(255,255,255,0.65);
  font-weight: 500;
}
.screen-figure.no-image {
  background: #F8FAFC;
  border: 2px dashed #3B82F6;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## 5. Print Styles

ทุก BRD ต้อง print ออกเป็น PDF ได้สวย — ใช้ `@media print` กำหนดเฉพาะ

```css
@media print {
  body { background: #fff; }
  #doc {
    max-width: none;
    margin: 0;
    box-shadow: none;
    padding: 24px 40px;
  }
  .cover {
    margin: -24px -40px 24px;
    padding: 50px 40px 40px;
  }
  h1 { page-break-before: always; }
  h1:first-of-type { page-break-before: auto; }
  table, .use-case { page-break-inside: avoid; }
}
```

**กฎ:**
- แต่ละ Section (h1) ขึ้นหน้าใหม่ — **ยกเว้น h1 แรก** (Cover + Section 1 อยู่หน้าเดียวกัน)
- ตารางและ Use Case **ห้ามแบ่งกลางหน้า**
- ลด padding ของ `#doc` เหลือ 24px x 40px เพื่อให้ใช้พื้นที่ A4 มากขึ้น

---

## 6. แนวทางการใช้งาน

### 6.1 ภาษาไทยนำหน้า

```
❌ "Checkout และการชำระเงิน"
✅ "ขั้นตอนการชำระเงิน (Checkout)"

❌ "Self-Pickup"
✅ "การรับสินค้าด้วยตนเอง (Self-Pickup)"
```

### 6.2 หลีกเลี่ยง Jargon

| ❌ Tech / English | ✅ Formal Thai |
|------------------|----------------|
| `status = pending` | "สถานะ 'รอชำระเงิน'" |
| `MongoDB`, `database` | "ฐานข้อมูล" |
| `webhook`, `callback` | "การแจ้งกลับอัตโนมัติ" |
| `API`, `REST endpoint` | "จุดเชื่อมต่อระบบ" |
| `OAuth`, `JWT` | "การยืนยันตัวตน" |
| `Customer`, `Order` | "ลูกค้า", "คำสั่งซื้อ" |

### 6.3 อ้างอิงหน้าจอ ไม่ใช่ code path

```
❌ "ระบบเรียก POST /api/orders แล้วเก็บใน MongoDB collection orders"
✅ "ระบบสร้างคำสั่งซื้อ — แสดงผลใน <span class='screen-ref'>หน้าจอรายละเอียดคำสั่งซื้อ</span>"
```

### 6.4 Status Tag ใช้ตามจริง

- `ยืนยัน` — ใช้เมื่อกฎ/ขั้นตอนถูก Confirm จากลูกค้าแล้ว มีอ้างอิง BR/Decision
- `รอยืนยัน` — ใช้เมื่อยังไม่ได้ confirm — ต้องมี Open Question (Q-XXX) อ้างอิงเสมอ
- `รอออกแบบ` — ใช้เมื่อ Confirm หลักการแล้ว แต่ยังไม่มี Mockup/UI

### 6.5 BR Reference ใช้ทุกครั้งที่อ้างกฎ

```html
✅ ระบบ Reserve สต็อกทันที <span class="br-ref">S-02</span>
❌ ระบบ Reserve สต็อกทันที (ตาม Business Rule)
```

---

## 7. Checklist ก่อนส่งมอบ

ก่อนส่งเอกสารทุกครั้ง ตรวจ **15 ข้อ**:

### โครงสร้าง

- [ ] มี Cover banner + 6 cells info-grid ครบ
- [ ] มีสารบัญ (TOC) — รองรับ 2 ระดับ
- [ ] **Use Case Catalog** อยู่ระหว่าง TOC และ Section 1 (ตารางสรุปทุก UC)
- [ ] **18 Sections** ครบตามมาตรฐาน (Document Control → Open Issues)
- [ ] Section 7 (Use Cases) มี **ทุก UC ที่อยู่ใน Catalog**

### Design

- [ ] Font family ใช้ `'Plus Jakarta Sans', 'Sarabun', Tahoma, sans-serif`
- [ ] `#doc` max-width = **920px**
- [ ] h1 มี **rainbow gradient underline** (ไม่ใช่สีอื่น)
- [ ] Cover background = **`#0A0A0A`** เท่านั้น
- [ ] Cover tag = **teal-blue gradient**
- [ ] Use Case Header = **ดำ `#0A0A0A` + ตัวอักษรขาว**
- [ ] uc-flow circles = **blue-purple gradient**

### เนื้อหา

- [ ] ภาษาไทยนำหน้า — ภาษาอังกฤษอยู่ในวงเล็บ
- [ ] ไม่มี code/jargon ในเนื้อหา (เช่น MongoDB, webhook, API)
- [ ] `screen-ref` ใช้ชื่อ tsx จริงจาก `src/app/pages/`
- [ ] `br-ref` ทุกตัวมีในเอกสาร `business-rules.md`

### Status Tags

- [ ] ทุก UC มี Tag สถานะที่หัวกล่อง (ยืนยัน/รอยืนยัน/รอออกแบบ)
- [ ] รอยืนยัน → มี Open Question (Q-XXX) อ้างอิง
- [ ] รอออกแบบ → มี callout อธิบายว่าออกแบบอะไรไม่ครบ

### Print

- [ ] เปิดบน Browser แล้วลอง Ctrl+P → ดูว่าหน้าตัดถูก, ไม่มีอะไรหายไป
- [ ] แต่ละ Section (h1) ขึ้นหน้าใหม่ — ยกเว้นหน้าแรก

---

## ภาคผนวก: Quick Reference

### Color Cheat Sheet

```
NEUTRAL
#0A0A0A  ink         ─ header, h1/h2, UC header bg
#2B2B2B  ink-2       ─ text secondary
#525252  ink-3       ─ nav link
#8A8A8A  ink-4       ─ arrow, separator
#EDEDED  line        ─ nav border
#E5E7EB  line-2      ─ table border, UC border
#D1D5DB  border      ─ td border, pill border
#FAFAFA  bg-soft     ─ body background
#F8FAFC  bg-light    ─ TOC, flow-diagram bg
#F9FAFB  zebra       ─ table even row
#FFFFFF  bg          ─ doc background

ACCENT
#14E4C7  teal        ─ gradient start
#3B82F6  blue        ─ h3, callout border, gradient
#8B5CF6  purple      ─ Pending design, gradient
#EC4899  pink        ─ gradient
#FB7185  coral       ─ gradient end (rainbow)

SEMANTIC
#10B981  success     ─ Acceptance Criteria border
#ECFDF5  success bg  ─ uc-ac, callout-green
#A7F3D0  success ln  ─ uc-ac border
#065F46  success dk  ─ tag-confirmed text
#166534  success dk2 ─ tag-confirmed text

#F59E0B  warning     ─ callout-amber border, uc-alt
#FFFBEB  warning bg  ─ callout-amber, uc-alt, br-ref
#FDE68A  warning ln  ─ br-ref border
#92400E  warning dk  ─ br-ref text, tag-pending text

#E11D48  danger      ─ uc-exc border
#FEF2F2  danger bg   ─ uc-exc

#5B21B6  purple dk   ─ tag-design text
#F5F3FF  purple bg   ─ callout-purple, tag-design
#4C1D95  purple dk2  ─ callout-purple text
```

### File Locations

```
ysc-docs/
├── design-system.md                 (เอกสารฉบับนี้)
├── README.md                        (manual ของ skill)
├── index.html                       (landing — ใช้ Card pattern)
├── ysc_business_rules.html          (Master rules)
├── ysc_oms_brd.html                 (Template มาตรฐาน)
├── ysc_crm_brd.html
├── ysc_wms_brd.html
├── ysc_promotion_brd.html
├── ysc_cms_brd.html
├── ysc_reporting_brd.html
├── ysc_prd_brd.html
├── ysc_storefront_brd.html          (Channel — teal-blue card)
├── ysc_pos_brd.html                 (Channel — blue-purple card)
├── ysc_saleagent_brd.html           (Channel — purple-pink card)
├── docs/                            (copy เดียวกันสำหรับ deploy)
└── assets/
    └── adeptio_logo.png
```

### CSS Class Index

| Class | ใช้กับ | Section |
|-------|--------|---------|
| `#doc` | กล่องเอกสารหลัก | 3.1 |
| `.cover`, `.cover .tag`, `.cover h1`, `.cover .sub`, `.cover .info-grid` | Cover banner | 4.2 |
| `.callout`, `.callout-green`, `.callout-amber`, `.callout-purple` | Callouts 4 รูปแบบ | 4.4 |
| `.toc` | สารบัญ | 4.10 |
| `.use-case`, `.uc-header`, `.uc-body`, `.uc-section`, `.uc-section-label` | Use Case container | 4.8 |
| `.uc-flow`, `.uc-alt`, `.uc-exc`, `.uc-ac` | Use Case flows | 4.8 |
| `.tag-confirmed`, `.tag-pending`, `.tag-design` | Status badges | 4.6.1 |
| `.badge-sa`, `.badge-oms` etc. | UC code badge | 4.6.2 |
| `.planned-badge` | "วางแผนไว้" badge | 4.6.3 |
| `.br-ref` | Business Rule pill | 4.7.1 |
| `.screen-ref` | Screen name pill | 4.7.2 |
| `.flow-diagram`, `.flow-row`, `.flow-step`, `.flow-arrow` | Flow diagram | 4.9 |
| `.screen-figure`, `.screen-caption`, `.no-image` | Mockup container | 4.12 |
| `.card`, `.card-icon`, `.card-title`, `.card-badge` | Index card | 4.11 |

---

**End of Design System v1.0**

ส่วนเพิ่มเติม / คำถาม กรุณาแจ้ง UX/UI Designer หรือ Adeptio Team
