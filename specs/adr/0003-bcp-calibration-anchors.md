---
okf_kind: adr
okf_version: "1.0"
generated_by: "human"
generated_at: "2026-07-04T00:00:00Z"
title: "ADR 0003: BCP Calibration Anchors"
date: "2026-07-04"
status: "accepted"
amends: "constitution.md"
constitution_version: "1.0.0 → 1.1.0"
---

# ADR 0003: BCP Calibration Anchors

## Context
Constitution **B9** makes BCP the roadmap unit: "how much effort is still left?" and "how big is this new epic?" are answered by summing/estimating BCP. B9 already mandates that every count carries a `calibration_id` and that velocity series never mix calibrations. But the plan audit (2026-07-04) and the architecture red-team ([`docs/architecture.md`](../../docs/architecture.md) §10) both flagged the same hole: **B9 defined the provenance field but shipped no reference exemplars.** Without anchors, a solo developer's felt sense of an "S" vs an "L" drifts over months, and the "remaining effort" sum silently lies — the exact failure the red-team named.

The first concrete symptom: epic manifests were carrying BCP numbers (`e01` total 3, `e02` total 4) with nothing to calibrate them against.

## Decision
Amend constitution **B9** to define two named calibration anchors under `calibration_id: bcp-plus-v1`, and bump the constitution from `1.0.0` to `1.1.0`.

1. **Known-3 (small):** a pure single-responsibility module over one file surface — one interface, one boundary, no cross-entity business rules. Canonical exemplar: `bp-yaml` get/set (`e03s01`).
2. **Known-8 (large):** a multi-dimension component — several interface elements, multiple boundaries, residual business rules. Canonical exemplar: `validate-okf`, a kind-aware dispatcher across the 6 OKF kinds + envelope + provenance (`e03s02`).
3. Anchors are **reference points for humans**, never gate inputs. The OKF meta-rule holds: gates check structure and provenance, never a value.
4. Re-anchoring (a new exemplar set) requires bumping `calibration_id`; series across different `calibration_id`s are never combined.

## Rationale
- **Chooses real stories as exemplars.** The anchors are not invented fixtures — they are the two kernel stories the repo builds first, so calibration is dogfooded from M0.
- **Keeps the number honest without gating on it.** Anchors let a human notice "this epic feels bigger than the known-8 but scored 4" — a prompt to re-inspect the story, consistent with B9's "measured, not guessed."
- **Follows the constitution's own amendment procedure** (ADR + version bump), proving the governance path works before any skill depends on `constitution_version`.

## Consequences
- `constitution.md` B9 gains the anchors subsection; version → `1.1.0`.
- Every future `bcp-count` bundle and epic roll-up references `calibration_id: bcp-plus-v1`.
- When `count-bcp` (native module) lands, its decision-table version and this `calibration_id` must agree; a decision-table change forces a new `calibration_id` and re-derivation of the two anchors.
