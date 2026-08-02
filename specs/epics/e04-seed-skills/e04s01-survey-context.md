---
okf_kind: story
okf_version: "1.0"
generated_by: "skill:elaborate-spec"
generated_at: 2026-07-06T13:26:00Z
supersedes: null
commit_range: null
---
# Story: survey-context (frame)

## 1. Context & Goal
The fractal loop cannot resume after interruption unless an agent can read machine
state and write `handoff.next_skill`. `survey-context` is the first seed skill (M0)
— the FRAME movement entry point. A draft exists at
`skills/frame/survey-context/SKILL.md`; this story hardens it to constitution B3/B7
standards and introduces `skill-lint`, a kernel validator that every subsequent seed
skill story reuses.

Architecture §10: M0 seed skills are **provisional** until M1 evals (e05). Mark
the skill body accordingly; do not claim eval-proven quality.

## 2. Target Users / Actors
- **Orchestrating agent** — runs at task start or after a break; needs movement map + next skill.
- **Solo developer** — reads the same cockpit the skill mutates; handoff must use `bp-yaml set`, never ad-hoc string edits.
- **skill-lint (kernel)** — deterministic gate for SKILL.md structure; consumed by verify-work in later stories.

## 3. Elements (Data, UI, Interfaces, Logic)
- **Skill file**: `skills/frame/survey-context/SKILL.md` — Agent Skills format; `movement: frame`.
- **Required frontmatter**: `name`, `description`, `constitution_version`, `effort`, `spawn`, `risk`, `movement`, behavioral `verify:` (never `test -f SKILL.md`).
- **Process steps**: read constitution → read cockpit via `bp-yaml get` → scan active epic → check git state → map movement → recommend next skill → surface blockers → write handoff via `bp-yaml set`.
- **Handoff contract**: last section writes `handoff.next_skill` and `handoff.reason` to `specs/cockpit/state.yaml` using `bp-yaml set`.
- **Provisional banner**: body note that skill is M0 bootstrap, subject to M2 re-derivation under eval.
- **Kernel module**: `kernel/src/skill-lint.ts` + CLI — validates a named skill's frontmatter, movement/directory alignment, behavioral verify, and handoff section presence.
- **Tests**: vitest suite for skill-lint; `survey-context` is the first golden skill fixture.

## 4. Non-Functional Requirements (NFRs)
- Skill references constitution; never restates B0–B10 rules inline (B3).
- `verify:` asserts behavioral outcome (cockpit handoff written), not file existence (ADR-0005).
- skill-lint errors name the offending field + remediation hint (B1).
- Risk tier **P2** — read-mostly procedure; full-light prove lane.
- No network; no MCP dependency (constitution MVP rule).

## 5. Acceptance Criteria (Gherkin)
Scenario: survey-context passes skill-lint
  Given the draft skill at skills/frame/survey-context/SKILL.md
  When I run `npm run skill-lint -- survey-context`
  Then it exits 0 and reports all structural checks PASSING

Scenario: skill-lint rejects tautological verify
  Given a SKILL.md whose verify field is "test -f SKILL.md"
  When skill-lint validates it
  Then it exits non-zero and names the tautological verify as the failure

Scenario: skill-lint enforces movement/directory alignment
  Given a skill named survey-context with movement frame
  When its file lives under skills/frame/survey-context/
  Then skill-lint confirms movement matches the directory

Scenario: survey-context documents bp-yaml handoff write
  Given the hardened survey-context SKILL.md
  When an agent follows the Write handoff section
  Then it uses `bp-yaml set specs/cockpit/state.yaml handoff.next_skill <value>`
  And it uses `bp-yaml set specs/cockpit/state.yaml handoff.reason <value>`

Scenario: provisional banner present
  Given the hardened survey-context SKILL.md
  When I read the skill body
  Then it states the skill is M0 provisional bootstrap content
