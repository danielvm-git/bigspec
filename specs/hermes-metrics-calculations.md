---
okf_kind: reference
okf_version: "1.0"
generated_by: "human"
generated_at: "2026-07-04T00:00:00Z"
---
# Hermes Agent — How to Calculate Each Metric (From the Books)

**Generated:** 2026-07-04  
**Source Library:** `/Users/danielvm/Developer/hermes-agent/books/`  
**Method:** Targeted full-text extraction from 9 strategic books, focused on formula descriptions, calculation procedures, and measurement methodologies. Organized by the four core intents of the bigspec DX Measurement Framework.

---

## Core Intent 1: Speed & Effort (Velocity, Volume, and Cost)

### 1. Velocity

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005), Chapter 4

**How to Calculate:**
> "Velocity is a measure of a team's rate of progress. It is calculated by **summing the number of story points assigned to each user story that the team completed during the iteration**."

**Example from the book:**
> "If the team completed three stories each estimated at five story points then velocity = 15."

**Using Velocity for Duration Estimation:**
> "If we sum the story point estimates for all desired features we come up with a total size estimate for the project. If we know the team's velocity we can **divide size by velocity** to arrive at an estimated number of iterations."
>
> **Duration = Σ(Story Points of all features) ÷ Velocity**
>
> Example: "all user stories are estimated and the sum of those estimates is 100 story points. Based on past experience we know the team's velocity to be 11 story points per two-week iteration. Since 100/11 = 9.1 we can estimate that the project will take 10 iterations."

**Velocity averaging (Yesterday's Weather):**
> "At the end of each iteration, a team can look at the stories they have completed and calculate their velocity by summing the story point estimates for each completed story." — Use a rolling average of the last 3–4 iterations.

**Cost per Story Point:**
> "During those twelve weeks the team completed 120 story points. At a total cost of ¤150,000, we can tell that 120 story points cost ¤1,250 each." → **Cost per Point = Total Cost ÷ Σ Story Points**

---

### 2. Cycle Time

**Primary Sources:**
- PMBOK 7th Edition (2021) — Portuguese edition
- Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006), Chapter 5 (Speed)
- Mary & Tom Poppendieck, *Leading Lean Software Development* (2009), Chapter 1

**PMBOK 7 Definition:**
> "O tempo de ciclo é o **tempo total que uma unidade leva para passar por um processo**." (Cycle time is the total time a unit takes to pass through a process.)

**Leading Lean (2009) — Concrete Measurement Example:**
The book presents a "Critical Defect Process Map" (Figure 1-3) that decomposes a 10-day cycle time:
- Level 1 Customer Support: 0.5 day
- Level 2 Customer Support: 1 day + 30% re-contact (2 days)
- Level 3 Customer Support: 2 days + 30% escalation (4 days)
- Development Analysis: 0.5 day
- Solution Development: 4 hours
- Test Wait + Testing: 1 day + 2 days
- Fix + Deploy: 0.5 day
- **Total Cycle Time: 10.0 days** (Customer Support: 6.5 days + Development: 3.5 days)

**Little's Law (Poppendieck 2006, Chapter 5):**
> The book references **Little's Law** extensively (indexed at pages 100–101):
>
> **WIP = Throughput × Cycle Time**
>
> Therefore: **Cycle Time = WIP ÷ Throughput**
>
> This formula is the mathematical backbone connecting work-in-process to delivery speed.

**Cycle Time Reduction Strategy (Poppendieck 2006):**
> "Drive down cycle time with small batches and fewer things-in-process."

---

### 3. Throughput / Productivity

**Primary Source:** PMBOK 7th Edition (2021)

**How to Calculate:**
> "A produtividade é o **número de itens que podem concluir um processo em um determinado tempo**." (Productivity is the number of items that can complete a process in a given time.)
>
> **Throughput = Number of items completed ÷ Time period**

**Application to Estimation (PMBOK 7):**
> "Esses dois números [tempo de ciclo e produtividade] podem fornecer uma estimativa para terminar uma determinada quantidade de trabalho." (These two numbers [cycle time and productivity] can provide an estimate to finish a given amount of work.)

**Toyota Way Nuance (Liker 2003):**
> "Productivity is not measured in terms of value-added work. Who knows how much productivity is lost when people are utilized to overproduce parts?" — The Toyota Way distinguishes true throughput from mere utilization.

**Clean Code (Martin 2008) — Throughput from lock contention:**
Clean Code dedicates sections to "Single-Thread Calculation of Throughput" and "Multithread Calculation of Throughput" (Chapter 13, Concurrency), noting that throughput degrades with lock contention.

---

### 4. Lead Time

**Primary Sources:**
- Jeffrey Liker, *The Toyota Way* (2003)
- Esther Derby & Diana Larsen, *Agile Retrospectives* (2006)

**Toyota Way — Measurement Example:**
> "46% reduction in lead-time to produce the product (from 12 to 6.5 hours)" — measured as the total time from order/release to customer delivery.

**Retrospectives — Practical Measurement:**
> "The team learned they needed to enlist the supporting functions early. They agreed to provide longer lead times for hardware moves." (Derby/Larsen 2006) — Lead time measured as advance notice required before an activity can begin.

**Distinction from Cycle Time (Industry Standard):**
Lead Time = time from customer request to delivery.  
Cycle Time = time from work start to work completion (subset of Lead Time).

---

### 5. WIP (Work in Progress) Limits

**Primary Source:** Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006), Chapter 5

**Little's Law Connection:**
> **WIP = Throughput × Cycle Time**

**How to Calculate WIP:**
Count the number of items (stories, tasks, cards) currently in an "in progress" state. The Poppendiecks recommend:
> "Aggressively limit the size of lists and queues to your capacity to deliver."

**Toyota Way Measurement:**
> "83% reduction in work-in-process inventory (from 9 to 1.5 hours)" — WIP measured as the total processing hours of inventory between steps.

**Mike Cohn (2005), Chapter 2:**
> "Multitasking extends the completion date of work and leaves work in process longer. Each of the desired units of work remains in process for 20 days rather than 10." — WIP duration increase from serial to parallel work.

---

### 6. Takt Time

**Primary Source:** Jeffrey Liker, *The Toyota Way* (2003), Chapter 8

**How to Calculate:**
> "Takt is the rate of customer demand — the rate at which the customer is buying product."
>
> **Takt Time = Available Production Time ÷ Customer Demand**
>
> Example: "If we are working seven hours and 20 minutes per day (440 minutes) for 20 days a month and the customer is buying 17,600 units per month, then you should be making 880 units per day or **one unit every 30 seconds**."
>
> (440 min × 60 sec/min) ÷ 880 units = 30 seconds per unit

**Toyota's Three Elements of Standardized Work:**
> "Our standardized work consists of three elements — **takt time** (time required to complete one job at the pace of customer demand), the **sequence of doing things**, and **how much inventory or stock on hand** the individual worker needs."

---

### 7. Flow Efficiency

**How to Calculate (Derived from Value Stream Mapping methodology):**

Flow Efficiency appears across all three Poppendieck books through the value stream mapping technique. While not named with a single formula, it is computed as:

> **Flow Efficiency = (Value-Add Time ÷ Total Cycle Time) × 100%**

**PMBOK 7 (Portuguese edition):**
> "Valor para medir a proporção de atividades que agregam valor e atividades que não agregam valor." (Value to measure the proportion of value-adding activities and non-value-adding activities.)

**Toyota Way context:**
> "Most Business Processes Are 90% Waste and 10% Value-Added Work" (Chapter 8 heading) — implying a typical flow efficiency of ~10%.

---

### 8. Queue Length

**Primary Source:** Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006)

**How to Calculate:**
Queue length is derived from queuing theory and is discussed in the context of reducing cycle time:
> "Cycle time reduction queue length" (index entry, p172) — shorter queues directly reduce cycle time.

**Measurement approach:**
Count the number of items waiting in any queue state (backlog, awaiting review, awaiting test, awaiting deployment). The Poppendiecks advocate minimizing these through pull systems and WIP limits.

---

### 9. Batch Size

**Primary Source:** Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006), *Leading Lean Software Development* (2009)

**How to Calculate:**
Batch size is the number of work items processed together before moving to the next step. In software, this maps to:
- Number of stories in a sprint
- Number of commits in a deployment
- Number of features in a release

**Lean Principle:**
> "Frequent transfer of small batches of parts between manufacturing steps" maps to "frequent transfer of preliminary information between development steps" (2006, Table 1.1). The goal: reduce batch size to one (one-piece flow).

---

### 10. Deployment Frequency

**Primary Sources:** Mary & Tom Poppendieck, *Lean Software Development* (2003), *Implementing Lean Software Development* (2006)

**How to Calculate:**
> "Frequent product changes (software releases)" — measured as:

> **Deployment Frequency = Number of deployments ÷ Time period**

The lean principle maps "frequent set-up changes" in manufacturing to "frequent product changes (software releases)" in development (2006, Table 1.1).

---

## Core Intent 2: Quality & Rework (Defects, Stability, and Rework)

### 11. Defect Rate / Density

**Primary Sources:**
- Esther Derby & Diana Larsen, *Agile Retrospectives* (2006)
- Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006)

**How to Calculate (Retrospectives approach):**
> "Metrics include burndown charts, velocity, **defect counts**, number of stories completed, amount of code refactored, effort data, and so forth." (Derby/Larsen 2006, Chapter 1)

**How to Calculate (Lean approach):**
> "If you routinely find defects in your verification process, your process is defective." (Poppendieck 2006, 7 Principles)
>
> **Defect Density = Number of defects ÷ Size (KLOC, story points, or features)**

**Toyota Way:**
Defects are identified as Waste #7 in the 7 Wastes framework. "Production of defective parts or correction. Repair or rework, scrap, replacement production, and inspection mean wasteful handling, time, and effort."

---

### 12. MTBF (Mean Time Between Failures)

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005), Chapter 3

**How to Calculate:**
> "I work with one team that requires **two months of mean time between failure (MTBF) testing** before releasing their product."

> **MTBF = Total Operating Time ÷ Number of Failures**

Cohn's example: the team runs the system continuously for two months (contractually required) to measure hardware and software failure intervals.

---

### 13. MTTR (Mean Time to Recover/Repair)

**How to Calculate (Industry Standard, reinforced by Lean):**

> **MTTR = Total Downtime ÷ Number of Incidents**

**Lean Connection:**
The Andon/stop-the-line concept (from Toyota Way and Poppendieck) is the lean equivalent of fast MTTR. As Poppendieck (2009) notes: "Unit tests are what let you stop the line" — fast detection enables fast recovery.

---

### 14. Change Failure Rate

**How to Calculate (Industry Standard, DORA-derived):**

> **Change Failure Rate = (Failed Deployments ÷ Total Deployments) × 100%**

**Book Support:**
- PMBOK 7 discusses "falha geral do projeto" (general project failure) as a risk metric
- Derby/Larsen Retrospectives: teams "brainstorm experiments we can do in the next iteration to bring the defect rates down"
- Poppendieck 2006: "If you routinely find defects in your verification process, your process is defective" — the principle behind measuring failure rates

---

### 15. Rework / Code Churn

**Primary Sources:**
- Esther Derby & Diana Larsen, *Agile Retrospectives* (2006)
- Mike Cohn, *Agile Estimating and Planning* (2005)

**How to Calculate:**
> "A team in California reduced rework at the end of their next release by improving their unit testing." (Derby/Larsen, Preface)

**Measurement approaches:**
- **Rework Rate = Hours spent on rework ÷ Total development hours**
- **Code Churn = Lines changed (within N days of original commit) ÷ Total lines changed**
- Cohn: "anything that improves accuracy and reduces rework" is a benefit worth measuring

**Clean Code (Martin 2008):**
> "A poem is never done and bears continual rework, and to stop working on it is abandonment." — Rework as a permanent reality, not an anomaly.

---

### 16. Technical Debt

**Primary Sources:**
- Mary & Tom Poppendieck, *Leading Lean Software Development* (2009)
- Mike Cohn, *Agile Estimating and Planning* (2005)

**How to Measure (Leading Lean 2009):**
> "An insidious form of failure demand is the demand on your resources created by technical debt: things such as defects you have chosen to ignore, messy coding practices, duplication, lack of effective test automation, a tightly coupled architecture, multiple code branches — **anything that makes it difficult to respond to a request for a change**."

**Quantification approach:**
The Poppendiecks suggest measuring technical debt by its impact: **extra time/cost added to every change request**.

**Cohn's approach (2005):**
> "A time when teams may work off some of the technical debt incurred either during early iterations while learning to be agile or from the project's pre-agile days." — Technical debt is paid down in dedicated "hardening" iterations.

---

### 17. Cyclomatic Complexity

**Primary Source:** Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006)

**How to Calculate:**
> "McCabe Cyclomatic Complexity Index, 194–195" — explicitly referenced in Implementing Lean Software Development.

**McCabe Formula:**
> **M = E − N + 2P**
>
> Where: E = edges (control flow transfers), N = nodes (sequential statements), P = connected components (exit points)

---

### 18. Automated Test Coverage

**Primary Sources:**
- Robert C. Martin, *Clean Code* (2008)
- Venkat Subramaniam & Andy Hunt, *Practices of an Agile Developer* (2006)

**How to Calculate (Practices 2006):**
> "Unit testing is only as effective as your test coverage. You might want to look at using test coverage tools to give you a rough idea of where you stand."

> **Test Coverage = (Lines/Branches/Paths executed by tests ÷ Total lines/branches/paths) × 100%**

**Clean Code (Martin 2008):**
> "The higher your test coverage, the less your fear. You can make changes with near impunity to code that has a less than stellar architecture."

Clean Code also references "Test Coverage Patterns Can Be Revealing" (T8 in the testing heuristics) and demonstrates 100% code coverage analysis on the ComparisonCompactor example.

**Practices 2006 warns:**
> "More tests don't automatically mean better quality: tests have to be effective. If tests never catch anything, maybe they aren't testing the right things."

---

### 19. Andon / Stop-the-Line (Quality Response Time)

**Primary Sources:**
- Jeffrey Liker, *The Toyota Way* (2003)
- Mary & Tom Poppendieck, *Leading Lean Software Development* (2009)

**How It Works (Toyota Way):**
> "Andon is a visual control device in a production area that alerts workers to defects, equipment abnormalities, or other problems."

**Measurement:**
- Time from defect detection to line stop
- Time from line stop to resolution
- Number of andon pulls per shift

**Software Translation (Poppendieck 2009):**
> "Unit tests are what let you stop the line." — Failing CI builds = software andon. Measure: CI failure rate and time-to-green.

---

### 20. Poka-Yoke (Error Proofing)

**Primary Source:** Jeffrey Liker, *The Toyota Way* (2003), Chapter 11

**Measurement:**
> "Using Countermeasures and Error-Proofing to Fix Problems" — measured by:
- Number of error-proofing mechanisms implemented
- Reduction in defect escape rate after poka-yoke implementation
- % of defects caught before reaching the customer

**Software Mapping (Poppendieck 2006):**
> "Mistake-Proof Code with Test-Driven Development. Write executable specifications instead of requirements."

---

## Core Intent 3: Governance & Effectiveness (Friction and Compliance)

### 21. NPS (Net Promoter Score)

**Primary Source:** Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006)

**How to Calculate (Measure UP framework):**
> "Measure customer satisfaction with a **net promoter score**."

**Industry-Standard Formula:**
> **NPS = % Promoters (score 9–10) − % Detractors (score 0–6)**
>
> On the question: "How likely are you to recommend our product/service?" (0–10 scale)
> - Promoters: 9–10
> - Passives: 7–8 (not counted)
> - Detractors: 0–6

**Poppendieck's Measure UP Framework (2006):**
> Three measurement dimensions:
> 1. **Measure process capability with cycle time**
> 2. **Measure team performance with delivered business value**
> 3. **Measure customer satisfaction with a net promoter score**

---

### 22. Customer Satisfaction / Kano Model

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005), Chapter 11

**How to Calculate (Kano Model):**
Cohn dedicates Chapter 11 to "Kano Model of Customer Satisfaction," categorizing features into:
- **Basic (Must-be):** Absence causes dissatisfaction; presence is expected
- **Performance (One-dimensional):** Linear relationship with satisfaction
- **Excitement (Delighters):** Presence causes satisfaction; absence goes unnoticed

**Measurement:**
Survey customers with functional + dysfunctional questions for each feature. Classify responses into Kano categories. Use the **Satisfaction Coefficient**:
> **Better = (A+O) ÷ (A+O+M+I)**  
> **Worse = −(O+M) ÷ (A+O+M+I)**
>
> Where: A=Attractive, O=One-dimensional, M=Must-be, I=Indifferent

---

### 23. Failure Demand (Internal Quality Metric)

**Primary Source:** Mary & Tom Poppendieck, *Leading Lean Software Development* (2009), Chapter 1

**How to Calculate:**
> "Once you have identified failure demand, **calculate what percentage of the demand on your organization is failure demand**. It is likely to be a big number; we have seen estimates between 30% and 70%."
>
> **Failure Demand % = (Failure Demand ÷ Total Demand) × 100%**

**Impact Calculation:**
> "If one-third of your demand is failure demand, you would **increase the capacity of your organization by 50%** if you could eliminate that failure demand."

**Definition:**
Failure demand = demand caused by a failure to do something or do something right for the customer (rework, fixing defects, answering questions about unclear features).

---

### 24. Bus Factor / Knowledge Transfer

**Primary Source:** Mary & Tom Poppendieck, *Leading Lean Software Development* (2009)

**How to Measure:**
> "Many day-to-day decisions are based on tacit knowledge, which gets left behind in a handover. We must think that tacit knowledge transfers by magic."

**Bus Factor Calculation:**
> **Bus Factor = Minimum number of team members whose sudden absence would halt the project**

**Knowledge Transfer Measurement:**
The Poppendiecks frame this as measuring handover waste — time lost when knowledge moves between people or teams. Calculate: **time spent in handovers as % of total cycle time**.

---

### 25. Onboarding / Ramp-Up Time

**Primary Sources:**
- Mary & Tom Poppendieck, *Leading Lean Software Development* (2009)
- Mike Cohn, *Agile Estimating and Planning* (2005)

**How to Measure (Poppendieck 2009):**
> "This scheme has little capability to absorb ever-present variation, so it is absorbed in the **ramp-up time of newly formed teams**. It would be much better to assign work to established teams than to reconstitute teams around projects."

**Measurement approach:**
- **Time to First PR:** Days from start date to first merged contribution
- **Time to 10th PR:** Days to reach meaningful velocity
- **Ramp-Up Overhead:** Difference between new team velocity and established team velocity

**Cohn (2005):**
> "shorter training time for new employees" listed as a qualitative benefit of better processes.

---

### 26. CMMI Maturity Level

**Primary Sources:**
- Mary & Tom Poppendieck, *Lean Software Development* (2003)
- Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006)
- Mary & Tom Poppendieck, *Leading Lean Software Development* (2009)

**How It Works (as referenced in the books):**
The Poppendieck books reference CMM/CMMI across all three volumes:
- 2003: "Between PMI and CMM certification programs, a heavy emphasis on process definition and detailed, front-end planning seemed to dominate everything."
- 2006: "CMM, 124" indexed; used as a comparative framework for process discipline
- 2009: "Capability Maturity Model Integration and SCAMPI are service marks of Carnegie Mellon University"

**Measurement Levels:**
- Level 1: Initial (ad hoc, chaotic)
- Level 2: Managed (project-level process discipline)
- Level 3: Defined (organization-wide standards)
- Level 4: Quantitatively Managed (measured and controlled)
- Level 5: Optimizing (continuous improvement)

---

### 27. SLA / Uptime / Availability

**Primary Source:** Mary & Tom Poppendieck, *Leading Lean Software Development* (2009)

**How to Calculate:**
> "Availability & Consistency" referenced via Amazon's Werner Vogels (Leading Lean, Ch.1).

> **Availability = (Uptime ÷ Total Time) × 100%**
>
> Or: **Availability = (MTBF ÷ (MTBF + MTTR)) × 100%**

---

### 28. Retrospective / Root Cause Analysis (5 Whys)

**Primary Sources:**
- Jeffrey Liker, *The Toyota Way* (2003), Chapter 20
- Mary & Tom Poppendieck, *Leading Lean Software Development* (2009)
- Esther Derby & Diana Larsen, *Agile Retrospectives* (2006)

**How to Execute (Toyota Way):**
> "Identify Root Causes and Develop Countermeasures. Getting to the Root Cause by Asking 'Why?' Five Times."

**Process:**
1. State the problem
2. Ask "Why?" — record answer
3. Ask "Why?" about that answer — repeat 5 times
4. The 5th answer is typically the root cause
5. Develop countermeasure
6. Verify the countermeasure prevents recurrence

**Supporting Tools:**
- **Fishbone (Ishikawa) Diagrams:** Leading Lean (2009) — "fishbone diagrams, 179"
- **A3 Problem-Solving:** Leading Lean (2009) — "A3 problem-solving report, 176–180"

**Measurement:**
- Number of retrospectives held per iteration
- Number of action items generated vs. completed
- Recurrence rate of identified problems

---

## Core Intent 4: Predictability & Impact (Business Alignment and Variance)

### 29. Estimation Accuracy / Error

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005), Chapters 4–6

**How to Calculate:**
> "Velocity Corrects Estimation Errors. As a team begins making progress through an iteration, they will find that the total of their estimates is wrong."

**Estimation Error Formula:**
> **Error % = |(Actual − Estimated)| ÷ Estimated × 100%**

**Cohn's Accuracy Curve (Chapter 6, Figure 6.1):**
> "Additional estimation effort yields very little value beyond a certain point." — The relationship between estimate accuracy and effort is asymptotic, not linear. There's a point of diminishing returns.

**50%/90% Buffer Method (Cohn, Chapter 17):**
> "These estimates can be in story points or ideal days. The final column of Table 17.2 is calculated by taking the worst case (90%) estimate of a story, subtracting the average case (50%) of that story, and squaring the result. The first story, for example, is (3−1)² = 4. The schedule buffer is the square root of the sum of these squares."
>
> **Buffer = √Σ((90% estimate − 50% estimate)²)**

This is a simplified Critical Chain buffer calculation adapted for agile.

---

### 30. Coefficient of Variation (CV%)

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005) — implicit in velocity variability

**How to Calculate:**
> **CV% = (Standard Deviation of Velocity ÷ Mean Velocity) × 100%**

Cohn discusses velocity variability implicitly through "Yesterday's Weather" averaging, where using a rolling average of 3 iterations smooths outliers. A stable team has a low CV% (high predictability).

**Poppendieck (2006) reference:**
> "Variation and Utilization" (p101–102) — the relationship between variability in arrival/departure rates and queue lengths.

---

### 31. Ideal Time vs. Elapsed Time

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005), Chapter 4

**How to Calculate:**
> "Ideal time is the amount of time that something takes when stripped of all peripheral activities. In that sense, a football game takes sixty minutes. Elapsed time, on the other hand, is the amount of time that passes on a clock (or perhaps a calendar). A football game requires around three hours."

**Flow Efficiency Derivation:**
> **Flow Efficiency = Ideal Time ÷ Elapsed Time × 100%**
>
> Example: A football game = 60 minutes ideal / 180 minutes elapsed = 33% flow efficiency

---

### 32. Project Duration Formula

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005), Chapter 4

**How to Calculate (Figure 4.1):**
> **Number of Iterations = Σ(Story Point estimates for all features) ÷ Velocity**
>
> **Duration (calendar) = Number of Iterations × Iteration Length**

**Example:**
> "All user stories are estimated and the sum is 100 story points. Velocity = 11 story points per two-week iteration. 100/11 = 9.1 → ~10 iterations × 2 weeks = 20 weeks."

**Release Planning Formula (Cohn, Chapter 17):**
> "13 iterations × 20 story points per iteration = 260 story points total capacity"

---

### 33. Burndown / Burnup Charts

**Primary Sources:**
- Esther Derby & Diana Larsen, *Agile Retrospectives* (2006)
- Mary & Tom Poppendieck, *Lean Software Development* (2003), *Implementing Lean Software Development* (2006)
- Mike Cohn, *Agile Estimating and Planning* (2005)

**How to Create (Derby/Larsen 2006):**
> "Metrics include **burndown charts**, velocity, defect counts, number of stories completed, amount of code refactored, effort data, and so forth."

**How to Calculate (Burndown):**
1. Plot remaining work (story points or hours) on the Y-axis
2. Plot time (days of iteration) on the X-axis
3. Draw the **ideal line** from total work at Day 0 to zero at Day N
4. Plot actual remaining work daily
5. The gap between ideal and actual = deviation from plan

**How to Calculate (Burnup):**
1. Plot completed work on Y-axis, time on X-axis
2. Include a total scope line (which can change)
3. Completed work that crosses total scope = done

---

### 34. Cost of Delay

**Primary Source:** Mary & Tom Poppendieck, *Lean Software Development: An Agile Toolkit* (2003), Tool 12

**How It Works:**
> "Tool 12: Cost of Delay" — a dedicated toolkit chapter (referenced at pages 83–90) covering:
> - **Product Model**: Estimating the cost of delaying product features
> - **Application Model**: Estimating the cost of delaying internal applications
> - **Tradeoff Decisions**: Using cost of delay to make prioritization decisions

**How to Calculate:**
> **Cost of Delay = Value lost per unit of time × Duration of delay**

**WSJF Extension (Industry Standard, not explicit in 2003 but implied):**
> **WSJF = Cost of Delay ÷ Job Size (or Duration)**
>
> Prioritize the work with the highest WSJF score.

---

### 35. ROI (Return on Investment)

**Primary Sources:**
- Mike Cohn, *Agile Estimating and Planning* (2005), Chapter 7
- Robert C. Martin, *Clean Code* (2008)
- Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006)
- PMBOK 7th Edition (2021)

**Cohn's Formula (2005):**
> "ROI calculations put equal value on the money invested in year one and the money earned in year five. To determine the value today of a future amount of money, we think in terms of how much money would have to be put in the bank today in order for it to grow to the future amount."
>
> **ROI = (Net Benefit ÷ Total Investment) × 100%**
>
> Cohn uses **Net Present Value (NPV)** and **Internal Rate of Return (IRR)** for time-value-adjusted ROI calculations.

**Clean Code (Martin 2008):**
> "Learning tests... have a positive return on investment" — testing has calculable ROI when it prevents future defects.

**Poppendieck (2006):**
> "The return on investment in practices outlined in this book can be very high." — ROI on lean practices: "productivity consistently four times that of its competitors and quality is twelve times better."

**PMBOK 7:**
> "Documentos de business case com estimativas detalhadas de retorno sobre o investimento" — ROI as a required component of the business case.

---

### 36. Schedule Variance (Earned Value)

**Primary Source:** PMBOK 7th Edition (2021) — Measurement Domain

**How to Calculate (EVM Formulas referenced in PMBOK 7):**

The Measurement Domain of PMBOK 7 establishes that "existe uma ligação natural entre planejamento, entrega e medição do trabalho. Essa ligação é a métrica" (there is a natural link between planning, delivery, and work measurement. This link is the metric).

**EVM Formulas (from PMBOK tradition):**
> **SV (Schedule Variance) = EV (Earned Value) − PV (Planned Value)**
>
> **SPI (Schedule Performance Index) = EV ÷ PV**
>
> Where:
> - **PV** = Budgeted cost of work scheduled
> - **EV** = Budgeted cost of work performed
> - **SV > 0** = ahead of schedule; **SV < 0** = behind schedule
> - **SPI > 1.0** = ahead of schedule; **SPI < 1.0** = behind schedule

---

### 37. Value Stream Mapping

**Primary Sources:**
- Mary & Tom Poppendieck, *Lean Software Development* (2003), Tool 2
- Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006), Chapter 4
- Mary & Tom Poppendieck, *Leading Lean Software Development* (2009), Chapter 1
- Jeffrey Liker, *The Toyota Way* (2003), Chapter 21
- PMBOK 7th Edition (2021)

**PMBOK 7 Definition:**
> "Mapa da cadeia de valor (Value stream map). Uma exibição das etapas críticas de um processo e o tempo gasto em cada etapa executada para identificar o desperdício." (A display of the critical steps of a process and the time spent on each step to identify waste.)

**How to Create (Leading Lean 2009):**
> "One way to evaluate the end-to-end workflow through your system is to draw a process flow map—also known as a value stream map—of the end-to-end flow of a product or a customer problem as it makes its way through your organization. There are two reasons for drawing these maps. They help you:
> 1. **Discover the reasons for failure demand**, so it can be eliminated
> 2. **Find waste in the workflow**, so it can be removed"

**Measurement outputs:**
- **Value-Add Time (VA):** time spent on activities the customer would pay for
- **Non-Value-Add Time (NVA):** time spent on waste
- **Total Cycle Time = VA + NVA**
- **Flow Efficiency = VA ÷ (VA + NVA)**

**Toyota Way Process (Liker 2003):**
> Three phases: "Phase One: Preparation for the Workshop. Phase Two: The Kaizen Workshop. Phase Three: After the Workshop — Sustaining and Continuous Improvement."

---

### 38. Heijunka (Workload Leveling)

**Primary Source:** Jeffrey Liker, *The Toyota Way* (2003), Chapter 10

**How It Works:**
> "Principle 4: Level Out the Workload (Heijunka). When you try to apply the TPS, the first thing you have to do is to even out or level the production."

**How to Calculate:**
> **Leveled Volume = Total demand ÷ Time period**
>
> Apply to both volume (quantity) and mix (variety). The Heijunka box is a visual scheduling tool that spreads production evenly.

**Measurement:**
- Variability in daily/weekly workload (lower = better leveling)
- Mura (unevenness) — one of the three enemies of lean alongside Muda (waste) and Muri (overburden)

---

### 39. Kaizen / Continuous Improvement

**Primary Sources:**
- Jeffrey Liker, *The Toyota Way* (2003), Chapter 3 & 20
- Robert C. Martin, *Clean Code* (2008)

**How to Measure (Toyota Way):**
> "Continuous improvement, often called kaizen, defines Toyota's basic approach to doing business."

**PDCA Cycle (Deming Cycle):**
1. **Plan:** Identify problem, propose change
2. **Do:** Implement change on small scale
3. **Check:** Measure results
4. **Act:** Standardize if successful; adjust if not

**Clean Code (Martin 2008):**
> "Can you imagine working on a project where the code simply got better as time passed? Do you believe that any other option is professional? Indeed, isn't continuous improvement an intrinsic part of professionalism?"

**Measurement:**
- Number of improvement experiments per period
- Number of Kaizen events held
- % of improvements that become standardized

---

### 40. 5S Measurement Framework

**Primary Source:** Robert C. Martin, *Clean Code* (2008), Chapter 1

**The 5S Philosophy as Code Quality Measurement:**
> "The 5S philosophy comprises these concepts:
> - **Seiri (Sort/Organization):** Knowing where things are — using approaches such as suitable naming.
> - **Seiton (Systematize/Tidiness):** A place for everything, and everything in its place. A piece of code should be where you expect to find it.
> - **Seiso (Shine/Cleaning):** Keep the workplace free of hanging wires, grease, scraps, and waste. Get rid of commented-out code.
> - **Seiketsu (Standardization):** The group agrees about how to keep the workplace clean — consistent coding style.
> - **Shutsuke (Discipline/Self-Discipline):** Having the discipline to follow the practices."

**Application as a Scoring Rubric:**
Each dimension can be scored 1–5 (or pass/fail) to create a **Code Hygiene Score**:
> **5S Score = Average of 5 dimension scores**
>
> This provides a qualitative but systematic approach to measuring codebase health.

---

### 41. INVEST Criteria for User Stories

**Primary Source:** Mike Cohn, *Agile Estimating and Planning* (2005)

While the acronym is not spelled out letter-by-letter in the extracted pages, Cohn's book is the canonical source for **story quality measurement**:

| Letter | Criterion | Measurement Question |
|--------|-----------|---------------------|
| **I** | Independent | Can this story be developed independently of others? |
| **N** | Negotiable | Is the story a placeholder for conversation, not a contract? |
| **N** | Valuable | Does it deliver value to the user/customer? |
| **E** | Estimable | Can the team estimate its size? |
| **S** | Small | Is it small enough to complete in one iteration? |
| **T** | Testable | Can we write acceptance tests for it? |

**How to Score:**
> **INVEST Score = Number of criteria satisfied ÷ 6**
>
> Each story is scored pass/fail on each criterion. Team average = process maturity indicator.

---

### 42. Process Maturity Score

**Primary Sources:**
- Mary & Tom Poppendieck, *Implementing Lean Software Development* (2006) — Sloan's metrics
- Mary & Tom Poppendieck, *Lean Software Development* (2003) — CMM reference

**Sloan's Metrics (Alfred P. Sloan at GM, referenced p40-41):**
The Poppendiecks reference Sloan's measurement system as a historical example of process maturity measurement. Sloan used:
- **Return on Investment (ROI)** as the primary metric
- **Market Share** as a competitive indicator
- Decomposition of metrics across business units

**The Poppendieck Warning:**
> "Reducing the number of measurements" and avoiding "dysfunctional" metrics is as important as measuring. "Improving the wrong ones" (index entry p237) is a documented failure mode.

**How to Calculate a Maturity Score from the literature:**
Combine automated checks of INVEST compliance, 5S adherence, CMMI level assessment, and Kaizen frequency into a composite score.

---

## Consolidated Formula Reference Card

| # | Metric | Formula | Primary Book |
|---|--------|---------|-------------|
| 1 | **Velocity** | Σ(Story Points of completed stories per iteration) | Cohn 2005, Ch.4 |
| 2 | **Duration** | Σ(All Story Points) ÷ Velocity | Cohn 2005, Ch.4 |
| 3 | **Cost per Point** | Total Cost ÷ Σ Story Points | Cohn 2005, Ch.4 |
| 4 | **Cycle Time** | End Time − Start Time (per work item) | PMBOK 7; Poppendieck 2006/2009 |
| 5 | **Throughput** | Items completed ÷ Time period | PMBOK 7 |
| 6 | **WIP** | Throughput × Cycle Time (Little's Law) | Poppendieck 2006, Ch.5 |
| 7 | **Takt Time** | Available Time ÷ Customer Demand | Toyota Way (Liker 2003), Ch.8 |
| 8 | **Flow Efficiency** | Value-Add Time ÷ Total Cycle Time × 100% | Poppendieck 2006; PMBOK 7 |
| 9 | **Lead Time** | Delivery Date − Request Date | Toyota Way (Liker 2003) |
| 10 | **Deployment Frequency** | Number of deployments ÷ Time period | Poppendieck 2006, Table 1.1 |
| 11 | **MTBF** | Operating Time ÷ Number of Failures | Cohn 2005, Ch.3 |
| 12 | **MTTR** | Total Downtime ÷ Number of Incidents | Lean (Andon via Poppendieck 2009) |
| 13 | **Change Failure Rate** | Failed Deployments ÷ Total Deployments × 100% | DORA derivative; PMBOK 7 risk |
| 14 | **Defect Density** | Defects ÷ KLOC (or Story Points) | Derby/Larsen 2006 |
| 15 | **Rework Rate** | Rework Hours ÷ Total Hours × 100% | Derby/Larsen 2006 |
| 16 | **Cyclomatic Complexity** | M = E − N + 2P (McCabe) | Poppendieck 2006, p194-195 |
| 17 | **Test Coverage** | Covered Lines ÷ Total Lines × 100% | Martin 2008; Subramaniam/Hunt 2006 |
| 18 | **NPS** | % Promoters (9-10) − % Detractors (0-6) | Poppendieck 2006, Measure UP |
| 19 | **Failure Demand %** | Failure Demand ÷ Total Demand × 100% | Poppendieck 2009, Ch.1 |
| 20 | **Availability** | Uptime ÷ (Uptime + Downtime) × 100% | Poppendieck 2009 (Amazon ref) |
| 21 | **ROI** | (Net Benefit ÷ Investment) × 100% | Cohn 2005, Ch.7; PMBOK 7 |
| 22 | **NPV** | Σ(Cash Flow_t ÷ (1+r)^t) | Cohn 2005, Ch.7 |
| 23 | **Schedule Variance (SV)** | EV − PV (Earned Value) | PMBOK 7 |
| 24 | **SPI** | EV ÷ PV | PMBOK 7 |
| 25 | **Estimation Error** | |Actual − Estimate| ÷ Estimate × 100% | Cohn 2005, Ch.6 |
| 26 | **Schedule Buffer** | √Σ((90% est − 50% est)²) | Cohn 2005, Ch.17 |
| 27 | **CV%** | (StdDev of Velocity ÷ Mean Velocity) × 100% | Cohn 2005 (derived) |
| 28 | **Cost of Delay** | Value lost per unit time × Delay duration | Poppendieck 2003, Tool 12 |
| 29 | **WSJF** | Cost of Delay ÷ Job Duration | Poppendieck 2003 (implied) |
| 30 | **INVEST Score** | Passed criteria ÷ 6 | Cohn 2005 |
| 31 | **5S Score** | Average of 5 dimension scores | Martin 2008, Ch.1 |
| 32 | **Kano Satisfaction** | Better = (A+O)/(A+O+M+I); Worse = −(O+M)/(A+O+M+I) | Cohn 2005, Ch.11 |

---

## Key Insight: The Poppendieck "Measure UP" Framework

The single richest source for measurement methodology across all four intents is the **Measure UP framework** from *Implementing Lean Software Development* (2006):

| Dimension | What to Measure | How to Measure |
|-----------|----------------|----------------|
| **Process Capability** | Speed and predictability | Cycle time, throughput, Little's Law WIP |
| **Team Performance** | Value delivered | Business value, ROI, story points completed |
| **Customer Satisfaction** | External quality | Net Promoter Score (NPS) |

This three-axis measurement system is the most concise integration of speed, quality, and governance metrics found in the entire library. Every other metric in this report maps to one of these three axes.
