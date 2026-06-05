import { useState, useEffect, useRef } from 'react';
import GroupPicture0 from '../../assets/GroupPicture0.jpeg';
import GroupPicture1 from '../../assets/GroupPicture1.jpeg';
import GroupPicture2 from '../../assets/GroupPicture2.jpeg';
import { siteConfig } from '../../data/siteConfig';
import styles from './About.module.css';

const slides = [
  { src: GroupPicture0, alt: 'The Michaels Attorneys team' },
  { src: GroupPicture1, alt: 'The Michaels Attorneys team' },
  { src: GroupPicture2, alt: 'The Michaels Attorneys team' },
];

export default function AboutCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);
  const reducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches).current;

  function stop() {
    clearInterval(intervalRef.current);
  }

  function start() {
    if (reducedMotion) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
  }

  useEffect(() => {
    start();
    return stop;
  }, []);

  function goTo(index) {
    setCurrent(index);
    stop();
    start();
  }

  return (
    <div
      className={styles.carousel}
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {/* Slides */}
      {slides.map(({ src, alt }, i) => (
        <img
          key={i}
          src={src}
          alt={alt}
          className={`${styles.carouselSlide} ${i === current ? styles.carouselSlideActive : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Prev / Next */}
      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`}
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        aria-label="Previous photo"
      >
        &#8592;
      </button>
      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnNext}`}
        onClick={() => goTo((current + 1) % slides.length)}
        aria-label="Next photo"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className={styles.carouselDots} role="tablist" aria-label="Slide indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            className={`${styles.carouselDot} ${i === current ? styles.carouselDotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Quote overlay */}
      <div className={styles.carouselOverlay} aria-hidden="true">
        <p className={styles.carouselQuote}>{siteConfig.aboutQuote.text}</p>
        <span className={styles.carouselAttr}>— {siteConfig.aboutQuote.attribution}</span>
      </div>

      {/* Decorative accent */}
      <div className={styles.visualAccent} aria-hidden="true" />
    </div>
  );
}
