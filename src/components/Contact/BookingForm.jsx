import { useState } from 'react';
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

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    /*
     * TODO (backend): Replace this simulated delay with a real API call, e.g.:
     *   await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
     * No other changes to this component will be needed.
     */
    await new Promise((resolve) => setTimeout(resolve, 1600));

    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm(initialForm);
    }, 4000);
  };

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

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
            <option key={area.id} value={area.id}>
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
