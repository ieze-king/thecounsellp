import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import Button from '../shared/Button';
import { practiceAreas } from '../../data/practiceAreas';
import styles from './Contact.module.css';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  practiceArea: '',
  message: '',
};

async function notifyViaWeb3Forms(formData) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      subject: `New Booking Request — ${formData.firstName} ${formData.lastName}`,
      from_name: 'TMA Website',
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      practice_area: formData.practiceArea || 'Not specified',
      message: formData.message || 'No message provided',
    }),
  });

  const result = await response.json();
  if (!result.success) throw new Error(result.message);
}

export default function BookingForm() {
  const [form, setForm]         = useState(initialForm);
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      // 1. Save to Firestore — permanent record
      await addDoc(collection(db, 'bookings'), {
        ...form,
        submittedAt: serverTimestamp(),
      });

      // 2. Send email notification via Web3Forms
      await notifyViaWeb3Forms(form);

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setForm(initialForm);
      }, 4000);

    } catch (err) {
      console.error('Submission error:', err);
      setErrorMsg('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  };

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError   = status === 'error';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Appointment booking form">
      <h3 className={styles.formTitle}>Book an Appointment</h3>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="firstName">First Name</label>
          <input
            className={styles.formInput}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="John"
            value={form.firstName}
            onChange={handleChange}
            required
            disabled={isLoading || isSuccess}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="lastName">Last Name</label>
          <input
            className={styles.formInput}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={form.lastName}
            onChange={handleChange}
            required
            disabled={isLoading || isSuccess}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="email">Email Address</label>
        <input
          className={styles.formInput}
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          required
          disabled={isLoading || isSuccess}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="phone">Phone Number</label>
        <input
          className={styles.formInput}
          type="tel"
          id="phone"
          name="phone"
          placeholder="+234 800 000 0000"
          value={form.phone}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="practiceArea">Practice Area</label>
        <select
          className={styles.formInput}
          id="practiceArea"
          name="practiceArea"
          value={form.practiceArea}
          onChange={handleChange}
          disabled={isLoading || isSuccess}
        >
          <option value="" disabled>Select a practice area</option>
          {practiceAreas.map((area) => (
            <option key={area.id} value={area.title}>
              {area.title}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel} htmlFor="message">Brief Description of Matter</label>
        <textarea
          className={`${styles.formInput} ${styles.formTextarea}`}
          id="message"
          name="message"
          placeholder="Briefly describe your legal matter..."
          value={form.message}
          onChange={handleChange}
          rows={4}
          disabled={isLoading || isSuccess}
        />
      </div>

      {isError && <p className={styles.errorMsg}>{errorMsg}</p>}

      <Button
        type="submit"
        variant={isSuccess ? 'success' : 'gold'}
        className={styles.submitBtn}
        disabled={isLoading}
      >
        {isSuccess ? 'Request Sent ✓' : isLoading ? 'Submitting…' : 'Submit Request'}
      </Button>
    </form>
  );
}
