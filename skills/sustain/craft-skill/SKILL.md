---
name: craft-skill
description: "Author a new bigspec skill with proper structure: YAML frontmatter (effort/spawn/risk/movement/verify), progressive disclosure, and behavioral verify. Use when user wants to create a new skill, or when search-skills finds no match for a needed workflow."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: sustain
verify: "new skill SKILL.md exists in the correct movement directory; frontmatter has all required fields; behavioral verify: asserts an artifact"
---

# Craft Skill

Author a new bigspec skill. Every skill is a procedure — a repeatable verb-noun workflow. Nothing else is a skill.

## Naming rules (B3)

- Verb-noun kebab-case (e.g., `survey-context`, `develop-tdd`)
- Two-word public API — never renamed, only aliased
- Pronounceable, searchable, no noise words, no encodings
- Exception precedent: `grill` — kept for recognizability

## Process

### 1. Gather requirements

Ask the user:
- What task/domain does this skill cover?
- What specific use cases should it handle?
- Which movement does it belong to?
- What artifact does it produce (must be verifiable)?

### 2. Determine metadata

| Field | Value | How to choose |
|-------|-------|--------------|
| `effort` | light / medium / heavy | Light: runs fast, low context. Heavy: spawns subagents, full cycle. |
| `spawn` | inline / subagent | Inline: runs in current context. Subagent: fresh isolated context. |
| `risk` | low / medium / high | Low: read-only, no side effects. High: modifies shared state, security. |
| `movement` | frame / specify / plan / build / prove / sustain | Exactly one. |
| `verify` | behavioral check | Asserts an artifact was created, never `test -f SKILL.md`. |

### 3. Draft SKILL.md

```yaml
---
name: <verb-noun>
description: "<what it does>. Use when <specific triggers>."
constitution_version: "1.1.0"
effort: light | medium | heavy
spawn: inline | subagent
risk: low | medium | high
movement: frame | specify | plan | build | prove | sustain
verify: "<behavioral check — asserts an artifact, never a file-exists check>"
---

# <Skill Name>

[Progressive disclosure: summary → detail]

## Process

### 1. [First step]
[What to do]

### 2. [Second step]
[What to do]

## [Optional sections for advanced features]

## Write handoff

```yaml
handoff:
  next_skill: "<next skill>"
  reason: "<one-line summary>"
```
```

### 4. Validate

- [ ] Name is a verb-noun pair (or follows grill exception)
- [ ] Description includes triggers ("Use when...")
- [ ] All frontmatter fields present and valid
- [ ] `verify:` is behavioral — asserts a produced artifact
- [ ] Skill writes `handoff.next_skill` as its last action
- [ ] Terminology consistent with constitution and glossary
- [ ] Placed in correct movement directory under `skills/`

### 5. Place in corpus

Write to `skills/<movement>/<name>/SKILL.md`.

### 6. Write handoff

```yaml
handoff:
  next_skill: "search-skills"
  reason: "Skill crafted. Verify no overlap with existing corpus."
```
