# bigpowers Full Repository Audit

> Generated: 2026-07-05
> Source: /Users/danielvm/Developer/bigpowers (v2.61.4, 74 skills)
> Purpose: Inform bigspec architecture — what to keep, what to drop, what to rename

---

## 1. Repository Structure (Top-Level)

```
bigpowers/
├── CLAUDE.md                  # Agent instructions: project, commands, architecture, bts toolchain
├── CONVENTIONS.md             # Git rules, code style, skill naming, file-size caps
├── README.md                  # Guided intro: quick start → features → lifecycle → philosophy → project structure
├── SKILL-INDEX.md             # Auto-generated skill catalog (DO NOT EDIT, source: scripts/generate-skill-index.sh)
├── CHANGELOG.md               # Auto-generated from Conventional Commits (semantic-release)
├── CONTRIBUTING.md            # Contribution guide
├── GEMINI.md                  # Gemini CLI project file
├── package.json               # npm package: bigpowers, scripts for compliance/sync/validate
├── index.js                   # JS entry point
├── skills-lock.json           # Auto-generated catalog with SHA-256 hashes
├── opencode.json              # OpenCode project config
│
├── skills/                    # 74 verb-noun skill directories
│   └── <skill-name>/
│       ├── SKILL.md           # Source of truth (YAML frontmatter + markdown body)
│       └── REFERENCE.md       # Optional: advanced procedures, templates, examples
│
├── specs/                     # YAML cockpit + epics + product artifacts
│   ├── state.yaml             # Active flow, epic, handoff.next_skill, metrics
│   ├── release-plan.yaml      # WSJF-prioritized epic index with BCP baselines
│   ├── execution-status.yaml  # Flat story/epic status (done/backlog/ready)
│   ├── planning-status.yaml   # Discover-phase checklist (optional)
│   ├── product/               # Intent layer
│   │   ├── SCOPE_LATEST.yaml
│   │   ├── VISION_LATEST.yaml
│   │   ├── GLOSSARY_LATEST.yaml
│   │   └── index.yaml
│   ├── adr/                   # Architectural Decision Records
│   ├── epics/                 # Epic capsules (eNN-slug/epic.yaml + stories/)
│   ├── metrics/               # cycle-times.yaml (BCP/hr velocity)
│   ├── benchmarks/            # Skill benchmark definitions + reports
│   ├── bugs/                  # BUG-*.md + registry.yaml
│   ├── verifications/         # Gherkin features, falsification, verification reports
│   ├── templates/             # migration.okf.md, story-metrics.okf.md
│   ├── workflows/             # .yaml workflow recipe library
│   ├── migrations/            # Spec migration records
│   ├── codebase-wiki/         # OKF bundle: domain concepts from codebase
│   ├── security/              # Security review artifacts + epics threat models
│   ├── archive/               # Legacy markdown, old plans, obsidian wiki
│   └── assets/                # Static assets
│
├── scripts/                   # 47 shell/JS/Python scripts
│   ├── sync-skills.sh         # THE PIPELINE: SKILL.md → .cursor/, .gemini/, .pi/
│   ├── install.sh             # Global install: symlinks for Claude, Gemini, Cursor
│   ├── land-branch.sh         # Solo-land: squash to main
│   ├── audit-compliance.sh    # Gherkin feature compliance checker (94% gate)
│   ├── validate-specs-yaml.sh # YAML cockpit validator
│   ├── validate-okf.sh        # OKF bundle validator
│   ├── validate-doctrine.sh   # Doctrine compliance check
│   ├── trace-stories.sh       # Traceability: story tags → code
│   ├── run-golden-suite.sh    # Pre-merge gate: compliance + G-04 self-test
│   ├── bp-yaml-set.sh         # Runtime YAML key patcher
│   ├── bp-yaml-snapshot.sh    # Release snapshot tool
│   ├── bp-timing.sh           # Skill invocation timer
│   ├── bp-read-agents.sh      # AGENTS.md preflight reader
│   ├── check-blind-spots.sh   # Structural quality gap detector
│   ├── mcp-server.js          # MCP tool server (list/get/search/invoke skills)
│   ├── generate-skill-index.sh        # → SKILL-INDEX.md
│   ├── generate-reference-tables.sh   # → docs/references/model-profiles.md
│   ├── build-skill-index.sh           # → specs/SKILL-SEARCH-INDEX_LATEST.md
│   ├── regenerate-lockfile.sh         # → skills-lock.json
│   ├── enrich-epics-from-archive.sh   # Epic YAML enrichment
│   ├── sync-status-from-epics.sh      # execution-status.yaml sync
│   ├── record-cycle-time.sh           # Per-story cycle metrics
│   ├── lib/                           # Python helpers
│   │   ├── trace-stories.py           # Story tag discovery + file-to-story mapping
│   │   ├── trace-matrix.py            # Traceability matrix engine (523 lines — exception)
│   │   ├── blind-spots.py             # Blind spot detection engine
│   │   ├── blind-spot-checks.py       # Blind spot check definitions
│   │   └── emit-okf-metrics.sh        # OKF metrics emission helper
│   └── golden-*.sh                    # Individual golden gate scripts (G-04 through G-11)
│
├── docs/                      # Reference documentation
│   ├── PRINCIPLES.md           # 9-section philosophical evolution
│   ├── WORKFLOW-SOP-v2.md      # Solo developer SDLC — deterministic process
│   ├── COMMIT-MESSAGE.md       # Conventional Commits reference
│   ├── AGENTS.md               # Agent instructions template
│   ├── countable-story-format.md   # 20-section story template (maturity 1–5)
│   ├── using-bigpowers.md      # Bootstrap guide
│   ├── references/             # 34 reference docs (see §5)
│   └── archive/                # Historical research
│
├── profiles/                  # Stack profiles
│   ├── solo-git.md             # Solo land workflow (land-branch.sh)
│   ├── node-service.md
│   ├── swift.md
│   └── typescript-vue.md
│
├── hooks/
│   └── pre-tool-use.sh         # Git guardrail: block destructive commands
│
├── bin/
│   └── bigpowers.js            # CLI entry point
│
├── dashboard/                  # TUI + web dashboard (Port 7742)
├── website/                    # Astro docs site (4th generated artifact target)
├── bigpowers-mcp/              # Standalone MCP server package
│
├── .cursor/rules/              # GENERATED — never hand-edit
├── .gemini/extensions/bigpowers/  # GENERATED — never hand-edit
└── .pi/                        # GENERATED — never hand-edit
```

---

## 2. Skills Catalog (74 Skills, 7 Phases + Sustain)

### Discover (7)
| Skill | Purpose |
|---|---|
| `survey-context` | Bootstrap: read specs/ + state.yaml → recommend next skill |
| `research-first` | Look-before-build: search registries, web, existing skills |
| `elaborate-spec` | Refine vague idea → clear spec through dialogue |
| `map-codebase` | Scan codebase → tech-stack doc (builds from scratch) |
| `audit-plan` | Evaluate incoming plan against bigpowers principles |
| `search-skills` | Natural-language → skill name lookup |
| `using-bigpowers` | One-time bootstrap: lifecycle intro + first-skill recommendation |

### Design (7)
| Skill | Purpose |
|---|---|
| `model-domain` | Grill plan against domain model |
| `define-language` | Extract DDD ubiquitous language glossary |
| `define-success` | Task statement → "step → verify: <cmd>" pairs |
| `design-interface` | Parallel sub-agents design multiple interfaces |
| `deepen-architecture` | Find shallow modules → propose deepening |
| `grill-me` | Stress-test plan through relentless Q&A |
| `grill-with-docs` | Doc-grounded variant — every challenge cites real URL |

### Plan (9)
| Skill | Purpose |
|---|---|
| `scope-work` | Define in/out of scope (Step 1 of planning spine) |
| `slice-tasks` | Break PRD → vertical slices (Step 2) |
| `plan-work` | Write implementation tasks with verify: commands (Step 3) |
| `plan-release` | Build release-plan.yaml from elaborated epics |
| `plan-refactor` | Create refactor plan with tiny commits |
| `assess-impact` | Blast radius analysis before code changes |
| `change-request` | Insert new requirements mid-release (WSJF) |
| `seed-conventions` | Generate CLAUDE.md + CONVENTIONS.md for new projects |
| `run-planning` | Drive discover-phase checklist |

### Build (19)
| Skill | Purpose |
|---|---|
| `orchestrate-project` | Meta-skill: 6-phase core loop with hard gates |
| `build-epic` | 8-step story cycle (survey → plan → kickoff → tdd → verify → audit → commit → release) |
| `kickoff-branch` | Create worktree + feature branch, verify clean baseline |
| `develop-tdd` | Red-green-refactor with vertical slices |
| `execute-plan` | Batch-exec epic tasks with human checkpoints |
| `verify-work` | Multi-phase UAT gate (smoke → build → test → manual) |
| `audit-code` | Self-review checklist before reviewer |
| `request-review` | Dispatch fresh reviewer agent |
| `respond-review` | Act on reviewer feedback systematically |
| `commit-message` | Draft Conventional Commits + semver bump |
| `release-branch` | Merge/PR/keep/discard decision |
| `craft-skill` | Create new bigpowers skills with proper structure |
| `spike-prototype` | Throw-away prototype for unknown spaces |
| `setup-environment` | Pre-install deps + configure tools |
| `guard-git` | Block destructive git, enforce Conventional Commits |
| `hook-commits` | Husky + lint-staged + prettier pre-commit |
| `wire-ci` | CI pipeline setup with templates + validation |
| `wire-observability` | Structured JSON logging + health checks |
| `deploy` | Build → verify → deploy → wait → smoke pipeline |
| `smoke-test` | Post-deploy health check against live URL |
| `publish-package` | npm/crates.io/PyPI/Homebrew publishing |
| `validate-contracts` | Schema + key-set + shape contract validation |
| `extract-design` | DESIGN.md from HTML prototype via Puppeteer |
| `align-grid` | Müller-Brockmann grid pages (niche) |
| `quick-fix` | Fast-path for trivial data-only fixes |

### Verify (13)
| Skill | Purpose |
|---|---|
| `fix-bug` | Orchestrator: investigate → diagnose → tdd → validate |
| `investigate-bug` | End-to-end bug: history → RCA → fix plan → bug file |
| `diagnose-root` | 4-phase RCA (repro → isolate → hypothesize → verify) |
| `validate-fix` | Prove fix works: re-run test, full suite, harden |
| `enforce-first` | F.I.R.S.T test quality rubric |
| `run-evals` | Eval-driven development |
| `security-review` | AI-powered security analysis of code changes |
| `trace-requirement` | Link story IDs → implementation |
| `inspect-quality` | Interactive QA session → specs/bugs/registry.yaml |
| `simulate-agents` | Mock user + auditor agents in fresh contexts |

### Release (2)
| Skill | Purpose |
|---|---|
| `commit-message` | (also in Build — critical-path) |
| `release-branch` | (also in Build — critical-path) |

### Sustain (15)
| Skill | Purpose |
|---|---|
| `session-state` | Track implementation decisions in state.yaml |
| `terse-mode` | Ultra-compressed communication (~75% token savings) |
| `compose-workflow` | Chain skills → custom workflow recipe |
| `delegate-task` | Single subagent with 2-stage review |
| `dispatch-agents` | Parallel subagents on independent tasks |
| `evolve-skill` | Benchmark-gated skill evolution |
| `stocktake-skills` | Sequential subagent batch audit |
| `run-benchmark` | Run skill quality benchmarks |
| `organize-workspace` | Clean disposable artifacts |
| `reset-baseline` | Restore clean state between runs |
| `migrate-spec` | Transform GSD/spec-kit/BMAD → bigpowers YAML |
| `visual-dashboard` | Browser-based project dashboard |
| `edit-document` | Restructure + tighten prose |
| `write-document` | BMAD methodology for technical docs (ADR, context maps) |
| `search-skills` | (also in Discover) |

---

## 3. The YAML Cockpit Architecture

### Runtime State: `specs/state.yaml`
```yaml
active_flow: build_epic | fix_bug | null
active_epic: e47
active_story: e47s01
bigpowers_version: 2.61.4
handoff:
  next_skill: plan-work
  context: "Human-readable what happened + what's next"
epic_cycle:
  step: 2
  story_bcps: 3
  story_risk: P2
bug_cycle:
  current_step: null
metrics:
  story_start: ISO8601
  story_end: ISO8601
  skill_timings:
    plan-work: {avg_seconds, calls, total_seconds}
release:
  version: 2.61.4
  ci_verified: true
active_decisions: {}
```

### Release Index: `specs/release-plan.yaml`
```yaml
release:
  version: 2.61.4
  codename: Deepening
  status: released
build_order: [e42, e47, e32, e33, e39, e48, ...]
epics:
  - id: e47
    title: Cross-Tool Skill Distribution
    wsjf: 4.3
    bcps: 9
    capsule_dir: epics/e47-cross-tool-distribution
    mode: capsule
    status: proposed
```

### Progress: `specs/execution-status.yaml`
```yaml
development_status:
  e01: done
  e01s01: done
  e47: backlog
  e47s01: backlog
```

### Epic Capsules: `specs/epics/eNN-slug/epic.yaml`
```yaml
id: e47
title: "Cross-Tool Skill Distribution"
wsjf: 4.3
bcps: 9
status: planned
stories:
  - id: e47s01
    bcp: 3
    title: "install.sh — global pi coverage"
    verify: bash scripts/install.sh --dry-run | grep -q 'pi →' && ...
    hard_gate: |
      Confirm before removing install_opencode()...
    description: |
      GIVEN ... WHEN ... THEN ...
```

---

## 4. The Sync Pipeline (`sync-skills.sh`)

The operational heart of bigpowers. One source, four targets:

```
skills/<name>/SKILL.md  (source of truth)
        │
        ├─→ .cursor/rules/<name>.mdc        (Cursor rules)
        ├─→ .gemini/extensions/bigpowers/
        │     ├── skills/<name>/SKILL.md     (Gemini Agent Skills)
        │     └── commands/<name>.toml       (Gemini Slash Commands)
        ├─→ .pi/skills/<name>/SKILL.md      (pi Agent Skills)
        ├─→ .pi/prompts/<name>.md           (pi Slash Commands)
        ├─→ opencode.json                   (project config)
        ├─→ skills-lock.json                (SHA-256 catalog)
        ├─→ SKILL-INDEX.md                  (auto-generated reference)
        └─→ README.md                       (skill-count badge update)
```

Key behaviors:
- Strips YAML frontmatter from body
- Concatenates REFERENCE.md after SKILL.md body
- Validates YAML frontmatter syntax post-generation
- Version-matches gemini-extension.json against package.json
- Prunes orphan .cursor rules whose skill directory was deleted
- Bash 3.2 compatible (macOS default — no `declare -A`)

---

## 5. Documentation Layering (Hierarchy of Truth)

| Level | Document | Role |
|-------|----------|------|
| Vision | `docs/PRINCIPLES.md` | 7-layer philosophical evolution |
| Conventions | `CONVENTIONS.md` | Git, code style, naming, tests |
| Context | `specs/tech-architecture/TECH_STACK_LATEST.md` | Stack, architecture, domain |
| Scope | `specs/product/SCOPE_LATEST.yaml` | In/out of scope |
| Vision | `specs/product/VISION_LATEST.yaml` | North star |
| Decisions | `specs/adr/` | Irreversible architectural choices |
| Roadmap | `specs/release-plan.yaml` + `specs/epics/` | WSJF-prioritized with BCP |
| Session | `specs/state.yaml` | Active flow, handoff.next_skill |
| Metrics | `specs/metrics/cycle-times.yaml` | BCP/hr velocity |
| Index | `SKILL-INDEX.md` | Auto-generated skill catalog |
| Style | `CONVENTIONS.md` | Code, testing, naming standards |

---

## 6. Reference Documentation (34 files in docs/references/)

Philosophical: uncle-bob.md, ousterhout.md, karpathy.md, pocock.md, akita.md, wasowski.md, bmad.md, gsd.md
Methods: bcp.md, bcp-plus.md, tdd.md, code-review.md, domain-probes.md, verification-patterns.md, verification-patterns-extended.md, context-engineering.md
Operational: orchestration.md, orchestration-modes.md, orchestration-state.md, gates.md, checkpoints.md, workflow-steps.md, workflow-artifacts.md
Tooling: git-integration.md, model-profiles.md, thinking-models.md, bigpowers-mcp.md, security-threats.md
External: spec-kit.md, superpowers.md, tea.md, agent-config-files-and-okf.md, okf.md

---

## 7. Key Design Decisions Discovered

### 7.1 "Three things in one" problem
Skills/, without discipline, conflate procedures, rules, and tools. This is the #1 design issue bigspec's architecture explicitly solves (constitution §B3: skill = procedure only).

### 7.2 Generated artifacts everywhere
Four generated artifact targets (.cursor, .gemini, .pi, website) mean the sync pipeline is chained to specific tool ecosystems. bigspec drops this: author in the portable Agent Skills format, ship as a plugin.

### 7.3 `_LATEST` suffix convention
bigpowers uses `_LATEST` on all mutable YAML files (SCOPE_LATEST.yaml, VISION_LATEST.yaml, etc.) — bigspec's B8 explicitly abolishes this in favor of OKF provenance fields.

### 7.4 Dual epic format
Some epics have both flat `e01.yaml` and capsule `e01-slug/` directories. Historical artifact, not a design goal. bigspec uses capsules only.

### 7.5 next_skill handoff chain
Genuine differentiator. Every critical-path skill writes `handoff.next_skill` → `specs/state.yaml` as its last action. Survives interruption. bigspec keeps this (architecture §1, "KEEP").

### 7.6 Skill naming convention
Verb-noun kebab-case (ADR-0001). Three documented exceptions: `terse-mode`, `visual-dashboard`, `grill-with-docs`. Skill names are treated as a public API — never renamed, only aliased.

### 7.7 BCP sizing
Pre-build story size (Fibonacci 1/2/3/5/8), derived from 6-step method. Stored at story level in release-plan.yaml and epic capsules. Velocity computed as BCP/hr post-land. bigspec keeps BCP but plans BCP-Plus (13-dimension native counting).

### 7.8 Model routing
Skills carry `model:` frontmatter (haiku | sonnet | opus) influencing which AI model handles the skill. Auto-generated into model-profiles.md. Light skills use haiku; heavy planning uses opus.

### 7.9 Countable story format
A 20-section structured spec template with maturity 1–5. Maturity 3 = "countable" (all sections present, counter runs cleanly). BCP sizing uses elements from the spec, not independent estimation.

---

## 8. What bigspec Already Decided to Change

From `bigspec/docs/architecture.md` §1 — the primitives on trial:

| bigpowers primitive | bigspec verdict |
|---|---|
| "Skill" = procedure + rule + tool | Purify: skill = procedure only |
| 74 skills as a feature | Drop count; target ~28 procedures |
| 6-phase PMBOK lifecycle | Replace with 5 fractal movements |
| 94% Gherkin self-compliance | Replace with outcome evals |
| 4-target sync pipeline | Author in portable format; ship as plugin |
| 27 reference docs | One constitution.md with footnotes |
| Uniform hard gates everywhere | Risk-tiered gates (P0–P3) |
| Dual epic format | Capsule only |
| `_LATEST` filename suffix | Abolished; use OKF provenance |
| MCP dependency | File cockpit first; MCP last |

---

## 9. Friction Points and Gaps (Relevant to bigspec)

### 9.1 Skill bloat
74 skills cover a lot of overlapping territory. Several are thin wrappers (verify-work = 4 known phases; quick-fix = skip TDD). ~15 skills are pure "orchestrators" that don't implement — they coordinate other skills.

### 9.2 Generated artifact fragility
The sync pipeline has hard-wired paths for Cursor (.cursor/rules), Gemini (.gemini/extensions), and pi (.pi/). Adding a new tool means editing sync-skills.sh. This is the single biggest source of accidental complexity.

### 9.3 Documentation sprawl
CONVENTIONS.md (268 lines) + CLAUDE.md (356 lines) + README.md (356 lines) + 34 reference docs. Much is repeated. Karpathy's principles are restated in multiple places.

### 9.4 Token budget pressure
The full SKILL.md catalog in a cursorrules file is massive (393K chars — see .cursorrules). Every tool ecosystem gets a copy. This is the primary motivation for bigspec's "progressive disclosure" approach.

### 9.5 Epic status dual-source
Both release-plan.yaml (status field) and execution-status.yaml (development_status) track story state. Conventions say "execution-status is SoT" but release-plan often drifts.

### 9.6 No automated test suite
Bigpowers is markdown + bash. Verification is through manual scripts (validate-specs-yaml.sh, audit-compliance.sh, golden suite). No `npm test` that runs automated assertions.

### 9.7 Story-level vs task-level BCP
BCP lives at story level in release-plan, but epic capsules mark individual tasks `bcp: N`. Conventions declare task-level `[BCP N]` illegal but it persists in practice.

---

## 10. Recommended Source Files for bigspec Seed Skills

These are the 5 seed skills bigspec needs at M0, with their bigpowers source:

| bigspec skill | bigpowers source | Key content to port |
|---|---|---|
| `survey-context` | skills/survey-context/SKILL.md | Bootstrap flow: read specs → map phase → recommend next |
| `elaborate-spec` | skills/elaborate-spec/SKILL.md | Dialogue: clarify → surface assumptions → write planning-context.yaml |
| `plan-work` | skills/plan-work/SKILL.md | Pre-flight → explore → draft steps → write capsule story + tasks |
| `develop-tdd` | skills/develop-tdd/SKILL.md | Red-green-refactor, tracer bullet, F.I.R.S.T, red flags table |
| `verify-work` | skills/verify-work/SKILL.md | Cold-start → build → typecheck → lint → test → UAT → gaps |

Supporting references to carry over:
- `docs/countable-story-format.md` — the 20-section spec template
- `docs/PRINCIPLES.md` — philosophical layers (condense to constitution footnotes)
- `docs/references/bcp.md` — 6-step sizing method
- `docs/references/okf.md` — OKF kind taxonomy
- `docs/references/gates.md` — 4 gate types + truth table
- `docs/references/orchestration.md` — 6-phase loop → 5 fractal movements

---

## 11. Verified File Counts

| Directory | Count |
|---|---|
| Total skills | 74 directories |
| Specs epics | 21 active epic capsules |
| Scripts | 47 files |
| Docs | 34 reference files + 8 main docs |
| Profiles | 4 stack profiles |
| Gherkin features | 7 .feature files |
| Done epics | 34 (e01–e40 inclusive) |
| Active/planned epics | 17 (e28–e49, minus gaps) |
| Total done stories | ~150 (from execution-status.yaml) |
