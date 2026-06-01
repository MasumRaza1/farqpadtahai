"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const AMOUNT_OPTIONS = [
  { val: "100",    price: "₹100",   desc: "Chai skip karo, ek life better karo.",       icon: "fa-mug-hot",     color: "#7b4f00" },
  { val: "500",    price: "₹500",   desc: "Netflix wali raat? Kisi ki padhai fund karo.", icon: "fa-tv",          color: "#e50914" },
  { val: "1000",   price: "₹1000",  desc: "Biryani do din skip, bacche ka mahina safe.", icon: "fa-bowl-rice",   color: "#e65100" },
  { val: "2500",   price: "₹2500",  desc: "Ek trip cancel, ek zindagi change.",          icon: "fa-plane-slash", color: "#1565c0" },
  { val: "custom", price: "CUSTOM", desc: "Dil bada hai? Amount bhi bada hoga. 😎",      icon: "fa-pen-to-square",color: "#555" },
];

const PAY_MODES = [
  { id: "upi",     icon: "fa-qrcode",           name: "UPI",         desc: "Sabka baap 👑" },
  { id: "card",    icon: "fa-credit-card",       name: "DEBIT/CREDIT",desc: "Plastic love 💳" },
  { id: "netbank", icon: "fa-building-columns",  name: "NET BANKING", desc: "Old but gold 🏦" },
  { id: "wallet",  icon: "fa-wallet",            name: "WALLET",      desc: "Jo hai use karo 👜" },
];

const UPI_ID = "farakpadthai@ybl";

const TRANS_ITEMS = [
  "Har paisa ka hisaab denge",
  "Real updates, no corporate gyaan",
  "Badlao dikhega, guess nahi karna padega",
  "Trust → sabse bada asset, hum jaante hain",
];

const VMSG = {
  fname:   ["Naam toh batao bhai 😤", "Anonymous toh Matrix mein hota hai 😂", "Apna naam likho, darr mat 👀"],
  femail:  ["Email bina OTP kaise aayega? 🙄", "Spamming nahi karenge, seriously 😶", "Valid email chahiye boss 😤"],
  fphone:  ["Number daalo boss, sahi wala 📱", "10 digit hone chahiye, maths yaad hai? 😅"],
  famount: ["₹10 toh daalo bhai, chai se kam nahi 🫠", "Minimum ₹10 chahiye, calculator kholo 😂"],
};
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

const COPY_TOASTS = [
  "COPY HO GAYA! Ab paste karo aur farak karo 📋",
  "CLIPBOARD PE HAI! Screenshot le lo proof ke liye 😎",
  "UPI ID COPY! Bhai ab pay karo, drama band karo 🙄",
  "COPIED BOSS! Ab koi bahana nahi hai donate na karne ka 😤",
];

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

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const v = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : "translateY(22px)",
      transition: `opacity .5s ease ${delay}s, transform .5s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function Toast({ msg, show }) {
  return (
    <div style={{
      position:"fixed", bottom:20, left:"50%",
      transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(120px)",
      background:"#111", color:"#fafaf3", border:B, borderRadius:12,
      padding:"12px 20px", fontFamily:"'Bangers',cursive", fontSize:"1rem",
      letterSpacing:1.5, boxShadow:SH, zIndex:600,
      transition:"transform .4s cubic-bezier(.34,1.56,.64,1)",
      maxWidth:"92vw", textAlign:"center", pointerEvents:"none",
      whiteSpace:"nowrap",
    }}>{msg}</div>
  );
}

// ─── Confetti ──────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!active) return;
    const colors = ["#FFD600","#111","#fff9c4","#e53935","#4caf50","#2196f3"];
    setPieces(Array.from({ length: 65 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: Math.random() * 100,
      w: 6 + Math.random() * 8, h: 6 + Math.random() * 8,
      round: Math.random() > 0.5,
      dur: 1.2 + Math.random() * 2,
      endX: -100 + Math.random() * 200,
      endRot: 360 + Math.random() * 360,
    })));
    const t = setTimeout(() => setPieces([]), 4500);
    return () => clearTimeout(t);
  }, [active]);
  if (!pieces.length) return null;
  const h = typeof window !== "undefined" ? window.innerHeight : 900;
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1000, overflow:"hidden" }}>
      <style>{pieces.map(p =>
        `@keyframes cf${p.id}{0%{transform:translateY(0) translateX(0) rotate(0);opacity:1}100%{transform:translateY(${h+80}px) translateX(${p.endX}px) rotate(${p.endRot}deg);opacity:0}}`
      ).join("")}</style>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:"absolute", left:`${p.left}%`, top:-20,
          width:p.w, height:p.h, background:p.color,
          borderRadius: p.round ? "50%" : 3,
          animation:`cf${p.id} ${p.dur}s ease-in forwards`,
        }}/>
      ))}
    </div>
  );
}

// ─── Field Alert ───────────────────────────────────────────────────────────
function FieldAlert({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      display:"flex", alignItems:"center", gap:6,
      background:"#FFD600", border:B, borderRadius:8,
      padding:"6px 10px", fontFamily:"'Patrick Hand',cursive", fontWeight:700,
      fontSize:".82rem", lineHeight:1.3, marginTop:5,
      boxShadow:"3px 3px 0 #111", animation:"slideIn .3s ease",
    }}>
      <i className="fa-solid fa-circle-exclamation" style={{ fontSize:".85rem", flexShrink:0 }}/> {msg}
    </div>
  );
}

// ─── Form Field ────────────────────────────────────────────────────────────
function FF({ icon, children, full = false, focused = false }) {
  return (
    <div style={{
      ...s.ff,
      gridColumn: full ? "1/-1" : undefined,
      background: focused ? "#fff9c4" : "#fafaf3",
      boxShadow: focused ? SH : "3px 3px 0 #111",
    }}>
      <i className={`fa-solid ${icon}`} style={{ fontSize:".9rem", color:"#777", flexShrink:0 }}/>
      {children}
    </div>
  );
}

// ─── Amount Card ───────────────────────────────────────────────────────────
function AmtCard({ opt, selected, onSelect }) {
  return (
    <div onClick={() => onSelect(opt.val)} style={{
      ...s.amtCard,
      background: selected ? "#FFD600" : "#fafaf3",
      boxShadow: selected ? SH : "3px 3px 0 #111",
    }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:4,
        background: selected ? "#111" : "#FFD600", borderBottom: B }}/>
      <div style={{ display:"flex", justifyContent:"center", margin:"8px 0 4px" }}>
        <div style={{ width:16, height:16, border:B, borderRadius:"50%",
          background: selected ? "#111" : "#fafaf3",
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          {selected && <div style={{ width:6, height:6, borderRadius:"50%", background:"#fafaf3" }}/>}
        </div>
      </div>
      <div style={s.amtPrice}>{opt.price}</div>
      <div style={s.amtDesc}>{opt.desc}</div>
      <i className={`fa-solid ${opt.icon}`} style={{ fontSize:"1.3rem", marginTop:6, color: selected ? "#111" : opt.color }}/>
    </div>
  );
}

// ─── UPI Copy Row ───────────────────────────────────────────────────────────
function UpiCopyRow({ onCopy }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = UPI_ID;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    onCopy(rand(COPY_TOASTS));
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      background:"#fafaf3", border:B, borderRadius:8,
      padding:"8px 12px", marginBottom:4, gap:8,
    }}>
      <div style={{ fontFamily:"'Patrick Hand',cursive", fontWeight:400, fontSize:"1rem", letterSpacing:.5, color:"#111", flex:1 }}>
        <i className="fa-solid fa-at" style={{ fontSize:".85rem", marginRight:4, color:"#555" }}/>
        {UPI_ID}
      </div>
      <button onClick={handleCopy} style={{
        display:"flex", alignItems:"center", gap:5,
        background: copied ? "#1a7a1a" : "#111", color: copied ? "#fff" : "#FFD600",
        border:B, borderRadius:7, padding:"5px 11px",
        fontFamily:"'Bangers',cursive", fontSize:".82rem", letterSpacing:1,
        cursor:"pointer", boxShadow:"2px 2px 0 #555", flexShrink:0,
        transition:"background .2s",
      }}>
        <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} style={{ fontSize:".8rem" }}/>
        {copied ? "COPIED!" : "COPY"}
      </button>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function DonatePage() {
  const [selectedAmt, setSelectedAmt] = useState("500");
  const [customVal,   setCustomVal]   = useState("");
  const [editingAmt,  setEditingAmt]  = useState(false);
  const [editVal,     setEditVal]     = useState("");

  const [form, setForm]     = useState({ fname:"", femail:"", fphone:"", fmsg:"" });
  const [focused, setFocus] = useState({});
  const [alerts, setAlerts] = useState({});

  const [payMode, setPayMode] = useState("upi");
  const [toast, setToast]     = useState({ show:false, msg:"" });
  const [confetti, setConfetti] = useState(false);
  const [btnState, setBtnState] = useState("idle");
  const [heroVis, setHeroVis] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVis(true), 100); }, []);

  const showToast = useCallback((msg) => {
    setToast({ show:true, msg });
    setTimeout(() => setToast(t => ({ ...t, show:false })), 3400);
  }, []);

  // computed amount
  const amountVal = selectedAmt === "custom" ? customVal : editingAmt ? editVal : selectedAmt;
  const isReady = form.fname.trim() && form.femail.includes("@") && form.fphone.trim().length >= 10 && Number(amountVal) >= 10;

  // amount card select
  const handleAmtSelect = (val) => {
    setSelectedAmt(val);
    setEditingAmt(false);
    setEditVal(val === "custom" ? "" : val);
  };

  // edit amount inline
  const startEditAmt = () => {
    if (selectedAmt === "custom") return;
    setEditingAmt(true);
    setEditVal(selectedAmt);
  };
  const commitEditAmt = () => {
    const n = Number(editVal);
    if (!editVal || n < 10) {
      showToast(rand(VMSG.famount));
      setEditVal(selectedAmt);
    } else {
      // check if matches a preset
      const preset = AMOUNT_OPTIONS.find(o => o.val === String(n));
      if (preset) setSelectedAmt(preset.val);
      else { setSelectedAmt("custom"); setCustomVal(String(n)); }
    }
    setEditingAmt(false);
  };

  // focus/blur helpers
  const fp = (k) => ({
    onFocus: () => { setFocus(f => ({...f,[k]:true})); setAlerts(a => ({...a,[k]:""})); },
    onBlur:  () => {
      setFocus(f => ({...f,[k]:false}));
      const v = form[k] ?? "";
      let msg = "";
      if (k==="fname"  && !v.trim())              msg = rand(VMSG.fname);
      if (k==="femail" && !v.includes("@"))        msg = rand(VMSG.femail);
      if (k==="fphone" && v.trim().length < 10)    msg = rand(VMSG.fphone);
      setAlerts(a => ({...a,[k]:msg}));
    },
  });

  const handleSubmit = () => {
    const na = {};
    let ok = true;
    if (!form.fname.trim())                          { na.fname   = rand(VMSG.fname);   ok=false; }
    if (!form.femail.includes("@"))                  { na.femail  = rand(VMSG.femail);  ok=false; }
    if (form.fphone.trim().length < 10)              { na.fphone  = rand(VMSG.fphone);  ok=false; }
    if (Number(amountVal) < 10)                      { na.amount  = rand(VMSG.famount); ok=false; }
    setAlerts(na);
    if (!ok) { showToast("😤 PEHLE SAHI SE FILL KARO BHAI!"); return; }
    setConfetti(true);
    setTimeout(() => setConfetti(false), 4500);
    showToast("🎉 SHUKRIYA BOSS! IMPACT INCOMING! 🎉");
    setBtnState("success");

setForm({
  fname: "",
  femail: "",
  fphone: "",
  fmsg: "",
});

setTimeout(() => {
  setBtnState("idle");
}, 3200);
  };

  const hf = (d) => ({
    opacity: heroVis ? 1 : 0,
    transform: heroVis ? "none" : "translateY(26px)",
    transition: `opacity .55s ease ${d}s, transform .55s ease ${d}s`,
  });

  return (
    <>
      <style>{globalCSS}</style>
      <Toast msg={toast.msg} show={toast.show}/>
      <Confetti active={confetti}/>

      <div style={s.page}>

        {/* ── HERO ── */}
        <div style={s.hero}>
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }} aria-hidden>
            {[["6%","20%",".3s"],["88%","55%",".8s"],["75%","10%","1.2s"],["10%","78%",".6s"],["50%","88%","1s"]].map(([l,t,d],i)=>(
              <span key={i} className="floaty" style={{ position:"absolute",left:l,top:t,fontSize:"1rem",opacity:.15,animationDelay:d }}>
                {["✦","★","⚡","✈","◇"][i]}
              </span>
            ))}
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14, gap:8, ...hf(0) }}>
            <div className="speech-l" style={s.speechBubble}>AAJ KA KHARCHA<br/> THODE <span style={s.hl}>ACHHE KAAM</span><br/>PE! ☺️</div>
            <div className="speech-r" style={s.speechBubble}>DONATION DO<br/>VARNA <span style={s.hl}>RESULTS</span><br/>KHUD BHUGTO 😤</div>
          </div>

          <div style={{ textAlign:"center" }}>
            <h1 style={{ ...s.heroH1, ...hf(0.1) }}>
              HUM KARTE HAIN<br/>
              <span style={s.yline}>PARABANDH!</span>
            </h1>
            <p style={{ ...s.heroSub, ...hf(0.2) }}>Dil se support hota hai,<br/>Par QR code bhi scan karna padta hai 😭</p>
            <div style={{ ...s.impactBadge, ...hf(0.3) }}>
              <i className="fa-solid fa-bullseye"/> CHOOSE YOUR IMPACT LEVEL
            </div>
          </div>
        </div>

        <hr style={s.div}/>

        {/* ── AMOUNT ── */}
        <Reveal>
          <div style={s.sb}>
            <div style={s.sbl}><i className="fa-solid fa-indian-rupee-sign"/> KITNA DOGE?</div>
            <div style={s.sbsub}>(no judgment — chhota bhi, bada bhi, sab chalega 👀)</div>

            {/* 5-card scroll row — negative margin escapes parent padding so cards go edge-to-edge */}
            <div style={{
              overflowX:"auto", overflowY:"visible",
              marginLeft:-12, marginRight:-12,
              paddingLeft:12, paddingRight:12,
              paddingBottom:8,
              WebkitOverflowScrolling:"touch",
            }}>
              <div style={{
                display:"flex", gap:10,
                width:"max-content",
              }}>
                {AMOUNT_OPTIONS.map(opt => (
                  <AmtCard key={opt.val} opt={opt} selected={selectedAmt===opt.val} onSelect={handleAmtSelect}/>
                ))}
                {/* trailing spacer so last card isn't flush against edge */}
                <div style={{ width:4, flexShrink:0 }}/>
              </div>
            </div>

            {/* editable amount pill */}
            <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".9rem", color:"#555" }}>
                Amount selected:
              </span>
              {editingAmt ? (
                <div style={{ display:"flex", alignItems:"center", gap:6, background:"#fff9c4", border:B, borderRadius:20, padding:"5px 12px", boxShadow:"3px 3px 0 #111" }}>
                  <i className="fa-solid fa-indian-rupee-sign" style={{ fontSize:".85rem", color:"#555" }}/>
                  <input
                    autoFocus type="number" min="10"
                    value={editVal}
                    onChange={e => setEditVal(e.target.value)}
                    onBlur={commitEditAmt}
                    onKeyDown={e => e.key==="Enter" && commitEditAmt()}
                    style={{ width:80, border:"none", outline:"none", background:"transparent", fontFamily:"'Bangers',cursive", fontSize:"1.1rem", color:"#111" }}
                  />
                  <button onClick={commitEditAmt} style={{ background:"#111", color:"#FFD600", border:B, borderRadius:6, padding:"3px 8px", fontFamily:"'Bangers',cursive", fontSize:".8rem", cursor:"pointer" }}>OK</button>
                </div>
              ) : (
                <div onClick={startEditAmt} title="Click to edit" style={{
                  display:"flex", alignItems:"center", gap:6,
                  background: selectedAmt==="custom" ? "#FFD600" : "#111",
                  color: selectedAmt==="custom" ? "#111" : "#FFD600",
                  border:B, borderRadius:20, padding:"5px 14px",
                  fontFamily:"'Bangers',cursive", fontSize:"1.15rem", letterSpacing:1,
                  cursor:"pointer", boxShadow:"3px 3px 0 #555",
                }}>
                  ₹{amountVal || "??"}
                  {selectedAmt !== "custom" && (
                    <i className="fa-solid fa-pen-to-square" style={{ fontSize:".75rem", opacity:.7 }}/>
                  )}
                </div>
              )}
              {selectedAmt==="custom" && (
                <span style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".78rem", color:"#888" }}>
                  (min ₹10)
                </span>
              )}
            </div>

            {/* custom input */}
            {selectedAmt === "custom" && (
              <div style={{ ...s.customWrap, marginTop:8 }}>
                <i className="fa-solid fa-indian-rupee-sign" style={{ fontSize:".9rem", color:"#555" }}/>
                <input autoFocus type="number" min="10" placeholder="Apna amount daalo boss... (min ₹10)"
                  value={customVal} onChange={e => setCustomVal(e.target.value)} style={s.customInput}/>
              </div>
            )}
            {alerts.amount && <FieldAlert msg={alerts.amount}/>}
          </div>
        </Reveal>

        <hr style={s.div}/>

        {/* ── FORM ── */}
        <Reveal delay={0.04}>
          <div style={s.sb}>
            <div style={s.sbl}><i className="fa-solid fa-clipboard-list"/> ENTER DETAILS</div>
            <div style={s.sbsub}>(hum bhi serious hote hain thoda 🥱)</div>

            {/* Name */}
            <FF icon="fa-user" focused={!!focused.fname}>
              <input type="text" name="name" autoComplete="name"
                placeholder="Full Name (pyaar se batao)"
                value={form.fname} onChange={e=>setForm(f=>({...f,fname:e.target.value}))}
                {...fp("fname")} style={s.inp}/>
            </FF>
            <FieldAlert msg={alerts.fname}/>

            {/* Email */}
            <div style={{ marginTop:9 }}>
              <FF icon="fa-envelope" focused={!!focused.femail}>
                <input type="email" name="email" autoComplete="email" inputMode="email"
                  placeholder="Email (spamming nahi, promise)"
                  value={form.femail} onChange={e=>setForm(f=>({...f,femail:e.target.value}))}
                  {...fp("femail")} style={s.inp}/>
              </FF>
              <FieldAlert msg={alerts.femail}/>
            </div>

            {/* Phone */}
            <div style={{ marginTop:9 }}>
              <FF icon="fa-mobile-screen" focused={!!focused.fphone}>
                <input type="tel" name="tel" autoComplete="tel" inputMode="tel"
                  placeholder="Mobile (bas OTP ke liye)"
                  value={form.fphone} onChange={e=>setForm(f=>({...f,fphone:e.target.value}))}
                  {...fp("fphone")} style={s.inp}/>
              </FF>
              <FieldAlert msg={alerts.fphone}/>
            </div>

            {/* Message */}
            <div style={{ marginTop:9 }}>
              <FF icon="fa-comment-dots" full focused={!!focused.fmsg}>
                <textarea placeholder="Message (optional — dil khol ke bolo 💛)"
                  value={form.fmsg}
                  onChange={e=>setForm(f=>({...f,fmsg:e.target.value}))}
                  onFocus={()=>setFocus(f=>({...f,fmsg:true}))}
                  onBlur={()=>setFocus(f=>({...f,fmsg:false}))}
                  style={{ ...s.inp, resize:"none", minHeight:60 }}/>
              </FF>
            </div>

            <div style={{ marginTop:12, display:"flex", alignItems:"center", gap:8, fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".9rem" }}>
              <span style={{ fontSize:"2rem" }}>😑</span>
              <span>Details daalo bhai, <span style={s.hl}>IMPACT</span> wait kar raha hai!</span>
            </div>
          </div>
        </Reveal>

        <hr style={s.div}/>

        {/* ── PAYMENT ── */}
        <Reveal delay={0.04}>
          <div style={s.sb}>
            <div style={s.sbl}><i className="fa-solid fa-wallet"/> PAYMENT MODE</div>
            <div style={s.sbsub}>(paise ka kya hai, karte raho 💸)</div>

            <div style={s.payGrid}>
              {PAY_MODES.map(pm => (
                <div key={pm.id} onClick={()=>setPayMode(pm.id)} style={{
                  ...s.payCard,
                  background: payMode===pm.id ? "#FFD600" : "#fafaf3",
                }}>
                  <i className={`fa-solid ${pm.icon}`} style={{ fontSize:"1.2rem", marginBottom:4, display:"block" }}/>
                  <div style={s.payName}>{pm.name}</div>
                  <div style={s.payDesc}>{pm.desc}</div>
                </div>
              ))}
            </div>

            {/* QR Box */}
            <div style={s.qrBox}>
              <div style={s.qrIco}>
                <i className="fa-solid fa-qrcode" style={{ fontSize:"2rem" }}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".82rem", color:"#555", marginBottom:4 }}>
                  Scan karo, pay karo, screenshot bhejo (agar mood ho 😎)
                </div>
                <UpiCopyRow onCopy={showToast}/>
                <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".75rem", color:"#888", marginTop:3 }}>
                  Copy button dabao, paste karo app mein, done! 😂
                </div>
              </div>
            </div>

            <div style={{ textAlign:"center", fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".88rem", color:"#555", marginTop:4 }}>
              QR scan karo ya copy-paste? Tumhari marzi, <span style={s.hl}>IMPACT FIX!</span> ✦
            </div>
          </div>
        </Reveal>

        <hr style={s.div}/>

      

        {/* ── DONATE BUTTON — big, dramatic, unmissable ── */}
        <Reveal delay={0.04}>
          <div style={{ padding:"20px 12px 32px" }}>

            {/* amount preview strip */}
            <div style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              background:"#fff9c4", border:B, borderRadius:12,
              padding:"10px 14px", marginBottom:14,
              boxShadow:"3px 3px 0 #111",
            }}>
              <div>
                <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".78rem", color:"#777" }}>TU DE RAHA HAI</div>
                <div style={{ fontFamily:"'Bangers',cursive", fontSize:"1.6rem", letterSpacing:1.5, lineHeight:1 }}>
                  ₹{amountVal || "??"}
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".78rem", color:"#777" }}>PAYMENT VIA</div>
                <div style={{ fontFamily:"'Bangers',cursive", fontSize:".95rem", letterSpacing:.5 }}>
                  {PAY_MODES.find(p=>p.id===payMode)?.name || "UPI"}
                </div>
              </div>
              <div style={{
                background: isReady ? "#FFD600" : "#eee",
                border:B, borderRadius:8, padding:"4px 10px",
                fontFamily:"'Bangers',cursive", fontSize:".75rem", letterSpacing:.5,
                color: isReady ? "#111" : "#aaa",
                transition:"background .3s",
              }}>
                {isReady ? "READY ✓" : "FILL KARO"}
              </div>
            </div>

            {/* main CTA button */}
            <button
              onClick={handleSubmit}
              style={{
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:4, width:"100%",
                background: btnState==="success" ? "#1a7a1a"
                  : isReady ? "#111" : "#333",
                color: "#fafaf3",
                border: `3px solid ${btnState==="success" ? "#0d5c0d" : "#111"}`,
                borderRadius:16,
                padding:"18px 20px 14px",
                fontFamily:"'Bangers',cursive",
                cursor:"pointer",
                boxShadow: isReady
                  ? (btnState==="success" ? "0 0 0 4px #FFD600, 5px 5px 0 #111" : "0 0 0 4px #FFD600, 5px 5px 0 #111")
                  : "3px 3px 0 #555",
                transition:"background .3s, box-shadow .3s, transform .12s",
                marginBottom:12,
                position:"relative", overflow:"hidden",
                transform: isReady ? "scale(1)" : "scale(0.97)",
              }}
            >
              {/* shimmer when ready */}
              {isReady && btnState==="idle" && (
                <div className="btn-shimmer" style={{
                  position:"absolute", inset:0, pointerEvents:"none",
                }}/>
              )}

              {btnState === "success" ? (
                <>
                  <div style={{ fontSize:"1.8rem", letterSpacing:2, lineHeight:1 }}>
                    <i className="fa-solid fa-check" style={{ marginRight:8 }}/>
                    SHUKRIYA BOSS!
                  </div>
                  <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:"1rem", opacity:.85, letterSpacing:0 }}>
                    Impact aa raha hai... seriously 🎉
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize:"1.7rem", letterSpacing:2, lineHeight:1, display:"flex", alignItems:"center", gap:10 }}>
                    <i className="fa-solid fa-paper-plane" style={{ fontSize:"1.4rem" }}/>
                    DONATE NOW
                    <i className="fa-solid fa-heart heartbeat" style={{ color:"#FFD600", fontSize:"1.2rem" }}/>
                  </div>
                  <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".88rem", opacity: isReady ? .75 : .5, letterSpacing:0 }}>
                    {isReady
                      ? "Ek click, kisi ki duniya change 🌟"
                      : "Pehle form fill karo bhai 😑"}
                  </div>
                </>
              )}
            </button>
            

            {/* trust micro-badges row */}
            <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:10 }}>
              {[
                { icon:"fa-shield-halved", label:"100% Secure" },
                { icon:"fa-receipt",       label:"80G Receipt" },
                { icon:"fa-lock",          label:"Encrypted" },
                { icon:"fa-rotate-left",   label:"Cancel Anytime" },
              ].map((b,i)=>(
                <div key={i} style={{
                  display:"flex", alignItems:"center", gap:4,
                  background:"#f0f0e8", border:"1.5px solid #ccc",
                  borderRadius:20, padding:"4px 10px",
                  fontFamily:"'Patrick Hand',cursive", fontSize:".75rem", fontWeight:700, color:"#555",
                }}>
                  <i className={`fa-solid ${b.icon}`} style={{ fontSize:".7rem", color:"#111" }}/> {b.label}
                </div>
              ))}
            </div>
              {/* ── TRANSPARENCY ── */}
        <Reveal delay={0.04}>
          <div style={s.sb}>
            <div style={s.transBox}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                <i className="fa-solid fa-shield-halved" style={{ fontSize:"1.3rem" }}/>
                <div>
                  <div style={{ fontFamily:"'Bangers',cursive", fontSize:"1.05rem", letterSpacing:1 }}>100% TRANSPARENT</div>
                  <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".75rem", color:"#555" }}>(jitna humse ho paye utna 😅)</div>
                </div>
              </div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:7 }}>
                {TRANS_ITEMS.map((item,i) => (
                  <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:7, fontFamily:"'Patrick Hand',cursive", fontSize:".88rem" }}>
                    <i className="fa-solid fa-check" style={{ color:"green", fontSize:".8rem", marginTop:3, flexShrink:0 }}/> {item}
                  </li>
                ))}
              </ul>
              <div style={s.transNote}>
                ARE BHAI! ITNE<span style={{ ...s.hl, textDecoration:"underline", textDecorationStyle:"wavy" }}>HONEST</span> NGO KAM HI MILTE HAIN! ☺️
              </div>
            </div>
          </div>
        </Reveal>

            <p style={{ textAlign:"center", fontFamily:"'Patrick Hand',cursive", fontSize:".88rem", color:"#888", lineHeight:1.4 }}>
              Thoda sa farak, kisi ki duniya badal sakta hai.{" "}
              <span style={s.hl}>✦</span>
              <br/>
              <span style={{ fontSize:".78rem" }}>(aur tax bhi bachega — 80G wali baat hai :)</span>
            </p>
          </div>
        </Reveal>

      </div>
    </>
  );
}

// ─── Tokens ────────────────────────────────────────────────────────────────
const B  = "2.5px solid #111";
const SH = "4px 4px 0 #111";

const s = {
  page:        { background:"#fafaf3", color:"#111", fontFamily:"'Patrick Hand',cursive", fontSize:16, maxWidth:480, margin:"0 auto", overflowX:"hidden" },
  hero:        { padding:"24px 12px 16px", position:"relative", overflow:"hidden" },
  heroH1:      { fontFamily:"'Bangers',cursive", fontSize:"2.3rem", letterSpacing:2, lineHeight:1.1, marginBottom:6 },
  yline:       { display:"inline-block", background:"#FFD600", border:B, borderRadius:6, padding:"0 10px", boxShadow:"3px 3px 0 #111", transform:"rotate(-1deg)" },
  heroSub:     { fontFamily:"'Patrick Hand',cursive", fontSize:"1rem", color:"#444", marginBottom:14 },
  impactBadge: { display:"inline-flex", alignItems:"center", gap:6, background:"#FFD600", border:B, borderRadius:24, padding:"8px 18px", fontFamily:"'Bangers',cursive", fontSize:".95rem", letterSpacing:1.5, cursor:"pointer", boxShadow:"3px 3px 0 #111" },
  speechBubble:{ border:B, borderRadius:14, padding:"9px 11px", fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".8rem", lineHeight:1.3, maxWidth:128, textAlign:"center", background:"#fafaf3", boxShadow:"3px 3px 0 #111", position:"relative", flexShrink:0 },
  hl:          { background:"#FFD600", padding:"0 3px", borderRadius:3 },
  div:         { border:"none", borderTop:B, borderTopStyle:"dashed", margin:"0" },
  sb:          { padding:"18px 12px" },
  sbl:         { fontFamily:"'Bangers',cursive", fontSize:"1.3rem", letterSpacing:1.5, marginBottom:2, display:"flex", alignItems:"center", gap:6, borderBottom:"3px solid #FFD600", paddingBottom:4 },
  sbsub:       { fontFamily:"'Patrick Hand',cursive", fontSize:".82rem", color:"#555", marginBottom:12, marginTop:3 },

  // amount
  amtCard:     { flex:"0 0 108px", width:108, border:B, borderRadius:14, padding:"12px 8px 10px", cursor:"pointer", background:"#fafaf3", textAlign:"center", position:"relative", overflow:"hidden", userSelect:"none", transition:"background .15s, box-shadow .15s" },
  amtPrice:    { fontFamily:"'Bangers',cursive", fontSize:"1.1rem", letterSpacing:.5, marginBottom:2 },
  amtDesc:     { fontFamily:"'Patrick Hand',cursive", fontSize:".72rem", color:"#444", lineHeight:1.25 },
  customWrap:  { border:B, borderRadius:14, padding:"11px 13px", background:"#fafaf3", boxShadow:"3px 3px 0 #111", display:"flex", alignItems:"center", gap:10 },
  customInput: { flex:1, border:"none", outline:"none", background:"transparent", fontFamily:"'Patrick Hand',cursive", fontSize:".95rem", color:"#111" },

  // form
  ff:          { border:B, borderRadius:14, padding:"11px 12px", background:"#fafaf3", boxShadow:"3px 3px 0 #111", display:"flex", alignItems:"center", gap:8, transition:"box-shadow .2s, background .2s" },
  inp:         { flex:1, border:"none", outline:"none", background:"transparent", fontFamily:"'Patrick Hand',cursive", fontSize:".86rem", color:"#111", width:"100%" },

  // payment
  payGrid:     { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:12 },
  payCard:     { border:B, borderRadius:10, padding:"10px 4px", textAlign:"center", cursor:"pointer", background:"#fafaf3", boxShadow:"3px 3px 0 #111", transition:"background .15s" },
  payName:     { fontFamily:"'Bangers',cursive", fontSize:".68rem", letterSpacing:.5, lineHeight:1.1 },
  payDesc:     { fontFamily:"'Patrick Hand',cursive", fontSize:".6rem", color:"#555", marginTop:2 },
  qrBox:       { border:B, borderRadius:14, borderStyle:"dashed", padding:12, background:"#fff9c4", display:"flex", alignItems:"flex-start", gap:12, boxShadow:"3px 3px 0 #111", marginBottom:8 },
  qrIco:       { width:62, height:62, flexShrink:0, border:B, borderRadius:8, background:"#fafaf3", display:"flex", alignItems:"center", justifyContent:"center", marginTop:32 },

  // transparency
  transBox:    { border:B, borderRadius:14, padding:14, background:"#fafaf3", boxShadow:SH, marginBottom:4 },
  transNote:   { marginTop:10, fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".85rem", lineHeight:1.4, textAlign:"center", background:"#FFD600", border:B, borderRadius:8, padding:"8px 12px", transform:"rotate(-1deg)" },

  // button (kept for reference)
  btnDonate:   { display:"flex", alignItems:"center", justifyContent:"center", gap:10, width:"100%", color:"#fafaf3", border:B, borderRadius:12, padding:"15px 20px", fontFamily:"'Bangers',cursive", fontSize:"1.45rem", letterSpacing:2, cursor:"pointer", boxShadow:SH, marginBottom:8 },
};

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Patrick Hand:wght@400;700&family=Patrick+Hand&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body::after {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: .45;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
  }

  @keyframes floaty   { from{transform:translateY(0) rotate(0);}   to{transform:translateY(-8px) rotate(12deg);} }
  @keyframes heartbeat{ 0%,100%{transform:scale(1);}14%{transform:scale(1.3);}28%{transform:scale(1);}42%{transform:scale(1.3);}70%{transform:scale(1);} }
  @keyframes wiggle   { 0%,100%{transform:rotate(0);}25%{transform:rotate(-3deg);}75%{transform:rotate(3deg);} }
  @keyframes slideIn  { from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);} }

  .floaty   { animation: floaty 4s ease-in-out infinite alternate; }
  .heartbeat{ animation: heartbeat 1.4s ease infinite; }

  .speech-l::after  { content:''; position:absolute; bottom:-13px; left:16px; width:0; height:0; border-left:9px solid transparent; border-right:9px solid transparent; border-top:13px solid #111; }
  .speech-l::before { content:''; position:absolute; bottom:-10px; left:17px; width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:11px solid #fafaf3; z-index:1; }
  .speech-r::after  { content:''; position:absolute; bottom:-13px; right:16px; width:0; height:0; border-left:9px solid transparent; border-right:9px solid transparent; border-top:13px solid #111; }
  .speech-r::before { content:''; position:absolute; bottom:-10px; right:17px; width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-top:11px solid #fafaf3; z-index:1; }

  input::placeholder, textarea::placeholder { color: #bbb; font-size: .82rem; }

  @keyframes shimmer { 0%{transform:translateX(-100%) skewX(-15deg);} 100%{transform:translateX(250%) skewX(-15deg);} }
  .btn-shimmer::before {
    content: '';
    position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,214,0,0.18), transparent);
    animation: shimmer 2.2s ease-in-out infinite;
  }

  /* scrollbar for amount row */
  .amounts-scroll::-webkit-scrollbar { height: 3px; }
  .amounts-scroll::-webkit-scrollbar-thumb { background: #111; border-radius: 4px; }
`;