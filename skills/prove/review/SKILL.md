---
name: review
description: "Two-stage code review: self-audit (audit-code) then fresh-context subagent review (request-review) with systematic feedback handling (respond-review). The external reviewer has no shared state — a genuine second opinion. Use after verify-work, before merge, or when code is ready for review."
constitution_version: "1.1.0"
effort: heavy
spawn: subagent
risk: medium
movement: prove
verify: "review complete; all must-fix and should-fix findings resolved; quality gate passes per risk tier"
---

# Review

Two-stage review gate. Stage 1 is internal (`audit-code`); Stage 2 is external (fresh-context subagent). The external reviewer has no shared state — a genuine second opinion.

## Pre-flight

> **HARD GATE** — Run `audit-code` first. Don't waste a reviewer's attention on hygiene issues you could catch yourself.

## Stage 1: Self-audit

Run `audit-code`. All checklist items must pass before proceeding to Stage 2.

## Stage 2: External review

### 1. Prepare review brief

Write a self-contained brief for the reviewer subagent:
- What was built (feature description, not implementation)
- Which files changed
- What specs/artifacts are relevant
- What constitution rules apply
- What the verify command is
- What you're most uncertain about

### 2. Dispatch reviewer

Use `delegate_task` with a fresh context. The reviewer prompt must be self-contained — no references to "our conversation."

Review for:
1. Correctness — does it do what was intended?
2. Constitution compliance — are all rules followed?
3. Test quality — do tests verify behavior (not implementation)?
4. Design — simpler or more robust approaches?
5. Edge cases — what inputs/states could cause failures?
6. Security — injection, auth, or data exposure risks? (P0-P1 only)

Categorize each finding: **must-fix** / **should-fix** / **consider**.

### 3. Process findings

| Category | Action |
|----------|--------|
| **must-fix** | Correctness bug, security issue, test failure, constitution violation → Fix before proceeding |
| **should-fix** | Code quality, naming, clarity → Fix if time allows |
| **consider** | Architectural suggestion → Discuss with user |

### 4. Apply fixes

Fix every must-fix item. Apply should-fix items. After all changes:
```bash
npm test
npm run typecheck
npm run lint
```

### 5. Report

```
Applied (must-fix): #1, #2
Applied (should-fix): #3
Skipped (consider): #4 — deferred
All tests pass. Review gate: PASSING.
```

## Write handoff

```yaml
handoff:
  next_skill: "security-review"   # for P0-P1; otherwise "trace-requirement"
  reason: "Review complete. All findings resolved."
```
