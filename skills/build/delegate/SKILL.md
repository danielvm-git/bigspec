---
name: delegate
description: "Delegate complex sub-tasks to fresh-context subagents with two-stage review (output inspection → diff inspection). Use for heavy isolated work that benefits from fresh perspective, or when a task exceeds inline context budget. Distinct from orchestrate-project (which drives the full loop)."
constitution_version: "1.1.0"
effort: heavy
spawn: subagent
risk: medium
movement: build
verify: "subagent work reviewed and accepted; verify: command passed in subagent context; changes merged into working branch"
---

# Delegate

Offload a complex, self-contained task to a subagent with a clean context. Two-stage review gate before accepting the result.

## Process

### 1. Define the task

Write a minimal self-contained brief:

```
Goal: [one sentence — specific, measurable outcome]
In scope: [explicit file or module list]
Out of bounds: [what NOT to do]
Constraints: [constitution rules, existing patterns, test requirements]
Verify: [runnable command]
Prior decisions: [relevant cockpit context — omit if none]
```

Do NOT include full file contents, full conversation history, or decisions unrelated to this task. Brief size directly controls token cost and hallucination risk.

### 2. Spawn the subagent

Use `delegate_task` with the complete brief. The subagent starts cold — no shared state. Include:
- All context it needs
- Constitution constraints
- The verify command it must run before reporting done

### 3. Stage 1 review — output inspection

When the subagent returns:
- Did it run the verify command? Did it pass?
- Does it explain what it changed and why?
- Any concerns raised?

If the report raises red flags, ask the subagent for clarification or re-run.

### 4. Stage 2 review — diff inspection

```bash
git diff main...HEAD
```

Check:
- [ ] Changes scoped to what was asked — nothing extra
- [ ] No `any`, no `@ts-ignore`, no disabled lint rules
- [ ] Tests added for new behavior
- [ ] Constitution compliance (naming, structure, size limits)
- [ ] Boy Scout Rule: touched areas cleaner than before

### 5. Decision

- **Accept**: merge into working branch
- **Revise**: send back to subagent with specific feedback
- **Reject**: discard and re-approach differently

### 6. Write handoff

```yaml
handoff:
  next_skill: "develop-tdd"   # or current skill being executed
  reason: "Subagent work reviewed and accepted. Continuing."
```
