---
name: kickoff-branch
description: "Create an isolated git worktree and feature branch, then verify a clean test baseline before any code is written. Use when starting a new feature, when user wants to work in isolation from main, or mentions 'start a branch' or 'new worktree'."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: build
verify: "new worktree exists on a feature branch; full test suite passes in the new worktree; cockpit handoff.next_skill points to develop-tdd or quick-fix"
---

# Kickoff Branch

Create an isolated working environment before touching any code. A clean baseline proves tests pass before you start — so any failure later was caused by your changes.

## Pre-flight

> **HARD GATE** — Direct work on `main` or `master` is PROHIBITED. Every task MUST start with this skill (unless already on a feature branch).

## Process

### 1. Confirm task name

The branch name slug: kebab-case, max 40 chars. Derive from the active story id (e.g., `e03s01-bp-yaml`).

### 2. Check current state

```bash
git status          # ensure working tree is clean
git log --oneline -5  # confirm base branch
```

If working tree is dirty, stash or commit first.

### 3. Pre-flight conflict check

```bash
ls -d ../<task-slug> 2>/dev/null     # existing directory?
git branch --list <task-slug>         # existing branch?
git worktree list | grep "<task-slug>" # ghost worktree?
```

Handle conflicts:
- Directory exists → ask user (use or delete)
- Branch exists → use existing (`git worktree add ../<task-slug> <task-slug>`) or delete
- Ghost worktree → `git worktree prune`

### 4. Create worktree + branch

```bash
git worktree add ../<task-slug> -b <task-slug>
cd ../<task-slug>
```

### 5. Verify clean baseline

Run the full test suite:
```bash
npm test
npm run typecheck   # or equivalent
npm run lint        # or equivalent
```

- [ ] All tests pass
- [ ] No type errors
- [ ] No lint errors

If baseline is broken, **stop**. Report the broken tests before proceeding.

### 6. Confirm readiness

```
✓ Baseline clean: N tests passed, 0 failed
Branch: <task-slug>
Worktree: ../<task-slug>
Ready to develop.
```

### 7. Write handoff

```yaml
handoff:
  next_skill: "develop-tdd"   # or "quick-fix" for P3
  reason: "Worktree ready. Clean baseline confirmed."
```
