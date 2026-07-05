---
name: research-first
description: "Search for prior art, open-source solutions, and existing implementations before building from scratch. Uses web search and library discovery to answer: has this been solved already? Use at the start of Frame, before any design or implementation, or when user mentions 'is there a library for this?'."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: low
movement: frame
verify: "research findings written to specs/research/<topic>.md as an OKF bundle with okf_kind: research"
---

# Research First

Before building, answer: has someone already solved this? Search for libraries, patterns, and prior art. The output is a research note, not code.

## Process

### 1. Define the question

State the specific research question: "What existing solutions exist for [problem]?"

### 2. Search for prior art

Search across:
- **Package registries**: npm (npmjs.com), PyPI (pypi.org), crates.io
- **Open source**: GitHub trending, awesome lists
- **Documentation**: official docs for candidate libraries
- **Community**: Stack Overflow, Reddit, Hacker News (for real-world experience reports)

### 3. Evaluate candidates

For each candidate, assess:
- **Maturity**: version, release frequency, contributor count
- **Fit**: does it solve the specific problem? Overlap / gaps?
- **Maintenance**: last commit, open issues, response time
- **License**: compatible with project?
- **Bundle size / dependency weight**: does it pull in a tree?

### 4. Write research note

Create `specs/research/<topic>.md`:

```yaml
---
okf_kind: research
okf_version: "1.0"
generated_by: "skill:research-first"
generated_at: <iso-8601>
---
# Research: [Topic]

## Question
[The specific question]

## Candidates
| Library | Version | Stars | License | Verdict |
|---------|---------|-------|---------|---------|
| [name]  | [ver]   | [N]   | [MIT]   | Recommended / Consider / Skip |

## Recommendation
[Which candidate and why. One paragraph.]

## What was NOT explored
[Known gaps — areas this research didn't cover]

## Implications
[How this changes the design or plan]
```

### 5. Write handoff

Update cockpit:
```yaml
handoff:
  next_skill: "map-codebase"
  reason: "Research complete. Proceeding to map existing codebase."
```
