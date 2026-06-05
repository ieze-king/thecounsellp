import { Helmet } from 'react-helmet-async';
import SectionHeader from '../shared/SectionHeader';
import PublicationCard from './PublicationCard';
import { publications } from '../../data/publications';
import styles from './Publications.module.css';

const sorted = [...publications].sort((a, b) => new Date(b.date) - new Date(a.date));

export default function PublicationsList() {
  return (
    <div className={styles.pageSection}>
      <Helmet>
        <title>Publications & Legal Updates — The Michaels Attorneys</title>
        <meta name="description" content="Legal insights, regulatory updates, and research publications from the attorneys at The Michaels Attorneys (TMA) — Ark of God Chambers." />
      </Helmet>

      <div className={styles.pageInner}>
        <div className={styles.pageHeader}>
          <SectionHeader label="Insights & Research" title="Publications & Legal Updates" />
        </div>
        <div className={styles.listGrid}>
          {sorted.map((pub, index) => (
            <PublicationCard key={pub.id} {...pub} delay={index * 80} />
          ))}
        </div>
      </div>
    </div>
  );
}
