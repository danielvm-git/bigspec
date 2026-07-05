---
name: compose-workflow
description: "Chain multiple skills into a custom workflow (a sequence of handoff.next_skill targets) for a specific project context. Use when the standard orchestrate loop doesn't fit a specific need, or when a project benefits from a tailored skill sequence."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: sustain
verify: "custom workflow sequence documented and saved; cockpit handoff references the composed workflow"
---

# Compose Workflow

Define a custom skill sequence when the standard loop doesn't fit. This is for project-specific workflows — not a replacement for `orchestrate-project`.

## When to compose

- Project has a non-standard pipeline (e.g., design-first, no TDD)
- Specific domain requires a different skill order
- Recurring custom process that benefits from a named sequence

## Process

### 1. Define the workflow

Name the sequence and list the skills in order:

```
workflow: "<name>"
sequence:
  - survey-context
  - research-first
  - elaborate-spec
  - grill
  - plan-work
  - ...custom sequence...
```

### 2. Document

Create `specs/workflows/<name>.md`:

```yaml
---
okf_kind: workflow
okf_version: "1.0"
generated_by: "skill:compose-workflow"
generated_at: <iso-8601>
---
# Workflow: [Name]

## Purpose
[Why this sequence, what it's optimized for]

## Sequence
| Step | Skill | Movement | Purpose |
|------|-------|----------|---------|
| 1 | survey-context | frame | Orient |
| 2 | research-first | frame | Find prior art |
| ... | ... | ... | ... |

## When to use
[Project-specific triggers]

## Divergence from standard loop
[How this differs from the 5-movement fractal loop and why]
```

### 3. Register

Update cockpit to reference the workflow if it's active:
```yaml
handoff:
  context_pointers:
    - "specs/workflows/<name>.md"
```

### 4. Write handoff

```yaml
handoff:
  next_skill: "<first skill in the composed workflow>"
  reason: "Custom workflow '<name>' activated."
```
