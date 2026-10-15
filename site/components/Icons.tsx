type P = { className?: string };

export const Mark = ({ className }: P) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="mk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#7fe7da" />
        <stop offset="1" stopColor="#0a7480" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="#07111d" />
    <path d="M32 12c1.6 9.4 5.2 13 14.6 14.6C37.2 28.2 33.6 31.8 32 41.2 30.4 31.8 26.8 28.2 17.4 26.6 26.8 25 30.4 21.4 32 12Z" fill="url(#mk)" />
    <path d="M46 38c.7 4 2.2 5.6 6.2 6.2-4 .7-5.5 2.2-6.2 6.2-.7-4-2.2-5.5-6.2-6.2 4-.6 5.5-2.2 6.2-6.2Z" fill="#fff" />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const Mail = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="3" />
    <path d="m3 6 9 7 9-7" />
  </svg>
);

export const Leaf = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
    <path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" />
  </svg>
);

export const Shield = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Paw = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <circle cx="5.5" cy="10" r="2.2" />
    <circle cx="9.5" cy="5.8" r="2.2" />
    <circle cx="14.5" cy="5.8" r="2.2" />
    <circle cx="18.5" cy="10" r="2.2" />
    <path d="M12 11c-3 0-6.5 4.2-6.5 6.6C5.5 19.5 7 20.5 9 20c1.2-.3 2-.6 3-.6s1.8.3 3 .6c2 .5 3.5-.5 3.5-2.4C18.5 15.2 15 11 12 11Z" />
  </svg>
);

export const Chat = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z" />
  </svg>
);

export const Sparkle = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2c.8 4.8 2.7 6.7 7.5 7.5-4.8.8-6.7 2.7-7.5 7.5-.8-4.8-2.7-6.7-7.5-7.5C9.3 8.7 11.2 6.8 12 2Z" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const Facebook = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
  </svg>
);
