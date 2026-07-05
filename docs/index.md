# bigspec — Document Index

> Greenfield agentic SDD methodology. M0 document foundation **complete** (seeded from bigpowers design pack, 2026-07-04).

---

## The trilogy

| # | Document | Question it answers | Read when |
|---|---|---|---|
| 1 | [`constitution.md`](../constitution.md) | **What are the rules?** — B0–B10, risk tiers, gates, Capstone evals | Before any skill or kernel code |
| 2 | [`okf-spine.md`](okf-spine.md) | **What do files look like?** — OKF envelope + 6 core kinds | Before authoring under `specs/` |
| 3 | [`architecture.md`](architecture.md) | **How does the system work?** — loop, ~29 skills, M0→v1.0 | After 1–2; before building |

**Also read:** [`build-guide.md`](build-guide.md) — what external frameworks to steal vs ignore.

**Read order:** constitution → OKF spine → architecture → build guide.

---

## Cross-reference matrix

| Topic | Constitution | OKF spine | Architecture |
|---|---|---|---|
| Skill = procedure only | B3 | — | §1, §5 |
| BCP (`count-bcp` native) | B9 | story, glossary, epic | §7, §12 |
| OKF universal envelope | B8 | §1 envelope | §12 |
| Risk tiers P0–P3 | Part II, B5 | epic column | §4 |
| MCP-last | Part V | `bp-yaml` cockpit | §2, §6, §8 M5 |
| Outcome evals | Capstone | — | §1, §7 |
| Fractal loop | B10 | `current_movement` | §4 |
| M0 seed skills | B3 | all 6 kinds | §8 M0 |

---

## M0 checklist

- [x] `constitution.md` at repo root
- [x] `docs/okf-spine.md`
- [x] `docs/architecture.md`
- [x] `docs/build-guide.md`
- [ ] Implement `validate-okf` (kernel)
- [ ] Implement `bp-yaml` get/set (kernel)
- [ ] 5 seed skills: `survey-context`, `elaborate-spec`, `plan-work`, `develop-tdd`, `verify-work`
- [ ] `count-bcp` in M1 (native BCP-Plus)
- [ ] BCP reference stories in constitution (known-3, known-8)
- [ ] No MCP until post-v1.0

---

## Provenance

Design extracted from [`bigpowers`](https://github.com/danielvm-git/bigpowers) reborn docs (`specs/BIGPOWERS-REBORN.md`, etc.). bigpowers remains the **idea quarry**; bigspec is the clean implementation.
