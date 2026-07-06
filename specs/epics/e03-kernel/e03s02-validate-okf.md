---
okf_kind: story
okf_version: "1.0"
generated_by: "elaborate-spec"
generated_at: "2026-07-05T20:20:00Z"
supersedes: null
commit_range: null
---
# Story: validate-okf kind-aware validator (e03s02)

## 1. Context & Goal

The M0 kernel already has `validate-okf.ts` — a working OKF envelope validator that
scans `specs/` and checks required frontmatter fields (`okf_kind`, `okf_version`,
`generated_by`, `generated_at`), validates `okf_kind` against a known set (11 kinds),
and ensures `generated_at` is ISO 8601 compliant. It produces a human-readable
report and exits 0 on clean, 1 on ERROR.

What's missing: **kind-aware validation** (the "kind-aware" part of e03s02) and
**tests**. The current validator treats all files uniformly — it checks the same
envelope rules regardless of `okf_kind`. This story adds:

1. **Per-kind validation rules** — each `okf_kind` gets specific structural checks
   (e.g., story bundles need `supersedes` and `commit_range`; epic bundles need
   `stories[]`; verify bundles need `phases`).
2. **A comprehensive test suite** — all validation paths, boundary cases, and
   error messages tested through the public `validate()` function.
3. **CLI integration** — already wired via `bigspec validate-okf`, but tests
   should cover the CLI entry point.

This is the constitution's **Known-8 BCP calibration anchor** (B9 / ADR-0003):
a multi-dimension component with several interface elements, multiple boundaries,
and residual business rules.

## 2. Target Users / Actors

- **Developers and agents** — run `bigspec validate-okf` to gate PRs and verify that
  all OKF bundles in `specs/` are structurally valid before merge.
- **CI/CD pipeline** — `validate-okf` runs as the first step in CI, blocking merge
  if any ERROR is found.
- **The kernel** — future tools (wiki renderer, traceability matrix) consume
  validated OKF bundles and rely on `validate-okf` for preconditions.

## 3. Elements (Data, Interfaces, Logic)

### Existing code (`kernel/src/validate-okf.ts`, 125 lines)

Already implements:
- `parseFrontmatter(raw): Envelope | null` — split `---` blocks, parse key:value pairs,
  strip surrounding quotes
- `collectFiles(root): string[]` — recursive walk over `.md`, `.yaml`, `.yml` under `specs/`
- `validateFile(filePath): ValidationIssue[]` — per-file validation
- `validate(root): string` — main entry point, aggregates all issues, returns formatted report
- CLI guard: `if (process.argv[1]?.includes("validate-okf"))` — runs `validate()` and exits

### To add (kind-aware dispatch)

Add a `KIND_VALIDATORS` registry mapping `okf_kind` to a per-kind validator function:

```typescript
type KindValidator = (envelope: Envelope, filePath: string) => ValidationIssue[];
```

Kinds and their M0 validation rules:

| okf_kind | Required per-kind fields | Notes |
|---|---|---|
| `story` | `supersedes`, `commit_range` | Non-empty body after frontmatter |
| `epic` | `id`, `title`, `status`, `stories[]` | Each story has id + title + status |
| `glossary` | `terms[]` | Each term has name + definition |
| `tasks` | `story`, `risk_tier`, `checkpoints[]`, `gates[]` | Checkpoints have id + verify_cmd + status |
| `cockpit-state` | `active_epic`, `current_movement`, `handoff` | Handoff has next_skill + reason |
| `adr` | `status`, `date`, `deciders`, `context`, `decision`, `consequences` | Links to superseded ADRs |
| `reference` | `source`, `source_type` | source_type in {url, file, book, article} |
| `release-plan` | `release.version`, `release.status`, `epics[]` | Each epic has id + title + capsule_dir |
| `execution-status` | one entry per known story | Nested structure validator |
| `scope` | `in_scope[]`, `out_of_scope[]` | Both arrays present |
| `plan-audit` | `verdict`, `checklist[]` | Checklist has status + section |
| `readme` | (minimal — envelope only) | Just required frontmatter |

### Validation flow

```
validate(root)
  → collectFiles(root)
  → for each file: validateFile(file)
     → parseFrontmatter(raw) → null? → WARNING "no OKF frontmatter"
     → check REQUIRED_FRONTMATTER (4 fields) → ERROR on missing
     → check okf_version ("1.0") → WARNING on mismatch
     → check okf_kind in VALID_KINDS → WARNING on unknown
     → check generated_at ISO 8601 → WARNING on bad format
     → KIND_VALIDATORS[kind]?(envelope, filePath) → per-kind issues
  → aggregate ERRORS + WARNINGS
  → format report
  → return string
```

### Error format (constitution Part III)

Every ERROR: `{file}:{field} — {description}\n  hint: {remediation}`
Every WARNING: `[{kind}] {file}:{field} — {description}`

## 4. Non-Functional Requirements (NFRs)

- **Deterministic**: same files → same report. No network calls.
- **Fast**: entire `specs/` scan completes in <500ms for 50 files.
- **No side effects**: read-only — never modifies files.
- **F.I.R.S.T tests** through the public `validate()` function, covering:
  - Each of the 11 OKF kinds with valid and invalid variants
  - Boundary: empty file, no frontmatter, partial frontmatter
  - Boundary: all valid fields present vs missing each required field
  - Boundary: deep directory nesting
  - Error messages include file path, offending field, and remediation hint
- Risk tier **P1** — full lane (build + test + lint + review).

## 5. Acceptance Criteria (Gherkin)

### Envelope validation

```
Scenario: validate-okf reports 0 errors for 41 known-valid files under specs/
  Given the specs/ directory with 41 files (all with OKF frontmatter)
  When I run `bigspec validate-okf`
  Then it exits 0
  And the report contains "0 Errors" and "0 Warnings"

Scenario: validate-okf reports ERROR for a file missing okf_kind
  Given a file under specs/ with frontmatter but no okf_kind field
  When validateFile processes it
  Then it returns an ERROR issue with field="okf_kind"
  And the detail contains "missing required field"

Scenario: validate-okf reports WARNING for unknown okf_kind
  Given a file with okf_kind: "unknown-kind"
  When validateFile processes it
  Then it returns a WARNING issue
  And the detail contains "unknown kind"

Scenario: validate-okf reports WARNING for missing frontmatter
  Given a .md file with no --- delimiters
  When validateFile processes it
  Then it returns a WARNING issue
  And the detail contains "no OKF frontmatter found"
```

### Kind-aware per-kind validation

```
Scenario: story bundle reports ERROR when supersedes is missing
  Given a story bundle with okf_kind="story" but no supersedes field
  When validateFile processes it
  Then it returns an ERROR issue
  And the detail mentions "supersedes"

Scenario: epic bundle validates stories are an array
  Given an epic bundle with stories: "not-an-array"
  When validateFile processes it
  Then it returns an ERROR issue
  And the detail mentions "stories must be an array"

Scenario: tasks bundle validates checkpoints array
  Given a tasks bundle with checkpoints: "not-an-array"
  When validateFile processes it
  Then it returns an ERROR issue
  And the detail mentions "checkpoints must be an array"

Scenario: cockpit-state validates handoff has next_skill
  Given a cockpit-state bundle with handoff missing next_skill
  When validateFile processes it
  Then it returns an ERROR issue
  And the detail mentions "next_skill"
```

### Edge cases

```
Scenario: empty file is silently skipped
  Given an empty .md file under specs/
  When validateFile processes it
  Then it returns no issues

Scenario: validate scans nested directories recursively
  Given files in specs/adir/nested/deep/path/
  When collectFiles runs from specs/
  Then it includes files from all nested depths

Scenario: validate returns exit 1 on any ERROR
  Given the specs/ directory has at least one ERROR-level issue
  When the CLI runs validate-okf
  Then it exits with code 1

Scenario: validate returns exit 0 on zero ERRORS
  Given the specs/ directory has zero ERROR-level issues
  When the CLI runs validate-okf
  Then it exits with code 0
```

## 6. BCP Reference

- **Known-8 calibration anchor** (B9 / ADR-0003)
- Dimensions: 5 (UI — report format) + 3 (business rules — per-kind validation) = 8
- Story size: **8 BCPs**
- Risk tier: **P1**
