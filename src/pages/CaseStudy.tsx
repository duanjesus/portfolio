import { Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github } from "lucide-react";
import { Section } from "../components/layout/Section";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { BrowserFrame } from "../components/ui/BrowserFrame";
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
      <Section tone="dark" className="pt-32 pb-20 md:pt-40">
        <Button to="/#projects" variant="ghost" size="sm" tone="dark" className="!px-0">
          <ArrowLeft size={16} />
          Back to projects
        </Button>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-2xl text-center"
        >
          <div className="text-4xl">{project.emoji}</div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white md:text-6xl">{project.name}</h1>
          <p className="mt-4 text-xl text-white/60">{project.tagline}</p>
          <div className="mt-8">
            <Button href={project.githubUrl} variant="secondary" size="sm" tone="dark">
              <Github size={16} />
              View on GitHub
            </Button>
          </div>
        </motion.div>

        {project.screenshots.length > 0 && (
          <div className="mx-auto mt-16 max-w-4xl">
            <BrowserFrame src={project.screenshots[0].src} alt={project.screenshots[0].alt} />
          </div>
        )}
      </Section>

      <Section tone="light" narrow>
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
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.screenshots.slice(1).map((shot) => (
                <BrowserFrame key={shot.src} src={shot.src} alt={shot.alt} />
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
