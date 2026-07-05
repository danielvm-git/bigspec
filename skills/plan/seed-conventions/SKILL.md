---
name: seed-conventions
description: "Bootstrap a new project with AGENTS.md, constitution.md template, and specs/ directory. Entry point for greenfield projects. Use when starting a new project from scratch, when there is no AGENTS.md yet, or when user asks to set up AI agent conventions."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: plan
verify: "AGENTS.md and constitution.md exist at project root; specs/ directory and cockpit initialized"
---

# Seed Conventions

Bootstrap a new project with bigspec conventions. Run once at the start of a greenfield project.

## What this creates

- `AGENTS.md` — agent session config (project-specific)
- `constitution.md` — project-specific constitution (from scaffold template)
- `specs/` — cockpit + product + epics directory structure
- `specs/cockpit/state.yaml` — initialized cockpit state

## Interview

Ask the user these questions (one at a time):

1. **Project name and description** — "What is this project? One sentence."
2. **Stack** — "What language, framework, and runtime?"
3. **Commands** — "Commands for: test, build, lint?"
4. **Architecture** — "Key modules and their relationships?"
5. **Conventions** — "Naming, file organization, patterns?"
6. **Never-do list** — "Hard stops? Things an agent must never do?"

## Generate files

### AGENTS.md

```markdown
# [Project Name] — AI Agents

Read `constitution.md` before any task.

## Project
[One sentence description]
Stack: [language, framework, runtime]

## Commands
| Action | Command |
|--------|---------|
| Test   | `[cmd]` |
| Build  | `[cmd]` |
| Lint   | `[cmd]` |

## Architecture
[Key modules and relationships]

## Mandatory behavior
[Project-specific rules for all agents]

## Never
[Hard stops]
```

### constitution.md

Copy the bigspec scaffold template from `scaffold/constitution.template.md`, customizing with project-specific conventions from the interview.

### specs/ directory

```bash
mkdir -p specs/cockpit specs/product specs/epics
```

### Initialize cockpit

```yaml
---
okf_kind: cockpit-state
okf_version: "1.0"
generated_by: "skill:seed-conventions"
generated_at: <iso-8601>
---
active_epic: ""
active_story: ""
current_movement: "FRAME"
handoff:
  next_skill: "survey-context"
  reason: "Project seeded. Ready to frame the first epic."
  context_pointers: []
```

### 6. Write handoff

```yaml
handoff:
  next_skill: "survey-context"
  reason: "Project conventions and cockpit seeded."
```
