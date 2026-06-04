import { teamPhotos } from '../../assets/teamPhotos';
import styles from './TeamAvatar.module.css';

const gradients = [
  'linear-gradient(135deg, #0a1628, #1e3a5f)',
  'linear-gradient(135deg, #12213d, #2c4a7c)',
  'linear-gradient(135deg, #0d1b33, #1a3255)',
  'linear-gradient(135deg, #152238, #243e68)',
];

export default function TeamAvatar({ id, initials, name, colorIndex, size = 'md' }) {
  const photo = teamPhotos[id];
  const gradient = gradients[(colorIndex - 1) % gradients.length];

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {photo ? (
        <img src={photo} alt={name} className={styles.photo} loading="lazy" />
      ) : (
        <div className={styles.placeholder} style={{ background: gradient }} aria-label={`${name} initials`}>
          <span aria-hidden="true">{initials}</span>
        </div>
      )}
      <span className={styles.ring} data-avatar-ring aria-hidden="true" />
    </div>
  );
}
