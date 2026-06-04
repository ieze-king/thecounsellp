import { useState, useEffect, useRef } from 'react';
import Button from '../shared/Button';
import { siteConfig } from '../../data/siteConfig';
import { smoothScrollTo } from '../../utils/scrollTo';
import Slider0 from '../../assets/Slider0.jpeg';
import Slider1 from '../../assets/Slider1.jpeg';
import Slider2 from '../../assets/Slider2.jpeg';
import Slider3 from '../../assets/Slider3.jpeg';
import Slider4 from '../../assets/Slider4.jpeg';
import Slider5 from '../../assets/Slider5.jpeg';
import Slider6 from '../../assets/Slider6.jpeg';
import styles from './Hero.module.css';

const slides = [Slider0, Slider1, Slider2, Slider3, Slider4, Slider5, Slider6];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 6000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.slides} aria-hidden="true">
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
          />
        ))}
      </div>

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
          <Button href="#contact" variant="gold" onClick={(e) => { e.preventDefault(); smoothScrollTo('#contact'); }}>
            Book a Consultation
          </Button>
          <Button href="#practice" variant="outline" onClick={(e) => { e.preventDefault(); smoothScrollTo('#practice'); }}>
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
