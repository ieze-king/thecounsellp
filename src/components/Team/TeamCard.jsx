import { Link } from 'react-router-dom';
import RevealWrapper from '../shared/RevealWrapper';
import TeamAvatar from '../shared/TeamAvatar';
import styles from './Team.module.css';

export default function TeamCard({ id, initials, name, role, bio, colorIndex, slug, delay = 0 }) {
  return (
    <RevealWrapper delay={delay}>
      <article className={styles.card}>
        <TeamAvatar id={id} initials={initials} name={name} colorIndex={colorIndex} size="md" />
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.role}>{role}</span>
        <p className={styles.bio}>{bio}</p>
        <Link to={`/team/${slug}`} className={styles.learnMore}>
          Learn More
        </Link>
      </article>
    </RevealWrapper>
  );
}
