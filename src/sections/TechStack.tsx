import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { techStack } from "../data/techStack";

export function TechStack() {
  return (
    <Section tone="light">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold uppercase tracking-widest text-ink/40"
      >
        Tech Stack
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-4"
      >
        {techStack.map((item) => (
          <div key={item.name} className="text-shadow-light text-2xl font-medium tracking-tight text-ink md:text-3xl">
            {item.name}
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
