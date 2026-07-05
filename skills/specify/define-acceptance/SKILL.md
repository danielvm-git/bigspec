---
name: define-acceptance
description: "Convert a story's intent into runnable Gherkin acceptance criteria with explicit verify: commands. Turns 'the API should work' into 'Scenario: valid request returns 200 → verify: curl ... | jq .status == 200'. Use after elaborate-spec, before plan-work, or when a story needs testable acceptance criteria."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: specify
verify: "every acceptance criterion in the story bundle has a Gherkin Scenario: block and a runnable verify: command; validate-okf passes on the updated story bundle"
---

# Define Acceptance

Turn intent into testable acceptance criteria. Every criterion gets a Gherkin `Scenario:` block and a runnable `verify:` command.

## Process

### 1. Read the story bundle

Read the active story from `specs/epics/<epic>/<story>.md`. Focus on:
- §1 Context & Goal
- §2 Target Users / Actors
- §3 Elements
- §4 NFRs

### 2. Define acceptance criteria

For each user-visible behavior, write a Gherkin scenario:

```gherkin
Scenario: [Descriptive name]
  Given [precondition / context]
  When [action / trigger]
  Then [verifiable outcome]

  verify: <runnable command that asserts the Then clause>
```

### 3. Rules for verify: commands

- **Runnable.** One command that exits 0 on pass, non-zero on fail.
- **Behavioral.** Asserts user-visible outcomes, not internal state.
- **Specific.** Tests exactly the scenario's Then clause.
- **No tautologies.** "test -f file.sh" is not a behavioral verify.
- **F.I.R.S.T.** Fast, Independent, Repeatable, Self-Validating, Timely.

Good: `verify: npm test -- -t 'returns 200 for valid request'`
Bad: `verify: check the API works`

### 4. Cover boundaries

For each primary scenario, add boundary cases:
- **Empty / null** inputs
- **Maximum** values
- **Off-by-one** conditions
- **Error** paths (invalid input, missing auth, timeout)

### 5. Update story bundle

Append the acceptance criteria to the story's §5. Run `validate-okf` to confirm the bundle is valid.

### 6. Write handoff

```yaml
handoff:
  next_skill: "plan-work"
  reason: "Acceptance criteria defined with runnable verify: commands. Ready to plan implementation."
```
