---
name: terse-mode
description: "Ultra-compressed communication mode triggered automatically by the orchestrator when context budget is tight. Cuts token usage ~75% by dropping filler, articles, and pleasantries while keeping full technical accuracy. Use when context is critically long or token budget is nearly exhausted."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: sustain
verify: "responses use terse format; technical accuracy preserved; no filler words or pleasantries"
---

# Terse Mode

Fallback ultra-compressed mode when token budget is tight. Constitution B0 requires token-aware authoring — terse mode is the last resort when structural economy isn't enough.

## Trigger

Auto-activated by `orchestrate-project` when context approaches budget limits. Also triggered by "caveman mode," "terse mode," "less tokens," or "be brief."

## Persistence

ACTIVE every response once triggered. No revert after many turns. Off only when user says "stop" or "normal mode."

## Rules

**Drop:** articles (a/an/the), filler (just/really/basically/actually), pleasantries (sure/certainly/of course/happy to), hedging. Fragments OK. Short synonyms. Abbreviate common terms (DB/auth/config/req/res/fn/impl). Strip conjunctions. Use arrows for causality (X → Y). One word when one word enough.

**Keep:** Technical terms exact. Code blocks unchanged. Errors quoted exact.

Pattern: `[thing] [action] [reason]. [next step].`

Not: "Sure! I'd be happy to help. The issue you're experiencing is likely caused by..."
Yes: "Bug in auth middleware. Token expiry check use `<` not `<=`. Fix:"

## Auto-clarity exception

Drop terse temporarily for: security warnings, irreversible action confirmations, multi-step sequences where fragment order risks misread, user asks to clarify or repeats question. Resume terse after clear part done.

Example — destructive op:
> **Warning:** This will permanently delete all rows in the `users` table and cannot be undone.
> ```sql
> DROP TABLE users;
> ```
> Terse resume. Verify backup exist first.

## Write handoff

```yaml
handoff:
  next_skill: "<return to calling skill>"
  reason: "Terse mode engaged. Resuming previous workflow in compressed mode."
```
