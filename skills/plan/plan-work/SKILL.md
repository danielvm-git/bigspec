---
name: plan-work
description: "Decompose a story into an implementation plan with failing checkpoints and a P0-P3 risk tier. Output is an okf_kind:tasks ledger where every checkpoint has an intent + runnable verify: command. Use after define-acceptance, before any code, or when a story needs a detailed implementation plan."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: plan
verify: "tasks.yaml exists as a valid okf_kind:tasks bundle; every checkpoint has a runnable verify: command; story has a P0-P3 risk tier"
---

# Plan Work

Decompose a story into the smallest verifiable checkpoints. Every checkpoint starts FAILING and transitions to PASSING during BUILD. The output is an OKF `tasks` ledger.

## Pre-flight

Read:
- The story bundle (§1-5)
- The domain glossary (for entity/role context)
- The cockpit for risk tier guidance

**Ambiguity check**: if the story's acceptance criteria admit ≥2 interpretations, stop and run `grill` first. Do not write a plan against an ambiguous spec.

**Impact check**: if this story touches an existing module, run `assess-impact` first.

## Process

### 1. Decompose into checkpoints

Break the story into the smallest verifiable units where each:
- Has exactly one observable outcome
- Can be verified with a single runnable command
- Leaves the codebase in a working state after completion
- Maps to at least one acceptance criterion from the story

### 2. Assign risk tier

| Tier | Criteria | Picks lane |
|------|----------|------------|
| **P0** | Auth, money, data loss, security | full (UAT + NFR + security + review) |
| **P1** | Core business logic, shared modules | full |
| **P2** | UI, config, non-critical features | full-light |
| **P3** | Docs, trivial data-only changes | fast |

### 3. Write tasks ledger

Create `specs/epics/<epic>/<story>-tasks.yaml`:

```yaml
---
okf_kind: tasks
okf_version: "1.0"
generated_by: "skill:plan-work"
generated_at: <iso-8601>
---
# Execution Ledger for [Story Title]
risk_tier: P1

checkpoints:
  - id: chk-01
    intent: "[what this checkpoint verifies]"
    verify_cmd: "[runnable command]"
    status: FAILING

  - id: chk-02
    intent: "[what this checkpoint verifies]"
    verify_cmd: "[runnable command]"
    status: FAILING
```

### 4. Verify step formats

Every checkpoint MUST follow:
```yaml
- id: chk-NN
  intent: "one-sentence description of the behavioral assertion"
  verify_cmd: "runnable command that exits 0 on pass"
  status: FAILING
```

### 5. Write handoff

```yaml
handoff:
  next_skill: "count-bcp"
  reason: "Tasks ledger written with FAILING checkpoints. Proceeding to BCP sizing."
```
