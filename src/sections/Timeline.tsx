import { motion } from "framer-motion";
import { timeline } from "../data/timeline";
import { useLocale } from "../i18n/locale";

export function Timeline() {
  const locale = useLocale();
  const items = timeline[locale];

  return (
    <div className="relative pl-8">
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-2 h-full w-px bg-ink/10"
      />
      <ol>
        {items.map((item, index) => (
          <motion.li
            key={item.year}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-8 mt-2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-ink" />
            <p className="text-xs font-semibold uppercase tracking-widest text-ink/40">{item.year}</p>
            <h3 className="mt-1 text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-1 text-ink/60">{item.description}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
