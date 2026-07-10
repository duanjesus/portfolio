import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { techStack } from "../data/techStack";
import { useLocale } from "../i18n/locale";
import { strings } from "../i18n/strings";

export function TechStack() {
  const locale = useLocale();
  const t = strings[locale].techStack;

  return (
    <Section tone="light">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-sm font-semibold uppercase tracking-widest text-ink/40"
      >
        {t.eyebrow}
      </motion.p>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {techStack.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-ink/10 px-4 py-8 transition-all duration-200 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
          >
            <svg viewBox="0 0 24 24" className="h-9 w-9 text-ink/60 transition-colors duration-200 group-hover:text-ink">
              <path fill="currentColor" d={item.iconPath} />
            </svg>
            <span className="text-sm font-medium text-ink">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
