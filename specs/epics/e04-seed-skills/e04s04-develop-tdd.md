---
okf_kind: story
okf_version: "1.0"
generated_by: "skill:elaborate-spec"
generated_at: 2026-07-06T13:26:00Z
supersedes: null
commit_range: null
---
# Story: develop-tdd (build)

## 1. Context & Goal
The BUILD movement drives checkpoints from FAILING to PASSING via vertical-slice TDD
(RED → GREEN → REFACTOR). This is the core execution skill for all kernel and feature
work. A draft exists at `skills/build/develop-tdd/SKILL.md`; this story hardens hard
gates (no main, no code without tasks ledger), F.I.R.S.T inline guidance, and ledger
update protocol.

## 2. Target Users / Actors
- **Orchestrating agent** — executes BUILD on a feature branch with an active tasks ledger.
- **verify-work skill** — downstream; expects all checkpoints PASSING before prove lane.
- **kickoff-branch skill** — mandatory predecessor when on main/master.

## 3. Elements (Data, UI, Interfaces, Logic)
- **Skill file**: `skills/build/develop-tdd/SKILL.md` — `movement: build`; `spawn: subagent`, `effort: heavy`.
- **Hard gates in skill body**: must not proceed on main; must not write code without tasks.yaml.
- **Vertical slice workflow**: for each FAILING checkpoint — RED test → GREEN minimal impl → commit → mark PASSING in ledger.
- **Red flags table**: retained and aligned with constitution B2 (no "too simple to test").
- **Mocking rules**: system boundaries only; never mock internal collaborators.
- **Handoff**: `next_skill: verify-work` when all checkpoints PASSING.
- **skill-lint extension**: build skills must document kickoff-branch gate and ledger update step.
- **Tests**: skill-lint for develop-tdd; integration test that skill-lint rejects skills missing hard gates.

## 4. Non-Functional Requirements (NFRs)
- Tests assert behavior through public interfaces (B5 / F.I.R.S.T).
- Commits follow Conventional Commits (constitution Part III).
- Risk tier **P1** — mutates codebase and shared modules; full prove lane when this skill is the deliverable.
- Provisional M0 banner retained.

## 5. Acceptance Criteria (Gherkin)
Scenario: develop-tdd passes skill-lint
  Given the hardened skill at skills/build/develop-tdd/SKILL.md
  When I run `npm run skill-lint -- develop-tdd`
  Then it exits 0

Scenario: skill documents main-branch hard gate
  Given the develop-tdd SKILL.md pre-flight section
  When I read the hard gates
  Then it states not to proceed on main or master
  And it references kickoff-branch as the remediation

Scenario: skill documents vertical slice workflow
  Given the develop-tdd workflow section
  When I read the per-checkpoint loop
  Then it lists RED, GREEN, COMMIT, and update ledger steps in that order
  And it forbids writing all tests before all implementation

Scenario: skill documents red flags
  Given the develop-tdd SKILL.md
  When I read the red flags section
  Then it includes at least "too simple to need tests" as a named anti-pattern

Scenario: verify field is behavioral
  Given the develop-tdd frontmatter verify field
  When skill-lint inspects it
  Then it asserts checkpoints transition FAILING to PASSING
  And it does not contain "test -f SKILL.md"
