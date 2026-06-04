import { useState, useEffect, useRef, useCallback } from 'react';
import Slider0 from '../../assets/Slider0.jpeg';
import Slider1 from '../../assets/Slider1.jpeg';
import Slider2 from '../../assets/Slider2.jpeg';
import Slider3 from '../../assets/Slider3.jpeg';
import Slider4 from '../../assets/Slider4.jpeg';
import Slider5 from '../../assets/Slider5.jpeg';
import Slider6 from '../../assets/Slider6.jpeg';
import styles from './Team.module.css';

const slides = [Slider0, Slider1, Slider2, Slider3, Slider4, Slider5, Slider6];

export default function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  const prev = () => {
    stopTimer();
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
    startTimer();
  };

  const next = () => {
    stopTimer();
    setCurrent((c) => (c + 1) % slides.length);
    startTimer();
  };

  const goTo = (i) => {
    stopTimer();
    setCurrent(i);
    startTimer();
  };

  return (
    <div
      className={styles.carousel}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
      aria-label="Team photo gallery"
      role="region"
    >
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Team gallery ${i + 1}`}
            className={styles.carouselImg}
            draggable={false}
          />
        ))}
      </div>

      <button className={`${styles.carouselBtn} ${styles.carouselBtnPrev}`} onClick={prev} aria-label="Previous slide">
        &#8249;
      </button>
      <button className={`${styles.carouselBtn} ${styles.carouselBtnNext}`} onClick={next} aria-label="Next slide">
        &#8250;
      </button>

      <div className={styles.carouselDots} role="tablist">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === current}
            role="tab"
          />
        ))}
      </div>
    </div>
  );
}
