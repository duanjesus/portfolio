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
    <section id={id} className={`relative overflow-hidden ${toneClasses[tone]} py-24 md:py-36 ${className}`}>
      {tone === "light" ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 via-black/5 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(0,0,0,0.05),transparent_70%)]"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/15 to-transparent"
        />
      )}
      <div className={`relative mx-auto px-6 ${narrow ? "max-w-3xl" : "max-w-content"}`}>{children}</div>
    </section>
  );
}
