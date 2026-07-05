# Learning Journey: See bigspec Whole Before Building It

The mission is a **visual product showcase** — an HTML site that lets Daniel see bigspec's whole shape
before building it (origin → ideas → building blocks → how they connect → roadmap → product), so he
builds in the right order without repeating bigpowers' mistakes.

## Canonical deliverable (in the bigspec repo)

- `bigspec/site/index.html` — the CANONICAL showcase, self-contained (inline CSS), published via
  GitHub Pages. Sections: hero → live progress tracker → personal origin note + stats → idea
  layer-cake → keep/cut/replace board → 11 building blocks (click-to-expand, rule + provenance) →
  7 nouns → OKF spine (envelope + 6 kinds) → fractal loop → roadmap M0→v1.0→M5 → product.
- `bigspec/.github/workflows/pages.yml` — deploys `site/` to GitHub Pages on push to main.
- `bigspec/site/.nojekyll` — stops Jekyll touching the repo's docs/ markdown.
- Progress tracker is HAND-UPDATED: edit `data-state` on each `.tp` (done|now|next) + the date in `.u`.

## Teaching-workspace draft (earlier iteration)

- [0001-bigspec-showcase.html](lessons/0001-bigspec-showcase.html) — first draft (links assets/styles.css).
  Superseded by the repo `site/index.html`, which adds the personal note, progress tracker, interactive
  blocks, and OKF section. Kept for reference.

## Assets

- [assets/styles.css](assets/styles.css) — shared design system (dark slate + amber accent, type scale,
  cards, chips). Every future page links it.

## Learning Records

- [0001-showcase-mission-corrected.md](learning-records/0001-showcase-mission-corrected.md) — the mission
  pivot from "daily auto-updating live site" to "hand-crafted visual pre-build blueprint."

## References

See [RESOURCES.md](RESOURCES.md).
