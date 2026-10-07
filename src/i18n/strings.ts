import type { Locale } from "./locale";

export interface UiStrings {
  meta: { title: string; description: string };
  nav: { projects: string; about: string; contact: string; resume: string };
  hero: {
    role: string;
    tagline: string;
    highlight: string;
    viewProjects: string;
    downloadResume: string;
  };
  techStack: { eyebrow: string };
  featuredProjects: { eyebrow: string; github: string; readCaseStudy: string };
  about: { eyebrow: string; paragraph: string };
  githubActivity: {
    eyebrow: string;
    publicRepos: string;
    stars: string;
    topLanguages: string;
    errorPrefix: string;
    errorSuffix: string;
  };
  contact: {
    eyebrow: string;
    subtitle: string;
    resumeLabel: string;
    resumeValue: string;
  };
  footer: { builtWith: string };
  caseStudy: {
    back: string;
    viewOnGithub: string;
    problem: string;
    solution: string;
    architecture: string;
    techStack: string;
    challenges: string;
    lessonsLearned: string;
  };
}

export const strings: Record<Locale, UiStrings> = {
  en: {
    meta: {
      title: "Duan Jesus | Java Backend Developer",
      description:
        "Java backend developer with web application experience since 2018. REST APIs, PostgreSQL, RabbitMQ, Redis and Docker, plus a durable workflow engine in Java and a SQL database written from scratch in Go.",
    },
    nav: { projects: "Projects", about: "About", contact: "Contact", resume: "Resume" },
    hero: {
      role: "Java Backend Developer",
      tagline:
        "Back-end developer with web application experience since 2018, working mainly with Java and Spring Boot: REST APIs, PostgreSQL, RabbitMQ, Redis, Docker and CI/CD. Fluent English.",
      highlight: "At CEASA-RJ I led a team and the supply logistics for Rio de Janeiro's public schools, and built software to keep that operation organized.",
      viewProjects: "View Projects",
      downloadResume: "Download Resume",
    },
    techStack: { eyebrow: "Tech Stack" },
    featuredProjects: { eyebrow: "Featured Projects", github: "GitHub", readCaseStudy: "Read Case Study" },
    about: {
      eyebrow: "About",
      paragraph:
        "I'm a back-end developer focused on Java and Spring Boot, with experience in web systems, REST APIs, databases, messaging, and integration between services. My career also includes leadership and operations: at CEASA-RJ I headed the Social Supply sector, leading a team and coordinating supplies for Rio de Janeiro's public schools, as well as the donation logistics during the Rio Grande do Sul and Rio das Ostras floods. Dealing with those problems every day is what led me to build software that makes the work more organized and efficient. I'm in the final semester of a bachelor's degree in Information Systems at Estácio and speak fluent English, certified by Cultura Inglesa.",
    },
    githubActivity: {
      eyebrow: "GitHub Activity",
      publicRepos: "Public repos",
      stars: "Stars",
      topLanguages: "Top languages",
      errorPrefix: "Live stats are temporarily unavailable right now. Check",
      errorSuffix: "directly.",
    },
    contact: {
      eyebrow: "Contact",
      subtitle: "Open to backend and full-stack roles, remote or on-site, and open to relocation. The fastest way to reach me is email.",
      resumeLabel: "Resume",
      resumeValue: "Download PDF",
    },
    footer: { builtWith: "Built with" },
    caseStudy: {
      back: "Back to projects",
      viewOnGithub: "View on GitHub",
      problem: "Problem",
      solution: "Solution",
      architecture: "Architecture",
      techStack: "Tech Stack",
      challenges: "Challenges",
      lessonsLearned: "Lessons Learned",
    },
  },
  pt: {
    meta: {
      title: "Duan Jesus | Desenvolvedor Backend Java",
      description:
        "Desenvolvedor backend Java com experiência em aplicações web desde 2018. APIs REST, PostgreSQL, RabbitMQ, Redis e Docker, além de um motor de workflows duráveis em Java e um banco de dados SQL escrito do zero em Go.",
    },
    nav: { projects: "Projetos", about: "Sobre", contact: "Contato", resume: "Currículo" },
    hero: {
      role: "Desenvolvedor Backend Java",
      tagline:
        "Desenvolvedor back-end com experiência em aplicações web desde 2018, trabalhando principalmente com Java e Spring Boot: APIs REST, PostgreSQL, RabbitMQ, Redis, Docker e CI/CD. Inglês fluente.",
      highlight: "Na CEASA-RJ, liderei equipe e a logística de abastecimento das escolas públicas do Rio de Janeiro, e criei software para manter essa operação organizada.",
      viewProjects: "Ver Projetos",
      downloadResume: "Baixar Currículo",
    },
    techStack: { eyebrow: "Tecnologias" },
    featuredProjects: { eyebrow: "Projetos em Destaque", github: "GitHub", readCaseStudy: "Ver Estudo de Caso" },
    about: {
      eyebrow: "Sobre",
      paragraph:
        "Sou desenvolvedor back-end com foco em Java e Spring Boot, com experiência em sistemas web, APIs REST, bancos de dados, mensageria e integração entre serviços. Minha trajetória também inclui liderança e gestão de operações: na CEASA-RJ, fui Chefe do Setor de Abastecimento Social, liderando equipes e coordenando o abastecimento das escolas públicas do Rio de Janeiro, além da logística de doações durante as enchentes do Rio Grande do Sul e de Rio das Ostras. Foi lidando com esses problemas no dia a dia que comecei a desenvolver soluções para tornar os processos mais organizados e eficientes. Estou no último período do bacharelado em Sistemas de Informação na Estácio e tenho inglês fluente, com certificação pela Cultura Inglesa.",
    },
    githubActivity: {
      eyebrow: "Atividade no GitHub",
      publicRepos: "Repositórios públicos",
      stars: "Estrelas",
      topLanguages: "Principais linguagens",
      errorPrefix: "As estatísticas ao vivo estão indisponíveis no momento. Acesse",
      errorSuffix: "diretamente.",
    },
    contact: {
      eyebrow: "Contato",
      subtitle: "Aberto a oportunidades como desenvolvedor backend ou full-stack, remoto ou presencial, com disponibilidade para mudança de cidade. A forma mais rápida de falar comigo é por email.",
      resumeLabel: "Currículo",
      resumeValue: "Baixar PDF",
    },
    footer: { builtWith: "Construído com" },
    caseStudy: {
      back: "Voltar aos projetos",
      viewOnGithub: "Ver no GitHub",
      problem: "Problema",
      solution: "Solução",
      architecture: "Arquitetura",
      techStack: "Tecnologias",
      challenges: "Desafios",
      lessonsLearned: "Aprendizados",
    },
  },
};
