# BCP-Plus reference specs

Copy the **spec-only** ADRs from the `big-counter` repository here when implementing native `count-bcp`.

Do not depend on an external counting tool. Implement:

1. Element Router (dimension classification)
2. Decision tables per dimension (criteria-defined sizes)
3. Glossary as ground truth (entities, roles, NFR baselines)
4. `calibration_id` provenance on every `bcp-count` bundle

See `constitution.md` B9 and `docs/architecture.md` §12.
