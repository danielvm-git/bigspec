---
name: session-state
description: "Track implementation decisions and progress in the cockpit to prevent context rot across sessions. Updates cockpit state with decisions, milestones, and open questions. Use at session start to load context, and whenever a significant decision is made or milestone reached."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: sustain
verify: "cockpit state.yaml reflects current git branch/hash, active decisions, and completed milestones"
---

# Session State

Track current state across sessions to prevent context rot. The cockpit (`specs/cockpit/state.yaml`) is the single source of truth — complementing the long-term memory of OKF bundles and the task-specific instructions in tasks ledgers.

## Process

### 1. Load (session start)

When starting a new session:
- Read `specs/cockpit/state.yaml`
- Verify current state matches actual codebase: `git branch --show-current`, `git rev-parse HEAD`
- Surface discrepancies between recorded git hash and current hash

### 2. Update (decision point / milestone)

Whenever a significant decision is made or milestone reached:
- Update `current_movement` if the movement has changed
- Update `handoff.next_skill` to the next step
- Add any new context pointers under `handoff.context_pointers`
- Record open decisions under `handoff.open_decisions`
- Update git metadata under `handoff.last_step_completed`

## Cockpit update format

```yaml
handoff:
  next_skill: "develop-tdd"
  reason: "Story e03s01: bp-yaml get/set. Checkpoint chk-03 FAILING → PASSING."
  last_step_completed: "chk-03: set writes back preserving other keys + frontmatter — 11 tests passing"
  context_pointers:
    - "specs/epics/e03-kernel/e03s01-bp-yaml.md"
    - "specs/epics/e03-kernel/e03s01-tasks.yaml"
  open_decisions:
    - "Should bp-yaml support array indexing? Deferred to e03s02."
```

## Anti-patterns

- **Duplicate the tasks ledger**: The state is actual progress; the ledger is the plan. Don't copy the plan into the cockpit.
- **Stale state**: Forgetting to update after a major refactor or decision.
- **Verbose history**: Keep it focused on current state. Use git history for the past.

## Write handoff

After updating cockpit:
```yaml
handoff:
  next_skill: "<current skill being orchestrated>"
  reason: "Cockpit state updated."
```
