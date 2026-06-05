import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from '../shared/Button';
import styles from './Contact.module.css';

const initialForm = { name: '', email: '' };

function validate(form) {
  if (!form.name.trim()) return 'Name is required.';
  if (!form.email.trim()) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Please enter a valid email address.';
  return null;
}

export default function SubscribeForm() {
  const [form, setForm]         = useState(initialForm);
  const [status, setStatus]     = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate(form);
    if (validationError) {
      setErrorMsg(validationError);
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const docId = form.email.toLowerCase().replace('@', '_at_').replace(/\./g, '_dot_');
      await setDoc(doc(db, 'subscribers', docId), {
        name: form.name,
        email: form.email,
        subscribedAt: serverTimestamp(),
      }, { merge: true });
    } catch (err) {
      console.error('Subscription error:', err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
      return;
    }

    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm(initialForm);
    }, 4000);
  };

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError   = status === 'error';

  return (
    <div className={styles.subscribePanel}>
      <span className={styles.mapLabel}>Stay Updated</span>
      <h3 className={styles.subscribeTitle}>Subscribe to Legal Insights</h3>
      <p className={styles.subscribeText}>
        Get new articles, regulatory updates, and firm publications from our attorneys delivered directly to your inbox.
      </p>
      <form className={styles.subscribeForm} onSubmit={handleSubmit} noValidate aria-label="Newsletter subscription form">
        <input
          className={styles.formInput}
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
        />
        <input
          className={styles.formInput}
          type="email"
          name="email"
          placeholder="Your email address"
          value={form.email}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
        />
        {isError && <p className={styles.errorMsg}>{errorMsg}</p>}
        <Button
          type="submit"
          variant={isSuccess ? 'success' : 'gold'}
          className={styles.subscribeBtn}
          disabled={isLoading}
        >
          {isSuccess ? 'Subscribed ✓' : isLoading ? 'Subscribing…' : 'Subscribe'}
        </Button>
      </form>
      <p className={styles.subscribeNote}>Free. No spam. Unsubscribe anytime.</p>
    </div>
  );
}
