"use client";
// page.tsx — Valde 首頁
// 所有 logo 與圖片均從 /public/logos 與 /public/images 讀取
// 無自行生成圖片、無假 logo、無 raw code
import { useState } from "react";
// ── 資料定義 ────────────────────────────────────────
const NAV_LINKS = ["平台介紹", "產品分類", "解決方案", "案例實績", "關於我們"];

const SERVICES = [
  { title: "智慧圖面判讀", desc: "快速理解空間需求" },
  { title: "多品牌整合報價", desc: "精準比價更省時" },
  { title: "專人對接服務", desc: "即時溝通與安心" },
  { title: "實際落地執行", desc: "保固交期與品質" },
  { title: "供貨與工程支援", desc: "落地執行更省心" },
];

const STEPS = [
  { n: "01", title: "上傳圖面 / 提供需求", desc: "提供平面圖、立面圖、參考圖或案件需求" },
  { n: "02", title: "智慧判斷建材需求", desc: "依空間、品項、預算與施工條件整理建材方案" },
  { n: "03", title: "取得初步報價", desc: "產出初估清單與建材配置方向" },
  { n: "04", title: "專人確認與工班安排", desc: "確認數量、規格、施工條件與交期" },
  { n: "05", title: "供貨與案場交付", desc: "從材料供應到現場執行，全程協助追蹤" },
];

const PRODUCTS = [
  { name: "SPC 地板",      src: "/images/category-cards/spc-floor.jpg",                 pos: "center" },
  { name: "衛浴設備",      src: "/images/category-cards/bathroom.jpg",                  pos: "center" },
  { name: "廚具系統",      src: "/images/category-cards/kitchen.jpg",                   pos: "center" },
  { name: "系統櫃 / 櫃體", src: "/images/category-cards/cabinet.jpg",                   pos: "center" },
  { name: "壁板 / 軟裝",   src: "/images/category-cards/wall-panel-softfurnishing.jpg", pos: "center" },
  { name: "住宅配套",      src: "/images/category-cards/home-package.jpg",              pos: "center" },
];

const PARTNERS = [
  { name: "遠雄建設",                src: "/logos/partners/farglory.png",       scale: 2.0 },
  { name: "國泰建設",                src: "/logos/partners/cathay.png",         scale: 1.8 },
  { name: "櫻花建設",                src: "/logos/partners/sakura.png",         scale: 1.8 },
  { name: "亞昕建設",                src: "/logos/partners/archer.png",         scale: 1.8 },
  { name: "麗寶建設",                src: "/logos/partners/lienbao.png",        scale: 2.0 },
  { name: "Sheraton Grand",         src: "/logos/partners/sheraton-grand.png", scale: 1.6 },
  { name: "圓山大飯店",              src: "/logos/partners/grand-hotel.png",    scale: 1.8 },
  { name: "Howard 福華",             src: "/logos/partners/howard.png",         scale: 1.8 },
  { name: "Orchard Park",           src: "/logos/partners/orchard-park.png",   scale: 1.8 },
  { name: "Four Points by Sheraton", src: "/logos/partners/four-points.png",   scale: 2.2 },
];

const ESTIMATE_ITEMS = [
  { label: "地板建材",    amount: "NT$ 51,600" },
  { label: "衛浴設備",    amount: "NT$ 42,900" },
  { label: "廚具設備",    amount: "NT$ 39,800" },
  { label: "系統櫃 / 櫃體", amount: "NT$ 32,500" },
  { label: "其他建材",    amount: "NT$ 20,000" },
];

const VALUES = [
  { title: "多品牌建材整合",    desc: "整合 SPC 地板、衛浴、廚具、系統櫃等多品類供應，一站對接，減少跨廠商協調成本。" },
  { title: "報價紀錄可追蹤",    desc: "每次估價與報價均有完整紀錄，設計師與業主皆可查閱，方便對帳與確認進度。" },
  { title: "專人回覆與對接",    desc: "送出需求後由專人確認，不依賴全自動回覆，確保溝通品質。" },
  { title: "供貨與案場交付支援", desc: "從材料備料到案場交付，協助工程端追蹤進度，確保施工如期進行。" },
];

// ── 樣式常數 ────────────────────────────────────────
const RED = "#9E1B1F";
const DARK = "#1F1F1F";
const BODY = "#4A4A4A";
const MUTED = "#777777";
const SOFT = "#F8F6F2";
const BORDER = "#E5E0DA";
const LINE = "#EEEAE5";
const COPPER = "#A67C52";
const FOOTER = "#1F1F1F";

const s = {
  card: {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 10,
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  } as React.CSSProperties,
  btnRed: {
    background: RED,
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    fontSize: 14,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    borderRadius: 2,
    textDecoration: "none",
  } as React.CSSProperties,
  btnOutline: {
    background: "rgba(255,255,255,0.92)",
    color: DARK,
    border: `1.5px solid ${BORDER}`,
    padding: "11px 24px",
    fontSize: 14,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    borderRadius: 2,
    textDecoration: "none",
  } as React.CSSProperties,
};

// ── 컴포넌트 ────────────────────────────────────────
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ background: "#fff", color: DARK, fontFamily: '"Noto Sans TC","PingFang TC","Microsoft JhengHei",sans-serif', lineHeight: 1.6 }}>

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav style={{ background: "#fff", borderBottom: `1px solid ${LINE}`, position: "sticky", top: 0, zIndex: 50, height: 80 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 36px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Header logo: /logos/valde-logo-horizontal.png */}
          <img
            src="/logos/valde-logo-horizontal.png"
            alt="VALDE 潤鋒"
            style={{ height: 56, width: "auto", objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement;
              if (fb) fb.style.display = "block";
            }}
          />
          <span style={{ display: "none", fontSize: 20, fontWeight: 600, color: DARK, letterSpacing: 1 }}>VALDE 潤鋒</span>
          <div className="nav-links" style={{ display: "flex", gap: 28, fontSize: 15, color: BODY }}>
            {NAV_LINKS.map(l => (
              <a key={l} href="#" style={{ color: BODY, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <a href="#" style={{ fontSize: 15, color: BODY, textDecoration: "none" }} className="nav-links">登入</a>
            <a href="#" style={s.btnRed}>企業用戶入口</a>
            <button
              className="nav-menu-btn"
              onClick={() => setMenuOpen(o => !o)}
              style={{ display: "none", background: "none", border: `1px solid ${BORDER}`, padding: "6px 10px", cursor: "pointer", fontSize: 18, color: DARK, borderRadius: 4 }}
              aria-label="開啟選單"
            >{menuOpen ? "✕" : "☰"}</button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(l => (
          <a key={l} href="#" onClick={() => setMenuOpen(false)}>{l}</a>
        ))}
        <a href="#" className="cta" onClick={() => setMenuOpen(false)}>企業用戶入口</a>
      </div>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section style={{ background: SOFT, position: "relative", overflow: "hidden" }}>
        <img
          src="/images/hero/hero-interior.jpg"
          alt="室內建材背景"
          style={{ position: "absolute", right: 0, top: 0, width: "58%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.08 }}
        />
        <div className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 36px 72px", position: "relative", display: "grid", gridTemplateColumns: "5fr 7fr", gap: 40, alignItems: "flex-start" }}>

          {/* Left */}
          <div style={{ paddingTop: 8 }}>
            <div style={{ display: "inline-block", border: `1px solid ${COPPER}`, color: COPPER, fontSize: 11, letterSpacing: 2, padding: "4px 12px", marginBottom: 22 }}>建材供應鏈整合平台</div>
            <h1 className="hero-title">
              建材供應鏈<br />
              <span style={{ color: RED }}>智慧報價</span>與落地交付
            </h1>
            <p style={{ color: BODY, fontSize: 15, lineHeight: 1.9, marginBottom: 36, maxWidth: 400 }}>
              上傳平面圖或立面圖後，Valde 依照空間需求與預算條件，整理可供應的建材方案，並由專人確認報價、供貨安排與案場交付。
            </p>
            <div style={{ display: "flex", gap: 14 }} className="hero-ctas">
              <div>
                <a href="#" style={s.btnRed}>↑ 免費建材估價</a>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 5, textAlign: "center" }}>上傳圖面・取得初步報價</div>
              </div>
              <div>
                <a href="#" style={s.btnOutline}>☰ 企業用戶入口</a>
                <div style={{ fontSize: 11, color: MUTED, marginTop: 5, textAlign: "center" }}>管理案件與報價進度</div>
              </div>
            </div>
          </div>

          {/* Right: hero dashboard */}
          <div className="hero-cards" style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {/* Row 1: Upload + Estimate side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "44% 1fr", gap: 12, alignItems: "stretch" }}>

              {/* Upload card */}
              <div style={{ ...s.card, padding: 20 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginBottom: 14 }}>上傳圖面</div>
                <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>支援平面圖 / 立面圖 / 參考圖片</div>
                <div style={{ border: `1.5px dashed ${BORDER}`, background: SOFT, padding: 10, marginBottom: 14, borderRadius: 6 }}>
                  <img src="/images/hero/floorplan-demo.png" alt="平面圖示意"
                    style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 3, display: "block" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#f0fdf4", padding: "9px 12px", borderRadius: 5, marginBottom: 10 }}>
                  <span style={{ color: "#16a34a", fontSize: 15 }}>✓</span>
                  <span style={{ fontSize: 13, color: "#166534", fontWeight: 500 }}>平面圖.pdf</span>
                  <span style={{ marginLeft: "auto", fontSize: 12, color: MUTED }}>重新上傳</span>
                </div>
                <div style={{ display: "flex", gap: 5 }}>
                  {["PDF", "JPG", "PNG"].map(f => (
                    <span key={f} style={{ fontSize: 11, padding: "3px 9px", border: `1px solid ${BORDER}`, color: MUTED, borderRadius: 3 }}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Estimate card */}
              <div style={{ ...s.card, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: DARK }}>建材估價概況</span>
                  <span style={{ fontSize: 11, background: RED, color: "#fff", padding: "3px 10px", borderRadius: 3 }}>初步估價</span>
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginBottom: 6 }}>預估總價（含稅）</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: RED, marginBottom: 14, letterSpacing: "-0.02em", lineHeight: 1.1 }}>NT$ 186,800</div>
                <div style={{ display: "flex", gap: 24, marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${LINE}` }}>
                  <div><div style={{ fontSize: 18, fontWeight: 600 }}>28 項</div><div style={{ fontSize: 11, color: MUTED }}>項目總數</div></div>
                  <div><div style={{ fontSize: 18, fontWeight: 600 }}>15 坪</div><div style={{ fontSize: 11, color: MUTED }}>空間總數</div></div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: BODY, marginBottom: 10 }}>主要建材分類預估</div>
                {ESTIMATE_ITEMS.map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6, color: MUTED }}>
                    <span>{item.label}</span>
                    <span style={{ color: DARK, fontWeight: 500 }}>{item.amount}</span>
                  </div>
                ))}
                <a href="#" style={{ ...s.btnRed, width: "100%", marginTop: 14, justifyContent: "center", fontSize: 13 }}>↓ 下載完整報價 PDF</a>
              </div>
            </div>

            {/* Row 2: Recommendations — horizontal strip */}
            <div style={{ ...s.card, padding: "14px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: DARK, flexShrink: 0 }}>推薦建材方案</span>
                {[
                  { cat: "SPC 地板", name: "SPC 木地板",  price: "NT$1,280/坪", thumb: "/images/products/product-floor.jpg" },
                  { cat: "衛浴設備", name: "衛浴套裝",    price: "NT$42,900/式", thumb: "/images/products/product-bathroom.jpg" },
                  { cat: "系統櫃",   name: "系統櫃",      price: "NT$8,500/坪",  thumb: "/images/products/product-cabinet.jpg" },
                ].map(item => (
                  <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 9, flex: 1, minWidth: 140 }}>
                    <img src={item.thumb} alt={item.name}
                      style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 5, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 10, color: MUTED }}>{item.cat}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: DARK }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: RED, fontWeight: 600 }}>{item.price}</div>
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 11, color: MUTED, flexShrink: 0 }}>✓ 已符合您的需求與預算條件</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICE STRIP ══════════════════════════════════ */}
      <div style={{ background: SOFT, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}`, padding: "20px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-around", alignItems: "center", gap: 12 }}>
          {SERVICES.map(f => (
            <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 120 }}>
              <div style={{ width: 36, height: 36, border: `1px solid ${BORDER}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: RED, opacity: 0.65 }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: DARK }}>{f.title}</div>
                <div style={{ fontSize: 11, color: MUTED }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PROCESS ════════════════════════════════════════ */}
      <section style={{ padding: "68px 32px", background: "#fff", maxWidth: 1280, margin: "0 auto" }}>
        <h2 className="section-title" style={{ marginBottom: 56 }}>
          從圖面到交付，全流程專人對接
        </h2>
        <div className="process-row" style={{ display: "flex", position: "relative" }}>
          <div style={{ position: "absolute", top: 27, left: "7%", right: "7%", height: 1, background: LINE, zIndex: 0 }} />
          {STEPS.map((step, i) => (
            <div key={step.n} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", zIndex: 1, padding: "0 6px" }}>
              <div style={{
                width: 54, height: 54, borderRadius: "50%",
                background: i === 0 ? RED : "#fff",
                border: i === 0 ? "none" : `1.5px solid ${BORDER}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16,
              }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 14, color: i === 0 ? "#fff" : MUTED }}>{step.n}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: DARK, marginBottom: 6, lineHeight: 1.4 }}>{step.title}</div>
              <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.7 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PRODUCT CATEGORIES ═════════════════════════════ */}
      <section style={{ padding: "0 32px 70px", maxWidth: 1280, margin: "0 auto" }}>
        <h2 className="section-title" style={{ marginBottom: 30 }}>
          我們提供的建材項目
        </h2>
        <div className="product-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {PRODUCTS.map(p => (
            <div
              key={p.name}
              style={{
                height: 120,
                borderRadius: 4,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0.08)), url(${p.src})`,
                backgroundSize: "cover",
                backgroundPosition: p.pos,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                padding: "14px 16px",
              }}
            >
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: 0.2, lineHeight: 1.3 }}>{p.name}</span>
              <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1 }}>›</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PARTNERS ═══════════════════════════════════════ */}
      <section style={{ background: SOFT, padding: "64px 32px", borderTop: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 className="section-title" style={{ marginBottom: 10 }}>
            合作與供應實績
          </h2>
          <p style={{ textAlign: "center", color: MUTED, fontSize: 15, maxWidth: 620, margin: "0 auto 34px", lineHeight: 1.9 }}>
            Valde 潤鋒與 Kanlee 康勵集團深耕建材供應與落地執行，服務住宅建案、飯店與商用空間專案。
          </p>
          <div className="partner-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {PARTNERS.map(logo => (
              <div key={logo.name} style={{ background: "#fff", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", padding: "14px 16px", borderRadius: 3 }}>
                <img
                  src={logo.src}
                  alt={logo.name}
                  style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const ph = e.currentTarget.nextElementSibling as HTMLElement;
                    if (ph) ph.style.display = "flex";
                  }}
                />
                <div style={{ display: "none", width: "100%", textAlign: "center", fontSize: 11, color: MUTED }}>{logo.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ROW ══════════════════════════════════════ */}
      <section style={{ background: "#fff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { num: "10+",   label: "合作供應類型",   desc: "地板、衛浴、廚具等多品類整合" },
            { num: "6",     label: "大住宅建材品項", desc: "涵蓋住宅主要建材需求" },
            { num: "3",     label: "種報價版本",     desc: "初估、詳細報價、施工版本" },
            { num: "1站式", label: "供應與交付",     desc: "從選材到案場全程協助追蹤" },
          ].map((item, i) => (
            <div key={item.label} style={{ padding: "40px 28px", textAlign: "center", borderRight: i < 3 ? `1px solid ${LINE}` : "none" }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: RED, marginBottom: 8, lineHeight: 1 }}>{item.num}</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: DARK, marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════ */}
      <footer style={{ background: FOOTER, padding: "56px 32px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.8fr", gap: 36, marginBottom: 44 }}>

            {/* Brand — Footer logo: /logos/valde-logo-white.png */}
            <div>
              <img
                src="/logos/valde-logo-white.png"
                alt="VALDE 潤鋒"
                style={{ height: 36, width: "auto", marginBottom: 16 }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fb = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = "block";
                }}
              />
              <span style={{ display: "none", fontSize: 16, fontWeight: 500, color: "#fff", letterSpacing: 1, marginBottom: 16 }} id="footer-logo-fallback">VALDE 潤鋒</span>
              <p style={{ fontSize: 12, lineHeight: 1.9, color: "#CCCCCC", marginBottom: 16 }}>
                專為設計師打造的建材供應鏈、智慧報價與落地交付。讓建材方案更清楚，讓報價與交付更安心。
              </p>
            </div>

            {/* Platform */}
            <div>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: 0.5 }}>平台服務</div>
              {["免費建材估價", "企業用戶入口", "合作建設", "產品分類", "解決方案", "資源中心", "常見問題"].map(l => (
                <a key={l} href="#" style={{ display: "block", color: "#CCCCCC", fontSize: 12, marginBottom: 9, textDecoration: "none" }}>{l}</a>
              ))}
            </div>

            {/* Products */}
            <div>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: 0.5 }}>產品分類</div>
              {["SPC 地板", "衛浴設備", "廚具系統", "系統櫃 / 櫃體", "壁板 / 軟裝", "住宅配套"].map(l => (
                <a key={l} href="#" style={{ display: "block", color: "#CCCCCC", fontSize: 12, marginBottom: 9, textDecoration: "none" }}>{l}</a>
              ))}
            </div>

            {/* About */}
            <div>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: 0.5 }}>關於我們</div>
              {["公司介紹", "合作品牌", "合作建設", "最新消息"].map(l => (
                <a key={l} href="#" style={{ display: "block", color: "#CCCCCC", fontSize: 12, marginBottom: 9, textDecoration: "none" }}>{l}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ color: "#fff", fontSize: 12, fontWeight: 500, marginBottom: 14, letterSpacing: 0.5 }}>聯絡資訊</div>
              {[
                ["📞", "02-7701-8254"],
                ["✉", "hello@valde.com.tw"],
                ["🕐", "週一至週五 09:00–18:00"],
                ["📍", "台灣・台北 / 桃園服務據點"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 7, marginBottom: 9, fontSize: 12, color: "#CCCCCC", alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0 }}>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
              {/* LINE QR: /images/line-qr-placeholder.png */}
              <div style={{ background: "#2a2a2a", padding: 12, borderRadius: 4, marginTop: 16, textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "#999999", marginBottom: 8, lineHeight: 1.7 }}>加入 LINE 好友<br />取得最新報價資訊</div>
                <img
                  src="/images/line-qr-placeholder.png"
                  alt="加入 LINE 好友 QR"
                  style={{ width: 64, height: 64, borderRadius: 3, display: "block", margin: "0 auto" }}
                />
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #2a2a2a", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "#999999" }}>
            <span>© 2026 VALDE 潤鋒國際有限公司 All rights reserved.</span>
            <div style={{ display: "flex", gap: 16 }}>
              <a href="#" style={{ color: "#CCCCCC", textDecoration: "none" }}>隱私權政策</a>
              <a href="#" style={{ color: "#CCCCCC", textDecoration: "none" }}>使用條款</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
