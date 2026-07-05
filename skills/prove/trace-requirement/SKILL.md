---
name: trace-requirement
description: "Link story IDs from the epic to implementing code and tests. Produces a traceability matrix that surfaces dark stories (no code) and orphan code (no story). Use after review/security-review, before merge, or to audit which stories are implemented."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: prove
verify: "traceability matrix written; every story has implementing code; no orphan code without a story; coverage summary reported"
---

# Trace Requirement

Build a traceability matrix from epic stories to implementing code. Surfaces gaps in both directions.

## Pre-flight

Read the active epic's `epic.yaml` to get the full story list.

## Process

### 1. Extract story IDs

From `epic.yaml`, collect all story IDs (e.g., `e03s01`, `e03s02`).

### 2. Search for story tags in code

Look for `// story: <id>` or `# story: <id>` comments in source files and tests:
```bash
grep -rn "story: " . --include="*.ts" --include="*.js" --include="*.py" | grep -v node_modules
```

### 3. Build the matrix

For each story ID:
- **Implemented**: list files containing `// story: <id>`
- **Tested**: list test files containing `// story: <id>`
- **Dark**: story has no tag in any file — flag as unimplemented

For each tagged file with no matching story ID:
- **Orphan**: code exists but story was removed or never planned — flag for cleanup

### 4. Write traceability report

Create `specs/epics/<epic>/traceability.md`:

```yaml
---
okf_kind: traceability
okf_version: "1.0"
generated_by: "skill:trace-requirement"
generated_at: <iso-8601>
---
# Traceability: [Epic Title]

## Story Coverage
| Story | Title | Files | Tests | Status |
|-------|-------|-------|-------|--------|
| e03s01 | [title] | 2 | 1 | Covered |
| e03s02 | [title] | 0 | 0 | Dark |

## Orphan Code (no story tag)
- [file]: contains untagged implementation

## Gaps
- e03s02: no implementation found → run plan-work

## Coverage summary
Stories: X covered / Y dark / Z total
```

### 5. Write handoff

If all stories covered:
```yaml
handoff:
  next_skill: "orchestrate-project"
  reason: "All stories traced. Epic ready for completeness gate."
```

If dark stories found:
```yaml
handoff:
  next_skill: "plan-work"
  reason: "Dark stories found. Return to PLAN for implementation."
```
