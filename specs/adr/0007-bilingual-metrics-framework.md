---
title: "ADR 0007: Bilingual Metrics Framework (DX Core 4, ISO, CMMI)"
date: "2026-07-04"
status: "proposed"
---

# ADR 0007: Bilingual Metrics Framework (DX Core 4, ISO, CMMI)

## Context
As `bigspec` aims to provide rigorous governance for agentic workflows, it must balance two distinct needs:
1. **The Solo Developer / Agent:** Needs surgical, deterministic telemetry on specific cycles (e.g., did the agent drop context? did the human have to rewrite the code?).
2. **The Enterprise Buyer:** Thinks in terms of established market standards like DX Core 4, DORA, ISO/IEC 25010, and CMMI.

If `bigspec` only reports internal proprietary metrics (like "BCP Velocity" or the native `count-bcp` maturity diagnostic), it loses the executive narrative. Conversely, if it adopts enterprise SaaS patterns (like surveying developers or relying solely on lagging Jira metrics), it loses its wedge as a deterministic, file-based execution engine.

## Decision
We will implement a **Bilingual Metrics Telemetry Engine**. 
The framework will capture deterministic, file-based telemetry at the end of each cycle and map it directly to enterprise standards.

### The Metrics Map
1. **Speed & Effort (DX Speed / DORA Lead Time)**
   - *Agentic Cycle Time* (Git-anchored speed)
   - *H/BCP & BCP Plus* (Effort vs. Complexity)
   - *Cycle Time & Flow Efficiency* (Legacy diagnostics)

2. **Quality & Rework (DX AI Impact / DORA CFR)**
   - *AI Code Retention / Churn* (Replaces subjective "AI Assertiveness" with verifiable git diffs of how much agent code survives human review).

3. **Governance (DX Effectiveness)**
   - *Context Fidelity / Spec Drift* (Tracks dropped OKF requirements over long sessions).
   - *ISO/IEC 25010 Coverage* (Replaces arbitrary "NFR Ratio" with a verifiable check that security and reliability assertions are executed in code).

4. **Predictability (DX Impact)**
   - *Spec Maturity (CMMI)* (Grades OKF specs against CMMI Levels 1-5).
   - *count-bcp Maturity Score* (Internal INVEST checklist diagnostic, native — not an external `big-counter` dependency; see constitution B9).
   - *CV%* (Variance diagnostic, restricted to N≥20).

## Consequences
- **Positive:** Gives `bigspec` a massive narrative moat. DX measures AI impact *post-hoc* via surveys and git mining; `bigspec` measures it deterministically on the local file system at the point of execution.
- **Negative:** Requires strict discipline. We must build robust parsing for ISO NFR assertions and a diffing engine to accurately calculate AI Code Retention.

## Implementation Details
The telemetry will be rendered as a local ASCII CLI dashboard (or plain-text artifact) to maintain the OKF methodology, rather than requiring a SaaS web interface.
