---
name: design-interface
description: "Generate multiple radically different interface designs for a module using parallel subagents, then compare trade-offs. Based on 'Design It Twice' from A Philosophy of Software Design. Use when designing an API, exploring interface options, comparing module shapes, or before implementing a new module."
constitution_version: "1.1.0"
effort: heavy
spawn: subagent
risk: medium
movement: specify
verify: "at least 3 distinct interface designs documented with trade-off comparison; user has selected or synthesized a preferred approach"
---

# Design Interface

"Design It Twice" — your first idea is unlikely to be the best. Generate multiple radically different designs, then compare.

## Process

### 1. Gather requirements

- What problem does this module solve?
- Who are the callers? (other modules, external users, tests)
- What are the key operations?
- Any constraints? (performance, compatibility, existing patterns)
- What should be hidden inside vs exposed?

### 2. Generate designs (parallel subagents)

Spawn 3+ subagents simultaneously. Each gets a different constraint:

- **Agent 1**: "Minimize method count — aim for 1-3 methods max"
- **Agent 2**: "Maximize flexibility — support many use cases"
- **Agent 3**: "Optimize for the most common case"
- **Agent 4**: "Take inspiration from [specific paradigm/library]"

Each subagent outputs:
1. Interface signature (types/methods)
2. Usage example (how callers use it)
3. What this design hides internally
4. Trade-offs of this approach

### 3. Compare designs

Evaluate each on:
- **Interface simplicity**: fewer methods, simpler params
- **Depth**: small interface hiding significant complexity (good) vs large interface with thin implementation (avoid)
- **General-purpose vs specialized**: flexibility vs focus
- **Ease of correct use** vs **ease of misuse**

### 4. Synthesize

Often the best design combines insights from multiple options. Ask:
- "Which design best fits your primary use case?"
- "Any elements from other designs worth incorporating?"

### 5. Write handoff

```yaml
handoff:
  next_skill: "define-acceptance"
  reason: "Interface design complete. Proceeding to acceptance criteria."
```
