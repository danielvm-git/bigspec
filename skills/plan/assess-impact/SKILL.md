---
name: assess-impact
description: "Analyze the blast radius of a proposed change before any code is written. Maps dependents, affected stories, and test coverage. Produces an impact assessment. Use before plan-work on any non-trivial change, when touching a shared module, or when asking 'what does this break?'"
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: low
movement: plan
verify: "impact assessment written; risk classified as low/medium/high; dependents and test coverage gaps documented"
---

# Assess Impact

Find the blast radius before writing a single line of code.

## Process

### 1. Identify the target

Name the symbol, module, or file being changed. Ask: "What exactly are you changing?"

### 2. Find dependents

```bash
grep -rn "<symbol-name>" . --include="*.ts" --include="*.js" | grep -v node_modules
git log --oneline -10 -- <file-path>
```

### 3. Map to stories

Read the epic's `tasks.yaml` and story bundles. For each dependent, identify which story owns that module.

### 4. List test coverage

Find tests that exercise the target:
```bash
grep -rn "<symbol-name>" . --include="*.test.*" --include="*.spec.*"
```

### 5. Classify risk

| Level | Condition |
|-------|-----------|
| Low | ≤ 2 callers, all covered by tests |
| Medium | 3–10 callers, partial test coverage |
| High | > 10 callers, shared API/interface, or no tests |

### 6. Write impact assessment

Create `specs/epics/<epic>/<story>-impact.md`:

```yaml
---
okf_kind: impact
okf_version: "1.0"
generated_by: "skill:assess-impact"
generated_at: <iso-8601>
---
## Target
[symbol or file being changed]

## Dependents ([count])
- [file]: [caller or usage]

## Affected Stories
- [story id]: [title]

## Test Coverage
- [test file]: covers [scenario]
- Gap: [untested behavior]

## Risk: Low / Medium / High
[One-sentence rationale]

## Recommended action
[Proceed / Add tests first / Discuss design]
```

### 7. Write handoff

```yaml
handoff:
  next_skill: "order-release"
  reason: "Impact assessed (risk: <level>). Proceeding to release ordering."
```
