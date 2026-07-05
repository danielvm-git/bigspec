---
okf_kind: reference
okf_version: "1.0"
generated_by: "human"
generated_at: "2026-07-04T00:00:00Z"
---
# Books Mentioned in bigpowers/bigspec — Core Concepts & Principle Mapping

> Generated: 2026-07-05
> Task: t_a5b27907 — Read all the books mentioned

---

## Part 1: Books Explicitly Referenced in bigpowers/bigspec

### 1. Clean Code — Robert C. Martin (Uncle Bob), 2008

**Status in bigpowers:** Foundational. Referenced in README, PRINCIPLES.md, CONVENTIONS.md, enforce-first, audit-code (HEURISTICS.md catalogs Chapter 17), develop-tdd, reborn-constitution B1.

**Core concepts:**
- **SRP** (Single Responsibility Principle): Each function/module does one thing.
- **Boy Scout Rule**: Leave the code cleaner than you found it.
- **F.I.R.S.T Testing**: Fast, Independent, Repeatable, Self-Validating, Timely.
- **Intention-Revealing Names**: Names reveal why code exists and what it does.
- **Chapter 17 Heuristics**: Catalog of 63 code smells (Comments C1-C5, Environment E1-E2, Functions F1-F4, General G1-G34, Naming N1-N7, Tests T1-T9).

**Mapping to bigspec principles:**
| bigspec Block | How Clean Code maps |
|---|---|
| **B1** (Agent-Grade Craftsmanship) | Functions 4–20 lines, files < 300 lines, SRP — these are Uncle Bob's rules re-ranked for agents |
| **B5** (Risk-Tiered Verification) | F.I.R.S.T rubric enforced at P0–P1 tiers; tests assert behavior through public APIs |
| **B6** (Gates & Hard-Stops) | "Red flag" rationalizations ("too simple to test," "I'll refactor later") are named and blocked |
| Part III conventions | SRP, early returns, max 2 levels of indentation, comments explain WHY not WHAT |

---

### 2. A Philosophy of Software Design — John Ousterhout, 2018

**Status in bigpowers:** Core. Referenced in README, PRINCIPLES.md, deepen-architecture (LANGUAGE.md, INTERFACE-DESIGN.md), design-interface, develop-tdd (deep-modules.md), reborn-constitution B1.

**Core concepts:**
- **Deep Modules**: Small interface + lots of implementation = high leverage. Shallow modules (large interface, thin implementation) are the anti-pattern.
- **Information Hiding**: Reducing cognitive surface area that a caller must understand.
- **Define Errors Out of Existence**: Design APIs so invalid states cannot be triggered.
- **Design It Twice**: First idea is unlikely to be the best; generate multiple radically different designs, then compare.

**Tension with Uncle Bob resolved**: Small functions alone create shallow modules with bloated interfaces. Deep modules are cohesive *sets* of small, SRP functions united behind a simple interface. Small functions are the unit of implementation; the module interface is the unit of abstraction.

**Mapping to bigspec principles:**
| bigspec Block | How Ousterhout maps |
|---|---|
| **B1** (Agent-Grade Craftsmanship) | Deep modules (simple interface, hidden complexity) — the module is the abstraction unit |
| **B3** (Skill Primitive) | Skills are deep modules: one verb-noun procedure (small interface) hiding complex multi-step workflows |
| **B7** (Context Isolation) | Information hiding reduces token surface area — an agent only loads what it needs |
| design-interface skill | "Design It Twice" — spawn 3+ parallel sub-agents with different constraints |

---

### 3. Clean Code for AI Agents (Clean Code para Agentes de IA) — Fabio Akita, 2026

**Status in bigpowers:** The "definitive update" to Uncle Bob. Referenced in README, PRINCIPLES.md, reborn-constitution B1, akita.feature.

**Core concepts:**
- **Grep-ability**: Public symbols must be unique enough that `grep` returns < 5 results. The agent's primary navigation tool is text search.
- **Structured Observability**: Mandatory JSON logging and idempotent setup. If an agent can't observe it, it can't fix it.
- **Token Economy**: Eliminate filler and redundant output to preserve the context window.
- **Remediation Hints**: Error messages that explicitly tell the agent *how* to recover — include the offending value, expected shape, and fix.

**Core thesis**: Uncle Bob's rules were written for *humans* skimming code. An LLM agent navigates code differently — by grepping, parsing structured logs, and reading errors. Code hygiene must be re-ranked for the agentic reader.

**Mapping to bigspec principles:**
| bigspec Block | How Akita maps |
|---|---|
| **B0** (Token/Context Substrate) | Token economy — progressive disclosure, no filler, one-line `verify:` commands |
| **B1** (Agent-Grade Craftsmanship) | Grep-ability (< 5 results), remediation hints in errors, deep modules over chatty ones |
| **B8** (Self-Describing Artifacts) | Structured observability — OKF bundles with machine-parseable frontmatter and provenance |

---

### 4. Grid Systems in Graphic Design — Josef Müller-Brockmann, 1981

**Status in bigpowers:** Referenced in align-grid skill only.

**Core concepts:**
- **Modular Grid**: Type area divided into modules (columns + rows) separated by gutters, inside defined margins. Common field counts: 8 / 20 / 32.
- **Baseline Grid**: Vertical rhythm — leading = whole multiple of baseline unit, every element snaps to it.
- **Objective Order**: Restraint is the point; the system organizes the page, not ego.
- **Typography Discipline**: Grotesque sans (Akzidenz-Grotesk / Helvetica), flush-left ragged-right, large jumps in scale.

**Mapping to bigspec principles:**
| bigspec Block | How Müller-Brockmann maps |
|---|---|
| **B4** (Spec-as-Contract) | The grid IS the spec — a verifiable contract the page must satisfy. Every element placed by column line, verified at 0px tolerance. |
| **B8** (Self-Describing Artifacts) | One CSS-variable source of truth; overlay verifies the grid is real, not decorative |
| **Capstone** (Outcome Evals) | `verify_grid.js` — Puppeteer harness proving 0px adherence at multiple widths |

---

### 5. Working Effectively with Legacy Code — Michael Feathers, 2004

**Status in bigpowers:** Partially present. The "seam" concept in deepen-architecture/LANGUAGE.md explicitly cites Feathers, but no full reference doc exists. Identified as a missing reference in MISSING-REFERENCES-AND-DELIVERY-PLAN.md.

**Core concepts:**
- **Seam**: A place where behavior can be altered without editing in that place. The *location* at which a module's interface lives.
- **Legacy Code = Code Without Tests**: The defining characteristic of legacy code is the absence of tests.
- **Characterization Tests**: Tests that document existing behavior before refactoring — capture what the code DOES (not what it SHOULD do), then refactor safely.
- **Dependency-Breaking Techniques**: Catalog of techniques for getting untested code under test.

**Mapping to bigspec principles:**
| bigspec Block | How Feathers maps |
|---|---|
| **B1** (Agent-Grade Craftsmanship) | The "seam" vocabulary — deepen-architecture uses it for module boundaries |
| **B5** (Risk-Tiered Verification) | Characterization tests are the bridge from untested (legacy) to tested (safe to refactor) |
| investigate-bug / diagnose-root | Feathers' techniques inform how to get untested buggy code under test before fixing |

---

### 6. Refactoring: Improving the Design of Existing Code — Martin Fowler, 1999 (2nd ed 2018)

**Status in bigpowers:** Mentioned once in plan-refactor/SKILL.md ("Remember Martin Fowler's advice: make each refactoring step as small as possible"). Identified as missing reference (no docs/references/fowler.md yet).

**Core concepts:**
- **Code Smell Catalog**: Diagnostic vocabulary — Long Method, God Class, Feature Envy, Duplicated Code, etc.
- **Named Refactorings**: Extract Method, Inline Class, Replace Conditional with Polymorphism, etc.
- **Smells → Refactorings Mapping**: Each smell has canonical fix(es). The missing link between "audit found problems" and "plan the fix."
- **Tiny Steps**: Each refactoring step should be so small you can always see the program working.

**Mapping to bigspec principles:**
| bigspec Block | How Fowler maps |
|---|---|
| **B1** (Agent-Grade Craftsmanship) | Code smells → refactorings mapping gives audit-code and plan-refactor a shared diagnostic language |
| **B6** (Gates & Hard-Stops) | audit-code HEURISTICS.md is essentially Fowler's smell catalog adapted for bigpowers |
| plan-refactor skill | "Tiny commits" — directly cites Fowler's advice on step size |
| B4 (Spec-as-Contract) | Spec survives refactoring; Fowler's catalog ensures refactoring preserves behavior |

---

## Part 2: Books/Works Identified as Missing but Methodologically Critical

These are referenced in specs/MISSING-REFERENCES-AND-DELIVERY-PLAN.md as foundational works that shaped bigpowers' ideas but lack formal reference docs.

### 7. Extreme Programming Explained + Tidy First? — Kent Beck, 1999 / 2024

**Core concepts:**
- **TDD (Test-Driven Development)**: RED-GREEN-REFACTOR — the cycle bigpowers' develop-tdd implements.
- **Vertical Slices**: Work in thin, shippable increments.
- **Tidy First?**: Distinction between tidying (structural, no behavior change, safe to abort), refactoring (structural, larger scope), and behavior change (functional). Order: tidy → behavior change → refactor.
- **"Make it work, make it right, make it fast"**: The three-pass ordering principle.

**Mapping to bigspec:**
- develop-tdd directly implements Beck's RED-GREEN-REFACTOR
- The "tidying" distinction maps to commit-message types (refactor vs feat)
- plan-refactor's tiny commits map to Beck's safe-step philosophy

### 8. The Pragmatic Programmer — Andy Hunt & Dave Thomas, 1999 (20th ed 2019)

**Core concepts:**
- **DRY** (Don't Repeat Yourself): Every piece of knowledge has a single, unambiguous representation.
- **Broken Windows**: Fix the first broken window — source of the Boy Scout Rule in CONVENTIONS.md.
- **Tracer Bullets**: Prototype to validate architecture before full implementation (maps to spike-prototype).
- **Orthogonality**: Independence of concerns.
- **Programming by Coincidence**: Code that works for unknown reasons — a root cause category diagnose-root should name.

**Mapping to bigspec:**
- CONVENTIONS.md already uses "broken window" and "DRY" without crediting source
- "Tracer bullets" → spike-prototype skill
- DRY → G5 in audit-code HEURISTICS.md

### 9. Practical Object-Oriented Design (POODR) — Sandi Metz, 2nd ed 2018

**Core concepts:**
- **SOLID in Practice**: Accessible treatment of SOLID for solo developers.
- **Message-Level Testing**: Unit tests for messages sent between objects, not internal state.
- **SRP at Class Level**: Complements Ousterhout's deep modules.

**Mapping to bigspec:**
- SOLID in CONVENTIONS.md §Code Style
- Message-level testing → F.I.R.S.T rubric (tests through public interfaces)

### 10. Domain-Driven Design — Eric Evans, 2003

**Core concepts:**
- **Ubiquitous Language**: Shared vocabulary between developers and domain experts.
- **Bounded Contexts**: Where one model ends and another begins.
- **Context Mapping**: Relationships between bounded contexts.
- **Aggregates, Repositories, Domain Events**: Tactical DDD patterns.

**Mapping to bigspec:**
- define-language → ubiquitous language glossary
- model-domain → domain model interview
- deepen-architecture deliberately uses "seam" (Feathers) instead of "bounded context" (Evans) to avoid overloading

### 11. Accelerate — Nicole Forsgren, Jez Humble, Gene Kim, 2018

**Core concepts:**
- **DORA Four Keys**: Deployment Frequency, Lead Time for Changes, Time to Restore Service, Change Failure Rate.
- Evidence-based metrics correlating with high-performing teams.

**Mapping to bigspec:**
- BCP/hr velocity tracking maps to Lead Time
- Epic 5 (DORA Metrics Extension) planned to add all four keys

### 12. Staff Engineer — Will Larson, 2019

**Core concepts:**
- **Leverage Modes**: Solver, Tech Lead, Architect, Right Hand.
- **Scope of Impact**: Progression from task-level → project-level → organization-level.

**Mapping to bigspec:**
- 6-phase lifecycle implicitly moves through these scopes (story → epic → release)
- orchestrate-project decides scope of impact

---

## Part 3: Non-Book Methodologies and Their bigspec Mappings

| Source | Contribution | bigspec Block |
|---|---|---|
| **Karpathy** (2023-24) | Think-first: surface assumptions, present multiple readings, ship minimum viable, loop until verified | **B2** (Think-First Behavior) |
| **Pocock** (2023-24) | Agent Skills format: verb-noun procedures, zoom-out before editing | **B3** (Skill Primitive) |
| **Superpowers** (2023-24) | Hard gates, red-flag detection, two-stage review | **B6** (Gates & Hard-Stops) |
| **Wasowski** (2024) | SDD + BDD: spec as human-agent interface, Gherkin acceptance criteria | **B4** (Spec-as-Contract) |
| **BCP / BCP-Plus** (CI&T/Itaú, 2024) | Business Complexity Points: 13-dimension element counting, calibration_id provenance | **B9** (Effort Accounting) |
| **BMAD** | Document lifecycle, TEA P0–P3 risk tiers, NFR gates | **B5** (Risk-Tiered Verification), **B10** (Synthesis) |
| **GSD** | Context-rot thesis, fresh-context subagents, effort budgeting | **B7** (Context Isolation) |
| **OKF** | Open Knowledge Format: universal envelope, kind-aware validation | **B8** (Self-Describing Artifacts) |
| **Context Engineering** (LangChain/Karpathy, 2025-26) | Write/Select/Compress/Isolate: four strategies for agent context management | **B0** (Token/Context Substrate) |
| **Rich Hickey** — "Simple Made Easy" (2011) | Simple (one fold, unmixed) vs Easy (familiar). "Complecting" = mixing concerns. | B2/B6 — grilling question for grill-me |
| **anthropic/skills** | With-skill vs without-skill eval delta (pass@k + token cost) | **Capstone** (Outcome Evals) |
| **Spec-Kit** | Constitution + clarify/ambiguity critic + executable intent | **B4** (Spec-as-Contract) |
| **STRIDE** | Security threat modeling framework | **B5** (Risk-Tiered Verification, security gates) |

---

## Part 4: The Layer Cake — Chronological Evolution

The bigpowers README describes the philosophical stack as a "chronological layer cake." Each wave builds on and resolves tensions from the previous:

```
2008: Uncle Bob (Clean Code)          ── SRP, Boy Scout Rule, F.I.R.S.T
         │  tension: small functions → shallow modules
         ▼
2018: Ousterhout (Deep Modules)       ── Deep modules, information hiding
         │  tension: humans read code; agents need different hygiene
         ▼
2023-24: Karpathy + Superpowers + Pocock ── Think-first, verb-noun skills, zoom-out
         │  tension: agents drift without verifiable intent
         ▼
2024: Wasowski (SDD) + BCP           ── Spec as human-agent interface; effort accounting
         │  tension: Uncle Bob's rules optimized for human skimmers
         ▼
2026: Akita (Clean Code for AI Agents) ── Grep-ability, token economy, remediation
         │
         ▼
Synthesis: BMAD + GSD (bigpowers)    ── 5 fractal movements, hard gates, OKF, BCP
```

---

---

## Part 5: Additional Books Found in bigpowers/bigspec (Post-Audit Supplement)

> Added 2026-07-05 from big-library cross-reference. These 8 books are explicitly cited in bigspec's metrics documentation (`specs/hermes-metrics-calculations.md`, `docs/bigspec_metrics_algorithms.md`, `specs/hermes-metrics-report.md`) and bigpowers' architecture review (`specs/DEEPEN-ARCHITECTURE-REVIEW.md`) but were not catalogued in the initial pass.

### 13. Lean Software Development: An Agile Toolkit — Mary & Tom Poppendieck, 2003

**Status in bigpowers/bigspec:** Foundational. Cited in bigspec metrics docs, DEEPEN-ARCHITECTURE-REVIEW.md (as book 1 of 3 in the Poppendieck trilogy).

**Core concepts:**
- **7 Lean Principles for Software**: Eliminate Waste, Build Quality In, Create Knowledge, Defer Commitment, Deliver Fast, Respect People, Optimize the Whole — the original translation of Toyota Production System principles into software development.
- **22 Thinking Tools**: Practical toolkits for applying each principle (Value Stream Mapping, Last Responsible Moment, Set-Based Development, etc.).
- **Waste Translation**: Maps the 7 manufacturing wastes (Inventory, Overproduction, Extra Processing, Transportation, Waiting, Motion, Defects) to software equivalents (Partially Done Work, Extra Features, Relearning, Handoffs, Delays, Task Switching, Defects).

**Mapping to bigspec principles:**
| bigspec Block | How Poppendieck 2003 maps |
|---|---|
| **B6** (Gates & Hard-Stops) | "Decide as late as possible" → defer commitment until the last responsible moment; gates enforce this discipline |
| **B5** (Risk-Tiered Verification) | "Build Quality In" → if verification finds defects, the process is defective; drives F.I.R.S.T testing at P0–P1 |
| **B9** (Effort Accounting) | "Eliminate Waste" → WIP limits, small batches, cycle time as the ultimate metric; maps to BCP tracking |
| bigspec metrics (e06) | Cycle Time, Lead Time, Deployment Frequency — all sourced from this book's lean transfer table |

**Tension resolved:** Poppendieck's "toolkit" approach (22 tools) predates the "skill primitive" model (one verb-noun procedure). Bigspec's B3 consolidates tool sprawl into atomic, composable skills.

---

### 14. Implementing Lean Software Development: From Concept to Cash — Mary & Tom Poppendieck, 2006

**Status in bigpowers/bigspec:** Core metrics source. Cited in `hermes-metrics-calculations.md` (Ch.5, Speed), `hermes-metrics-report.md`, bigspec metrics docs.

**Core concepts:**
- **Little's Law**: WIP = Throughput × Cycle Time — the mathematical spine connecting work-in-process to delivery speed.
- **Queueing Theory**: Cascading queues, cadence establishment, cycle time reduction strategies. High WIP is the primary cause of friction.
- **Cost of Delay (CoD)**: The financial cost of deferring speed. Prioritize by how much value bleeds out over time.
- **"If you routinely find defects in your verification process, your process is defective"**: The principle behind defect measurement and build-quality-in.
- **McCabe Cyclomatic Complexity**: Explicit reference (pp. 194–195) as a code quality measurement standard.
- **7 Principles Refined**: Same 7 principles as 2003, now with implementation depth (measurement strategies, concrete patterns).

**Mapping to bigspec principles:**
| bigspec Block | How Poppendieck 2006 maps |
|---|---|
| **B9** (Effort Accounting) | Little's Law → BCP-based cycle time tracking; WIP limits as a gating mechanism |
| **B5** (Risk-Tiered Verification) | "If you routinely find defects, your process is defective" → the philosophical basis for verify-work gates |
| **B6** (Gates & Hard-Stops) | Queue limits, cadence → sprint/WIP gates prevent overload |
| bigspec metrics (e06) | Cycle Time = WIP ÷ Throughput, Queue Length, Cost of Delay, Flow Efficiency |

---

### 15. Leading Lean Software Development: Results Are not the Point — Mary & Tom Poppendieck, 2009

**Status in bigpowers/bigspec:** Leadership/Governance source. Cited in `hermes-metrics-calculations.md` (Ch.1), `hermes-metrics-report.md`.

**Core concepts:**
- **Frames (not recipes)**: Five frames for leading lean — Customer Focus, Systems Thinking, Relentless Improvement, Respect for People, Cultural Change. Leadership creates the frame; teams self-organize within it.
- **Technical Debt as Failure Demand**: "An insidious form of failure demand is technical debt" — messy code, duplication, lack of tests, tightly coupled architecture.
- **Tacit Knowledge Transfer**: "Many day-to-day decisions are based on tacit knowledge, which gets left behind in a handover."
- **Concrete Measurement**: Critical Defect Process Map (Figure 1-3) decomposes a 10-day cycle time into measurable sub-steps.
- **"Unit tests are what let you stop the line"**: Andon concept applied to software — fast detection enables fast recovery.

**Mapping to bigspec principles:**
| bigspec Block | How Poppendieck 2009 maps |
|---|---|
| **B2** (Think-First Behavior) | Frames over recipes — the orchestrate-project skill provides the frame, not the micromanagement |
| **B7** (Context Isolation) | Tacit knowledge problem → handoff block in state.yaml, session-state skill for cold starts |
| **B5** (Risk-Tiered Verification) | "Unit tests are what let you stop the line" → fast test suites at every tier |
| bigspec metrics (e06) | Technical debt as failure demand → AI Code Retention metric; Bus Factor → knowledge transfer tracking |

---

### 16. The Toyota Way: 14 Management Principles — Jeffrey K. Liker, 2004

**Status in bigpowers/bigspec:** Core. Cited in DEEPEN-ARCHITECTURE-REVIEW.md, bigspec metrics docs, `hermes-metrics-calculations.md`, `hermes-metrics-report.md`.

**Core concepts:**
- **14 Principles in 4 Categories (4P Model)**: Philosophy (long-term thinking), Process (eliminate waste), People/Partners (respect, challenge, grow), Problem Solving (continuous improvement).
- **Genchi Genbutsu** (Go and See): Principle 12 — understand the situation firsthand. Inspect code/artifacts, don't trust reports.
- **Kaizen** (Continuous Improvement): Principle 14 — relentless reflection and improvement at every level.
- **Jidoka / Andon**: Principle 5 — stop the line to fix defects immediately; build quality in at the source.
- **Heijunka** (Leveling): Principle 4 — level out the workload to avoid feast-or-famine cycles.
- **Value-Added Flow Efficiency**: Ratio of time spent adding value vs. time spent in queues.
- **Standardized Work**: Document the best-known process before trying to improve it (Principle 6).
- **"Productivity is not measured in terms of value-added work"**: Distinguishes true throughput from mere utilization — overproduction IS waste.

**Mapping to bigspec principles:**
| bigspec Block | How Liker maps |
|---|---|
| **B1** (Agent-Grade Craftsmanship) | Jidoka → stop-the-line gates in verify-work; genchi genbutsu → inspect artifacts, don't trust claims |
| **B6** (Gates & Hard-Stops) | Standardized Work Adherence → audit-code is the "standardized work" check before release |
| **B9** (Effort Accounting) | Flow Efficiency, Takt Time, WIP limits → BCP/hr tracking, velocity analytics |
| **B5** (Risk-Tiered Verification) | Andon Cord Pulls → failed verify commands trigger the "andon"; First Time Quality → AI Code Retention |
| **B2** (Think-First Behavior) | Kaizen → retrospective loop built into every epic cycle; genchi genbutsu → always verify before deciding |
| Part III conventions | Heijunka (leveling) → WIP limits prevent agent overload; small batches → one story at a time |

---

### 17. Agile Estimating and Planning — Mike Cohn, 2005

**Status in bigpowers/bigspec:** Core metrics source. Cited in `hermes-metrics-calculations.md` (Ch.3, 4), `docs/references/bcp-plus.md`, bigspec metrics docs.

**Core concepts:**
- **Velocity**: Sum of story points completed per iteration. "Yesterday's weather" — use rolling average of last 3–4 iterations for forecasting.
- **Duration = Σ(Story Points) ÷ Velocity**: The fundamental estimation formula.
- **Cost per Story Point**: Total Cost ÷ Σ Story Points — connects effort to financial reality.
- **Cone of Uncertainty**: Estimation error narrows as the project progresses; early estimates carry wide variance.
- **INVEST**: User stories should be Independent, Negotiable, Valuable, Estimable, Small, Testable.
- **Kano Model of Customer Satisfaction**: Distinguishes must-haves from delighters.
- **MTBF (Mean Time Between Failures)**: "Two months of MTBF testing before releasing" — quality gating.
- **Iteration Planning**: Breaking down features into tasks under 16 hours each.

**Mapping to bigspec principles:**
| bigspec Block | How Cohn maps |
|---|---|
| **B9** (Effort Accounting) | Velocity and story points → BCP (Business Complexity Points) and H/BCP metrics; Cone of Uncertainty → CV% tracking |
| **B4** (Spec-as-Contract) | INVEST criteria → every bigspec story must be Independent, Negotiable, Valuable, Estimable, Small, Testable |
| **B6** (Gates & Hard-Stops) | MTBF testing gate → verify-work mechanical gates before release |
| bigspec metrics (e06) | Velocity → Agentic Cycle Time ÷ BCP; Release Variance (Burndowns) → CMMI / Spec Maturity |

---

### 18. Agile Retrospectives: Making Good Teams Great — Esther Derby & Diana Larsen, 2006

**Status in bigpowers/bigspec:** Governance/Quality source. Cited in DEEPEN-ARCHITECTURE-REVIEW.md, bigspec metrics docs, `hermes-metrics-calculations.md`, `hermes-metrics-report.md`.

**Core concepts:**
- **5-Stage Retrospective Framework**: Set the Stage → Gather Data → Generate Insights → Decide What to Do → Close.
- **ROTI (Return on Time Invested)**: Rate the effectiveness of meetings/ceremonies to ensure they don't become wasteful.
- **Action Item Follow-Through**: Tracks whether teams actually implement process fixes — an indicator of organizational friction.
- **Defect Rate Tracking**: "Metrics include burndown charts, velocity, defect counts, number of stories completed, amount of code refactored."
- **Lead Time in Practice**: "Provide longer lead times for hardware moves" — real-world lead time measurement.
- **Team Morale / ESAT**: Employee satisfaction as a leading indicator of predictability and impact.

**Mapping to bigspec principles:**
| bigspec Block | How Derby & Larsen map |
|---|---|
| **B2** (Think-First Behavior) | 5-stage retrospective framework → inspect-quality skill and epic-cycle reflection step |
| **B5** (Risk-Tiered Verification) | Action Item Follow-Through → verify-work gaps loop; ROTI → efficiency tracking |
| **B10** (Synthesis) | Gather Data → Generate Insights → orchestrate-project's synthesis phase |
| bigspec metrics (e06) | Defect Rate, ROTI, Team Morale → governance metrics suite |

---

### 19. PMBOK Guide, 7th Edition — Project Management Institute, 2021

**Status in bigpowers/bigspec:** Structural backbone. Cited extensively — DEEPEN-ARCHITECTURE-REVIEW.md, bigspec metrics docs, `hermes-metrics-calculations.md`, `hermes-metrics-report.md`, and the using-bigpowers skill. The original bigpowers 6-phase lifecycle was PMBOK-shaped before the reborn constitution switched to 5 fractal movements.

**Core concepts:**
- **8 Performance Domains** (replacing 5 Process Groups): Stakeholder, Team, Development Approach & Lifecycle, Planning, Project Work, Delivery, Measurement, Uncertainty.
- **12 Principles**: Stewardship, Team, Stakeholders, Value, Systems Thinking, Leadership, Tailoring, Quality, Complexity, Risk, Adaptability & Resilience, Change.
- **Tailoring**: PMBOK 7 shifts from rigid processes to principles — teams tailor the approach to their context.
- **Value Delivery System**: Focus on business outcomes over mere output tracking.
- **Cycle Time & Productivity**: "O tempo de ciclo é o tempo total que uma unidade leva para passar por um processo." / "A produtividade é o número de itens que podem concluir um processo em um determinado tempo."
- **EVM (Earned Value Management)**: SPI (Schedule Performance Index) and CPI (Cost Performance Index) — variance metrics tracking predictability against baselines.
- **Governança**: Governance as a tailoring dimension ensuring compliance and accountability.

**Mapping to bigspec principles:**
| bigspec Block | How PMBOK 7 maps |
|---|---|
| **B4** (Spec-as-Contract) | Tailoring principle → constitution is the fixed backbone, stories/verifications are tailored per risk tier |
| **B9** (Effort Accounting) | EVM (SPI/CPI) → CV% (Coefficient of Variation); Value Delivery → Benefit Realization tracking |
| **B10** (Synthesis) | 8 Performance Domains → the 5 fractal movements synthesize PMBOK's domains into a recursive loop |
| **Capstone** (Outcome Evals) | Measurement domain → verify: commands, OKF evidence bundles; Governance → compliance tracking |
| bigspec metrics (e06) | Cycle Time, Productivity, Tailoring, EVM → the full DX Measurement Framework links to PMBOK baselines |

**Key design decision:** bigspec's reborn constitution (2026) replaced the PMBOK-shaped 6-phase lifecycle with 5 fractal movements that run identically at project, epic, and story scope. The PMBOK functions (Planning, Measurement, Delivery) are now *aspects* of each movement, not sequential phases.

---

### 20. Practices of an Agile Developer — Venkat Subramaniam & Andy Hunt, 2006

**Status in bigpowers/bigspec:** Pragmatic practices source. Cited in DEEPEN-ARCHITECTURE-REVIEW.md, bigspec metrics docs, `hermes-metrics-calculations.md`, `hermes-metrics-report.md`. Also in the big-library but flagged as ABSENT from bigpowers in MISSING-REFERENCES-AND-DELIVERY-PLAN.md (the architecture review references it but no skill explicitly incorporates it).

**Core concepts:**
- **45 Agile Practices**: Organized in 5 categories — Beginning Agility, Feeding Agility, Delivering Agility, Agile Coding, Agile Debugging.
- **"Compliance Isn't Outcome"**: "Many standardization and process efforts focus on measuring and rating compliance to process" — a warning against cargo-cult process adherence.
- **Fast Feedback Loops**: Build Time / CI Speed — if builds take too long, developers context-switch.
- **Escaped Defects**: Bugs that reach production, bypassing local tests. The ultimate rework penalty.
- **Test Coverage**: "Unit testing is only as effective as your test coverage" (Ch.5) — use coverage tools.
- **Pragmatic Balance**: "Practices" rather than "rules" — the developer's judgement determines when to apply each.

**Mapping to bigspec principles:**
| bigspec Block | How Subramaniam & Hunt map |
|---|---|
| **B5** (Risk-Tiered Verification) | Escaped Defects → AI Code Retention/Churn metric; Build Time/CI Speed → verify-work mechanical gates |
| **B6** (Gates & Hard-Stops) | "Compliance Isn't Outcome" → gates measure behavioral outcomes, not process theater |
| **B1** (Agent-Grade Craftsmanship) | 45 practices → the pragmatic complement to Clean Code's prescriptive heuristics |
| bigspec metrics (e06) | Build Time, Escaped Defects, Automated Test Coverage |

---

## Updated Layer Cake (Revised)

```
1990: Womack/Jones/Roos (Lean Production) ── The Machine That Changed the World
         │
1996: Womack/Jones (Lean Thinking)         ── Value, Value Stream, Flow, Pull, Perfection
         │
2003: Poppendieck (Lean Software Dev)      ── 7 lean principles → software; 22 tools
         │
2004: Liker (The Toyota Way)               ── 14 principles, 4P model, genchi genbutsu
         │
2005: Cohn (Agile Estimating)              ── Velocity, story points, INVEST, Cone of Uncertainty
         │
2006: Poppendieck (Implementing Lean SW)   ── Little's Law, queuing theory, Cost of Delay
2006: Derby/Larsen (Agile Retrospectives)  ── 5-stage framework, ROTI, action item tracking
2006: Subramaniam/Hunt (Practices Agile)   ── 45 practices, escaped defects, fast feedback
         │
2008: Uncle Bob (Clean Code)               ── SRP, Boy Scout Rule, F.I.R.S.T, 63 heuristics
         │
2009: Poppendieck (Leading Lean SW)        ── Frames, technical debt as failure demand
         │
2018: Ousterhout (Deep Modules)            ── Deep modules, information hiding
         │
2021: PMBOK 7 (PMI)                        ── 8 domains, 12 principles, tailoring, EVM
         │
2023-24: Karpathy + Superpowers + Pocock   ── Think-first, verb-noun skills, zoom-out
         │
2024: Wasowski (SDD) + BCP                 ── Spec as human-agent interface; effort accounting
         │
2026: Akita (Clean Code for AI Agents)     ── Grep-ability, token economy, remediation
         │
Synthesis: bigspec (2026)                  ── 5 fractal movements, 11 building blocks
```

---

## Summary: 20 Books, 14 Methodologies → 11 Building Blocks

The 20 books (12 original + 8 supplemented) and 14 additional methodologies feed into bigspec's 11 constitution building blocks (B0–B10 + Capstone). The mapping is one-to-many: each block synthesizes multiple sources. B1 alone draws from Uncle Bob, Ousterhout, and Akita — resolving the tension between small functions and deep modules for an agent-first world. The Poppendieck trilogy (2003/2006/2009) provides the mathematical spine for metrics (Little's Law, Cost of Delay, queuing theory). The Toyota Way anchors quality-through-process (Jidoka, Andon, Kaizen). PMBOK 7 provides the governance/accountability frame. Together they form a 16-year arc: 1990 (lean manufacturing) → 2026 (agent-first craftsmanship).
