import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import type { Project } from "../../data/projects";
import type { Tone } from "../layout/Section";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { BrowserFrame } from "./BrowserFrame";

interface ProjectCardProps {
  project: Project;
  tone: Tone;
}

export function ProjectCard({ project, tone }: ProjectCardProps) {
  const isDark = tone === "dark";

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="text-4xl">{project.emoji}</div>
        <h3
          className={`mt-4 text-4xl font-semibold tracking-tight md:text-5xl ${
            isDark ? "text-shadow-dark text-white" : "text-shadow-light text-ink"
          }`}
        >
          {project.name}
        </h3>
        <p className={`mt-4 text-lg md:text-xl ${isDark ? "text-white/60" : "text-ink/60"}`}>{project.tagline}</p>
      </motion.div>

      <div className="mx-auto mt-14 max-w-4xl">
        <BrowserFrame src={project.screenshots[0].src} alt={project.screenshots[0].alt} />
      </div>

      <div className="mx-auto mt-14 max-w-2xl text-center">
        <p className={`text-lg leading-relaxed ${isDark ? "text-white/70" : "text-ink/70"}`}>
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} tone={tone}>
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={project.githubUrl} variant="secondary" size="sm" tone={tone}>
            <Github size={16} />
            GitHub
          </Button>
          <Button to={`/projects/${project.slug}`} variant="ghost" size="sm" tone={tone}>
            Read Case Study
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
