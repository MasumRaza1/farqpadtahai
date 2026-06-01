"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const CONTACT_DETAILS = [
  {
    icon: "fa-phone-slash",
    title: "CALL KARE KYA?",
    body: (
      <>
        <span style={{ fontWeight: "bold", background: "#fff9c4", padding: "0 4px", borderRadius: 4 }}>
          Utha le re baba! Phone nahi, mujhe.
        </span>{" "}
        Hum GenZ hain, unknown number dekh kar humein panic attack aata hai. Chup chap text/mail kar do.
      </>
    ),
  },
  {
    icon: "fa-location-dot",
    title: "KAHAN MILEGA TU?",
    body: `Office toh nahi hai bhai. Filhaal jahan Wi-Fi mil jaaye, wahi headquarters hai.`,
  },
  {
    icon: "fa-dove",
    title: "KABOOTAR (EMAIL) BHEJO",
    body: (
      <>
        Kyunki humaare paas real kabootar afford karne ke paise nahi bache:{" "}
        <br />
        <span style={{ background: "#111", color: "#FFD600", fontFamily: "'Bangers',cursive", fontSize: "1.1rem", letterSpacing: 0.8, borderRadius: 4, padding: "4px 8px", marginTop: 6, display: "inline-block" }}>
          dukh-dard@farqpadthai.org
        </span>
        <br />
        NGO chala rahe hain, Empire nahi 😭
      </>
    ),
  },
];

const VALIDATION_MSGS = {
  name:    ["Naam toh batao bhai 😤", "Anonymous toh Matrix mein hota hai 😂", "Ek naam toh daalo yaar 🙄"],
  email:   ["Email bina reply kaise karein? 😶", "Valid email chahiye boss 😤", "Spam nahi karenge, pakka 🙏"],
  message: ["Takleef toh batao bhai, kya hua 😑", "Thoda lamba likho, 10 chars se zyada 😄", "Kya kehna tha? Shuru toh karo 🫠"],
};
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ─── Hooks ─────────────────────────────────────────────────────────────────
function useInView(ref, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const ob = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); ob.disconnect(); } },
      { threshold }
    );
    ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return v;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const v = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(22px)", transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function Toast({ msg, show }) {
  return (
    <div style={{
      position: "fixed", bottom: 20, left: "50%",
      transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(120px)",
      background: "#111", color: "#fafaf3", border: B, borderRadius: 12,
      padding: "12px 20px", fontFamily: "'Bangers',cursive", fontSize: "1rem",
      letterSpacing: 1.5, boxShadow: SH, zIndex: 600,
      transition: "transform .4s cubic-bezier(.34,1.56,.64,1)",
      maxWidth: "92vw", textAlign: "center", pointerEvents: "none",
    }}>{msg}</div>
  );
}

// ─── FA Icon ───────────────────────────────────────────────────────────────
const FAI = ({ cls, style = {} }) => <i className={`fa-solid ${cls}`} style={style} />;

// ─── Tape strip ────────────────────────────────────────────────────────────
function Tape() {
  return (
    <div style={{
      position: "absolute", top: -10, left: "50%", transform: "translateX(-50%) rotate(-2deg)",
      width: 100, height: 18, zIndex: 5,
      background: "rgba(255,255,255,0.5)",
      border: "1px solid rgba(0,0,0,0.4)",
      backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",
    }} />
  );
}

// ─── Input / Textarea ──────────────────────────────────────────────────────
function FancyInput({ type = "text", placeholder, value, onChange, onFocus, onBlur, focused, multiline = false }) {
  const base = {
    width: "100%", background: "transparent",
    border: "2px solid #111", padding: "10px",
    fontFamily: "'Patrick Hand',cursive", fontSize: "1.05rem",
    transition: "all .2s", outline: "none",
    boxShadow: focused ? "4px 4px 0 #FFD600" : "2px 2px 0 rgba(0,0,0,0.1)",
    background: focused ? "#fff9c4" : "transparent",
  };
  if (multiline) return (
    <textarea
      placeholder={placeholder} value={value}
      onChange={onChange} onFocus={onFocus} onBlur={onBlur}
      style={{ ...base, borderRadius: "15px 255px 15px 225px / 225px 15px 255px 15px", resize: "vertical", minHeight: 100 }}
    />
  );
  return (
    <input
      type={type} placeholder={placeholder} value={value}
      onChange={onChange} onFocus={onFocus} onBlur={onBlur}
      style={{ ...base, borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px" }}
    />
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [focused, setFocus] = useState({});
  const [alerts, setAlerts] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast]   = useState({ show: false, msg: "" });
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVis(true), 80); }, []);

  const showToast = useCallback((msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3400);
  }, []);

  const hf = (d = 0) => ({
    opacity: heroVis ? 1 : 0,
    transform: heroVis ? "none" : "translateY(22px)",
    transition: `opacity .55s ease ${d}s, transform .55s ease ${d}s`,
  });

  const focusProps = (k) => ({
    onFocus: () => { setFocus(f => ({ ...f, [k]: true }));  setAlerts(a => ({ ...a, [k]: "" })); },
    onBlur:  () => { setFocus(f => ({ ...f, [k]: false })); },
    focused: !!focused[k],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let ok = true;
    const newAlerts = {};
    if (!form.name.trim())             { newAlerts.name    = rand(VALIDATION_MSGS.name);    ok = false; }
    if (!form.email.includes("@"))     { newAlerts.email   = rand(VALIDATION_MSGS.email);   ok = false; }
    if (form.message.trim().length < 10){ newAlerts.message = rand(VALIDATION_MSGS.message); ok = false; }
    setAlerts(newAlerts);
    if (!ok) { showToast("😤 PEHLE SAHI SE FILL KARO BHAI!"); return; }

    setSubmitted(true);
    showToast("🎉 LE BHAI, TERA DARD SUBMIT HO GAYA! REPLY AAYEGA... KABHI NA KABHI!");
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", message: "" });
    }, 3500);
  };

  return (
    <>
      <style>{globalCSS}</style>
      <Toast msg={toast.msg} show={toast.show} />

      <div style={s.page}>

        {/* ── HERO ── */}
        <section style={s.hero}>

          {/* floating doodles */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }} aria-hidden>
            {[["8%","12%",".2s"],["85%","55%",".7s"],["5%","68%","1s"],["70%","78%",".4s"],["50%","8%","1.3s"]].map(([l,t,d],i) => (
              <span key={i} className="floaty" style={{ position:"absolute", left:l, top:t, opacity:.15, animationDelay:d, fontSize: i===4?"1.4rem":"1rem" }}>
                {["✦","★","✈","✦","⚡"][i]}
              </span>
            ))}
          </div>

          <div style={hf(0)}>
            <div style={s.badgeBlack}>Bolo, kya dikkat hai? 🥲</div>
          </div>

          <h1 style={{ ...s.heroTitle, ...hf(0.1) }}>
            JAL LIJIYE...{" "}
            <FAI cls="fa-glass-water" style={{ color:"#40c4dc", fontSize:"2rem", verticalAlign:"middle" }}/>
            <br/>
            THAK GAYE HONGE{" "}
            <span style={s.hlYellow}>CONTACT</span>
            {" "}KARTE KARTE
          </h1>

          <p style={{ ...s.heroSub, ...hf(0.2) }}>
            Hum mind readers nahi hain, message kar do 😭
          </p>

          <div style={{ ...s.doodleArrow, ...hf(0.3) }}>
            <FAI cls="fa-hand-point-down"/>
          </div>
        </section>

        {/* ── FORM ── */}
        <Reveal>
          <section style={s.formSection}>
            <div style={s.formBox}>
              <Tape />

              <form onSubmit={handleSubmit} noValidate>

                {/* Name */}
                <div style={s.formGroup}>
                  <label style={s.label}>
                    TERA NAAM
                    <span style={s.labelSub}>Naam toh suna hi hoga... nahi bhai, jaldi type kar</span>
                  </label>
                  <FancyInput
                    placeholder="e.g. Papa Ki Pari / Munna Bhaiya"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    {...focusProps("name")}
                  />
                  {alerts.name && <AlertMsg msg={alerts.name} />}
                </div>

                {/* Email */}
                <div style={s.formGroup}>
                  <label style={s.label}>
                    EMAIL ID
                    <span style={s.labelSub}>Aadhaar se link nahi karenge, promise. Bas spam aayega</span>
                  </label>
                  <FancyInput
                    type="email"
                    placeholder="baburao_mast_hai@gmail.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    {...focusProps("email")}
                  />
                  {alerts.email && <AlertMsg msg={alerts.email} />}
                </div>

                {/* Message */}
                <div style={s.formGroup}>
                  <label style={s.label}>
                    KYA TAKLEEF HAI AAPKO?
                    <span style={s.labelSub}>Jaldi bol kal subah Panvel nikalna hai</span>
                  </label>
                  <FancyInput
                    multiline
                    placeholder="Dil ki baat, problem, idea...
Sab yahan likh kar do, bindaas! 😎"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    {...focusProps("message")}
                  />
                  {alerts.message && <AlertMsg msg={alerts.message} />}
                </div>

                <button type="submit" style={{
                  ...s.btnSubmit,
                  background: submitted ? "#1a7a1a" : "#111",
                  transition: "background .3s, transform .1s",
                }}>
                  {submitted
                    ? <><FAI cls="fa-check"/> LE BHAI, HO GAYA! 🎉</>
                    : <><FAI cls="fa-paper-plane"/> JAA SIMRAN JAA... SUBMIT HO JAA</>
                  }
                </button>

              </form>
            </div>
          </section>
        </Reveal>

        {/* ── CONTACT DETAILS ── */}
        <section style={s.contactDetails}>
          {CONTACT_DETAILS.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ ...s.detailItem, borderBottom: i < CONTACT_DETAILS.length - 1 ? "2px dashed #ccc" : "none" }}>
                <div style={{ ...s.detailIcon, transform: `rotate(${[-10, 8, -6][i]}deg)` }}>
                  <FAI cls={item.icon} style={{ fontSize: "1.3rem" }}/>
                </div>
                <div>
                  <h3 style={s.detailTitle}>{item.title}</h3>
                  <p style={s.detailBody}>{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ── WARNING NOTE ── */}
        <Reveal>
          <div style={s.warningNote}>
            <FAI cls="fa-triangle-exclamation" style={{ marginRight: 4 }}/>
            P.S. — Form submit kar diya? Shabash. Reply aayega, bas utni speed se nahi jitni speed se tumne expectations bana li hain.
          </div>
        </Reveal>

        {/* ── FOOTER EMOJI ── */}
        <div style={{ textAlign: "center", padding: "20px 0 30px", fontSize: "2rem", color: "#bbb" }}>
          <FAI cls="fa-face-rolling-eyes"/>
        </div>

      </div>
    </>
  );
}

// ─── Alert component ───────────────────────────────────────────────────────
function AlertMsg({ msg }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6, marginTop: 6,
      background: "#FFD600", border: B, borderRadius: 8,
      padding: "6px 10px", fontFamily: "'Patrick Hand',cursive", fontWeight: 700,
      fontSize: ".82rem", lineHeight: 1.3, boxShadow: "3px 3px 0 #111",
      animation: "slideIn .3s ease",
    }}>
      <FAI cls="fa-circle-exclamation" style={{ fontSize: ".85rem", flexShrink: 0 }}/> {msg}
    </div>
  );
}

// ─── Constants ─────────────────────────────────────────────────────────────
const B  = "2.5px solid #111";
const SH = "4px 4px 0 #111";

// ─── Styles ────────────────────────────────────────────────────────────────
const s = {
  page: {
    background: "#fafaf3", color: "#111",
    fontFamily: "'Patrick Hand',cursive", fontSize: 16,
    maxWidth: 480, margin: "0 auto", overflowX: "hidden",
    WebkitFontSmoothing: "antialiased",
  },

  // hero
  hero: {
    padding: "20px 14px 10px", position: "relative",
    display: "flex", flexDirection: "column",
  },
  badgeBlack: {
    background: "#111", color: "#fafaf3",
    fontFamily: "'Patrick Hand',cursive", fontSize: "clamp(.85rem,3.5vw,1rem)",
    padding: "6px 14px", borderRadius: 8, display: "inline-block",
    transform: "rotate(-3deg)", boxShadow: "2px 2px 0 #111",
    letterSpacing: .5, marginBottom: 10,
  },
  heroTitle: {
    fontFamily: "'Patrick Hand',cursive",
    fontSize: "clamp(2.1rem,9vw,3rem)", lineHeight: .95,
    marginTop: 14, marginBottom: 8, letterSpacing: 1.5,
  },
  hlYellow: { background: "#FFD600", padding: "0 4px", borderRadius: 4, display: "inline-block" },
  heroSub: {
    fontFamily: "'Patrick Hand',cursive", fontWeight: 700,
    fontSize: "clamp(1.05rem,4.5vw,1.25rem)", color: "#444", marginBottom: 22,
  },
  doodleArrow: {
    alignSelf: "flex-end", fontSize: "2rem", color: "#111",
    transform: "rotate(45deg)", marginTop: -10,
  },

  // form section
  formSection: { padding: "10px 14px 28px", position: "relative" },
  formBox: {
    background: "#fafaf3", border: B, borderRadius: 6,
    padding: "24px 14px", position: "relative",
    borderTopRightRadius: 15, borderBottomLeftRadius: 15,
    boxShadow: SH, transform: "rotate(1deg)",
  },
  formGroup: { marginBottom: 16, textAlign: "left" },
  label:    { display: "block", fontFamily: "'Bangers',cursive", fontSize: "1.2rem", letterSpacing: .5, marginBottom: 4 },
  labelSub: { fontFamily: "'Patrick Hand',cursive", fontSize: ".92rem", textTransform: "none", fontWeight: 400, color: "#555", display: "block", lineHeight: 1.2 },
  btnSubmit: {
    width: "100%", color: "#FFD600", border: B, borderRadius: 8,
    padding: "13px", marginTop: 10,
    fontFamily: "'Bangers',cursive", fontSize: "1.2rem", letterSpacing: 1.5,
    cursor: "pointer", boxShadow: "2px 2px 0 #111",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
  },

  // contact details
  contactDetails: { padding: "10px 14px 36px", display: "grid", gap: 0 },
  detailItem: { display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: 16, marginBottom: 16 },
  detailIcon: {
    fontSize: "1.3rem", color: "#111", background: "#FFD600",
    width: 45, height: 45, display: "flex", alignItems: "center", justifyContent: "center",
    border: "2px solid #111", borderRadius: "50%", boxShadow: "2px 2px 0 #111",
    flexShrink: 0,
  },
  detailTitle: { fontFamily: "'Bangers',cursive", fontSize: "1.25rem", letterSpacing: .5, marginBottom: 4 },
  detailBody:  { fontFamily: "'Patrick Hand',cursive", fontSize: "1rem", lineHeight: 1.4 },

  // warning note
  warningNote: {
    background: "#FFD600", border: B, borderRadius: 8,
    padding: "12px 14px", margin: "0 14px 36px",
    textAlign: "center", fontFamily: "'Patrick Hand',cursive", fontWeight: 700,
    fontSize: "1.1rem", lineHeight: 1.4,
    transform: "rotate(2deg)", boxShadow: "2px 2px 0 #111",
  },
};

// ─── Global CSS ────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Permanent+Marker&family=Patrick Hand:wght@400;700&family=Patrick+Hand&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; overflow-x: hidden; }

  body::after {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: .55;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
  }

  @keyframes floaty    { from{transform:translateY(0) rotate(0);}    to{transform:translateY(-8px) rotate(12deg);} }
  @keyframes slideIn   { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);}       }
  @keyframes wiggle    { 0%,100%{transform:rotate(0);}               25%{transform:rotate(-3deg);}75%{transform:rotate(3deg);} }

  .floaty { animation: floaty 4s ease-in-out infinite alternate; }

  input::placeholder, textarea::placeholder { color: #bbb; font-size: .9rem; }

  button:active { transform: translate(2px, 2px) !important; box-shadow: none !important; }
`;