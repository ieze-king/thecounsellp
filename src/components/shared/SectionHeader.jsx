import RevealWrapper from './RevealWrapper';
import styles from './SectionHeader.module.css';

export default function SectionHeader({ label, title, description, align = 'left', light = false }) {
  return (
    <div className={`${styles.header} ${styles[align]}`}>
      {label && (
        <RevealWrapper>
          <span className={`${styles.label} ${light ? styles.light : ''}`}>{label}</span>
        </RevealWrapper>
      )}
      <RevealWrapper delay={100}>
        <h2 className={`${styles.title} ${light ? styles.titleLight : ''}`}>{title}</h2>
      </RevealWrapper>
      <RevealWrapper delay={200}>
        <div className={styles.divider} />
      </RevealWrapper>
      {description && (
        <RevealWrapper delay={300}>
          <p className={`${styles.description} ${light ? styles.descriptionLight : ''}`}>
            {description}
          </p>
        </RevealWrapper>
      )}
    </div>
  );
}
