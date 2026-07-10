interface BadgeProps {
  children: string;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-xs font-medium text-ink/70">
      {children}
    </span>
  );
}
