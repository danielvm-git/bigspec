---
name: survey-context
description: "Per-task context survey — reads the cockpit state, OKF bundles, and constitution to map the current movement and suggest the next skill to invoke. Use at the start of any new task, when returning to a project after a break, or when unsure what to do next."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: frame
verify: "handoff.next_skill is written to specs/cockpit/state.yaml with a movement-appropriate recommendation"
---

# Survey Context

Read the project's current state and give a movement map + next-skill recommendation. This is the "where am I?" skill — run it at the start of every task.

## Process

### 1. Read constitution

Read `constitution.md`. It contains B0-B10 rules, risk tiers (P0-P3), and conventions that all agents must follow.

### 2. Read the cockpit

Read `specs/cockpit/state.yaml`:
- `active_epic` — which epic is active?
- `active_story` — which story (if any)?
- `current_movement` — where in the loop are we?
- `handoff.next_skill` — what was the last skill?
- `handoff.context_pointers` — what specs are relevant?

### 3. Scan the active epic

If `active_epic` is set, read its `epic.yaml` and any associated `tasks.yaml` to understand story statuses and checkpoints.

### 4. Check git state

```bash
git status --short
git log --oneline -5
git branch --show-current
```

Note active branch, uncommitted changes, and recent history.

### 5. Map the current movement

Based on cockpit + git state:

| Movement | Signals |
|----------|---------|
| **FRAME** | No spec files for active story; only rough notes or research |
| **SPECIFY** | Domain language exists but no story bundle |
| **PLAN** | Story exists but no tasks ledger or BCP count |
| **BUILD** | Tasks ledger has FAILING checkpoints; on feature branch |
| **PROVE** | All checkpoints PASSING; review pending |
| **Sustain** | No active story; ongoing maintenance |

### 6. Suggest next skill

Based on movement and state, recommend the exact next skill:
- **FRAME**: `research-first` or `define-language`
- **SPECIFY**: `elaborate-spec` or `grill`
- **PLAN**: `plan-work` or `count-bcp`
- **BUILD**: `kickoff-branch` (if on main) or `develop-tdd`
- **PROVE**: `verify-work` or `audit-code`

Be specific — name the exact skill and why. If multiple options, list in priority order.

### 7. Surface blockers

If something looks wrong:
- Broken test baseline on the active branch
- FAILING checkpoints on a story marked as done
- Cockpit pointing to a missing spec file
- Constitution violations in recent commits

Report blockers first, before recommendations.

### 8. Write handoff

Update `specs/cockpit/state.yaml`:
```yaml
handoff:
  next_skill: "<recommended skill>"
  reason: "<one-line summary>"
```
