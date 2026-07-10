interface FlagProps {
  className?: string;
}

export function FlagUS({ className = "" }: FlagProps) {
  return (
    <span className={`inline-block overflow-hidden rounded-full ${className}`}>
      <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
        <rect width="24" height="24" fill="#B22234" />
        <g fill="#fff">
          <rect y="1.85" width="24" height="1.85" />
          <rect y="5.54" width="24" height="1.85" />
          <rect y="9.23" width="24" height="1.85" />
          <rect y="12.92" width="24" height="1.85" />
          <rect y="16.62" width="24" height="1.85" />
          <rect y="20.31" width="24" height="1.85" />
        </g>
        <rect width="12" height="12.92" fill="#3C3B6E" />
      </svg>
    </span>
  );
}

export function FlagBR({ className = "" }: FlagProps) {
  return (
    <span className={`inline-block overflow-hidden rounded-full ${className}`}>
      <svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true">
        <rect width="24" height="24" fill="#009739" />
        <polygon points="12,3 21,12 12,21 3,12" fill="#FEDD00" />
        <circle cx="12" cy="12" r="4.2" fill="#012169" />
      </svg>
    </span>
  );
}
