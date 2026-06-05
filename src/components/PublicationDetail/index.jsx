import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { publications as staticPublications } from '../../data/publications';
import styles from './PublicationDetail.module.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function PublicationDetail() {
  const { slug } = useParams();
  const staticMatch = staticPublications.find((p) => p.slug === slug);
  const [article, setArticle] = useState(staticMatch ?? null);
  const [loading, setLoading] = useState(!staticMatch);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getDoc(doc(db, 'articles', slug))
      .then((snap) => {
        if (snap.exists() && snap.data().status === 'published') {
          setArticle({ id: snap.id, slug: snap.id, ...snap.data() });
        } else if (!staticMatch) {
          setNotFound(true);
        }
      })
      .catch(() => { if (!staticMatch) setNotFound(true); })
      .finally(() => setLoading(false));
  }, [slug, staticMatch]);

  if (loading) return null;
  if (notFound || !article) return <Navigate to="/publications" replace />;

  const { title, date, author, authorRole, category, body, tags } = article;

  return (
    <article className={styles.page}>
      <Helmet>
        <title>{title} — The Michaels Attorneys</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.heroCategory}>{category}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          <div className={styles.heroBadge}>
            <span className={styles.heroAuthor}>{author}</span>
            <span className={styles.heroDot} aria-hidden="true">·</span>
            <span className={styles.heroRole}>{authorRole}</span>
            <span className={styles.heroDot} aria-hidden="true">·</span>
            <time className={styles.heroDate} dateTime={date}>{formatDate(date)}</time>
          </div>
        </div>
        <div className={styles.heroAccent} aria-hidden="true" />
      </div>

      {/* ── Body ── */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {body.map((paragraph, i) => (
            <p key={i} className={styles.bodyText}>{paragraph}</p>
          ))}

          {tags && tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <div className={styles.backRow}>
          <Link to="/publications" className={styles.back}>← Back to Publications</Link>
        </div>
      </div>
    </article>
  );
}
