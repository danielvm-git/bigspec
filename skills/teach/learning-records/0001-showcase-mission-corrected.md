---
name: showcase-mission-corrected
description: The mission is a visual pre-build blueprint, not a daily auto-updating live site
metadata:
  type: project
---

# Mission Correction: Visual Blueprint, Not Auto-Pipeline

## What I got wrong first

I initially read "the site should be live during construction" as "build a CMS/pipeline that
auto-updates daily from OKF artifacts" and produced three lessons on artifact-driven architecture,
11ty, etc. Wrong altitude.

## What Daniel actually wants

A **visual product showcase** — a beautiful HTML page that lets him (a very visual thinker) *see
bigspec whole before writing any of it*. The purpose is to plan the build order and avoid repeating
bigpowers' mistakes. "Live during construction" just means it goes public and gets updated as the
project progresses — not an automated pipeline.

## The content is the story of bigspec

- **Origin:** bigspec is a greenfield rebuild of **bigpowers** (41 days, 98 releases, 74 skills).
  Same soul, none of the accreted debt.
- **The layer cake:** Uncle Bob → Ousterhout → Karpathy/Pocock → Wasowski/BCP → Akita/GSD/BMAD/OKF
  → synthesis. Each wave resolves a tension the last created.
- **Lessons (keep/cut/replace):** the heart of the user's motivation — "build without the same errors."
  KEEP the soul (spec-as-truth, fractal loop, file cockpit, BCP, next_skill). CUT the vanity
  (74-count, 27 docs, 4-target sync, dual formats). REPLACE the shape (6-phase→5 movements,
  94% self-compliance→outcome evals, uniform gates→risk tiers, skills-first→kernel-first).
- **11 building blocks (B0–B10 + Capstone):** poured bottom-up by dependency, not chronology.
- **7 nouns:** Constitution, Spec, Cockpit, Skill, Kernel, Pack, Cycle.
- **The loop:** Frame → Specify → Plan → Build → Prove, spec-anchored, fractal, two lanes.
- **Roadmap:** M0 seed → M1 self-host → M2 corpus → M3 packaging → M4 proof → v1.0 → M5 MCP (last).
- **Product:** the plugin (`bigspec install`) + the scaffold (`bigspec init`).

## Design decisions

- Dark slate + amber "build" accent; product-showcase SaaS aesthetic.
- Visual-first: layer-cake chain, keep/cut/replace board, bottom-up block stack, loop diagram wrapped
  around "the spec," roadmap timeline. Minimal prose walls.
- Sourced strictly from constitution.md + docs/architecture.md — no invention.

## Open questions for next session

- Where should this live to publish? (bigspec repo `site/` or `docs/`? GitHub Pages?)
- Does the "keep/cut/replace" framing land, or does he want the origin story more personal/narrative?
- Add the OKF spine / 6 file contracts as a deeper section? (docs/okf-spine.md not yet mined)
- Does he want it as a single self-contained file (inline CSS) for easy publishing?
