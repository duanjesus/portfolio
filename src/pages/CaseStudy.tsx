import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github } from "lucide-react";
import { Section } from "../components/layout/Section";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { getProjectBySlug } from "../data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/" replace />;

  const { caseStudy } = project;

  return (
    <article>
      <Section className="pt-28 md:pt-36" narrow>
        <Button to="/#projects" variant="ghost" size="sm" className="!px-0">
          <ArrowLeft size={16} />
          Back to projects
        </Button>
        <div className="mt-8 text-4xl">{project.emoji}</div>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl">{project.name}</h1>
        <p className="mt-4 text-xl text-ink/60">{project.tagline}</p>
        <div className="mt-8">
          <Button href={project.githubUrl} variant="secondary" size="sm">
            <Github size={16} />
            View on GitHub
          </Button>
        </div>
      </Section>

      {project.screenshots.length > 0 && (
        <Section className="pt-0" narrow>
          <div className="overflow-hidden rounded-xl border border-ink/10 shadow-sm">
            <img src={project.screenshots[0].src} alt={project.screenshots[0].alt} className="w-full" />
          </div>
        </Section>
      )}

      <Section className="border-t border-black/5" narrow>
        <motion.div {...fadeUp}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Problem</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{caseStudy.problem}</p>
        </motion.div>

        <motion.div {...fadeUp} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Solution</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{caseStudy.solution}</p>
        </motion.div>

        <motion.div {...fadeUp} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Architecture</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/80">{caseStudy.architecture}</p>
          {project.screenshots.length > 1 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.screenshots.slice(1).map((shot) => (
                <div key={shot.src} className="overflow-hidden rounded-xl border border-ink/10">
                  <img src={shot.src} alt={shot.alt} loading="lazy" className="w-full" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div {...fadeUp} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Tech Stack</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Challenges</h2>
          <div className="mt-4 space-y-6">
            {caseStudy.challenges.map((challenge) => (
              <div key={challenge.title}>
                <h3 className="font-semibold text-ink">{challenge.title}</h3>
                <p className="mt-1 leading-relaxed text-ink/70">{challenge.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="mt-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/40">Lessons Learned</h2>
          <ul className="mt-4 space-y-3">
            {caseStudy.lessonsLearned.map((lesson) => (
              <li key={lesson} className="flex gap-3 leading-relaxed text-ink/70">
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-ink/30" />
                {lesson}
              </li>
            ))}
          </ul>
        </motion.div>
      </Section>
    </article>
  );
}
