import Button from '../shared/Button';
import { siteConfig } from '../../data/siteConfig';
import styles from './Hero.module.css';

function scrollTo(href) {
  const target = document.querySelector(href);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.pattern} aria-hidden="true" />
      <div className={styles.accentLines} aria-hidden="true" />
      <div className={styles.circle} aria-hidden="true" />

      <div className={styles.content}>
        <span className={styles.label}>{siteConfig.heroLabel}</span>

        <h1 className={styles.title}>
          Elevating Legal
          <br />
          <em className={styles.titleEm}>Excellence</em> Globally
        </h1>

        <p className={styles.subtitle}>{siteConfig.heroSubtitle}</p>

        <div className={styles.actions}>
          <Button href="#contact" variant="gold" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>
            Book a Consultation
          </Button>
          <Button href="#practice" variant="outline" onClick={(e) => { e.preventDefault(); scrollTo('#practice'); }}>
            Our Practice Areas
          </Button>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
