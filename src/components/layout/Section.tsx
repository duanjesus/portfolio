import type { ReactNode } from "react";

export type Tone = "light" | "dark";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  light: "bg-paper text-ink",
  dark: "bg-void text-white",
};

export function Section({ id, children, className = "", narrow = false, tone = "light" }: SectionProps) {
  return (
    <section id={id} className={`${toneClasses[tone]} py-24 md:py-36 ${className}`}>
      <div className={`mx-auto px-6 ${narrow ? "max-w-3xl" : "max-w-content"}`}>{children}</div>
    </section>
  );
}
