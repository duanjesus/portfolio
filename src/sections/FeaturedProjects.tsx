import { Section } from "../components/layout/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { projects } from "../data/projects";

export function FeaturedProjects() {
  return (
    <Section id="projects" className="border-t border-black/5">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Featured Projects</h2>
      <div className="mt-12 flex flex-col gap-24 md:mt-16 md:gap-32">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} reversed={index % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
