import { useReveal } from '../../hooks/useReveal';
import styles from './RevealWrapper.module.css';

export default function RevealWrapper({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useReveal();

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${isVisible ? styles.visible : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
