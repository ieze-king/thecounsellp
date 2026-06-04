import { useState, useEffect, useCallback } from 'react';
import Button from '../shared/Button';
import { MenuIcon, CloseIcon } from '../shared/Icons';
import { siteConfig } from '../../data/siteConfig';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice' },
  { label: 'Our People', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

function scrollTo(href) {
  const target = document.querySelector(href);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    scrollTo(href);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`} role="navigation" aria-label="Main navigation">
        <div className={styles.inner}>
          <a href="#home" className={styles.logo} onClick={(e) => handleNavClick(e, '#home')}>
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
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className={styles.link} onClick={(e) => handleNavClick(e, href)}>
                  {label}
                </a>
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
        {navLinks.map(({ label, href }) => (
          <a key={href} href={href} className={styles.mobileLink} onClick={(e) => handleNavClick(e, href)}>
            {label}
          </a>
        ))}
        <Button href="#contact" variant="gold" onClick={(e) => handleNavClick(e, '#contact')}>
          Book Appointment
        </Button>
      </div>
    </>
  );
}
