import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, updateDoc, orderBy, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);

  const fetchArticles = async () => {
    try {
      const snap = await getDocs(query(collection(db, 'articles'), orderBy('date', 'desc')));
      setArticles(snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() })));
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchArticles(); }, []);

  const handleDelete = async (firestoreId, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deleteDoc(doc(db, 'articles', firestoreId));
    setArticles((prev) => prev.filter((a) => a.firestoreId !== firestoreId));
  };

  const toggleStatus = async (firestoreId, currentStatus) => {
    const next = currentStatus === 'published' ? 'draft' : 'published';
    await updateDoc(doc(db, 'articles', firestoreId), { status: next });
    setArticles((prev) =>
      prev.map((a) => a.firestoreId === firestoreId ? { ...a, status: next } : a)
    );
  };

  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <div className={styles.topBarBrand}>
          <span className={styles.topBarTitle}>TMA Admin</span>
          <span className={styles.topBarTag}>Publications</span>
        </div>
        <div className={styles.topBarActions}>
          <span className={styles.topBarUser}>{user?.email}</span>
          <button className={styles.logoutBtn} onClick={() => signOut(auth).then(() => navigate('/'))}>Sign Out</button>
        </div>
      </header>

      <main className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Articles</h1>
          <Link to="/admin/new" className={styles.btnPrimary}>+ New Article</Link>
        </div>

        {loading ? (
          <p className={styles.loading}>Loading articles…</p>
        ) : articles.length === 0 ? (
          <div className={styles.empty}>
            <p>No articles yet.</p>
            <br />
            <Link to="/admin/new" className={styles.btnPrimary}>Write your first article</Link>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.firestoreId}>
                  <td>
                    <div className={styles.articleTitle}>{article.title}</div>
                    <div className={styles.articleMeta}>/{article.firestoreId}</div>
                  </td>
                  <td>{article.category || '—'}</td>
                  <td>{article.author || '—'}</td>
                  <td>{formatDate(article.date)}</td>
                  <td>
                    <span className={`${styles.badge} ${article.status === 'published' ? styles.badgePublished : styles.badgeDraft}`}>
                      {article.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/admin/edit/${article.firestoreId}`} className={styles.btnGhost}>Edit</Link>
                      <button
                        className={styles.btnGhost}
                        onClick={() => toggleStatus(article.firestoreId, article.status)}
                      >
                        {article.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        className={styles.btnDanger}
                        onClick={() => handleDelete(article.firestoreId, article.title)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
