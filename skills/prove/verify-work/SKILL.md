---
name: verify-work
description: "Verify a story's checkpoints by its risk tier. Runs verify: commands from the tasks ledger, checks test coverage, type safety, and lint. Emits a verification report with pass/fail per checkpoint. Use after BUILD completes, before review, or when user asks 'is this done?'"
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: prove
verify: "all checkpoints PASSING; full test suite passes; typecheck and lint clean; verification report written"
---

# Verify Work

Prove the work is done by the story's risk tier. "I think it works" is not evidence.

## Pre-flight

Read the active story's `tasks.yaml` to get:
- Checkpoint list and their verify commands
- Risk tier (P0-P3) — this picks the verification depth

## Verification by risk tier

| Tier | Verification depth |
|------|-------------------|
| **P0** | Full: UAT scenarios + NFR gates + security scan + fresh-subagent review |
| **P1** | Full: build + test + lint + step-by-step UAT + review |
| **P2** | Full-light: smoke + typecheck + lint |
| **P3** | Fast: typecheck + lint only |

## Process

### 1. Run checkpoints

For each checkpoint in `tasks.yaml`, run its `verify_cmd`:
```bash
<verify_cmd>
```

- PASSING → mark as PASSING in ledger
- FAILING → return to BUILD (`develop-tdd` or `quick-fix`)

Do NOT proceed until ALL checkpoints pass in a single uninterrupted run.

### 2. Run full suite

```bash
npm test                # full suite — no filtering
npm run typecheck
npm run lint
```

- [ ] All tests pass (zero regressions)
- [ ] No type errors
- [ ] No lint violations

### 3. Harden against recurrence (P0-P2)

For every change shipped, add at least one prevention layer:

| Mechanism | When to use |
|-----------|-------------|
| Type guard | Input could be wrong shape |
| Schema validation | External data crossing boundary |
| Invariant assertion | Internal state must always hold |
| Lint rule | Pattern easy to repeat by mistake |

### 4. Write verification report

Create `specs/epics/<epic>/<story>-verify.md`:

```yaml
---
okf_kind: verification-report
okf_version: "1.0"
generated_by: "skill:verify-work"
generated_at: <iso-8601>
---
# Verification Report: [Story Title]

## Checkpoints
| Checkpoint | Status | Evidence |
|-----------|--------|----------|
| chk-01    | PASSING | [terminal output] |
| chk-02    | PASSING | [terminal output] |

## Suite
- Tests: N passed, 0 failed
- Typecheck: clean
- Lint: clean

## Hardening added
- [type guard / schema / assertion / lint rule]

## Risk tier: P1
Verification depth: full
Gate: QUALITY — PASSING
```

### 5. Write handoff

```yaml
handoff:
  next_skill: "audit-code"
  reason: "All checkpoints PASSING. Verification report written. Proceeding to self-audit."
```
