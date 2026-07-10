import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";

export function Hero() {
  return (
    <Section className="pt-28 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl font-semibold tracking-tight text-ink md:text-7xl">Duan Jesus</h1>
        <p className="mt-4 text-xl font-medium text-ink/60 md:text-2xl">Java Backend Developer</p>
        <p className="mt-8 text-lg leading-relaxed text-ink/70 md:text-xl">
          Building modern backend applications with Java, Spring Boot, React and PostgreSQL.
          Former Head of Social Supply at CEASA-RJ, now transitioning into Software Engineering.
        </p>
        <p className="mt-4 text-lg font-medium leading-relaxed text-ink md:text-xl">
          From managing social supply operations to building modern software solutions.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/#projects" size="md">
            View Projects
          </Button>
          <Button href="/resume.pdf" variant="secondary" size="md">
            Download Resume
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}
