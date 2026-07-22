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
    slug: "java-patterns-lab",
    name: "Java Patterns Lab",
    techStack: ["Java 21", "Maven", "JUnit 5"],
    caseStudyTechStack: ["Java 21", "Maven", "JUnit 5", "Mermaid UML"],
    githubUrl: "https://github.com/duanjesus/java-patterns-lab",
    screenshots: [],
    content: {
      en: {
        tagline: "A worked catalog of classic Gang-of-Four design patterns.",
        description:
          "Sixteen GoF design patterns implemented against one shared e-commerce checkout domain, each with a problem/solution writeup, a UML diagram, runnable code, and a test proving the pattern's actual behavior.",
        caseStudy: {
          problem:
            "Most design-pattern tutorials show a pattern in isolation with a toy example unrelated to the last one, so nothing builds toward a coherent mental model of when to actually reach for each one.",
          solution:
            "All 16 patterns (Strategy, Factory Method, Observer, Builder, Adapter, Decorator, Chain of Responsibility, Template Method, Command, Singleton, Abstract Factory, Facade, Proxy, Composite, State, Iterator) are implemented against the same e-commerce checkout domain (orders, payments, invoices, support tickets, reports, shipping, catalog), so the catalog reads as one coherent story. Every pattern ships with a problem/solution writeup and a Mermaid UML diagram that renders directly on GitHub, a runnable Demo class with a narrated main(), and a JUnit 5 test that asserts an actual behavioral difference, not just that the object compiles.",
          architecture:
            "Plain Java 21, Maven, no framework, no dependencies beyond JUnit 5, deliberately kept dependency-light so every example runs with nothing beyond mvn test. One self-contained package per pattern, mirrored by one test package; patterns don't import each other's classes even where the concept overlaps.",
          challenges: [
            {
              title: "One coherent domain instead of sixteen toy examples",
              description:
                "Keeping every pattern's example genuinely tied to the same checkout domain, rather than falling back to unrelated animal or shape examples the moment a pattern didn't obviously fit, took deliberate design work per pattern, like modeling a shipping label and customs form pairing as Abstract Factory, or nested cart bundles as Composite.",
            },
            {
              title: "Tests that prove behavior, not just compilation",
              description:
                "Each JUnit 5 test asserts an actual behavioral difference the pattern produces, such as swapping a Strategy changing the computed total, or an invalid State transition being rejected, rather than simply instantiating the object, which is the more common shortcut in pattern demo repos.",
            },
          ],
          lessonsLearned: [
            "A shared domain across every example turns a reference catalog into something that reads start to finish, and makes it obvious which real-world problem each pattern actually solves.",
            "Chosen as the first of the portfolio's five backend-focused projects, deliberately scoped to demonstrate object-oriented design fundamentals before moving on to CRUD architecture, business rules, real-time communication, and infrastructure.",
          ],
        },
      },
      pt: {
        tagline: "Um catálogo comentado dos padrões clássicos de design GoF.",
        description:
          "Dezesseis padrões de design GoF implementados sobre um único domínio de checkout de e-commerce compartilhado, cada um com problema/solução, diagrama UML, código executável e um teste que comprova o comportamento real do padrão.",
        caseStudy: {
          problem:
            "A maioria dos tutoriais de padrões de design mostra cada padrão isolado, com um exemplo de brinquedo sem relação com o anterior, então nada constrói um modelo mental coerente de quando realmente usar cada um.",
          solution:
            "Os 16 padrões (Strategy, Factory Method, Observer, Builder, Adapter, Decorator, Chain of Responsibility, Template Method, Command, Singleton, Abstract Factory, Facade, Proxy, Composite, State, Iterator) são implementados sobre o mesmo domínio de checkout de e-commerce (pedidos, pagamentos, faturas, chamados de suporte, relatórios, envio, catálogo), então o catálogo lê como uma história coerente. Cada padrão vem com um texto de problema/solução e um diagrama UML em Mermaid que renderiza direto no GitHub, uma classe Demo executável com um main() narrado, e um teste JUnit 5 que verifica uma diferença de comportamento real, não só que o objeto compila.",
          architecture:
            "Java 21 puro, Maven, sem framework, sem dependências além do JUnit 5, propositalmente leve em dependências para que todo exemplo rode só com mvn test. Um pacote independente por padrão, espelhado por um pacote de teste; os padrões não importam classes uns dos outros mesmo quando o conceito se sobrepõe.",
          challenges: [
            {
              title: "Um domínio coerente em vez de dezesseis exemplos soltos",
              description:
                "Manter o exemplo de cada padrão genuinamente ligado ao mesmo domínio de checkout, em vez de recorrer a exemplos de animais ou formas geométricas assim que um padrão não se encaixava obviamente, exigiu trabalho de design deliberado por padrão, como modelar o par etiqueta de envio e formulário aduaneiro como Abstract Factory, ou pacotes de carrinho aninhados como Composite.",
            },
            {
              title: "Testes que provam comportamento, não só compilação",
              description:
                "Cada teste JUnit 5 verifica uma diferença de comportamento real que o padrão produz, como trocar uma Strategy mudando o total calculado, ou uma transição de State inválida sendo rejeitada, em vez de só instanciar o objeto, que é o atalho mais comum em repositórios de demonstração de padrões.",
            },
          ],
          lessonsLearned: [
            "Um domínio compartilhado em todos os exemplos transforma um catálogo de referência em algo que se lê do início ao fim, e deixa claro qual problema do mundo real cada padrão realmente resolve.",
            "Escolhido como o primeiro dos cinco projetos de backend do portfólio, propositalmente dimensionado para demonstrar fundamentos de design orientado a objetos antes de avançar para arquitetura CRUD, regras de negócio, comunicação em tempo real e infraestrutura.",
          ],
        },
      },
    },
  },
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
  {
    slug: "pulsequeue",
    name: "PulseQueue",
    techStack: ["Java 21", "Spring Boot 3", "RabbitMQ", "Redis", "React"],
    caseStudyTechStack: [
      "Java 21",
      "Spring Boot 3",
      "RabbitMQ",
      "Redis",
      "PostgreSQL",
      "Flyway",
      "React",
      "TypeScript",
      "Prometheus",
      "Grafana",
    ],
    githubUrl: "https://github.com/duanjesus/pulsequeue",
    screenshots: [],
    content: {
      en: {
        tagline: "Notification infrastructure other services publish to, not a notification CRUD app.",
        description:
          "A RabbitMQ-backed event pipeline with retry and dead-lettering, Redis dedup and rate-limiting, an API-key-guarded ingress, and full observability with Prometheus and Grafana, fanning events out to Email, Push, and real WebSocket delivery.",
        caseStudy: {
          problem:
            "Most notification features are built as a CRUD table bolted onto whichever service happens to need alerts first, which means every new service that wants to notify a user reinvents retry logic, dedup, and delivery channels from scratch.",
          solution:
            "PulseQueue is the infrastructure layer other services publish to: any producer that can reach RabbitMQ with a valid API key hands off a domain event, such as expense.created or donation.created, or any future type, and walks away. PulseQueue owns everything from that point on: queueing, retrying with exponential backoff, dead-lettering what can't be delivered, deduplicating redeliveries, rate-limiting noisy producers, and fanning the event out to Email, Push, and a real WebSocket channel, all visible on a live Kibana-style ops dashboard. It ships standalone with its own event-simulation endpoint, but a real bridge already calls back into PulseHub to deliver actual chat messages.",
          architecture:
            "Spring Boot 3 + Java 21 backend: a topic exchange feeds a single queue, a stateless retry interceptor handles exponential backoff, and RabbitMQ's own dead-letter-exchange wiring takes over once retries are exhausted, no custom retry-tracking table needed. Redis backs both deduplication (check-before, mark-after-success, not claim-then-process) and per-source rate limiting. Every outcome persists to PostgreSQL via Flyway-managed migrations. The React + TypeScript dashboard polls REST stats via TanStack Query and subscribes to a STOMP topic for the live event feed, styled deliberately as a dark ops tool, not an admin CRUD panel. Prometheus scrapes custom Micrometer counters and a provisioned Grafana dashboard visualizes them.",
          challenges: [
            {
              title: "Deduplication that doesn't cannibalize its own retries",
              description:
                "Marking an event as processed before dispatch would make every in-process retry of a currently-failing delivery look like a duplicate of itself and get silently skipped instead of actually retrying. Fixed by only writing the Redis dedup key after the dispatch service actually succeeds.",
            },
            {
              title: "A transaction boundary that was erasing its own failure records",
              description:
                "Wrapping the whole processing method in one transactional call meant that rethrowing the triggering exception, needed for the retry interceptor to see the failure, rolled back the very 'this attempt failed' row meant to survive it. Fixed by recording outcomes through a separate bean where each write commits independently.",
            },
          ],
          lessonsLearned: [
            "Positioning this as infrastructure other services call, not a feature any one service owns, forced real interface discipline: one event contract, one publish path, and every consumer-side concern (retry, dedup, rate limit, fan-out) living entirely on this side of that boundary.",
            "Chosen as the fifth portfolio project specifically to demonstrate message-queue and observability competency (RabbitMQ, Redis, Prometheus, Grafana) that none of the other four cover.",
          ],
        },
      },
      pt: {
        tagline: "Infraestrutura de notificação para outros serviços publicarem, não um CRUD de notificações.",
        description:
          "Um pipeline de eventos com RabbitMQ, retry e dead-lettering, deduplicação e rate-limiting via Redis, uma entrada protegida por API key e observabilidade completa com Prometheus e Grafana, distribuindo eventos por Email, Push e entrega real via WebSocket.",
        caseStudy: {
          problem:
            "A maioria das funcionalidades de notificação é construída como uma tabela CRUD grudada no primeiro serviço que precisou de alertas, o que significa que cada novo serviço que quer notificar um usuário reinventa a lógica de retry, deduplicação e canais de entrega do zero.",
          solution:
            "O PulseQueue é a camada de infraestrutura que outros serviços usam: qualquer produtor que alcance o RabbitMQ com uma API key válida entrega um evento de domínio, como expense.created ou donation.created, ou qualquer tipo futuro, e segue em frente. A partir daí, o PulseQueue cuida de tudo: enfileiramento, retry com backoff exponencial, dead-lettering do que não pode ser entregue, deduplicação de reentregas, rate-limiting de produtores barulhentos, e distribuição do evento por Email, Push e um canal WebSocket real, tudo visível em um painel operacional ao vivo estilo Kibana. Funciona de forma standalone com seu próprio endpoint de simulação de eventos, mas já existe uma ponte real que chama o PulseHub de volta para entregar mensagens de chat de verdade.",
          architecture:
            "Backend em Spring Boot 3 + Java 21: uma topic exchange alimenta uma única fila, um interceptor de retry sem estado cuida do backoff exponencial, e o próprio mecanismo de dead-letter-exchange do RabbitMQ assume quando as tentativas se esgotam, sem precisar de uma tabela customizada de rastreamento de retry. O Redis sustenta tanto a deduplicação (verificar antes, marcar depois do sucesso, não reservar e depois processar) quanto o rate-limiting por origem. Todo resultado é persistido no PostgreSQL via migrações gerenciadas pelo Flyway. O painel em React + TypeScript consulta estatísticas via REST com TanStack Query e assina um tópico STOMP para o feed de eventos ao vivo, estilizado deliberadamente como uma ferramenta operacional escura, não um painel CRUD administrativo. O Prometheus coleta contadores customizados via Micrometer e um dashboard Grafana provisionado os visualiza.",
          challenges: [
            {
              title: "Deduplicação que não devora suas próprias tentativas de retry",
              description:
                "Marcar um evento como processado antes do envio faria com que cada nova tentativa de uma entrega que ainda está falhando parecesse uma duplicata de si mesma e fosse silenciosamente ignorada em vez de realmente tentada de novo. Corrigido escrevendo a chave de deduplicação no Redis só depois que o serviço de despacho realmente tem sucesso.",
            },
            {
              title: "Um limite de transação que apagava seus próprios registros de falha",
              description:
                "Envolver todo o método de processamento em uma única transação fazia com que relançar a exceção que disparou a falha, necessário para o interceptor de retry enxergar o problema, desfizesse justamente a linha 'essa tentativa falhou' que deveria sobreviver a isso. Corrigido registrando os resultados através de um bean separado, onde cada escrita é confirmada independentemente.",
            },
          ],
          lessonsLearned: [
            "Posicionar isso como infraestrutura que outros serviços chamam, e não uma funcionalidade que um serviço qualquer possui, forçou disciplina real de interface: um único contrato de evento, um único caminho de publicação, e toda preocupação do lado consumidor (retry, dedup, rate limit, distribuição) vivendo inteiramente desse lado da fronteira.",
            "Escolhido como o quinto projeto do portfólio especificamente para demonstrar competência em filas de mensagens e observabilidade (RabbitMQ, Redis, Prometheus, Grafana) que nenhum dos outros quatro cobre.",
          ],
        },
      },
    },
  },
  {
    slug: "rotacusto",
    name: "RotaCusto",
    techStack: ["Java 21", "Spring Boot 3", "Flutter", "PostgreSQL", "OpenStreetMap"],
    caseStudyTechStack: [
      "Java 21",
      "Spring Boot 3",
      "Flutter",
      "PostgreSQL",
      "OpenRouteService",
      "Overpass API",
      "Nominatim",
    ],
    githubUrl: "https://github.com/duanjesus/rotacusto",
    screenshots: [],
    content: {
      en: {
        tagline: "Trip cost calculator with live turn-by-turn GPS navigation, running on OpenStreetMap.",
        description:
          "Calculates the full cost of a road trip (fuel/energy, tolls, vehicle wear, food stops) across cars, motorcycles, vans, trucks, and buses, including EVs and hybrids, then offers live voice-guided navigation once the trip is calculated. Windows desktop and Android from one Flutter codebase, no Google Maps billing.",
        caseStudy: {
          problem:
            "Estimating what a road trip actually costs, not just distance, means combining vehicle-specific fuel or energy consumption, every toll along the route, wear, and food stops, and commercial map platforms that offer this kind of routing charge per request at a scale that doesn't work for a free personal tool.",
          solution:
            "RotaCusto's backend is the entire 'brain': it resolves addresses, computes routes and turn-by-turn instructions, detects tolls crossed along the way, and prices the whole trip for the selected vehicle, all on top of OpenStreetMap infrastructure (Nominatim geocoding, OpenRouteService routing, Overpass for tolls and fuel stations) instead of a billed Google Maps API. The Flutter client never calculates anything itself, only sends parameters and renders the response, across a shared Windows desktop and Android codebase. Once a trip is calculated, the app switches into live turn-by-turn navigation with voice guidance, automatic rerouting on deviation, and Android background operation that survives the screen turning off.",
          architecture:
            "Spring Boot 3 REST API (Java 21) with a self-starting embedded PostgreSQL, no Docker or separate service required, backed by a roughly 9,000-row vehicle catalog (cars, motorcycles, vans, trucks, buses, EVs, plug-in hybrids) and a 330-plaza national toll dataset, both mixing real government sources with clearly-documented estimates where no official data exists. The Flutter app keeps every navigation-relevant calculation, like route progress matching and deviation detection, as pure Dart with no Flutter or network imports, so it's unit-testable without a device.",
          challenges: [
            {
              title: "A vehicle and toll dataset built from whatever data actually exists, not assumed to exist",
              description:
                "Real government fuel-consumption data only exists for cars; motorcycles, trucks, and buses needed a documented estimation methodology instead. Toll pricing similarly turned out not to be uniform per highway concession, the norm rather than the exception, so each concession's plazas were verified individually rather than applying one blanket price nationwide.",
            },
            {
              title: "Reliable turn-by-turn navigation on a real moving device",
              description:
                "Voice guidance has to speak a step only when it changes, deviation detection needs multiple consecutive off-route GPS readings before rerouting to avoid false positives from GPS noise, and Android background operation needs a foreground service with its own Flutter binding, since the standard method-channel plugins throw if used from a bare background isolate.",
            },
          ],
          lessonsLearned: [
            "Being explicit about what's real government data versus a documented estimate, for both the vehicle catalog and the toll dataset, turned out to matter more for correctness than any single algorithm in the app. Most of the actual engineering effort went into sourcing and verifying data, not computing with it.",
            "The most complex and recently-shipped project in the portfolio, chosen to show cross-platform mobile delivery (Flutter, Windows and Android from one codebase) and large-scale external-data integration on top of the backend and web competencies the other four projects already cover.",
          ],
        },
      },
      pt: {
        tagline: "Calculadora de custo de viagem com navegação GPS turn-by-turn ao vivo, rodando sobre OpenStreetMap.",
        description:
          "Calcula o custo completo de uma viagem rodoviária (combustível/energia, pedágios, desgaste do veículo, paradas para alimentação) para carros, motos, vans, caminhões e ônibus, incluindo elétricos e híbridos, e depois oferece navegação guiada por voz ao vivo assim que a viagem é calculada. Windows desktop e Android a partir do mesmo código Flutter, sem cobrança do Google Maps.",
        caseStudy: {
          problem:
            "Estimar quanto uma viagem rodoviária realmente custa, não só a distância, significa combinar consumo de combustível ou energia específico do veículo, cada pedágio no trajeto, desgaste e paradas para alimentação, e as plataformas de mapa comerciais que oferecem esse tipo de roteirização cobram por requisição numa escala que não funciona para uma ferramenta pessoal gratuita.",
          solution:
            "O backend do RotaCusto é o 'cérebro' inteiro: resolve endereços, calcula rotas e instruções de navegação passo a passo, detecta pedágios cruzados no caminho, e precifica a viagem inteira para o veículo selecionado, tudo sobre infraestrutura OpenStreetMap (geocodificação Nominatim, roteirização OpenRouteService, Overpass para pedágios e postos de combustível) em vez de uma API paga do Google Maps. O cliente Flutter nunca calcula nada sozinho, só envia parâmetros e renderiza a resposta, com um único código compartilhado entre Windows desktop e Android. Assim que uma viagem é calculada, o app entra em navegação turn-by-turn ao vivo com voz guiada, recálculo automático de rota em caso de desvio, e operação em segundo plano no Android que sobrevive à tela apagada.",
          architecture:
            "API REST em Spring Boot 3 (Java 21) com um PostgreSQL embarcado que sobe sozinho, sem precisar de Docker ou serviço separado, sustentado por um catálogo de cerca de 9 mil veículos (carros, motos, vans, caminhões, ônibus, elétricos, híbridos plug-in) e uma base nacional de 330 praças de pedágio, ambos combinando fontes governamentais reais com estimativas claramente documentadas onde não existe dado oficial. O app Flutter mantém todo cálculo relevante para navegação, como correspondência de progresso na rota e detecção de desvio, como Dart puro, sem imports de Flutter ou rede, então é testável sem precisar de um dispositivo.",
          challenges: [
            {
              title: "Um catálogo de veículos e pedágios construído a partir do dado que realmente existe, não do que se assume existir",
              description:
                "Dado oficial de consumo de combustível do governo só existe para carros; motos, caminhões e ônibus precisaram de uma metodologia de estimativa documentada. O preço de pedágio, da mesma forma, não é uniforme por concessão rodoviária, isso é a regra, não a exceção, então cada praça de cada concessão foi verificada individualmente em vez de aplicar um preço genérico nacional.",
            },
            {
              title: "Navegação turn-by-turn confiável em um dispositivo real em movimento",
              description:
                "A voz guiada só pode falar uma instrução quando ela muda, a detecção de desvio precisa de várias leituras de GPS consecutivas fora da rota antes de recalcular para evitar falsos positivos por ruído de GPS, e a operação em segundo plano no Android precisa de um serviço foreground com seu próprio binding do Flutter, já que os plugins padrão baseados em method channel lançam exceção se usados de um isolate em segundo plano puro.",
            },
          ],
          lessonsLearned: [
            "Ser explícito sobre o que é dado oficial do governo versus uma estimativa documentada, tanto no catálogo de veículos quanto na base de pedágios, importou mais para a correção do que qualquer algoritmo isolado do app. A maior parte do esforço de engenharia foi buscar e verificar dado, não calcular em cima dele.",
            "O projeto mais complexo e mais recente do portfólio, escolhido para mostrar entrega mobile multiplataforma (Flutter, Windows e Android a partir de um único código) e integração de dados externos em larga escala, complementando as competências de backend e web que os outros quatro projetos já cobrem.",
          ],
        },
      },
    },
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
