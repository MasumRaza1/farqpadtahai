import { useState, useEffect } from "react";

const PRAYERS = [
  { name: "Fajar",   key: "fajar",   time: "4:15",  period: "AM", icon: "🌄", color: "#f59e0b", bg: "#fef3c7" },
  { name: "Dhuhr",   key: "dhuhr",   time: "1:15",  period: "PM", icon: "☀️", color: "#10b981", bg: "#d1fae5" },
  { name: "Asr",     key: "asr",     time: "5:30",  period: "PM", icon: "🌤", color: "#3b82f6", bg: "#dbeafe" },
  { name: "Maghrib", key: "maghrib", time: "8:45",  period: "PM", icon: "🌅", color: "#f97316", bg: "#ffedd5" },
  { name: "Isha",    key: "isha",    time: "10:15", period: "PM", icon: "🌙", color: "#8b5cf6", bg: "#ede9fe" },
];

const TRANSLATIONS = {
  en: {
    online: "Online",
    current: "Current:",
    next: "Next:",
    left: "left",
    timingTitle: "Muslim Prayer Timing",
    dailySalat: "Daily Salat Times",
    noticeSection: "Notice Section",
    communityNotices: <>COMMUNITY<br/>NOTICES</>,
    meetImam: "Meet Our Imam",
    imamName: "Imam Dr. A. Rahman",
    imamRole: "Head of Religious Affairs",
    weatherSuffix: "Rehla, Palamu",
    minaret: "Minaret",
    prayers: "Prayers",
    community: "Community",
    donate: "Donate",
    loadingHijri: "Loading Hijri...",
    hijriUnavailable: "Hijri unavailable",
    fajar: "Fajar",
    dhuhr: "Dhuhr",
    asr: "Asr",
    maghrib: "Maghrib",
    isha: "Isha",
    fajarSub: "Sun rising",
    dhuhrSub: "High Sun",
    asrSub: "Sun low",
    maghribSub: "Sunset",
    ishaSub: "Moon & stars",
    notices: [
      "Friday Khutbah at 1:15 PM.",
      "Eid-al-Adha Fundraising Dinner (details inside).",
      "New Youth Program enrolling now.",
    ],
    // Donation Page Strings
    donateTitle: "E-Donation Portal",
    selectAmount: "Select Amount",
    customAmount: "Custom Amount",
    purpose: "Select Purpose",
    masjidUpkeep: "Masjid Maintenance",
    charitySadqah: "Charity & Sadqah",
    payNow: "Proceed to Secure Pay",
    bankTransfer: "Direct Bank Transfer",
    accNumber: "Acc No:",
    ifscCode: "IFSC:",
    upiId: "UPI ID:",
  },
  hi: {
    online: "ऑनलाइन",
    current: "वर्तमान:",
    next: "अगला:",
    left: "शेष",
    timingTitle: "मुस्लिम प्रार्थना समय",
    dailySalat: "दैनिक नमाज़ समय",
    noticeSection: "सूचना अनुभाग",
    communityNotices: <>सामुदायिक<br/>सूचनाएं</>,
    meetImam: "हमारे इमाम से मिलें",
    imamName: "इमाम डॉ. ए. रहमान",
    imamRole: "धार्मिक मामलों के प्रमुख",
    weatherSuffix: "रेहला, पलामू",
    minaret: "मीनार",
    prayers: "नमाज़",
    community: "समुदाय",
    donate: "दान करें",
    loadingHijri: "हिजरी लोड हो रहा है...",
    hijriUnavailable: "हिजरी अनुपलब्ध",
    fajar: "फज्र",
    dhuhr: "जुहर",
    asr: "असर",
    maghrib: "मغرب",
    isha: "ईша",
    fajarSub: "सूर्योदय",
    dhuhrSub: "दोपहर का सूर्य",
    asrSub: "ढलता सूर्य",
    maghribSub: "सूर्यास्त",
    ishaSub: "चाँد और तारे",
    notices: [
      "शुक्रवार खुत्बा दोपहर 1:15 बजे।",
      "ईद-उल-अज़हा फंडरेज़र डिनर (विवरण अंदर)।",
      "नया युवा कार्यक्रम पंजीकरण चालू है।"
    ],
    donateTitle: "ई-शुकराना पोर्टल",
    selectAmount: "राशि चुनें",
    customAmount: "अन्य राशि दर्ज करें",
    purpose: "दान का उद्देश्य",
    masjidUpkeep: "मस्जिद रखरखाव",
    charitySadqah: "दान और सदक़ा",
    payNow: "सुरक्षित भुगतान करें",
    bankTransfer: "सीधा बैंक ट्रांसफर",
    accNumber: "खाता संख्या:",
    ifscCode: "IFSC कोड:",
    upiId: "UPI आईडी:",
  },
  ur: {
    online: "آن لائن",
    current: "موجودہ:",
    next: "اگلا:",
    left: "باقی",
    timingTitle: "نماز کے اوقات",
    dailySalat: "روزانہ نماز کے اوقات",
    noticeSection: "نوٹس سیکشن",
    communityNotices: <>برادری کے<br/>نوٹس</>,
    meetImam: "ہمارے امام سے ملیں",
    imamName: "امام ڈاکٹر اے رحمان",
    imamRole: "سربراہ مذہبی امور",
    weatherSuffix: "رحلہ، پلاموں",
    minaret: "مینار",
    prayers: "نمازیں",
    community: "برادری",
    donate: "عطیہ کریں",
    loadingHijri: "ہجری لوڈ ہو رہی ہے...",
    hijriUnavailable: "ہجری دستیاب نہیں",
    fajar: "فجر",
    dhuhr: "ظہر",
    asr: "عصر",
    maghrib: "مغرب",
    isha: "عشاء",
    fajarSub: "طلوعِ آفتاب",
    dhuhrSub: "سردوپہر",
    asrSub: "ڈھلتا سورج",
    maghribSub: "غروبِ آفتاب",
    ishaSub: "چاند اور تارے",
    notices: [
      "جمعہ کا خطبہ دوپہر 1:15 بجے ہوگا۔",
      "عید الاضحیٰ فنڈ ریزنگ ڈنر (تفصیلات اندر)۔",
      "نیا یوتھ پروگرام اب داخلہ جاری ہے۔"
    ],
    donateTitle: "آن لائن عطیات",
    selectAmount: "رقم منتخب کریں",
    customAmount: "رقم درج کریں",
    purpose: "عطیہ کا مقصد",
    masjidUpkeep: "مسجد کی دیکھ بھال",
    charitySadqah: "صدقہ و خیرات",
    payNow: "محفوظ ادائیگی کریں",
    bankTransfer: "بینک اکاؤنٹ تفصیلات",
    accNumber: "اکاؤنٹ نمبر:",
    ifscCode: "IFSC کوڈ:",
    upiId: "UPI آئی ڈی:",
  }
};

const getWeatherIcon = (code) => {
  if (code === 0) return "☀️";
  if ([1, 2, 3].includes(code)) return "🌤️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌤️";
};

function getMinutesFromMidnight(timeStr, period) {
  const [hoursStr, minutesStr] = timeStr.split(':');
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

export default function RazaMasjid() {
  const [lang, setLang] = useState("en");
  const [activeTab, setActiveTab] = useState("prayers");
  const [digitalTime, setDigitalTime] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState("");
  const [nextPrayerInfo, setNextPrayerInfo] = useState({ name: "", key: "", time: "", period: "", timeLeft: "" });
  
  const [islamicDate, setIslamicDate] = useState("");
  const [weather, setWeather] = useState({ temp: "--", icon: "🌤️" });

  // Donation interactive state configurations
  const [donateAmount, setDonateAmount] = useState(500);
  const [donationPurpose, setDonationPurpose] = useState("upkeep");

  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ur";

  const today = new Date();
  const dayStr = today.toLocaleDateString(lang === "en" ? "en-US" : lang === "hi" ? "hi-IN" : "ur-PK", { weekday: "long" });
  const dateStr = today.toLocaleDateString(lang === "en" ? "en-US" : lang === "hi" ? "hi-IN" : "ur-PK", { day: "numeric", month: "short", year: "numeric" });

  useEffect(() => {
    setIslamicDate(TRANSLATIONS[lang].loadingHijri);
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    
    fetch(`https://api.aladhan.com/v1/gToH?date=${day}-${month}-${year}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data && data.data.hijri) {
          const h = data.data.hijri;
          const monthLabel = lang === "en" ? h.month.en : (lang === "hi" ? h.month.en : h.month.ar);
          setIslamicDate(`${h.day} ${monthLabel} ${h.year} AH`);
        }
      })
      .catch(() => setIslamicDate(TRANSLATIONS[lang].hijriUnavailable));
  }, [lang]);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=24.2123&longitude=83.8837&current=temperature_2m,weather_code")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            icon: getWeatherIcon(data.current.weather_code)
          });
        }
      })
      .catch(() => setWeather({ temp: "N/A", icon: "🌤️" }));
  }, []);

  useEffect(() => {
    const updateTimeAndTracking = () => {
      const now = new Date();
      setDigitalTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));

      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      let activeIdx = PRAYERS.length - 1; 
      
      for (let i = 0; i < PRAYERS.length; i++) {
        const prayerMinutes = getMinutesFromMidnight(PRAYERS[i].time, PRAYERS[i].period);
        if (currentMinutes >= prayerMinutes) {
          activeIdx = i;
        } else {
          break;
        }
      }

      setCurrentPrayer(PRAYERS[activeIdx].name);

      const nextIdx = (activeIdx + 1) % PRAYERS.length;
      const next = PRAYERS[nextIdx];
      
      let nextMinutes = getMinutesFromMidnight(next.time, next.period);
      let diff = 0;

      if (nextIdx === 0 && currentMinutes > nextMinutes) {
        diff = (1440 - currentMinutes) + nextMinutes;
      } else {
        diff = nextMinutes - currentMinutes;
      }

      const hLeft = Math.floor(diff / 60);
      const mLeft = diff % 60;
      setNextPrayerInfo({
        name: next.name,
        key: next.key,
        time: next.time,
        period: next.period,
        timeLeft: hLeft > 0 ? `${hLeft}h ${mLeft}m` : `${mLeft}m`
      });
    };

    updateTimeAndTracking();
    const timer = setInterval(updateTimeAndTracking, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentPrayerActiveKey = PRAYERS.find(p => p.name === currentPrayer)?.key || "fajar";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a1a",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>
      <div 
        dir={isRTL ? "rtl" : "ltr"}
        style={{
          width: "100%",
          maxWidth: 390,
          minHeight: "100vh",
          background: "#1c1c1e",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* ── TOP NAV ── */}
        <div style={{
          background: "#2a2a2a",
          padding: "14px 18px 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #333",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#3a3a3a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
            }}>🕌</div>
            <div>
              <p style={{ color: "#fff", fontSize: 14, fontWeight: 700, margin: 0 }}>Raza Masjid</p>
              <p style={{ color: "#4ade80", fontSize: 11, margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }}/>
                {t.online}
              </p>
            </div>
          </div>
          
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            style={{
              background: "#3a3a3a",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              outline: "none",
              direction: "ltr"
            }}
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="ur">اردو</option>
          </select>
        </div>

        {/* ── CONDITIONAL ROUTING ELEMENT ── */}
        {activeTab !== "donate" ? (
          <>
            {/* ── VIEW A: PRAYERS/HOME DASHBOARD ── */}
            {/* DATE HERO CARD */}
            <div style={{
              background: "#fff",
              margin: "12px 12px 0 12px",
              borderRadius: 18,
              padding: "14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0 }}>
                    {dayStr}, {dateStr}
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#10b981", margin: "2px 0 0" }}>
                    🌙 {islamicDate}
                  </p>
                </div>
                
                <div style={{ textAlign: isRTL ? "left" : "right" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0, fontFamily: "monospace", letterSpacing: "0.5px" }}>
                    {digitalTime || "00:00:00"}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: isRTL ? "flex-start" : "flex-end", gap: 4, margin: "2px 0 0" }}>
                    <span style={{ fontSize: 11 }}>{weather.icon}</span>
                    <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>
                      {weather.temp}°C • {t.weatherSuffix}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{
                background: "#f3f4f6",
                borderRadius: 12,
                padding: "10px 12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #e5e7eb",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 10, textTransform: "uppercase", color: "#6b7280", fontWeight: 700, letterSpacing: "0.5px" }}>{t.current}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#15803d" }}>{t[currentPrayerActiveKey]}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#374151" }}>
                  <span>{t.next} <strong style={{ color: "#111" }}>{t[nextPrayerInfo.key] || "—"}</strong> ({nextPrayerInfo.time} {nextPrayerInfo.period})</span>
                  <span style={{
                    background: "#ef4444",
                    padding: "2px 6px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                    boxShadow: "0 2px 4px rgba(239, 68, 68, 0.2)"
                  }}>
                    {nextPrayerInfo.timeLeft} {t.left}
                  </span>
                </div>
              </div>
            </div>

            {/* SECTION TITLE */}
            <div style={{ background: "#1c1c1e", padding: "16px 20px 4px", textAlign: "center" }}>
              <p style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: 0.3 }}>
                {t.timingTitle}
              </p>
            </div>

            {/* MAIN DATA GRID */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, flex: 1, background: "#1c1c1e" }}>
              {/* LEFT: Salat Times */}
              <div style={{
                background: "#fff",
                margin: isRTL ? "12px 12px 12px 6px" : "12px 6px 12px 12px",
                borderRadius: 18,
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <p style={{ fontSize: 9, fontWeight: 800, color: "#888", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 6px" }}>
                  {t.dailySalat}
                </p>

                {PRAYERS.map((p, index) => {
                  const isActive = currentPrayer === p.name;
                  const isLast = index === PRAYERS.length - 1;
                  return (
                    <div key={p.name} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", margin: "0 -4px",
                      borderBottom: isLast && isActive ? "none" : (isActive ? "none" : "1px solid #f3f4f6"),
                      backgroundColor: isActive ? "#dcfce7" : "transparent",
                      borderRadius: isActive ? "12px" : "0",
                      boxShadow: isActive ? "0 2px 4px rgba(0,0,0,0.05)" : "none",
                      border: isActive ? "1px solid #bbf7d0" : "1px solid transparent",
                    }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                        {p.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: isActive ? "#166534" : "#111", margin: 0 }}>{t[p.key]}</p>
                        <p style={{ fontSize: 10, color: isActive ? "#15803d" : "#9ca3af", margin: 0 }}>{t[`${p.key}Sub`]}</p>
                      </div>
                      <div style={{ textAlign: isRTL ? "left" : "right" }}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: isActive ? "#166534" : "#111", margin: 0, lineHeight: 1 }}>{p.time}</p>
                        <p style={{ fontSize: 10, color: isActive ? "#15803d" : "#6b7280", margin: 0 }}>{p.period}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* RIGHT: Notices */}
              <div style={{
                background: "#fff",
                margin: isRTL ? "12px 6px 12px 12px" : "12px 12px 12px 6px",
                borderRadius: 18,
                padding: "14px 12px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                  <p style={{ fontSize: 9, fontWeight: 800, color: "#888", letterSpacing: 1.5, textTransform: "uppercase", margin: 0 }}>{t.noticeSection}</p>
                  <span style={{ fontSize: 14 }}>🔔</span>
                </div>
                <p style={{ fontSize: 20, fontWeight: 900, color: "#111", margin: "0 0 10px", lineHeight: 1.2 }}>{t.communityNotices}</p>
                <ul style={{ margin: 0, paddingProps: 0, paddingRight: isRTL ? 14 : 0, paddingLeft: isRTL ? 0 : 14, display: "flex", flexDirection: "column", gap: 10 }}>
                  {t.notices.map((notice, i) => (
                    <li key={i} style={{ fontSize: 12, color: "#374151", lineHeight: 1.45, fontWeight: 500 }}>{notice}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* IMAM CARD */}
            <div style={{
              background: "#fff",
              margin: "0 12px 12px",
              borderRadius: 18,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            }}>
              <div style={{ width: 64, height: 64, borderRadius: 14, background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, flexShrink: 0, overflow: "hidden", border: "2px solid #e5e7eb" }}>
                👳
              </div>
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af", letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 3px" }}>{t.meetImam}</p>
                <p style={{ fontSize: 18, fontWeight: 900, color: "#111", margin: "0 0 2px", lineHeight: 1.2 }}>{t.imamName}</p>
                <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{t.imamRole}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ── VIEW B: E-DONATION VIEW (SAME UI, CLEAN & SCANNABLE) ── */}
            <div style={{ background: "#1c1c1e", padding: "16px 20px 4px", textAlign: "center" }}>
              <p style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: 0.3 }}>
                {t.donateTitle}
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 12px", flex: 1 }}>
              
              {/* CARD 1: Amount Grid Panel */}
              <div style={{
                background: "#fff",
                borderRadius: 18,
                padding: "16px 14px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 12px" }}>
                  {t.selectAmount}
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                  {[200, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDonateAmount(amt)}
                      style={{
                        padding: "10px 0",
                        borderRadius: 10,
                        border: donateAmount === amt ? "2px solid #16a34a" : "1px solid #e5e7eb",
                        background: donateAmount === amt ? "#dcfce7" : "#f9fafb",
                        color: donateAmount === amt ? "#15803d" : "#374151",
                        fontSize: 14,
                        fontWeight: "700",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
                <input 
                  type="number"
                  placeholder={t.customAmount}
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(Number(e.target.value))}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                    fontSize: 13,
                    color: "#111",
                    fontWeight: "600",
                    outline: "none",
                    textAlign: isRTL ? "right" : "left"
                  }}
                />
              </div>

              {/* CARD 2: Purpose Picker Panel */}
              <div style={{
                background: "#fff",
                borderRadius: 18,
                padding: "16px 14px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 12px" }}>
                  {t.purpose}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { id: "upkeep", label: t.masjidUpkeep, icon: "🛠️" },
                    { id: "charity", label: t.charitySadqah, icon: "🤲" }
                  ].map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => setDonationPurpose(p.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px",
                        borderRadius: 12,
                        border: donationPurpose === p.id ? "1px solid #bbf7d0" : "1px solid #f3f4f6",
                        background: donationPurpose === p.id ? "#f0fdf4" : "#f9fafb",
                        cursor: "pointer"
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{p.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: "600", color: donationPurpose === p.id ? "#166534" : "#374151", flex: 1 }}>
                        {p.label}
                      </span>
                      <input 
                        type="radio" 
                        checked={donationPurpose === p.id} 
                        readOnly
                        style={{ accentColor: "#16a34a" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CARD 3: Account/Direct Transfer Data info */}
              <div style={{
                background: "#fff",
                borderRadius: 18,
                padding: "14px 14px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 4
              }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
                  {t.bankTransfer}
                </p>
                <p style={{ fontSize: 12, color: "#4b5563", margin: 0, fontWeight: "500" }}>
                  <strong>{t.accNumber}</strong> 123456789012 • SBI
                </p>
                <p style={{ fontSize: 12, color: "#4b5563", margin: 0, fontWeight: "500" }}>
                  <strong>{t.ifscCode}</strong> SBIN0001234
                </p>
                <p style={{ fontSize: 12, color: "#4b5563", margin: 0, fontWeight: "500" }}>
                  <strong>{t.upiId}</strong> razamasjid@upi
                </p>
              </div>

              {/* ACTION PAY BUTTON */}
              <button style={{
                width: "100%",
                background: "linear-gradient(135deg, #16a34a, #15803d)",
                color: "#fff",
                border: "none",
                borderRadius: 14,
                padding: "14px 0",
                fontSize: 14,
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(22, 163, 74, 0.2)",
                marginBottom: 16
              }}>
                {t.payNow} (₹{donateAmount || 0})
              </button>

            </div>
          </>
        )}

        {/* ── BOTTOM NAV ── */}
        <div style={{
          background: "#fff",
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          padding: "8px 0 16px",
          zIndex: 10
        }}>
          {[
            { key: "minaret",   label: t.minaret,   icon: "🕌" },
            { key: "prayers",   label: t.prayers,   icon: "🤲" },
            { key: "community", label: t.community, icon: "👥" },
            { key: "donate",    label: t.donate,    icon: "💝" },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "6px 0",
              }}
            >
              <span style={{ fontSize: 22 }}>{tab.icon}</span>
              <span style={{
                fontSize: 11, fontWeight: 600,
                color: activeTab === tab.key ? "#16a34a" : "#9ca3af",
              }}>{tab.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}