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
  /** The image already draws its own window chrome (terminal captures). */
  bare?: boolean;
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

import tzCompleted from "../assets/screenshots/tenaz/viewer-completed.png";
import tzCancelled from "../assets/screenshots/tenaz/viewer-cancelled.png";

import cdbRecovery from "../assets/screenshots/capivaradb/recovery.svg";
import cdbIsolation from "../assets/screenshots/capivaradb/isolation.svg";
import cdbCrashTests from "../assets/screenshots/capivaradb/crash-tests.svg";
import cdbExplain from "../assets/screenshots/capivaradb/explain.svg";

import almoxDashboard from "../assets/screenshots/classcont-almox/painel-dashboard.png";
import almoxKardex from "../assets/screenshots/classcont-almox/kardex.png";
import almoxMateriais from "../assets/screenshots/classcont-almox/materiais.png";
import almoxConsumo from "../assets/screenshots/classcont-almox/consumo-setor.png";
import almoxNova from "../assets/screenshots/classcont-almox/nova-requisicao.png";

import rhEspelho from "../assets/screenshots/classcont-rhfolha/espelho.png";
import rhInicio from "../assets/screenshots/classcont-rhfolha/inicio.png";
import rhJustificativas from "../assets/screenshots/classcont-rhfolha/justificativas.png";
import rhPainel from "../assets/screenshots/classcont-rhfolha/painel-dashboard.png";
import rhFolhaAuxilio from "../assets/screenshots/classcont-rhfolha/folha-auxilio.png";

export const projects: Project[] = [
  {
    slug: "tenaz",
    name: "Tenaz",
    techStack: ["Java 21", "Virtual Threads", "PostgreSQL", "Spring Boot 3", "Testcontainers"],
    caseStudyTechStack: [
      "Java 21",
      "Virtual Threads",
      "PostgreSQL",
      "JDBC",
      "Spring Boot 3.3",
      "JUnit 5",
      "Testcontainers",
      "Maven",
    ],
    githubUrl: "https://github.com/duanjesus/tenaz",
    screenshots: [
      { src: tzCompleted, alt: "Tenaz history viewer showing a completed order: charged, approved by signal, shipped" },
      { src: tzCancelled, alt: "Tenaz history viewer showing a cancelled order: charged, cancelled, refunded" },
    ],
    content: {
      en: {
        tagline: "A durable execution engine for Java 21: workflows as plain code that survive crashes.",
        description:
          "A workflow engine in the style of Temporal, written from scratch. A business process is ordinary Java, and the engine guarantees it runs to completion even if every machine running it dies along the way. Verified by a deterministic simulator that runs 20,000 seeded fault scenarios in about two minutes, and by tests that kill real worker JVMs.",
        caseStudy: {
          problem:
            "A business process that spans several steps, such as charging a card, waiting days for an approval, and then shipping, is easy to write and hard to make reliable. If the process dies between the charge and the shipment, something has to know that the charge already happened, that the three-day timer is still running, and where to resume. Hand-rolled solutions scatter that knowledge across status columns, cron jobs, and retry tables.",
          solution:
            "Tenaz lets the process be written as ordinary Java and makes the code itself durable. Every workflow has an append-only history of events (step scheduled, step completed, timer fired, signal received), and nothing else is persisted: no stack, no variables. When an engine picks a workflow up, it runs the code from the top against that history, and every call the history already answers returns the recorded answer, so a charge that was journaled is never executed again. On top of that sit durable timers that hold no thread, signals, child workflows whose outcome reaches the parent atomically, cancellation that propagates to children, and a version marker for changing workflow code under executions in flight. A Spring Boot starter registers annotated workflow classes as beans, and a read-only history viewer shows every step, timer, and signal of each execution.",
          architecture:
            "Three Maven modules: a core engine with no dependency on Spring, a Spring Boot starter, and an example order service. The journal is pluggable, with an in-memory implementation and a PostgreSQL one where an append is a single atomic statement, workers claim work in batches with FOR UPDATE SKIP LOCKED, and LISTEN/NOTIFY wakes them up. One engine owns a workflow at a time under a lease, and every write carries the lease epoch, so a worker that lost its lease to a crash or a long pause is rejected by the journal instead of corrupting the history. The engine never touches the clock, threads, or randomness directly: it gets them from a runtime interface, which is virtual threads and the wall clock in production and a single-threaded, seeded event loop under test.",
          challenges: [
            {
              title: "Proving it survives failures instead of assuming it",
              description:
                "The engine runs inside a deterministic simulator: a three-node cluster in one thread, with simulated time and every source of randomness drawn from one seed, while nodes crash, freeze past their leases and wake up as zombies, run on skewed clocks, and see journal writes fail before and after committing. Every run must converge with each effect applied exactly once. 500 seeds run on every build, 20,000 pass in about two minutes, and a failing seed fails identically every time. The simulator is itself tested: with fencing removed from the journal, it finds the resulting double write.",
            },
            {
              title: "Killing real processes, not simulated ones",
              description:
                "A second layer of tests simulates nothing. One runs 300 money transfers on a three-node cluster while killing a random node 60 times and asserts that every debit and credit takes effect exactly once. Another starts the workers as separate JVMs on PostgreSQL and has the operating system destroy one every second or so, with no chance to clean up. The balances still match to the cent.",
            },
            {
              title: "Keeping long workflows fast",
              description:
                "Replaying the whole history before every step made a workflow slower with each step it took. Keeping the workflow's virtual thread parked with its stack intact between steps, and feeding it only the new events, took a 5,000-step workflow from under 2,000 steps per second to about 40,000 in memory. On PostgreSQL, collapsing an append into one statement and claiming and renewing leases in batches took throughput from about 100 to between 280 and 440 workflows per second, measured on one laptop.",
            },
          ],
          lessonsLearned: [
            "Determinism has to be designed in, not tested in. Once the engine got time, scheduling, and randomness only through one interface, simulating hours of faults in seconds became possible, and so did reproducing any failure from its seed.",
            "Stating the limits is part of the engineering. The README lists what the engine does not guarantee (a step in flight during a crash runs at least once, signals are not deduplicated, the benchmarks come from one laptop) next to what it does.",
          ],
        },
      },
      pt: {
        tagline: "Um motor de execução durável para Java 21: workflows em código comum que sobrevivem a quedas.",
        description:
          "Um motor de workflows no estilo do Temporal, escrito do zero. Um processo de negócio é Java comum, e o motor garante que ele roda até o fim mesmo que todas as máquinas que o executam morram no caminho. Verificado por um simulador determinístico que roda 20.000 cenários de falha em cerca de dois minutos, e por testes que matam JVMs de verdade.",
        caseStudy: {
          problem:
            "Um processo de negócio com várias etapas, como cobrar um cartão, esperar dias por uma aprovação e depois enviar o pedido, é fácil de escrever e difícil de tornar confiável. Se o processo morre entre a cobrança e o envio, alguma coisa precisa saber que a cobrança já aconteceu, que o timer de três dias continua correndo e de onde retomar. Soluções feitas à mão espalham esse conhecimento por colunas de status, cron jobs e tabelas de retry.",
          solution:
            "O Tenaz permite escrever o processo como Java comum e torna o próprio código durável. Cada workflow tem um histórico de eventos somente de acréscimo (etapa agendada, etapa concluída, timer disparado, sinal recebido), e nada mais é persistido: nem pilha, nem variáveis. Quando um motor assume um workflow, ele roda o código do início contra esse histórico, e toda chamada que o histórico já responde devolve a resposta gravada, então uma cobrança que foi registrada nunca é executada de novo. Em cima disso há timers duráveis que não ocupam thread, sinais, workflows filhos cujo resultado chega ao pai de forma atômica, cancelamento que se propaga para os filhos e um marcador de versão para mudar o código de um workflow com execuções em andamento. Um starter Spring Boot registra as classes anotadas como beans, e um visualizador de histórico somente leitura mostra cada etapa, timer e sinal de cada execução.",
          architecture:
            "Três módulos Maven: um núcleo sem dependência do Spring, um starter Spring Boot e um serviço de pedidos de exemplo. O journal é plugável, com uma implementação em memória e outra em PostgreSQL, em que um acréscimo é uma única instrução atômica, os workers pegam trabalho em lotes com FOR UPDATE SKIP LOCKED e são acordados por LISTEN/NOTIFY. Um motor por vez é dono de um workflow, sob um lease, e toda escrita carrega a época desse lease. Assim, um worker que perdeu o lease por uma queda ou uma pausa longa é rejeitado pelo journal em vez de corromper o histórico. O motor nunca acessa relógio, threads ou aleatoriedade diretamente: recebe tudo de uma interface de runtime, que em produção são virtual threads e o relógio real, e em teste é um event loop de uma thread só, guiado por uma semente.",
          challenges: [
            {
              title: "Provar que sobrevive a falhas em vez de supor",
              description:
                "O motor roda dentro de um simulador determinístico: um cluster de três nós em uma única thread, com tempo simulado e toda fonte de aleatoriedade saindo de uma semente, enquanto nós caem, congelam além do lease e acordam como zumbis, rodam com relógios adiantados ou atrasados, e veem escritas no journal falharem antes e depois do commit. Toda execução precisa convergir com cada efeito aplicado exatamente uma vez. 500 sementes rodam a cada build, 20.000 passam em cerca de dois minutos, e uma semente que falha, falha do mesmo jeito todas as vezes. O próprio simulador é testado: sem o fencing no journal, ele encontra a escrita duplicada que resulta disso.",
            },
            {
              title: "Matar processos de verdade, não simulados",
              description:
                "Uma segunda camada de testes não simula nada. Um deles executa 300 transferências de dinheiro em um cluster de três nós enquanto mata um nó aleatório 60 vezes, e verifica que cada débito e cada crédito acontece exatamente uma vez. Outro sobe os workers como JVMs separadas sobre PostgreSQL e faz o sistema operacional destruir uma delas a cada segundo, sem chance de limpeza. Os saldos continuam batendo até o centavo.",
            },
            {
              title: "Manter workflows longos rápidos",
              description:
                "Reexecutar o histórico inteiro antes de cada etapa deixava um workflow mais lento a cada etapa. Manter a virtual thread do workflow estacionada, com a pilha intacta entre as etapas, e entregar só os eventos novos, levou um workflow de 5.000 etapas de menos de 2.000 etapas por segundo para cerca de 40.000 em memória. No PostgreSQL, reduzir o acréscimo a uma única instrução e tomar e renovar leases em lotes levou a vazão de cerca de 100 para entre 280 e 440 workflows por segundo, medido em um notebook.",
            },
          ],
          lessonsLearned: [
            "Determinismo precisa ser projetado, não testado depois. Quando o motor passou a receber tempo, agendamento e aleatoriedade por uma única interface, simular horas de falhas em segundos se tornou possível, assim como reproduzir qualquer falha a partir da semente.",
            "Declarar os limites faz parte da engenharia. O README lista o que o motor não garante (uma etapa em andamento durante uma queda roda pelo menos uma vez, sinais não são deduplicados, os benchmarks vêm de um único notebook) ao lado do que ele garante.",
          ],
        },
      },
    },
  },
  {
    slug: "capivaradb",
    name: "CapivaraDB",
    techStack: ["Go", "PostgreSQL wire protocol", "B+tree", "WAL", "MVCC"],
    caseStudyTechStack: [
      "Go",
      "Standard library only",
      "PostgreSQL wire protocol v3",
      "B+tree storage",
      "Write-ahead log",
      "MVCC",
      "Cost-based planner",
      "sqllogictest",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/duanjesus/capivaradb",
    screenshots: [
      { src: cdbRecovery, alt: "A server killed mid-transaction, and what the next start recovers", bare: true },
      { src: cdbIsolation, alt: "Two psql sessions and a lost update that does not happen", bare: true },
      { src: cdbCrashTests, alt: "Crash tests on a simulated disk", bare: true },
      { src: cdbExplain, alt: "EXPLAIN in psql: the chosen plan and the plan the planner rejected", bare: true },
    ],
    content: {
      en: {
        tagline: "A relational SQL database written from scratch in Go, speaking the PostgreSQL wire protocol.",
        description:
          "Every layer of a database built by hand, with no dependencies outside the Go standard library: the network protocol, the SQL parser, an on-disk B+tree storage engine, write-ahead logging with crash recovery, MVCC transactions, and a cost-based query planner. psql, pgx, and JDBC connect to it as if it were Postgres.",
        caseStudy: {
          problem:
            "A database is the component most backend code trusts without looking inside. Reading about B+trees, write-ahead logs, and snapshot isolation explains what they are, but not why a commit is durable, why a reader never waits for a writer, or why one query plan is a thousand times faster than another. The goal was to find out by building every layer, with real clients on the other end to keep it honest.",
          solution:
            "CapivaraDB implements PostgreSQL's wire protocol, so unmodified psql, pgx (Go), and pgjdbc (Java) connect to it. Behind the protocol sit a hand-written SQL parser and binder (joins, grouping, correlated subqueries, DDL), a storage engine of 8 kB checksummed pages with a buffer pool and clustered B+trees, a write-ahead log with ARIES-style recovery so a committed transaction survives the server being killed, multi-version concurrency control with read committed and repeatable read, deadlock detection and vacuum, and a planner that picks indexes and join order by cost from ANALYZE statistics, with EXPLAIN ANALYZE in PostgreSQL's format. Six of the seven planned milestones are done. The remaining one is the executor, so joins are still nested loops and set operations are missing.",
          architecture:
            "Three layers that meet at small interfaces: the protocol layer knows nothing about SQL, the engine knows nothing about sockets, and the storage layer only sees keys and values as byte strings. That boundary is what let the engine be replaced milestone by milestone, from a naive in-memory executor to B+trees on disk to MVCC, while the client compatibility tests kept passing. The core uses only the Go standard library, and CI fails if a dependency is added.",
          challenges: [
            {
              title: "Crash recovery that is tested by crashing",
              description:
                "The database runs against a simulated disk that fails at a random moment, loses any subset of the writes that were not synced, and tears the rest. After recovery it must match a shadow database that never crashed, across about 800 crashes per run, some of them during recovery itself. A separate test kills a real writer process with SIGKILL a dozen times and checks that every acknowledged commit is still there, whole.",
            },
            {
              title: "Testing the tests",
              description:
                "A crash test that passes proves little unless it would fail when the code is wrong. A mutation script breaks 25 durability, isolation, and planner rules one at a time, and the suite must catch each one. That found three blind spots in the crash tests while they were being written.",
            },
            {
              title: "Compatibility measured, not claimed",
              description:
                "Results are checked against sqllogictest: 109,414 records at 99.07% passing, with CI failing on any regression. The rate went down from 99.99% when two harder scripts, with joins of up to fifteen tables, joined the run. The planner took one of them from 51.5% in 217 seconds to 100% in 1 second.",
            },
          ],
          lessonsLearned: [
            "The boundary between layers mattered more than any single algorithm. Because the protocol and the engine only meet at four small interfaces, each milestone could replace what was underneath without breaking a client test.",
            "A database that overstates what it guarantees is worse than useless, so the limitations are written down as carefully as the features: no true SERIALIZABLE, writes serialised by one lock, and nested-loop joins only until the last milestone lands.",
          ],
        },
      },
      pt: {
        tagline: "Um banco de dados SQL relacional escrito do zero em Go, que fala o protocolo do PostgreSQL.",
        description:
          "Todas as camadas de um banco de dados feitas à mão, sem dependências fora da biblioteca padrão do Go: o protocolo de rede, o parser SQL, um motor de armazenamento em B+tree no disco, write-ahead log com recuperação de falhas, transações MVCC e um planejador de consultas por custo. psql, pgx e JDBC se conectam a ele como se fosse um Postgres.",
        caseStudy: {
          problem:
            "O banco de dados é o componente em que a maior parte do código de backend confia sem olhar por dentro. Ler sobre B+trees, write-ahead log e snapshot isolation explica o que são, mas não por que um commit é durável, por que um leitor nunca espera um escritor, ou por que um plano de consulta é mil vezes mais rápido que outro. O objetivo foi descobrir construindo cada camada, com clientes reais do outro lado para manter tudo honesto.",
          solution:
            "O CapivaraDB implementa o protocolo de rede do PostgreSQL, então psql, pgx (Go) e pgjdbc (Java) se conectam a ele sem modificação. Atrás do protocolo há um parser e um binder SQL escritos à mão (joins, agrupamento, subconsultas correlacionadas, DDL), um motor de armazenamento com páginas de 8 kB com checksum, buffer pool e B+trees clusterizadas, um write-ahead log com recuperação no estilo ARIES, para que uma transação confirmada sobreviva à morte do servidor, controle de concorrência multiversão com read committed e repeatable read, detecção de deadlock e vacuum, e um planejador que escolhe índices e ordem de join por custo a partir das estatísticas do ANALYZE, com EXPLAIN ANALYZE no formato do PostgreSQL. Seis dos sete marcos planejados estão prontos. O que falta é o executor, então os joins ainda são nested loop e as operações de conjunto não existem.",
          architecture:
            "Três camadas que se encontram em interfaces pequenas: a camada de protocolo não sabe nada de SQL, o motor não sabe nada de sockets, e o armazenamento só enxerga chaves e valores como sequências de bytes. Essa fronteira é o que permitiu trocar o motor marco a marco, de um executor ingênuo em memória para B+trees em disco e depois MVCC, enquanto os testes de compatibilidade com clientes continuavam passando. O núcleo usa só a biblioteca padrão do Go, e o CI falha se uma dependência for adicionada.",
          challenges: [
            {
              title: "Recuperação de falhas testada com falhas",
              description:
                "O banco roda sobre um disco simulado que falha em um momento aleatório, perde qualquer subconjunto das escritas que não foram sincronizadas e corta o resto pela metade. Depois da recuperação, ele precisa ser igual a um banco sombra que nunca caiu, em cerca de 800 quedas por execução, algumas durante a própria recuperação. Um teste separado mata um processo escritor real com SIGKILL uma dúzia de vezes e confere que todo commit confirmado continua lá, inteiro.",
            },
            {
              title: "Testar os testes",
              description:
                "Um teste de queda que passa prova pouco se ele não falharia com o código errado. Um script de mutação quebra 25 regras de durabilidade, isolamento e planejamento, uma de cada vez, e a suíte precisa pegar todas. Isso encontrou três pontos cegos nos testes de queda enquanto eles eram escritos.",
            },
            {
              title: "Compatibilidade medida, não declarada",
              description:
                "Os resultados são conferidos com o sqllogictest: 109.414 registros com 99,07% de acerto, e o CI falha em qualquer regressão. A taxa caiu de 99,99% quando dois scripts mais difíceis, com joins de até quinze tabelas, entraram na execução. O planejador levou um deles de 51,5% em 217 segundos para 100% em 1 segundo.",
            },
          ],
          lessonsLearned: [
            "A fronteira entre as camadas importou mais do que qualquer algoritmo isolado. Como o protocolo e o motor só se encontram em quatro interfaces pequenas, cada marco pôde trocar o que estava embaixo sem quebrar um teste de cliente.",
            "Um banco que promete mais do que garante é pior do que inútil, então as limitações estão escritas com o mesmo cuidado que as funcionalidades: não há SERIALIZABLE de verdade, as escritas são serializadas por um único lock, e os joins são só nested loop até o último marco ficar pronto.",
          ],
        },
      },
    },
  },
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
            "Deliberately scoped to object-oriented design fundamentals with no framework in the way, the base that the CRUD, business-rule, real-time, and infrastructure projects in this portfolio build on.",
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
            "Propositalmente dimensionado para fundamentos de design orientado a objetos, sem framework no caminho: a base sobre a qual os projetos de CRUD, regras de negócio, tempo real e infraestrutura deste portfólio são construídos.",
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
            "The first full-stack project in this portfolio, deliberately scoped to demonstrate solid architecture and CRUD fundamentals before moving on to business-rule-heavy (CashPilot) and real-time (PulseHub) systems.",
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
            "O primeiro projeto full-stack deste portfólio, propositalmente dimensionado para demonstrar arquitetura sólida e fundamentos de CRUD antes de avançar para sistemas com regras de negócio complexas (CashPilot) e tempo real (PulseHub).",
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
            "Built right after Social Supply, specifically to show a different stack flavor (Flyway instead of auto-DDL, MapStruct instead of manual mapping) and a different kind of engineering problem: business rules over CRUD.",
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
            "Feito logo depois do Social Supply, especificamente para mostrar uma variação de stack diferente (Flyway em vez de auto-DDL, MapStruct em vez de mapeamento manual) e um tipo diferente de problema de engenharia: regras de negócio em vez de CRUD.",
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
            "Built to round out a first trio: architecture and CRUD (Social Supply), business rules (CashPilot), real-time communication (PulseHub). Three different competencies, three concrete answers to three different interview questions.",
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
            "Feito para completar um primeiro trio: arquitetura e CRUD (Social Supply), regras de negócio (CashPilot), comunicação em tempo real (PulseHub). Três competências diferentes, três respostas concretas para três perguntas diferentes de entrevista.",
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
            "Built specifically to demonstrate message-queue and observability competency (RabbitMQ, Redis, Prometheus, Grafana) that the web applications in this portfolio do not cover.",
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
            "Feito especificamente para demonstrar competência em filas de mensagens e observabilidade (RabbitMQ, Redis, Prometheus, Grafana) que as aplicações web deste portfólio não cobrem.",
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
            "The only mobile project in the portfolio, chosen to show cross-platform delivery (Flutter, Windows and Android from one codebase) and large-scale external-data integration on top of the backend and web competencies the other projects already cover.",
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
            "O único projeto mobile do portfólio, escolhido para mostrar entrega multiplataforma (Flutter, Windows e Android a partir de um único código) e integração de dados externos em larga escala, complementando as competências de backend e web que os outros projetos já cobrem.",
          ],
        },
      },
    },
  },
  {
    slug: "classcont-almox",
    name: "CLASSCONT.ALMOX",
    techStack: ["Python 3.13", "Django 5.2", "Django REST Framework", "PostgreSQL", "React", "TypeScript"],
    caseStudyTechStack: [
      "Python 3.13",
      "Django 5.2",
      "Django REST Framework",
      "PostgreSQL 16",
      "JWT",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "WeasyPrint",
      "pytest",
      "mypy",
      "Docker",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/duanjesus/CLASSCONT.ALMOX",
    screenshots: [
      { src: almoxDashboard, alt: "Warehouse back office: stock value, fulfilment queue and reorder alerts" },
      { src: almoxKardex, alt: "Stock ledger of one material with physical, reserved and available balances" },
      { src: almoxMateriais, alt: "Materials list with physical, reserved and available stock and average cost" },
      { src: almoxConsumo, alt: "Department consumption against its monthly quota in the React app" },
      { src: almoxNova, alt: "New material request in the React app" },
    ],
    content: {
      en: {
        tagline: "Supply room management for a public agency, in Django and React.",
        description:
          "Material requests with manager approval, a monthly quota per department, stock reservation, and full or partial fulfilment, on top of weighted-average costing and an immutable stock ledger. A Django REST API, a React app for staff and managers, and a back office in Django templates for the supply room.",
        caseStudy: {
          problem:
            "The supply room of a public agency has to answer three questions at any time: what is in stock and what it is worth, who asked for what and who approved it, and whether a department is spending beyond its monthly quota. Spreadsheets answer none of them reliably once two people fulfil requests at the same moment, or someone back-dates an invoice into a month that was already closed.",
          solution:
            "Departments request materials in a React app, their manager approves within a monthly quota, and the supply room fulfils from a back office built with Django templates. A request is a state machine whose transition table is the rule: what is not in the table is forbidden. Nobody evaluates their own request, a manager can reduce quantities but never raise them, and an approval that exceeds the quota goes to a higher approver without reserving anything. Stock is valued by weighted-average cost, every movement lands in an immutable ledger that is the source of truth, approved requests reserve stock, fulfilment can be partial, and a closed month accepts no further entries, back-dated ones included. An ABC curve and a reorder report are built on the ledger, and the delivery slip is generated as a PDF.",
          architecture:
            "The business rules live in a pure Python package that does not import Django (average cost, the request state machine, reservation, quota, ABC curve, monthly closing) and are tested without a database. Services wrap them with transactions and row locks, and the DRF API and the Django-templates back office are thin layers over the same services. Permission checks are pure functions shared by the API, the back office, and the services, and the API tells the React app which actions the current user may take, so the front end only draws what the back end will accept. PostgreSQL holds the last line with check and unique constraints.",
          challenges: [
            {
              title: "No negative stock under concurrent fulfilment",
              description:
                "Two clerks fulfilling at the same time must never drive a balance below zero. Materials are locked with SELECT FOR UPDATE inside a transaction, always in id order to avoid deadlocks, the pure rule refuses an insufficient balance, and a CHECK constraint in the database is the final guard.",
            },
            {
              title: "A ledger that cannot be edited",
              description:
                "Stock movements are immutable: saving over an existing row or deleting one raises an error, and a mistake is fixed with an adjustment entry. The balance stored on each material is a cache updated in the same transaction as the ledger, and a management command audits one against the other. Money is Decimal throughout, with four decimal places on the unit cost so rounding error does not accumulate with each receipt.",
            },
          ],
          lessonsLearned: [
            "Keeping the rules in plain Python made them cheap to test and independent of the framework: the unit tests for costing, the state machine, reservation, and quota run without a database, and the functional tests cover the services, the API, and every screen of the back office.",
            "Built after CLASSCONT.RHFOLHA, the same kind of administrative system in Symfony. The second time, the layering was the same (pure domain, services, thin API and back office) and only the framework changed, which is good evidence that the design does not depend on the framework.",
          ],
        },
      },
      pt: {
        tagline: "Almoxarifado de um órgão público, em Django e React.",
        description:
          "Requisições de material com aprovação da chefia, cota mensal por setor, reserva de saldo e atendimento total ou parcial, sobre custo médio ponderado e um kardex imutável. Uma API REST em Django, um app React para servidores e chefias, e um painel em templates Django para o almoxarifado.",
        caseStudy: {
          problem:
            "O almoxarifado de um órgão público precisa responder três perguntas a qualquer momento: o que há em estoque e quanto vale, quem pediu o quê e quem aprovou, e se um setor está gastando além da sua cota mensal. Planilhas não respondem nenhuma delas de forma confiável quando duas pessoas atendem requisições ao mesmo tempo, ou quando alguém lança uma nota com data retroativa em um mês que já foi fechado.",
          solution:
            "Os setores pedem material em um app React, a chefia aprova dentro de uma cota mensal, e o almoxarifado atende por um painel feito com templates Django. A requisição é uma máquina de estados cuja tabela de transições é a regra: o que não está na tabela é proibido. Ninguém avalia a própria requisição, a chefia pode reduzir quantidades mas nunca aumentar, e uma aprovação que estoura a cota sobe para o gestor sem reservar nada. O estoque é valorado pelo custo médio ponderado, todo movimento vai para um kardex imutável que é a fonte da verdade, requisições aprovadas reservam saldo, o atendimento pode ser parcial, e um mês fechado não aceita mais lançamentos, nem com data retroativa. A curva ABC e o relatório de reposição são calculados sobre o kardex, e a guia de saída é gerada em PDF.",
          architecture:
            "As regras de negócio ficam em um pacote de Python puro, que não importa o Django (custo médio, a máquina de estados da requisição, reserva, cota, curva ABC, fechamento mensal), e são testadas sem banco. Os serviços cuidam de transação e travas de linha, e a API em DRF e o painel em templates Django são camadas finas sobre os mesmos serviços. As regras de permissão são funções puras usadas pela API, pelo painel e pelos serviços, e a API informa ao app React quais ações o usuário atual pode executar, então o front só desenha o que o back vai aceitar. O PostgreSQL segura a última linha com constraints de check e de unicidade.",
          challenges: [
            {
              title: "Estoque nunca negativo com atendimentos simultâneos",
              description:
                "Dois almoxarifes atendendo ao mesmo tempo não podem levar um saldo abaixo de zero. Os materiais são travados com SELECT FOR UPDATE dentro de uma transação, sempre em ordem de id para evitar deadlock, a regra pura recusa saldo insuficiente, e uma constraint CHECK no banco é a última barreira.",
            },
            {
              title: "Um kardex que não pode ser editado",
              description:
                "As movimentações de estoque são imutáveis: salvar por cima de uma linha existente ou excluí-la levanta erro, e um engano se corrige com um lançamento de ajuste. O saldo gravado em cada material é um cache atualizado na mesma transação que o kardex, e um comando de gerenciamento audita um contra o outro. Dinheiro é sempre Decimal, com quatro casas no custo unitário para o erro de arredondamento não se acumular a cada entrada.",
            },
          ],
          lessonsLearned: [
            "Manter as regras em Python puro deixou os testes baratos e independentes do framework: os testes unitários de custo, máquina de estados, reserva e cota rodam sem banco, e os funcionais cobrem os serviços, a API e todas as telas do painel.",
            "Feito depois do CLASSCONT.RHFOLHA, o mesmo tipo de sistema administrativo em Symfony. Na segunda vez, as camadas foram as mesmas (domínio puro, serviços, API e painel finos) e só o framework mudou, o que é uma boa evidência de que o desenho não depende do framework.",
          ],
        },
      },
    },
  },
  {
    slug: "classcont-rhfolha",
    name: "CLASSCONT.RHFOLHA",
    techStack: ["PHP 8.4", "Symfony 7.4", "Doctrine", "PostgreSQL", "Twig", "React", "TypeScript"],
    caseStudyTechStack: [
      "PHP 8.4",
      "Symfony 7.4",
      "Doctrine",
      "PostgreSQL 16",
      "JWT",
      "Twig",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Dompdf",
      "PHPUnit",
      "PHPStan",
      "Docker",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/duanjesus/CLASSCONT.RHFOLHA",
    screenshots: [
      { src: rhEspelho, alt: "Monthly timesheet with punches, hours balance and excused days in the React app" },
      { src: rhInicio, alt: "Clock-in screen with the day's punches and the month summary" },
      { src: rhJustificativas, alt: "Absence justifications with pending, approved and refused requests" },
      { src: rhPainel, alt: "HR back office: pending justifications and the month still open" },
      { src: rhFolhaAuxilio, alt: "Commuter benefit payroll: gross amount, proportional discount and net per employee" },
    ],
    content: {
      en: {
        tagline: "Timesheets and commuter-benefit payroll for public staff, in Symfony and React.",
        description:
          "Electronic timesheets, an hours bank, absence justifications approved by the direct manager, and a commuter benefit calculated from the days actually worked. A Symfony REST API, a React app for staff and managers, and a Twig back office for HR.",
        caseStudy: {
          problem:
            "Timekeeping looks like a table of clock-ins until the rules arrive: an odd number of punches, a tolerance of a few minutes, holidays, days before the hire date, an absence that was later excused. A benefit paid per day worked depends on all of them, and a month that payroll has already closed must not change afterwards.",
          solution:
            "Staff clock in and out in a React app and see their monthly timesheet and hours balance. Punches are paired in order, a day with an odd number of punches is marked incomplete, a ten-minute daily tolerance is applied, and a working day with no punches and no excuse counts as an absence. An employee can ask for a day to be excused, and the direct manager of their department or HR decides. Nobody evaluates their own request, a refusal needs a reason, and the result goes out by email. The commuter benefit is then computed from the timesheet: the daily fare times the days actually worked, minus a discount of 6% of base salary proportional to those days, never below zero. HR closes the month in a Twig back office, and from then on that month's justifications are locked.",
          architecture:
            "Pure domain classes with no framework dependency hold the calculations: the timesheet calculator, the benefit calculator, and a value object for the month. Services apply them, thin API controllers validate input through mapped DTOs, and the HR back office uses Symfony Forms and Twig. Two firewalls separate a stateless JWT API from the session-based back office, and Voters decide who can see or evaluate what. The same Twig partial renders the timesheet on screen and in the PDF.",
          challenges: [
            {
              title: "Money without floats",
              description:
                "Benefit amounts are computed in integer cents, never in floating point, and the DECIMAL column travels as a string, so a proportional discount rounds the same way every time.",
            },
            {
              title: "Roles that cannot drift from the org chart",
              description:
                "Being a manager is not stored anywhere: it is derived from being the head of some department, so changing the head in the registry changes the permissions at once. Deactivating an employee also cuts access immediately, even with a JWT already issued, because the check runs on every authentication. Employees are never deleted, since timesheet history is an official record.",
            },
          ],
          lessonsLearned: [
            "Putting the calculations in plain classes meant the hard cases (tolerance, absences, excused days, holidays, the proportional discount) are covered by unit tests that need neither a database nor HTTP.",
            "Built to work in a stack outside Java, with an administrative domain that has real rules instead of another CRUD, and to check that the layering used in the Java projects carries over to a different language and framework.",
          ],
        },
      },
      pt: {
        tagline: "Ponto eletrônico e auxílio-transporte para servidores públicos, em Symfony e React.",
        description:
          "Folha de ponto eletrônica, banco de horas, justificativas de falta aprovadas pela chefia imediata e auxílio-transporte calculado a partir dos dias efetivamente trabalhados. Uma API REST em Symfony, um app React para servidores e chefias, e um painel em Twig para o RH.",
        caseStudy: {
          problem:
            "Controle de ponto parece uma tabela de batidas até as regras chegarem: número ímpar de batidas, tolerância de alguns minutos, feriados, dias anteriores à admissão, uma falta que foi abonada depois. Um benefício pago por dia trabalhado depende de todas elas, e um mês que a folha já fechou não pode mudar depois.",
          solution:
            "Os servidores batem o ponto em um app React e veem o espelho mensal e o banco de horas. As batidas são pareadas em ordem, um dia com número ímpar de batidas fica incompleto, há uma tolerância de dez minutos por dia, e um dia útil sem batida e sem abono conta como falta. O servidor pode pedir o abono de um dia, e a chefia imediata do setor dele ou o RH decide. Ninguém avalia o próprio pedido, a recusa exige motivo, e o resultado vai por e-mail. O auxílio-transporte é então calculado a partir do ponto: o valor diário das conduções vezes os dias efetivamente trabalhados, menos um desconto de 6% do salário-base proporcional a esses dias, nunca abaixo de zero. O RH fecha o mês em um painel em Twig, e a partir daí as justificativas daquele mês ficam bloqueadas.",
          architecture:
            "Classes de domínio puras, sem dependência de framework, guardam os cálculos: a calculadora do espelho, a calculadora do auxílio e um value object para a competência. Os serviços aplicam essas regras, controllers finos na API validam a entrada com DTOs mapeados, e o painel do RH usa Symfony Forms e Twig. Dois firewalls separam uma API JWT sem estado do painel com sessão, e os Voters decidem quem pode ver ou avaliar o quê. O mesmo partial Twig renderiza o espelho na tela e no PDF.",
          challenges: [
            {
              title: "Dinheiro sem float",
              description:
                "Os valores do auxílio são calculados em centavos inteiros, nunca em ponto flutuante, e a coluna DECIMAL trafega como string, então um desconto proporcional arredonda sempre do mesmo jeito.",
            },
            {
              title: "Papéis que não saem de sincronia com o organograma",
              description:
                "Ser chefia não fica gravado em lugar nenhum: é derivado de ser chefe de algum setor, então trocar o chefe no cadastro muda as permissões na hora. Desativar um funcionário também corta o acesso imediatamente, mesmo com um JWT já emitido, porque a checagem roda em toda autenticação. Funcionários nunca são excluídos, porque o histórico de ponto é documento funcional.",
            },
          ],
          lessonsLearned: [
            "Colocar os cálculos em classes simples fez com que os casos difíceis (tolerância, faltas, abonos, feriados, o desconto proporcional) sejam cobertos por testes unitários que não precisam de banco nem de HTTP.",
            "Feito para trabalhar em uma stack fora do Java, com um domínio administrativo que tem regras de verdade em vez de mais um CRUD, e para conferir que as camadas usadas nos projetos Java se mantêm em outra linguagem e outro framework.",
          ],
        },
      },
    },
  },
];

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
