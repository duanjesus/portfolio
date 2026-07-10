import { Section } from "../components/layout/Section";
import { techStack } from "../data/techStack";

export function TechStack() {
  return (
    <Section className="border-t border-black/5">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Tech Stack</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
        {techStack.map((item) => (
          <div key={item.name} className="text-2xl font-medium tracking-tight text-ink/85 md:text-3xl">
            {item.name}
          </div>
        ))}
      </div>
    </Section>
  );
}
