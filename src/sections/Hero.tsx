import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <Section tone="dark" className="pt-40 pb-28 md:pt-52 md:pb-40">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl text-center"
      >
        <motion.h1
          variants={item}
          className="text-6xl font-semibold tracking-tightest text-white md:text-8xl"
        >
          Duan Jesus
        </motion.h1>
        <motion.p variants={item} className="mt-5 text-2xl font-medium text-white/50 md:text-3xl">
          Java Backend Developer
        </motion.p>
        <motion.p
          variants={item}
          className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Building modern backend applications with Java, Spring Boot, React and PostgreSQL.
          Former Head of Social Supply at CEASA-RJ, now transitioning into Software Engineering.
        </motion.p>
        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white md:text-xl">
          From managing social supply operations to building modern software solutions.
        </motion.p>
        <motion.div variants={item} className="mt-12 flex flex-wrap justify-center gap-4">
          <Button href="/#projects" tone="dark" variant="primary" size="md">
            View Projects
          </Button>
          <Button href="/resume.pdf" tone="dark" variant="secondary" size="md">
            Download Resume
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
