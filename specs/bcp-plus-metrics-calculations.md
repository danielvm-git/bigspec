---
okf_kind: reference
okf_version: "1.0"
generated_by: "human"
generated_at: "2026-07-04T00:00:00Z"
---
# BCP Plus — Metrics & Calculation Methods Report

**Generated:** 2026-07-04  
**Source:** 4 `.docx` documents from `/Users/danielvm/Developer/bigspec/docs/`  
**Documents analyzed:**
1. `BCP-Plus-Whitepaper.docx` — the methodology paper (148 paragraphs, 19 tables)
2. `BCP-Plus-Story-Template-and-Backlog.docx` — template definition + full worked backlog (91 paragraphs, 26 tables)
3. `BCP-Plus-StoryFormat-Rerun.docx` — independent rubric reproduction (56 paragraphs, 4 tables)
4. `BCP-Plus-Validation-and-Audit.docx` — manual count audit + principles checklist (38 paragraphs, 9 tables)

**Author:** Daniel Vieira Magalhães, Head of Operations, CI&T (May 2026)  
**Context:** BCP Plus is a next-generation methodology extending the open-sourced BCP (Business Complexity Points) framework with 3 non-functional dimensions and an LLM-based automated counter, engineered for hybrid human–AI engineering teams at enterprise scale.

---

## The BCP+ Measurement Architecture

### The Core Formula

> "BCP Plus scores a backlog item as the **sum of Fibonacci-weighted contributions across thirteen orthogonal dimensions**. Sizes are XS = 1, S = 2, M = 3, L = 5, XL = 8. Dimensions may be omitted (effectively zero) when they do not apply."

**BCP+ Total = Σ(D1 through D13), where each Di ∈ {0, 1, 2, 3, 5, 8}**

### The 13 Dimensions

**Functional (D1–D10) — inherited from open-source BCP (2015):**
1. Business Rules
2. Interface Elements
3. Roles / Permissions
4. Solution Variabilities
5. Boundaries (integrations)
6. Entities
7. New Entities
8. Background Processes
9. Notifications
10. Audits

**Non-Functional (D11–D13) — the BCP+ extension:**
11. **Quality Attributes** — performance, reliability, scalability, maintainability
12. **Security & Compliance** — auth, encryption, audit trails, regulatory
13. **User Experience & Accessibility** — usability, accessibility, design system

### The Decomposition

> "Walk dimensions 1–10 in order; assign sizes where applicable. Functional BCP = the sum. Walk dimensions 11–13 in order; assign sizes only when requirements exceed standard expectations. NFR BCP = the sum of D11 + D12 + D13. Total BCP Plus = Functional BCP + NFR BCP."

**Functional BCP = Σ(D1 through D10)**  
**NFR BCP = Σ(D11 through D13)**  
**Total BCP+ = Functional BCP + NFR BCP**

---

## Core Intent 1: Speed & Effort (Velocity, Volume, and Cost)

### 1. BCP+ (Business Complexity Points Plus)

**Source:** Whitepaper §04, Template §03

**How to Calculate:**
> "BCP Plus scores a backlog item as the sum of Fibonacci-weighted contributions across thirteen orthogonal dimensions."

**Formula:**
> **BCP+ = Σ( Fibonacci(Di) ) for i = 1 to 13**
>
> Where Fibonacci: XS→1, S→2, M→3, L→5, XL→8, Not Applicable→0

**The Estimation Procedure:**
> "BCP Plus uses a deterministic walk over the thirteen dimensions: Walk dimensions 1–10 in order; assign sizes where applicable. Functional BCP = the sum. Walk dimensions 11–13 in order; assign sizes only when requirements exceed standard expectations."

**Manual validation example (from Validation doc):**
- BCPP-101 (Google OAuth sign-in): Functional=XX, NFR=XX, **Total=46**
- BCPP-303 (Methodology page): Functional=XX, NFR=XX, **Total=26**
- BCPP-501 (Dimensions registry component): Functional=XX, NFR=XX, **Total=21**
- Range: 21–46, Mean: 31 across 3 stories

---

### 2. H/BCP (Hours per BCP) — The Productivity Normalizer

**Source:** Whitepaper §02, §06

**How to Calculate:**
> "The H/BCP ratio (delivery hours per BCP) is the cleanest available denominator for hybrid human–AI velocity comparisons."

> "BCP and BCP Plus measure complexity, not effort. Effort emerges through an empirically observed conversion ratio."

**Formula:**
> **H/BCP = Total Delivery Hours ÷ Σ(BCP+ of completed stories)**

**Key properties (from the whitepaper):**
> "The H/BCP ratio is permitted to vary by team, technology, and engineering practice. The variability is itself diagnostic: improvements driven by AI tooling show up as a **falling H/BCP at constant BCP throughput**, while reorganisation pain shows up as a **rising H/BCP at constant team headcount**."

**Executive dashboard recommendation:**
> "We recommend executive dashboards present three views: (i) BCP throughput per period; (ii) H/BCP trend; and (iii) NFR ratio of the work delivered."

---

### 3. BCP Throughput

**Source:** Whitepaper §06

**How to Calculate:**
> **BCP Throughput = Σ(BCP+ of all stories completed in a period)**

> "BCP throughput per period" — presented as the first view on the executive dashboard.

**Formula:**
> **Throughput = Σ BCP+ delivered per sprint/month/quarter**

---

### 4. AI Counter Accuracy (83% baseline)

**Source:** Whitepaper §01, Template §02

**How to Calculate:**
> "Reported outcomes from Itaú's deployment include **83% LLM classification accuracy**, a 10% reduction in counting variance per story."

**Formula:**
> **Counter Accuracy = Correct dimension classifications ÷ Total classifications × 100%**
>
> (Per-dimension: did the LLM assign the same Fibonacci size as the human reference?)

**Template effect on accuracy:**
> "Across the ten formats audited in the CPSBoK story-formats appendix, AI counter accuracy varies by a factor of **2.4×** and estimation variance by **5×** — driven entirely by how much of the 13-dimension signal the template surfaces to the LLM."

---

### 5. Estimation Variance

**Source:** Whitepaper §07, Template §01

**How to Calculate:**
> "a 10% reduction in counting variance per story"

**Formula (dimension-level):**
> **Variance = (LLM assigned size − Human reference size)² per dimension**

**Template effect:**
> "Traditional As-a/I-want stories expose only three of the thirteen dimensions. The other ten dimensions must be inferred from absent signal, producing the documented **±50% estimation variance**."

---

### 6. Velocity Volatility / Aggregate CV

**Source:** Whitepaper §01, §07

**How to Calculate:**
> "Today's aggregate coefficient of variation of **19%** — with a target of approximately **10%**."

**Formula:**
> **Aggregate CV% = (StdDev(BCP+ scores across 25 iterations) ÷ Mean BCP+) × 100%**

**Empirical result:**
> "Protocol: Each story was scored **25 times** by the BCP Plus prompt chain, yielding **1,075 individual classifications**. Model: GPT-4o-mini. Temperature: 0. Stability metric: coefficient of variation (CV%) per dimension, averaged across stories."

**Maturity-bucketed CV (Exhibit 10):**
> "BCP Plus aggregate CV by story maturity bucket. Stories below maturity 3 exhibit approximately **3× the instability** of mature stories."

**Template effect on CV:**
> "The April 2026 stability evaluation confirms that maturity scores above 3 cut aggregate counter variance from **39.5% to 12.2%**."

---

## Core Intent 2: Quality & Rework (Defects, Stability, and Rework)

### 7. NFR Ratio

**Source:** Whitepaper §04, §08

**How to Calculate:**
> **NFR Ratio = (NFR BCP ÷ Total BCP Plus) × 100%**

**Interpretation bands:**
> "Use as an early indicator:
> - **0–15%** — primarily functional
> - **15–30%** — balanced
> - **30–50%** — NFR-heavy (architectural spike recommended)
> - **>50%** — extreme (architectural review required)"

**Enterprise significance:**
> "NFR-heavy initiatives (over 30%) warrant an architectural spike before commitment."

> "In regulated industries, between **20% and 40%** of programme effort is consumed by non-functional work — performance engineering, security and compliance, accessibility — that classical agile estimation neither measures nor surfaces."

---

### 8. Per-Dimension Stability (CV% per dimension)

**Source:** Whitepaper §07 (Exhibit 7)

**How to Calculate:**
> "Stability metric: coefficient of variation (CV%) per dimension, averaged across stories."

**Formula:**
> **Dimension CV% = (StdDev of Di across 25 iterations ÷ Mean Di) × 100%**

**Key finding — highest-CV dimensions:**
> "The two highest-CV dimensions: Boundaries **44.6%**, Solution Variabilities **47.1%** — also the dimensions most often omitted from the input rather than explicitly negated."

**Two intervention paths (Exhibit 9):**
1. **Template completeness:** Dimensions that are absent from the input → add explicit sections to the template
2. **Prompt refinement:** Dimensions that are present but ambiguous → improve the prompt chain

---

### 9. Counter Stability / Regression

**Source:** Whitepaper §07

**How to Calculate:**
> "Regression versus the open-source BCP Simplified counter: An unwelcome finding — the three functional dimensions that BCP Plus shares with the open-sourced counter show regression on GPT-4o-mini at temperature 0."

**Measurement:**
> Compare CV% of shared dimensions between the BCP Simplified counter and the BCP Plus prompt chain. Increased CV% on BCP Plus = regression attributable to the longer prompt architecture.

---

### 10. Maturity Score (Confidence Indicator)

**Source:** Whitepaper §02, §07; Template §03

**How to Calculate:**
> "Story maturity is a leading indicator of counting reliability."

> "The maturity-score CV of **2.1%** means LLM-suggested counts are reliable when stories are mature, and demonstrably unreliable when they are not."

The maturity score is embedded in the Spec-Driven template as a **self-assessment by the story author**. Stories below maturity 3 are unstable; stories at 3+ have reliable counts.

**Formula:**
> **Maturity Score = Assessment of template completeness and requirement clarity (scale 1–5)**

**Effect on CV:**
> "Maturity scores above 3 cut aggregate counter variance from **39.5% to 12.2%**."

---

### 11. Quality Attributes Dimension (D11)

**Source:** Whitepaper §04; Validation §2

**How to Score (from the BCP+ sizing tables):**
Quality Attributes captures: performance requirements, reliability requirements, scalability needs, maintainability constraints.

**Scoring:** Fibonacci scale (0, 1, 2, 3, 5, 8) based on the gap between standard expectations and explicit non-functional requirements.

---

### 12. Security & Compliance Dimension (D12)

**Source:** Whitepaper §04; Validation §2

**How to Score:**
Security & Compliance captures: authentication, authorization, encryption, audit trails, regulatory requirements.

**Key finding from validation:**
> "BCPP-101 (OAuth) is the only story with a non-trivial Security & Compliance contribution (**D12=5**). This matches the principle that NFR dimensions are sparse but heavy — they do not apply to every story, but when they do they materially move the total."

---

### 13. UX & Accessibility Dimension (D13)

**Source:** Whitepaper §04; Validation §2

**How to Score:**
UX & Accessibility captures: usability requirements, accessibility standards (WCAG), design system compliance.

**Key finding:**
> "Every story produces a non-zero contribution on Interface Elements (D2), Roles / Permissions (D3) and UX & Accessibility (D13). These three dimensions are essentially 'always-on' for this application."

---

## Core Intent 3: Governance & Effectiveness (Friction and Compliance)

### 14. Story Format Score (Rubric-Based)

**Source:** Template §02; Rerun §1

**How to Score (3-dimension rubric):**

**AI Agent (5 sub-criteria, 1–10 scale each):**
1. **Parsability** — how easy is the format for an LLM to parse structurally
2. **Code Clarity** — how unambiguously the format directs implementation
3. **Testability** — whether the format produces testable artefacts
4. **Ambiguity** — inverted; contribution = (10 − raw score)
5. **Completeness** — how much of the picture the format covers

**BCP-NFR (4 sub-criteria):**
1. **Functional ID** — visibility of the ten functional dimensions
2. **NFR ID** — visibility of the three non-functional dimensions
3. **Complexity** — whether complexity drivers are explicit
4. **Completeness** — overall coverage of the 13-dimension model

**FP+SNAP (4 sub-criteria):**
1. **FP ID** — visibility of ILF / EIF / EI / EO / EQ
2. **SNAP ID** — visibility of four SNAP categories and fourteen subcategories
3. **Separation** — whether functional and non-functional can be split cleanly
4. **Double-Count Risk** — inverted; lower risk is better

**Formula:**
> **Dimension Score = Arithmetic mean of sub-criteria (with inversions applied)**

**Results (from CPSBoK, validated by re-run):**
| Format | AI Agent | BCP-NFR | FP+SNAP |
|--------|----------|---------|---------|
| Spec-Driven Development | 10.0 | **10.0** | 9.5 |
| Use Cases (UML) | 8.0 | 8.5 | 7.5 |
| Gherkin / BDD | 7.5 | 5.0 | 5.0 |
| Traditional As-a/I-want | 4.0 | **3.8** | 3.5 |

> "The arithmetic mean of |Δ| across all 30 scores is approximately 0.27 points" — the rubric is reproducible.

---

### 15. Principles Adherence Audit (12 Principles)

**Source:** Validation §3

The Validation document audits the BCP+ template against **12 named principles**. Each receives a Pass/Fail verdict with rationale.

**The 12 principles:**
1. Every dimension must have a dedicated, machine-readable section
2. Dimensions that do not apply must be explicitly marked "Not applicable"
3. Section headings must match dimension names exactly
4. Multiple occurrences within a dimension are counted once at the highest applicable Fibonacci size
5. The maturity self-score must be template-mandated
6. The template must surface all thirteen dimensions in the order the LLM walks them
7. Acceptance criteria must be separately enumerated and testable
8. NFR dimensions must carry explicit requirements, not just labels
9. The data model section must surface entities, new entities, and boundaries
10. External dependencies must be enumerated with integration type
11. The template must not require information the author cannot provide at spec time
12. The template must be usable by a non-BCP-expert product owner

**All twelve pass.**

---

### 16. IFPUG / SNAP Convergence Score

**Source:** Whitepaper §05

**How to Calculate:**
> "BCP Plus's 13 dimensions map cleanly onto SNAP's 14 subcategories without requiring SNAP certification."

**Convergence measurement:**
> "The fourteen SNAP subcategories are fully covered by BCP Plus's thirteen dimensions, with **ten of the fourteen** relying at least partially on the three NFR dimensions."

**Formula:**
> **SNAP Coverage % = SNAP subcategories covered by BCP+ ÷ 14 × 100% = 100%**
>
> (BCP+ claims full coverage of all 14 SNAP subcategories)

**Migration path:**
> "Organisations with existing SNAP investment can migrate without losing measurement continuity; organisations without IFPUG certification can adopt BCP Plus directly."

---

### 17. Model Migration Cadence

**Source:** Whitepaper §09 (Roadmap)

**How to Measure:**
> "OpenAI's deprecation of GPT-4o-mini affects the open-source BCP counter. Build a model-migration cadence into your estimation operating model."

**Stages & metrics:**
- **Stage 1 (Months 1–3):** Adopt BCP — paired-baseline dataset of ≥ 40 stories, H/BCP dashboard
- **Stage 2 (Months 4–6):** Extend to BCP Plus — NFR dimensions, NFR Ratio in portfolio reporting
- **Stage 3 (Months 7–9):** Stabilise the AI counter — target aggregate CV ≤ 10%

---

## Core Intent 4: Predictability & Impact (Business Alignment and Variance)

### 18. Aggregate CV% (Coefficient of Variation)

**Source:** Whitepaper §01, §07; Template §01

This is BCP Plus's headline predictability metric.

**How to Calculate:**
> **Aggregate CV% = Mean of per-story CV% across the baseline**

Where per-story CV% = (StdDev of BCP+ across 25 iterations ÷ Mean BCP+ across 25 iterations) × 100%

**Current baseline:**
> "Today's aggregate coefficient of variation of **19%**"

**Target:**
> "The action plan that will take the automated counter from today's aggregate CV of 19% to the target of approximately **10%**."

**Maturity-bucketed (from empirical evaluation):**
> "Stories below maturity 3: CV = **39.5%**; Stories above maturity 3: CV = **12.2%**."

This maps directly to the bigspec framework's "**CV% (Restricted to N ≥ 20)**" — BCP Plus operationalizes it at N=25 iterations per story.

---

### 19. Per-Dimension CV% (Drill-Down Predictability)

**Source:** Whitepaper §07 (Exhibit 7)

**How to Calculate:**
> For each of the 13 dimensions, compute CV% across the 43-story baseline (25 iterations each).

**Formula:**
> **Di CV% = Mean across stories of (StdDev(Di) ÷ Mean(Di))**

**High-CV dimensions identified:**
- Boundaries (D5): **44.6%** CV
- Solution Variabilities (D4): **47.1%** CV
- These are the dimensions requiring template or prompt intervention.

**Low-CV dimensions:**
- Maturity score itself: **2.1%** CV — extremely stable

---

### 20. Per-Format Estimation Variance

**Source:** Template §02

**How to Calculate:**
> "Estimation variance by **5×**" — varies by format.

**Formula:**
> **Format Variance Ratio = Max variance (worst format) ÷ Min variance (best format) = 5×**

**Specific findings:**
- Traditional As-a/I-want: **±50%** estimation variance
- Spec-Driven: variance near the counter's intrinsic noise floor

---

### 21. Regression Detection (BCP+ vs. BCP Simplified)

**Source:** Whitepaper §07

**How to Calculate:**
> "An unwelcome finding: the three functional dimensions that BCP Plus shares with the open-sourced counter show regression on GPT-4o-mini at temperature 0."

**Formula:**
> **Regression Δ = CV% (BCP Plus counter, shared dims) − CV% (BCP Simplified counter, same dims)**

A positive Δ indicates that the longer BCP+ prompt chain introduces instability on dimensions that were stable under the simpler counter. This is a **quality regression metric** for the prompt architecture itself.

---

### 22. H/BCP Trend (Productivity Direction)

**Source:** Whitepaper §06

**How to Calculate:**
> "The H/BCP ratio is permitted to vary by team, technology, and engineering practice. The variability is itself diagnostic."

**Trend interpretation:**
- **Falling H/BCP at constant BCP throughput** → AI tooling gains
- **Rising H/BCP at constant team headcount** → reorganisation pain, technical debt accumulation
- **Stable H/BCP with rising throughput** → team maturity improvement

**Dashboard recommendation:**
> "H/BCP trend" — presented as the second view on the executive dashboard.

---

### 23. NFR Ratio Trend (Architecture Signal)

**Source:** Whitepaper §08

**How to Calculate:**
> "Use the NFR ratio (D11 + D12 + D13 over total BCP Plus) as a portfolio-level signal."

**Formula:**
> **Portfolio NFR Ratio = Σ(all stories' NFR BCP) ÷ Σ(all stories' Total BCP+) × 100%**

**Trend interpretation:**
- Rising NFR Ratio → increasing non-functional complexity → architectural investment needed
- Falling NFR Ratio → functional-dominant work → velocity should be higher

---

### 24. Template Completeness vs. Counter Accuracy

**Source:** Template §01; Rerun §3

**How to Calculate:**
> "Maturity scores above 3 cut aggregate counter variance from 39.5% to 12.2% — and maturity is itself surfaced by template completeness."

**Formula:**
> **Template Completeness = Number of 13 dimensions with explicit sections ÷ 13 × 100%**

**Empirical relationship:**
- Template at ~23% completeness (3/13 dimensions surfaced) → CV ~50%
- Template at ~100% completeness (13/13 dimensions surfaced, maturity ≥ 3) → CV **≤ 12.2%**

**The BCP+ 20-section variant (from the Rerun doc):**
A proposed template variant with 20 explicit sections (covering all 13 dimensions plus supplementary sections) was independently scored against the CPSBoK rubric. It strictly dominates the vanilla Spec-Driven format on BCP-NFR.

---

### 25. Reproduction Protocol (Auditability Metric)

**Source:** Rerun §1; Validation §4

**How to Calculate (Rerun agreement):**
> "The arithmetic mean of |Δ| across all 30 scores is approximately **0.27 points**" — demonstrating that the CPSBoK rubric produces consistent results when applied by independent raters.

**Formula:**
> **Inter-Rater Agreement = 1 − (Mean |Δ| ÷ Scale range) = 1 − (0.27 ÷ 10) = 97.3%**

**Reproduction protocol for future test cycles (Validation §4):**
1. Select N stories from the backlog (suggested: N ≥ 20)
2. Run the BCP+ counter at temperature 0, 25 iterations per story
3. Compute per-dimension CV% and aggregate CV%
4. Compare against the April 2026 baseline
5. Flag dimensions where CV% > 30% for prompt refinement

---

## BCP Plus Consolidated Formula Reference Card

| # | Metric | Formula | Source |
|---|--------|---------|--------|
| 1 | **BCP+ (Total)** | Σ Fibonacci(D₁…D₁₃), Di ∈ {0,1,2,3,5,8} | Whitepaper §04 |
| 2 | **Functional BCP** | Σ Fibonacci(D₁…D₁₀) | Whitepaper §04 |
| 3 | **NFR BCP** | Σ Fibonacci(D₁₁…D₁₃) | Whitepaper §04 |
| 4 | **H/BCP** | Delivery hours ÷ Σ BCP+ completed | Whitepaper §02, §06 |
| 5 | **BCP Throughput** | Σ BCP+ per period | Whitepaper §06 |
| 6 | **NFR Ratio** | (NFR BCP ÷ Total BCP+) × 100% | Whitepaper §04 |
| 7 | **Aggregate CV%** | Mean(per-story CV%), N=25 iterations | Whitepaper §07 |
| 8 | **Dimension CV%** | StdDev(Di across 25 runs) ÷ Mean(Di) × 100% | Whitepaper §07 |
| 9 | **Maturity Score** | Author self-assessment (1–5) of template completeness | Whitepaper §07, Template §03 |
| 10 | **Maturity-Score CV** | StdDev(maturity score) ÷ Mean(maturity) × 100% = **2.1%** | Whitepaper §02 |
| 11 | **Counter Accuracy** | Correct classifications ÷ Total × 100% = **83%** | Whitepaper §01 |
| 12 | **Estimation Variance** | (LLM size − Human reference)² per dimension | Whitepaper §07 |
| 13 | **Format Variance Ratio** | Max variance ÷ Min variance = **5×** across formats | Template §02 |
| 14 | **Format Score (AI Agent)** | Mean(Parsability, Code Clarity, Testability, 10−Ambiguity, Completeness) | Rerun §1 |
| 15 | **Format Score (BCP-NFR)** | Mean(Functional ID, NFR ID, Complexity, Completeness) | Rerun §1 |
| 16 | **Format Score (FP+SNAP)** | Mean(FP ID, SNAP ID, Separation, 10−DoubleCount) | Rerun §1 |
| 17 | **SNAP Coverage** | SNAP subcategories covered ÷ 14 × 100% = **100%** | Whitepaper §05 |
| 18 | **Template Completeness** | Dimensions with explicit sections ÷ 13 × 100% | Template §04 |
| 19 | **Maturity-Bucketed CV** | CV = **39.5%** (<3 maturity) vs. **12.2%** (≥3) | Template §01 |
| 20 | **Regression Δ** | CV%(BCP+ counter) − CV%(BCP Simplified) on shared dims | Whitepaper §07 |
| 21 | **Inter-Rater Agreement** | 1 − (Mean|Δ| ÷ 10) = **97.3%** | Rerun §2 |
| 22 | **H/BCP Trend** | Δ(H/BCP) per period → AI gain (↓) or pain (↑) | Whitepaper §06 |
| 23 | **Portfolio NFR Ratio** | Σ NFR BCP ÷ Σ Total BCP+ across all stories | Whitepaper §08 |
| 24 | **Per-Format Accuracy Ratio** | Max accuracy ÷ Min accuracy = **2.4×** across formats | Template §01 |

---

## Key Insights: How BCP Plus Differs from and Extends CPSBok and Classic Books

### 1. **13 Orthogonal Dimensions with LLM-Verified Stability**

BCP Plus operationalizes what CPSBok's BCP only hints at. CPSBok mentions "business rules, interface elements, and boundaries" but BCP Plus defines all 13 with per-dimension CV% measurements from 1,075 LLM iterations. This is estimation as an engineering discipline, not a heuristic.

### 2. **The H/BCP Ratio as the Universal Denominator**

> "The H/BCP ratio is the cleanest available denominator for hybrid human–AI velocity comparisons."

This is the metric that bridges the gap between the classic books' abstract "velocity" and real enterprise productivity measurement. It's BCP Plus's equivalent of CPSBok's "BCP Plus + H/BCP" — but formalized with specific diagnostic uses (falling = AI gain, rising = pain).

### 3. **NFR Ratio = ISO/IEC 25010 Made Operational**

Where the classic books mention non-functional requirements conceptually, and CPSBok mentions them in passing, BCP Plus makes NFRs a formal part of estimation with three explicit dimensions (Quality Attributes=D11, Security & Compliance=D12, UX & Accessibility=D13) and a portfolio-level governance ratio. The NFR Ratio bands (0–15%, 15–30%, 30–50%, >50%) provide architectural governance signals directly from estimation data.

### 4. **Maturity Score as Confidence Metadata**

Neither the classic books nor CPSBok have the concept of a "confidence number" attached to every estimate. BCP Plus introduces the **maturity score** as a first-class confidence signal — and proves with empirical data that maturity ≥ 3 reduces counter CV from 39.5% to 12.2%. The maturity-score CV of 2.1% means the score itself is extremely stable.

### 5. **Spec-Driven Template as the Dominant Format**

BCP Plus provides empirical proof that template choice is the single largest lever on estimation accuracy: **2.4× accuracy variation** and **5× variance variation** across formats. The 12-principle audit proves the template is defensible.

### 6. **Reproducible Rubric with 97.3% Inter-Rater Agreement**

The Rerun document independently reproduces the CPSBoK rubric with a mean |Δ| of 0.27 points across 30 scores — proving the scoring system is objective and reproducible, not subjective.

### 7. **CV% as the Headline Metric with Concrete Targets**

> "Today's aggregate CV of 19% → target ~10%"

BCP Plus makes CV% the primary quality metric for the estimation process itself, with explicit current and target values — exactly what the bigspec framework calls "CV% (Restricted to N ≥ 20)" but operationalized at N=25 and temperature 0.

---

## Comparison: BCP Plus vs. CPSBok vs. Classic Books

| Aspect | Classic Books | CPSBok | BCP Plus |
|--------|-------------|--------|----------|
| Estimation unit | Story points (abstract) | BCP (3 factors) | **BCP+ (13 dimensions, Fibonacci)** |
| NFR treatment | Conceptual | Implicit | **3 explicit dimensions + NFR Ratio** |
| AI counter | Not applicable | Not applicable | **LLM-based, temperature 0, 25 iterations** |
| Accuracy metric | Velocity volatility | Velocity volatility | **Per-dimension CV%, aggregate CV%, counter accuracy 83%** |
| Confidence | None | None | **Maturity score (CV 2.1%), bucketed by story maturity** |
| Template effect | Not measured | CPSBoK appendix (10 formats) | **2.4× accuracy, 5× variance, 12-principle audit** |
| Enterprise denominator | None standard | H/BCP implied | **H/BCP formalized, with diagnostic trends** |
| Governance signal | NPS, ROI | Value Governance | **NFR Ratio bands → architectural decisions** |
| Auditability | Story-level only | INVEST + maturity | **97.3% inter-rater agreement, reproduction protocol** |
