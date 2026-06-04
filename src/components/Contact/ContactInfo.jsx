import { MapPinIcon, PhoneIcon, ClockIcon, MailIcon } from '../shared/Icons';
import RevealWrapper from '../shared/RevealWrapper';
import { siteConfig } from '../../data/siteConfig';
import styles from './Contact.module.css';

const contactItems = [
  {
    Icon: MapPinIcon,
    label: 'Office Address',
    getLines: (c) => c.address.split('\n'),
  },
  {
    Icon: PhoneIcon,
    label: 'Phone',
    getLines: (c) => c.phones,
  },
  {
    Icon: ClockIcon,
    label: 'Office Hours',
    getLines: (c) => c.hours.split('\n'),
  },
  {
    Icon: MailIcon,
    label: 'Email',
    getLines: (c) => c.emails,
  },
];

export default function ContactInfo() {
  const { contact } = siteConfig;

  return (
    <div className={styles.infoPanel}>
      {contactItems.map(({ Icon, label, getLines }, index) => (
        <RevealWrapper key={label} delay={index * 100}>
          <div className={styles.detail}>
            <Icon className={styles.detailIcon} aria-hidden="true" />
            <div>
              <span className={styles.detailLabel}>{label}</span>
              <div className={styles.detailValue}>
                {getLines(contact).map((line, i) => (
                  <span key={i}>{line}</span>
                ))}
              </div>
            </div>
          </div>
        </RevealWrapper>
      ))}
    </div>
  );
}
