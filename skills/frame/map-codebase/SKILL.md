---
name: map-codebase
description: "Deep architectural survey — analyzes stack, architecture patterns, error handling, API shapes, and testing conventions. Goes beyond survey-context by identifying planning signals (consistency gaps, debt hotspots, integration points). Persists findings to specs/context.md. Use when joining a project or before a major refactor."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: low
movement: frame
verify: "specs/context.md exists as an OKF bundle with okf_kind: context, containing stack, architecture, conventions, and signals sections"
---

# Map Codebase

Deep architectural analysis. Unlike `survey-context` which identifies "where we are," `map-codebase` identifies "what we're working with" and surfaces planning signals.

## Process

### 1. Identify core stack

Scan `package.json`, `Cargo.toml`, `requirements.txt`, etc. Note:
- Primary framework, runtime, and critical libraries (ORM, Auth, State, UI)
- Version constraints and deprecated/unusual dependencies

### 2. Map high-level architecture

- Identify entry points (CLI, Web, API)
- Map primary data flow (e.g., Controller → Service → Repository)
- Locate where business logic lives vs. I/O
- Identify established patterns (hexagonal, layered, feature-folders)

### 3. Analyze "gray areas"

Search for patterns in:
- **Error handling**: early catch or bubbled? Global handler? Structured messages?
- **API shapes**: REST/GraphQL/RPC? Casing? Response structure?
- **Type safety**: strict typing? `any` blocks? Interface usage?
- **Testing**: coverage strategy? Mock usage? Test file locations?

### 4. Identify planning signals

- **Consistency gaps**: "Half async/await, half Promises"
- **Debt hotspots**: "`AuthManager` is 1500 lines handling both JWT and sessions"
- **Integration points**: "Needs Stripe API, no wrapper yet"
- **Conventions**: "Always functional components over classes"

### 5. Write specs/context.md

```yaml
---
okf_kind: context
okf_version: "1.0"
generated_by: "skill:map-codebase"
generated_at: <iso-8601>
---
# Project Context

## Stack
- [Framework/Language]
- [Key Libraries]

## Architecture
- [Pattern Description]
- [Data Flow]

## Conventions (Observed)
- [Error Handling]
- [API Design]
- [Type System]
- [Testing]

## Signals / Active Considerations
- [Gap 1]
- [Hotspot 2]
```

### 6. Write handoff

```yaml
handoff:
  next_skill: "search-skills"
  reason: "Codebase mapped. Checking for relevant existing skills."
```
