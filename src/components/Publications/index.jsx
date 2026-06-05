import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import SectionHeader from '../shared/SectionHeader';
import RevealWrapper from '../shared/RevealWrapper';
import PublicationCard from './PublicationCard';
import { publications as staticPublications } from '../../data/publications';
import styles from './Publications.module.css';

const staticLatest = [...staticPublications]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);

export default function Publications() {
  const [articles, setArticles] = useState(staticLatest);

  useEffect(() => {
    getDocs(query(collection(db, 'articles'), where('status', '==', 'published')))
      .then((snap) => {
        if (snap.empty) return;
        const live = snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setArticles(live);
      })
      .catch(() => {});
  }, []);

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
          {articles.map((pub, index) => (
            <PublicationCard key={pub.id ?? pub.slug} {...pub} delay={index * 100} />
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
