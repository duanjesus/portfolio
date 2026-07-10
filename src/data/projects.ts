export interface CaseStudyChallenge {
  title: string;
  description: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  architecture: string;
  techStack: string[];
  challenges: CaseStudyChallenge[];
  lessonsLearned: string[];
}

export interface Screenshot {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  screenshots: Screenshot[];
  caseStudy: CaseStudy;
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
    emoji: "🚚",
    tagline: "Managing the full lifecycle of a social food assistance program.",
    description:
      "A full-stack system for institutions to register, receive donations, track inventory, and distribute food to families in vulnerable situations. Built as a monorepo with a Spring Boot 3 REST API and a React SPA.",
    techStack: ["Java 21", "Spring Boot 3", "PostgreSQL", "JWT", "React", "TypeScript", "Docker"],
    githubUrl: "https://github.com/duanjesus/social-supply-management-api",
    screenshots: [
      { src: ssDashboard, alt: "Social Supply dashboard with stats, low-stock alerts and a 6-month trend" },
      { src: ssInstitutions, alt: "Institutions list" },
      { src: ssProducts, alt: "Products list with live stock balance" },
      { src: ssDistributions, alt: "Distributions list" },
      { src: ssReports, alt: "Reports page with period/institution filters" },
    ],
    caseStudy: {
      problem:
        "Social assistance programs coordinate dozens of partner institutions, hundreds of donated products, and recurring distributions to families in vulnerable situations — much of it tracked manually across spreadsheets, with no single source of truth for what's in stock, what's been distributed, or which institutions are under-served.",
      solution:
        "A monorepo application covering the full lifecycle: institutions register, donations enter the inventory, and distributions flow back out to institutions. Stock balances are computed live from the donation/distribution ledger rather than stored redundantly, so the dashboard's low-stock alerts and 6-month trend are always consistent with the underlying transactions. A dedicated reports module lets staff filter by period and institution and export to PDF or CSV for offline records.",
      architecture:
        "Spring Boot 3 REST API with a layered architecture (controller → service → repository), JWT-based authentication, and PostgreSQL persistence, paired with a React + TypeScript SPA that consumes it. Both halves live in one monorepo (backend/, frontend/) and ship together via Docker Compose.",
      techStack: ["Java 21", "Spring Boot 3.3", "PostgreSQL 16", "JWT", "React 18", "TypeScript", "Docker"],
      challenges: [
        {
          title: "Keeping stock numbers trustworthy",
          description:
            "Rather than storing a running stock total that donations and distributions increment or decrement (and could drift out of sync), stock is computed on read from the full donation/distribution history — trading a bit of query complexity for a guarantee that the number on screen always matches the ledger.",
        },
        {
          title: "Reporting without a separate analytics stack",
          description:
            "Period- and institution-filtered reports with PDF and CSV export needed to work without introducing a separate BI tool — solved by building the aggregation directly into the reports service and rendering exports server-side.",
        },
      ],
      lessonsLearned: [
        "Domain-modeling a real-world process end-to-end — institutions → donations → inventory → distributions — not just building CRUD screens, was the biggest design decision; getting the lifecycle right up front avoided reshaping the schema later.",
        "Chosen as the first of three portfolio projects, deliberately scoped to demonstrate solid architecture and CRUD fundamentals before moving on to business-rule-heavy (CashPilot) and real-time (PulseHub) systems.",
      ],
    },
  },
  {
    slug: "cashpilot",
    name: "CashPilot",
    emoji: "💰",
    tagline: "Personal finance SaaS with family-group sharing and forward-looking projections.",
    description:
      "A personal finance manager covering accounts, cards, income/expenses, installment purchases, recurring subscriptions, and investment goals — plus family-group sharing with role-based access, cash-flow projections, and Excel/PDF exports.",
    techStack: ["Java 21", "Spring Boot 3", "PostgreSQL", "Flyway", "React", "TypeScript", "Recharts"],
    githubUrl: "https://github.com/duanjesus/cashpilot",
    screenshots: [
      { src: cpDashboard, alt: "CashPilot dashboard with computed balances" },
      { src: cpDespesas, alt: "Expenses page" },
      { src: cpGrupoFamiliar, alt: "Family group sharing screen" },
      { src: cpRelatorios, alt: "Reports with entradas/saídas chart and category breakdown" },
      { src: cpSimulacao, alt: "Financial scenario simulation" },
    ],
    caseStudy: {
      problem:
        "Personal finance apps usually stop at \"track your expenses.\" The harder, more interesting problems are: how do you split shared household finances between multiple people without duplicating data ownership, how do you forecast whether a goal is reachable, and how do you keep recurring charges from silently drifting out of sync with reality?",
      solution:
        "CashPilot models accounts, cards, income, and expenses, then layers business logic on top: installment purchases are split automatically across future expense rows, recurring subscriptions are generated by an idempotent daily job safe to re-run without creating duplicates, and a family-group feature lets multiple people share one financial picture with OWNER/MEMBER/VIEWER roles — without ever changing who owns a given transaction, only who can read or write it.",
      architecture:
        "Spring Boot 3 + Java 21 backend with Flyway-managed migrations and MapStruct response mapping, PostgreSQL for persistence, and a React + TypeScript + Vite frontend using TanStack Query, React Hook Form with Zod validation, and Recharts for the reports and forecast charts.",
      techStack: ["Java 21", "Spring Boot 3", "PostgreSQL", "Flyway", "MapStruct", "React", "TypeScript", "TanStack Query", "Recharts"],
      challenges: [
        {
          title: "Retrofitting shared access without an access-control system",
          description:
            "Every per-user-scoped repository and service originally took a single userId. Adding family-group sharing meant converting all of them to resolve a scope list of user IDs instead — done as one focused pass across the whole backend before building any group-specific feature on top, and verified with the full test suite before moving on.",
        },
        {
          title: "Recurring charges that don't duplicate on re-run",
          description:
            "The subscription-generation job needed to be safe to run manually or on a schedule without creating duplicate charges for the same month — enforced with a partial unique index on (subscription_id, reference_month) rather than relying on application-level checks alone.",
        },
      ],
      lessonsLearned: [
        "Business-rule complexity — family sharing, recurring billing, forecasting — is a different kind of hard than CRUD complexity; most of the effort went into getting the data model and idempotency right, not the UI.",
        "Chosen as the second portfolio project specifically to show a different stack flavor than the first (Flyway instead of auto-DDL, MapStruct instead of manual mapping) and a different kind of engineering problem: business rules over CRUD.",
      ],
    },
  },
  {
    slug: "pulsehub",
    name: "PulseHub",
    emoji: "💬",
    tagline: "Real-time chat built on WebSockets and STOMP.",
    description:
      "A real-time communication platform with private and group messaging, typing indicators, presence, read receipts, voice messages, and Web Push notifications — built to prove hands-on WebSocket/STOMP experience, not just REST.",
    techStack: ["Java 21", "Spring Boot 3", "WebSocket/STOMP", "PostgreSQL", "React", "TypeScript", "Zustand"],
    githubUrl: "https://github.com/duanjesus/pulsehub",
    screenshots: [
      { src: phDashboard, alt: "PulseHub dashboard" },
      { src: phChatDirect, alt: "Direct message conversation" },
      { src: phChatGroup, alt: "Group conversation" },
      { src: phProfile, alt: "User profile page" },
    ],
    caseStudy: {
      problem:
        "Most portfolio projects stop at REST CRUD. Recruiters asking \"do you know WebSockets?\" need a concrete answer, not a theoretical one — which meant building something where real-time state (presence, typing, delivery) is the actual product, not a bolt-on feature.",
      solution:
        "PulseHub authenticates STOMP connections with the same JWT used over REST, then pushes private messages, typing indicators, and read receipts to per-user queues while presence broadcasts to a public topic. Conversations support both 1:1 and named groups under one unified model, messages can be text or in-browser-recorded voice notes, and notifications reach the user even with the tab closed via real Web Push (VAPID), not just an in-app toast.",
      architecture:
        "Spring Boot 3 + Java 21 backend with STOMP over SockJS for everything real-time and JWT-secured REST for everything else, PostgreSQL with Flyway for persistence. Frontend is React + TypeScript + Vite, deliberately splitting state: TanStack Query for anything fetched-once-and-cached (contacts, history), Zustand for anything arriving continuously over the socket (presence, typing).",
      techStack: ["Java 21", "Spring Boot 3", "STOMP", "WebSocket", "SockJS", "PostgreSQL", "React", "TypeScript", "Zustand", "TanStack Query"],
      challenges: [
        {
          title: "One conversation model for 1:1 and group chat",
          description:
            "The original model treated conversations as a fixed pair of users. Adding group chat meant reworking that into a proper participant roster with OWNER/MEMBER roles and moving read state from a single read-timestamp column to a per-participant read-receipt table — a real schema migration against live data, not a greenfield rewrite.",
        },
        {
          title: "Voice messages and text messages sharing one send path",
          description:
            "Rather than duplicating persist-broadcast-notify logic for a new message type, both text and in-browser-recorded voice messages route through the same dispatch service — so presence, notifications, and delivery behave identically regardless of message type.",
        },
      ],
      lessonsLearned: [
        "Real-time systems fail in ways REST APIs don't — a security-provider initialization-order bug only surfaced when booting the full app in Docker, not in isolated unit tests. Green tests alone don't prove a real-time stack actually boots correctly.",
        "Chosen as the third portfolio project to round out the set: architecture and CRUD (Social Supply), business rules (CashPilot), real-time communication (PulseHub) — three different competencies, three concrete answers to three different interview questions.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
