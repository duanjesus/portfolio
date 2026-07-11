import { motion } from "framer-motion";
import { Section } from "../components/layout/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projects } from "../data/projects";
import type { Tone } from "../components/layout/Section";
import { useLocale } from "../i18n/locale";
import { strings } from "../i18n/strings";

export function FeaturedProjects() {
  const locale = useLocale();
  const t = strings[locale].featuredProjects;

  return (
    <>
      {projects.map((project, index) => {
        const tone: Tone = index % 2 === 0 ? "dark" : "light";
        return (
          <Section key={project.slug} id={project.slug} tone={tone}>
            {index === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-center text-sm font-semibold uppercase tracking-widest text-white/40"
              >
                {t.eyebrow}
              </motion.p>
            )}
            <ProjectCard project={project} tone={tone} />
          </Section>
        );
      })}
    </>
  );
}
