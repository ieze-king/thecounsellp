import SectionHeader from '../shared/SectionHeader';
import TeamCard from './TeamCard';
import TeamCarousel from './TeamCarousel';
import { teamMembers } from '../../data/teamMembers';
import styles from './Team.module.css';

export default function Team() {
  return (
    <section className={styles.section} id="team">
      <div className={styles.inner}>
        <SectionHeader
          label="Our Team"
          title="The Minds Behind The Counsel"
          align="center"
        />
      </div>

      <TeamCarousel />

      <div className={styles.inner}>
        <div className={styles.grid}>
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} {...member} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
