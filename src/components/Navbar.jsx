import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from './logo11.png';

const links = [
  { path: '/', label: 'HOME' },
  { path: '/about', label: 'ABOUT US' },
  { path: '/donation', label: 'DONATION' },
  { path: '/volunteer', label: 'VOLUNTEER' },
  { path: '/faq', label: 'FAQ' },
  { path: '/contact', label: 'CONTACT' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="navbar">
        {/* ── Logo ── */}
        <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
          <div className="navbar__logo-inner">
           
            <img src={logo} alt=" Logo" className="img-logo" />
          </div>
        </NavLink>

        {/* ── Right: Donate + Hamburger ── */}
        <div className="navbar__right">
          <NavLink to="/donation" className="navbar__btn-donate" onClick={closeMenu}>
            DONATE ❤️ 
  
          </NavLink>

          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--active' : ''}`}
        aria-hidden={!menuOpen}
      >
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              `navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`
            }
            onClick={closeMenu}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default Navbar;