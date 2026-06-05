import { Link } from 'react-router-dom';
import SectionHeader from '../shared/SectionHeader';
import RevealWrapper from '../shared/RevealWrapper';
import PublicationCard from './PublicationCard';
import { publications } from '../../data/publications';
import styles from './Publications.module.css';

const latest = [...publications].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

export default function Publications() {
  return (
    <section className={styles.section} id="publications">
      <div className={styles.inner}>

        <div className={styles.intro}>
          <SectionHeader label="Insights & Research" title="Publications & Legal Updates" />
          <RevealWrapper delay={200}>
            <p className={styles.description}>
              Our attorneys regularly publish articles on emerging legal and regulatory developments.
              Subscribe to receive new publications directly in your inbox.
            </p>
          </RevealWrapper>
        </div>

        <div className={styles.grid}>
          {latest.map((pub, index) => (
            <PublicationCard key={pub.id} {...pub} delay={index * 100} />
          ))}
        </div>

        <RevealWrapper delay={100}>
          <div className={styles.actions}>
            <Link to="/publications" className={styles.viewAll}>
              View All Publications →
            </Link>
          </div>
        </RevealWrapper>

      </div>
    </section>
  );
}
