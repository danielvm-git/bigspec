---
name: run-evals
description: "Run outcome evaluations for a skill — with-skill vs without-skill pass@k and token delta on real tasks. Proves each skill earns its place (Capstone). Use when a skill is ready for eval, during M4 proof phase, or when benchmarking skill effectiveness."
constitution_version: "1.1.0"
effort: heavy
spawn: subagent
risk: medium
movement: sustain
verify: "eval report produced with with-skill vs without-skill delta; positive delta on pass@k and/or token efficiency"
---

# Run Evals

Prove a skill earns its place. Constitution Capstone: each skill ships an eval case. The headline proof is a positive **with-skill vs without-skill** delta (pass@k + token cost) on real tasks.

## Process

### 1. Define the eval case

Pick a real task the skill was designed for. Split into:
- **Without-skill baseline**: run the task without loading the skill
- **With-skill**: run the same task with the skill loaded

### 2. Run baseline (without-skill)

Execute the task without loading the skill. Measure:
- **pass@k**: did the task succeed within k attempts?
- **Token cost**: total tokens consumed (context + generation)
- **Time**: wall clock time

### 3. Run with-skill

Execute the same task with the skill loaded. Measure the same metrics.

### 4. Compute delta

```
pass@k_Δ = with_skill_pass@k - baseline_pass@k
token_Δ = baseline_tokens - with_skill_tokens  (positive = savings)
time_Δ = baseline_time - with_skill_time      (positive = savings)
```

### 5. Write eval report

Create `evals/<skill-name>.md`:

```yaml
---
okf_kind: eval-report
okf_version: "1.0"
generated_by: "skill:run-evals"
generated_at: <iso-8601>
---
# Eval: [Skill Name]

## Task
[Description of the eval task]

## Results
| Metric | Without-skill | With-skill | Delta |
|--------|---------------|------------|-------|
| pass@k | [N] | [N] | [+/-N] |
| Tokens | [N] | [N] | [+/-N] |
| Time   | [N]s | [N]s | [+/-N]s |

## Verdict
[PASS / FAIL] — [one sentence: does the skill prove a positive delta?]
```

### 6. Write handoff

```yaml
handoff:
  next_skill: "craft-skill"   # or current workflow
  reason: "Eval complete. Skill [passes/fails] Capstone gate."
```
