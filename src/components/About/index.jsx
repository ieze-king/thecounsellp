import Button from '../shared/Button';
import RevealWrapper from '../shared/RevealWrapper';
import AboutCarousel from './AboutCarousel';
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
                Established in 2018 and duly registered with the Corporate Affairs Commission (CAC),
                The Michaels Attorneys is a technology-driven, full-service law firm providing strategic
                legal, regulatory, compliance, and business advisory services to public and private
                sector clients across the Globe.
              </p>
            </RevealWrapper>

            <RevealWrapper delay={280}>
              <p className={styles.text}>
                We integrate legal expertise, technology, governance frameworks, risk management systems,
                and regulatory intelligence to help clients achieve compliance, mitigate risk, protect
                assets, and drive sustainable growth, founded upon professionalism, integrity,
                responsiveness, and innovation.
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

          {/* ── Right: Photo Carousel ── */}
          <RevealWrapper delay={200} className={styles.visualWrapper}>
            <AboutCarousel />
          </RevealWrapper>

        </div>

        {/* ── Vision & Mission ── */}
        <RevealWrapper delay={100}>
          <div className={styles.vmRow}>
            <div className={styles.vmCard}>
              <span className={styles.vmLabel}>Our Vision</span>
              <p className={styles.vmText}>{siteConfig.vision}</p>
            </div>
            <div className={styles.vmDivider} aria-hidden="true" />
            <div className={styles.vmCard}>
              <span className={styles.vmLabel}>Our Mission</span>
              <p className={styles.vmText}>{siteConfig.mission}</p>
            </div>
          </div>
        </RevealWrapper>

      </div>
    </section>
  );
}
