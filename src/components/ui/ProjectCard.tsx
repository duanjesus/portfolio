import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import type { Project } from "../../data/projects";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      <div className="overflow-hidden rounded-xl border border-ink/10 shadow-sm">
        <img
          src={project.screenshots[0].src}
          alt={project.screenshots[0].alt}
          loading="lazy"
          className="w-full"
        />
      </div>
      <div>
        <div className="mb-3 text-3xl">{project.emoji}</div>
        <h3 className="text-2xl font-semibold tracking-tight text-ink">{project.name}</h3>
        <p className="mt-3 text-ink/70">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Button href={project.githubUrl} variant="secondary" size="sm">
            <Github size={16} />
            GitHub
          </Button>
          <Button to={`/projects/${project.slug}`} variant="ghost" size="sm" className="!px-0">
            Read Case Study
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
