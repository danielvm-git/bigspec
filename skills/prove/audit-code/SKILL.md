---
name: audit-code
description: "Self-review checklist for the coding agent before dispatching an external reviewer. Checks constitution compliance, Boy Scout Rule, test coverage, types, and clean code heuristics. Produces a pass/fail checklist. Use before review, before committing, or when user asks for a code quality check."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: prove
verify: "all audit checklist items pass; any failures addressed before proceeding"
---

# Audit Code

Self-review before asking anyone else to look at the code. Catch everything clearly wrong so the reviewer can focus on design, not hygiene.

**Distinct from `review`:** This is the coding agent checking its own work. No external agent involved. Run this first; run `review` after this passes.

## Checklist

### Constitution Compliance (Part III)

- [ ] Functions: 4–20 lines; split if longer
- [ ] Files: under 300 lines
- [ ] Names: specific and unique (grep returns < 5 hits)
- [ ] No dead code or commented-out code blocks
- [ ] Early returns over nested ifs; max 2 levels of indentation
- [ ] Comments explain WHY, not WHAT

### Scope

- [ ] Changes limited to what was asked — nothing extra
- [ ] No speculative features added
- [ ] No files touched outside stated scope
- [ ] Changes are surgical: only code strictly required for the task

### Boy Scout Rule

- [ ] Every file touched is cleaner than when found
- [ ] No dead code left behind

### Types and Safety

- [ ] No `any` types introduced (TypeScript)
- [ ] No `@ts-ignore` or lint disables added
- [ ] No `as unknown as X` casts bypassing type safety

### Test Coverage

- [ ] Every new function has at least one test
- [ ] Every bug fix has a regression test
- [ ] Tests verify behavior through public interfaces
- [ ] Tests are F.I.R.S.T compliant (Fast, Independent, Repeatable, Self-Validating, Timely)

### Clean Code Heuristics

- [ ] Single Responsibility: no function doing two unrelated things
- [ ] Dependency Inversion: dependencies injected, not imported globally
- [ ] No duplicate code (DRY)
- [ ] Functions descend one level of abstraction (Stepdown Rule)
- [ ] No magic numbers — named constants

### Red Flags

Before reporting, name any rationalization you caught yourself making for skipping a checklist item. Silence is not acceptable.

## Output

Report the checklist with ✓ / ✗ per item. For each ✗, describe what needs to be fixed.

If all items pass → suggest `review`.
If any items fail → fix them before proceeding.

## Write handoff

```yaml
handoff:
  next_skill: "review"
  reason: "Self-audit passed. Ready for external review."
```
