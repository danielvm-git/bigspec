# CPSBok — Metrics & Calculation Methods Report

**Generated:** 2026-07-04  
**Source:** `/Users/danielvm/Library/Mobile Documents/com~apple~CloudDocs/CIandT/CPSBok/CPSBok_Complete_latest.md` (v1.0.0, November 2025)  
**Method:** Full-text pattern matching across 659KB of markdown documentation covering 37 CPS practices organized in 3 lifecycle phases (Setup, Production Flow, Value Activation).  
**Context:** The CI&T Production System (CPS) is a comprehensive production methodology combining Toyota Production System principles with agile software development practices refined over 30+ years of digital transformation delivery.

---

## CPSBok Structure Overview

| Phase | Chapters | Practices | Focus |
|-------|----------|-----------|-------|
| **Setup Phase** | 4–13 | 10 practices | Vision, planning, teams, backlog, value engineering |
| **Production Flow** | 14–30 | 17 practices | Architecture, capacity, refinement, governance, monitoring, quality, improvement, flow |
| **Value Activation** | 31–37 | 7 practices | Production entry, homologation, support, change management |

**CPSBok explicitly acknowledges** as foundational influences: Toyota Way (Liker), Lean Software Development (Poppendieck), PMBOK (PMI), CMMI, Clean Code (Martin), Agile Retrospectives (Derby/Larsen), and the Agile Manifesto.

---

## CPSBok's Unique Metric: BCP (Business Complexity Points)

The CPSBok has a proprietary estimation and complexity normalization framework called **BCP (Business Complexity Points)**. This is the CPS equivalent of story points but with a structured, factor-based approach.

### BCP Calculation Methodology

**From Chapter 16 (Backlog Refinement):**
> "Backlog Refinement is where the BCP (Business Complexity Points) methodology is applied: Stories are analyzed for **business rules, interface elements, and boundaries**. BCP estimates are assigned based on **complexity factors**."

**BCP Complexity Factors:**
1. **Business Rules:** The number and complexity of business logic rules the story must implement
2. **Interface Elements:** The number of UI components, API endpoints, or integration points involved
3. **Boundaries:** The number of system boundaries crossed (database, external services, modules)

**BCP Sizing Scale (from templates):**
The CPSBok references standard sizing categories (XS, S, M, L, XL) as alternatives:
> "Define estimation approach (story points, development days, t-shirt sizing)" — suggesting BCP can map to standard scales.

### H/BCP (Hours per BCP) — The Productivity Normalizer

**How to Calculate (derived from CPS methodology):**

The CPSBok implies but doesn't fully detail this in the extracted text. Based on the velocity and capacity planning sections:

> **H/BCP = Total Development Hours per Sprint ÷ BCP Completed per Sprint**

This is the CPS norm-referenced productivity metric — equivalent to what the bigspec framework calls "BCP Plus + H/BCP." It normalizes productivity across teams of different compositions and project types.

**Velocity in BCP terms (Chapter 18 — Plan Delivery Capacity):**
> "Review completed work (BCP or story points) per sprint. Calculate average velocity over recent sprints (typically 3-5 sprints)."

---

## Core Intent 1: Speed & Effort (Velocity, Volume, and Cost)

### 1. Velocity (CPS flavor: BCP-based)

**Source:** CPSBok Chapter 18 (Plan Delivery Capacity), Chapter 19 (Monitor & Control)

**How to Calculate:**
> "Velocity Analysis: Review completed work (BCP or story points) per sprint. **Calculate average velocity over recent sprints (typically 3-5 sprints).** Identify velocity trends (improving, declining, stable). Analyze velocity volatility and its causes."

**Formula:**
> **Sprint Velocity = Σ(BCP of completed stories in sprint)**
>
> **Average Velocity = Σ(Velocity of last 3–5 sprints) ÷ Number of sprints**

**CPS extends velocity to include:**
- **Velocity Trends:** Direction (improving/declining/stable)
- **Velocity Volatility:** Variance analysis (coefficient of variation implied)
- **Stability-Velocity-Acceleration Model:** The CPSBok teaches "Stability concept: how stable teams enable predictable delivery. Velocity: measuring and using velocity for planning. Acceleration: techniques for increasing team velocity."

---

### 2. Cycle Time and Lead Time

**Source:** CPSBok Chapter 2 (Value Stream Mapping), Chapter 19 (Monitor & Control)

**How to Calculate (Value Stream Mapping approach):**
> "Create Current State VSM: Document each process step. **Capture cycle times and wait times.** Identify inventories and queues. **Calculate lead time and process time.**"

**Agile Metrics (Chapter 19):**
> "Story cycle time and lead time" — tracked per story.

**Formula (from VSM methodology):**
> **Process Time = Σ(Value-add time of all steps)**
> **Lead Time = Σ(Process time + Wait time of all steps)**
> **Value-Add Ratio = Process Time ÷ Lead Time**
>
> (Explicitly defined in CPSBok: "Calculate value-add ratio (process time / lead time)")

---

### 3. Throughput

**Source:** CPSBok Chapter 24 (Performance Control)

**How to Measure:**
> "Monitor application performance metrics (response time, throughput)" — tracked as a system performance metric.

**Team Throughput (derived from CPS velocity model):**
> **Throughput = BCP completed per sprint** (same as velocity in CPS terms)
> **Throughput Rate = Stories completed per unit time**

---

### 4. WIP (Work in Progress)

**Source:** CPSBok Chapter 26 (One Piece Flow) — an entire practice dedicated to WIP management

**How to Measure:**
> "Minimize work in progress by finishing tasks before starting new ones. Monitor work in progress (WIP) levels."

**WIP Management Rules (from Chapter 26 execution activities):**
1. **Before starting new work:** Check your own incomplete tasks first
2. **Review in-progress stories:** Scan taskboard for stories close to completion
3. **Help teammates:** Prioritize team completion over individual starts
4. **Check unassigned defects:** Consider defect resolution before new features

**WIP Limits (CPS approach):**
> "Work in Progress Management: Manage work in progress limits." — WIP is explicitly managed through Kanban-style limits and disciplined taskboard behavior.

---

### 5. Sprint Burndown / Burnup

**Source:** CPSBok Chapter 19, Chapter 24

**How to Calculate:**
> "Monitor burn-down/burn-up charts for sprint and release. Sprint Progress Tracking: Track stories completed vs. planned. Monitor burndown/burnup charts."

**Burndown Construction:**
- Plot remaining work (BCP or hours) daily
- Compare against ideal trend line
- Assess "Sprint Goal Achievement Rate" as a completion metric

---

### 6. Sprint Goal Achievement Rate

**Source:** CPSBok Chapter 19 (Agile Metrics)

**How to Calculate:**
> **Sprint Goal Achievement Rate = Sprints with goals met ÷ Total sprints × 100%**

---

### 7. Capacity Utilization

**Source:** CPSBok Chapter 24 (Progress Control)

**How to Measure:**
> "Capacity Utilization: Monitor team capacity utilization."

**Formula:**
> **Capacity Utilization = Actual hours worked ÷ Available hours × 100%**

The CPSBok also references:
> "Assess rework percentage and its impact on capacity" — rework consumes capacity.

---

### 8. Blocked Stories Count and Duration

**Source:** CPSBok Chapter 19 (Agile Metrics)

**How to Measure:**
> "Blocked stories count and duration" — tracked as an impediment metric.

---

## Core Intent 2: Quality & Rework (Defects, Stability, and Rework)

### 9. Defect Density

**Source:** CPSBok Chapter 19, Chapter 24

**How to Calculate:**
> "Quality Metrics: Defect density per sprint."

**Formula:**
> **Defect Density = Number of defects found ÷ BCP (or story points) delivered per sprint**

The CPSBok also defines a **Production SLA Compatibility** check:
> "Defect density is within acceptable limits" — compared against SLA thresholds.

---

### 10. Defect Escape Rate

**Source:** CPSBok Chapter 24 (Quality Control)

**How to Calculate:**
> "Track defect density, **escape rate**, and resolution time."

**Formula:**
> **Escape Rate = Defects found in production ÷ Total defects found × 100%**

This is the CPS-specific term for what DORA calls "Change Failure Rate."

---

### 11. Defect Resolution Time

**Source:** CPSBok Chapter 24

**How to Calculate:**
> "Track defect density, escape rate, and **resolution time**."

**Formula:**
> **Resolution Time = Mean time from defect report to fix deployment**

---

### 12. Rework Percentage

**Source:** CPSBok Chapter 18 (Capacity Planning)

**How to Calculate:**
> "Assess **rework percentage** and its impact on capacity."

**Formula:**
> **Rework % = Rework hours ÷ Total development hours × 100%**

---

### 13. Test Automation Coverage

**Source:** CPSBok Chapter 19, Chapter 24

**How to Calculate:**
> "Test automation coverage" — tracked as a quality metric.

**Formula:**
> **Automation Coverage = Automated test cases ÷ Total test cases × 100%**

The CPSBok also tracks:
- **Code Review Coverage:** Percentage of code changes reviewed
- **Test Coverage:** Monitor test coverage metrics (Chapter 24)

---

### 14. Technical Debt Ratio

**Source:** CPSBok Chapter 19, Chapter 24

**How to Measure:**
> "Technical debt ratio" — listed as a quality metric.

**Formula (Industry Standard + CPS):**
> **Technical Debt Ratio = (Remediation cost ÷ Development cost) × 100%**

The CPSBok also tracks:
> "Monitor technical debt accumulation and reduction" — debt as a trend, not just a point value.

---

### 15. Code Quality Metrics

**Source:** CPSBok Chapter 24 (Quality Control)

**Metrics tracked:**
> "Monitor code quality metrics (complexity, duplication, maintainability)"

- **Cyclomatic Complexity** — per module/function
- **Code Duplication** — percentage of duplicated code
- **Maintainability Index** — composite score

---

### 16. Build Success Rate

**Source:** CPSBok Chapter 24 (Stability Control)

**How to Calculate:**
> "Track **build success rate** and build time trends."

**Formula:**
> **Build Success Rate = Successful builds ÷ Total builds × 100%**

---

### 17. Deployment Success Rate

**Source:** CPSBok Chapter 24

**How to Calculate:**
> "Monitor **deployment success rate** and frequency."

**Formula:**
> **Deployment Success Rate = Successful deployments ÷ Total deployments × 100%**

Note: This is the complement of Change Failure Rate (CFR = 1 − Deployment Success Rate).

---

### 18. Burn Quality In

**Source:** CPSBok Chapter 27 (Burn Quality In) — a dedicated practice

While an entire chapter, the core principle is quality built into every step rather than inspected at the end. Quality is embedded in:
- **Definition of Done:** "Clear quality criteria for completion"
- **Acceptance Criteria:** "Clear, testable conditions"
- **Code Review:** "Code review coverage"
- **Automated Testing:** Part of the flow, not a separate phase

---

### 19. System Stability Metrics

**Source:** CPSBok Chapter 24 (Stability Control)

**Metrics tracked:**
> "Assess system uptime and availability. Review incident frequency and severity. Evaluate environment stability and performance."

- **Uptime/Availability:** Uptime ÷ Total time × 100%
- **Incident Frequency:** Incidents per time period
- **Incident Severity:** Distribution across severity levels (P1–P4)

---

### 20. Performance Metrics

**Source:** CPSBok Chapter 24 (Performance Control)

**Metrics tracked:**
> "Monitor application performance metrics (response time, throughput). Track resource utilization (CPU, memory, database). Assess scalability and load handling capability."

- **Response Time:** p50, p95, p99 percentiles
- **Throughput:** Requests per second
- **Resource Utilization:** CPU %, Memory %, DB connections
- **Scalability:** Performance under increasing load

---

## Core Intent 3: Governance & Effectiveness (Friction and Compliance)

### 21. INVEST Compliance Score

**Source:** CPSBok Appendix A (BCP Methodology), Chapter 16

**How to Score (CPSBok explicit criteria):**

| Criterion | Question | Scoring |
|-----------|----------|---------|
| **Independent** | Can the feature be developed independently? | Pass/Fail |
| **Negotiable** | Can requirements be negotiated and refined? | Pass/Fail |
| **Valuable** | Does the feature deliver business value? | Pass/Fail |
| **Estimable** | Can the feature be estimated using BCP? | Pass/Fail |
| **Small** | Is the feature appropriately sized? | Pass/Fail |
| **Testable** | Can the feature be tested and validated? | Pass/Fail |

> **INVEST Score = Passed criteria ÷ 6 × 100%**

---

### 22. Maturity Scoring (4-Axis)

**Source:** CPSBok Appendix A (BCP Methodology)

**How to Score:**
> "Maturity Scoring: **Requirements Maturity:** Completeness and clarity of requirements. **Technical Maturity:** Technical feasibility and complexity. **Business Maturity:** Business readiness and stakeholder alignment. **Resource Maturity:** Team capability and resource availability."

**Maturity Score:**
Each axis is scored on a scale (likely 1–5, consistent with CMMI influence). The four-axis approach provides a more nuanced view than a single maturity number.

> **Overall Maturity = Average of 4 axis scores**

---

### 23. Value Governance Metrics

**Source:** CPSBok Chapter 17 (Perform Value Governance)

**How to Calculate:**

**Value vs. Cost Curve:**
> "Analyze cumulative value delivered against cumulative cost. Identify inflection points where value delivery accelerates or declines. Assess return on investment trends."

**Value Component Analysis:**
> "Track progress on individual value components. Measure actual vs. projected value delivery."

**Value Metrics Assessment (from Chapter 37 — Value Activation):**

| Metric Category | Planned | Actual | Status |
|----------------|---------|--------|--------|
| User Adoption | 80% in 30 days | [tracked] | |
| Process Efficiency | 30% improvement | [tracked] | |
| Cost Reduction | $X savings | [tracked] | |
| Revenue Impact | $Y increase | [tracked] | |
| Quality Improvement | Z% error reduction | [tracked] | |

**Value Gap Analysis:**
> "Identify gaps between planned and actual value — develop gap closure strategies."

---

### 24. ROI (Return on Investment)

**Source:** CPSBok Chapter 12 (Value Engineering), Chapter 17 (Value Governance), Chapter 37

**How to Calculate:**
> "Calculate ROI for value components. Assess business impact and value delivery. Quantify expected benefits and returns. Validate ROI and impact with stakeholders."

**ROI Tracking (Chapter 17):**
> "ROI Calculator: Return on investment tracking. Assess return on investment trends."

**Production Entry ROI (Chapter 37):**
> "ROI trajectory on track. Return on investment trending positively."

The CPSBok provides an **ROI Calculator** tool as part of its value governance toolkit.

---

### 25. SPI / CPI (Earned Value Management)

**Source:** CPSBok Chapter 19 (Monitor & Control)

**How to Calculate:**
> "Earned Value Management (if applicable): **Calculate Schedule Performance Index (SPI). Calculate Cost Performance Index (CPI).** Monitor Estimate at Completion (EAC). Track variance from baseline."

**Formulas:**
> **SPI = EV ÷ PV** (Earned Value ÷ Planned Value)
> **CPI = EV ÷ AC** (Earned Value ÷ Actual Cost)
> **EAC = BAC ÷ CPI** (Budget at Completion ÷ CPI)

---

### 26. Stakeholder Satisfaction

**Source:** CPSBok Chapter 17, Chapter 20

**How to Measure (Chapter 17 — Value Governance):**
> "Client confirms satisfaction with value delivery pace. Stakeholders understand and support prioritization decisions. Business sponsors see evidence of return on investment. Users benefit from delivered capabilities."

Tracked through:
- Stakeholder feedback during sprint reviews
- Expectation management sessions
- "Manage stakeholder satisfaction and address issues"

---

### 27. Continuous Improvement Metrics

**Source:** CPSBok Chapter 25 (Continuous Improvement)

**How to Measure:**
> "Action Item Completion: Monitor completion rate of retrospective action items. Improvement Impact: Assess whether improvements achieve intended outcomes. Team Engagement: Evaluate team participation and engagement in retrospectives. Problem Recurrence: Track whether identified problems are recurring."

**Formulas:**
> **Action Item Completion Rate = Completed action items ÷ Total action items × 100%**
> **Problem Recurrence Rate = Repeated problems ÷ Total problems identified × 100%**

---

### 28. SQA Assessment Results

**Source:** CPSBok Chapter 19

**Metrics tracked:**
> "Compliance: Assess adherence to defined processes and standards. Effectiveness: Evaluate effectiveness of quality practices. Improvement Areas: Identify areas requiring quality improvement. Best Practices: Recognize and propagate quality best practices. Action Items: Track remediation of SQA findings."

---

### 29. Backlog Health Metrics

**Source:** CPSBok Chapter 19, templates

**Metrics tracked:**
> "Total Items, Ready Items, Average BCP, Velocity Trend"

**Backlog Health Score (derived):**
- **Refinement Ratio:** Ready items ÷ Total items × 100%
- **Backlog Coverage:** Total BCP in backlog ÷ Average velocity = sprints of work ahead
- **Aging:** Stories older than N sprints without refinement

---

## Core Intent 4: Predictability & Impact (Business Alignment and Variance)

### 30. Velocity Volatility / Predictability

**Source:** CPSBok Chapter 18 (Plan Delivery Capacity)

**How to Calculate:**
> "Analyze velocity volatility and its causes."

**Formula:**
> **Velocity Volatility = Standard Deviation of velocity ÷ Mean velocity × 100%**
>
> (This is equivalent to CV% — the bigspec framework's "CV% restricted to N ≥ 20")

**CPS also tracks:**
> "Velocity trends (improving, declining, stable)" — direction matters alongside volatility.

---

### 31. Schedule Variance

**Source:** CPSBok Chapter 19 (EVM), Chapter 20 (Expectation Management)

**How to Calculate (EVM):**
> **SV = EV − PV** (Schedule Variance)

**Agile equivalent:**
> "Track stories completed vs. planned. Verify alignment with roadmap milestones and commitments."

---

### 32. Cost Variance

**Source:** CPSBok Chapter 19

**How to Calculate:**
> "Track budget consumption vs. plan. Project cost at completion and variances. Track variance from baseline."

**Formula:**
> **CV = EV − AC** (Cost Variance — EVM)
> **Cost Variance % = (Actual Cost − Planned Cost) ÷ Planned Cost × 100%**

---

### 33. Estimation Accuracy

**Source:** CPSBok Chapter 16 (Backlog Refinement), BCP methodology

**How to Calculate:**
The CPSBok uses BCP as its estimation framework. Estimation accuracy is measured by comparing BCP estimates against actual effort:

> **Estimation Accuracy = Actual BCP (retrospectively assessed) ÷ Estimated BCP**

A ratio of 1.0 = perfect accuracy; <1.0 = overestimated; >1.0 = underestimated.

---

### 34. Sprint Health Score (Composite)

**Source:** CPSBok Chapter 20 (Expectation Management)

**How to Assess:**
> "Sprint Health Assessment: Assess whether sprint goal is achievable. Evaluate team capacity utilization. Identify any concerning trends. Assess quality of work being produced. Evaluate team morale and energy. Identify risks to sprint success."

**Health dimensions:**
1. **Goal Achievability:** Likelihood of meeting sprint goal
2. **Capacity:** Utilization within sustainable range
3. **Quality:** Defect discovery rate within norms
4. **Morale:** Team energy and engagement
5. **Risk:** Impediment count and impact

---

### 35. Impediment Metrics

**Source:** CPSBok Chapter 19, Chapter 22

**Metrics tracked:**
> "Blocked stories count and duration. Monitor impediment count and impact."

- **Impediment Count:** Active blockers at any point
- **Impediment Duration:** Time from blocker raised to resolved
- **Impediment Impact:** BCP at risk due to blockers

---

### 36. Roadmap Alignment Score

**Source:** CPSBok Chapter 21 (Roadmap Review)

**How to Measure:**
> "Verify alignment with roadmap milestones and commitments."

**Assessment criteria:**
- Milestone achievement rate
- Feature completion vs. roadmap
- Value delivery vs. roadmap projections

---

### 37. Production Entry Readiness

**Source:** CPSBok Chapter 37 (Value Activation Evaluation)

**Success Criteria:**
> "Value metrics baseline established. Initial value delivery achieved. User adoption trending positively. Business objectives being met. ROI trajectory on track. Stakeholder satisfaction with value delivery."

---

## CPSBok Consolidated Formula Reference Card

| # | Metric | Formula / Calculation | CPSBok Source |
|---|--------|----------------------|---------------|
| 1 | **BCP Estimate** | Complexity score from Business Rules + Interface Elements + Boundaries | Ch.16, App.A |
| 2 | **H/BCP** | Development hours ÷ BCP completed | Ch.18 (derived) |
| 3 | **Sprint Velocity** | Σ(BCP of completed stories) | Ch.18 |
| 4 | **Avg Velocity** | Σ(Last 3-5 sprint velocities) ÷ N | Ch.18 |
| 5 | **Value-Add Ratio** | Process Time ÷ Lead Time | Ch.2 (VSM) |
| 6 | **Cycle Time** | End time − Start time (per story) | Ch.19 |
| 7 | **Lead Time** | Σ(Process time + Wait time) | Ch.2 |
| 8 | **WIP Level** | Count of in-progress stories/tasks | Ch.26 |
| 9 | **Sprint Goal Achievement** | Goals met ÷ Total sprints × 100% | Ch.19 |
| 10 | **Capacity Utilization** | Actual hours ÷ Available hours × 100% | Ch.24 |
| 11 | **Defect Density** | Defects per sprint ÷ BCP delivered | Ch.19, 24 |
| 12 | **Defect Escape Rate** | Production defects ÷ Total defects × 100% | Ch.24 |
| 13 | **Resolution Time** | Mean(Defect report → Fix deploy) | Ch.24 |
| 14 | **Rework %** | Rework hours ÷ Total dev hours × 100% | Ch.18 |
| 15 | **Test Automation Coverage** | Automated tests ÷ Total tests × 100% | Ch.19, 24 |
| 16 | **Code Review Coverage** | Reviewed code ÷ Total code changes × 100% | Ch.19 |
| 17 | **Technical Debt Ratio** | Remediation cost ÷ Dev cost × 100% | Ch.19, 24 |
| 18 | **Build Success Rate** | Successful builds ÷ Total builds × 100% | Ch.24 |
| 19 | **Deployment Success Rate** | Successful deploys ÷ Total deploys × 100% | Ch.24 |
| 20 | **Incident Frequency** | Incidents ÷ Time period | Ch.24 |
| 21 | **Uptime / Availability** | Uptime ÷ Total time × 100% | Ch.24 |
| 22 | **Response Time** | p50, p95, p99 of request latency | Ch.24 |
| 23 | **INVEST Score** | Passed INVEST criteria ÷ 6 × 100% | App.A |
| 24 | **Maturity Score** | Avg(Requirements, Technical, Business, Resource maturity) | App.A |
| 25 | **ROI** | (Net benefit ÷ Investment) × 100% | Ch.12, 17, 37 |
| 26 | **SPI** | EV ÷ PV | Ch.19 |
| 27 | **CPI** | EV ÷ AC | Ch.19 |
| 28 | **EAC** | BAC ÷ CPI | Ch.19 |
| 29 | **Schedule Variance** | EV − PV (or planned vs actual) | Ch.19, 20 |
| 30 | **Cost Variance** | EV − AC (or actual vs budget) | Ch.19 |
| 31 | **Velocity Volatility** | StdDev(Velocity) ÷ Mean(Velocity) × 100% | Ch.18 |
| 32 | **Action Item Completion** | Completed ÷ Total retrospective actions × 100% | Ch.25 |
| 33 | **Problem Recurrence** | Repeated problems ÷ Total problems × 100% | Ch.25 |
| 34 | **Backlog Refinement Ratio** | Ready items ÷ Total items × 100% | Ch.19 |
| 35 | **Backlog Coverage** | Total BCP in backlog ÷ Avg velocity (sprints ahead) | Ch.19 |
| 36 | **Impediment Duration** | Time from blocker raised to resolved | Ch.19, 22 |
| 37 | **Estimation Accuracy** | Actual BCP (retrospective) ÷ Estimated BCP | Ch.16, App.A |

---

## Key Insights: How CPSBok Differs from the Classic Books

### 1. **BCP as the Unifying Metric**
Unlike the classic books which use abstract story points, CPS anchors everything on **BCP (Business Complexity Points)** — a structured, factor-based estimation system. BCP is not just an estimate; it's the common currency across velocity, capacity planning, defect density, and backlog health. This is the CPS equivalent of what the bigspec framework calls "BCP Plus + H/BCP."

### 2. **Four-Dimensional Control Framework**
Chapter 24 organizes all monitoring into four explicit dimensions:
- **Progress:** velocity, burndown, milestones
- **Stability:** build success, deployment success, uptime
- **Quality:** defect density, escape rate, coverage, technical debt
- **Performance:** response time, throughput, resource utilization

This is more structured than any single classic book's approach.

### 3. **Value Governance as a Formal Practice**
CPS dedicates an entire practice (Chapter 17) to value governance — with ROI calculation, value vs. cost curves, and value component analysis. The classic books (Poppendieck, Cohn) address value but CPS systematizes it into an ongoing governance practice with specific tools (ROI Calculator, Value Dashboard, Value Prioritization Matrix).

### 4. **Maturity Scoring on 4 Axes**
CPS's maturity model goes beyond CMMI's single-level approach. The four-axis model (Requirements, Technical, Business, Resource maturity) provides a more actionable assessment. Combined with INVEST scoring, this creates a quantitative quality gate for backlog items.

### 5. **One Piece Flow as a Named Practice**
While the Poppendiecks and Toyota Way discuss flow, CPS dedicates an entire practice (Chapter 26) to One Piece Flow with explicit behavioral rules, taskboard discipline, and WIP management — making it an operational practice rather than just a principle.

### 6. **Production SLA Compatibility**
CPS ties quality metrics directly to production SLAs: "Defect density is within acceptable limits. System stability meets production requirements. Response times meet SLA targets. Error rates are within acceptable ranges." This bridges the gap between development metrics and production operational commitments.

### 7. **Explicit Integration Between Practices**
The CPSBok's Practice Detailed Mapping document traces how metrics flow between practices. For example, velocity data from Chapter 18 (Capacity Planning) feeds Chapter 19 (Monitoring), Chapter 21 (Roadmap Review), and Chapter 24 (Progress Control). This systems-thinking approach to metrics is more comprehensive than any single classic book.

---

## Comparison: CPSBok vs. Classic Books Coverage Matrix

| Metric Category | Classic Books Coverage | CPSBok Coverage | CPSBok Uniqueness |
|----------------|----------------------|-----------------|-------------------|
| Estimation | Story Points (Cohn) | BCP (factor-based) | Structured complexity factors |
| Velocity | Rolling average (Cohn) | BCP-based + volatility analysis | Velocity-Acceleration model |
| Quality | Defect rate, coverage | Escape rate + SLA compatibility + 4-D control | Production-oriented quality |
| Governance | CMMI, NPS, ROI | Value Governance + INVEST + 4-axis maturity | Operationalized value governance |
| Flow | VSM, WIP theory | One Piece Flow practice + VSM with value-add ratio | Practice-level flow implementation |
| Stability | MTBF, availability | Build rate + deploy rate + incident frequency | Development pipeline stability |
| Predictability | CV%, burndown | Velocity volatility + EVM + roadmap alignment | Combined agile + traditional EVM |
