import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { teamMembers } from '../../data/teamMembers';
import styles from './Admin.module.css';

const CATEGORIES = [
  'ICT Law & Data Protection',
  'Corporate & Commercial Law',
  'Litigation & Dispute Resolution',
  'Regulatory Compliance',
  'Employment Law',
  'Real Estate Law',
  'Legislative & Public Policy',
  'Alternative Dispute Resolution',
];

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const emptyForm = {
  title: '',
  slug: '',
  author: '',
  authorRole: '',
  date: new Date().toISOString().slice(0, 10),
  category: '',
  excerpt: '',
  body: '',
  tags: '',
  status: 'draft',
};

export default function ArticleForm() {
  const { slug: editSlug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = Boolean(editSlug);

  const [form, setForm]       = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [slugLocked, setSlugLocked] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    getDoc(doc(db, 'articles', editSlug)).then((snap) => {
      if (!snap.exists()) { navigate('/admin'); return; }
      const d = snap.data();
      setForm({
        title:      d.title      ?? '',
        slug:       snap.id,
        author:     d.author     ?? '',
        authorRole: d.authorRole ?? '',
        date:       d.date       ?? '',
        category:   d.category   ?? '',
        excerpt:    d.excerpt    ?? '',
        body:       Array.isArray(d.body) ? d.body.join('\n\n') : (d.body ?? ''),
        tags:       Array.isArray(d.tags) ? d.tags.join(', ') : (d.tags ?? ''),
        status:     d.status     ?? 'draft',
      });
      setLoading(false);
    });
  }, [editSlug, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'title' && !slugLocked) {
        next.slug = toSlug(value);
      }
      return next;
    });
  };

  const handleSlugChange = (e) => {
    setSlugLocked(true);
    setForm((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim())   return setError('Title is required.');
    if (!form.slug.trim())    return setError('Slug is required.');
    if (!form.excerpt.trim()) return setError('Excerpt is required.');
    if (!form.body.trim())    return setError('Body content is required.');

    setSaving(true);
    try {
      const bodyArray = form.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
      const tagsArray = form.tags.split(',').map((t) => t.trim()).filter(Boolean);
      const slug = form.slug.trim();

      await setDoc(doc(db, 'articles', slug), {
        slug,
        title:      form.title.trim(),
        author:     form.author.trim(),
        authorRole: form.authorRole.trim(),
        date:       form.date,
        category:   form.category.trim(),
        excerpt:    form.excerpt.trim(),
        body:       bodyArray,
        tags:       tagsArray,
        status:     form.status,
        updatedAt:  serverTimestamp(),
        ...(isEdit ? {} : { createdAt: serverTimestamp() }),
      }, { merge: isEdit });

      navigate('/admin');
    } catch (err) {
      setError('Failed to save. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <span className={styles.topBarTitle}>TMA Admin</span>
      </header>
      <p className={styles.loading}>Loading article…</p>
    </div>
  );

  return (
    <div className={styles.shell}>
      <header className={styles.topBar}>
        <div className={styles.topBarBrand}>
          <span className={styles.topBarTitle}>TMA Admin</span>
          <span className={styles.topBarTag}>{isEdit ? 'Edit Article' : 'New Article'}</span>
        </div>
        <div className={styles.topBarActions}>
          <span className={styles.topBarUser}>{user?.email}</span>
          <button className={styles.logoutBtn} onClick={() => signOut(auth).then(() => navigate('/'))}>Sign Out</button>
        </div>
      </header>

      <main className={styles.page}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{isEdit ? 'Edit Article' : 'New Article'}</h1>
          <Link to="/admin" className={styles.btnSecondary}>← Back to Articles</Link>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {error && <p className={styles.formError}>{error}</p>}

          <div className={styles.formGrid}>
            {/* Title */}
            <div className={`${styles.formField} ${styles.formFieldFull}`}>
              <label className={styles.formLabel} htmlFor="title">Title *</label>
              <input
                id="title" name="title" type="text"
                className={styles.formInput}
                value={form.title}
                onChange={handleChange}
                placeholder="Article title"
                required
              />
            </div>

            {/* Slug */}
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="slug">
                URL Slug * {isEdit && <span style={{ color: '#b91c1c', marginLeft: 4 }}>(changing slug creates a new article)</span>}
              </label>
              <input
                id="slug" name="slug" type="text"
                className={styles.formInput}
                value={form.slug}
                onChange={handleSlugChange}
                placeholder="url-friendly-slug"
                required
              />
              <span className={styles.formHint}>Auto-generated from title. Edit if needed.</span>
            </div>

            {/* Category */}
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="category">Category</label>
              <input
                id="category" name="category" type="text"
                className={styles.formInput}
                value={form.category}
                onChange={handleChange}
                list="categories"
                placeholder="e.g. ICT Law & Data Protection"
              />
              <datalist id="categories">
                {CATEGORIES.map((c) => <option key={c} value={c} />)}
              </datalist>
            </div>

            {/* Author */}
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="author">Author</label>
              <input
                id="author" name="author" type="text"
                className={styles.formInput}
                value={form.author}
                onChange={handleChange}
                list="authors"
                placeholder="Author name"
              />
              <datalist id="authors">
                {teamMembers.map((m) => <option key={m.id} value={m.name} />)}
              </datalist>
            </div>

            {/* Author Role */}
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="authorRole">Author Role</label>
              <input
                id="authorRole" name="authorRole" type="text"
                className={styles.formInput}
                value={form.authorRole}
                onChange={handleChange}
                list="roles"
                placeholder="e.g. Head, Research & Publications"
              />
              <datalist id="roles">
                {teamMembers.map((m) => <option key={m.id} value={m.role} />)}
              </datalist>
            </div>

            {/* Date */}
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="date">Publication Date</label>
              <input
                id="date" name="date" type="date"
                className={styles.formInput}
                value={form.date}
                onChange={handleChange}
              />
            </div>

            {/* Tags */}
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="tags">Tags</label>
              <input
                id="tags" name="tags" type="text"
                className={styles.formInput}
                value={form.tags}
                onChange={handleChange}
                placeholder="Data Protection, Compliance, ICT Law"
              />
              <span className={styles.formHint}>Comma-separated</span>
            </div>

            {/* Status */}
            <div className={styles.formField}>
              <label className={styles.formLabel} htmlFor="status">Status</label>
              <select
                id="status" name="status"
                className={styles.formSelect}
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">Draft — not visible on site</option>
                <option value="published">Published — visible on site</option>
              </select>
            </div>

            {/* Excerpt */}
            <div className={`${styles.formField} ${styles.formFieldFull}`}>
              <label className={styles.formLabel} htmlFor="excerpt">Excerpt * <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(shown on article cards)</span></label>
              <textarea
                id="excerpt" name="excerpt"
                className={`${styles.formTextarea} ${styles.formTextareaExcerpt}`}
                value={form.excerpt}
                onChange={handleChange}
                placeholder="A 1–2 sentence summary of the article shown on the publications card."
                required
              />
              <span className={styles.charCount}>{form.excerpt.length} characters</span>
            </div>

            {/* Body */}
            <div className={`${styles.formField} ${styles.formFieldFull}`}>
              <label className={styles.formLabel} htmlFor="body">Article Body *</label>
              <textarea
                id="body" name="body"
                className={`${styles.formTextarea} ${styles.formTextareaBody}`}
                value={form.body}
                onChange={handleChange}
                placeholder="Write the full article here.

Separate each paragraph with a blank line — each one becomes its own paragraph on the site.

You can write as many paragraphs as needed."
                required
              />
              <span className={styles.charCount}>{wordCount(form.body)} words</span>
              <span className={styles.formHint}>Separate paragraphs with a blank line (press Enter twice).</span>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.btnPrimary} disabled={saving}>
              {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Save Article'}
            </button>
            <Link to="/admin" className={styles.btnSecondary}>Cancel</Link>
            {!saving && form.status === 'draft' && (
              <span style={{ fontSize: '0.72rem', color: 'var(--color-text-mid)' }}>
                Set Status to "Published" above to make it live on the site.
              </span>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}
