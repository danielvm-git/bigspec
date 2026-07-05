# What to use to build bigspec

> Decision guide: which SDD frameworks are **the runtime**, which are **prior art to steal**, and which to **ignore**.

---

## Short answer

| Use as… | Choice |
|---|---|
| **Your methodology** | **bigspec only** — constitution + fractal loop + OKF + native `count-bcp` |
| **Your build process** | **Dogfood bigspec** — build bigspec with the 5 M0 seed skills |
| **Skill format** | **Anthropic Agent Skills** (portable SKILL.md + plugin/marketplace) |
| **Prior-art research** | **`opensrc fetch`** in `research-first` — read sources, never adopt wholesale |
| **Idea quarry (already synthesized)** | bigpowers reborn design, e48 opensrc survey in bigpowers repo |

**Do not** scaffold bigspec on top of BMAD, Spec Kit, OpenSpec, or GSD as a framework. They are ingredients already distilled into the constitution (B0–B10).

---

## Framework-by-framework verdict

### bigpowers (current repo)

| Verdict | **Reference only — do not build on it** |
|---|---|
| Steal | 8 Gherkin features as principle targets; skill *ideas*; BCP-Plus ADR text from `big-counter` specs; lessons learned (sync debt, 74-skill sprawl, MCP-last) |
| Skip | 4-target sync pipeline, 94% self-compliance gate, dual epic formats, 27 reference doc restatements |
| Role | Archive of experiments. Copy *design docs*, not the tree. |

### BMAD Method

| Verdict | **Steal mechanisms — already in B5, B10** |
|---|---|
| Steal | Document lifecycle; **TEA P0–P3** risk tiers; NFR gates for P0/P1; WSJF-ish epic ordering |
| Skip | Full BMAD agent roster, `_bmad/` folder layout, their constitution verbatim |
| When to `opensrc fetch` | Before implementing `verify-work` NFR gate or risk-tier tables — cite real TEA patterns |

### GitHub Spec Kit

| Verdict | **Steal constitution + critic pattern — already in B4, B6** |
|---|---|
| Steal | Single **constitution.md**; spec-as-source-of-truth; **clarify / ambiguity critic** in `plan-work` |
| Skip | Spec Kit CLI as your orchestrator; their folder layout as mandatory |
| When to `opensrc fetch` | Before `plan-work` ambiguity critic — read `github/spec-kit` clarify flow |

### OpenSpec

| Verdict | **Research for delta-spec ideas — not your spine** |
|---|---|
| Steal | Change/delta spec discipline; lightweight “what changed” artifacts |
| Skip | Adopting OpenSpec as the primary spec format (bigspec uses OKF + story contract) |
| When to `opensrc fetch` | If you add a `change-request` / delta-spec pack later |

### GSD (Get Shit Done)

| Verdict | **Steal context model — already in B7** |
|---|---|
| Steal | **Context rot** thesis; fresh-context subagents; **effort budgeting**; `effort`/`spawn` frontmatter |
| Skip | GSD’s full command surface, nyquist completeness critic verbatim (adapt into `verify-work`) |
| When to `opensrc fetch` | Before hardening `handoff.next_skill` and subagent spawn rules |

### opensrc

| Verdict | **Tool for Frame movement only** |
|---|---|
| Use | `opensrc fetch github.com/github/spec-kit` (etc.) before building a feature that mirrors prior art |
| Skip | Treating cached repos as dependencies — read, cite, implement natively in bigspec |

### spec-and-loop / Ralph-style loops

| Verdict | **Competitor pattern — do not adopt as base** |
|---|---|
| Note | Closest npm neighbor to “bigloop” naming; different product. bigspec’s loop is **spec-anchored + risk-tiered**, not OpenSpec+Ralph chained |
| Steal | Failing→passing task ledger idea (already in OKF `tasks` kind) |

### anthropic/skills

| Verdict | **Format + Capstone eval methodology** |
|---|---|
| Use | Native Agent Skill authoring; **with/without-skill eval Δ** as quality gate (Capstone) |
| Skip | Their catalog as your catalog — write ~29 bigspec procedures |

### big-counter (spec repo)

| Verdict | **Spec reference for B9 — not a runtime dependency** |
|---|---|
| Use | Copy ADR/spec text into `docs/bcp-plus/`; implement in **`count-bcp`** skill/kernel |
| Skip | Calling external `big-counter` CLI or MCP |

---

## Recommended build stack (M0→M1)

```
Layer 0 — Docs (done)     constitution.md · docs/okf-spine.md · docs/architecture.md
Layer 1 — Kernel (M0)     TypeScript: validate-okf · bp-yaml · constitution-lint
Layer 2 — Seed skills     5 SKILL.md files (Agent Skills format)
Layer 3 — Dogfood         Use seed to build count-bcp, gate engine, eval runner (M1)
Layer 4 — Plugin          marketplace.json · bigspec init scaffold
Layer 5 — MCP (last)      Mirror file cockpit post-v1.0 only
```

**Language:** TypeScript for kernel (matches bigpowers-mcp lessons if you add MCP later).

**Tests:** Vitest + golden OKF fixtures per kind.

**Agent:** Cursor or Claude Code with **`using-bigspec`** as bootstrap skill (write in M0).

---

## What “building with X” would mean (and why not)

| If you built *on*… | You would get… | Why reject |
|---|---|---|
| BMAD | `_bmad/` agents + their phases | Duplicates B10; imports their agent sprawl |
| Spec Kit | `specify` CLI driving folders | Fights OKF universal envelope |
| OpenSpec | Delta-spec workflow | Overlaps Plan movement; not your cockpit model |
| GSD | GSD commands + state | Overlaps B7; different handoff shape |
| bigpowers tree | 74 skills + sync pipeline | Imports all debt you're escaping |

**Correct approach:** one repo, one constitution, steal *ideas* via opensrc + ADRs, prove via **outcome evals**.

---

## First commands after clone

```bash
cd /Users/danielvm/Developer/bigspec
npm install          # once package.json has deps
# Implement kernel validate-okf against docs/okf-spine.md
# Write skills/survey-context/SKILL.md … (5 seed skills)
# Run loop to build count-bcp in M1
```

Prior-art prefetch (optional, before coding):

```bash
opensrc fetch github.com/github/spec-kit
opensrc fetch github.com/bmad-code-org/BMAD-METHOD
opensrc fetch github.com/anthropics/skills
```

Read sources; implement in bigspec native shapes only.
