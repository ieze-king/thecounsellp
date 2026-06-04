import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../data/siteConfig';
import styles from './Stats.module.css';

function AnimatedStat({ stat }) {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState('0');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          const raw = stat.number;
          const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
          const suffix = raw.replace(/[0-9.]/g, '');
          let current = 0;
          const increment = num / 45;

          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              current = num;
              clearInterval(timer);
            }
            setDisplayed(Math.floor(current) + suffix);
          }, 30);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, stat.number]);

  return (
    <div className={styles.stat} ref={ref}>
      <span className={styles.number}>{displayed || stat.number}</span>
      <span className={styles.label}>{stat.label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className={styles.strip} aria-label="Firm statistics">
      <div className={styles.inner}>
        {siteConfig.stats.map((stat) => (
          <AnimatedStat key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
