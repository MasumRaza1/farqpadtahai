"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const SKILLS = [
  { id: "events",    icon: "fa-bullhorn",    label: "EVENTS &\nCAMPAIGNS" },
  { id: "content",   icon: "fa-pen-nib",     label: "CONTENT &\nSOCIAL MEDIA" },
  { id: "photo",     icon: "fa-camera",      label: "PHOTOGRAPHY /\nVIDEOGRAPHY" },
  { id: "teaching",  icon: "fa-heart",       label: "TEACHING &\nMENTORING" },
  { id: "community", icon: "fa-seedling",    label: "COMMUNITY\nOUTREACH" },
  { id: "design",    icon: "fa-palette",     label: "DESIGN &\nCREATIVES" },
  { id: "tech",      icon: "fa-code",        label: "TECH &\nWEBSITE" },
  { id: "other",     icon: "fa-ellipsis",    label: "KUCH BHI KAR\nLUNGA BHAI!\n(OTHER)" },
];

const TIME_OPTS = [
  { id: "weekend",  label: "WEEKEND\nWARRIOR 🛡️" },
  { id: "2-4",      label: "2-4 HRS /\nWEEK ⏱️" },
  { id: "4-8",      label: "4-8 HRS /\nWEEK 💪" },
  { id: "flexible", label: "FLEXIBLE\nHOON BHAI 🤷" },
  { id: "fulltime", label: "FULL TIME\nMISSION MODE 🚀" },
];

const CITIES = [
  "Mumbai","Delhi","Bangalore","Hyderabad","Chennai","Kolkata",
  "Pune","Ahmedabad","Jaipur","Lucknow","Bhopal","Indore",
  "Koi aur jagah (Other)",
];

const EXPECTATIONS = [
  { icon: "fa-face-smile",       color: "inherit", text: "Fun team – boring log nahi hain hum" },
  { icon: "fa-heart",            color: "#e53935",  text: "Real impact – feel hoga, sirf dikhega nahi" },
  { icon: "fa-glasses",          color: "inherit",  text: "Learning 24/7 – har din kuch naya" },
  { icon: "fa-face-laugh-squint",color: "inherit",  text: "Memes allowed – officially 😎" },
];

const VMSG = {
  vname:  ["Naam toh daalo bhai 😤","Anonymous toh hacker hote hain 😂","Naam likho, darr mat!"],
  vemail: ["Email bina kaise contact karein? 🙄","Valid email chahiye boss","Spam nahi karenge, seriously 🙏"],
  vphone: ["Mobile number daalo, WhatsApp pe meme bhejenge 😎","10 digit hone chahiye bhai"],
  vcity:  ["City batao, field mein kaam hai wahan 📍","Apna area toh batao yaar"],
  skills: ["Koi ek toh skill select karo boss 😅","Ek skill select karo, koi judge nahi karega"],
  time:   ["Kitna time doge? Ek toh batao 😐","Time commitment toh select karo yaar"],
  vwhy:   ["Kyun volunteer karna hai? Copy-paste mat karo, dil se likho 💛","Thoda lamba likho bhai, 20 words se zyada 😄"],
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

// ─── Reveal ────────────────────────────────────────────────────────────────
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
      position:"fixed", bottom:16, left:"50%",
      transform: show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(120px)",
      background:"#111", color:"#fafaf3", border:B, borderRadius:12,
      padding:"12px 20px", fontFamily:"'Bangers',cursive", fontSize:"1rem",
      letterSpacing:1.5, boxShadow:SH, zIndex:600,
      transition:"transform .4s cubic-bezier(.34,1.56,.64,1)",
      whiteSpace:"nowrap", textAlign:"center", maxWidth:"92vw",
      pointerEvents:"none",
    }}>{msg}</div>
  );
}

// ─── Confetti ──────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!active) return;
    const colors = ["#FFD600","#111","#fff9c4","#e53935","#4caf50","#2196f3"];
    setPieces(Array.from({ length: 70 }, (_, i) => ({
      id: i, color: colors[i % colors.length],
      left: Math.random() * 100, w: 6 + Math.random() * 8, h: 6 + Math.random() * 8,
      round: Math.random() > 0.5, dur: 1.2 + Math.random() * 2,
      endX: -80 + Math.random() * 160, endRot: 360 + Math.random() * 360,
    })));
    const t = setTimeout(() => setPieces([]), 4500);
    return () => clearTimeout(t);
  }, [active]);
  if (!pieces.length) return null;
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1000, overflow:"hidden" }}>
      <style>{pieces.map(p =>
        `@keyframes cf${p.id}{0%{transform:translateY(0) translateX(0) rotate(0);opacity:1}100%{transform:translateY(${typeof window!=="undefined"?window.innerHeight+80:900}px) translateX(${p.endX}px) rotate(${p.endRot}deg);opacity:0}}`
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

// ─── FA Icon helper ─────────────────────────────────────────────────────────
const FAI = ({ cls, style = {} }) => <i className={`fa-solid ${cls}`} style={style} />;

// ─── Form Field ────────────────────────────────────────────────────────────
function FF({ icon, children, full = false, focusKey, focusedMap }) {
  const focused = focusedMap?.[focusKey];
  return (
    <div style={{
      ...s.ff,
      gridColumn: full ? "1 / -1" : undefined,
      boxShadow: focused ? SH : "3px 3px 0 #111",
      background: focused ? "#fff9c4" : "#fafaf3",
    }}>
      <FAI cls={icon} style={{ fontSize:".92rem", color:"#777", flexShrink:0 }}/>
      {children}
    </div>
  );
}

// ─── Skill Chip ────────────────────────────────────────────────────────────
function SkillChip({ skill, checked, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      ...s.skillChip,
      background: checked ? "#FFD600" : "#fafaf3",
      animation: checked ? "wiggle .35s ease" : "none",
    }}>
      <div style={{
        width:18, height:18, border:B, borderRadius:4, flexShrink:0,
        background: checked ? "#111" : "#fafaf3",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {checked && <FAI cls="fa-check" style={{ color:"#fafaf3", fontSize:".6rem" }}/>}
      </div>
      <FAI cls={skill.icon} style={{ fontSize:"1rem", flexShrink:0, color:"#111" }}/>
      <div style={s.skillLbl}>{skill.label.split("\n").map((l,i) => <span key={i}>{l}{i < skill.label.split("\n").length-1 && <br/>}</span>)}</div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function VolunteerPage() {
  const [form, setForm]         = useState({ vname:"", vemail:"", vphone:"", vdob:"", vcity:"", vwhy:"", vlinkedin:"" });
  const [focused, setFocused]   = useState({});
  const [skills, setSkills]     = useState([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [fileName, setFileName] = useState("");
  const [toast, setToast]       = useState({ show:false, msg:"" });
  const [confetti, setConfetti] = useState(false);
  const [btnState, setBtnState] = useState("idle");
  const [heroVis, setHeroVis]   = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => { setTimeout(() => setHeroVis(true), 100); }, []);

  const showToast = useCallback((msg) => {
    setToast({ show:true, msg });
    setTimeout(() => setToast(t => ({ ...t, show:false })), 3200);
  }, []);

  const toggleSkill = (id) =>
    setSkills(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleFile = (e) => {
    if (e.target.files.length) setFileName(e.target.files[0].name);
  };

  const handleSubmit = () => {
    if (!form.vname.trim())                     { showToast(rand(VMSG.vname));  return; }
    if (!form.vemail.includes("@"))             { showToast(rand(VMSG.vemail)); return; }
    if (form.vphone.trim().length < 10)         { showToast(rand(VMSG.vphone)); return; }
    if (!form.vcity)                            { showToast(rand(VMSG.vcity));  return; }
    if (!skills.length)                         { showToast(rand(VMSG.skills)); return; }
    if (!timeSlot)                              { showToast(rand(VMSG.time));   return; }
    if (form.vwhy.trim().length < 20)           { showToast(rand(VMSG.vwhy));  return; }

    setConfetti(true);
    setTimeout(() => setConfetti(false), 4500);
    showToast("🚀 WELCOME TO THE FARAK FAMILY! 🚀");
    setBtnState("success");

setTimeout(() => {
  setForm({
    vname: "",
    vemail: "",
    vphone: "",
    vdob: "",
    vcity: "",
    vwhy: "",
    vlinkedin: "",
  });

  setSkills([]);
  setTimeSlot("");
  setFileName("");

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  setBtnState("idle");
}, 3500);
  };

  const hf = (d) => ({
    opacity: heroVis ? 1 : 0,
    transform: heroVis ? "none" : "translateY(22px)",
    transition: `opacity .55s ease ${d}s, transform .55s ease ${d}s`,
  });

  const setF = (k) => ({ onFocus:() => setFocused(f=>({...f,[k]:true})), onBlur:() => setFocused(f=>({...f,[k]:false})) });
  const inp = { ...s.inp };

  return (
    <>
      <style>{globalCSS}</style>
      <Toast msg={toast.msg} show={toast.show} />
      <Confetti active={confetti} />

      <div style={s.page}>

        {/* ── HERO ── */}
        <section style={s.hero}>
          <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }} aria-hidden>
            {[["5%","15%",".3s"],["88%","50%",".8s"],["72%","8%","1.2s"],["8%","80%",".6s"],["45%","90%","1s"]].map(([l,t,d],i)=>(
              <span key={i} className="floaty" style={{ position:"absolute", left:l, top:t, fontSize:i===2?"1.3rem":"1rem", opacity:.15, animationDelay:d }}>
                {["✦","★","⚡","✈","◇"][i]}
              </span>
            ))}
          </div>

          {/* bubbles */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:14, ...hf(0) }}>
            <div style={{ ...s.bubble, transform:"rotate(-2deg)" }}>
              AAJ TU,<br/>KAL KA <span style={s.hl}>HERO.</span><br/>(SOCIETY KA) 😤
            </div>
            <div style={{ ...s.bubble, transform:"rotate(1.5deg)" }}>
              RESUME MEIN<br/>NAHI TOH LIFE<br/>MEIN <span style={s.hl}>KAAM</span><br/>AAYEGA! 😂
            </div>
          </div>

          <div style={{ textAlign:"center" }}>
            <h1 style={{ ...s.heroH1, ...hf(0.1) }}>
              VOLUNTEER BANNA HAI?
              <span style={s.yline}>WAH BHAI WAH!</span>
            </h1>
            <p style={{ ...s.heroSub, ...hf(0.2) }}>
              Time hai? Passion hai?<br/>
              Bas thoda sa farak laane ka<br/>junoon chahiye. 💛
            </p>
            <a href="#form-start" style={{ ...s.btnCta, ...hf(0.3) }}>
              CHAL, FORM BHAR! <FAI cls="fa-arrow-down"/>
            </a>
            <span className="bounce-down" style={{ fontSize:"1.5rem", display:"block", marginTop:10 }}>⬇</span>
          </div>
        </section>

        <hr style={s.div}/>

        {/* ── BASIC DETAILS ── */}
        <Reveal>
          <div id="form-start" style={s.sb}>
            <div style={s.sbl}><FAI cls="fa-id-card"/> TERI BASIC DETAILS</div>
            <div style={s.sbsub}>(formality, samjh le :))</div>
            <div style={s.fgrid}>
              <form autoComplete="on" style={s.fgrid}>
              <FF icon="fa-user" focusKey="vname" focusedMap={focused}>
  <input
    style={inp}
    type="text"
    name="name"
    autoComplete="name"
    placeholder="Full Name (asli wala, nickname nahi)"
    value={form.vname}
    onChange={e => setForm(f => ({ ...f, vname: e.target.value }))}
    {...setF("vname")}
  />
</FF>
              <FF icon="fa-envelope" focusKey="vemail" focusedMap={focused}>
                <input style={inp} type="email" placeholder="Email (spam nahi, pakka!)"
                  value={form.vemail} onChange={e=>setForm(f=>({...f,vemail:e.target.value}))} {...setF("vemail")}/>
              </FF>
              <FF icon="fa-mobile-screen" focusKey="vphone" focusedMap={focused}>
                <input style={inp} type="tel" placeholder="Mobile (WhatsApp ho toh bonus ⭐)"
                  value={form.vphone} onChange={e=>setForm(f=>({...f,vphone:e.target.value}))} {...setF("vphone")}/>
              </FF>
              
              <FF icon="fa-location-dot" full focusKey="vcity" focusedMap={focused}>
                <select style={{ ...inp, color: form.vcity ? "#111" : "#aaa" }}
                  value={form.vcity} onChange={e=>setForm(f=>({...f,vcity:e.target.value}))} {...setF("vcity")}>
                  <option value="" disabled>City (apna area batao)</option>
                  {CITIES.map(c => <option key={c} value={c} style={{ color:"#111" }}>{c}</option>)}
                </select>
                <FAI cls="fa-chevron-down" style={{ fontSize:".75rem", color:"#aaa", flexShrink:0 }}/>
              </FF>
              </form>
            </div>
          </div>
        </Reveal>

        <hr style={s.div}/>

        {/* ── SKILLS ── */}
        <Reveal>
          <div style={s.sb}>
            <div style={s.sbl}><FAI cls="fa-star"/> TU KYA-KYA KAR SAKTA/SAKTI HAI?</div>
            <div style={s.sbsub}>(saari skills kaam aayegi, chahe meme banana hi kyo na ho 😎)</div>
            <div style={s.skillsGrid}>
              {SKILLS.map(sk => (
                <SkillChip key={sk.id} skill={sk}
                  checked={skills.includes(sk.id)}
                  onToggle={() => toggleSkill(sk.id)}/>
              ))}
            </div>
          </div>
        </Reveal>

        <hr style={s.div}/>

        {/* ── TIME ── */}
        <Reveal>
          <div style={s.sb}>
            <div style={s.sbl}><FAI cls="fa-clock"/> KITNA TIME DE SAKTE HO?</div>
            <div style={s.sbsub}>(sach batao, overcommit mat karo 😅)</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:8 }}>
              {TIME_OPTS.map(t => (
                <div key={t.id} onClick={() => setTimeSlot(t.id)} style={{
                  ...s.timeChip,
                  background: timeSlot === t.id ? "#FFD600" : "#fafaf3",
                }}>
                  {t.label.split("\n").map((l,i) => <span key={i}>{l}{i < t.label.split("\n").length-1 && <br/>}</span>)}
                </div>
              ))}
            </div>
            <div style={s.timeAside}>
              <FAI cls="fa-bolt" style={{ fontSize:"1.1rem", flexShrink:0 }}/>
              <span>CHHOTA TIME, <span style={s.hl}>BADA IMPACT!</span> Ek ghanta bhi kafi hai sahi jagah lagao toh. 🙌</span>
            </div>
          </div>
        </Reveal>

        <hr style={s.div}/>

        {/* ── WHY ── */}
        <Reveal>
          <div style={s.sb}>
            <div style={s.sbl}><FAI cls="fa-heart"/> KYUN VOLUNTEER KARNA CHAHTE HO?</div>
            <div style={s.sbsub}>(dil ki baat, copy-paste nahi 😑)</div>
            <div style={{
              ...s.ff, alignItems:"flex-start", marginBottom:10,
              background: focused.vwhy ? "#fff9c4" : "#fafaf3",
              boxShadow: focused.vwhy ? SH : "3px 3px 0 #111",
            }}>
              <FAI cls="fa-pen" style={{ fontSize:".92rem", color:"#777", marginTop:3, flexShrink:0 }}/>
              <textarea style={{ ...inp, resize:"none", minHeight:90 }}
                placeholder="Apni story bata, kya soch hai, kya impact karna chahte ho..."
                value={form.vwhy}
                onChange={e=>setForm(f=>({...f,vwhy:e.target.value}))}
                {...setF("vwhy")}/>
            </div>
            <div style={s.ideasNote}>
              <div style={{ fontFamily:"'Bangers',cursive", fontSize:"1rem", letterSpacing:1, marginBottom:4 }}>
                💡 IDEAS HAIN?
              </div>
              BATAO YAAR! HUMEIN NAYE LOG, NAYE <span style={s.hl}>IDEA</span> AUR NAYI ENERGY PASAND HAI! 🙌
            </div>
          </div>
        </Reveal>

        <hr style={s.div}/>

        {/* ── RESUME ── */}
        <Reveal>
          <div style={s.sb}>
            <div style={s.sbl}><FAI cls="fa-file-lines"/> RESUME / CV</div>
            <div style={s.sbsub}>(optional hai, par laga de toh acha hai 😇)</div>

            <div onClick={() => fileInputRef.current?.click()} style={{
              ...s.uploadBox,
              background: fileName ? "#fff9c4" : "#fafaf3",
            }}>
              <div style={s.uploadIcon}><FAI cls="fa-cloud-arrow-up" style={{ fontSize:"1.4rem" }}/></div>
              <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".9rem", lineHeight:1.4 }}>
                <strong style={{ fontFamily:"'Bangers',cursive", fontSize:"1rem", letterSpacing:.5 }}>
                  Upload karo yaar (PDF/DOC)
                </strong><br/>
                Ya phir LinkedIn link bhi chalega 👍
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }} onChange={handleFile}/>

            {fileName && (
              <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:8, fontFamily:"'Patrick Hand',cursive", fontSize:".85rem", color:"#444" }}>
                <FAI cls="fa-circle-check" style={{ color:"green" }}/> {fileName}
              </div>
            )}

            <div style={{ marginTop:10 }}>
              <div style={{ ...s.ff, background: focused.vlinkedin ? "#fff9c4" : "#fafaf3", boxShadow: focused.vlinkedin ? SH : "3px 3px 0 #111" }}>
                <FAI cls="fa-brands fa-linkedin" style={{ fontSize:".92rem", color:"#0a66c2", flexShrink:0 }}/>
                <input style={inp} type="url" placeholder="LinkedIn profile link (optional)"
                  value={form.vlinkedin} onChange={e=>setForm(f=>({...f,vlinkedin:e.target.value}))} {...setF("vlinkedin")}/>
              </div>
            </div>

            <div style={{ marginTop:14, display:"flex", alignItems:"center", gap:10, fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".9rem" }}>
              <FAI cls="fa-glasses" style={{ fontSize:"1.6rem", flexShrink:0 }}/>
              <span>TALENT HAI, TOH HUMKO <span style={s.hl}>DIKHA!</span> Resume mein ya life mein, dono kaam aata hai.</span>
            </div>
          </div>
        </Reveal>

        <hr style={s.div}/>

        {/* ── EXPECTATIONS ── */}
        <Reveal>
          <div style={s.sb}>
            <div style={s.expectBox}>
              <div style={{ fontFamily:"'Bangers',cursive", fontSize:"1rem", letterSpacing:1, marginBottom:10 }}>
                EXPECTATIONS? (YEH MILEGA TUJHE 👀)
              </div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:8 }}>
                {EXPECTATIONS.map((e,i) => (
                  <li key={i} style={{ display:"flex", alignItems:"center", gap:8, fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".9rem" }}>
                    <FAI cls={e.icon} style={{ fontSize:".9rem", color:e.color, flexShrink:0 }}/> {e.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ── TAGLINE ── */}
        <div style={s.taglineBlock}>
          <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:"1rem", color:"#ccc", marginBottom:6 }}>
            ZINDAGI MEIN KUCH KARNA HAI TOH LOG KAHENGE –
          </div>
          <div style={s.tagQuote}>"YE PAGAL HAI KYA?"</div>
          <div style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".95rem", color:"#aaa" }}>
            KARTE RAHO. FARAK PADTA HAI. 👑
          </div>
        </div>

        {/* ── SUBMIT ── */}
        <Reveal>
          <div style={{ padding:"18px 0 10px", width:"85%", textAlign:"center", alignItems:"center", display:"flex", flexDirection:"column", gap:12, margin:"0 auto" }}>
            <button onClick={handleSubmit} style={{
              ...s.btnSubmit,
              background: btnState === "success" ? "#1a7a1a" : "#FFD600",
              color: btnState === "success" ? "#fff9c4" : "#111",
              cursor: btnState === "success" ? "default" : "pointer",
              animation: btnState === "success" ? "none" : "pulse-btn 2s ease-in-out infinite",
            }}>
              {btnState === "success"
                ? <><FAI cls="fa-check"/> FORM GAYA BOSS! 🎉</>
                : <>  LET'S DO SOME FARAK! <p  style={{ animation:"rocket 1.5s ease-in-out infinite alternate" }}> 🚀 </p> 
                <br />
                <span
    style={{
      display: "block",
      fontSize: "0.75rem",
      opacity: 0.7,
      marginTop: "4px",
    }}
  >
    Submit the form 
  </span>
                </>
              }
            </button>
            <p style={{ fontFamily:"'Patrick Hand',cursive", fontSize:".9rem", color:"#555" }}>
              EK CHHOTA STEP, KISI KI ZINDAGI KA{" "}
              <span style={s.hl}>GAME CHANGER.</span> ✦
            </p>
          </div>
        </Reveal>

      </div>
    </>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────
const B  = "2.5px solid #111";
const SH = "4px 4px 0 #111";

// ─── Styles ────────────────────────────────────────────────────────────────
const s = {
  // layout — zero side padding, full bleed
  page:        { background:"#fafaf3", color:"#111", fontFamily:"'Patrick Hand',cursive", fontSize:16, maxWidth:480, margin:"0 auto", overflowX:"hidden" },
  hero:        { padding:"22px 12px 10px", position:"relative", overflow:"hidden" },
  sb:          { padding:"18px 12px" },

  // hero
  heroH1:      { fontFamily:"'Bangers',cursive", fontSize:"2rem", letterSpacing:2, lineHeight:1.1, marginBottom:8, textAlign:"center" },
  yline:       { display:"block", background:"#FFD600", border:B, borderRadius:6, padding:"2px 10px", boxShadow:"3px 3px 0 #111", transform:"rotate(-1deg)", margin:"4px auto", fontSize:"2.5rem" },
  heroSub:     { fontFamily:"'Patrick Hand',cursive", fontSize:"1rem", color:"#444", marginBottom:18, lineHeight:1.5, textAlign:"center" },
  btnCta:      { display:"inline-flex", alignItems:"center", gap:8, background:"#FFD600", border:B, borderRadius:24, padding:"12px 28px", fontFamily:"'Bangers',cursive", fontSize:"1.2rem", letterSpacing:2, cursor:"pointer", boxShadow:SH, textDecoration:"none", color:"#111", animation:"pulse-btn 2s ease-in-out infinite" },
  bubble:      { border:B, borderRadius:14, padding:"9px 11px", fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".8rem", lineHeight:1.3, maxWidth:118, textAlign:"center", background:"#fafaf3", boxShadow:"3px 3px 0 #111", flexShrink:0 },
  hl:          { background:"#FFD600", padding:"0 3px", borderRadius:3 },

  // section headers
  sbl:         { fontFamily:"'Bangers',cursive", fontSize:"1.3rem", letterSpacing:1.5, marginBottom:2, display:"flex", alignItems:"center", gap:6, borderBottom:"3px solid #FFD600", paddingBottom:4 },
  sbsub:       { fontFamily:"'Patrick Hand',cursive", fontSize:".84rem", color:"#555", marginBottom:14, marginTop:3 },
  div:         { border:"none", borderTop:B, borderTopStyle:"dashed", margin:"0 0" },  // ← FULL WIDTH divider

  // form
  fgrid:       { display:"grid", gridTemplateColumns:"1fr", gap:9, marginBottom:10 },
  ff:          { border:B, borderRadius:14, padding:"11px 12px", background:"#fafaf3", boxShadow:"3px 3px 0 #111", display:"flex", alignItems:"center", gap:8, transition:"box-shadow .2s, background .2s" },
  inp:         { flex:1, border:"none", outline:"none", background:"transparent", fontFamily:"'Patrick Hand',cursive", fontSize:".86rem", color:"#111", width:"100%", padding:"6px 0" },

  // skills
  skillsGrid:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 },
  skillChip:   { border:B, borderRadius:10, padding:"11px 10px", display:"flex", alignItems:"center", gap:8, cursor:"pointer", background:"#fafaf3", boxShadow:"3px 3px 0 #111", transition:"background .15s", userSelect:"none" },
  skillLbl:    { fontFamily:"'Bangers',cursive", fontSize:".85rem", letterSpacing:.5, lineHeight:1.2 },

  // time
  timeChip:    { border:B, borderRadius:10, padding:"9px 11px", fontFamily:"'Bangers',cursive", fontSize:".8rem", letterSpacing:.5, lineHeight:1.2, cursor:"pointer", background:"#fafaf3", boxShadow:"3px 3px 0 #111", transition:"background .15s", userSelect:"none", textAlign:"center" },
  timeAside:   { border:B, borderRadius:10, background:"#fff9c4", padding:"10px 12px", fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".9rem", lineHeight:1.3, boxShadow:"3px 3px 0 #111", display:"flex", alignItems:"center", gap:8 },

  // why / ideas
  ideasNote:   { border:B, borderRadius:10, background:"#FFD600", padding:"12px 14px", boxShadow:"3px 3px 0 #111", fontFamily:"'Patrick Hand',cursive", fontWeight:700, fontSize:".9rem", lineHeight:1.4, transform:"rotate(-1.5deg)" },

  // resume / upload
  uploadBox:   { border:B, borderRadius:14, borderStyle:"dashed", padding:"16px 14px", background:"#fafaf3", boxShadow:"3px 3px 0 #111", display:"flex", alignItems:"center", gap:12, cursor:"pointer", transition:"background .15s, box-shadow .15s" },
  uploadIcon:  { width:52, height:52, border:B, borderRadius:"50%", background:"#FFD600", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"3px 3px 0 #111" },

  // expectations
  expectBox:   { border:B, borderRadius:14, padding:14, background:"#fff9c4", boxShadow:SH, marginBottom:4 },

  // tagline
  taglineBlock:{ background:"#111", color:"#fff", padding:"22px 12px", textAlign:"center" },
  tagQuote:    { fontFamily:"'Bangers',cursive", fontSize:"1.3rem", letterSpacing:1.5, background:"#FFD600", color:"#111", border:B, borderRadius:6, padding:"4px 14px", display:"inline-block", marginBottom:8, transform:"rotate(-1deg)" },

  // submit
  btnSubmit:   { display:"flex", alignItems:"center", justifyContent:"center", gap:10, width:"100%", color:"#fafaf3", border:B, borderRadius:12, padding:"16px 20px", fontFamily:"'Bangers',cursive", fontSize:"1.45rem", letterSpacing:2, cursor:"pointer", boxShadow:SH, marginBottom:8, transition:"background .3s" },
};

// ─── Global CSS ────────────────────────────────────────────────────────────
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Patrick Hand:wght@400;700&family=Patrick+Hand&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body::after {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: .45;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
  }

  @keyframes floaty    { from{transform:translateY(0) rotate(0);}    to{transform:translateY(-8px) rotate(12deg);} }
  @keyframes pulse-btn { 0%,100%{box-shadow:4px 4px 0 #111;}         50%{box-shadow:6px 6px 0 #111;} }
  @keyframes bounce-down { 0%,100%{transform:translateY(0);}         50%{transform:translateY(6px);} }
  @keyframes wiggle    { 0%,100%{transform:rotate(0);}               25%{transform:rotate(-3deg);} 75%{transform:rotate(3deg);} }
  @keyframes rocket    { from{transform:rotate(-10deg) translateY(0);}to{transform:rotate(10deg) translateY(-4px);} }

  .floaty      { animation: floaty 4s ease-in-out infinite alternate; }
  .bounce-down { animation: bounce-down 1.5s ease-in-out infinite; }

  input::placeholder, textarea::placeholder { color: #bbb; font-size: .82rem; }
  input[type="date"]::-webkit-calendar-picker-indicator { opacity: .5; }
  select { appearance: none; -webkit-appearance: none; }
`;