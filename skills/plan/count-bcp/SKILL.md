---
name: count-bcp
description: "Size a story using the native BCP-Plus 13-dimension methodology. Consumes the okf_kind:story and okf_kind:glossary bundles, runs the Element Router for dimension classification, and emits a okf_kind:bcp-count bundle with elements, dimensions, total_bcp, and calibration_id. Use after plan-work, or whenever a story needs BCP sizing."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: medium
movement: plan
verify: "bcp-count bundle exists with total_bcp, calibration_id (bcp-plus-v1), and confidence_verdict; each dimension subtotal is traceable to elements in the story; validate-okf passes on the bcp-count bundle"
---

# Count BCP

Native BCP-Plus sizing. Produces a machine-derived `bcp-count` OKF bundle from the story and glossary — never hand-stamped.

## Pre-flight

Read:
- The story bundle (`okf_kind: story`) — the human-authored input
- The glossary bundle (`okf_kind: glossary`) — domain ground truth for dims 5/6/7/11-13
- Constitution B9 for calibration anchors (known-3, known-8)

## Process

### 1. Element Router — classify story elements

The Router owns dimension classification. The story must NOT pre-partition elements.

For each element described in the story §3:
- Classify into one of the 13 BCP-Plus dimensions
- Apply identity rules (canonical elements — no double-counting)
- Apply aspect-splitting: Business Rules is residual (what's left after data, UI, interface elements are counted)
- Use the glossary for entity → dim 6/7, role → dim 5, NFR → dims 11-13

### 2. Size each element per decision tables

Apply criteria-defined sizes from the `bcp-plus-v1` decision tables:
- Each element gets a size (1, 2, 3, 5, 8, 13, or higher)
- Size is NOT a Fibonacci guess — it follows the table criteria

### 3. Compute dimension subtotals

Roll up element sizes into per-dimension subtotals:
```
dims:
  dim-01-interface-elements: {count: N, subtotal: X}
  dim-02-input-data: {count: N, subtotal: X}
  ...
  dim-13-compliance: {count: N, subtotal: X}
```

### 4. Derive total_bcp

Sum all dimension subtotals. This is the story's BCP size.

### 5. Write bcp-count bundle

Create `specs/epics/<epic>/<story>-bcp.yaml`:

```yaml
---
okf_kind: bcp-count
okf_version: "1.0"
generated_by: "skill:count-bcp"
generated_at: <iso-8601>
calibration_id: bcp-plus-v1
---
story: "<story file path>"
total_bcp: <N>
elements:
  - id: el-01
    description: "[element description]"
    dimension: dim-05-roles
    size: 2
dimensions:
  dim-05-roles: {count: 1, subtotal: 2}
  # ... all 13 dimensions present, even if subtotal is 0
confidence_verdict: high | medium | low
```

### 6. Cross-check against calibration anchors

Compare against the two known anchors:
- **Known-3 (small):** `bp-yaml` get/set — pure single-responsibility module
- **Known-8 (large):** `validate-okf` — kind-aware dispatcher, 6 kinds + envelope

If the count diverges sharply from the nearest anchor, flag it — do NOT overwrite the number. Re-inspect the story.

### 7. Write handoff

```yaml
handoff:
  next_skill: "assess-impact"
  reason: "BCP count complete (total_bcp: <N>, calibration_id: bcp-plus-v1)."
```
