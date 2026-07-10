import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Timeline } from "./Timeline";

export function About() {
  return (
    <Section id="about" tone="light" narrow>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold uppercase tracking-widest text-ink/40"
      >
        About
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-8 text-center text-xl leading-relaxed text-ink/80 md:text-2xl"
      >
        During my time leading the Social Supply sector at CEASA-RJ, I managed processes, people,
        and operations at scale. That experience is what got me interested in solving problems
        through technology. Today I'm finishing my degree in Information Systems and building
        modern applications with Java, Spring Boot, and React while looking for my first
        opportunity as a developer.
      </motion.p>
      <div className="mt-24">
        <Timeline />
      </div>
    </Section>
  );
}
