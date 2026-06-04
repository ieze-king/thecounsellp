import { LinkedInIcon, TwitterIcon, FacebookIcon, InstagramIcon } from '../shared/Icons';
import { siteConfig } from '../../data/siteConfig';
import { practiceAreas } from '../../data/practiceAreas';
import logo from '../../assets/logo.png';
import styles from './Footer.module.css';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Practice Areas', href: '#practice' },
  { label: 'Our People', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { Icon: LinkedInIcon, label: 'LinkedIn', href: siteConfig.social.linkedin },
  { Icon: TwitterIcon, label: 'Twitter / X', href: siteConfig.social.twitter },
  { Icon: FacebookIcon, label: 'Facebook', href: siteConfig.social.facebook },
  { Icon: InstagramIcon, label: 'Instagram', href: siteConfig.social.instagram },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>

          {/* Brand */}
          <div className={styles.brand}>
            <img src={logo} alt={`${siteConfig.firmName} logo`} className={styles.brandLogo} />
            <p className={styles.brandText}>
              Delivering sterling legal services to individuals, businesses, and institutions.
              Grounded in integrity. Driven by excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.colTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={styles.link}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className={styles.colTitle}>Practice Areas</h3>
            <ul className={styles.linkList}>
              {practiceAreas.map((area) => (
                <li key={area.id}>
                  <a href="#practice" className={styles.link}>{area.title}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={styles.colTitle}>Contact</h3>
            <ul className={styles.linkList}>
              <li>
                <a href={`tel:${siteConfig.contact.phones[0].replace(/\s/g, '')}`} className={styles.link}>
                  {siteConfig.contact.phones[0]}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.emails[0]}`} className={styles.link}>
                  {siteConfig.contact.emails[0]}
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.link}>Book Appointment</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <span className={styles.copy}>{siteConfig.copyright}</span>
          <div className={styles.social}>
            {socialLinks.map(({ Icon, label, href }) => (
              <a key={label} href={href} className={styles.socialLink} aria-label={label}>
                <Icon className={styles.socialIcon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
