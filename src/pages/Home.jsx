import React, { useState, useEffect, useRef } from 'react';
import Ajay from '../ajay-hero.png';
import { Link } from "react-router-dom";

export default function Home() {
  const [isHamOpen, setIsHamOpen] = useState(false);
  const countersRef = useRef([]);
  const revealRef = useRef([]);

  useEffect(() => {
    // ===== SCROLL REVEAL =====
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    revealRef.current.forEach(el => {
      if (el) io.observe(el);
    });

    // Make hero elements visible immediately
    const heroElements = document.querySelectorAll('.hero .reveal');
    heroElements.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 150 + i * 120);
    });

    // ===== COUNTER ANIMATION =====
    const counterIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, 35);
        counterIO.unobserve(el);
      });
    }, { threshold: 0.5 });

    countersRef.current.forEach(c => {
      if (c) counterIO.observe(c);
    });

    return () => {
      io.disconnect();
      counterIO.disconnect();
    };
  }, []);

  // ===== DONATE BUTTON FEEDBACK =====
  const handleDonateClick = (e) => {
    const btn = e.currentTarget;
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> SHUKRIYA!';
    setTimeout(() => {
      btn.innerHTML = orig;
    }, 1800);
  };

  // ===== BOTTOM NAV ACTIVE =====
  const handleNavClick = (e) => {
    document.querySelectorAll('.bottom-nav a').forEach(x => x.classList.remove('active'));
    e.currentTarget.classList.add('active');
  };

  return (
    <>
      {/* ===== FONTS AND ICONS ===== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Bangers&family=Patrick Hand:wght@400;700&family=Patrick+Hand&family=Permanent+Marker&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      {/* ===== STYLES ===== */}
      <style>{`
        :root {
          --black: #111;
          --white: #fafaf3;
          --yellow: #FFD600;
          --yellow-light: #fff9c4;
          --yellow-dark: #f0c000;
          --ink: #1a1a1a;
          --border: 2.5px solid #111;
          --radius: 14px;
          --shadow: 4px 4px 0 #111;
          --shadow-lg: 6px 6px 0 #111;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: var(--white);
          color: var(--black);
          font-family: 'Patrick Hand', cursive;
          font-size: 16px;
          max-width: 480px;
          margin: 0 auto;
          overflow-x: hidden;
          position: relative;
        }

        /* grain texture */
        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 9999; opacity: 0.6;
        }

        /* ===== HERO ===== */
        .hero {
          padding: 28px 18px 0;
          position: relative;
          overflow: hidden;
          min-height: 400px;
        }

        /* doodle scatter */
        .doodle-bg {
          position: absolute; inset: 0; pointer-events: none;
          overflow: hidden;
        }
        .doodle-bg span {
          position: absolute;
          font-size: 1.15rem; opacity: 0.18;
          animation: floaty 5s ease-in-out infinite alternate;
        }
        @keyframes floaty {
          from { transform: translateY(0) rotate(0); }
          to   { transform: translateY(-8px) rotate(10deg); }
        }

        .hero-text { position: relative; z-index: 2; }

        .hero-h1 {
          font-family: 'Bangers', cursive;
          font-size: 2.9rem; letter-spacing: 2px; line-height: 1.05;
          margin-bottom: 12px;
        }
        .hero-h1 .line2 {
          display: inline-block;
          background: var(--yellow);
          border: var(--border); border-radius: 6px;
          padding: 0 8px;
          box-shadow: var(--shadow);
          transform: rotate(-1.5deg);
        }

        .hero-sub {
          font-family: 'Patrick Hand', cursive;
          font-size: 1.15rem; color: #444; margin-bottom: 20px;
        }

        .btn-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--white); color: var(--black);
          border: var(--border); border-radius: 10px;
          padding: 12px 22px;
          font-family: 'Bangers', cursive; font-size: 1.15rem; letter-spacing: 1.5px;
          cursor: pointer; box-shadow: var(--shadow);
          text-decoration: none;
          transition: transform .12s, box-shadow .12s;
          margin-bottom: 8px;
        }
        .btn-cta:active { transform: translate(3px,3px); box-shadow: 1px 1px 0 #111; }

        /* speech bubble */
        .speech-bubble {
          position: absolute; right: 12px; top: 18px; z-index: 3;
          background: var(--white);
          border: var(--border); border-radius: 16px;
          padding: 10px 13px;
          font-family: 'Patrick Hand', cursive; font-weight: 700;
          font-size: 0.82rem; line-height: 1.3;
          max-width: 145px; text-align: center;
          box-shadow: var(--shadow);
          animation: bob 3s ease-in-out infinite alternate;
        }
        .speech-bubble::after {
          content: '';
          position: absolute; bottom: -14px; left: 20px;
          width: 0; height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 14px solid #111;
        }
        .speech-bubble::before {
          content: '';
          position: absolute; bottom: -11px; left: 21px;
          width: 0; height: 0;
          border-left: 9px solid transparent;
          border-right: 9px solid transparent;
          border-top: 12px solid var(--white);
          z-index: 1;
        }
        .speech-bubble .highlight { background: var(--yellow); padding: 0 2px; border-radius: 2px; }

        @keyframes bob {
          from { transform: translateY(0) rotate(-1deg); }
          to   { transform: translateY(-6px) rotate(1deg); }
        }

        /* mascot area */
        .mascot-zone {
  position: absolute;
  right: 12px;
  bottom: 20px;

  z-index: 5;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.mascot-img {
  width: 120px;
  height: auto;
  display: flex;

  filter: drop-shadow(4px 4px 0 rgba(0,0,0,.15));

  animation: mascot-idle 2.5s ease-in-out infinite alternate;
}

@media (max-width: 480px) {
  .mascot-zone {
    right: 8px;
    bottom: 10px;
  }

  .mascot-img {
    width: 150px;
    display : flex;
  }
}

@keyframes mascot-idle {
  from {
    transform: rotate(-3deg) translateY(0);
  }

  to {
    transform: rotate(3deg) translateY(-8px);
  }
}

        /* torn paper edge */
        .torn-edge {
          width: 100%; overflow: hidden; line-height: 0;
          margin-top: -2px;
        }
        .torn-edge svg { display: block; width: 100%; height: 30px; }

        /* ===== SECTIONS SHARED ===== */
        section { padding: 0px 18px 18px 18px; }
        .section-title {
          font-family: 'Bangers', cursive;
          font-size: 1.9rem; letter-spacing: 2px;
          text-align: center; margin-bottom: 4px;
        }
        .section-sub {
          font-family: 'Patrick Hand', cursive;
          font-size: 1.15rem; text-align: center;
          color: #555; margin-bottom: 24px;
        }

        /* ===== PROGRAMS GRID ===== */
        #programs { background: var(--white); }

        .programs-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-bottom: 22px;
        }

        .prog-card {
          border: var(--border); border-radius: var(--radius);
          padding: 16px 12px; text-align: center;
          box-shadow: var(--shadow);
          background: var(--white);
          transition: transform .15s, box-shadow .15s;
          position: relative; overflow: hidden;
        }
        .prog-card:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 #111; }
        .prog-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 5px;
          background: var(--yellow);
          border-bottom: var(--border);
        }

        .prog-icon-wrap {
          width: 56px; height: 56px; border-radius: 50%;
          background: var(--yellow); border: var(--border);
          display: flex; align-items: center; justify-content: center;
          margin: 10px auto 10px;
          font-size: 1.5rem; color: var(--black);
          box-shadow: 3px 3px 0 #111;
        }

        .prog-name {
          font-family: 'Bangers', cursive; font-size: 1.5rem;
          letter-spacing: 1px; margin-bottom: 4px;
        }
        .prog-desc {
          font-family: 'Patrick Hand', cursive; font-size: 1.15rem;
          color: #444; line-height: 1.3;
        }

        .btn-outline {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          border: var(--border); border-radius: 10px;
          padding: 12px 22px;
          font-family: 'Bangers', cursive; font-size: 1.1rem; letter-spacing: 1.5px;
          cursor: pointer; box-shadow: var(--shadow);
          background: var(--white); color: var(--black);
          text-decoration: none; width: 100%;
          transition: transform .12s, box-shadow .12s, background .12s;
        }
        .btn-outline:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 #111; }
        .btn-outline:hover { background: var(--yellow-light); }

        /* ===== IMPACT SECTION ===== */
        #impact {
          background: var(--black); color: var(--white);
          position: relative; overflow: hidden;
        }
        #impact .section-title { color: var(--white); }
        #impact .section-sub { color: #aaa; }

        /* brush stroke behind title */
        .brush-title-wrap { position: relative; display: inline-block; width: 100%; text-align: center; }
        .brush-stroke {
          position: absolute; left: 50%; top: 50%;
          transform: translate(-50%,-50%);
          width: 94%; height: 40px;
          background: #FFD600; opacity: 0.15;
          border-radius: 4px; pointer-events: none;
        }

        .impact-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .impact-card {
          border: 2px solid rgba(255,255,255,0.25);
          border-radius: var(--radius);
          padding: 18px 12px; text-align: center;
          background: rgba(255,255,255,0.06);
          position: relative;
        }
        .impact-card::after {
          content: attr(data-doodle);
          position: absolute; top: -10px; right: -8px;
          font-size: 1.1rem; opacity: 0.5;
        }

        .impact-num {
          font-family: 'Bangers', cursive;
          font-size: 2.4rem; letter-spacing: 2px;
          color: var(--yellow); line-height: 1;
        }
        .impact-label {
          font-family: 'Patrick Hand', cursive;
          font-size: 1.15rem; color: #ccc;
          margin-top: 4px; line-height: 1.3;
        }
        .impact-icon { font-size: 1.4rem; margin-bottom: 6px; color: var(--yellow); }

        /* ===== KYUN SECTION ===== */
        #kyun { background: var(--white); }

        .kyun-grid {
          display: flex; flex-direction: column; gap: 12px;
        }

        .kyun-bubble {
          border: var(--border); border-radius: 20px;
          padding: 14px 16px;
          font-family: 'Patrick Hand', cursive; font-weight: 700;
          font-size: 1rem; line-height: 1.35;
          display: flex; align-items: center; gap: 12px;
          box-shadow: var(--shadow);
          background: var(--white);
          transition: transform .15s;
        }
        .kyun-bubble:nth-child(even) { transform: rotate(0.8deg); }
        .kyun-bubble:nth-child(odd)  { transform: rotate(-0.5deg); }
        .kyun-bubble:active { transform: rotate(0) scale(0.98); }

        .kyun-ico {
          width: 44px; height: 44px; flex-shrink: 0;
          background: var(--yellow); border: var(--border); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; color: var(--black);
          box-shadow: 2px 2px 0 #111;
        }
        .kyun-text .big { font-size: 1.05rem; }
        .kyun-text .small { font-size: 1.15rem; color: #555; font-weight: 400; }
        .kyun-text .hl { background: var(--yellow); padding: 0 3px; border-radius: 3px; }

        /* ===== ACTION SECTION ===== */
        #action { background: var(--yellow-light); }

        .action-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 12px; margin-bottom: 20px;
        }

        .action-card {
          border: var(--border); border-radius: var(--radius);
          padding: 18px 10px; text-align: center;
          background: var(--white); box-shadow: var(--shadow);
          cursor: pointer;
          transition: transform .15s, box-shadow .15s, background .15s;
        }
        .action-card:active { transform: translate(2px,2px); box-shadow: 2px 2px 0 #111; }
        .action-card:hover { background: var(--yellow); }

        .action-icon {
          font-size: 1.6rem; color: var(--black);
          width: 52px; height: 52px;
          background: var(--yellow); border: var(--border); border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 10px;
          box-shadow: 3px 3px 0 #111;
          transition: background .15s;
        }
        .action-card:hover .action-icon { background: var(--white); }

        .action-name {
          font-family: 'Bangers', cursive; font-size: 1.05rem;
          letter-spacing: 1px; margin-bottom: 4px;
        }
        .action-desc {
          font-family: 'Patrick Hand', cursive; font-size: 1.15rem; color: #444;
        }

        .whatsapp-note {
          border: var(--border); border-radius: 10px;
          background: var(--yellow); padding: 12px 16px;
          font-family: 'Patrick Hand', cursive; font-weight: 700;
          font-size: 0.92rem; line-height: 1.4;
          display: flex; align-items: flex-start; gap: 10px;
          box-shadow: var(--shadow);
        }
        .whatsapp-note i { font-size: 1.4rem; flex-shrink: 0; margin-top: 2px; }

        /* ===== SCROLL REVEAL ===== */
        .reveal {
          opacity: 0; transform: translateY(28px);
          transition: opacity .55s ease, transform .55s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* stagger children */
        .reveal-stagger > * {
          opacity: 0; transform: translateY(22px);
          transition: opacity .45s ease, transform .45s ease;
        }
        .reveal-stagger.visible > *:nth-child(1) { opacity: 1; transform: none; transition-delay: 0s; }
        .reveal-stagger.visible > *:nth-child(2) { opacity: 1; transform: none; transition-delay: .08s; }
        .reveal-stagger.visible > *:nth-child(3) { opacity: 1; transform: none; transition-delay: .16s; }
        .reveal-stagger.visible > *:nth-child(4) { opacity: 1; transform: none; transition-delay: .24s; }

        .count-num { display: inline-block; }

        /* ===== WIGGLE on hover ===== */
        @keyframes wiggle {
          0%,100% { transform: rotate(0); }
          25%      { transform: rotate(-3deg); }
          75%      { transform: rotate(3deg); }
        }
        .prog-card:hover { animation: wiggle .4s ease; }

        /* ===== SPARKLE ===== */
        .sparkle {
          display: inline-block;
          animation: spin 3s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ===== HERO ===== */}
      <section className="hero">
        {/* scattered doodles bg */}
        <div className="doodle-bg">
          <span style={{ left: '8%', top: '15%', animationDelay: '.2s' }}>✦</span>
          <span style={{ left: '82%', top: '60%', animationDelay: '.7s', fontSize: '.9rem' }}>★</span>
          <span style={{ left: '5%', top: '72%', animationDelay: '1.1s' }}>✈</span>
          <span style={{ left: '70%', top: '82%', animationDelay: '.4s' }}>✦</span>
          <span style={{ left: '55%', top: '10%', animationDelay: '1.4s', fontSize: '1.4rem' }}>⚡</span>
          <span style={{ left: '25%', top: '85%', animationDelay: '.9s' }}>◇</span>
        </div>

        {/* speech bubble top-right */}
        <div className="speech-bubble reveal" ref={el => revealRef.current.push(el)}>
          SOCIETY TAB<br />BADLEGI, JAB<br /><span className="highlight">SOCH</span> BADLEGI!
        </div>

        <div className="hero-text">
          <h1 className="hero-h1 reveal" ref={el => revealRef.current.push(el)} style={{ transitionDelay: '.1s' }}>
            TRUELY<br />
            <span className="line2">GENZ</span><br />
            NGO
          </h1>
          <p className="hero-sub reveal" ref={el => revealRef.current.push(el)} style={{ transitionDelay: '.2s' }}>
            Donation ho to kya kuch nhi ho sakta<br />
          </p>
          <a href="#programs" className="btn-cta reveal" ref={el => revealRef.current.push(el)} style={{ transitionDelay: '.3s' }}>
            HUM KYA KARTE HAIN? <i className="fa-solid fa-arrow-down"></i>
          </a>
        </div>

        <div className="mascot-zone">
  <img
    src={Ajay}
    alt="Ajay"
    className="mascot-img"
  />
</div>
      </section>

      {/* torn paper */}
      <div className="torn-edge">
        <svg viewBox="0 0 480 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 L0,18 Q20,28 40,16 Q60,4 80,20 Q100,30 120,14 Q140,2 160,22 Q180,30 200,12 Q220,0 240,20 Q260,30 280,10 Q300,0 320,22 Q340,30 360,14 Q380,2 400,20 Q420,30 440,16 Q460,6 480,20 L480,0 Z" fill="#fafaf3" />
        </svg>
      </div>

      {/* ===== PROGRAMS ===== */}
      <section id="programs">
        <div className="section-title reveal" ref={el => revealRef.current.push(el)}>HUM KYA KARTE HAIN?</div>
        <div className="section-sub reveal" ref={el => revealRef.current.push(el)}>(boring nahi hai, promise!)</div>

        <div className="programs-grid reveal-stagger" ref={el => revealRef.current.push(el)}>
          <div className="prog-card">
            <div className="prog-icon-wrap"><i className="fa-solid fa-book-open"></i></div>
            <div className="prog-name">EDUCATION</div>
            <div className="prog-desc">Padhai se sirf marks nahi, options milte hain.</div>
          </div>
          <div className="prog-card">
            <div className="prog-icon-wrap"><i className="fa-solid fa-bowl-food"></i></div>
            <div className="prog-name">FOOD &amp; NUTRITION</div>
            <div className="prog-desc">Khaali pet gyaan nahi, khana chahiye pehle.</div>
          </div>
          <div className="prog-card">
            <div className="prog-icon-wrap"><i className="fa-solid fa-screwdriver-wrench"></i></div>
            <div className="prog-name">SKILL DEV</div>
            <div className="prog-desc">Skill issue? Fix kar dete hain.</div>
          </div>
          <div className="prog-card">
            <div className="prog-icon-wrap"><i className="fa-solid fa-earth-asia"></i></div>
            <div className="prog-name">COMMUNITY CARE</div>
            <div className="prog-desc">Akele survive karna overrated hai</div>
          </div>
        </div>

       <Link
  to="/volunteer"
  className="btn-outline reveal"
  ref={(el) => {
    if (el && !revealRef.current.includes(el)) {
      revealRef.current.push(el);
    }
  }}
>
  HuMARE SATH JUDO GE? <i className="fa-solid fa-arrow-right"></i>
</Link>
      </section>

      {/* ===== IMPACT ===== */}
      <section id="impact">
        <div className="brush-title-wrap reveal" ref={el => revealRef.current.push(el)}>
          <div className="brush-stroke"></div>
          <div className="section-title" style={{ position: 'relative', zIndex: 2 }}>
            THODA THODA FARAK = BADA IMPACT
          </div>
        </div>
        <div className="section-sub reveal" ref={el => revealRef.current.push(el)} style={{ color: '#aaa' }}>kyunki numbers jhooth nahi bolte 📊</div>

        <div className="impact-grid reveal-stagger" ref={el => revealRef.current.push(el)}>
          <div className="impact-card" data-doodle="✦">
            <div className="impact-icon"><i className="fa-solid fa-users"></i></div>
            <div className="impact-num"><span className="count-num" data-target="0" ref={el => countersRef.current.push(el)}>0</span>K+</div>
            <div className="impact-label">Logon tak pahunche</div>
          </div>
          <div className="impact-card" data-doodle="★">
            <div className="impact-icon"><i className="fa-solid fa-graduation-cap"></i></div>
            <div className="impact-num"><span className="count-num" data-target="0" ref={el => countersRef.current.push(el)}>0</span>K+</div>
            <div className="impact-label">Bachchon ki padhai support</div>
          </div>
          <div className="impact-card" data-doodle="⚡">
            <div className="impact-icon"><i className="fa-solid fa-utensils"></i></div>
            <div className="impact-num"><span className="count-num" data-target="0" ref={el => countersRef.current.push(el)}>0</span>+</div>
            <div className="impact-label">Meals served</div>
          </div>
          <div className="impact-card" data-doodle="◇">
            <div className="impact-icon"><i className="fa-solid fa-heart"></i></div>
            <div className="impact-num"><span className="count-num" data-target="0" ref={el => countersRef.current.push(el)}>0</span>+</div>
            <div className="impact-label">Communities empowered</div>
          </div>
        </div>
      </section>

      {/* torn paper edge (white on black) */}
      <div className="torn-edge" style={{ background: '#111', marginBottom: '-2px' }}>
        <svg viewBox="0 0 480 30" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleY(-1)' }}>
          <path d="M0,0 L0,18 Q20,28 40,16 Q60,4 80,20 Q100,30 120,14 Q140,2 160,22 Q180,30 200,12 Q220,0 240,20 Q260,30 280,10 Q300,0 320,22 Q340,30 360,14 Q380,2 400,20 Q420,30 440,16 Q460,6 480,20 L480,0 Z" fill="#fafaf3" />
        </svg>
      </div>

      {/* ===== KYUN ===== */}
      <section id="kyun">
        <div className="section-title reveal" ref={el => revealRef.current.push(el)}>KYUN?</div>
        <div className="section-sub reveal" ref={el => revealRef.current.push(el)}>Kyunki humein drama nahi, <span style={{ background: 'var(--yellow)', padding: '0 3px', borderRadius: '3px' }}>FARAK</span> chahiye.</div>

        <div className="kyun-grid reveal-stagger" ref={el => revealRef.current.push(el)}>
          <div className="kyun-bubble">
            <div className="kyun-ico"><i className="fa-solid fa-thumbs-up"></i></div>
            <div className="kyun-text">
              <div className="big">Like ki jagah <span className="hl">LIFE CHANGE</span> karte hain.</div>
            </div>
          </div>
          <div className="kyun-bubble">
            <div className="kyun-ico"><i className="fa-solid fa-clapperboard"></i></div>
            <div className="kyun-text">
              <div className="big">Reel nahi, <span className="hl">REAL</span> impact.</div>
              <div className="small">Content creators nahi hain hum. 😤</div>
            </div>
          </div>
          <div className="kyun-bubble">
            <div className="kyun-ico"><i className="fa-solid fa-bolt"></i></div>
            <div className="kyun-text">
              <div className="big">Attention nahi, <span className="hl">ACTION.</span></div>
              <div className="small">Viral hona goal nahi, change hai.</div>
            </div>
          </div>
          <div className="kyun-bubble">
            <div className="kyun-ico"><i className="fa-solid fa-people-group"></i></div>
            <div className="kyun-text">
              <div className="big">Hum nahi, <span className="hl">HUM SAATH.</span></div>
              <div className="small">Community power &gt; solo hero.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AAP KYA KAR SAKTE HO ===== */}
      <section id="action">
        <div className="section-title reveal" ref={el => revealRef.current.push(el)}>AAP KYA KAR SAKTE HO?</div>
        <div className="section-sub reveal" ref={el => revealRef.current.push(el)}>(sab kuch, seriously 👀)</div>

        <div className="action-grid reveal-stagger" ref={el => revealRef.current.push(el)}>
          <div className="action-card">
            <div className="action-icon"><i className="fa-solid fa-heart"></i></div>
            <div className="action-name">DONATE</div>
            <div className="action-desc">Paise do ya pyaar, dono chalega.</div>
          </div>
          <div className="action-card">
            <div className="action-icon"><i className="fa-solid fa-hand"></i></div>
            <div className="action-name">VOLUNTEER</div>
            <div className="action-desc">Time do, impact multiply hoga.</div>
          </div>
          <div className="action-card">
            <div className="action-icon"><i className="fa-solid fa-share-nodes"></i></div>
            <div className="action-name">SHARE</div>
            <div className="action-desc">Acha kaam viral karna allowed hai.</div>
          </div>
          <div className="action-card">
            <div className="action-icon"><i className="fa-solid fa-mug-hot"></i></div>
            <div className="action-name">SPREAD LOVE</div>
            <div className="action-desc">Choti choti kindness badi hoti hai.</div>
          </div>
        </div>

        <div className="whatsapp-note reveal" ref={el => revealRef.current.push(el)}>
          <i className="fa-solid fa-note-sticky"></i>
          <span><strong></strong> Sab bolte hain "kuch karna chahiye."🥲<br />
Hum galti se seriously le baithe. 💀
</span>
        </div>
      </section>
    </>
  );
}