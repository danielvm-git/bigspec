---
name: orchestrate-project
description: "Drive the 5-movement fractal loop (Frame→Specify→Plan→Build→Prove) with hard gates scaled by risk. Reads the cockpit state, dispatches per-movement skills, enforces Confirm/Risk/Quality/Completeness gates, and writes handoff.next_skill after each phase. Use to coordinate a full epic lifecycle."
constitution_version: "1.1.0"
effort: heavy
spawn: subagent
risk: medium
movement: meta
verify: "cockpit state shows current_movement advancing and handoff.next_skill targeting the correct next skill after each phase gate passes"
---

# Orchestrate Project

Coordinate a full project or epic through the 5-movement fractal loop with hard gates. This is the autopilot — it reads the cockpit, dispatches the right skill for each movement, enforces gates, and writes the handoff.

## The loop

```
FRAME → SPECIFY → PLAN → BUILD → PROVE → (ship)
```

Each movement runs at epic and story scope. The spec is the invariant across all movements.

## Process

### 1. Orient

Read `specs/cockpit/state.yaml` via `bp-yaml get`. Identify:
- `active_epic` and `active_story` — what are we working on?
- `current_movement` — where are we now?
- `handoff.next_skill` — what was the last skill that ran?

### 2. Execute current movement

Based on `current_movement`:

| Movement | Primary skills to dispatch |
|----------|---------------------------|
| **FRAME** | `survey-context` → `research-first` → `map-codebase` → `search-skills` |
| **SPECIFY** | `elaborate-spec` → `grill` → `define-language` → `design-interface` → `define-acceptance` |
| **PLAN** | `plan-work` → `count-bcp` → `assess-impact` → `order-release` → `seed-conventions` |
| **BUILD** | `kickoff-branch` → `develop-tdd` → `delegate` → `spike-prototype` (or `quick-fix` for P3) |
| **PROVE** | `verify-work` → `audit-code` → `review` → `security-review` → `fix-bug` → `trace-requirement` |

### 3. Enforce movement gates

After each movement completes, check the relevant gate type before advancing:

| Movement | Gate | Checks |
|----------|------|--------|
| Frame | **Confirm** | Problem understood? User approves? |
| Specify | **Confirm + Quality** | Spec validated? OKF envelope correct? |
| Plan | **Risk + Quality** | P0-P3 tier assigned? BCP counted? |
| Build | **Quality** | Tests pass? Checkpoints green? |
| Prove | **Quality + Completeness** | Verification report clean? Gap critic finds no BLOCKER? |

### 4. Write handoff

After every movement, update `specs/cockpit/state.yaml`:
```yaml
current_movement: "<next movement>"
handoff:
  next_skill: "<next skill name>"
  reason: "<one-line summary of what happened>"
```

### 5. Pause for confirmation

After Frame, Specify, and Plan, pause for user confirmation:
- "Ready to proceed to [next movement]?"
- On no: stay in current movement, iterate.

## Gate types

| Gate | Blocks until | Used at |
|------|-------------|---------|
| **Confirm** | user explicitly approves | end of Frame / Specify / Plan |
| **Risk** | story tagged P0-P3 | end of Plan (picks the lane) |
| **Quality** | risk-tier verification passes; review clean | end of Build / Prove |
| **Completeness** | adversarial gap-critic finds no BLOCKER | before merge |

## Fast lane (P3)

P3 stories skip heavy gates: `quick-fix` replaces `develop-tdd`, verification is typecheck+lint only. The cockpit records the tier; gate enforcement follows it.

## Error recovery

If a skill fails:
1. Read the error from the cockpit or tool output
2. Route to the appropriate remediation skill (`fix-bug` for code errors, `grill` for design ambiguity)
3. Re-run the failed movement after remediation
