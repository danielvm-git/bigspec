---
okf_kind: reference
okf_version: "1.0"
generated_by: "security-review"
generated_at: "2026-07-05T19:45:00Z"
supersedes: null
commit_range: null
---
# Threat Model — e03 Kernel Foundation

## Epic Scope

| Story | Component | Operation | Surface |
|---|---|---|---|
| e03s01 | bp-yaml | YAML get/set on cockpit file | Write path to `specs/cockpit/state.yaml` |
| e03s02 | validate-okf | Read-only OKF envelope validator | Read path under `specs/` |
| e03s03 | gate-engine | Tasks ledger parser + verify_cmd executor + gate evaluator | Shell execution via `execSync` |

## Trust Boundary

- **CLI arguments** are trusted (convention: env vars and CLI flags are trusted values — exclusion #3).
- **Tasks ledger YAML** is agent-authored, stored under `specs/epics/*/` — same trust domain as the kernel.
- **verify_cmds** in tasks ledgers are shell commands the agent wrote — same author as the code running them.
- **No network boundary** exists. All three components are local, synchronous, file-only.

## Threat Analysis

### T1: bp-yaml YAML corruption (data integrity)

| Attribute | Value |
|---|---|
| **Category** | Data integrity (not a security vulnerability per se) |
| **Confidence** | 4/10 — suppressed by exclusion #1 (not DOS) and #8 (race condition is theoretical). This is a **correctness concern**, not a security boundary crossing. |
| **Exploit path** | N/A — CLI args are trusted. Only the agent or developer invokes bp-yaml. |
| **Risk** | LOW — bugs in the serializer could corrupt the cockpit file, but this is quality-gated by tests (5 PASSING checkpoints) and review. |

**Mitigation (already in place):**
- 5 F.I.R.S.T checkpoints covering byte-stable round-trip, missing-key errors, intermediate map creation
- Risk tier P1: full lane with review
- The cockpit file is version-controlled — corruption is recoverable via `git checkout`

### T2: validate-okf arbitrary file read

| Attribute | Value |
|---|---|
| **Category** | Path traversal |
| **Confidence** | 3/10 — suppressed. The `collectFiles` function uses `readdirSync` with `withFileTypes` and only processes `.md`, `.yaml`, `.yml` extensions under `specs/`. No user-controlled path input. |
| **Exploit path** | N/A — no untrusted input feeds the file path. The root is hard-coded to `specs/`. |
| **Risk** | NONE — read-only, no data sink, no user input. |

**Mitigation (already in place):**
- `walk()` recurses from a fixed root (`specs/`)
- Extension filtering limits to 3 safe types
- Read-only operation — no write path exists

### T3: gate-engine command injection via verify_cmd

| Attribute | Value |
|---|---|
| **Category** | Command injection |
| **Confidence** | 5/10 — suppressed. The `verify_cmd` is read from the tasks ledger YAML — but that YAML is authored by the same agent that runs it. There is no untrusted input boundary between the ledger author and the executor. |
| **Exploit path** | Requires an attacker to write malicious content to `specs/epics/*/*-tasks.yaml`. That attacker already has code execution in the repo — this is not a privilege escalation. |
| **Risk** | LOW — theoretical only. In practice, the agent writes both the verify_cmd and runs it. |

**Mitigation (already in place):**
- Tasks files are in the same trust domain as the codebase (version-controlled, reviewed)
- verify_cmds are simple test runner invocations (`npm test -- -t '...'`)
- Risk tier P1 review catches unexpected shell commands

### T4: Gate engine — incorrect lane selection (logic error)

| Attribute | Value |
|---|---|
| **Category** | Logic error (not a security vulnerability) |
| **Confidence** | 6/10 — suppressed (no concrete exploit path; this is a correctness/business-logic concern). |
| **Exploit path** | A buggy lane selector could skip verification steps for a P0 story, but this is a quality/reliability bug, not a security boundary crossing. |
| **Risk** | LOW — mitigated by 22 passing tests covering P0–P3 lane selection, gate evaluation, and error handling. |

## Summary

| Threat | Confidence | Severity | Reported? |
|---|---|---|---|
| T1: YAML corruption | 4/10 | NONE | ❌ suppressed |
| T2: File read traversal | 3/10 | NONE | ❌ suppressed |
| T3: verify_cmd injection | 5/10 | LOW | ❌ suppressed |
| T4: Lane selection logic | 6/10 | NONE | ❌ suppressed |

**Verdict:** No findings meet the ≥8 confidence threshold. The e03 Kernel Foundation has no exploitable security surface — all three components operate within a single trust boundary (local CLI, agent-authored inputs) with no network exposure, no untrusted user input, and no secrets management.

## Recommendations (defense-in-depth)

1. Add a safety check in `evaluateCheckpoint` that rejects verify_cmds containing shell metacharacters (`;`, `|`, `` ` ``, `$()`) unless the command is on a safe allowlist — this future-proofs against a scenario where tasks files come from an external source.
2. Document the trust model explicitly in `docs/security.md` so future epics (e04 dual-mode distribution, e06 telemetry) inherit the same assumptions.
3. No immediate action required — proceed with the build cycle.
