import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { Timeline } from "./Timeline";
import { useLocale } from "../i18n/locale";
import { strings } from "../i18n/strings";

export function About() {
  const locale = useLocale();
  const t = strings[locale].about;

  return (
    <Section id="about" tone="light" narrow>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold uppercase tracking-widest text-ink/40"
      >
        {t.eyebrow}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-8 text-center text-xl leading-relaxed text-ink/80 md:text-2xl"
      >
        {t.paragraph}
      </motion.p>
      <div className="mt-24">
        <Timeline />
      </div>
    </Section>
  );
}
