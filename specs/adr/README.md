# Architecture Decision Records

Each ADR records one decision with its context and consequences. Numbers are permanent identifiers: a retired decision's number is **never reused**, so gaps in the sequence are intentional.

## Active set

| # | Decision | Status | Amends constitution |
|---|---|---|---|
| [0002](0002-dual-mode-distribution.md) | Dual-mode distribution (npm + standalone binary) | accepted | — |
| [0003](0003-bcp-calibration-anchors.md) | BCP calibration anchors (Known-3 / Known-8) | accepted | 1.0.0 → 1.1.0 |
| [0005](0005-anti-drift-repo-hygiene-gates.md) | Anti-drift & repo-hygiene gates | proposed | — |
| [0007](0007-bilingual-metrics-framework.md) | Bilingual metrics framework (DX Core 4 / ISO / CMMI) | proposed | — |
| [0008](0008-single-pages-site-from-docs.md) | Single GitHub Pages site from `docs/`; wiki retired | accepted | — |

## Retired numbers

| # | Was | Retired by |
|---|---|---|
| 0001 | GitHub Wiki as derived OKF target | [0008](0008-single-pages-site-from-docs.md) — one Pages surface, wiki cut |
| 0004 | LLM-Wiki dual-consumption layer | [0008](0008-single-pages-site-from-docs.md) — depended on the wiki |
| 0006 | Wiki bootstrap from first commit | [0008](0008-single-pages-site-from-docs.md) — Pages site is live at M0 instead |

ADR-0005 originally covered *wiki* drift/bloat guardrails; it was rewritten (same number) to keep only the surface-independent gates after the wiki was cut.
