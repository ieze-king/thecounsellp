import SectionHeader from '../shared/SectionHeader';
import RevealWrapper from '../shared/RevealWrapper';
import PracticeCard from './PracticeCard';
import { practiceAreas } from '../../data/practiceAreas';
import styles from './PracticeAreas.module.css';

export default function PracticeAreas() {
  return (
    <section className={styles.section} id="practice">
      <div className={styles.inner}>
        <div className={styles.intro}>
          <SectionHeader label="What We Do" title="Areas of Legal Practice" light />
          <RevealWrapper delay={200}>
            <p className={styles.description}>
              Our firm offers comprehensive legal services across a range of disciplines. Each practice
              area is led by seasoned attorneys with years of combined experience and a record of
              excellence.
            </p>
          </RevealWrapper>
        </div>

        <div className={styles.grid}>
          {practiceAreas.map((area, index) => (
            <PracticeCard key={area.id} {...area} delay={index * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
