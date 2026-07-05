---
name: order-release
description: "Prioritize stories within an epic using WSJF (Weighted Shortest Job First): Value, Time Criticality, Risk Reduction, and Job Size (BCP). Outputs a WSJF-ordered epic story list. Use after count-bcp, or when deciding which story to build next."
constitution_version: "1.1.0"
effort: light
spawn: inline
risk: low
movement: plan
verify: "epic.yaml has WSJF scores for all stories; stories are ordered by WSJF descending"
---

# Order Release

Prioritize stories using WSJF (Weighted Shortest Job First). The highest WSJF story is built first.

## Process

### 1. Read epic data

Read the epic's `epic.yaml`. Collect:
- Story list with BCP sizes (from `count-bcp`)
- Story statuses (pending / built / done)

### 2. Score each pending story

For each pending story, assign WSJF scores (1-10):

| Factor | Question |
|--------|----------|
| **Value** | How much business/user value does this deliver? |
| **Time Criticality** | How quickly does the value decay? Is there a deadline? |
| **Risk Reduction** | How much does this reduce uncertainty or technical risk? |
| **Job Size (BCP)** | The `total_bcp` from `count-bcp` |

WSJF = (Value + Time Criticality + Risk Reduction) / Job Size

### 3. Order by WSJF

Sort stories descending by WSJF. Update `epic.yaml`:

```yaml
stories:
  - id: eNNs01
    title: [title]
    bcps: 5
    risk_tier: P1
    wsjf: 3.2
    status: pending
    order: 1
  - id: eNNs02
    title: [title]
    bcps: 3
    risk_tier: P2
    wsjf: 2.7
    status: pending
    order: 2
```

### 4. Write handoff

```yaml
handoff:
  next_skill: "seed-conventions"
  reason: "Stories ordered by WSJF. Highest priority: <story-id> (WSJF: <score>)."
```
