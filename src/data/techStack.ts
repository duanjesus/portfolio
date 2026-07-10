import {
  siOpenjdk,
  siSpringboot,
  siReact,
  siTypescript,
  siPostgresql,
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
  { name: "React", iconPath: siReact.path },
  { name: "TypeScript", iconPath: siTypescript.path },
  { name: "PostgreSQL", iconPath: siPostgresql.path },
  { name: "Docker", iconPath: siDocker.path },
  { name: "Git", iconPath: siGit.path },
  { name: "GitHub Actions", iconPath: siGithubactions.path },
];
