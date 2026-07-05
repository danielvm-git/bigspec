---
okf_kind: story
okf_version: "1.0"
generated_by: "human"
generated_at: 2026-07-04T22:42:29Z
supersedes: null
commit_range: null
---
# Story: bp-yaml get/set over the cockpit

## 1. Context & Goal
The cockpit (`specs/cockpit/state.yaml`) is machine state that skills read and
mutate as they hand the loop off (`handoff.next_skill`). Before any seed skill
exists, the kernel needs a tiny, deterministic helper to get and set nested keys
in a cockpit YAML file **without a server and without string-editing YAML by
hand** (the fragility class MCP is meant to kill later). This story delivers
that helper — `bp-yaml` — as the first frozen file-contract of the kernel.

It is the constitution's **Known-3 BCP calibration anchor** (B9 / ADR-0003):
a single-responsibility module over one file surface.

## 2. Target Users / Actors
- **Seed skills** (`survey-context`, `plan-work`, …) — read movement/handoff, write `next_skill`.
- **The kernel gate engine** — reads risk tier / active story.
- **The solo developer** — hand-edits the same YAML directly; `bp-yaml` must never corrupt a file a human could also edit.

## 3. Elements (Data, UI, Interfaces, Logic)
- A CLI/module entry `bp-yaml` with two operations: `get <file> <dotted.key.path>` and `set <file> <dotted.key.path> <value>`.
- **Get**: resolves a dotted path (e.g. `handoff.next_skill`) against the parsed YAML body and returns the scalar/sub-tree.
- **Set**: writes the value at the dotted path, **creating intermediate maps as needed**, and **serialises back preserving all other keys, key order where practical, and the OKF frontmatter block** (the `---` envelope must survive untouched).
- **Errors**: a missing key on `get`, or an unparseable file, exits non-zero with a message that includes the offending path, the file, and a remediation hint (constitution Part III — Errors).
- Values are treated as YAML scalars (string/number/bool); a `set` of a nested object is out of scope for this story.

## 4. Non-Functional Requirements (NFRs)
- **Idempotent round-trip**: `set` of an already-present value leaves the file byte-stable except the target line.
- **No data loss**: sibling keys, comments in the body where feasible, and the frontmatter envelope are preserved (B8 — the cockpit is a versioned contract).
- **F.I.R.S.T tests** through the public CLI/module surface (B5); boundary cases (missing key, deep-create, frontmatter preservation) covered exhaustively.
- Runs under Node ≥ 20 (`package.json` engines); no network, no Bun-only API.
- Risk tier **P1** — it mutates the source-of-truth state file; full lane (build + test + lint + review).

## 5. Acceptance Criteria (Gherkin)
Scenario: get returns a nested scalar
  Given a cockpit file with handoff.next_skill = "plan-work"
  When I run `bp-yaml get <file> handoff.next_skill`
  Then it prints "plan-work" and exits 0

Scenario: set writes a nested key preserving siblings and frontmatter
  Given a cockpit file with current_movement = "FRAME" and an OKF frontmatter block
  When I run `bp-yaml set <file> handoff.next_skill "kickoff-branch"`
  Then handoff.next_skill becomes "kickoff-branch"
  And current_movement is still "FRAME"
  And the OKF frontmatter block is unchanged

Scenario: set creates intermediate maps
  Given a cockpit file with no `metrics` key
  When I run `bp-yaml set <file> metrics.first_pass_gate_rate 0.9`
  Then metrics.first_pass_gate_rate reads back as 0.9

Scenario: get on a missing key fails with a remediation hint
  Given a cockpit file without a `nope` key
  When I run `bp-yaml get <file> nope.here`
  Then it exits non-zero
  And the error names the path "nope.here", the file, and how to list valid keys
