export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 7h18" />
      <path d="M3 12h18" />
      <path d="M3 17h18" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 5l14 14" />
      <path d="M19 5L5 19" />
    </svg>
  );
}
