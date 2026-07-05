# bigspec

Spec-driven agentic methodology for solo developers — constitution-first, OKF artifacts, fractal loop (Frame → Specify → Plan → Build → Prove), native BCP sizing, outcome evals.

**Status:** M0 bootstrap — design pack complete, kernel + seed skills next.

---

## Start here

| Doc | Purpose |
|---|---|
| [`constitution.md`](constitution.md) | Rules (B0–B10) — single source of truth |
| [`docs/index.md`](docs/index.md) | Doc map + M0 checklist |
| [`docs/okf-spine.md`](docs/okf-spine.md) | OKF envelope + 6 file contracts |
| [`docs/architecture.md`](docs/architecture.md) | System design, loop, skills, build sequence |
| [`docs/build-guide.md`](docs/build-guide.md) | **What to use:** bigspec vs BMAD / Spec Kit / GSD / etc. |

---

## What bigspec is not

- Not a fork of [bigpowers](https://github.com/danielvm-git/bigpowers) — greenfield repo, ideas quarry only
- Not a wrapper around BMAD, Spec Kit, OpenSpec, or GSD — mechanisms synthesized into the constitution
- Not dependent on external `big-counter` — native `count-bcp` implements BCP-Plus specs
- Not MCP-first — file cockpit via `bp-yaml` at MVP; MCP post-v1.0 only

---

## Repo layout (target)

```
bigspec/
├── constitution.md
├── docs/
├── kernel/           # validate-okf · bp-yaml · gates · evals
├── skills/           # ~29 procedures (Agent Skills format)
├── scaffold/         # dropped into user projects via bigspec init
├── evals/
└── specs/            # this repo's own cockpit + epics (dogfood)
```

---

## M0 next steps

1. Read [`docs/build-guide.md`](docs/build-guide.md)
2. Implement kernel `validate-okf` + `bp-yaml` against [`docs/okf-spine.md`](docs/okf-spine.md)
3. Write 5 seed skills: `survey-context`, `elaborate-spec`, `plan-work`, `develop-tdd`, `verify-work`
4. Dogfood the loop to build `count-bcp` (M1)

---

## npm

Package name **`bigspec`** is available on npm (unchecked publish — verify with `npm view bigspec` before first release).

```bash
# future
npm install -g bigspec
bigspec init
```
