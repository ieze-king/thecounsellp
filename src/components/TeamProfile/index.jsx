import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { teamMembers } from '../../data/teamMembers';
import TeamAvatar from '../shared/TeamAvatar';
import styles from './TeamProfile.module.css';

export default function TeamProfile() {
  const { slug } = useParams();
  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) return <Navigate to="/" replace />;

  const { id, initials, name, role, bio, colorIndex, fullBio, education, specializations } = member;

  return (
    <article className={styles.page}>
      <Helmet>
        <title>{name} — The Michaels Attorneys</title>
        <meta name="description" content={`${role} at The Michaels Attorneys (TMA) — Ark of God Chambers. ${bio}`} />
      </Helmet>

      {/* ── Hero Banner ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <TeamAvatar id={id} initials={initials} name={name} colorIndex={colorIndex} size="lg" />
          <h1 className={styles.name}>{name}</h1>
          <span className={styles.role}>{role}</span>
        </div>
        <div className={styles.heroAccent} aria-hidden="true" />
      </div>

      {/* ── Content ── */}
      <div className={styles.content}>
        <div className={styles.contentInner}>

          {/* Biography */}
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Biography</h2>
            {fullBio ? (
              fullBio.map((para, i) => (
                <p key={i} className={styles.bodyText}>{para}</p>
              ))
            ) : (
              <p className={styles.bodyText}>{bio}</p>
            )}
          </section>

          {/* Education */}
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Education</h2>
            {education ? (
              <ul className={styles.list}>
                {education.map((item, i) => (
                  <li key={i} className={styles.listItem}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.placeholder}>Content coming soon.</p>
            )}
          </section>

          {/* Areas of Practice */}
          <section className={styles.block}>
            <h2 className={styles.blockTitle}>Areas of Practice</h2>
            {specializations ? (
              <ul className={styles.tags}>
                {specializations.map((tag, i) => (
                  <li key={i} className={styles.tag}>{tag}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.placeholder}>Content coming soon.</p>
            )}
          </section>

        </div>

        {/* Back Link */}
        <div className={styles.backRow}>
          <Link to="/#team" className={styles.back}>
            ← Back to Our Team
          </Link>
        </div>
      </div>
    </article>
  );
}
