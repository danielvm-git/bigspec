---
name: security-review
description: "STRIDE-based security analysis for P0 and P1 stories. Checks for spoofing, tampering, repudiation, information disclosure, denial of service, and elevation of privilege. Use for P0/P1 stories after review, before merge. Skip for P2/P3 stories."
constitution_version: "1.1.0"
effort: medium
spawn: inline
risk: high
movement: prove
verify: "STRIDE analysis complete; any HIGH severity finding resolved before merge; security review report written"
---

# Security Review

STRIDE analysis for P0 and P1 stories. For P2/P3 stories, skip this skill — security review is only required for P0/P1.

## When to run

- P0 stories (auth, money, data loss, security) — MANDATORY
- P1 stories (core business logic, shared modules) — MANDATORY
- P2/P3 stories — SKIP (write handoff to `trace-requirement` instead)

## STRIDE Analysis

For each threat category, examine the changed code:

| Threat | Check |
|--------|-------|
| **Spoofing** | Can an attacker impersonate a user, service, or data source? Auth bypass? Missing identity verification? |
| **Tampering** | Can data be modified in transit, at rest, or in the client? Missing integrity checks? Unsigned payloads? |
| **Repudiation** | Can a user deny an action? Missing audit logs? No proof of who did what? |
| **Information Disclosure** | Can sensitive data leak? Over-fetching? Missing access controls? Data in error messages or logs? |
| **Denial of Service** | Can an attacker exhaust resources? Unbounded loops? Missing rate limits? Large payloads with no size check? |
| **Elevation of Privilege** | Can a lower-privilege user gain higher access? Missing authorization checks? Trusted client-side state? |

## Process

### 1. Examine the diff

```bash
git diff main...HEAD
```

Walk through each changed file looking for the STRIDE threats.

### 2. Classify findings

| Severity | Meaning | Action |
|----------|---------|--------|
| **HIGH** | Exploitable vulnerability | Fix before merge — BLOCKER |
| **MEDIUM** | Weakness that increases risk | Fix before merge |
| **LOW** | Defense-in-depth gap | Note in report; fix in next cycle |

### 3. Write security report

Create `specs/epics/<epic>/<story>-security.md`:

```yaml
---
okf_kind: security-review
okf_version: "1.0"
generated_by: "skill:security-review"
generated_at: <iso-8601>
---
# Security Review: [Story Title]

## Summary
Risk tier: P0 | P1
Findings: N (HIGH: X, MEDIUM: Y, LOW: Z)

## Findings
| ID | Threat | Severity | Description | Fix applied |
|----|--------|----------|-------------|-------------|
| S-01 | Tampering | HIGH | [description] | [fix] |

## STRIDE Coverage
| Threat | Checked | Finding |
|--------|---------|---------|
| Spoofing | ✓ | None |
| Tampering | ✓ | S-01 |
| ... | ... | ... |

## Verdict
[PASSING / FAILING] — [one sentence]
```

### 4. Write handoff

If PASSING:
```yaml
handoff:
  next_skill: "trace-requirement"
  reason: "Security review PASSING. Proceeding to requirement traceability."
```

If FAILING (HIGH findings):
```yaml
handoff:
  next_skill: "develop-tdd"
  reason: "Security review found HIGH findings. Must fix before proceeding."
```
