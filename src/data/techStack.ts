import {
  siOpenjdk,
  siSpringboot,
  siGo,
  siPostgresql,
  siPython,
  siDjango,
  siPhp,
  siSymfony,
  siReact,
  siTypescript,
  siFlutter,
  siRabbitmq,
  siRedis,
  siDocker,
  siGit,
  siGithubactions,
} from "simple-icons";

export interface TechItem {
  name: string;
  iconPath: string;
}

export const techStack: TechItem[] = [
  { name: "Java", iconPath: siOpenjdk.path },
  { name: "Spring Boot", iconPath: siSpringboot.path },
  { name: "Go", iconPath: siGo.path },
  { name: "PostgreSQL", iconPath: siPostgresql.path },
  { name: "Python", iconPath: siPython.path },
  { name: "Django", iconPath: siDjango.path },
  { name: "PHP", iconPath: siPhp.path },
  { name: "Symfony", iconPath: siSymfony.path },
  { name: "React", iconPath: siReact.path },
  { name: "TypeScript", iconPath: siTypescript.path },
  { name: "Flutter", iconPath: siFlutter.path },
  { name: "RabbitMQ", iconPath: siRabbitmq.path },
  { name: "Redis", iconPath: siRedis.path },
  { name: "Docker", iconPath: siDocker.path },
  { name: "Git", iconPath: siGit.path },
  { name: "GitHub Actions", iconPath: siGithubactions.path },
];
