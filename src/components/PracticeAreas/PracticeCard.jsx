import RevealWrapper from '../shared/RevealWrapper';
import styles from './PracticeAreas.module.css';

export default function PracticeCard({ number, Icon, title, description, delay = 0 }) {
  return (
    <RevealWrapper delay={delay}>
      <article className={styles.card}>
        <span className={styles.cardNum} aria-hidden="true">{number}</span>
        <Icon className={styles.icon} aria-hidden="true" />
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{description}</p>
        <div className={styles.cardBar} aria-hidden="true" />
      </article>
    </RevealWrapper>
  );
}
