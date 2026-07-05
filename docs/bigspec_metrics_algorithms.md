# bigspec Metrics Calculation Algorithms

This document defines the mathematical formulas and data sources required to calculate the Bilingual Metrics Telemetry Suite (Epic `e06`). These calculations map legacy metrics (DX Core 4, DORA, Lean, PMBOK) directly to local, file-based agentic workflows.

## 1. Speed & Effort

### Agentic Cycle Time
*   **What it measures:** Lead time / Flow.
*   **Formula:** `T(status: done) - T(status: planned)`
*   **Data Source:** Git history of the `specs/epics/` YAML files. 
    *   `T(planned)` = Timestamp of the commit that first introduces the story.
    *   `T(done)` = Timestamp of the commit that changes the story state to `done`.

### H/BCP (Hours per Big Counter Point)
*   **What it measures:** Volume, Cost, and Velocity.
*   **Formula:** `Agentic Cycle Time (in hours) / BCP value`
*   **Data Source:** The `bcp: <int>` field inside the OKF story YAML.

## 2. Quality & Rework

### AI Code Retention
*   **What it measures:** Defect density, Rework, WTFs/min. The ultimate measure of AI quality.
*   **Formula:** `100 - ((Lines modified or deleted by Human / Lines authored by Agent) * 100)`
*   **Data Source:** Git diffs. 
    1. Identify commits authored by the AI Agent (e.g., via specific commit hook flags, author name, or tool).
    2. Identify subsequent commits by the Human developer before the feature branch is merged to `main`.
    3. Measure the diff intersection (how much of the agent's code was rewritten by the human).

## 3. Governance & Effectiveness

### Context Fidelity (Spec Drift)
*   **What it measures:** Friction, Compliance, and AI hallucination/dropping of requirements.
*   **Formula:** `(Tasks with passing verify commands / Total Tasks in Story) * 100`
*   **Data Source:** The `tasks:` array in the story YAML. Each task must have a `verify: <cmd>` attached. If the command returns exit code 0, it passes.

### ISO/IEC 25010 Coverage
*   **What it measures:** NFR (Non-Functional Requirement) compliance.
*   **Formula:** `(Number of NFR tests / Total codebase tests) * 100` OR a strict Boolean PASS/FAIL per ISO category.
*   **Data Source:** AST parsing or Grep. Scanning the test suite for ISO tags (e.g., `// @ISO-25010: Security`, `// @ISO-25010: Reliability`). 

## 4. Predictability & Impact

### big-counter Maturity Score (CMMI Proxy)
*   **What it measures:** Process adherence and predictability (CMMI Levels 1-5).
*   **Formula:** A discrete grading scale based on the structural integrity of the project.
    *   **Level 1 (Initial):** Imperative prompts, no specs. (Fails bigspec).
    *   **Level 2 (Managed):** Plain markdown specs exist.
    *   **Level 3 (Defined):** Specs are structured OKF YAML (`bp-yaml` parseable).
    *   **Level 4 (Quantitatively Managed):** Stories possess BCP estimations and explicit `verify:` steps.
    *   **Level 5 (Optimizing):** 100% Traceability (Code/Tests map directly back to release-plan requirements).
*   **Data Source:** Static analysis of the `specs/` directory format and content.

### Coefficient of Variation (CV%)
*   **What it measures:** Variance (SPI/CPI equivalent).
*   **Formula:** `(Standard Deviation of H/BCP / Mean of H/BCP) * 100`
*   **Data Source:** Aggregation of historical H/BCP data. Restricted to N ≥ 20 data points to prevent statistical noise.

---

## Appendix: Hermes Library Reference (The Historical Baselines)

The following table maps the fundamental engineering/manufacturing theories (from foundational books) to our metrics. This acts as our theoretical baseline—proving that the `bigspec` suite isn't inventing new metrics, but automating the collection of classic principles for an agentic era.

| Core Intent | Reference Book | Key Metric / Concept | Definition & Alignment |
| :--- | :--- | :--- | :--- |
| **Speed & Effort** | **Lean Software Development** *(Poppendieck)* | **Cycle Time & Lead Time** | The central metric of Lean: the time from a customer request to delivery. Poppendieck argues this is the *ultimate* metric of Lean, mirroring our Agentic Cycle Time. |
| | **Lean Software Development** *(Poppendieck)* | **Cost of Delay (CoD)** | The financial cost of deferring speed. Prioritizing tasks based on how much value bleeds out over time. |
| | **Agile Estimating and Planning** *(Mike Cohn)* | **Velocity & Throughput** | The historic measure of volume (points/hours per iteration). Aligns directly with our *H/BCP* metrics. |
| | **The Toyota Way** *(Jeffrey Liker)* | **Value-Added Flow Efficiency** | The ratio of time spent adding value vs. time spent in queues. Directly inspired the *Flow Efficiency* concept. |
| | **Practices of an Agile Developer** *(Subramaniam & Hunt)* | **Build Time / CI Speed** | Fast feedback loops are critical; if builds take too long, developers context-switch. |
| **Quality & Rework** | **Clean Code** *(Robert C. Martin)* | **WTFs/Minute & Technical Debt** | A heuristic for readability and defect likelihood. High WTFs mean high cognitive load, directly mirroring our *AI Code Retention*. |
| | **Clean Code** *(Robert C. Martin)* | **Cyclomatic Complexity** | Ensuring code isn't overly complex and is covered by tests. Maps to *ISO/IEC 25010 Coverage*. |
| | **The Toyota Way** *(Jeffrey Liker)* | **First Time Quality (FTQ) / Jidoka** | The principle of stopping the line to fix defects immediately. Maps to DORA's CFR and our *AI Code Retention*. |
| | **The Toyota Way** *(Jeffrey Liker)* | **Andon Cord Pulls** | Frequency of stopping the line due to a quality issue. Tracks process stability. |
| | **Practices of an Agile Developer** *(Subramaniam & Hunt)* | **Escaped Defects** | Bugs that reach production, bypassing local tests. The ultimate rework penalty. |
| | **Lean Software Development** *(Poppendieck)* | **Defect Density** | The number of defects per line of code or feature, driving the Lean war on waste. |
| **Governance & Effectiveness** | **Lean Software Development** *(Poppendieck)* | **WIP (Work In Progress) Limits** | High WIP is the primary mathematical cause of friction and queueing delays. Effectiveness drops as WIP rises. |
| | **PMBOK 7th Edition** *(PMI)* | **Tailoring & Compliance** | PMBOK 7 shifts from rigid processes to principles, but insists on tracking adherence to the tailored process. Mirrors our *Context Fidelity / Spec Drift*. |
| | **The Toyota Way** *(Jeffrey Liker)* | **Standardized Work Adherence** | Ensuring the team follows the documented best-known process before trying to improve it. |
| | **Agile Retrospectives** *(Derby & Larsen)* | **Action Item Follow-Through** | Tracks whether the team actually implements process fixes. An indicator of organizational friction. |
| | **Agile Retrospectives** *(Derby & Larsen)* | **ROTI (Return on Time Invested)** | Rating the effectiveness of meetings/ceremonies to ensure they don't become wasteful friction. |
| **Predictability & Impact** | **PMBOK 7th Edition** *(PMI)* | **Value Delivery / Benefit Realization** | Focuses on Business Outcomes over mere output tracking. |
| | **PMBOK 7th Edition** *(PMI)* | **EVM (SPI & CPI Variance)** | Schedule/Cost Performance Index. Traditional variance metrics tracking predictability against baselines. Maps perfectly to our *CV%*. |
| | **Agile Estimating and Planning** *(Mike Cohn)* | **Release Variance (Burndowns)** | Tracking predictability against a target over time. Maps to *CMMI / Spec Maturity*. |
| | **Agile Estimating and Planning** *(Mike Cohn)* | **Cone of Uncertainty** | Measuring the narrowing of variance and estimation error as a project progresses. |
| | **Agile Retrospectives** *(Derby & Larsen)* | **Team Morale / ESAT** | Employee Satisfaction is used as a leading indicator of predictability and impact. |

---

## Appendix: CI&T Production System (CPSBok) Reference

The CPSBok relies heavily on Lean manufacturing (Toyota Production System) adapted for enterprise digital transformation, introducing proprietary mechanisms like **BCP (Business Complexity Points)**. This proves that enterprise service providers rely on the exact same philosophical pillars that `bigspec` automates.

| Core Intent | CPSBok Component | Key Metric / Concept | Definition & Alignment |
| :--- | :--- | :--- | :--- |
| **Speed & Effort** | **Appendix A / Sprint Status** | **BCP (Business Complexity Points)** | The central unit of effort and complexity in CPS. Aligns perfectly with our `H/BCP` (Hours per BCP) and tracking volume. |
| | **Sprint Planning** | **Capacity vs. Committed BCP** | Measuring team bandwidth and buffer. Maps to *Velocity* and flow predictability. |
| | **Backlog Health** | **Velocity Trend** | Tracking historical BCP delivery to forecast future speed. |
| | **Chapter 23** | **One Piece Flow / Bottleneck Elimination** | Reducing batch sizes to improve Lead Time. Maps to our *Agentic Cycle Time*. |
| **Quality & Rework** | **Chapter 24 (Quality Built-In)** | **Jidoka (Prevention over Detection)** | The philosophy that quality must be burned into the process. Maps to our *AI Code Retention* (getting it right the first time). |
| | **Clean Code Standards** | **Technical Debt & Duplication limits** | Explicit tracking of code rot. Mirrors *WTFs/Minute* and *Churn*. |
| | **CI Pipeline Templates** | **Code Coverage & Complexity** | Hard automated quality gates. Maps directly to our *ISO/IEC 25010 Coverage*. |
| **Governance & Effectiveness** | **Chapter 2 / Intro** | **SOX & GDPR Compliance Checklists** | Enterprise-grade governance requirements. A heavier version of our *Context Fidelity / Spec Drift* metrics. |
| | **Continuous Flow** | **Visual Management / Impediment Tracking** | Tracking active blockers and escalation status to measure friction in the system. |
| | **Quality Built-In** | **Strict Definition of Done (DoD)** | Explicit criteria for completion to prevent premature handoffs. |
| **Predictability & Impact** | **Success Metrics (Templates)** | **Engagement Level & Decision Speed** | Unique organizational leading indicators tracking how fast clients/stakeholders make decisions. |
| | **Chapter 2 (Value)** | **Value Measurement** | Ensuring business value is tracked alongside output. |
| | **Sprint Status Report** | **Remaining BCP / Progress %** | Tracks variance against the Sprint goal, essentially an Agile version of EVM (Earned Value Management) / *CV%*. |

---

## Appendix: BCP+ Documentation Suite Reference

The BCP+ framework extends the open-source BCP standard to capture non-functional complexity (NFRs) and standardise AI-augmented velocity. The four foundational BCP+ documents (`Whitepaper`, `Story-Template-and-Backlog`, `Validation-and-Audit`, and `StoryFormat-Rerun`) align directly with our intents:

| Core Intent | BCP+ Document | Key Metric / Concept | Definition & Alignment |
| :--- | :--- | :--- | :--- |
| **Speed & Effort** | **Whitepaper** | **H/BCP (Hours per BCP)** | Defended as the "cleanest available denominator for hybrid human–AI velocity comparisons." Validates our primary volume metric. |
| | **Story-Template** | **BCP-NFR Sizing** | Using 13 orthogonal dimensions (10 functional, 3 non-functional) to accurately size complexity and effort. |
| **Quality & Rework** | **StoryFormat-Rerun** | **AI Code-Generation Quality** | Evaluated 10 formats; Spec-Driven Development scored highest, directly reducing AI hallucinations and rework (improving *AI Code Retention*). |
| | **Story-Template** | **Quality Attributes (D11)** | Explicitly forcing NFRs into the spec to prevent late-stage quality failure. |
| **Governance & Effectiveness** | **Story-Template** | **Maturity Self-Score (1-5)** | Governance gate for sprint commitment. Proves that lower maturity creates 3x higher estimation variance. Validates our *big-counter Maturity Score*. |
| | **Whitepaper** | **Security & Compliance (D12)** | Governance dimensions that consume 20-40% of effort in regulated industries, previously hidden in agile story points. |
| | **Whitepaper** | **Vendor Governance** | Ensuring outsourced arrangements are auditable through standard BCP sizing, acting as an enterprise compliance layer. |
| **Predictability & Impact** | **Story-Template / Audit** | **Coefficient of Variation (CV%)** | BCP+ explicitly tracks the drop in variance (from 39.5% to 12.2%) when stories are mature. Validates our *CV%* metric for predictability. |
| | **Whitepaper** | **Capital Allocation Accuracy** | Tying predictable estimation back to business budget and impact, proving BCP+'s superiority over traditional Story Points. |
