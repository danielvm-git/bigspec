---
name: using-bigspec
description: "One-time bootstrap that introduces the bigspec methodology — 5 fractal movements, OKF bundles, and the cockpit handoff. Use when starting with bigspec for the first time, when user asks 'where do I start?', or when the skills system needs to be explained."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: sustain
verify: "cockpit handoff.next_skill is set in specs/cockpit/state.yaml after execution"
---

# Using bigspec

Welcome to **bigspec** — a spec-driven methodology that turns intent into verified software through a 5-movement fractal loop and hard gates scaled by risk.

## What bigspec is

A curated set of 29 skills organized around the fractal loop: Frame → Specify → Plan → Build → Prove. Each skill maps to exactly one movement and references others by name only. All state lives in `specs/cockpit/state.yaml` (the cockpit), read and written via `bp-yaml` helpers. All artifacts are OKF bundles (YAML frontmatter + structured body).

## The loop at a glance

```
META       orchestrate-project → build-epic
              ↓
FRAME      survey-context → research-first → map-codebase → search-skills
              ↓
SPECIFY    elaborate-spec → grill → define-language → design-interface → define-acceptance
              ↓
PLAN       plan-work → count-bcp → assess-impact → order-release → seed-conventions
              ↓
BUILD      kickoff-branch → develop-tdd → delegate → spike-prototype → quick-fix
              ↓
PROVE      verify-work → audit-code → review → security-review → fix-bug → trace-requirement
              ↓
SUSTAIN    session-state  ·  terse-mode  ·  craft-skill  ·  run-evals  ·  compose-workflow
```

## Where to start

| Your situation | First skill to call |
|---------------|---------------------|
| Greenfield project, nothing set up | `seed-conventions` |
| Existing project, new task | `survey-context` |
| Vague idea that needs shaping | `elaborate-spec` |
| Plan exists, ready to implement | `kickoff-branch` → `develop-tdd` |
| Bug to fix | `fix-bug` |
| Code ready for review | `audit-code` |

## Key concepts

- **Cockpit (`specs/cockpit/state.yaml`).** Machine state: active epic/story, current movement, `handoff.next_skill`. Read first, write last.
- **OKF bundles.** Every artifact under `specs/` carries YAML frontmatter with `okf_kind`, `okf_version`, and provenance. Validated by `validate-okf`.
- **Risk tiers (P0-P3).** Set in PLAN; pick the verification lane. P0=critical (full gauntlet), P3=trivial (fast lane).
- **verify: every checkpoint.** Every task in a tasks ledger must have a `verify: <runnable command>`. Evidence over claims.
- **handoff.next_skill.** Every skill writes its next step to the cockpit before returning. A skill without a `next_skill` is incomplete.

## After this

Call `survey-context` to read your project's current state and get a personalized recommendation for where to go next.

## Write handoff

```yaml
handoff:
  next_skill: "survey-context"
  reason: "bigspec methodology introduced. Ready to survey project context."
```
