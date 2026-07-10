interface BadgeProps {
  children: string;
  tone?: "light" | "dark";
}

const toneClasses = {
  light: "border-ink/10 bg-ink/[0.03] text-ink/70",
  dark: "border-white/15 bg-white/5 text-white/70",
};

export function Badge({ children, tone = "light" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
