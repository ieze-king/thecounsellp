import RevealWrapper from '../shared/RevealWrapper';
import styles from './Team.module.css';

const photoGradients = [
  'linear-gradient(135deg, #0a1628, #1e3a5f)',
  'linear-gradient(135deg, #12213d, #2c4a7c)',
  'linear-gradient(135deg, #0d1b33, #1a3255)',
  'linear-gradient(135deg, #152238, #243e68)',
];

export default function TeamCard({ initials, name, role, bio, colorIndex, delay = 0 }) {
  const gradient = photoGradients[(colorIndex - 1) % photoGradients.length];

  return (
    <RevealWrapper delay={delay}>
      <article className={styles.card}>
        <div className={styles.photo} style={{ background: gradient }} aria-label={`${name} photo placeholder`}>
          <span aria-hidden="true">{initials}</span>
        </div>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.role}>{role}</span>
        <p className={styles.bio}>{bio}</p>
      </article>
    </RevealWrapper>
  );
}
