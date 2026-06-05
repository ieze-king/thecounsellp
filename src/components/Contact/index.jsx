import SectionHeader from '../shared/SectionHeader';
import RevealWrapper from '../shared/RevealWrapper';
import ContactInfo from './ContactInfo';
import BookingForm from './BookingForm';
import SubscribeForm from './SubscribeForm';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>

        {/* ── Top: Contact Info + Booking Form ── */}
        <div className={styles.grid}>
          <div>
            <SectionHeader label="Get In Touch" title="Schedule a Consultation" light />
            <ContactInfo />
          </div>
          <RevealWrapper delay={150}>
            <BookingForm />
          </RevealWrapper>
        </div>

        {/* ── Bottom: Map + Subscribe ── */}
        <RevealWrapper delay={100}>
          <div className={styles.mapRow}>
            <div className={styles.mapWrapper}>
              <span className={styles.mapLabel}>Find Us</span>
              <iframe
                className={styles.mapFrame}
                title="The Michaels Attorneys office location"
                src="https://maps.google.com/maps?q=Ipent+VI+Legislative+Villa+Lokogoma+Gaduwa+Abuja+Nigeria&output=embed&z=16"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <SubscribeForm />
          </div>
        </RevealWrapper>

      </div>
    </section>
  );
}
