import type { Locale } from "../i18n/locale";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const timeline: Record<Locale, TimelineItem[]> = {
  en: [
    {
      year: "2018",
      title: "Full Stack Developer, LiftUP Academy",
      description:
        "Built and maintained websites and internal systems with HTML, CSS and JavaScript, including administrative interfaces for educational management. Until 2021.",
    },
    {
      year: "2021",
      title: "Back-end Developer, Classcont Assessoria Contábil",
      description:
        "Web systems end to end, from data modeling and APIs to interfaces, testing and CI, on administrative and financial systems. Until early 2024.",
    },
    {
      year: "2023",
      title: "Systems Analysis and Development, Estácio",
      description: "Degree in progress, with graduation expected in 2027.",
    },
    {
      year: "2024",
      title: "Head of the Social Supply Sector, CEASA-RJ",
      description:
        "Led a team of nine and coordinated supplies for Rio de Janeiro's public schools, plus the donation logistics in two emergencies: the Rio Grande do Sul floods and the flooding in Rio das Ostras. Until mid-2026.",
    },
    {
      year: "2026",
      title: "Open Source Projects",
      description:
        "Published ten projects on GitHub, from full-stack applications in Spring Boot and React to a durable workflow engine in Java and a SQL database written from scratch in Go.",
    },
    {
      year: "Now",
      title: "Open to backend roles",
      description: "Remote or on-site, and open to relocation.",
    },
  ],
  pt: [
    {
      year: "2018",
      title: "Desenvolvedor Full Stack, LiftUP Academy",
      description:
        "Desenvolvimento e manutenção de sites e sistemas internos com HTML, CSS e JavaScript, incluindo interfaces administrativas para gestão educacional. Até 2021.",
    },
    {
      year: "2021",
      title: "Desenvolvedor Back-end, Classcont Assessoria Contábil",
      description:
        "Sistemas web de ponta a ponta, da modelagem de dados e APIs às interfaces, testes e CI, em sistemas administrativos e financeiros. Até o início de 2024.",
    },
    {
      year: "2023",
      title: "Análise e Desenvolvimento de Sistemas, Estácio",
      description: "Graduação em andamento, com conclusão prevista para 2027.",
    },
    {
      year: "2024",
      title: "Chefe do Setor de Abastecimento Social, CEASA-RJ",
      description:
        "Liderei uma equipe de nove pessoas e coordenei o abastecimento das escolas públicas do Rio de Janeiro, além da logística de doações em duas emergências: as enchentes do Rio Grande do Sul e de Rio das Ostras. Até meados de 2026.",
    },
    {
      year: "2026",
      title: "Projetos Open Source",
      description:
        "Publiquei dez projetos no GitHub, de aplicações full-stack em Spring Boot e React a um motor de workflows duráveis em Java e um banco de dados SQL escrito do zero em Go.",
    },
    {
      year: "Hoje",
      title: "Aberto a vagas de backend",
      description: "Remoto ou presencial, com disponibilidade para mudança de cidade.",
    },
  ],
};
