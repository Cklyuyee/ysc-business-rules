// ─── Use Case / Business Rule Data ─────────────────────────────────────────
// Single Source of Truth — อ้างอิง team-knowledge-main (9 meetings)

export interface BusinessRule {
  id: string;
  title: string;
  description: string;
  conditions?: string[];
  table?: { headers: string[]; rows: string[][] };
  notes?: string[];         // ข้อควรรู้เพิ่มเติม
  decisions?: string[];     // D-NNN references
  openQuestions?: string[]; // คำถามที่ยังไม่มีคำตอบ
}

export interface UseCaseModule {
  id: string;
  title: string;
  icon: string; // lucide icon name
  color: string; // tailwind color key
  rules: BusinessRule[];
}

export const USE_CASE_MODULES: UseCaseModule[] = [
  // ── Module 1: Customer Master ────────────────────────────────────────────
  {
    id: 'CUS',
    title: 'Customer Master — การจัดการสมาชิก',
    icon: 'Users',
    color: 'emerald',
    rules: [
      {
        id: 'BR-CUS-001',
        title: 'สถานะเริ่มต้นของสมาชิกใหม่ทุกราย',
        description: 'ลูกค้าใหม่ทุกรหัสเริ่มต้นด้วยสถานะ Prospect เสมอ ไม่ว่าจะสมัครจากช่องทางใด',
        conditions: [
          'Prospect ดูสินค้าได้ แต่สั่งซื้อไม่ได้ จนกว่าจะสมัครสมาชิกสำเร็จ',
          'ไม่รองรับ Guest Checkout — ต้องสมัครสมาชิกก่อนสั่งซื้อ',
        ],
      },
      {
        id: 'BR-CUS-002',
        title: 'โครงสร้าง Member Tier (7 ระดับ)',
        description: 'Member Tier ใช้สำหรับ CRM, Promotion, Benefits — ไม่ใช่ตัวกำหนดราคา',
        table: {
          headers: ['ระดับ', 'เงื่อนไข', 'หมายเหตุ'],
          rows: [
            ['Prospect', 'ยังไม่สมัครสมาชิก', 'ดูสินค้าได้ สั่งซื้อไม่ได้'],
            ['Member', 'สมัครสมาชิกแล้ว', 'ระดับเริ่มต้น'],
            ['Silver', 'ยอดซื้อสะสม > 100,000 บาท', '—'],
            ['Gold', 'ยอดซื้อสะสม > 700,000 บาท', '—'],
            ['Platinum', 'ยอดซื้อสะสม > 2,000,000 บาท', '—'],
            ['Diamond', 'ยอดซื้อสะสม > 3,000,000 บาท', '—'],
            ['Coronet', 'เชิญพิเศษ (Invite-only)', 'ระดับสูงสุด'],
          ],
        },
      },
      {
        id: 'BR-CUS-003',
        title: 'Price Tier แยกจาก Member Tier',
        description: 'Price Tier (P1–P5) = ระดับราคาที่ลูกค้าได้รับ กำหนดต่อ Category ไม่ใช่ Global',
        conditions: [
          'ลูกค้าคนเดียวอาจเป็น P1 สำหรับเครื่องเขียน แต่ P3 สำหรับเฟอร์นิเจอร์',
          'ระบบต้อง lookup ด้วย customer_tiers[category] ไม่ใช่ customer.tier',
        ],
        notes: [
          'Member Tier = ยอดซื้อสะสม (CRM/Promo)',
          'Price Tier = ราคาที่ได้ (Per-category)',
        ],
      },
      {
        id: 'BR-CUS-004',
        title: 'Price Tier เริ่มต้นตามช่องทาง (Channel)',
        description: 'ลูกค้าใหม่ได้รับ Price Tier เริ่มต้นตามช่องทางที่สมัคร/ซื้อ',
        table: {
          headers: ['ช่องทาง', 'Price Tier เริ่มต้น'],
          rows: [
            ['Online / Web', 'P5'],
            ['หน้าร้าน / In-store (CC, POS)', 'P4'],
          ],
        },
        openQuestions: ['Shopee / Social Media ใช้ Price Tier ใด?'],
      },
      {
        id: 'BR-CUS-005',
        title: 'การปรับ Price Tier',
        description: 'ระบบสามารถปรับ Price Tier ได้ตามเงื่อนไขที่กำหนด โดยมีการตั้งสิทธิ์ผู้ใช้',
        openQuestions: [
          'เงื่อนไขการปรับอัตโนมัติ vs Manual?',
          'สิทธิ์ระดับไหนปรับได้ (Admin only? Manager? CC?)',
          'ปรับแล้วมีผลทันที หรือต้องอนุมัติ?',
        ],
      },
      {
        id: 'BR-CUS-006',
        title: 'ช่องทางสมัครสมาชิก',
        description: 'รองรับ 3 ช่องทาง: เว็บไซต์ / LINE OA / หน้าร้าน',
        conditions: [
          'สมัครผ่านเว็บ: ต้องมี Email Confirmation',
          'ธุรกรรมสำคัญ (แลก Point, เปลี่ยนเบอร์): ใช้ OTP',
        ],
      },
      {
        id: 'BR-CUS-007',
        title: 'การเปลี่ยนเบอร์โทรศัพท์',
        description: 'ลูกค้าไม่สามารถเปลี่ยนเบอร์เองได้บนเว็บ',
        conditions: [
          'ต้องแจ้ง CC ผ่าน LINE พร้อมส่งหลักฐาน (บัตรประชาชน) ให้ Admin ดำเนินการ',
        ],
        decisions: ['D-033'],
      },
      {
        id: 'BR-CUS-008',
        title: 'Customer ID',
        description: 'Customer Master อยู่ที่ Adeptio Platform (เป็น Master) — ไม่ใช่ ConX',
        conditions: ['รหัสลูกค้าเดิมขึ้นต้นด้วย P (P-code)'],
        openQuestions: ['โครงสร้าง Customer ID ใหม่ต้องผูกกับ P-code เดิมอย่างไร? (Q-021)'],
      },
      {
        id: 'BR-CUS-009',
        title: 'Business Type Segment',
        description: 'รองรับ Custom Segment สำหรับ Business Type เช่น โรงเรียน, ราชการ',
        conditions: [
          'ใช้สำหรับตั้งเงื่อนไข Promotion เฉพาะกลุ่ม (Include/Exclude)',
          'ข้อมูลต้อง Upload/Migrate จากระบบเดิม',
        ],
      },
    ],
  },

  // ── Module 2: Credit Limit ───────────────────────────────────────────────
  {
    id: 'CRD',
    title: 'Credit Limit — วงเงินเครดิต',
    icon: 'CreditCard',
    color: 'blue',
    rules: [
      {
        id: 'BR-CRD-001',
        title: 'ประเภทวงเงิน',
        description: 'วงเงินเครดิตแบ่งเป็น 2 ประเภท',
        conditions: [
          'วงเงินเครดิตทั่วไป (Standard): กำหนดวงเงิน + จำนวนวันเครดิต (30/60 วัน)',
          'วงเงินค้ำประกัน (Bank Guarantee): ต้องกรอกข้อมูลหนังสือค้ำประกันธนาคาร ไม่ใช่แค่ upload ไฟล์',
        ],
      },
      {
        id: 'BR-CRD-002',
        title: 'การตัดวงเงิน',
        description: 'ตัดวงเงินเครดิตทันทีเมื่อสร้าง SO — แสดงวงเงินคงเหลือจริง',
        conditions: [
          'หากวงเงินเต็มหรือเกิน Credit Term → ล็อก SO ทันที',
        ],
        decisions: ['D-002', 'D-014'],
      },
      {
        id: 'BR-CRD-003',
        title: 'Group Credit Limit',
        description: 'วงเงินกลุ่ม = FIFO Shared Pool — ใครสั่งก่อนดึงวงเงินกลางก่อน',
        conditions: [
          'ไม่มี Sub-limit แยกรายบุคคลในกลุ่ม',
          'หากสมาชิกคนใดดึงวงเงินจนหมด → คนอื่นในกลุ่มสั่งไม่ได้',
        ],
        decisions: ['D-041'],
      },
      {
        id: 'BR-CRD-004',
        title: 'ทางเลือกเมื่อวงเงินไม่เพียงพอ',
        description: 'มี 4 ทางเลือกเมื่อวงเงินเครดิตไม่พอ',
        conditions: [
          '1. เปลี่ยนวิธีชำระเงิน (เงินสด / โอน / บัตรเครดิต)',
          '2. ปรับยอดสั่งซื้อให้ไม่เกินวงเงินที่เหลือ',
          '3. ยกเลิก SO',
          '4. ส่งขออนุมัติเกินวงเงิน (Over Credit)',
        ],
      },
      {
        id: 'BR-CRD-005',
        title: 'Over Credit Limit Approval',
        description: 'อนุมัติเป็นรายครั้ง (Per SO) — ไม่ได้เพิ่ม Limit ถาวร',
        conditions: [
          'หาก SO มีสถานะ "วงเงินเกิน" อยู่แล้ว → ห้ามขออนุมัติซ้ำสำหรับ SO ใหม่',
        ],
        decisions: ['D-043'],
      },
      {
        id: 'BR-CRD-006',
        title: 'สิทธิ์การอนุมัติวงเงิน (Authorization Matrix)',
        description: 'กำหนดสิทธิ์ตามระดับตำแหน่ง',
        table: {
          headers: ['ระดับ', 'วงเงินปกติ', 'Over Credit'],
          rows: [
            ['ผู้จัดการ CC / POS Sup', '—', 'อนุมัติได้ XX% ไม่เกิน XXX บาท'],
            ['ผู้จัดการบัญชี', 'สูงสุด XXX บาท', 'อนุมัติได้ XX% ไม่เกิน XXX บาท'],
            ['ผู้บริหาร', 'ไม่จำกัด', 'ไม่จำกัด'],
          ],
        },
        openQuestions: ['ค่าจริงของ XX% และ XXX บาท ในแต่ละระดับคืออะไร?'],
      },
      {
        id: 'BR-CRD-007',
        title: 'Bank Guarantee',
        description: 'การจัดการหนังสือค้ำประกัน',
        conditions: [
          'ต้องกรอกข้อมูล: ชื่อธนาคาร, เลขที่, วันที่ออก, วันหมดอายุ, วงเงิน',
          'ระบบป้องกันไม่ให้อนุมัติวงเงินเกินมูลค่าในหนังสือค้ำประกัน',
          'วันหมดอายุ = Inclusive ถึง 23:59 ของวันนั้น',
          'แจ้งเตือนล่วงหน้า 7 วัน ผ่าน Dashboard + Notification',
          'หมดอายุแล้วไม่เปลี่ยน → ระบบปรับลดวงเงินค้ำประกันทันที',
        ],
        decisions: ['D-045'],
      },
      {
        id: 'BR-CRD-008',
        title: 'CC ใช้เครดิตเท่านั้น',
        description: 'CC Orders ต้องชำระด้วยเครดิตเท่านั้น',
        conditions: [
          'Web / POS: เปลี่ยนวิธีชำระได้หากวงเงินไม่พอ',
        ],
        decisions: ['D-044'],
      },
    ],
  },

  // ── Module 3: Points & Rewards ───────────────────────────────────────────
  {
    id: 'PTS',
    title: 'Points & Rewards — แต้มสะสมและของรางวัล',
    icon: 'Star',
    color: 'amber',
    rules: [
      {
        id: 'BR-PTS-001',
        title: 'การคำนวณ Point',
        description: 'อัตรา: 1,500 บาท = 1 Point',
        conditions: [
          'คำนวณเป็นเศษทศนิยมได้ เก็บที่ระดับ SO',
          'จ่าย Point เมื่อชำระเงินและออก Invoice สำเร็จเท่านั้น',
          'Point หมดอายุ 31 ธันวาคม ทุกปี',
          'รองรับ Campaign พิเศษ เช่น Double Day (แต้ม x2)',
        ],
        decisions: ['D-040'],
      },
      {
        id: 'BR-PTS-002',
        title: 'การแลก Point (Redeem)',
        description: 'แลกได้ Reward Product หรือ คูปองส่วนลด',
        conditions: [
          'กด Redeem ต้องยืนยันด้วย OTP',
          'เมื่อกดรับของรางวัลแล้ว (ขั้นตอนจัดส่ง) ไม่ต้องใช้ OTP ซ้ำ',
          'สินค้า Reward เก็บใน Warehouse Group แยกต่างหาก',
        ],
        decisions: ['D-013'],
      },
      {
        id: 'BR-PTS-003',
        title: 'การนับยอดซื้อ',
        description: 'นับยอดซื้อเข้า Profile เมื่อออก Invoice แล้วเท่านั้น',
        conditions: [
          'SO ที่ยังไม่ได้ชำระหรือถูก Cancel ไม่นับ',
          'ใช้ Median คำนวณ "จำนวนที่ซื้อประจำ" (ไม่ใช่ Average)',
          'แสดง Top 10 สินค้าที่ลูกค้าซื้อประจำ',
        ],
        decisions: ['D-006', 'D-007'],
      },
    ],
  },

  // ── Module 4: Channel & Sales ────────────────────────────────────────────
  {
    id: 'CHN',
    title: 'Channel Classification — ช่องทางการขาย',
    icon: 'Store',
    color: 'violet',
    rules: [
      {
        id: 'BR-CHN-001',
        title: 'ประเภทช่องทาง',
        description: 'ทุก SO ต้องระบุ Channel เสมอ',
        table: {
          headers: ['Channel', 'Sub-channel', 'หมายเหตุ'],
          rows: [
            ['POS', '—', 'หน้าร้าน'],
            ['Agent', 'CC, CS', 'Call Center, Customer Service'],
            ['Web', 'Online, Shopee, Social', 'E-commerce'],
          ],
        },
        decisions: ['D-039'],
      },
      {
        id: 'BR-CHN-002',
        title: 'Invoice แยกอัตโนมัติ',
        description: 'ระบบแยก Invoice เป็น 2 ใบอัตโนมัติ',
        conditions: [
          'ใบ EV — สำหรับสินค้า VAT',
          'ใบ EN — สำหรับสินค้า non-VAT',
        ],
        decisions: ['D-003'],
      },
      {
        id: 'BR-CHN-003',
        title: 'Document Split (ใบเตรียมสินค้า)',
        description: 'แยกใบเตรียมตามประเภทลูกค้าและ Tax Type ของสินค้า',
        conditions: [
          'ลูกค้า Y หรือ N → ใบเตรียม 1 ใบ (PL)',
          'ลูกค้า M หรือ A + สินค้า V และ I ปนกัน → ใบเตรียม 2 ใบ (PLV + PLI)',
          'ลูกค้า M หรือ A + สินค้าประเภทเดียว → ใบเตรียม 1 ใบ',
        ],
        notes: [
          'การ Split เป็นระดับเอกสาร (Print) เท่านั้น — ไม่แยก Pick',
        ],
      },
      {
        id: 'BR-CHN-004',
        title: 'Discount Master',
        description: 'มาสเตอร์ส่วนลดตั้งเป็น "บาท" เสมอ',
        conditions: [
          'เว็บไซต์คำนวณและแสดงเป็น % (ปัดลง)',
          'เหตุผล: ควบคุมต้นทุนแม่นยำ + ป้องกันลูกค้าร้องเรียนเรื่องทศนิยม',
        ],
        decisions: ['D-032'],
      },
    ],
  },

  // ── Module 5: Inventory ──────────────────────────────────────────────────
  {
    id: 'INV',
    title: 'Inventory — คลังสินค้า',
    icon: 'Warehouse',
    color: 'orange',
    rules: [
      {
        id: 'BR-INV-001',
        title: 'ประเภทคลังสินค้า (5 ประเภท)',
        description: 'แยก Warehouse ตามวัตถุประสงค์และ Channel',
        table: {
          headers: ['คลัง', 'ที่ตั้ง', 'Channel', 'กฎพิเศษ'],
          rows: [
            ['Offline', 'ชั้น 1 (หน้าร้าน)', 'POS, Walk-in', 'ขายหน้าร้านเท่านั้น'],
            ['Online', 'ชั้น 2-4', 'CC, Web, Agent', 'ชั้น 4 Code เริ่มที่ 50'],
            ['Staging', '—', 'ทุก Channel', 'สินค้าแพ็คแล้วรอ Cashier'],
            ['Pre-order', '—', 'CC, Web', 'สต็อกติดลบได้ใน ConX'],
            ['Reward', '—', 'ทุก Channel', 'ของแถม/Reward เท่านั้น'],
          ],
        },
        decisions: ['D-016', 'D-024', 'D-013'],
      },
      {
        id: 'BR-INV-002',
        title: 'Stock Lifecycle',
        description: 'Reserve ทันทีเมื่อ Checkout, Deduct เมื่อ Invoice + Ship confirm',
        conditions: [
          'Available = On-hand - Reserved',
          'Reserve เมื่อ Checkout / สร้าง SO',
          'Deduct เมื่อ Invoice + Confirm จัดส่ง',
          'Cancel SO → Reserved คืนกลับ Available',
          'สินค้าของแถมหักสต็อก ณ จุดเปิด SO (ไม่ใช่ตอน Pack)',
        ],
        decisions: ['D-004', 'D-011', 'D-019'],
      },
      {
        id: 'BR-INV-003',
        title: 'Sync กับ ConX',
        description: 'Hybrid Sync — Real-time สำหรับ Fast moving, Batch 15-30 นาทีสำหรับทั่วไป',
        decisions: ['D-020'],
      },
    ],
  },

  // ── Module 6: Order ──────────────────────────────────────────────────────
  {
    id: 'ORD',
    title: 'Order Management — คำสั่งซื้อ',
    icon: 'ShoppingCart',
    color: 'sky',
    rules: [
      {
        id: 'BR-ORD-001',
        title: 'ประเภทคำสั่งซื้อ (3 ประเภท)',
        description: 'Normal Order, Pre-order, Quotation',
        table: {
          headers: ['ด้าน', 'Normal', 'Pre-order', 'Quotation'],
          rows: [
            ['เช็คสต็อก', 'ใช่', 'ไม่', 'ไม่'],
            ['ใช้ Promotion', 'ใช่', 'ใช่', 'ไม่ (ราคา Lock)'],
            ['Reserve สต็อก', 'ทันทีเมื่อ Checkout', 'คลังพิเศษ (ติดลบได้)', 'ไม่'],
            ['อายุ', 'Auto-cancel 24 ชม.', 'จนกว่าจะเสร็จ', '7 วันทำการ'],
            ['ส่งบางส่วน', 'ไม่', 'ได้', 'ไม่'],
          ],
        },
      },
      {
        id: 'BR-ORD-002',
        title: 'SO ที่เข้า Pick แล้วห้ามแก้ไข',
        description: 'ต้อง Cancel ต้นฉบับ แล้ว Duplicate เป็น Draft ใหม่',
        conditions: [
          'ระบบเก็บ Log อ้างอิงถึง Bill เดิม',
          'SO ไม่ชำระเงินภายใน 24 ชม. → Auto-cancel',
        ],
        decisions: ['D-009'],
      },
      {
        id: 'BR-ORD-003',
        title: 'สินค้าไม่พอตอน Checkout',
        description: 'ระบบบังคับลูกค้าตัดสินใจก่อนชำระเงิน',
        conditions: [
          'ไม่ auto-remove สินค้าออกจากตะกร้า',
          'ลูกค้าเลือก: (1) ลดจำนวนเป็นเท่าที่มี หรือ (2) แยก OOS เป็น Pre-order',
        ],
        decisions: ['D-034'],
      },
      {
        id: 'BR-ORD-004',
        title: 'Pick/Pack ทำคู่ขนานกับรอ Payment ได้',
        description: 'ลดเวลารอ แต่ไม่ปล่อยสินค้าจนกว่า Cashier confirm',
        conditions: [
          'สินค้าแพ็คแล้วรอใน Staging Warehouse',
          'ถ้า Order ชำระแล้ว (โอน/บัตร) → Auto-Invoice ข้าม Cashier ได้',
        ],
        decisions: ['D-010', 'D-018'],
      },
    ],
  },
];
