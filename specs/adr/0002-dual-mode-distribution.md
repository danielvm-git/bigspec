---
okf_kind: adr
okf_version: "1.0"
generated_by: "human"
generated_at: "2026-07-04T00:00:00Z"
title: "ADR 0002: Dual-Mode Distribution Strategy (NPM + Standalone Binary)"
date: "2026-07-04"
status: "accepted"
amended: "2026-07-04 — pinned compile toolchain to Bun; recorded npm name verification"
---

# ADR 0002: Dual-Mode Distribution Strategy

> **Amendment (2026-07-04, plan audit):** The compile toolchain is pinned to **Bun (`bun build --compile`)**, used **build-time only** (see Decision §2). The npm name **`bigspec`** was verified **available** (`npm view bigspec` → `E404`), so the `@semantic-release/npm` path is unblocked.

## Context
`bigspec` is developed as a TypeScript (Node.js) project. However, it is intended to be a language-agnostic orchestration methodology that can be used on Python, Go, Rust, or any other type of project. Requiring end-users to install Node.js just to run `bigspec` introduces friction for non-JavaScript teams.
We need a distribution method that is zero-dependency for non-Node users, while retaining the automated versioning power of `semantic-release`.

## Decision
We will adopt a "Dual-Mode" distribution strategy orchestrated entirely by `semantic-release` in CI/CD:

1. **NPM Package**: We will publish a standard Node.js package to the `npm` registry using `@semantic-release/npm`. This allows JavaScript/TypeScript developers to seamlessly use `npx bigspec`.
2. **Standalone Binaries**: We will compile the TypeScript kernel into standalone executables using **`bun build --compile`** (pinned 2026-07-04). Bun cross-compiles all three targets (`--target=bun-{darwin,linux,windows}-x64|arm64`) from a single CI runner in one command, has first-class TypeScript support, and is used **build-time only** — the kernel source stays portable TS and the emitted binaries embed their own runtime, so end-users need **zero** Bun/Node install (preserving the language-agnostic promise above). Rejected alternatives: `pkg` (archived/unmaintained since 2023) and Node SEA (official but cannot cross-compile cleanly, forcing per-OS runners). `deno compile` was a viable runner-up; Bun won on single-command cross-compilation and CI simplicity (B0 complexity economy).
3. **GitHub Releases integration**: We will use the `@semantic-release/github` plugin to attach these compiled binaries (`bigspec-macos`, `bigspec-linux`, etc.) directly to the GitHub Release. Non-Node users can simply download these executables with zero dependencies.
4. **Package Managers**: We can optionally use `@semantic-release/exec` to trigger updates to a Homebrew formula, pointing to the standalone binary.

## Rationale
- **Zero Friction Adoption**: Python or Go teams can adopt `bigspec` without polluting their environments with Node.js.
- **Automated Pipeline**: `semantic-release` remains our single source of truth for version bumps and releasing, managing both distribution paths simultaneously based on Conventional Commits.
- **Flexibility**: We cater to JS developers (who expect `npx`) and non-JS developers (who expect a compiled CLI binary) without maintaining two separate codebases.

## Consequences
- Our CI/CD build pipeline (`.github/workflows/`) needs a **Bun setup step** (`oven-sh/setup-bun`) and a compilation matrix that runs `bun build --compile` per target before `semantic-release` runs the publish step.
- `semantic-release` configuration needs to be updated to include `@semantic-release/github` with the `assets` configuration pointing to the compiled binaries.
- Bun is a **build-time dependency only** — it must never be imported by kernel source (no `Bun.*` APIs); the kernel stays runnable under Node ≥20 (`package.json` `engines`) so the `npx bigspec` path is unaffected. This constraint is enforced in story `e01s01`.
- Sequencing: this epic (`e01`) cannot start until the kernel exists to compile — it is gated behind `e03` (kernel) and `e05` (eval proof) in the release plan.
