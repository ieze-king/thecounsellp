import { Link } from 'react-router-dom';
import RevealWrapper from '../shared/RevealWrapper';
import styles from './Publications.module.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function PublicationCard({ slug, title, date, author, authorRole, category, excerpt, delay = 0 }) {
  return (
    <RevealWrapper delay={delay}>
      <article className={styles.card}>
        <span className={styles.cardCategory}>{category}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardExcerpt}>{excerpt}</p>
        <div className={styles.cardFooter}>
          <div className={styles.cardMeta}>
            <span className={styles.cardAuthor}>{author}</span>
            <span className={styles.cardDot} aria-hidden="true">·</span>
            <time className={styles.cardDate} dateTime={date}>{formatDate(date)}</time>
          </div>
          <Link to={`/publications/${slug}`} className={styles.cardLink} aria-label={`Read full article: ${title}`}>
            Read More →
          </Link>
        </div>
        <div className={styles.cardBar} aria-hidden="true" />
      </article>
    </RevealWrapper>
  );
}
