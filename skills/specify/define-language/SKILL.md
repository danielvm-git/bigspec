---
name: define-language
description: "Extract a DDD-style ubiquitous language glossary from the current conversation and spec, flagging ambiguities and proposing canonical terms. Output is an okf_kind:glossary OKF bundle. This glossary is domain ground truth consumed by count-bcp. Use when defining domain terms, building a glossary, or before planning."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: specify
verify: "specs/product/glossary.md exists as a valid okf_kind:glossary OKF bundle with Entities, Roles, and Quality/Compliance sections"
---

# Define Language

Extract and formalize domain terminology into a consistent glossary. This is the domain ground truth — `count-bcp` consumes it for dimension classification.

## Process

### 1. Scan sources

Read:
- The active story bundle
- Any existing `specs/product/glossary.md`
- The conversation for domain-relevant nouns, verbs, and concepts

### 2. Identify problems

- Same word used for different concepts (ambiguity)
- Different words used for the same concept (synonyms)
- Vague or overloaded terms

### 3. Write the glossary

Create/update `specs/product/glossary.md`:

```yaml
---
okf_kind: glossary
okf_version: "1.0"
generated_by: "skill:define-language"
generated_at: <iso-8601>
---
# Domain Glossary

## Entities (Dims 6 & 7)
- **[Entity Name]**: [Definition]. (State: New | Existing)

## Roles (Dim 5)
- **[Role Name]**: [Definition]. (Access level / responsibilities)

## Quality & Compliance (Dims 11-13)
- **[Standard/Rule]**: [Definition and system-wide application]

## Relationships
- An **[Entity A]** has one or more **[Entity B]**

## Flagged ambiguities
- "[term]" was used to mean both [X] and [Y] — these are distinct.
```

### 4. Rules

- **Be opinionated.** Pick the best term; list others as aliases to avoid.
- **Flag conflicts explicitly.** Call out ambiguous terms with a recommendation.
- **Domain-relevant terms only.** Skip module/class names unless they have domain meaning.
- **Keep definitions tight.** One sentence max. Define what it IS, not what it does.
- **Show relationships.** Express cardinality where obvious.

### 5. Write handoff

```yaml
handoff:
  next_skill: "design-interface"
  reason: "Domain glossary established. Proceeding to interface design."
```
