---
name: quick-fix
description: "Fast-lane implementation for P3 (trivial/data-only) changes. Skips full TDD — minimal change + typecheck + lint only. Use ONLY for P3-tier stories: docs, typo fixes, config changes, trivial data corrections. Never for logic changes, security, or shared modules."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: build
verify: "minimal change applied; typecheck and lint pass; verify: command from tasks.yaml passes"
---

# Quick Fix

Fast-lane implementation for P3 stories. Skip the full TDD loop — just make the change, verify types and lint, and ship.

> **HARD GATE** — Use ONLY for stories tagged P3. P0-P2 stories MUST use `develop-tdd`. If you're not sure of the risk tier, check the tasks ledger.

## When to use

P3 stories are:
- Documentation changes
- Typo fixes
- Config value updates
- Trivial data corrections
- No logic changes, no security impact, no shared module modifications

## Process

### 1. Verify P3 tier

Read the tasks ledger — confirm `risk_tier: P3`. If not P3, run `develop-tdd` instead.

### 2. Make the minimal change

Apply the change. Touch only what the story requires. No refactoring, no reorganizing.

### 3. Verify

```bash
npm run typecheck
npm run lint
# Run the verify: command from tasks.yaml
npm test -- -t '<checkpoint description>'
```

- [ ] Typecheck passes
- [ ] Lint passes
- [ ] Verify command passes

### 4. Update ledger

Mark the checkpoint PASSING in `tasks.yaml`.

### 5. Write handoff

```yaml
handoff:
  next_skill: "verify-work"
  reason: "Quick fix applied (P3 fast lane). Ready for verification."
```
