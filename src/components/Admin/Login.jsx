import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import styles from './Admin.module.css';

export default function Login() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>TMA Admin</h1>
          <p className={styles.loginSub}>The Michaels Attorneys — Content Portal</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {error && <p className={styles.formError}>{error}</p>}
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@themichaelsattorneys.com"
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel} htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={styles.btnPrimary}
            style={{ width: '100%', marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-mid)',
              textDecoration: 'none',
              borderBottom: '1px solid transparent',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.target.style.color = 'var(--color-navy)'; e.target.style.borderColor = 'var(--color-navy)'; }}
            onMouseLeave={(e) => { e.target.style.color = 'var(--color-text-mid)'; e.target.style.borderColor = 'transparent'; }}
          >
            ← Back to Website
          </a>
        </p>
      </div>
    </div>
  );
}
