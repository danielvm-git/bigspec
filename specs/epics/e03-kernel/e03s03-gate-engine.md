---
okf_kind: story
okf_version: "1.0"
generated_by: "verify"
generated_at: "2026-07-05T16:30:00Z"
supersedes: null
commit_range: null
---
# Story: Risk-Tiered Gate Engine (e03s03)

## 1. Context & Goal

The constitution defines four gate types (Confirm / Risk / Quality / Completeness)
and four risk tiers (P0–P3) that select the verification lane (fast vs full).
Until now these are *declared* in tasks OKF bundles but never *enforced* by code.

This story delivers the gate engine — a kernel module that reads a story's tasks
ledger, evaluates its checkpoints, checks gate conditions against the ledger's
risk tier, and reports pass/fail. Together with the lane selector it gives the
agent a deterministic answer to "is this story ready to advance?"

## 2. Target Users / Actors

- **Agent skills** (`prove`, `quality-check`) — call `gate-check` to decide
  whether a story passes its quality gate before moving to review.
- **The `bigspec` CLI** — `gate-check <tasks-file>` as a subcommand.
- **The orchestrator** — reads gate status from the cockpit to decide next
  movement.

## 3. Elements (Data, Interfaces, Logic)

### Gate Engine (exported module `kernel/src/gate-engine.ts`)

- **`parseTasks(path: string): TasksLedger`** — reads an OKF tasks YAML file and
  parses story metadata, risk_tier, checkpoints, and gates. Errors on missing
  required fields with a remediation hint (constitution Part III).

- **`evaluateCheckpoint(task: Checkpoint): CheckpointResult`** — runs the
  checkpoint's `verify_cmd` via `execSync` and returns `{checkpoint, passed:
  boolean, stdout?, stderr?}`. Shells out — the verify_cmd is the single
  source of truth for behavioral correctness.

- **`evaluateGates(tasks: TasksLedger): GateResult[]`** — evaluates each gate
  defined in the ledger:
  - **Risk gate**: PASSING if `risk_tier` is one of P0–P3; otherwise FAILING.
  - **Quality gate**: PASSING if all checkpoints are PASSING (according to the
    ledger's checkpoint status); otherwise FAILING.
  - **Completeness gate**: PASSING if `state` is "PASSING"; otherwise reports
    its current state (PENDING / FAILING).
  - **Confirm gate**: PASSING if user-approved marker present; otherwise PENDING.

- **`getLane(tier: RiskTier): VerificationLane`** — maps tier to lane
  definition (constitution Part II):
  - **P0**: lane `full`, steps `["uat", "nfr-gates", "security-scan", "fresh-review"]`
  - **P1**: lane `full`, steps `["build", "test", "lint", "step-by-step-uat", "review"]`
  - **P2**: lane `full-light`, steps `["smoke", "typecheck", "lint"]`
  - **P3**: lane `fast`, steps `["typecheck", "lint", "quick-fix"]`

### CLI additions to `bigspec`

- **`bigspec gate-check <tasks-file>`** — parses the file, evaluates all gates,
  runs all checkpoint verify commands, prints a report. Exits 0 if all gates
  PASSING; exits 1 if any gate FAILING or BLOCKED.

- **`bigspec gate-lane <P0|P1|P2|P3>`** — prints the verification steps for
  the given risk tier. Quick reference for agents and humans.

## 4. Non-Functional Requirements (NFRs)

- **Deterministic**: same inputs → same output. No network calls.
- **Fast**: gate evaluation is sub-second for a typical 5-checkpoint ledger.
  Lane lookup is O(1).
- **F.I.R.S.T tests** through the public module functions.
- **Error messages** include the file path, the offending field, and a
  remediation hint (constitution Part III — Errors).
- Risk tier **P1** — full lane (build + test + lint + review).

## 5. Acceptance Criteria (Gherkin)

Scenario: gate-check reports all gates PASSING for a complete tasks ledger
  Given a tasks file with risk_tier=P1, all checkpoints PASSING, all gates PASSING
  When I run `bigspec gate-check <file>`
  Then it exits 0
  And the report shows all gates PASSING

Scenario: gate-check reports FAILING when a checkpoint is FAILING
  Given a tasks file with one checkpoint FAILING
  When I run `bigspec gate-check <file>`
  Then it exits 1
  And the report names the failing checkpoint by id

Scenario: gate-lane returns correct steps per tier
  Given I query tier P0, P1, P2, and P3
  When I run `bigspec gate-lane P1`
  Then it prints the P1 lane steps (build, test, lint, step-by-step-uat, review)
  And exits 0

Scenario: parseTasks errors on missing risk_tier
  Given a tasks file with no risk_tier field
  When `parseTasks` is called
  Then it throws with a message naming the file and the missing field

Scenario: gate-check evaluates checkpoint verify commands
  Given a tasks file with verify_cmd on each checkpoint
  When `evaluateCheckpoint` is called
  Then it shells out to the command and records stdout/stderr
  And returns a `CheckpointResult` with passed=true on exit 0
