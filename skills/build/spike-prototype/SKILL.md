---
name: spike-prototype
description: "Throw-away prototype for unknown problem spaces. Output is learning notes, not production code. Use when the domain or technology is unexplored, when estimates are impossible without experimentation, or when user says 'spike', 'prototype', or 'proof of concept'."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: low
movement: build
verify: "spike report exists with question, findings, evidence, and recommendation; spike code is discarded"
---

# Spike Prototype

A time-boxed experiment to answer a specific question. The code is thrown away. The learning is kept.

**The spike produces learning, not code to ship.** If you find yourself cleaning up spike code for production, stop — run `plan-work` and `develop-tdd` instead.

## When to spike

- Technology is unfamiliar (new library, API, infrastructure)
- Approach is uncertain (multiple solutions exist; none tried)
- Estimates are impossible without seeing actual behavior
- A key assumption needs validation before committing

## Process

### 1. Define the question

State the question the spike must answer:
> "Can we [specific thing] using [specific approach] within [constraint]?"

A spike with no question is just unplanned coding. Refuse to start if the question isn't clear.

### 2. Set a timebox

Agree on a timebox: 30 minutes, 1 hour, 2 hours. When time is up, stop — even if partially answered. Partial learning is still learning.

### 3. Experiment

Write the simplest code that could answer the question. Ignore:
- Error handling
- Test coverage
- Code quality
- Production concerns

Focus entirely on answering the question.

### 4. Write learning notes

Create `specs/spikes/<name>.md`:

```yaml
---
okf_kind: spike
okf_version: "1.0"
generated_by: "skill:spike-prototype"
generated_at: <iso-8601>
---
# Spike: [name]

## Question
[The specific question]

## Result
[Answered / Partially / Not answered]

## Findings
[Concrete observations, not opinions]

## Evidence
[Code snippet, benchmark, API response]

## Implications for the plan
[How this changes the design or estimate]

## What was NOT explored
[Known gaps]

## Recommendation
[Proceed with this approach? What does plan-work need to account for?]
```

### 5. Discard spike code

Delete the spike code. It is not meant to ship.

### 6. Write handoff

```yaml
handoff:
  next_skill: "plan-work"
  reason: "Spike complete. Findings ready to inform implementation plan."
```
