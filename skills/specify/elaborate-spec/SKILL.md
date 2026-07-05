---
name: elaborate-spec
description: "Refine a rough idea into a clear, detailed spec through dialogue. Does not produce code. Output is an okf_kind:story OKF bundle. Use when user has a vague idea, wants to think through a feature before planning, or needs to turn 'I want X' into a concrete, testable spec."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: specify
verify: "specs/epics/<epic>/<story>.md exists as a valid okf_kind:story bundle with all 5 sections (Context, Actors, Elements, NFRs, Acceptance Criteria)"
---

# Elaborate Spec

Turn a rough idea into a clear spec through focused dialogue. No code is written — the output is shared understanding and a validated OKF `story` bundle.

## Process

### 1. Listen first

Let the user describe their idea. Take notes on:
- The core problem they're solving
- Who is affected (actors)
- What success looks like
- Any constraints already identified

### 2. Ask clarifying questions

Work through these areas, one question at a time:

**Problem clarity**
- What is the current behavior (or lack of behavior)?
- Who experiences this problem? How often?
- What's the cost of not solving it?

**Solution boundaries**
- What is explicitly IN scope? Out of scope?
- Are there existing solutions this replaces or integrates with?

**Success criteria**
- How will you know this is done?
- What does the happy path look like end-to-end?
- What are the key failure modes?

**Constraints**
- Performance requirements?
- Compatibility constraints?
- Non-negotiable implementation decisions?

### 3. Surface assumptions

If ambiguous, present ≥2 distinct interpretations:
> "I see two ways to read this:
> 1. [Interpretation A]
> 2. [Interpretation B]
> Which is closer?"

Never proceed with unresolved ambiguity.

### 4. Synthesize into OKF story bundle

Write `specs/epics/<epic>/<story>.md`:

```yaml
---
okf_kind: story
okf_version: "1.0"
generated_by: "skill:elaborate-spec"
generated_at: <iso-8601>
---
# Story: [Title]

## 1. Context & Goal
Why are we building this, and what is the desired outcome?

## 2. Target Users / Actors
Who interacts with this slice? (References roles in the Glossary).

## 3. Elements (Data, UI, Interfaces, Logic)
Clear, unambiguous description of the moving parts.
Do NOT pre-partition into BCP dimensions — the Element Router owns that.

## 4. Non-Functional Requirements (NFRs)
Security, performance, and compliance constraints.

## 5. Acceptance Criteria (Gherkin)
Scenario: [Name]
  Given [context]
  When [action]
  Then [verifiable outcome]
```

### 5. Validate

Run `validate-okf` on the story bundle.

### 6. Write handoff

```yaml
handoff:
  next_skill: "grill"
  reason: "Story spec written. Ready for adversarial questioning."
```
