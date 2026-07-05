---
name: search-skills
description: "Discover relevant existing skills in the bigspec corpus before authoring a new one. Scans the skills/ directory by movement and keyword to avoid skill duplication. Use after map-codebase, before craft-skill, or when unsure if a workflow already exists."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: frame
verify: "cockpit handoff.next_skill points to the recommended skill (either an existing match or craft-skill to author a new one)"
---

# Search Skills

Before writing a new skill, check if one already exists. The skill corpus is organized by movement — each skill maps to exactly one movement and has a verb-noun name.

## Process

### 1. Identify the need

What workflow do you need? State it as a verb-noun pair if possible: "I need to design an API interface" → `design-interface`.

### 2. Scan the corpus

Search the `skills/` directory:
```bash
ls skills/*/
```
Or scan by movement:
```bash
ls skills/frame/ skills/specify/ skills/plan/ skills/build/ skills/prove/ skills/sustain/ skills/meta/
```

### 3. Check for matches

For each candidate skill, read its frontmatter to verify:
- Does the `movement` match when you'd need it?
- Does the `description` cover your use case?
- Is the `effort` appropriate?

### 4. Decide

| Situation | Action |
|-----------|--------|
| Exact match exists | Use it. Write `handoff.next_skill: "<match>"` |
| Partial match | Load the skill, assess if it fits with minor adaptation |
| No match | Write `handoff.next_skill: "craft-skill"` to author a new one |

### 5. Write handoff

```yaml
handoff:
  next_skill: "<existing skill or craft-skill>"
  reason: "<match found: reason / no match: suggest authoring>"
```

## Anti-avoidance

Do NOT skip this skill because "I already know the skills." The corpus evolves. Check.
