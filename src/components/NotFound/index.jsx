import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>Page Not Found — The Michaels Attorneys</title>
      </Helmet>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className={styles.btn}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
