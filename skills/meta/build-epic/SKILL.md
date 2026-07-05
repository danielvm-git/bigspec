---
name: build-epic
description: "Execute the per-story cycle: Kickoff → TDD → Verify → Review for each story in an epic's tasks ledger. Reads the epic's OKF tasks bundle, iterates through stories in dependency order, and updates the cockpit after each story ships. Use after plan-work has produced a tasks ledger for an epic."
constitution_version: "1.1.0"
effort: heavy
spawn: subagent
risk: medium
movement: meta
verify: "all checkpoints in the epic's tasks ledger have status PASSING, and cockpit active_story is empty (epic complete)"
---

# Build Epic

Execute every story in an epic sequentially, following the BUILD → PROVE cycle per story. This is the per-story loop driver — it reads the tasks ledger, dispatches the right skills, and tracks checkpoint transitions from FAILING to PASSING.

## Pre-flight

Read `specs/cockpit/state.yaml` to get `active_epic`. Read the epic's `tasks.yaml` to get the story list and current checkpoint states.

## Process

### 1. Pick next story

From `tasks.yaml`, select the first story with `status != 'done'` and no unfulfilled dependencies. Write it to the cockpit:
```yaml
active_story: "specs/epics/<epic>/<story>.md"
```

### 2. Execute BUILD movement per story

For each story, run the BUILD lane dictated by its risk tier:

**P0-P2 (full lane):**
1. `kickoff-branch` — create isolated worktree + verify baseline
2. `develop-tdd` — RED-GREEN-REFACTOR per checkpoint
3. `delegate` (optional) — offload heavy sub-tasks to subagents
4. `spike-prototype` (optional) — validate unknowns before committing

**P3 (fast lane):**
1. `quick-fix` — minimal change + typecheck + lint

### 3. Verify each checkpoint

After BUILD, run `verify-work` scoped to the story's risk tier:
- Run the `verify:` command for each checkpoint in `tasks.yaml`
- Mark checkpoints that pass as PASSING
- Loop on FAILING checkpoints until all are green
- Write updated status back to `tasks.yaml`

### 4. Run PROVE movement per story

1. `audit-code` — self-review checklist
2. `review` — fresh-context subagent review (for P0-P2)
3. `security-review` — STRIDE analysis (P0-P1 only)
4. `trace-requirement` — link story to code and tests

### 5. Advance to next story

After PROVE passes for the current story:
1. Update `tasks.yaml`: mark story as `status: done`
2. Write cockpit: `active_story: "<next story>"`
3. Repeat from step 2

### 6. Epic complete

When all stories are done:
```yaml
active_story: ""  # empty — epic complete
current_movement: "PROVE"
handoff:
  next_skill: "orchestrate-project"
  reason: "Epic complete. Cockpit ready for next epic."
```

## Gate enforcement per story

| Gate | Story complete? |
|------|----------------|
| **Quality** | All checkpoints PASSING; review clean (P0-P2) |
| **Completeness** | No BLOCKER from gap critic |

## Error handling

If a story's checkpoint stays FAILING after 3 TDD cycles:
1. Write a note to the cockpit under `handoff.open_decisions`
2. Block and ask for human input
3. Do not skip to the next story — stories are sequential by design
