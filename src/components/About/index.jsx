import Button from '../shared/Button';
import RevealWrapper from '../shared/RevealWrapper';
import { siteConfig } from '../../data/siteConfig';
import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>
        <div className={styles.grid}>

          {/* ── Left: Text Content ── */}
          <div className={styles.content}>
            <RevealWrapper>
              <span className={styles.label}>About the Firm</span>
            </RevealWrapper>

            <RevealWrapper delay={100}>
              <h2 className={styles.title}>A Commitment to Sterling Legal Service</h2>
            </RevealWrapper>

            <RevealWrapper delay={200}>
              <p className={styles.text}>
                The Counsel is a premier full-service legal practice dedicated to providing exceptional
                counsel to individuals, businesses, and institutions. We bring deep expertise, strategic
                thinking, and a relentless focus on client outcomes.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={280}>
              <p className={styles.text}>
                Our attorneys combine local knowledge with global standards — navigating complex legal
                landscapes with precision, integrity, and an unwavering dedication to justice.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={360}>
              <ul className={styles.pillars}>
                {siteConfig.aboutPillars.map((pillar) => (
                  <li key={pillar} className={styles.pillar}>
                    {pillar}
                  </li>
                ))}
              </ul>
            </RevealWrapper>

            <RevealWrapper delay={440}>
              <Button href="#team" variant="navy">
                Meet Our Team
              </Button>
            </RevealWrapper>
          </div>

          {/* ── Right: Quote Panel ── */}
          <RevealWrapper delay={200} className={styles.visualWrapper}>
            <div className={styles.visual}>
              <div className={styles.quoteText}>{siteConfig.aboutQuote.text}</div>
              <span className={styles.quoteAttr}>— {siteConfig.aboutQuote.attribution}</span>
            </div>
            <div className={styles.visualAccent} aria-hidden="true" />
          </RevealWrapper>

        </div>
      </div>
    </section>
  );
}
