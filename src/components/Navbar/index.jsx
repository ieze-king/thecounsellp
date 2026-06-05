import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Button from '../shared/Button';
import { MenuIcon, CloseIcon } from '../shared/Icons';
import { siteConfig } from '../../data/siteConfig';
import { smoothScrollTo } from '../../utils/scrollTo';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice' },
  { label: 'Our Team', href: '#team' },
  { label: 'Publications', href: '/publications', isRoute: true },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      smoothScrollTo(href);
    } else {
      navigate(`/${href}`);
    }
  }, [location.pathname, navigate]);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <div className={styles.inner}>
          <a href="/" className={styles.logo} onClick={handleLogoClick}>
            <img src={logo} alt={`${siteConfig.firmName} logo`} className={styles.logoImg} />
            <div className={styles.logoText}>
              <div className={styles.logoTop}>
                <span className={styles.logoAbbr}>{siteConfig.firmAbbr}</span>
                <span className={styles.logoDivider} aria-hidden="true" />
                <span className={styles.logoName}>{siteConfig.firmName}</span>
              </div>
              <span className={styles.logoTag}>{siteConfig.firmAka}</span>
            </div>
          </a>

          <ul className={styles.links} role="list">
            {navLinks.map(({ label, href, isRoute }) => (
              <li key={href}>
                {isRoute ? (
                  <Link to={href} className={styles.link} onClick={() => setIsMenuOpen(false)}>
                    {label}
                  </Link>
                ) : (
                  <a href={href} className={styles.link} onClick={(e) => handleNavClick(e, href)}>
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <Button href="#contact" variant="gold" className={styles.cta} onClick={(e) => handleNavClick(e, '#contact')}>
            Book Appointment
          </Button>

          <button
            className={styles.hamburger}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <CloseIcon className={styles.hamburgerIcon} /> : <MenuIcon className={styles.hamburgerIcon} />}
          </button>
        </div>
      </nav>

      <div
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
        aria-hidden={!isMenuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {navLinks.map(({ label, href, isRoute }) => (
          isRoute ? (
            <Link key={href} to={href} className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
              {label}
            </Link>
          ) : (
            <a key={href} href={href} className={styles.mobileLink} onClick={(e) => handleNavClick(e, href)}>
              {label}
            </a>
          )
        ))}
        <Button href="#contact" variant="gold" onClick={(e) => handleNavClick(e, '#contact')}>
          Book Appointment
        </Button>
      </div>
    </>
  );
}
