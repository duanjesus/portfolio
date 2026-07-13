interface FlagProps {
  className?: string;
}

export function FlagUS({ className = "" }: FlagProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-us-circle">
          <circle cx="18" cy="18" r="18" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-us-circle)">
        <rect x="0" y="0" width="36" height="36" fill="#fff" />
        <g fill="#B22234">
          <rect y="0" width="36" height="2.77" />
          <rect y="5.54" width="36" height="2.77" />
          <rect y="11.08" width="36" height="2.77" />
          <rect y="16.62" width="36" height="2.77" />
          <rect y="22.15" width="36" height="2.77" />
          <rect y="27.69" width="36" height="2.77" />
          <rect y="33.23" width="36" height="2.77" />
        </g>
        <rect x="0" y="0" width="16" height="19.38" fill="#3C3B6E" />
      </g>
    </svg>
  );
}

export function FlagBR({ className = "" }: FlagProps) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-br-circle">
          <circle cx="18" cy="18" r="18" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-br-circle)">
        <rect width="36" height="36" fill="#009C3B" />
        <polygon points="18,7 31,18 18,29 5,18" fill="#FFDF00" />
        <circle cx="18" cy="18" r="6.5" fill="#002776" />
      </g>
    </svg>
  );
}
