---
name: develop-tdd
description: "Test-driven development with RED-GREEN-REFACTOR loop using vertical slices. Drives checkpoints from FAILING to PASSING in the tasks ledger. Use when implementing features, fixing bugs with TDD, or driving checkpoints from a tasks.yaml ledger."
constitution_version: "1.1.0"
effort: heavy
spawn: subagent
risk: medium
movement: build
verify: "all checkpoints in the active story's tasks.yaml have transitioned from FAILING to PASSING; full test suite passes; no type/lint errors"
---

# Develop TDD

Drive checkpoints from FAILING to PASSING through test-driven development. Every checkpoint is one RED-GREEN cycle. Every commit is atomic.

## Pre-flight

> **HARD GATE** — Do NOT proceed if on `main` or `master`. Run `kickoff-branch` first.
> **HARD GATE** — Do NOT write code without a tasks ledger. Run `plan-work` first.

Read the active story's `tasks.yaml` to get the FAILING checkpoint list.

## Philosophy

**Vertical slices, not horizontal.** One checkpoint → one test → one implementation → repeat. Never write all tests first and all code later.

```
RIGHT (vertical):
  RED→GREEN: test1→impl1
  RED→GREEN: test2→impl2

WRONG (horizontal):
  RED:   test1, test2, test3
  GREEN: impl1, impl2, impl3
```

**Tests verify behavior through public interfaces**, not implementation details. A good test describes WHAT the system does; a bad test describes HOW. Good tests survive refactors.

## Red Flags

| Red Flag | Reality |
|----------|---------|
| "This is too simple to need tests." | Simple code is where bugs hide. |
| "I'll refactor this later." | "Later" is when debt becomes bankruptcy. |
| "I'm just fixing a small bug." | Small bugs often indicate deep interface flaws. |
| "I need to mock this internal class." | Mocking internals couples tests to implementation. |

## Workflow

### For each FAILING checkpoint in tasks.yaml:

### 1. RED — Write the test

Write a test that asserts the checkpoint's `intent` through the public interface. The test must fail (RED) — proving it catches the missing behavior.

### 2. GREEN — Minimal implementation

Write the minimum code to make the test pass. No more, no less. No speculative features. No anticipating future checkpoints.

### 3. COMMIT

```bash
git commit -m "feat(<scope>): <checkpoint description>"
```

### 4. Update ledger

Mark the checkpoint PASSING in `tasks.yaml`.

### 5. REFACTOR (after all checkpoints pass)

After all checkpoints are GREEN:
- Extract duplication
- Deepen modules (hide complexity behind simple interfaces)
- Apply SOLID where natural
- Run tests after each refactor step

## Per-cycle checklist

```
[ ] Test describes behavior, not implementation
[ ] Boundary conditions tested: empty, max, min, off-by-one
[ ] Tests verify through public interface only
[ ] Test would survive internal refactor
[ ] Code is minimal for this test
[ ] No speculative features added
[ ] Progress committed (Conventional Commits)
[ ] verify: command from tasks.yaml passes
```

## Mocking rules

Mock at **system boundaries only**: external APIs, databases (sometimes), time/randomness, filesystem (sometimes). Never mock your own classes/modules or internal collaborators.

## Write handoff

```yaml
handoff:
  next_skill: "verify-work"
  reason: "All checkpoints PASSING. Ready to verify by risk tier."
```
