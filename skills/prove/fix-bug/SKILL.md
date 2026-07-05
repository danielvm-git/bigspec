---
name: fix-bug
description: "Investigate a bug through 4-phase RCA (Reproduce → Isolate → Hypothesize → Verify), then write a TDD fix plan. Use when user reports a bug, wants to investigate a problem, or mentions 'triage'."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: prove
verify: "root cause verified (not just hypothesized); TDD fix plan written with RED-GREEN cycles; bug diagnosis recorded"
---

# Fix Bug

Investigate a problem, find root cause, and write a TDD fix plan. Minimize questions to the user — investigate first.

## Process

### 1. Capture the problem

Get a brief description. Ask ONE question: "What's the problem you're seeing?"

### 2. 4-Phase Root Cause Analysis

**Phase 1 — Reproduce.** Confirm the failure is consistent. Document exact inputs, environment, and observed vs. expected output. Do not proceed until you can reproduce reliably.

**Phase 2 — Isolate.** Trace the code path from entry point to failure. Binary-search the call stack to find which layer first produces wrong output. Target: a single function or module where the wrong behavior first appears.

**Phase 3 — Hypothesize.** Write a falsifiable hypothesis: "The bug occurs because [condition] causes [behavior] instead of [expected]." Generate at least 2 alternatives. Rank by probability.

**Phase 4 — Verify.** Add a targeted assertion or log that fires if your top hypothesis is correct. Run the reproduction case. If confirmed, document the root cause. If not, return to Phase 3 with new evidence.

> **HARD GATE** — Do NOT write a fix until Phase 4 produces a verified root cause.

### 3. Design TDD fix plan

Create a concrete, ordered list of RED-GREEN cycles:

1. **RED**: Write a test that captures the broken behavior
   **GREEN**: Minimal code change to make it pass
   **verify**: [runnable command]

2. **RED**: Write a test for the edge case that was missed
   **GREEN**: [fix]
   **verify**: [runnable command]

**REFACTOR**: Any cleanup needed after all tests pass

Rules:
- Tests verify behavior through public interfaces
- One test at a time, vertical slices
- Tests should survive internal refactors
- Each test asserts on observable outcomes

### 4. Write diagnosis

Create `specs/bugs/<bug-id>.md`:

```yaml
---
okf_kind: bug
okf_version: "1.0"
generated_by: "skill:fix-bug"
generated_at: <iso-8601>
---
# Bug: [Title]

## Problem
- Actual: [what happens]
- Expected: [what should happen]
- Reproduction: [steps]

## Root Cause
[Verified cause — not a hypothesis]
Risk: Low / Medium / High

## TDD Fix Plan
1. RED: [test] → GREEN: [fix] → verify: [cmd]
2. RED: [test] → GREEN: [fix] → verify: [cmd]
```

### 5. Write handoff

```yaml
handoff:
  next_skill: "kickoff-branch"
  reason: "Root cause verified. TDD fix plan ready. Create a fix branch to implement."
```
