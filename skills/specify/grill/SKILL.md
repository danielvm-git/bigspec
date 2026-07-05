---
name: grill
description: "Stress-test a plan or design through relentless questioning until every decision is resolved. Two modes: Design (default Q&A on decisions) and Docs (grounds every challenge in real library/API documentation). Use when you want to challenge a plan, validate API assumptions, or hardness-test a spec before committing."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: specify
verify: "every design decision has been questioned and resolved; open questions recorded in cockpit handoff.open_decisions"
---

# Grill

Relentless adversarial questioning of a design or plan. Two modes.

## Design mode (default)

Interview every aspect of the plan until reaching shared understanding:
1. Walk each branch of the design tree
2. Resolve dependencies between decisions one-by-one
3. For each question, provide your recommended answer
4. Ask one question at a time

If a question can be answered by exploring the codebase, explore it instead.

## Docs mode

Triggered by "grill with docs" or when the plan relies on a specific library/API:

1. **List dependencies.** Every external library, API, and framework behavior relied upon.
2. **Fetch docs.** Use web search to get the official API reference for each.
3. **Challenge assumptions.** For each assumption: correct method signature? Right version? Deprecated?
4. **Report.** Confirmed ✓, corrected ✗ (with real behavior), uncertain → recommend `spike-prototype`.
5. **Update the plan.** Fix each confirmed discrepancy.

## After grilling

Write unresolved questions to the cockpit:
```yaml
handoff:
  next_skill: "define-language"
  reason: "Design stress-tested. Proceeding to domain glossary."
  open_decisions:
    - "[question that still needs resolution]"
```
