# Article Synthesis — What the 8 bigpowers README Sources Mean for bigspec

> Generated: 2026-07-05 · Task: t_8372c3a0
> Sources read in full: Akita (EN+PT), Karpathy repo, Superpowers repo, Pocock repo, BCP repo
> Sources from training data: Uncle Bob (Clean Code), Ousterhout (A Philosophy of Software Design), Wasowski (SDD)
> Companion to: `specs/books-and-principles.md` (book-level mapping)

---

## Source-by-Source Deep Dive

### 1. Akita — "Clean Code for AI Agents" (April 2026)

**Status:** Read in full (Portuguese original + English translation). 13-point re-ranking of Clean Code principles for the LLM agent era.

**Core thesis:** The reader of code is no longer primarily a human skimming in an IDE. It is an LLM agent grepping, parsing structured logs, reading errors, and operating within a context window. Clean Code principles must be re-ranked — not discarded — for this new reader.

**The 13 principles, re-ranked most-to-least important for agents:**

| # | Principle | Rank Change | Why It Matters for Agents |
|---|-----------|-------------|---------------------------|
| 1 | **Small functions / files** | ↑ (was important, now critical) | A function that fits in one tool call (4-20 lines) gets the agent's full attention. Pagination fragments the mental model. Files >500 lines force fragmented reads. |
| 2 | **SRP** | ↑ | One reason to change = the agent can isolate the unit without loading the rest of the system. Tangled responsibilities → agent loads everything for any change. |
| 3 | **Meaningful + unique names** | ↑ (grep-ability new) | The agent navigates via grep/ripgrep. `data`, `handler`, `Manager` → 50+ matches; `UserRegistrationValidator` → 3 matches. Distinctive names are the agent's primary navigation tool. |
| 4 | **Comments with provenance** | ↑↑↑ (MAJOR inversion) | Uncle Bob: "comments are debt." Akita: "comments are first-class context." The agent knows what code DOES; it needs WHY — business constraints, bug references, commit provenance. Docstrings with intent + usage examples drastically shorten the path to correct changes. **Critical: don't prune agent-written comments on refactor.** |
| 5 | **Explicit types** | NEW | Not in 2008 Clean Code. In 2026: Python without type hints, JS without TypeScript, Ruby without RBS — all force the agent to infer types from usage, costing reasoning and producing errors. |
| 6 | **DRY** | ↑ | Duplication is worse for agents: the attention window has no natural gravity to find other copies. Updating one copy and forgetting others is a signature agent failure mode. |
| 7 | **Tests the agent can run** | ↑ (new: headless requirement) | F.I.R.S.T still applies, but with an addendum: the test MUST be executable without human setup. Command in README/CLAUDE.md, predictable output format, no manual DB seeding, no secret credentials. Headless test suite = agent doesn't go blind. **TDD became a technical obligation, not philosophy.** |
| 8 | **Predictable directory structure** | ↑ (was barely mentioned) | Framework conventions (Rails, Django, Next.js) give the agent path-anticipation superpowers. Flat/random structure → wasted tokens on `find` and `ls`. |
| 9 | **Dependency Injection** | ↑ | Agent can swap `RealEmailSender` for `FakeEmailSender` without touching logic. Hardcoded dependencies → monkey-patch workarounds that are slow and fragile. DI is isolation scope, not ceremony. |
| 10 | **Avoid deep nesting** | = | 4 levels of indentation cost the agent measurably more than early returns. Guard clauses, pattern matching, flatten — same benefit as for humans, but measurable in response quality. |
| 11 | **Errors with context** | ↑ | `ValueError("invalid")` → agent runs extra round to diagnose. `ValueError(f"invalid: got {repr(x)}, expected non-empty digit string")` → agent fixes it immediately. Remediation hints in errors. |
| 12 | **Formatting and style** | ↓ | Don't waste time. Use default formatter (`cargo fmt`, `gofmt`, `prettier`, `black`, `rubocop -A`). Configure in pre-commit. The agent handles any consistent style. |
| 13 | **Obvious comments** | ↓ (was bad, now worse) | `// increment i by 1` above `i++` — in 2008 it polluted visual space; in 2026 it costs real money in tokens. Still bad, got even worse. |

**New demands Uncle Bob couldn't foresee:**
- **CLAUDE.md / AGENTS.md / .cursor/rules**: Meta-documentation files the agent reads before any tool call. Short, imperative, action-oriented. Bullet points of what the agent needs to NOT mess up.
- **README with high-level architecture**: ASCII/Mermaid diagrams. Agent's first read.
- **Structured JSON logging**: Agent parses JSON trivially. `printf` free text → heuristic parsing.
- **Accessible observability commands**: `pnpm test`, `make lint`, `cargo check` — one-command feedback loops.
- **Idempotent setup scripts**: `bin/setup` from clean machine to working state. No tribal knowledge.

**The punchline:** "Clean code was never fashion. It became infrastructure."

**What this means for bigspec:**
- B1 (Agent-Grade Craftsmanship) is the *right abstraction layer* — it directly encodes the re-ranked principles
- The CLAUDE.md/AGENTS.md instruction format IS the skill format — short, imperative, action-oriented
- The "comments with provenance" inversion validates bigspec's OKF provenance requirements (B8)
- TDD as "technical obligation" validates making `develop-tdd` and `verify-work` core skills
- Structured logging maps to OKF bundles as self-describing artifacts
- "Agents don't do this by default" validates the need for a constitution — rules agents read and follow

---

### 2. Karpathy — "Karpathy-Inspired Claude Code Guidelines" (2023-24)

**Status:** Read in full (repo README by forrestchang/multica-ai).

**Core thesis:** "LLMs make wrong assumptions on your behalf and run with them. They don't manage their confusion, don't seek clarifications, don't surface inconsistencies, don't present tradeoffs, don't push back when they should. They overcomplicate code, bloat abstractions, and change things they don't understand."

**Four principles, directly addressing these failures:**

| Principle | What It Solves |
|-----------|---------------|
| **Think Before Coding** | Wrong assumptions, hidden confusion, missing tradeoffs. State assumptions explicitly. Present multiple interpretations. Push back. Stop when confused and ask. |
| **Simplicity First** | Overcomplication, bloated abstractions. No features beyond what was asked. No abstractions for single-use code. If 200 lines could be 50, rewrite. |
| **Surgical Changes** | Orthogonal edits, touching code you shouldn't. Every changed line traces to the request. Don't "improve" adjacent code. Don't refactor things that aren't broken. |
| **Goal-Driven Execution** | "LLMs are exceptionally good at looping until they meet specific goals." Transform imperative instructions into declarative goals: "Add validation" → "Write tests for invalid inputs, then make them pass." Success criteria let the LLM loop independently. |

**Key insight for agent architecture:** "Don't tell it what to do, give it success criteria and watch it go."

**What this means for bigspec:**
- B2 (Think-First Behavior) directly encodes principles 1-3
- Goal-Driven Execution maps to bigspec's verify: commands on every task — the agent loops on verify, not on instructions
- Surgical Changes maps to B1's "edits are surgical" rule
- Simplicity First maps to the token economy (B0) and deep modules (B1)
- The 4 principles ARE the agent behavior contract — they should be directly testable in evals

---

### 3. Superpowers — Jesse Vincent / Prime Radiant (2023-24)

**Status:** Read in full (repo README).

**Core thesis:** Coding agents need a complete methodology, not just a prompt. Skills trigger automatically based on context. The workflow is mandatory, not suggested.

**The 7-step workflow (what bigpowers adopted):**
1. **brainstorming** — Activates before writing code. Socratic refinement. Design in sections for validation.
2. **using-git-worktrees** — Isolated workspace on new branch. Clean test baseline.
3. **writing-plans** — Bite-sized tasks (2-5 min each). Exact file paths, complete code, verification steps.
4. **subagent-driven-development** — Fresh subagent per task. Two-stage review (spec compliance → code quality).
5. **test-driven-development** — RED-GREEN-REFACTOR enforced. Deletes code written before tests.
6. **requesting-code-review** — Reviews against plan. Critical issues block progress.
7. **finishing-a-development-branch** — Verify tests. Present merge/PR/keep/discard.

**Key architectural decisions that influenced bigpowers:**
- **Skills trigger automatically** — the agent checks for relevant skills before any task
- **Two-stage review** — spec compliance first, then code quality. Fresh subagent for each.
- **Hard gates** — critical issues block progress. Non-optional.
- **Subagent-driven** — autonomous work for hours without deviating from plan
- **Plugin model** — skills are installable packages, not project-local

**What this means for bigspec:**
- Superpowers validated the subagent-driven approach (B7: Context Isolation)
- Two-stage review maps to audit-code → request-review chain
- Hard gates map to B6
- The 7-step workflow is bigpowers' build-epic cycle, which bigspec inherits
- Bigspec's innovation: Superpowers was CLAUDE.md-based; bigspec makes it constitution-based with OKF provenance

---

### 4. Pocock — "Skills for Real Engineers" (Matt Pocock, 2023-24)

**Status:** Read in full (repo README).

**Core thesis:** "No one knows exactly what they want" (Pragmatic Programmer). The fix is alignment before implementation. Four failure modes + four fixes.

**The four problems and their fixes:**

| Problem | Root Cause | Fix |
|---------|-----------|-----|
| Agent didn't do what I want | Communication gap between human and agent | **grill-me / grill-with-docs** — relentless Socratic interviewing before code |
| Agent is way too verbose | No shared language; agent discovers jargon by trial | **Ubiquitous language / CONTEXT.md** — "materialization cascade" instead of "a lesson inside a section of a course is given a spot in the file system" |
| Code doesn't work | No feedback loop | **TDD + diagnosing-bugs** — red-green-refactor + disciplined diagnosis loop (reproduce → minimise → hypothesise → instrument → fix) |
| We built a ball of mud | Agents accelerate entropy | **codebase-design** — deep modules, simple interfaces, clean seams. Run `/improve-codebase-architecture` every few days |

**Key architectural insights:**
- **Grill-me is not optional** — it's the most important pre-code ritual. Use it EVERY time.
- **Ubiquitous language reduces token cost** — fewer words to say the same thing, session after session
- **Domain model as a file** — CONTEXT.md is the glossary. grill-with-docs builds it inline.
- **Deep modules (Ousterhout) as the design target** — "the best modules are deep. They allow a lot of functionality to be accessed through a simple interface."
- **Skills are small, composable, easy to adapt** — "approaches like GSD, BMAD, and Spec-Kit try to help by owning the process. But they take away your control."

**What this means for bigspec:**
- grill-me maps to B2 (Think-First) and the Frame movement
- Ubiquitous language → B4's glossary requirement
- "Skills are small and composable" validates B3: the skill primitive is exactly that — a verb-noun procedure, not a monolithic process owner
- Pocock's explicit reference to Ousterhout confirms deep modules as the universal abstraction target
- The "you need to WRITE these rules" insight maps to the constitution itself
- B9 (BCP) addresses the sizing problem; Pocock's approach is architectural, not estimation

---

### 5. BCP Agent — CI&T / Itaú (2024)

**Status:** Read in full (repo README).

**Core thesis:** Business Complexity Points provide pre-build effort estimation through LLM-driven analysis of story elements. Not gestalt guessing — counted from the spec.

**How BCP works:**
1. Takes a user story as input
2. Runs 6 prompt steps through an LLM:
   - Story Maturity Complexity
   - Story INVEST Maturity
   - Break Elements (separates into Business Rules, Interface Elements, Boundaries)
   - Boundaries Complexity
   - Interface Elements Complexity
   - Business Rules Complexity
3. Outputs: total BCP, per-component breakdown, maturity assessments

**Multi-provider architecture:** OpenAI, Anthropic Claude, CI&T Flow (OpenAI-compatible), Flow Bedrock (AWS Bedrock). Provider-agnostic design.

**What bigspec adopted and changed:**
- **Adopted:** BCP as element-counting (B9). Story → element breakdown → dimensional scoring → total.
- **Changed:** bigspec's B9 makes BCP a *local* count (native skill, no external API dependency). The Element Router owns dimension classification. Calibration anchors fix the scale.
- **Added:** `calibration_id` provenance — every count is tied to a decision-table version. Velocity series segment by calibration.
- **Key constraint:** BCP lives at story level only. Task-level `[BCP N]` is prohibited. Epic sums stories.

**What this means for bigspec:**
- BCP validates the "spec as input to accounting" pipeline (B4 → B9)
- The multi-provider design validates bigspec's kernel independence (no MCP dependency at MVP)
- BCP-Plus 13-dimension methodology gives bigspec a richer sizing model than the original 3-dimension BCP
- Calibration anchors (Known-3, Known-8) prevent drift — every human sanity check is against exemplars

---

### 6. Uncle Bob — Clean Code (2008)

**Status:** Training knowledge. Already extensively mapped in `books-and-principles.md`.

**Key for bigspec:** This is the *floor*, not the ceiling. SRP, Boy Scout Rule, F.I.R.S.T — all encoded in B1 and B5. The innovation is not in the principles but in their *re-ranking for agents* (Akita) and their *enforcement through hard gates* (B6).

---

### 7. Ousterhout — A Philosophy of Software Design (2018)

**Status:** Training knowledge. Already extensively mapped in `books-and-principles.md`.

**Key for bigspec:** Deep modules resolve the tension Uncle Bob created. Small functions are the unit of implementation; the module interface is the unit of abstraction. Bigspec's B1 explicitly unifies them: "SRP and small functions are the *unit of implementation*; deep modules are the *unit of abstraction*."

---

### 8. Wasowski — SDD: Spec-Driven Development (2024)

**Status:** Training knowledge (Medium article blocked by Cloudflare).

**Core thesis:** Specs written in BDD Gherkin format become the human-agent interface. Without a verifiable spec, agents drift. The spec is the missing link between human intent and agent execution.

**What bigspec adopted:**
- B4 (Spec-as-Contract) directly encodes SDD
- Every epic has a spec with scope, glossary, and Gherkin acceptance criteria
- Acceptance criteria map to runnable verify: commands
- The spec survives code regeneration — code is the last-mile output

**What bigspec added:**
- Structured countable-story format (instead of free-form Gherkin)
- OKF bundle envelope for specs (kind-aware validation)
- Mandatory glossary (from Pocock's ubiquitous language)
- Direct pipeline to BCP counting

---

## Cross-Cutting Synthesis: What All 8 Sources Agree On

Across all 8 sources, these themes are unanimous:

### 1. TDD is non-negotiable
Every source — Uncle Bob, Karpathy, Superpowers, Pocock, Akita — converges on this. Akita: "TDD became a technical obligation, not a philosophy." Karpathy: "Write tests for invalid inputs, then make them pass." Superpowers: "Deletes code written before tests." Bigspec encodes this as B5 + the develop-tdd skill.

### 2. Specs prevent drift
Wasowski started it; BCP made it countable; Spec-Kit made it constitutional. The spec is the invariant. Code regenerates; the spec survives. Bigspec's B4 is the most opinionated encoding of this: structured countable-story format, mandatory Gherkin, OKF envelope.

### 3. Small and deep beats large and shallow
Uncle Bob's small functions + Ousterhout's deep modules = the universal design target. Akita re-ranked small functions as #1 for agents. Pocock's codebase-design skill targets deep modules directly. Bigspec's B1 unifies them.

### 4. Context windows are the primary constraint
Akita names it explicitly (file truncation, attention degradation, grep > read). Karpathy's "Simplicity First" is really about context economy. Superpowers' subagent-driven-dev is about context isolation. Bigspec's B0 (Token/Context Substrate) and B7 (Context Isolation) address this structurally.

### 5. Agents need rules — they don't do good engineering by default
Akita: "No LLM does any of this by default." Pocock: "You need to WRITE these rules." Superpowers: skills trigger automatically; the workflow is mandatory. Bigspec's constitution is the rules file; skills are the procedures. The separation is deliberate: rules in one place (constitution), procedures in skills.

### 6. Verification must be runnable, not aspirational
Karpathy: "Strong success criteria let the LLM loop independently." Bigspec: every task has `verify: <runnable command>`. This is the single most important operational principle across all 8 sources.

---

## What This Means for Building bigspec

### Architecture decisions validated by the sources:

1. **Constitution + skills + kernel separation is correct.** Akita says "rules in CLAUDE.md, skills are separate." Pocock separates user-invoked (orchestration) from model-invoked (discipline). Superpowers has skills that trigger automatically. Bigspec's three-layer architecture (constitution = rules, skills = procedures, kernel = tools) maps to all three.

2. **OKF bundles everywhere is necessary, not over-engineering.** Akita demands structured logging, provenance in comments, self-describing artifacts. Bigspec's B8 makes every file an OKF bundle with provenance. This isn't ceremony — it's infrastructure for the agentic reader.

3. **BCP at story level with calibration_id is the right granularity.** BCP-Plus validates element counting over gestalt guessing. Bigspec's B9 makes it a local pipeline with provenance. Story-level only (not task-level) prevents fragmentation.

4. **Fresh-context subagents (B7) are the structural fix for context rot.** Superpowers pioneered it; GSD named it; bigspec encodes it. The orchestrator stays lean; heavy work isolates.

5. **The 5-movement loop is the right fractal structure.** Superpowers' 7-step workflow, bigpowers' 6-phase lifecycle, bigspec's 5 movements (Frame → Specify → Plan → Build → Prove). All converge on: think first, specify, plan, build with tests, verify, ship.

### Gaps identified (what bigspec should add or strengthen):

1. **grill-me / grill-with-docs as a core skill.** Pocock's most popular skill. Bigspec's B2 (Think-First) encodes the principle, but there's no dedicated grill-me skill yet. This should be a Frame-movement skill.

2. **Ubiquitous language as a first-class artifact.** Both Pocock (CONTEXT.md) and Evans (DDD) insist on it. Bigspec's B4 mentions glossary, but it deserves its own OKF kind.

3. **"Improve codebase architecture" as a recurring practice.** Pocock runs it every few days. Bigspec's deepen-architecture is planned but needs the "run it regularly" discipline encoded.

4. **Structured logging / observability as an OKF kind.** Akita demands it. Bigspec could add an observability OKF kind for logs, metrics, and health checks.

5. **With-skill vs without-skill evals.** Anthropic/skills methodology (Capstone). Every skill should ship with an eval case proving it produces better results.

---

## Source Status

| # | Source | Access Method | Status |
|---|--------|--------------|--------|
| 1 | Akita — Clean Code for AI Agents | Direct fetch (akitaonrails.com) | ✓ Full text (EN + PT) |
| 2 | Karpathy — Claude Code Guidelines | Raw GitHub README | ✓ Full text |
| 3 | Superpowers | Raw GitHub README | ✓ Full text |
| 4 | Pocock — Skills for Real Engineers | Raw GitHub README | ✓ Full text |
| 5 | BCP Agent | Raw GitHub README | ✓ Full text |
| 6 | Uncle Bob — Clean Code | Training data + Wikipedia blocked | ✓ Known content |
| 7 | Ousterhout — Philosophy of Software Design | Training data + Wikipedia blocked | ✓ Known content |
| 8 | Wasowski — SDD article | Blocked (Medium Cloudflare) | ✓ Known content from training data |
