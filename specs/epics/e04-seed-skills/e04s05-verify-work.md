---
okf_kind: story
okf_version: "1.0"
generated_by: "skill:elaborate-spec"
generated_at: 2026-07-06T13:26:00Z
supersedes: null
commit_range: null
---
# Story: verify-work (prove)

## 1. Context & Goal
The PROVE movement runs checkpoint verify commands, full suite, typecheck, lint, and
emits an OKF `verification-report` scoped to the story's P0–P3 risk tier. This closes
the seed-skill loop started by survey-context. A draft exists at
`skills/prove/verify-work/SKILL.md`; this story hardens tier-scoped verification depth
and the verification-report template from okf-spine.

## 2. Target Users / Actors
- **Orchestrating agent** — runs after BUILD; must not self-report "done" without evidence.
- **audit-code / review skills** — downstream prove-chain consumers.
- **Gate engine (kernel)** — verification-report feeds QUALITY gate state.

## 3. Elements (Data, UI, Interfaces, Logic)
- **Skill file**: `skills/prove/verify-work/SKILL.md` — `movement: prove`.
- **Inputs**: active story's `tasks.yaml` (checkpoints + risk_tier).
- **Verification depth table**: P0 full + security; P1 full; P2 full-light; P3 fast — documented inline.
- **Output artifact**: `specs/epics/<epic>/<story>-verify.md` with `okf_kind: verification-report`.
- **Process**: run each verify_cmd → full suite → typecheck → lint → hardening note (P0–P2) → write report → handoff to audit-code.
- **Loop-back rule**: any FAILING checkpoint returns to develop-tdd or quick-fix; no proceed on partial pass.
- **skill-lint extension**: prove skills must reference verification-report template and risk-tier table.
- **Tests**: skill-lint for verify-work; verification-report fixture validates structure.

## 4. Non-Functional Requirements (NFRs)
- Evidence is terminal output in the report, not agent assertion (B4 / B6).
- Risk tier **P1** — prove skill is load-bearing for all stories; full lane.
- Hardening against recurrence required for P0–P2 changes (type guard, schema, lint rule).
- Provisional M0 banner retained.

## 5. Acceptance Criteria (Gherkin)
Scenario: verify-work passes skill-lint
  Given the hardened skill at skills/prove/verify-work/SKILL.md
  When I run `npm run skill-lint -- verify-work`
  Then it exits 0

Scenario: skill documents risk-tier verification depth
  Given the verify-work SKILL.md verification table
  When I read the tier rows
  Then P0 includes security scan and fresh-subagent review
  And P3 is limited to typecheck and lint

Scenario: skill documents verification-report output
  Given the verify-work write report step
  When I read the template
  Then it specifies okf_kind verification-report frontmatter
  And it includes checkpoints table, suite summary, and gate state

Scenario: skill documents loop-back on failure
  Given the verify-work checkpoint run step
  When a verify_cmd fails
  Then the skill instructs returning to develop-tdd or quick-fix
  And it forbids proceeding until all checkpoints pass in one run

Scenario: verify field is behavioral
  Given the verify-work frontmatter verify field
  When skill-lint inspects it
  Then it asserts checkpoints PASSING and verification report written
  And it does not contain "test -f SKILL.md"
