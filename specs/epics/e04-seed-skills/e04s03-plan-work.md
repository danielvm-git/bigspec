---
okf_kind: story
okf_version: "1.0"
generated_by: "skill:elaborate-spec"
generated_at: 2026-07-06T13:26:00Z
supersedes: null
commit_range: null
---
# Story: plan-work (plan)

## 1. Context & Goal
The PLAN movement decomposes a validated story into an OKF `tasks` ledger with
FAILING checkpoints — the input contract for `develop-tdd` and `verify-work`.
A draft exists at `skills/plan/plan-work/SKILL.md`; this story hardens it against
okf-spine tasks shape and P0–P3 risk-tier assignment rules (B5).

## 2. Target Users / Actors
- **Orchestrating agent** — runs after a story bundle exists; produces executable ledger.
- **develop-tdd skill** — consumes checkpoints with runnable `verify_cmd` values.
- **count-bcp skill** — optional next step after tasks ledger (handoff default).

## 3. Elements (Data, UI, Interfaces, Logic)
- **Skill file**: `skills/plan/plan-work/SKILL.md` — `movement: plan`.
- **Output artifact**: `specs/epics/<epic>/<story>-tasks.yaml` with `okf_kind: tasks`, `risk_tier`, `checkpoints[]`, `gates[]`.
- **Checkpoint contract**: each checkpoint has `id`, `intent`, `verify_cmd`, `status: FAILING` at creation.
- **Pre-flight gates in skill body**: ambiguity check (→ grill), impact check (→ assess-impact) before writing plan.
- **Risk tier table**: P0–P3 criteria and lane selection documented inline (reference constitution, do not restate full B5).
- **skill-lint extension**: plan skills must reference tasks ledger path pattern and FAILING initial status.
- **Tests**: skill-lint for plan-work; sample tasks fixture validates via validate-okf.

## 4. Non-Functional Requirements (NFRs)
- Every checkpoint maps to at least one Gherkin scenario in the source story (B4).
- No task-level BCP tags — BCP lives at story level only (B9).
- Risk tier **P2** — planning only; checkpoints start FAILING.
- Provisional M0 banner retained.

## 5. Acceptance Criteria (Gherkin)
Scenario: plan-work passes skill-lint
  Given the hardened skill at skills/plan/plan-work/SKILL.md
  When I run `npm run skill-lint -- plan-work`
  Then it exits 0

Scenario: skill documents tasks ledger shape
  Given the plan-work SKILL.md write step
  When I read the tasks ledger template
  Then it includes okf_kind tasks frontmatter
  And it includes checkpoints with id, intent, verify_cmd, and status FAILING
  And it includes a risk_tier field

Scenario: skill documents pre-flight ambiguity gate
  Given the plan-work SKILL.md pre-flight section
  When the story admits two or more interpretations
  Then the skill instructs stopping and running grill first

Scenario: verify field is behavioral
  Given the plan-work frontmatter verify field
  When skill-lint inspects it
  Then it asserts tasks.yaml existence and FAILING checkpoints
  And it does not contain "test -f SKILL.md"

Scenario: e04s01 tasks ledger is valid exemplar
  Given specs/epics/e04-seed-skills/e04s01-tasks.yaml
  When I run validate-okf on it
  Then it exits 0 with checkpoints and gates present
