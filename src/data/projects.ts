import type { Locale } from "../i18n/locale";

export interface CaseStudyChallenge {
  title: string;
  description: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string;
  challenges: CaseStudyChallenge[];
  lessonsLearned: string[];
}

export interface ProjectContent {
  tagline: string;
  description: string;
  caseStudy: CaseStudy;
}

export interface Screenshot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  techStack: string[];
  caseStudyTechStack: string[];
  githubUrl: string;
  screenshots: Screenshot[];
  content: Record<Locale, ProjectContent>;
}

import ssDashboard from "../assets/screenshots/social-supply/dashboard.png";
import ssInstitutions from "../assets/screenshots/social-supply/institutions.png";
import ssProducts from "../assets/screenshots/social-supply/products.png";
import ssDistributions from "../assets/screenshots/social-supply/distributions.png";
import ssReports from "../assets/screenshots/social-supply/reports.png";

import cpDashboard from "../assets/screenshots/cashpilot/dashboard.png";
import cpDespesas from "../assets/screenshots/cashpilot/despesas.png";
import cpGrupoFamiliar from "../assets/screenshots/cashpilot/grupo-familiar.png";
import cpRelatorios from "../assets/screenshots/cashpilot/relatorios.png";
import cpSimulacao from "../assets/screenshots/cashpilot/simulacao.png";

import phDashboard from "../assets/screenshots/pulsehub/dashboard.png";
import phChatDirect from "../assets/screenshots/pulsehub/chat-direct.png";
import phChatGroup from "../assets/screenshots/pulsehub/chat-group.png";
import phProfile from "../assets/screenshots/pulsehub/profile.png";

export const projects: Project[] = [
  {
    slug: "social-supply",
    name: "Social Supply Management",
    techStack: ["Java 21", "Spring Boot 3", "PostgreSQL", "JWT", "React", "TypeScript", "Docker"],
    caseStudyTechStack: ["Java 21", "Spring Boot 3.3", "PostgreSQL 16", "JWT", "React 18", "TypeScript", "Docker"],
    githubUrl: "https://github.com/duanjesus/social-supply-management-api",
    screenshots: [
      { src: ssDashboard, alt: "Social Supply dashboard with stats, low-stock alerts and a 6-month trend" },
      { src: ssInstitutions, alt: "Institutions list" },
      { src: ssProducts, alt: "Products list with live stock balance" },
      { src: ssDistributions, alt: "Distributions list" },
      { src: ssReports, alt: "Reports page with period/institution filters" },
    ],
    content: {
      en: {
        tagline: "Managing the full lifecycle of a social food assistance program.",
        description:
          "A full-stack system for institutions to register, receive donations, track inventory, and distribute food to families in vulnerable situations. Built as a monorepo with a Spring Boot 3 REST API and a React SPA.",
        caseStudy: {
          problem:
            "Social assistance programs coordinate dozens of partner institutions, hundreds of donated products, and recurring distributions to families in vulnerable situations. Much of it is tracked manually across spreadsheets, with no single source of truth for what's in stock, what's been distributed, or which institutions are under-served.",
          solution:
            "A monorepo application covering the full lifecycle: institutions register, donations enter the inventory, and distributions flow back out to institutions. Stock balances are computed live from the donation/distribution ledger rather than stored redundantly, so the dashboard's low-stock alerts and 6-month trend are always consistent with the underlying transactions. A dedicated reports module lets staff filter by period and institution and export to PDF or CSV for offline records.",
          architecture:
            "Spring Boot 3 REST API with a layered architecture (controller → service → repository), JWT-based authentication, and PostgreSQL persistence, paired with a React + TypeScript SPA that consumes it. Both halves live in one monorepo (backend/, frontend/) and ship together via Docker Compose.",
          challenges: [
            {
              title: "Keeping stock numbers trustworthy",
              description:
                "Rather than storing a running stock total that donations and distributions increment or decrement (and could drift out of sync), stock is computed on read from the full donation/distribution history, trading a bit of query complexity for a guarantee that the number on screen always matches the ledger.",
            },
            {
              title: "Reporting without a separate analytics stack",
              description:
                "Period- and institution-filtered reports with PDF and CSV export needed to work without introducing a separate BI tool, so the aggregation is built directly into the reports service and exports render server-side.",
            },
          ],
          lessonsLearned: [
            "Domain-modeling a real-world process end-to-end (institutions → donations → inventory → distributions), not just building CRUD screens, was the biggest design decision; getting the lifecycle right up front avoided reshaping the schema later.",
            "Chosen as the first of three portfolio projects, deliberately scoped to demonstrate solid architecture and CRUD fundamentals before moving on to business-rule-heavy (CashPilot) and real-time (PulseHub) systems.",
          ],
        },
      },
      pt: {
        tagline: "Gerenciando o ciclo completo de um programa social de assistência alimentar.",
        description:
          "Um sistema completo para cadastrar instituições, receber doações, controlar estoque e distribuir alimentos para famílias em situação de vulnerabilidade. Construído como um monorepo com uma API REST em Spring Boot 3 e um SPA em React.",
        caseStudy: {
          problem:
            "Programas de assistência social coordenam dezenas de instituições parceiras, centenas de produtos doados e distribuições recorrentes para famílias em situação de vulnerabilidade. Muito disso é controlado manualmente em planilhas, sem uma fonte única de verdade sobre o que está em estoque, o que já foi distribuído ou quais instituições estão sendo pouco atendidas.",
          solution:
            "Uma aplicação em monorepo que cobre o ciclo completo: instituições se cadastram, doações entram no estoque e distribuições saem de volta para as instituições. Os saldos de estoque são calculados em tempo real a partir do histórico de doações/distribuições, em vez de armazenados de forma redundante. Assim, os alertas de estoque baixo e a tendência de 6 meses no dashboard sempre batem com as transações reais. Um módulo de relatórios dedicado permite filtrar por período e instituição, com exportação em PDF ou CSV.",
          architecture:
            "API REST em Spring Boot 3 com arquitetura em camadas (controller → service → repository), autenticação via JWT e persistência em PostgreSQL, junto com um SPA em React + TypeScript que consome essa API. As duas partes vivem em um único monorepo (backend/, frontend/) e sobem juntas via Docker Compose.",
          challenges: [
            {
              title: "Manter os números de estoque confiáveis",
              description:
                "Em vez de armazenar um total de estoque que doações e distribuições incrementam ou decrementam (e que poderia sair de sincronia), o estoque é calculado na leitura a partir do histórico completo de doações/distribuições, trocando um pouco de complexidade na consulta pela garantia de que o número na tela sempre corresponde ao livro-razão.",
            },
            {
              title: "Relatórios sem uma stack de analytics separada",
              description:
                "Relatórios filtrados por período e instituição, com exportação em PDF e CSV, precisavam funcionar sem introduzir uma ferramenta de BI separada, resolvido construindo a agregação diretamente no serviço de relatórios e gerando as exportações no próprio backend.",
            },
          ],
          lessonsLearned: [
            "Modelar de ponta a ponta um processo do mundo real (instituições → doações → estoque → distribuições), e não só telas de CRUD, foi a decisão de design mais importante; acertar o ciclo de vida logo no início evitou remodelar o schema depois.",
            "Escolhido como o primeiro dos três projetos do portfólio, propositalmente dimensionado para demonstrar arquitetura sólida e fundamentos de CRUD antes de avançar para sistemas com regras de negócio complexas (CashPilot) e tempo real (PulseHub).",
          ],
        },
      },
    },
  },
  {
    slug: "cashpilot",
    name: "CashPilot",
    techStack: ["Java 21", "Spring Boot 3", "PostgreSQL", "Flyway", "React", "TypeScript", "Recharts"],
    caseStudyTechStack: [
      "Java 21",
      "Spring Boot 3",
      "PostgreSQL",
      "Flyway",
      "MapStruct",
      "React",
      "TypeScript",
      "TanStack Query",
      "Recharts",
    ],
    githubUrl: "https://github.com/duanjesus/cashpilot",
    screenshots: [
      { src: cpDashboard, alt: "CashPilot dashboard with computed balances" },
      { src: cpDespesas, alt: "Expenses page" },
      { src: cpGrupoFamiliar, alt: "Family group sharing screen" },
      { src: cpRelatorios, alt: "Reports with entradas/saídas chart and category breakdown" },
      { src: cpSimulacao, alt: "Financial scenario simulation" },
    ],
    content: {
      en: {
        tagline: "Personal finance SaaS with family-group sharing and forward-looking projections.",
        description:
          "A personal finance manager covering accounts, cards, income/expenses, installment purchases, recurring subscriptions, and investment goals, plus family-group sharing with role-based access, cash-flow projections, and Excel/PDF exports.",
        caseStudy: {
          problem:
            "Personal finance apps usually stop at \"track your expenses.\" The harder, more interesting problems are: how do you split shared household finances between multiple people without duplicating data ownership, how do you forecast whether a goal is reachable, and how do you keep recurring charges from silently drifting out of sync with reality?",
          solution:
            "CashPilot models accounts, cards, income, and expenses, then layers business logic on top: installment purchases are split automatically across future expense rows, recurring subscriptions are generated by an idempotent daily job safe to re-run without creating duplicates, and a family-group feature lets multiple people share one financial picture with OWNER/MEMBER/VIEWER roles, without ever changing who owns a given transaction, only who can read or write it.",
          architecture:
            "Spring Boot 3 + Java 21 backend with Flyway-managed migrations and MapStruct response mapping, PostgreSQL for persistence, and a React + TypeScript + Vite frontend using TanStack Query, React Hook Form with Zod validation, and Recharts for the reports and forecast charts.",
          challenges: [
            {
              title: "Retrofitting shared access without an access-control system",
              description:
                "Every per-user-scoped repository and service originally took a single userId. Adding family-group sharing meant converting all of them to resolve a scope list of user IDs instead. That was done as one focused pass across the whole backend before building any group-specific feature on top, and verified with the full test suite before moving on.",
            },
            {
              title: "Recurring charges that don't duplicate on re-run",
              description:
                "The subscription-generation job needed to be safe to run manually or on a schedule without creating duplicate charges for the same month, enforced with a partial unique index on (subscription_id, reference_month) rather than relying on application-level checks alone.",
            },
          ],
          lessonsLearned: [
            "Business-rule complexity (family sharing, recurring billing, forecasting) is a different kind of hard than CRUD complexity; most of the effort went into getting the data model and idempotency right, not the UI.",
            "Chosen as the second portfolio project specifically to show a different stack flavor than the first (Flyway instead of auto-DDL, MapStruct instead of manual mapping) and a different kind of engineering problem: business rules over CRUD.",
          ],
        },
      },
      pt: {
        tagline: "SaaS de finanças pessoais com compartilhamento em grupo familiar e projeções financeiras.",
        description:
          "Um gerenciador de finanças pessoais com contas, cartões, receitas/despesas, compras parceladas, assinaturas recorrentes e metas de investimento, além de compartilhamento em grupo familiar com controle de acesso por papel, projeções de fluxo de caixa e exportação em Excel/PDF.",
        caseStudy: {
          problem:
            "Apps de finanças pessoais geralmente param em \"registre seus gastos\". Os problemas mais difíceis e interessantes são: como dividir as finanças de uma casa entre várias pessoas sem duplicar a titularidade dos dados, como prever se uma meta é alcançável e como manter cobranças recorrentes sem que saiam de sincronia com a realidade silenciosamente?",
          solution:
            "O CashPilot modela contas, cartões, receitas e despesas, e depois adiciona regras de negócio em cima: compras parceladas são divididas automaticamente em despesas futuras, assinaturas recorrentes são geradas por um job diário idempotente (seguro de rodar de novo sem criar duplicatas), e um recurso de grupo familiar permite que várias pessoas compartilhem uma mesma visão financeira com papéis de OWNER/MEMBER/VIEWER, sem nunca mudar quem é o dono de uma transação, só quem pode ler ou escrever nela.",
          architecture:
            "Backend em Spring Boot 3 + Java 21 com migrações gerenciadas via Flyway e mapeamento de respostas com MapStruct, PostgreSQL para persistência, e um frontend em React + TypeScript + Vite usando TanStack Query, React Hook Form com validação Zod, e Recharts para os gráficos de relatórios e projeções.",
          challenges: [
            {
              title: "Adaptar acesso compartilhado sem um sistema de controle de acesso",
              description:
                "Cada repositório e serviço com escopo por usuário originalmente recebia um único userId. Adicionar o compartilhamento em grupo familiar significou converter todos eles para resolver uma lista de escopo de IDs de usuário. Isso foi feito como uma única passada focada em todo o backend antes de construir qualquer funcionalidade específica de grupo em cima, e validado com a suíte de testes completa antes de seguir em frente.",
            },
            {
              title: "Cobranças recorrentes que não duplicam ao rodar de novo",
              description:
                "O job de geração de assinaturas precisava ser seguro para rodar manualmente ou de forma agendada sem criar cobranças duplicadas no mesmo mês, garantido com um índice único parcial em (subscription_id, reference_month), em vez de depender só de checagens na camada de aplicação.",
            },
          ],
          lessonsLearned: [
            "Complexidade de regra de negócio (compartilhamento familiar, cobrança recorrente, projeção) é um tipo de dificuldade diferente da complexidade de CRUD; a maior parte do esforço foi acertar o modelo de dados e a idempotência, não a interface.",
            "Escolhido como o segundo projeto do portfólio especificamente para mostrar uma variação de stack diferente do primeiro (Flyway em vez de auto-DDL, MapStruct em vez de mapeamento manual) e um tipo diferente de problema de engenharia: regras de negócio em vez de CRUD.",
          ],
        },
      },
    },
  },
  {
    slug: "pulsehub",
    name: "PulseHub",
    techStack: ["Java 21", "Spring Boot 3", "WebSocket/STOMP", "PostgreSQL", "React", "TypeScript", "Zustand"],
    caseStudyTechStack: [
      "Java 21",
      "Spring Boot 3",
      "STOMP",
      "WebSocket",
      "SockJS",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Zustand",
      "TanStack Query",
    ],
    githubUrl: "https://github.com/duanjesus/pulsehub",
    screenshots: [
      { src: phDashboard, alt: "PulseHub dashboard" },
      { src: phChatDirect, alt: "Direct message conversation" },
      { src: phChatGroup, alt: "Group conversation" },
      { src: phProfile, alt: "User profile page" },
    ],
    content: {
      en: {
        tagline: "Real-time chat built on WebSockets and STOMP.",
        description:
          "A real-time communication platform with private and group messaging, typing indicators, presence, read receipts, voice messages, and Web Push notifications, built to prove hands-on WebSocket/STOMP experience, not just REST.",
        caseStudy: {
          problem:
            "Most portfolio projects stop at REST CRUD. Recruiters asking \"do you know WebSockets?\" need a concrete answer, not a theoretical one. That meant building something where real-time state (presence, typing, delivery) is the actual product, not a bolt-on feature.",
          solution:
            "PulseHub authenticates STOMP connections with the same JWT used over REST, then pushes private messages, typing indicators, and read receipts to per-user queues while presence broadcasts to a public topic. Conversations support both 1:1 and named groups under one unified model, messages can be text or in-browser-recorded voice notes, and notifications reach the user even with the tab closed via real Web Push (VAPID), not just an in-app toast.",
          architecture:
            "Spring Boot 3 + Java 21 backend with STOMP over SockJS for everything real-time and JWT-secured REST for everything else, PostgreSQL with Flyway for persistence. Frontend is React + TypeScript + Vite, deliberately splitting state: TanStack Query for anything fetched-once-and-cached (contacts, history), Zustand for anything arriving continuously over the socket (presence, typing).",
          challenges: [
            {
              title: "One conversation model for 1:1 and group chat",
              description:
                "The original model treated conversations as a fixed pair of users. Adding group chat meant reworking that into a proper participant roster with OWNER/MEMBER roles and moving read state from a single read-timestamp column to a per-participant read-receipt table: a real schema migration against live data, not a greenfield rewrite.",
            },
            {
              title: "Voice messages and text messages sharing one send path",
              description:
                "Rather than duplicating persist-broadcast-notify logic for a new message type, both text and in-browser-recorded voice messages route through the same dispatch service, so presence, notifications, and delivery behave identically regardless of message type.",
            },
          ],
          lessonsLearned: [
            "Real-time systems fail in ways REST APIs don't. A security-provider initialization-order bug only surfaced when booting the full app in Docker, not in isolated unit tests. Green tests alone don't prove a real-time stack actually boots correctly.",
            "Chosen as the third portfolio project to round out the set: architecture and CRUD (Social Supply), business rules (CashPilot), real-time communication (PulseHub). Three different competencies, three concrete answers to three different interview questions.",
          ],
        },
      },
      pt: {
        tagline: "Chat em tempo real construído com WebSockets e STOMP.",
        description:
          "Uma plataforma de comunicação em tempo real com mensagens privadas e em grupo, indicador de digitação, presença, confirmação de leitura, mensagens de voz e notificações push, construída para provar experiência prática com WebSocket/STOMP, não só REST.",
        caseStudy: {
          problem:
            "A maioria dos projetos de portfólio para em CRUD via REST. Recrutadores perguntando \"você sabe WebSockets?\" precisam de uma resposta concreta, não teórica. Isso significou construir algo em que o estado em tempo real (presença, digitação, entrega) é o produto de fato, não um complemento.",
          solution:
            "O PulseHub autentica conexões STOMP com o mesmo JWT usado no REST, e então envia mensagens privadas, indicadores de digitação e confirmações de leitura para filas por usuário, enquanto a presença é transmitida em um tópico público. As conversas suportam tanto 1:1 quanto grupos nomeados sob um único modelo unificado, as mensagens podem ser texto ou notas de voz gravadas no navegador, e as notificações chegam ao usuário mesmo com a aba fechada via Web Push real (VAPID), não só um toast dentro do app.",
          architecture:
            "Backend em Spring Boot 3 + Java 21 com STOMP sobre SockJS para tudo em tempo real e REST protegido por JWT para o resto, PostgreSQL com Flyway para persistência. O frontend é React + TypeScript + Vite, dividindo o estado de forma deliberada: TanStack Query para tudo que é buscado uma vez e cacheado (contatos, histórico), Zustand para tudo que chega continuamente pelo socket (presença, digitação).",
          challenges: [
            {
              title: "Um único modelo de conversa para chat 1:1 e em grupo",
              description:
                "O modelo original tratava conversas como um par fixo de usuários. Adicionar chat em grupo significou reestruturar isso para uma lista de participantes de verdade com papéis de OWNER/MEMBER, e mover o estado de leitura de uma única coluna de timestamp para uma tabela de confirmação de leitura por participante: uma migração de schema de verdade sobre dados já existentes, não uma reescrita do zero.",
            },
            {
              title: "Mensagens de voz e de texto compartilhando um único caminho de envio",
              description:
                "Em vez de duplicar a lógica de persistir-transmitir-notificar para um novo tipo de mensagem, tanto o texto quanto as mensagens de voz gravadas no navegador passam pelo mesmo serviço de despacho, assim presença, notificações e entrega se comportam de forma idêntica independente do tipo de mensagem.",
            },
          ],
          lessonsLearned: [
            "Sistemas em tempo real falham de formas que APIs REST não falham. Um bug de ordem de inicialização de provedor de segurança só apareceu ao subir a aplicação completa no Docker, não em testes unitários isolados. Testes verdes sozinhos não provam que uma stack em tempo real realmente sobe corretamente.",
            "Escolhido como o terceiro projeto do portfólio para completar o conjunto: arquitetura e CRUD (Social Supply), regras de negócio (CashPilot), comunicação em tempo real (PulseHub). Três competências diferentes, três respostas concretas para três perguntas diferentes de entrevista.",
          ],
        },
      },
    },
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
