import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import SectionHeader from '../shared/SectionHeader';
import PublicationCard from './PublicationCard';
import { publications as staticPublications } from '../../data/publications';
import styles from './Publications.module.css';

const staticSorted = [...staticPublications].sort((a, b) => new Date(b.date) - new Date(a.date));

export default function PublicationsList() {
  const [articles, setArticles] = useState(staticSorted);

  useEffect(() => {
    getDocs(query(collection(db, 'articles'), where('status', '==', 'published')))
      .then((snap) => {
        if (snap.empty) return;
        const live = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(live);
      })
      .catch(() => {});
  }, []);

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
          {articles.map((pub, index) => (
            <PublicationCard key={pub.id ?? pub.slug} {...pub} delay={index * 80} />
          ))}
        </div>
      </div>
    </div>
  );
}
