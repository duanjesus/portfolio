import type { Locale } from "../i18n/locale";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export const timeline: Record<Locale, TimelineItem[]> = {
  en: [
    {
      year: "2024",
      title: "CEASA-RJ",
      description: "Led the Social Supply (Abastecimento Social) sector: process, people, and operations management.",
    },
    {
      year: "2025",
      title: "College",
      description: "Finishing a degree in Information Systems while building production-style applications on the side.",
    },
    {
      year: "2026",
      title: "Open Source Projects",
      description: "Shipped three full-stack portfolio projects: Social Supply, CashPilot, and PulseHub.",
    },
    {
      year: "Now",
      title: "Looking for my first role as a developer",
      description: "Applying everything above to a real engineering team.",
    },
  ],
  pt: [
    {
      year: "2024",
      title: "CEASA-RJ",
      description: "Liderei o setor de Abastecimento Social: gestão de processos, pessoas e operações.",
    },
    {
      year: "2025",
      title: "Faculdade",
      description: "Finalizando a graduação em Sistemas de Informação enquanto construo aplicações no padrão de produção.",
    },
    {
      year: "2026",
      title: "Projetos Open Source",
      description: "Lancei três projetos completos de portfólio: Social Supply, CashPilot e PulseHub.",
    },
    {
      year: "Hoje",
      title: "Buscando minha primeira oportunidade como desenvolvedor",
      description: "Aplicando tudo isso em um time de engenharia de verdade.",
    },
  ],
};
