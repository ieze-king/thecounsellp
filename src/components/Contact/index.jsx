import SectionHeader from '../shared/SectionHeader';
import RevealWrapper from '../shared/RevealWrapper';
import ContactInfo from './ContactInfo';
import BookingForm from './BookingForm';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div>
            <SectionHeader label="Get In Touch" title="Schedule a Consultation" light />
            <ContactInfo />
          </div>
          <RevealWrapper delay={150}>
            <BookingForm />
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
