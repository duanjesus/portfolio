import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Section({ id, children, className = "", narrow = false }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className={`mx-auto px-6 ${narrow ? "max-w-3xl" : "max-w-content"}`}>{children}</div>
    </section>
  );
}
