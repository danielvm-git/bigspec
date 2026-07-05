---
okf_kind: adr
okf_version: "1.0"
generated_by: "human"
generated_at: "2026-07-05T00:00:00Z"
title: "ADR 0008: Single GitHub Pages Site from docs/; Wiki Retired"
date: "2026-07-05"
status: "accepted"
supersedes: "the wiki approach previously proposed in ADR-0001, ADR-0004, ADR-0006 (all removed; those numbers are retired, never reused — see specs/adr/README.md)"
---

# ADR 0008: Single GitHub Pages Site from docs/; Wiki Retired

## Context
bigspec has two audiences with opposite needs:

1. **Machines/agents** — read the OKF source of truth linearly, under a token budget (B0). Home: `specs/` (artifacts) + `constitution.md` (rules).
2. **Humans** — need a styled, navigable, *discoverable* surface to understand and adopt the methodology.

An earlier design pack (ADR-0001/0004/0006) served the human audience with the **GitHub Wiki** as a derived OKF render target, published by a `publish-to-wiki` kernel tool, bootstrapped from the first commit, and guarded by a wiki-specific `lint-wiki`. Re-examined without attachment to that decision, the wiki loses on the three axes that actually matter for a solo-authored methodology that wants adoption:

- **Discoverability:** GitHub Wikis are *not* indexed by search engines unless the repo has 500+ stars with public editing disabled. A methodology nobody can find via Google is a methodology nobody adopts.
- **Sync debt:** the wiki is a *second git repository* (`<repo>.wiki.git`). A second repo to keep in sync is precisely the "4-target sync pipeline" the project's own keep/cut analysis identified as bigpowers' single biggest source of duplication and CUT.
- **No offsetting benefit:** the wiki's one real advantage — in-UI collaborative editing by arbitrary GitHub users — is irrelevant for a solo, agent-authored project where every page derives from `specs/` anyway.

Everything the wiki would show, a GitHub Pages site shows better: indexed, styled, custom-domain-capable, one pipeline.

## Decision
Publish **one** human surface: a **GitHub Pages site sourced from `docs/`**, organized by the **Diátaxis** framework. Retire the wiki and its ADRs.

1. **Audience split, not tool split.** `specs/` stays the machine-only OKF source of truth (ADRs, epics, stories, cockpit, scope). `docs/` becomes the *only* human documentation source, structured by Diátaxis: `explanation/` · `reference/` · `how-to/` · `tutorials/`. `constitution.md` (rules) and `README.md` (front door) stay at the repo root.

2. **Frame owns Explanation.** The "see it whole before you build it" blueprint — origin, lineage, the 11 blocks, the vocabulary, the roadmap — is the **Explanation** quadrant and is the deliverable of the Frame movement. The other three quadrants fill in as later movements produce material that justifies them; an empty `how-to/` during Frame is honest, not a gap.

3. **Derived render target, one home per fact.** This carries forward the sound doctrine of the retired ADR-0001 without the wiki: the site is a *rendering*, never a source of truth (B4/B8). `docs/reference/` **links** to `constitution.md` and `specs/adr/*`; it never restates them — restating a rule would violate the constitution's own authority clause and is caught by `constitution-lint` (ADR-0005). There is no cross-repo sync and no `publish-to-wiki`-style copy pipeline; at most a build step that assembles `docs/`.

4. **Builder is tech-agnostic and staged; no framework is pinned by this ADR.**
   - **Now (M0):** plain hand-authored HTML/CSS/JS (the existing `site/index.html`), deployed by the existing GitHub Actions workflow (`.github/workflows/pages.yml`) using the official `configure-pages`/`upload-pages-artifact`/`deploy-pages` actions with a `.nojekyll` marker. Zero build dependency, full design control, GitHub-native.
   - **Later (deferred):** *if and when* `reference/` + `how-to/` grow past a handful of pages, a static-site generator MAY be adopted to build `docs/` → Pages. **This ADR deliberately does not choose one.** bigspec is a language-agnostic methodology; it must not tie its own docs to any specific framework. Any future generator is a separate, reversible ADR, and the selection criteria (not the selection) are: no new runtime language forced on users, Diátaxis-friendly, built-in search, deploys via the same Actions artifact. Publishing stays a swap of the build step, never a rewrite of content.

5. **Live from the first commit.** The one genuinely good idea in the retired ADR-0006 — a human surface that compounds from commit 1 so the project can be followed from the start — is satisfied directly: the Pages site already exists at M0. No bootstrap tool is needed; the site *is* the bootstrap.

## Rationale
- **Discoverability is the point.** Pages is Google-indexed; the wiki is not. For adoption this is decisive.
- **Kills a sync target instead of adding one.** One surface, one pipeline (already wired), no second repo — consistent with the project's founding "cut the sync pipeline" decision.
- **Preserves what was right about the wiki design.** Derived-not-authoritative, gate-before-publish, and "derive indexes, don't hand-maintain them" (from ADR-0004) all survive — reattached to Pages and enforced by ADR-0005's `constitution-lint`.
- **Agnostic by construction.** Hand-HTML now commits to no framework; the deferred generator decision keeps bigspec free of a docs-toolchain lock-in it would be embarrassed to preach against.

## Consequences
- **Retired ADRs:** `0001-github-wiki-integration.md`, `0004-llm-wiki-concept.md`, `0006-wiki-bootstrap-from-first-commit.md` are removed. ADR-0005 is rewritten to keep only its surface-independent guardrails.
- **Downstream wiring still to reconcile (follow-on, not in this ADR):**
  - `specs/release-plan.yaml` — the `e02` "GitHub Wiki Integration" epic and its `0.4.0` release line reference the wiki and ADR-0001/0004/0006; the epic should be **repurposed to the Pages site** or removed.
  - `specs/product/SCOPE_LATEST.yaml` — its `core_value`/`summary`/`deliverables` are wiki-centric and must be rewritten around the Pages surface.
  - `specs/execution-status.yaml` and `specs/cockpit/state.yaml` — drop the `e02s00`/ADR-0006 wiki-bootstrap references.
  - `specs/epics/e02-github-wiki/` — retitle/rescope or delete.
- **Kernel:** no `publish-to-wiki` tool is built. The kernel's render responsibilities are the plugin bundle plus (optionally, later) the `docs/` site build.
- **Folder move:** human-facing files currently mis-filed under `specs/` (e.g. metrics-calculation write-ups) migrate into `docs/`; `specs/` holds machine OKF only.
- The `render-frame` skill (Frame movement, M2) is the natural producer of the Explanation blueprint page from OKF + constitution — recorded here as context, decided separately.
