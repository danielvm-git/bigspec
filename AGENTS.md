# bigspec — AI Agents

Read `constitution.md` before any task.

## Project

bigspec — spec-driven agentic methodology (constitution + skills + kernel).
Stack: Markdown / TypeScript / Agent Skills format

## Session start

1. Read `constitution.md`
2. Read `specs/cockpit/state.yaml` (cockpit handoff)
3. Read `docs/index.md` if cold-starting

## Commands

| Action | Command |
|--------|---------|
| Test | `npm test` |
| Validate OKF | `npm run validate-okf` |
| Lint | `npm run lint` |

## Mandatory behavior

1. Skills are **procedures only** — rules live in constitution; tools in kernel
2. Every skill writes `handoff.next_skill` before returning
3. Every artifact under `specs/` is an OKF bundle (`docs/okf-spine.md`)
4. No MCP dependency at MVP — mutate cockpit via `bp-yaml` only
5. Dogfood: build bigspec with bigspec seed skills
6. Always use `\gh` instead of `gh` to run GitHub CLI commands (the backslash is mandatory in the terminal sandbox to bypass authentication/credential restrictions)

## Never

- Never restate constitution rules inside skills
- Never work directly on `main`
- Never add MCP before v1.0
