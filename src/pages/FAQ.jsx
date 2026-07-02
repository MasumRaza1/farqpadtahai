import { useState, useEffect } from "react";
import baburao from "./baburao.png";

// ─── Data ──────────────────────────────────────────────────────────────────
const faqData = [
  {
    id: 1,
    icon: "😠",
    question: "NGO SCAM TOH NAHI?",
    highlight: "SCAM",
    answer:
      "Bhai, yeh sawaal poochh ke tune humein prove karne ka mauka diya! Hum FCRA registered hain, audited hain, aur hamare accounts public domain mein hain. Scam waale itni transparency nahi dete. 😏",
    badge: "RECEIPTS HAIN HAMARE PAAS 🧾",
  },
  {
    id: 2,
    icon: "💸",
    question: "MERA ₹100 KYA HI KAREGA?",
    highlight: "₹100",
    answer:
      "Bohot karega boss! Ek chai kam, ek life better. ₹100 se kisi bacche ki copy, kisi ki meal, ya kisi ka sapna thoda strong ho sakta hai. 🧡\n\nChhota amount nahi hota, chhoti soch hoti hai.",
    badge: "100-100 JODKE HI TOH MOUNTAIN BANTA HAI! ⛰️",
    defaultOpen: true,
  },
  {
    id: 3,
    icon: "📜",
    question: "DONATION KA CERTIFICATE MILEGA?",
    highlight: "CERTIFICATE",
    answer:
      "Haan bhai, 80G certificate milega — tax bachao aur desh bachao, ek saath! Email pe automatically bhejte hain, framing optional hai. 😎",
    badge: "80G ✓  TAX SAVE ✓",
  },
  {
    id: 4,
    icon: "🔍",
    question: "PAISA KAHAN USE HOTA HAI?",
    highlight: "PAISA",
    answer:
      "Direct programs pe — education, health, livelihood. Overhead minimise karte hain kyunki hum jaante hain tumhara paisa office ki fancy chairs pe nahi, zaroori kaam pe jaana chahiye. Annual report public hai, dekho khud! 📊",
    badge: "100% TRANSPARENT 👁️",
  },
  {
    id: 5,
    icon: "💻",
    question: "AAP LOG ACTUALLY KAAM KARTE HO YA SIRF SOCIAL MEDIA?",
    highlight: "ACTUALLY KAAM",
    answer:
      "Oof! Yeh toh laga. 😂 Haan, field mein bhi hain hum. Social media toh sirf proof hai, असली kaam tab hota hai jab camera band hota hai. Ground reports, case studies sab available hain.",
    badge: "FIELD MEIN BHI, FEED MEIN BHI 🌾",
  },
  {
    id: 6,
    icon: "😎",
    question: "FOUNDER RICH HAI KYA?",
    highlight: "RICH",
    answer:
      "Rich? Bhai humne NGO join ki, startup nahi! 😂 Founder ka salary board-approved aur publicly disclosed hai. 'Rich' ka matlab alag hai yahan — impact se rich hain hum. 💪",
    badge: "IMPACT RICH > CASH RICH 👑",
  },
  {
    id: 7,
    icon: "📅",
    question: "KITNI BAAR FOLLOW-UP KAROGE?",
    highlight: "FOLLOW-UP",
    answer:
      "Jitna tum chahoge! Monthly impact updates milenge. Zyada nahi bhejenge, kyunki hum jaante hain inbox ek sacred space hai. Unsubscribe ka option bhi hai — no guilt trip. 🙏",
    badge: "SPAM-FREE PROMISE ✉️",
  },
  {
    id: 8,
    icon: "🙋",
    question: "MAIN VOLUNTEER KARNA CHAHTA HOON, BUT TIME NAHI HAI. AB?",
    highlight: "VOLUNTEER",
    answer:
      "Arre bhai, micro-volunteering hoti hai! 2 ghante bhi kafi hain mahine mein. Online tasks, content, mentoring — sab remote possible hai. Time nahi hai toh share karo, kyunki awareness bhi seva hai. 🫱",
    badge: "2 HOURS = 1 DIFFERENCE ⏰",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────
function highlightText(text, highlight) {
  if (!highlight) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ background: "#FFD600", padding: "0 3px", borderRadius: 3 }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────
function Navbar({ donateClicked, onDonate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav >
      
    </nav>
  );
}

function FAQCard({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        ...styles.faqItem,
        boxShadow: isOpen ? "5px 5px 0 #1a1a1a" : "4px 4px 0 #1a1a1a",
        animation: isOpen ? "wiggle 0.4s ease" : "none",
      }}
    >
      {/* Question row */}
      <div
        onClick={onToggle}
        style={styles.faqQ}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        aria-expanded={isOpen}
      >
        <span style={styles.faqIcon}>{item.icon}</span>
        <span style={styles.faqQText}>
          {item.id}. {highlightText(item.question, item.highlight)}
        </span>
        <span
          style={{
            ...styles.faqToggle,
            transform: isOpen ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </div>

      {/* Answer — CSS max-height transition */}
      <div
        style={{
          ...styles.faqAns,
          maxHeight: isOpen ? 600 : 0,
          padding: isOpen ? "0 14px 16px" : "0 14px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), padding 0.3s",
        }}
      >
        <div style={styles.faqAnsInner}>
          {item.id === 2 && (
            <div style={styles.mountainNote}>
              100-100 JODKE
              <br />
              HI TOH MOUNTAIN
              <br />
              BANTA HAI! ⛰️
            </div>
          )}
          <p style={{ whiteSpace: "pre-line" }}>{item.answer}</p>
          <span style={styles.ansBadge}>{item.badge}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default function FAQPage() {
  const [openId, setOpenId] = useState(2); // Q2 open by default
  const [donateClicked, setDonateClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDonate = () => {
    setDonateClicked(true);
    setTimeout(() => setDonateClicked(false), 1800);
  };

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Global styles injected via style tag — avoids needing a CSS module */}
      <style>{globalCSS}</style>

      <div style={styles.page}>
        {/* NAVBAR */}
        <Navbar donateClicked={donateClicked} onDonate={handleDonate} />

        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.sideNoteLeft}>
            SAWAAL
            <br />
            ACHHE HAIN,
            <br />
            ISLIYE HUM
            <br />
            YAHAN HAIN!
            <span style={{ fontSize: "1.4rem", display: "block" }}>↙️</span>
          </div>

          <div style={styles.sideNoteRight}>
            <div style={styles.trustBadge}>TRUST ISSUES</div>
            <br />
            NORMAL HAI BRO,
            <br />
            SAWAAL KARO!
            <span style={{ fontSize: "1.4rem", display: "block" }}>↘️</span>
          </div>

         <div style={{ marginTop: 10 }}>
            <img
              src={baburao}
              alt="Baburao sticker"
              style={{
                width: "200px",
                height: "auto",
                display: "block",
                margin: "0 auto",
                filter: "drop-shadow(2px 2px 0 #1a1a1a)",
              }}
            />
          </div>
          <h1 style={styles.faqTitle}>FAQ</h1>

          <div style={styles.subtitleBadge}>(FREQUENTLY ASKED, HONESTLY ANSWERED)</div>

          <p style={styles.heroDesc}>
            Aap poochho, hum sach sach batayenge.
            <br />
            Yahan corporate gyaan nahi, real baatein hoti hain. 😎
          </p>
        </section>

        {/* FAQ LIST */}
        <div
          style={styles.faqList}
          className={mounted ? "fade-in" : ""}
        >
          {faqData.map((item) => (
            <FAQCard
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        {/* STICKY NOTES ROW */}
        <div style={styles.stickyRow}>
          <div style={{ ...styles.stickyNote, flexShrink: 0, textAlign: "center", fontSize: "1.1rem", padding: "12px 16px" }}>
            HONESTY
            <br />
            100%
            <br />
            DRAMA
            <br />
            0%
            <br />
            😊
          </div>
          <div style={{ ...styles.stickyNote, flex: 1, fontSize: "0.85rem" }}>
            HUMARA FORMULA:
            <ul style={{ listStyle: "none", marginTop: 4 }}>
              {["TRANSPARENCY", "IMPACT", "ACCOUNTABILITY", "THODA SARCASM (FOR YOUR ENTERTAINMENT) 😎"].map((i) => (
                <li key={i}>✓ {i}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* DEAL ROW */}
        <div style={styles.dealRow}>
          DEAL?
          <span className="shake" style={{ fontSize: "2.5rem", display: "block" }}>
            🤝
          </span>
        </div>

        {/* BOTTOM CTA */}
        <section style={styles.ctaSection}>
          <span style={{ fontSize: "4rem", marginBottom: 8, display: "block" }}>😄</span>
          <div style={styles.ctaTitle}>
            AUR BHI{" "}
            <span style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#FFD600" }}>
              DOUBT
            </span>{" "}
            HAI?
          </div>
          <p style={styles.ctaSub}>Humein ping maro, hum reply zaroor denge.</p>
          <a href="mailto:hello@superboysofrehla.org" style={styles.btnAsk}>
            ASK US ANYTHING{" "}
            <span className="fly" style={{ fontSize: "1.2rem" }}>
              ✈️
            </span>
          </a>
        </section>

        {/* FOOTER TAGLINE */}
        <div style={styles.footerTagline}>
          <p style={{ fontFamily: "'Bangers', cursive", fontSize: "1.1rem", letterSpacing: "1.5px", marginBottom: 6 }}>
            DOUBT KARNA THEEK HAI,
          </p>
          <span style={styles.highlightLine}>FARAK PADNA AUR BHI THEEK HAI. 👑</span>
          <span className="heartbeat" style={{ fontSize: "1.5rem", display: "block", marginTop: 10 }}>
            🖤
          </span>
        </div>

        {/* BOTTOM NAV */}
        
      </div>
    </>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const B = "2.5px solid #1a1a1a";
const R = 14;

const styles = {
  page: {
    background: "#fafaf5",
    color: "#1a1a1a",
    fontFamily: "'Patrick Hand', cursive",
    fontSize: 16,
    lineHeight: 1.5,
    maxWidth: 480,
    margin: "0 auto",
    overflowX: "hidden",
    position: "relative",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: B,
    background: "#fafaf5",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    textDecoration: "none",
    color: "#1a1a1a",
    display: "block",
  },
  btnDonate: {
    background: "#1a1a1a",
    color: "#fafaf5",
    border: B,
    borderRadius: 8,
    padding: "7px 14px",
    fontFamily: "'Bangers', cursive",
    fontSize: "1rem",
    letterSpacing: 1.5,
    cursor: "pointer",
    boxShadow: "3px 3px 0 #555",
    transition: "transform 0.1s, box-shadow 0.1s",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  hamburger: {
    width: 32,
    height: 28,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    padding: "4px 0",
    background: "none",
    border: "none",
  },
  ham1: {
    display: "block",
    height: 3,
    background: "#1a1a1a",
    borderRadius: 2,
    transition: "transform 0.3s, opacity 0.3s",
    width: "100%",
  },
  hero: {
    padding: "30px 18px 10px",
    textAlign: "center",
    position: "relative",
  },
  sideNoteLeft: {
    position: "absolute",
    left: 8,
    top: 28,
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "0.82rem",
    fontWeight: 700,
    lineHeight: 1.3,
    textAlign: "left",
    maxWidth: 90,
    transform: "rotate(-3deg)",
  },
  sideNoteRight: {
    position: "absolute",
    right: 8,
    top: 28,
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "0.82rem",
    fontWeight: 700,
    lineHeight: 1.3,
    textAlign: "center",
    maxWidth: 90,
    transform: "rotate(3deg)",
  },
  trustBadge: {
    background: "#FFD600",
    border: B,
    borderRadius: 6,
    padding: "4px 8px",
    fontFamily: "'Bangers', cursive",
    letterSpacing: 1,
    fontSize: "0.78rem",
    display: "inline-block",
    marginBottom: 4,
  },
  faqTitle: {
    fontFamily: "'Bangers', cursive",
    fontSize: "5rem",
    letterSpacing: 4,
    lineHeight: 0.9,
    position: "relative",
    display: "inline-block",
    margin: "10px 0 6px",
  },
  subtitleBadge: {
    background: "#FFD600",
    border: B,
    borderRadius: 20,
    padding: "5px 16px",
    fontFamily: "'Patrick Hand', cursive",
    fontWeight: 700,
    fontSize: "0.85rem",
    letterSpacing: 1,
    display: "inline-block",
    margin: "6px 0 14px",
  },
  heroDesc: {
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "1rem",
    color: "#333",
    lineHeight: 1.5,
    maxWidth: 280,
    margin: "0 auto 10px",
  },
  faqList: {
    padding: "10px 14px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  faqItem: {
    border: B,
    borderRadius: R,
    background: "#fafaf5",
    overflow: "hidden",
    transition: "box-shadow 0.15s",
  },
  faqQ: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: 14,
    cursor: "pointer",
    userSelect: "none",
  },
  faqIcon: {
    fontSize: "1.8rem",
    flexShrink: 0,
    width: 36,
    textAlign: "center",
  },
  faqQText: {
    flex: 1,
    fontFamily: "'Bangers', cursive",
    fontSize: "1.05rem",
    letterSpacing: 0.5,
    lineHeight: 1.25,
  },
  faqToggle: {
    fontSize: "1.4rem",
    fontWeight: 900,
    lineHeight: 1,
    color: "#1a1a1a",
    flexShrink: 0,
    transition: "transform 0.3s",
    width: 24,
    textAlign: "center",
  },
  faqAns: {
    fontFamily: "'Patrick Hand', cursive",
    fontSize: "0.95rem",
    lineHeight: 1.6,
    color: "#222",
  },
  faqAnsInner: {
    paddingTop: 8,
    borderTop: "1.5px dashed #aaa",
    position: "relative",
  },
  mountainNote: {
    background: "#FFF176",
    border: B,
    borderRadius: 8,
    padding: "6px 12px",
    fontFamily: "'Patrick Hand', cursive",
    fontWeight: 700,
    fontSize: "0.85rem",
    textAlign: "center",
    float: "right",
    margin: "0 0 8px 10px",
    transform: "rotate(2deg)",
    maxWidth: 120,
    lineHeight: 1.3,
  },
  ansBadge: {
    background: "#FFD600",
    border: B,
    borderRadius: 8,
    padding: "4px 10px",
    fontFamily: "'Patrick Hand', cursive",
    fontWeight: 700,
    fontSize: "0.8rem",
    display: "inline-block",
    margin: "6px 0 4px",
    transform: "rotate(-2deg)",
  },
  stickyRow: {
    margin: "4px 14px",
    display: "flex",
    gap: 10,
  },
  stickyNote: {
    background: "#FFD600",
    border: B,
    borderRadius: 6,
    padding: "12px 14px",
    boxShadow: "3px 3px 0 #1a1a1a",
    fontFamily: "'Patrick Hand', cursive",
    fontWeight: 700,
    fontSize: "1rem",
    lineHeight: 1.3,
    position: "relative",
  },
  dealRow: {
    margin: "4px 14px",
    textAlign: "center",
    fontFamily: "'Patrick Hand', cursive",
    fontWeight: 700,
    fontSize: "1.2rem",
  },
  ctaSection: {
    margin: 14,
    border: B,
    borderRadius: R,
    borderStyle: "dashed",
    padding: "20px 16px",
    textAlign: "center",
    background: "#fffde7",
  },
  ctaTitle: {
    fontFamily: "'Bangers', cursive",
    fontSize: "1.6rem",
    letterSpacing: 2,
    marginBottom: 4,
  },
  ctaSub: {
    fontFamily: "'Patrick Hand', cursive",
    fontStyle: "italic",
    fontSize: "0.95rem",
    marginBottom: 16,
    color: "#444",
  },
  btnAsk: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "#1a1a1a",
    color: "#fafaf5",
    border: B,
    borderRadius: 10,
    padding: "13px 28px",
    fontFamily: "'Bangers', cursive",
    fontSize: "1.2rem",
    letterSpacing: 2,
    cursor: "pointer",
    boxShadow: "4px 4px 0 #555",
    textDecoration: "none",
    transition: "transform 0.1s, box-shadow 0.1s",
  },
  footerTagline: {
    padding: "24px 18px 12px",
    textAlign: "center",
  },
  highlightLine: {
    background: "#FFD600",
    border: B,
    borderRadius: 6,
    padding: "5px 14px",
    display: "inline-block",
    fontFamily: "'Bangers', cursive",
    fontSize: "1.1rem",
    letterSpacing: 1.5,
  },
  bottomNav: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: B,
    padding: "10px 0",
    background: "#fafaf5",
    position: "sticky",
    bottom: 0,
    zIndex: 100,
  },
  bottomNavLink: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    fontFamily: "'Patrick Hand', cursive",
    fontWeight: 700,
    fontSize: "0.72rem",
    color: "#1a1a1a",
    textDecoration: "none",
    letterSpacing: 0.5,
    padding: "4px 8px",
    borderRadius: 8,
    transition: "background 0.15s",
  },
};

// ─── Global CSS (keyframes + Google Fonts) ─────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Patrick Hand:wght@400;700&family=Patrick+Hand&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 999;
    opacity: 0.5;
  }

  @keyframes wiggle {
    0%   { transform: rotate(0); }
    20%  { transform: rotate(-2deg); }
    40%  { transform: rotate(2deg); }
    60%  { transform: rotate(-1deg); }
    80%  { transform: rotate(1deg); }
    100% { transform: rotate(0); }
  }
  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    25%       { transform: rotate(-8deg); }
    75%       { transform: rotate(8deg); }
  }
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    14%       { transform: scale(1.3); }
    28%       { transform: scale(1); }
    42%       { transform: scale(1.3); }
    70%       { transform: scale(1); }
  }
  @keyframes fly {
    from { transform: translateX(0) rotate(-10deg); }
    to   { transform: translateX(6px) rotate(10deg); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .shake    { animation: shake 1.5s ease-in-out infinite; }
  .heartbeat{ animation: heartbeat 1.4s ease infinite; }
  .fly      { display: inline-block; animation: fly 2s ease-in-out infinite alternate; }
  .fade-in > * { animation: fadeUp 0.5s ease both; }
  .fade-in > *:nth-child(1)  { animation-delay: 0.00s; }
  .fade-in > *:nth-child(2)  { animation-delay: 0.05s; }
  .fade-in > *:nth-child(3)  { animation-delay: 0.10s; }
  .fade-in > *:nth-child(4)  { animation-delay: 0.15s; }
  .fade-in > *:nth-child(5)  { animation-delay: 0.20s; }
  .fade-in > *:nth-child(6)  { animation-delay: 0.25s; }
  .fade-in > *:nth-child(7)  { animation-delay: 0.30s; }
  .fade-in > *:nth-child(8)  { animation-delay: 0.35s; }
`;