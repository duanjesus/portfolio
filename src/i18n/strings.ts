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
        "Java backend developer building modern applications with Spring Boot, React and PostgreSQL. Former Head of Social Supply at CEASA-RJ, now transitioning into software engineering.",
    },
    nav: { projects: "Projects", about: "About", contact: "Contact", resume: "Resume" },
    hero: {
      role: "Java Backend Developer",
      tagline:
        "Building modern backend applications with Java, Spring Boot, React and PostgreSQL. Former Head of Social Supply at CEASA-RJ, now transitioning into Software Engineering.",
      highlight: "From managing social supply operations to building modern software solutions.",
      viewProjects: "View Projects",
      downloadResume: "Download Resume",
    },
    techStack: { eyebrow: "Tech Stack" },
    featuredProjects: { eyebrow: "Featured Projects", github: "GitHub", readCaseStudy: "Read Case Study" },
    about: {
      eyebrow: "About",
      paragraph:
        "During my time leading the Social Supply sector at CEASA-RJ, I managed processes, people, and operations at scale. That experience is what got me interested in solving problems through technology. Today I'm finishing my degree in Information Systems and building modern applications with Java, Spring Boot, and React while looking for my first opportunity as a developer.",
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
      subtitle: "Open to backend and full-stack roles. The fastest way to reach me is email.",
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
        "Desenvolvedor backend Java construindo aplicações modernas com Spring Boot, React e PostgreSQL. Ex-Chefe de Abastecimento Social na CEASA-RJ, hoje em transição para Engenharia de Software.",
    },
    nav: { projects: "Projetos", about: "Sobre", contact: "Contato", resume: "Currículo" },
    hero: {
      role: "Desenvolvedor Backend Java",
      tagline:
        "Construindo aplicações backend modernas com Java, Spring Boot, React e PostgreSQL. Ex-Chefe de Abastecimento Social na CEASA-RJ, hoje em transição para Engenharia de Software.",
      highlight: "De gerenciar operações de abastecimento social a construir soluções de software modernas.",
      viewProjects: "Ver Projetos",
      downloadResume: "Baixar Currículo",
    },
    techStack: { eyebrow: "Tecnologias" },
    featuredProjects: { eyebrow: "Projetos em Destaque", github: "GitHub", readCaseStudy: "Ver Estudo de Caso" },
    about: {
      eyebrow: "Sobre",
      paragraph:
        "Durante minha experiência liderando o setor de Abastecimento Social da CEASA-RJ, participei da gestão de processos, pessoas e operações. Essa vivência despertou meu interesse em resolver problemas através da tecnologia. Hoje estou finalizando minha graduação em Sistemas de Informação e construindo aplicações modernas com Java, Spring Boot e React enquanto busco minha primeira oportunidade como desenvolvedor.",
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
      subtitle: "Aberto a oportunidades como desenvolvedor backend ou full-stack. A forma mais rápida de falar comigo é por email.",
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
