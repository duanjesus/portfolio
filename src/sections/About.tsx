import { Section } from "../components/layout/Section";
import { Timeline } from "./Timeline";

export function About() {
  return (
    <Section id="about" className="border-t border-black/5" narrow>
      <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">About</h2>
      <p className="mt-6 text-lg leading-relaxed text-ink/80 md:text-xl">
        During my time leading the Social Supply sector at CEASA-RJ, I managed processes, people,
        and operations at scale. That experience is what got me interested in solving problems
        through technology. Today I'm finishing my degree in Information Systems and building
        modern applications with Java, Spring Boot, and React while looking for my first
        opportunity as a developer.
      </p>
      <div className="mt-16">
        <Timeline />
      </div>
    </Section>
  );
}
