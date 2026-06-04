import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'gold',
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) {
  const classes = `${styles.btn} ${styles[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
