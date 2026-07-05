---
okf_kind: reference
okf_version: "1.0"
generated_by: "human"
generated_at: "2026-07-04T00:00:00Z"
---
# Hermes Agent — Book-to-Metrics Traceability Report

**Generated:** 2026-07-04  
**Source Library:** `/Users/danielvm/Developer/hermes-agent/books/`  
**Method:** Full-text extraction from 9 strategic books via pdfplumber, regex-matched against 40+ metric patterns, organized by the four core intents of the bigspec DX Measurement Framework.

---

## Books Analyzed

| # | Book | Author(s) | Year | Core Domain |
|---|------|-----------|------|-------------|
| 1 | **PMBOK 7th Edition** (Guia PMBOK) | PMI | 2021 | Project management standards, 8 performance domains |
| 2 | **The Toyota Way** | Jeffrey Liker | 2003 | Lean manufacturing, 14 principles, TPS |
| 3 | **Lean Software Development: An Agile Toolkit** | Mary & Tom Poppendieck | 2003 | 7 lean principles applied to software, tool-based |
| 4 | **Implementing Lean Software Development** | Mary & Tom Poppendieck | 2006 | Lean practices from concept to cash, queuing theory |
| 5 | **Leading Lean Software Development** | Mary & Tom Poppendieck | 2009 | Systems thinking, frames, leadership for lean |
| 6 | **Agile Estimating and Planning** | Mike Cohn | 2005 | Story points, velocity, release planning, INVEST |
| 7 | **Clean Code** | Robert C. Martin | 2008 | Code craftsmanship, 5S, TDD, refactoring discipline |
| 8 | **Practices of an Agile Developer** | Subramaniam & Hunt | 2006 | 45 agile practices, feedback loops, pragmatism |
| 9 | **Agile Retrospectives** | Derby & Larsen | 2006 | Retrospective facilitation, root cause, team metrics |

---

## Core Intent 1: Speed & Effort (Velocity, Volume, and Cost)

> **DX Core 4 anchors:** Lead Time, Deployment Frequency, PRs/Diffs per Engineer (DORA)  
> **bigspec final set:** Agentic Cycle Time (Git-anchored), BCP Plus + H/BCP

| Metric | Source Book(s) | Evidence & Context |
|--------|---------------|--------------------|
| **Cycle Time** | *Implementing Lean Software* (Poppendieck 2006), *Leading Lean Software* (Poppendieck 2009), *Lean Software Development* (Poppendieck 2003), PMBOK 7 (Pt-BR: "tempo de ciclo") | "Drive down cycle time with small batches and fewer things-in-process." (Implementing Lean, Ch.1). PMBOK 7 defines it as "o tempo total que uma unidade leva para passar por um processo" (total time a unit takes to pass through a process). Leading Lean provides a concrete 10-day critical defect process map breakdown. |
| **Throughput / Productivity** | *Implementing Lean Software* (Poppendieck 2006), *Leading Lean Software* (Poppendieck 2009), *Clean Code* (Martin 2008), PMBOK 7 ("produtividade") | "Short development throughput time" — mapped as equivalent to "short manufacturing throughput time" in lean transfer table (Implementing Lean, Ch.1 Table 1.1). PMBOK 7: "produtividade é o número de itens que podem concluir" (productivity is the number of items that can be completed). |
| **Velocity** | *Agile Estimating & Planning* (Cohn 2005), *Leading Lean* (Poppendieck 2009), *Agile Retrospectives* (Derby/Larsen 2006) | "Velocity is a measure of a team's rate of progress. It is calculated by summing the number of story points assigned to each user story that the team completed during the iteration." (Cohn, Ch.4). Mentioned as a key retrospective metric alongside burndown charts and defect counts (Derby/Larsen, Ch.1). |
| **Lead Time** | *Agile Retrospectives* (Derby/Larsen 2006), *The Toyota Way* (Liker 2003) | "The team learned they needed to enlist the supporting functions early. They agreed to provide longer lead times for hardware moves." (Derby/Larsen). Toyota Way reports a "46% reduction in lead-time to produce the product (from 12 to 6.5 hours)" as a key performance measure (Liker, Ch.3). |
| **Work in Progress (WIP) Limits** | *The Toyota Way* (Liker 2003), *Agile Estimating & Planning* (Cohn 2005), *Implementing Lean Software* (Poppendieck 2006) | "83% reduction in work-in-process inventory (from 9 to 1.5 hours)" (Toyota Way). Cohn demonstrates how multitasking leaves "work in process longer" (Ch.2). Implementing Lean: "Aggressively limit the size of lists and queues to your capacity to deliver." |
| **Batch Size / Small Batches** | *Implementing Lean Software* (Poppendieck 2006), *Leading Lean* (Poppendieck 2009) | "Frequent transfer of small batches of parts" mapped to "frequent transfer of preliminary information between development steps" (Implementing Lean, Table 1.1). Leading Lean discusses "Batch size, 54, 62, 127, 144, 158–159" extensively. |
| **Queue Length** | *Implementing Lean Software* (Poppendieck 2006) | Entire section on "queuing theory": "cycle time reduction queue length" relationship, "cascading queues, 113–114," "establishing a cadence, 108–109." |
| **Takt Time** | *The Toyota Way* (Liker 2003) | "Takt Time: The Heart Beat of One-Piece Flow" — entire chapter (Ch.8) devoted to takt time as the pulse rate of customer demand. |
| **Flow Efficiency** | Lean literature (derived) | "Flow efficiency" as value-add time / total cycle time is implied by the value stream mapping methodology across all Poppendieck books, though not always explicitly named. |
| **Deployment Frequency** | *Lean Software Development* (Poppendieck 2003), *Implementing Lean* (2006) | "Frequent product changes (software releases)" mapped from "frequent set-up changes" in manufacturing (Implementing Lean, Table 1.1). |
| **Reduced Information Inventory** | *Implementing Lean Software* (Poppendieck 2006) | Explicitly mapped from "reduced work-in-process inventory" between manufacturing steps to "reduced information inventory between development steps" (Table 1.1). |

---

## Core Intent 2: Quality & Rework (Defects, Stability, and Rework)

> **DX Core 4 anchors:** Change Failure Rate, MTTR / Recovery Time (DORA)  
> **bigspec final set:** AI Code Retention / Churn (human rewrite rate)

| Metric | Source Book(s) | Evidence & Context |
|--------|---------------|--------------------|
| **Change Failure Rate / CFR** | *Practices of an Agile Developer* (Subramaniam/Hunt 2006), *Agile Retrospectives* (Derby/Larsen 2006), PMBOK 7 | PMBOK 7 discusses "falha geral do projeto" (general project failure) and the need to manage uncertainty to reduce failure. Retrospectives explicitly ask teams to "bring the defect rates down" (Derby/Larsen). |
| **MTTR / Mean Time to Recover** | PMBOK 7 (implied via "recuperação"), Lean literature (Andon/stop-the-line) | The Andon concept (stop-the-line to fix immediately) is the lean equivalent of fast MTTR. "Unit tests are what let you stop the line" (Poppendieck 2009, Foreword). |
| **MTBF / Mean Time Between Failures** | *Agile Estimating & Planning* (Cohn 2005) | "I work with one team that requires two months of mean time between failure (MTBF) testing before releasing their product, which includes both hardware and software." (Cohn, Ch.3) |
| **Defect Rate / Density** | *Agile Retrospectives* (Derby/Larsen 2006), *The Toyota Way* (Liker 2003), *Implementing Lean* (Poppendieck 2006) | "Metrics include burndown charts, velocity, defect counts, number of stories completed, amount of code refactored" (Derby/Larsen, Ch.1). Toyota lists "defects" as Waste #7 in the 7 wastes. "If you routinely find defects in your verification process, your process is defective." (Implementing Lean, Principles). |
| **Rework / Code Churn** | *Agile Retrospectives* (Derby/Larsen 2006), *Agile Estimating & Planning* (Cohn 2005), *Clean Code* (Martin 2008) | "A team in California reduced rework at the end of their next release by improving their unit testing" (Derby/Larsen, Preface). Cohn lists "anything that improves accuracy and reduces rework" as a qualitative benefit. Martin: "a poem is never done and bears continual rework." |
| **Technical Debt** | *Implementing Lean Software* (Poppendieck 2006), *Leading Lean* (Poppendieck 2009) | "An insidious form of failure demand is the demand on your resources created by technical debt: things such as defects you have chosen to ignore, messy coding practices, duplication, lack of effective test automation, a tightly coupled architecture" (Leading Lean). Listed in the index of Implementing Lean alongside "complexity" and "code." |
| **Cyclomatic Complexity** | *Implementing Lean Software* (Poppendieck 2006) | "McCabe Cyclomatic Complexity Index, 194–195" — explicitly referenced as a code quality measurement standard. |
| **Automated Test Coverage** | *Clean Code* (Martin 2008), *Practices of an Agile Developer* (Subramaniam/Hunt 2006) | "Unit testing is only as effective as your test coverage. You might want to look at using test coverage tools" (Practices, Ch.5). Clean Code addresses "Test Coverage Patterns" (T8). |
| **Andon / Stop-the-Line** | *The Toyota Way* (Liker 2003), *Leading Lean* (Poppendieck 2009), *Implementing Lean* (Poppendieck 2006) | "Unit tests are what let you stop the line" (Leading Lean, Foreword). Toyota Way defines andon as "a visual control device that alerts workers to defects, equipment abnormalities, or other problems." |
| **Poka-Yoke (Error Proofing)** | *The Toyota Way* (Liker 2003), Lean toolkit literature | "Using Countermeasures and Error-Proofing to Fix Problems" (Toyota Way, Principle 5). Referenced alongside mistake-proofing as a quality built-in practice. |
| **Build Quality In / Jidoka** | *Implementing Lean Software* (Poppendieck 2006), *The Toyota Way* (Liker 2003) | "Build Quality In: If you routinely find defects in your verification process, your process is defective." (Implementing Lean, 7 Principles summary). Toyota Way dedicates Chapter 11 to Jidoka. |
| **% Time on New Capabilities vs Bugs** | *Agile Retrospectives* (Derby/Larsen 2006), *Leading Lean* (Poppendieck 2009) | "Reserve 20% of the velocity of each iteration to work on tasks of their own choosing, which would give them time to fix the system" (Leading Lean, Frame 1 — Customer Focus). |

---

## Core Intent 3: Governance & Effectiveness (Friction and Compliance)

> **DX Core 4 anchors:** Time to 10th PR (Onboarding friction)  
> **bigspec final set:** Context Fidelity / Spec Drift, ISO/IEC 25010 Coverage

| Metric | Source Book(s) | Evidence & Context |
|--------|---------------|--------------------|
| **Onboarding / Time to 10th PR** | *Leading Lean* (Poppendieck 2009), *Agile Estimating & Planning* (Cohn 2005) | "It would be much better to assign work to established teams than to reconstitute teams around projects" due to "ramp-up time of newly formed teams" (Leading Lean, Ch.1). Cohn recommends "shorter training time for new employees" as a qualitative benefit of better processes (Ch.5). |
| **Bus Factor / Knowledge Transfer** | *Leading Lean* (Poppendieck 2009) | "Many day-to-day decisions are based on tacit knowledge, which gets left behind in a handover. We must think that tacit knowledge transfers by magic" (Leading Lean, Ch.1 — Systems Thinking on handovers). |
| **CMM / CMMI Maturity Level** | *Implementing Lean* (Poppendieck 2006), *Leading Lean* (Poppendieck 2009), *Lean Software Development* (Poppendieck 2003) | "CMM, 124" indexed in Implementing Lean. Leading Lean references "Capability Maturity Model Integration and SCAMPI are service marks of Carnegie Mellon University." Lean Software Development 2003: "Between PMI (Project Management Institute) and CMM (Capability Maturity Model) certification programs, a heavy emphasis on process definition and detailed, front-end planning seemed to dominate everything." |
| **ISO 9001 / Compliance / Audit** | *Agile Estimating & Planning* (Cohn 2005), *Practices of an Agile Developer* (Subramaniam/Hunt 2006), PMBOK 7 | "I also needed to prepare documentation for an ISO 9001 compliance audit. The programming was fun. Writing documents for the compliance audit wasn't." (Cohn, Ch.5). Practices warns: "Compliance Isn't Outcome" — "Many standardization and process efforts focus on measuring and rating compliance to process." PMBOK 7 addresses "governança" (governance) as one of the tailoring dimensions. |
| **Customer Satisfaction / NPS** | *Implementing Lean Software* (Poppendieck 2006), *Agile Estimating & Planning* (Cohn 2005), PMBOK 7, *The Toyota Way* (Liker 2003) | "Measure customer satisfaction with a net promoter score" (Implementing Lean, Measure UP principles). Cohn devotes Chapter 11 to "Kano Model of Customer Satisfaction." PMBOK 7 references "satisfação do cliente" and warns that "gerenciamento ineficaz de requisitos pode levar a... insatisfação do cliente." Toyota Way places "Customer Satisfaction" as the end goal of the Chief Engineer system. |
| **SLA / Uptime / Availability** | *Leading Lean* (Poppendieck 2009), PMBOK 7 | "Availability & Consistency" referenced via Amazon's Werner Vogels keynote (Leading Lean, Ch.1). PMBOK 7 addresses availability through its "Entrega" (Delivery) and "Medição" (Measurement) domains. |
| **Retrospective / Root Cause Analysis** | *Agile Retrospectives* (Derby/Larsen 2006), *Leading Lean* (Poppendieck 2009), *The Toyota Way* (Liker 2003) | Entire book dedicated to retrospectives (Derby/Larsen). Leading Lean references "fishbone diagrams, 179" and "five whys, 178–179." Toyota Way dedicates Chapter 20 to "Identify Root Causes and Develop Countermeasures" with "5 Whys" methodology. |
| **NFR / Non-Functional Requirements** | PMBOK 7, Lean literature (via quality attributes) | PMBOK 7 addresses non-functional concerns through its performance domains; "qualidade das entregas e resultados do projeto" (quality of deliverables and project outcomes). Lean books address this through the lens of "Essential Quality by Construction" (Lean 2003, Systems Thinking chapter). |
| **ISO/IEC 25010 Coverage** | Derived from PMBOK 7 + Lean quality frameworks | While not explicitly named, PMBOK 7's 8 performance domains and Lean's "Build Quality In" principle map to ISO 25010's quality characteristics (functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, portability). |

---

## Core Intent 4: Predictability & Impact (Business Alignment and Variance)

> **DX Core 4 anchors:** % Time on New Capabilities, Initiative Progress, R&D Investment  
> **bigspec final set:** Process Maturity (CMMI), big-counter Maturity Score, CV% (restricted to N ≥ 20)

| Metric | Source Book(s) | Evidence & Context |
|--------|---------------|--------------------|
| **Coefficient of Variation (CV%)** | *Agile Estimating & Planning* (Cohn 2005), PMBOK 7 | Cohn: "Velocity Corrects Estimation Errors" — "as a team begins making progress through an iteration, they will find that the total of their estimates is wrong." PMBOK 7 discusses "incerteza" (uncertainty) as a full performance domain with measurement. The variability of estimates vs. actuals is a central theme. |
| **Estimation Accuracy / Error** | *Agile Estimating & Planning* (Cohn 2005) | "Estimation Error" section: "Velocity corrects estimation errors. As a team begins making progress through an iteration, they will find that the total of their estimates is wrong" (Cohn, Ch.4). Full treatment of story points, ideal days, Planning Poker, and triangulation. |
| **Burndown / Burnup Charts** | *Agile Retrospectives* (Derby/Larsen 2006), *Lean Software Development* (Poppendieck 2003), *Implementing Lean* (Poppendieck 2006) | "Metrics include burndown charts, velocity, defect counts..." (Derby/Larsen, Ch.1). Burn-down charts indexed in both Poppendieck 2003 and 2006 as standard progress visibility tools. |
| **Cumulative Flow Diagram (CFD)** | Lean/Kanban literature | Referenced indirectly through WIP tracking and flow metrics in Poppendieck's queuing theory chapters. |
| **Schedule Variance / On-Time Delivery** | PMBOK 7, *Agile Estimating & Planning* (Cohn 2005) | PMBOK 7 references "cronograma" (schedule) 38+ times as a constraint dimension alongside budget and scope. Schedule performance is a core project metric. |
| **Cost of Delay / WSJF** | *Lean Software Development* (Poppendieck 2003), *The Toyota Way* (Liker 2003) | "Tool 12: Cost of Delay" — dedicated section in Lean Software Development 2003 (Ch.3). "Product Model" discussed alongside. |
| **Return on Investment (ROI)** | *Agile Estimating & Planning* (Cohn 2005), *Clean Code* (Martin 2008), *Implementing Lean* (Poppendieck 2006), PMBOK 7 | Cohn: "ROI calculations put equal value on the money invested in year one and the money earned in year five." (Ch.7). PMBOK 7: "documentos de business case com estimativas detalhadas de retorno sobre o investimento." Clean Code: "learning tests... have a positive return on investment." Implementing Lean: "The return on investment in practices outlined in this book can be very high." |
| **Process Maturity Score** | *Lean Software Development* (Poppendieck 2003), *Implementing Lean* (Poppendieck 2006), *Leading Lean* (Poppendieck 2009) | CMM/CMMI referenced across all three Poppendieck books. "Capability Maturity Model" and associated levels 1-5 framework provide the canonical maturity measurement. PMBOK 7 addresses "Maturidade dos membros da equipe" (team member maturity) as a leadership factor. |
| **Value Stream Mapping** | *Leading Lean* (Poppendieck 2009), *Lean Software Development* (Poppendieck 2003), *The Toyota Way* (Liker 2003), *Implementing Lean* (Poppendieck 2006) | "One way to evaluate the end-to-end workflow through your system is to draw a process flow map—also known as a value stream map" (Leading Lean, Ch.1). Dedicated "Tool 2: Value Stream Mapping" in Lean 2003. Toyota Way: "Developing and Implementing Value Stream Maps Through Kaizen Workshops." |
| **Kaizen / Continuous Improvement** | *The Toyota Way* (Liker 2003), *Implementing Lean* (Poppendieck 2006), *Leading Lean* (Poppendieck 2009), *Clean Code* (Martin 2008) | "Isn't continuous improvement an intrinsic part of professionalism?" (Clean Code, Ch.1). Toyota Way: "Continuous improvement, often called kaizen, defines Toyota's basic approach to doing business." Implementing Lean dedicates a section to "Kaizen Events" and "Large Group Improvement Events." Leading Lean extensively indexes "continuous improvement" across leadership frames. |
| **Heijunka (Workload Leveling)** | *The Toyota Way* (Liker 2003) | "Principle 4: Level Out the Workload (Heijunka)" — entire chapter (Ch.10) dedicated to leveling production and schedules as the foundation for predictable flow. "Leveling the Schedule — Inventory's Role" and "Build to Order" concepts. |
| **INVEST Criteria** | *Agile Estimating & Planning* (Cohn 2005) | While the word "invest" appears in financial ROI contexts in Cohn's book, the INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable) for user stories are foundational to planning predictability. |
| **% Time on New Capabilities** | *Leading Lean* (Poppendieck 2009) | "They decided they would reserve 20% of the velocity of each iteration to work on tasks of their own choosing, which would give them time to fix the system" — this 80/20 split between new capabilities and maintenance/improvement is a direct measure of innovation allocation. |
| **Reduced Information Inventory** | *Implementing Lean Software* (Poppendieck 2006) | "Reduced work-in-process inventory between manufacturing steps" mapped to "reduced information inventory between development steps" (Table 1.1) — a lean-specific proxy for measuring batch size of knowledge work. |

---

## Summary: Metric Coverage Matrix

| Core Intent | Metrics Found | Primary Source Books | Coverage vs. bigspec Set |
|-------------|---------------|---------------------|--------------------------|
| **Speed & Effort** (11 metrics) | Cycle Time, Throughput, Velocity, Lead Time, WIP, Batch Size, Queue Length, Takt Time, Flow Efficiency, Deployment Frequency, Information Inventory | Poppendieck trilogy (2003/2006/2009), Mike Cohn (2005), Toyota Way (Liker 2003), PMBOK 7 | ✅ High — Cycle Time, Throughput, Velocity, WIP all have rich definitions |
| **Quality & Rework** (12 metrics) | Defect Rate, Rework, Technical Debt, Cyclomatic Complexity, Test Coverage, Andon/Jidoka, Poka-Yoke, MTBF, Change Failure Rate, % New vs. Fix | Derby/Larsen (2006), Poppendieck (2006/2009), Martin (2008), Subramaniam/Hunt (2006), Toyota Way | ✅ High — Defect rate, rework/churn, technical debt, and andon have strong coverage |
| **Governance & Effectiveness** (10 metrics) | Onboarding, Bus Factor, CMMI Maturity, ISO 9001, NPS, SLA/Availability, Retrospectives/RCA, NFRs, ISO 25010 (derived) | Poppendieck (2009), Cohn (2005), PMBOK 7, Subramaniam/Hunt (2006), Derby/Larsen (2006) | ✅ Strong — CMMI, NPS, ISO compliance, and retrospectives well-documented |
| **Predictability & Impact** (15 metrics) | Estimation Accuracy, Burndown/Burnup, CFD, Schedule Variance, Cost of Delay, ROI, Maturity Score, Value Stream Map, Kaizen, Heijunka, INVEST, CV%, % New Capabilities, Information Inventory | Cohn (2005), Poppendieck (2003/2006/2009), Toyota Way (Liker 2003), PMBOK 7, Martin (2008) | ✅ Strong — ROI, estimation, maturity, cost of delay all explicit |

---

## Key Insights

1. **The Poppendieck trilogy is the richest source**: *Lean Software Development* (2003), *Implementing Lean Software* (2006), and *Leading Lean Software* (2009) together cover nearly every metric category, with particular strength in cycle time, waste, quality, and governance.

2. **DORA metrics have lean ancestry**: Lead Time, Deployment Frequency, Change Failure Rate, and MTTR — the DORA "Four Key Metrics" — all trace back to Toyota Production System concepts (takt time, andon, jidoka) and their software adaptations by the Poppendiecks.

3. **Mike Cohn owns estimation and velocity**: *Agile Estimating and Planning* (2005) is the definitive source for velocity, story points, estimation accuracy, INVEST criteria, and release burndown — the quantitative foundation of predictability.

4. **Toyota Way provides the philosophical spine**: Liker's 14 principles give every metric its "why" — Heijunka (leveling) for predictability, Jidoka (build quality in) for defect prevention, Genchi Genbutsu (go and see) for governance.

5. **PMBOK 7 adds the governance scaffold**: While less specific on operational metrics, PMBOK 7's 8 performance domains (Stakeholders, Team, Development Approach, Planning, Project Work, Delivery, Measurement, Uncertainty) provide the organizational framework for deciding *which* metrics to measure.

6. **Gaps in the literature**: Explicit PR/Diff-per-engineer metrics, ISO/IEC 25010 direct coverage, and modern DORA operationalization are absent from these books (published 2003–2021) — these represent the gap that Hermes bridges from classical literature to modern DX measurement.
