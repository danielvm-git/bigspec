---
title: "ADR 0005: Anti-Drift & Repo-Hygiene Gates"
date: "2026-07-04"
status: "proposed"
supersedes: "specs/adr/0005-wiki-drift-bloat-guardrails.md (wiki-coupled original, retired with the wiki approach — see ADR-0008)"
---

# ADR 0005: Anti-Drift & Repo-Hygiene Gates

## Context
This ADR was originally scoped to the GitHub Wiki pipeline (ADR-0001/0004/0006). Those ADRs are retired: bigspec publishes a **single GitHub Pages site from `docs/`** and cut the wiki (ADR-0008). But the drift and bloat failures the original ADR guarded against are **surface-independent** — they are properties of the `specs/` + `docs/` tree and the constitution, not of any render target. This rewrite keeps exactly those guardrails and drops everything that only made sense against a rendered wiki (`lint-wiki` over wiki pages, orphan-page checks, a wiki `index.md`/`log.md`).

The evidence is bigpowers' own git history (`danielvm-git/bigpowers`, mined locally via `git log`/`specs/bugs/`). Every failure below is a real, previously-fixed bug in that repo, not a hypothetical.

## Concrete failure modes observed in bigpowers (with evidence)
| Failure | Evidence | Cost |
|---|---|---|
| `_LATEST` filename standing in for version control | 14 files: `IMPACT_LATEST.md`, `REFACTOR_LATEST.md`, `GLOSSARY_LATEST.yaml`, etc. | filename drift instead of git history as truth |
| Tautological gates | `BUG-2026-07-04-tautological-verify` | 5 skills' `verify:` was `test -f SKILL.md` — proves nothing |
| Validator that doesn't validate | `BUG-2026-07-03-validate-specs-no-real-parser` (high) | grep-only checks let 40 corrupt YAML files pass every gate |
| Undocumented rule exceptions | `BUG-2026-07-03-trace-stories-613-line` | 613-line file waived with no review date, contradicting the repo's own 300-line rule |
| Raw repo bloat | commit `05a0527b "remove bloat and dead artifacts"` | 2.9MB PDF, `.DS_Store`, dead symlink, empty dir committed until a dedicated cleanup pass |
| Doctrine re-diverging across files | commit `58869e9 "stand up anti-drift harness"` | needed a whole epic to reconcile `docs/references/*` after the fact |

The constitution already encodes fixes for the first three (B8 abolishes `_LATEST`; B3 bans `test -f` verifies; the meta-rule requires gates to check structure/provenance). The last three — waiver hygiene, bloat, and doctrine re-divergence — have no enforcement mechanism yet. That gap is what this ADR closes.

## Decision
Add machine checks over `specs/` + `docs/` + `constitution.md`. No new authority: the constitution stays the sole source of *rules* and `specs/` the sole source of *artifacts*; these gates only make existing invariants enforced instead of aspirational.

1. **`constitution-lint` — doctrine has exactly one home, checked.** The constitution already states "if a rule appears in two files, this one wins and the other is a bug." This gate greps `docs/` and `skills/` for restated constitution rules and fails on duplication. It is the enforcement arm of the "one home per fact; `docs/reference/` links to the constitution, never restates it" rule adopted in ADR-0008, and is the same check already gestured at in the constitution's Capstone and its amendment procedure.

2. **Bloat gate on `specs/` and `docs/`.** Any binary asset over a size threshold (bigpowers' violation was a 2.9MB PDF; this repo currently carries four `.docx` files under `docs/`) or any path matching `node_modules|.DS_Store|*.excalidraw-cache` fails CI if committed. Cheap, mechanical, catches exactly what the bigpowers cleanup commit had to do by hand. Human-facing source stays greppable Markdown (B0/B1).

3. **Waiver hygiene.** Every documented exception (constitution Part III) carries a `review_date`; the gate fails if that date has passed — closing the exact gap in `BUG-2026-07-03-trace-stories-613-line`.

4. **Contradiction check on OKF data.** A `bcp-count` or `epic` total that disagrees with its own component sum, or a `calibration_id` mismatch across a velocity series (B9 forbids this at the data level; this gate makes it a visible CI failure, not a silent one). This runs on the `specs/` data directly — no render target required.

## Rationale
- **Cheaper to gate than to clean up.** Every bigpowers cost above was paid *after* the fact, as a dedicated bug or cleanup commit. A few-line CI check is strictly cheaper than a remediation epic.
- **Consistent with B6 (gates are enforced, not advisory).** These are Quality gates (Part IV) — they block, they don't just warn.
- **Surface-independent by design.** Nothing here depends on how (or whether) the OKF is rendered for humans; the checks hold whether the human surface is Pages, a wiki, or nothing.

## Consequences
- The kernel gains a `hygiene` validator group (`constitution-lint`, bloat, waiver, contradiction) runnable in CI and locally; wire it into the same lane as `validate-okf`.
- The constitution's Part III exception table needs a `review_date` column if it lacks one — a one-line schema addition.
- First cheap win available today: the bloat gate would immediately flag the four `docs/*.docx` binaries for conversion to Markdown or removal.
- This ADR is additive and independently revertible.
