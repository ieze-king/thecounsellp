export const ScalesIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10" y1="16" x2="38" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 16L4 28H16L10 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M38 16L32 28H44L38 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="18" y1="42" x2="30" y2="42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const GlobeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="24" cy="24" rx="8" ry="19" stroke="currentColor" strokeWidth="1.5" />
    <line x1="5" y1="24" x2="43" y2="24" stroke="currentColor" strokeWidth="1.5" />
    <line x1="8" y1="15" x2="40" y2="15" stroke="currentColor" strokeWidth="1.5" />
    <line x1="8" y1="33" x2="40" y2="33" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ShieldCheckIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L42 12V24C42 34.5 33.5 43 24 44C14.5 43 6 34.5 6 24V12L24 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <polyline points="16,24 21,29 32,18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BriefcaseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="14" width="36" height="28" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 14V10C16 8.9 16.9 8 18 8H30C31.1 8 32 8.9 32 10V14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="6" y1="26" x2="42" y2="26" stroke="currentColor" strokeWidth="1.5" />
    <line x1="22" y1="22" x2="26" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="30" x2="26" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const DocumentTextIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="32" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="16" y1="18" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="24" x2="32" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="30" x2="24" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const UsersIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="32" cy="14" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 40V36C4 30.5 8.5 26 14 26H18C20.3 26 22.4 26.9 24 28.4C25.6 26.9 27.7 26 30 26H34C39.5 26 44 30.5 44 36V40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const MapPinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const PhoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const ClockIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const MailIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const LinkedInIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const MenuIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
    <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
    <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
  </svg>
);
