---
okf_kind: story
okf_version: "1.0"
generated_by: "skill:elaborate-spec"
generated_at: 2026-07-06T13:26:00Z
supersedes: null
commit_range: null
---
# Story: elaborate-spec (specify)

## 1. Context & Goal
The SPECIFY movement turns rough intent into a durable OKF `story` bundle (okf-spine §3).
Without `elaborate-spec`, agents write ad-hoc markdown that fails `validate-okf` and cannot
feed `count-bcp`. A draft exists at `skills/specify/elaborate-spec/SKILL.md`; this story
aligns it with bigspec's OKF story contract and extends `skill-lint` with specify-movement
checks.

## 2. Target Users / Actors
- **Orchestrating agent** — receives vague user intent; must produce a validated story bundle.
- **plan-work skill** — downstream consumer of the story's five sections and Gherkin block.
- **validate-okf (kernel)** — gate on story envelope + section structure.

## 3. Elements (Data, UI, Interfaces, Logic)
- **Skill file**: `skills/specify/elaborate-spec/SKILL.md` — `movement: specify`.
- **Output artifact**: `specs/epics/<epic>/<story>.md` with `okf_kind: story` and sections 1–5 per okf-spine §3.
- **Process**: listen → clarifying questions → surface assumptions (≥2 readings if ambiguous) → synthesize story → run `validate-okf` → write handoff (`next_skill: grill` or `define-acceptance`).
- **Explicit non-goals in skill body**: no code; no pre-partitioning into BCP dimensions; no gestalt SIZE field.
- **skill-lint extension**: verify specify skills reference okf-spine §3 story contract and `validate-okf` in process.
- **Tests**: skill-lint golden cases for elaborate-spec; fixture story bundle passes validate-okf.

## 4. Non-Functional Requirements (NFRs)
- Behavioral `verify:` asserts a valid story bundle was emitted, not that SKILL.md exists.
- Dialogue steps are progressive disclosure — summary before detail (B0).
- Risk tier **P2** — produces specs only; no runtime mutation beyond cockpit handoff.
- Provisional M0 banner retained.

## 5. Acceptance Criteria (Gherkin)
Scenario: elaborate-spec passes skill-lint
  Given the hardened skill at skills/specify/elaborate-spec/SKILL.md
  When I run `npm run skill-lint -- elaborate-spec`
  Then it exits 0

Scenario: skill references OKF story contract
  Given the elaborate-spec SKILL.md process section
  When I read the synthesize step
  Then it names all five story sections (Context, Actors, Elements, NFRs, Acceptance Criteria)
  And it instructs running validate-okf on the output

Scenario: skill forbids code and BCP pre-partitioning
  Given the elaborate-spec SKILL.md
  When I read the explicit constraints
  Then it states no code is written during this skill
  And it states elements must not be pre-partitioned into BCP dimensions

Scenario: verify field is behavioral
  Given the elaborate-spec frontmatter verify field
  When skill-lint inspects it
  Then it asserts a valid okf_kind:story bundle path pattern
  And it does not contain "test -f SKILL.md"

Scenario: example story fixture validates
  Given specs/epics/e04-seed-skills/e04s01-survey-context.md as exemplar output
  When I run `npm run validate-okf -- specs/epics/e04-seed-skills/e04s01-survey-context.md`
  Then it exits 0 with no errors on required story fields
