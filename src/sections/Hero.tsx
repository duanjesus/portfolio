import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { useLocale } from "../i18n/locale";
import { strings } from "../i18n/strings";
import { projects } from "../data/projects";

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
  const locale = useLocale();
  const t = strings[locale].hero;
  const projectsHref = locale === "en" ? `/#${projects[0].slug}` : `/pt#${projects[0].slug}`;

  return (
    <Section tone="dark" className="pt-40 pb-28 md:pt-52 md:pb-40">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-4xl text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-shimmer text-shadow-dark text-6xl font-semibold tracking-tightest md:text-8xl"
        >
          Duan Jesus
        </motion.h1>
        <motion.p variants={item} className="text-shadow-dark mt-5 text-2xl font-medium text-white/50 md:text-3xl">
          {t.role}
        </motion.p>
        <motion.p
          variants={item}
          className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          {t.tagline}
        </motion.p>
        <motion.p variants={item} className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white md:text-xl">
          {t.highlight}
        </motion.p>
        <motion.div variants={item} className="mt-12 flex flex-wrap justify-center gap-4">
          <Button href={projectsHref} tone="dark" variant="primary" size="md">
            {t.viewProjects}
          </Button>
          <Button href="/resume.pdf" tone="dark" variant="secondary" size="md">
            {t.downloadResume}
          </Button>
        </motion.div>
      </motion.div>
    </Section>
  );
}
