import React, { useState } from 'react';
import founderImage from './founder.png';
import { Link } from "react-router-dom";
import groupImage from './group.jpeg';
import groupImageColor from './group-color.png';

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Menu functions kept for your nav bar implementation
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* ===== FONTS AND ICONS ===== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Patrick+Hand:wght@400;700&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      {/* ===== STYLES ===== */}
      <style>{`
        :root {
          --black: #111111;
          --white: #F4F4F0;
          --yellow: #FFD600;
          --border: 3px solid var(--black);
          --shadow-sm: 4px 4px 0 var(--black);
          --shadow-md: 6px 6px 0 var(--black);
          --shadow-hover: 2px 2px 0 var(--black);
          --transition: all 0.2s ease-in-out;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }

        body {
          background: var(--white);
          color: var(--black);
          font-family: 'Patrick Hand', cursive;
          font-size: 16px;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          overflow-x: hidden;
          position: relative;
          -webkit-font-smoothing: antialiased;
        }

        /* Subtle Grunge/Grain */
        body::after {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999;
        }

        .font-bangers { font-family: 'Bangers', cursive; letter-spacing: 1.5px; }
        .font-Patrick-Hand { font-family: 'Patrick Hand', cursive; }
        
        /* High-Contrast Brutalist Highlights */
        .hl-yellow { 
          background: var(--yellow); padding: 0px 6px; 
          border: 2px solid var(--black); border-radius: 2px; 
          box-shadow: 2px 2px 0 var(--black); 
          display: inline-block; transform: rotate(-1deg);
        }
        .hl-black { 
          background: var(--black); color: var(--yellow); 
          padding: 2px 8px; border-radius: 4px; 
          display: inline-block; font-family: 'Bangers', cursive; letter-spacing: 1px;
        }
        
        .badge-black {
          background: var(--black); color: var(--white);
          font-family: 'Bangers', cursive; font-size: clamp(1.1rem, 4.5vw, 1.3rem);
          padding: 6px 14px; border-radius: 0px; border: 2px solid var(--black);
          display: inline-block; box-shadow: var(--shadow-sm);
          transform: rotate(-2deg); transition: var(--transition);
        }
        .badge-black:hover { transform: rotate(0deg) translate(-2px, -2px); box-shadow: var(--shadow-md); }

        /* ===== ANIMATIONS ===== */
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-15deg); }
          50% { transform: translateY(-8px) rotate(-10deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ===== HERO / FOUNDER SECTION ===== */
        .about-hero { padding: 30px 15px 20px; position: relative; display: flex; flex-direction: column; overflow: hidden; }
        .hero-top-area { display: flex; justify-content: space-between; position: relative; margin-top: 25px; }
        .hero-text-col { width: 55%; position: relative; z-index: 2; }
        
        .hero-title {
          font-family: 'Bangers', cursive;
          font-size: clamp(1.7rem, 7vw, 2.3rem); 
          line-height: 1.15; margin-bottom: 12px;
          text-transform: uppercase;
        }
        .hero-sub { font-family: 'Patrick Hand', cursive; font-size: clamp(1.1rem, 4vw, 1.3rem); line-height: 1.3;}
        
        .doodle-bulb {
          font-size: 2.2rem; color: var(--yellow);
          filter: drop-shadow(2px 2px 0 var(--black));
          animation: float 3s ease-in-out infinite;
          margin-top: 15px; margin-left: 10px;
        }

        /* Founder Image Area */
        .founder-col { width: 45%; position: relative; display: flex; flex-direction: column; align-items: flex-end; }
        
        .speech-bubble-ceo {
          background: var(--white); border: var(--border); border-radius: 8px;
          padding: 8px 10px; text-align: center;
          font-family: 'Patrick Hand', cursive; font-weight: bold;
          font-size: clamp(0.8rem, 3vw, 1rem); line-height: 1.2;
          box-shadow: var(--shadow-sm); transform: rotate(-4deg);
          position: relative; margin-bottom: 18px; margin-right: 5px; z-index: 4;
        }
        .speech-bubble-ceo strong { font-family: 'Bangers', cursive; font-size: clamp(1.2rem, 4vw, 1.4rem); letter-spacing: 1px; color: var(--black); }
        .speech-bubble-ceo small { font-size: 0.8rem; display: block; margin-top: 2px; }
        .speech-bubble-ceo::after {
          content: ''; position: absolute; bottom: -12px; right: 20px;
          width: 15px; height: 15px;
          border-right: 3px solid var(--black); border-bottom: 3px solid var(--black);
          background: var(--white);
          transform: skewX(-20deg) rotate(45deg);
        }
        
        .founder-img-container { position: relative; width: 100%; aspect-ratio: 4/5; max-width: 180px; }
        .founder-img {
          width: 100%; height: 100%; object-fit: cover; object-position: top;
          border: var(--border); border-radius: 4px; position: relative; z-index: 2;
          filter: grayscale(20%) contrast(110%);
        }
        .founder-img-shadow {
          position: absolute; top: 8px; left: 8px; right: -8px; bottom: -8px;
          background: var(--yellow); border: var(--border); border-radius: 4px; z-index: 1;
        }
        .doodle-crown {
          position: absolute; top: -20px; right: 5px;
          font-size: clamp(1.8rem, 5vw, 2.2rem); color: var(--yellow);
          transform: rotate(18deg); z-index: 3;
          -webkit-text-stroke: 2px var(--black); /* Sharp outline */
        }

        .founder-badge {
          background: var(--black); color: var(--white);
          border: 2px solid var(--yellow); padding: 8px 10px;
          position: absolute; bottom: -15px; right: -10px; width: 120%;
          z-index: 5; font-family: 'Bangers', cursive;
          transform: rotate(2deg); box-shadow: var(--shadow-sm);
        }
        .founder-badge h3 { font-size: clamp(1.1rem, 4vw, 1.3rem); letter-spacing: 1px; margin-bottom: 3px; color: var(--yellow);}
        .founder-badge p { font-family: 'Patrick Hand', cursive; font-size: clamp(0.75rem, 2.5vw, 0.85rem); line-height: 1.2; }
        .founder-badge .text-yellow { color: var(--yellow); font-family: 'Bangers', cursive; letter-spacing: 0.5px;}

        /* Taped Note (Qualifications) */
        .taped-note {
          position: relative; background: var(--white); border: var(--border);
          padding: 12px 15px; width: 85%; max-width: 260px;
          text-align: center; font-family: 'Bangers', cursive;
          font-size: clamp(0.95rem, 4vw, 1.1rem); line-height: 1.4;
          transform: rotate(-2deg); margin: 40px auto 20px 10px;
          box-shadow: var(--shadow-md); z-index: 6;
        }
        .taped-note .hl-black { font-size: 0.85rem; padding: 2px 6px; }
        
        .tape {
          position: absolute; width: 45px; height: 18px;
          background-color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0,0,0,0.8);
          background-image: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px);
          z-index: 7;
        }
        .tape-tl { top: -10px; left: -10px; transform: rotate(-30deg); }
        .tape-br { bottom: -10px; right: -10px; transform: rotate(-30deg); }
        
        .doodle-grad-cap {
          position: absolute; top: -18px; right: -10px;
          font-size: 1.6rem; color: var(--black); transform: rotate(15deg);
        }

        /* ===== MARQUEE BANNER ===== */
        .marquee-wrapper {
          background: var(--yellow); border-top: var(--border); border-bottom: var(--border);
          padding: 10px 0; overflow: hidden; white-space: nowrap; position: relative; margin: 25px 0;
          box-shadow: 0 4px 0 var(--black); transform: rotate(-1deg);
        }
        .marquee-track {
          display: inline-block; animation: marquee 12s linear infinite;
          font-family: 'Bangers', cursive; font-size: 1.2rem; letter-spacing: 1px; color: var(--black);
        }
        .marquee-track span { margin: 0 25px; }

        /* ===== STORY SECTION ===== */
        .story-section { padding: 30px 15px 10px; position: relative; }
        
        .story-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .story-header .badge-black { transform: rotate(1deg); font-size: clamp(1rem, 4vw, 1.2rem); background: var(--yellow); color: var(--black); }
        
        .dashed-line { flex: 1; border-top: 3px dashed var(--black); position: relative; top: 2px; }
        .dashed-line i { position: absolute; right: 0; top: -12px; font-size: 1.2rem; transform: rotate(15deg); color: var(--black); }

        .story-content {
          font-size: clamp(1rem, 4.5vw, 1.1rem); line-height: 1.6; position: relative;
          background: var(--white); border: var(--border); padding: 18px;
          box-shadow: var(--shadow-sm); border-radius: 4px;
        }
        
        .story-plan-note {
          float: right; margin: 0 0 10px 15px;
          font-family: 'Bangers', cursive; font-size: clamp(1rem, 4vw, 1.1rem); line-height: 1.2;
          text-align: center; transform: rotate(4deg); 
          background: var(--white); color: var(--black); 
          padding: 8px 12px; border: 2px solid var(--black);
        }
        .clearfix::after { content: ""; clear: both; display: table; }

        /* ===== FACTS SECTION ===== */
        .facts-section { padding: 30px 15px; }
        .facts-title { font-family: 'Bangers', cursive; font-size: clamp(1.4rem, 6vw, 1.6rem); margin-bottom: 25px; text-align: left; }
        
        .facts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .fact-item { 
          text-align: left; position: relative; background: var(--white); 
          border: var(--border); padding: 15px; box-shadow: var(--shadow-sm); 
          transition: var(--transition); display: flex; flex-direction: column; justify-content: flex-start;
        }
        .fact-item:hover { transform: translate(2px, 2px); box-shadow: var(--shadow-hover); background: var(--yellow); }
        
        .fact-icon { font-size: clamp(1.8rem, 6vw, 2.2rem); margin-bottom: 10px; color: var(--black); }
        .fact-text { font-family: 'Bangers', cursive; font-size: clamp(0.85rem, 3.5vw, 0.95rem); line-height: 1.35; letter-spacing: 0.5px; }

        /* ===== AAGE KYA SECTION ===== */
        .aage-kya-section { padding: 20px 15px 50px; }

        .action-box {
          background: var(--yellow); border: var(--border); padding: 25px 20px; position: relative;
          box-shadow: var(--shadow-md);
        }
        .action-box .tape-tl { top: -10px; left: 15px; transform: rotate(-15deg); }
        .action-box .tape-br { bottom: -10px; right: 15px; transform: rotate(-15deg); }

        .action-box h2 { font-family: 'Bangers', cursive; font-size: clamp(1.4rem, 7vw, 2rem); margin-bottom: 12px; color: var(--black);}
        .action-box p { font-family: 'Patrick Hand',cursive; font-size: clamp(1.05rem, 4vw, 1.2rem); line-height: 1.4; margin-bottom: 20px; letter-spacing: 1px; color: var(--black); }
        
        .btn-black-arrow {
          background: var(--black); color: var(--white);
          border: 2px solid var(--black); padding: 12px 18px;
          font-family: 'Bangers', cursive; font-size: clamp(1.05rem, 4vw, 1.2rem); letter-spacing: 1px;
          display: inline-flex; align-items: center; gap: 10px; cursor: pointer;
          box-shadow: 4px 4px 0 var(--white); transition: var(--transition); text-decoration: none;
        }
        .btn-black-arrow:active { transform: translate(4px, 4px); box-shadow: 0px 0px 0 var(--white); }
        
        .fist-bump { position: absolute; right: 5px; bottom: 5px; width: clamp(80px, 25vw, 100px); transform: rotate(-10deg); filter: drop-shadow(2px 2px 0 var(--black));}

        .ps-note {
          display: flex; gap: 12px; align-items: flex-start;
          margin-top: 35px; padding: 15px; border: var(--border); background: var(--white);
          font-family: 'Bangers', cursive; font-size: clamp(0.95rem, 4vw, 1.1rem); letter-spacing: 1px; line-height: 1.4;
          box-shadow: var(--shadow-sm); transform: rotate(1deg);
        }
        .ps-arrow { font-size: 1.8rem; transform: scaleX(-1) rotate(-15deg); color: var(--black); }
        /* ===== GROUP PHOTO SECTION ===== */
.group-photo-section {
  padding: 25px 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.group-photo-frame {
  position: relative;
  width: 100%;
  max-width: 340px;
  background: var(--white);
  border: var(--border);
  padding: 12px 12px 45px 12px;
  box-shadow: var(--shadow-md);
  transform: rotate(-1.5deg);
}

.group-photo-frame {
  position: relative;
  width: 100%;
  max-width: 340px;
  background: var(--white);
  border: var(--border);
  padding: 12px 12px 45px 12px;
  box-shadow: var(--shadow-md);
  transform: rotate(-1.5deg);
}

.group-photo-imgwrap {
  position: relative;
  width: 100%;
  border: 2px solid var(--black);
  overflow: hidden;
}

.group-photo-imgwrap img {
  width: 100%;
  height: auto;
  display: block;
}

.group-photo-bw {
  filter: grayscale(15%) contrast(105%);
  transition: opacity 0.4s ease-in-out;
}

.group-photo-color {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}

.group-photo-frame:hover .group-photo-bw {
  opacity: 0;
}

.group-photo-frame:hover .group-photo-color {
  opacity: 1;
}

.group-photo-caption {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: 'Bangers', cursive;
  font-size: clamp(0.95rem, 4vw, 1.15rem);
  letter-spacing: 1px;
  color: var(--black);
}

.group-photo-badge {
  position: absolute;
  top: -14px;
  right: -10px;
  background: var(--yellow);
  border: 2px solid var(--black);
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bangers', cursive;
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.1;
  transform: rotate(12deg);
  box-shadow: var(--shadow-sm);
  z-index: 5;
}
      `}</style>
{/* ===== GROUP PHOTO SECTION ===== */}
      <section className="group-photo-section">
        <div className="group-photo-frame">
          <div className="tape tape-tl"></div>
          <div className="tape tape-br"></div>
          <div className="group-photo-badge">FULL<br/>SQUAD</div>
         <div className="group-photo-imgwrap">
  <img src={groupImage} alt="Superboys of Rehla Team" className="group-photo-bw" />
  <img src={groupImageColor} alt="Superboys of Rehla Team Color" className="group-photo-color" />
</div>
          <div className="group-photo-caption">YEH RAHI PURI TEAM 🤝</div>
        </div>
      </section>

      {/* ===== HERO / FOUNDER SECTION ===== */}
      <section className="about-hero">
        <div style={{ textAlign: 'left' }}>
          <div className="badge-black">ABOUT THE FOUNDER 👀</div>
        </div>
        
        <div className="hero-top-area">
          <div className="hero-text-col">
            <h1 className="hero-title">
              EK LAUNDA THA,<br />
              JISNE SOCHA KUCH <span className="hl-yellow">FARAK</span><br />
              PADNA CHAIYE
            </h1>
            <p className="hero-sub">BAS, <span className="hl-black">NGO</span> BAN GYA</p>
            <i className="fa-regular fa-lightbulb doodle-bulb"></i>
          </div>

          <div className="founder-col">
            <div className="speech-bubble-ceo">
              <strong>CEO</strong><br />
              <small>(CHIEF <span className="hl-yellow" style={{padding:'0', border:'none', boxShadow:'none'}}>EMOTION</span> OFFICER)</small>
            </div>
            
            <div className="founder-img-container">
              <div className="founder-img-shadow"></div>
              <img src={founderImage} alt="Founder" className="founder-img" />
              <i className="fa-solid fa-crown doodle-crown"></i>
              
              <div className="founder-badge">
                <h3>MAIN CHARACTER</h3>
                <p>PROFESSION: <span className="text-yellow">ENGINEER</span></p>
                <p>FULL TIME: <span className="text-yellow">OVERTHINKER</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="taped-note">
          <div className="tape tape-tl"></div>
          <div className="tape tape-br"></div>
          <i className="fa-solid fa-graduation-cap doodle-grad-cap"></i>
          <div style={{ fontSize: '0.9rem', marginBottom: '6px', textDecoration: 'underline' }}>RESUME SUMMARY:</div>
          DEGREE IN <span className="hl-black" style={{margin:'2px'}}>ENGINEERING</span><br />
        ACCIDENTALLY STARTED AN <span className="hl-black" style={{margin:'2px'}}>NGO</span> <br />
NOW BOTH SYSTEMS NEED DEBUGGING
<br />
          <div style={{marginTop: '8px', fontSize: '0.75rem'}}>SKILLS: JUGAAD, EMPATHY & CURIOSITY.</div>
        </div>
      </section>

      {/* ===== MARQUEE BANNER ===== */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
<span>🤝 JADU KI JHAPPI NAHI DE SAKTE? 🤝</span> <span>KOI BAAT NAHI, VOLUNTEER HI BAN JAO. 😌</span>
  <span>🤝 JADU KI JHAPPI NAHI DE SAKTE? 🤝</span>
  <span>KOI BAAT NAHI, VOLUNTEER HI BAN JAO.❤️</span>
</div>
      </div>

      {/* ===== STORY SECTION ===== */}
      <section className="story-section" id="story">
        <div className="story-header">
          <div className="badge-black">MERI KAHANI (SHORT ME)</div>
          <div className="dashed-line">
            <i className="fa-solid fa-bolt"></i>
          </div>
        </div>

        <div className="story-content clearfix">
          <div className="story-plan-note">
           PLAN:<br />
GOOGLE KAR LENGE<br />
PAR RUKENGE NHI 😎
          </div>
          
          Ek Din Chai Peete Peete Socha,
"Yaar, Sabko Problem Pata Hai... Solution Ka Kya?"<br />

Phir Wahi Kiya Jo Har Confused Engineer Karta Hai:
Overthink Kiya... Aur NGO Bana Liya. 😌<br /><br />

Tab Se Koshish Jaari Hai —
Thodi Kam Shikayat,
Thoda Zyada Kaam.
          <div className="hl-yellow font-bangers" style={{ fontSize: '1.2rem', marginTop: '15px', display: 'inline-block' }}>
            TL;DR - DUNIYA FIX KARNI HAI, FUNDS BHEJO. 🤝
          </div>
        </div>
      </section>

      {/* ===== FACTS SECTION ===== */}
      <section className="facts-section" id="facts">
        <div className="facts-title">
          <span className="hl-yellow">FACTS</span> <span className="font-Patrick-Hand" style={{fontSize: '1rem', letterSpacing: '0'}}>(JO TUMHARI TARAH REAL HAIN)</span>
        </div>

        <div className="facts-grid">
          <div className="fact-item">
            <div className="fact-icon"><i className="fa-solid fa-mug-hot"></i></div>
            <div className="fact-text">NEEND KAM, STRESS ZYADA.<br />FUEL: <span style={{color: 'var(--yellow)', WebkitTextStroke: '1px var(--black)'}}>SIRF KADAK CHAI.</span></div>
          </div>
          <div className="fact-item">
            <div className="fact-icon"><i className="fa-solid fa-hand-holding-heart"></i></div>
            <div className="fact-text">DIL BADA HAI, BUDGET NAI.<br />(STILL GETTING SHIT DONE).</div>
          </div>
          <div className="fact-item">
            <div className="fact-icon"><i className="fa-solid fa-eye"></i></div>
            <div className="fact-text">VISION CLEAR HAI,<br />CHASHME KA NUMBER NAHI.</div>
          </div>
          <div className="fact-item">
            <div className="fact-icon"><i className="fa-solid fa-battery-quarter"></i></div>
            <div className="fact-text">SOCIAL BATTERY 1%,<br />COMMITMENT <span style={{color: 'var(--yellow)', WebkitTextStroke: '1px var(--black)'}}>100% FULL.</span></div>
          </div>
        </div>
      </section>

      {/* ===== AAGE KYA SECTION ===== */}
      <section className="aage-kya-section">
        <div className="action-box">
          <div className="tape tape-tl"></div>
          <div className="tape tape-br"></div>
          
          <h2>AAGE KYA KARNA HAI?</h2>
          <p>
  Reels Dekh Dekh Ke Revolutionary Toh Sab Ban Jaate Hain.<br />
  Ground Pe Utarne Wale Characters Thode Rare Hote Hain.<br />
  Lagta Hai Tu Main Character Material Hai. 👀
</p>
          <Link
  to="/volunteer"
  className="btn-black-arrow"
  style={{ textDecoration: "none" }}
  onClick={closeMenu}
>
  CHAL, KUCH <span style={{ color: "var(--yellow)" }}>DANG KA</span> KARTE HAIN.
  <i className="fa-solid fa-arrow-right"></i>
</Link>

          <svg className="fist-bump" viewBox="0 0 100 60" fill="none" stroke="var(--black)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M50 10 L45 2 M50 50 L45 58 M40 30 L32 30 M60 30 L68 30" stroke="var(--black)" strokeWidth="4" />
            <path d="M45 40 C35 45, 20 45, 10 35 C5 30, 5 25, 15 25 C25 25, 30 25, 40 20 C45 25, 50 35, 45 40 Z" fill="var(--white)" />
            <path d="M40 20 C42 22, 42 28, 40 30" />
            <path d="M42 25 C44 27, 44 33, 42 35" />
            <path d="M55 40 C65 45, 80 45, 90 35 C95 30, 95 25, 85 25 C75 25, 70 25, 60 20 C55 25, 50 35, 55 40 Z" fill="var(--white)" />
            <path d="M60 20 C58 22, 58 28, 60 30" />
            <path d="M58 25 C56 27, 56 33, 58 35" />
          </svg>
        </div>

        <div className="ps-note">
          <i className="fa-solid fa-reply ps-arrow"></i>
          <div>
            P.S. - Website Dekh Kar Muskurana<br />Kaam Dekh Kar<span className="hl-yellow" style={{boxShadow:'none', padding:'0 4px', margin:'0 2px'}}> Jud Jana</span> HUMARE SATH 
          </div>
        </div>
      </section>
    </>
  );
}