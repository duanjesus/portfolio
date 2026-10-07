import {
  siOpenjdk,
  siSpringboot,
  siSpringsecurity,
  siGo,
  siPython,
  siTypescript,
  siReact,
  siPostgresql,
  siRabbitmq,
  siRedis,
  siPrometheus,
  siGrafana,
  siDocker,
  siTerraform,
  siGithubactions,
  siGit,
  siApachemaven,
  siPhp,
  siFlutter,
} from "simple-icons";

export interface TechItem {
  name: string;
  iconPath: string;
}

// simple-icons carries no Microsoft marks, so SQL Server gets a plain database glyph.
const databaseGlyph =
  "M4 6.5a8 3 0 1 0 16 0a8 3 0 1 0-16 0ZM4 8.5v3.3a8 3 0 0 0 16 0V8.5a8 3 0 0 1-16 0ZM4 14v3.3a8 3 0 0 0 16 0V14a8 3 0 0 1-16 0Z";

export const techStack: TechItem[] = [
  { name: "Java", iconPath: siOpenjdk.path },
  { name: "Spring Boot", iconPath: siSpringboot.path },
  { name: "Spring Security", iconPath: siSpringsecurity.path },
  { name: "Go", iconPath: siGo.path },
  { name: "Python", iconPath: siPython.path },
  { name: "TypeScript", iconPath: siTypescript.path },
  { name: "React", iconPath: siReact.path },
  { name: "PostgreSQL", iconPath: siPostgresql.path },
  { name: "SQL Server", iconPath: databaseGlyph },
  { name: "RabbitMQ", iconPath: siRabbitmq.path },
  { name: "Redis", iconPath: siRedis.path },
  { name: "Prometheus", iconPath: siPrometheus.path },
  { name: "Grafana", iconPath: siGrafana.path },
  { name: "Docker", iconPath: siDocker.path },
  { name: "Terraform", iconPath: siTerraform.path },
  { name: "GitHub Actions", iconPath: siGithubactions.path },
  { name: "Git", iconPath: siGit.path },
  { name: "Maven", iconPath: siApachemaven.path },
  { name: "PHP", iconPath: siPhp.path },
  { name: "Flutter", iconPath: siFlutter.path },
];
