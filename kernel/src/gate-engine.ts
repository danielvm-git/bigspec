#!/usr/bin/env node
/**
 * gate-engine — risk-tiered gate evaluation for bigspec stories.
 *
 * Spec: specs/epics/e03-kernel/e03s03-gate-engine.md
 * Constitution: B5 (Risk-Tiered Verification), B6 (Gates & Hard-Stops), Part II (Risk Tiers), Part IV (Gates)
 *
 * Core exports:
 *   parseTasks(path)       — read an OKF tasks YAML
 *   evaluateCheckpoint(cp) — shell out to verify_cmd
 *   evaluateGates(ledger)  — evaluate all gates against ledger state
 *   getLane(tier)          — map risk tier to verification lane
 *   gateCheck(path)        — full report: parse + check all gates + run checkpoints
 */

import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import YAML from "yaml";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type RiskTier = "P0" | "P1" | "P2" | "P3";
export type GateState = "PASSING" | "FAILING" | "PENDING" | "BLOCKED";
export type GateType = "Confirm" | "Risk" | "Quality" | "Completeness";
export type CheckpointStatus = "PASSING" | "FAILING" | "PENDING";

export interface Checkpoint {
  id: string;
  intent: string;
  verify_cmd: string;
  status: CheckpointStatus;
}

export interface Gate {
  type: GateType;
  blocks_until: string;
  state: GateState;
}

export interface TasksLedger {
  story: string;
  risk_tier: RiskTier;
  verify_suite: string;
  checkpoints: Checkpoint[];
  gates: Gate[];
}

export interface CheckpointResult {
  checkpoint: Checkpoint;
  passed: boolean;
  stdout: string;
  stderr: string;
}

export interface GateResult {
  gate_type: GateType;
  status: GateState;
  detail: string;
}

export interface GateReport {
  file: string;
  risk_tier: RiskTier;
  gates: GateResult[];
  passed: boolean;
}

export interface VerificationLane {
  tier: RiskTier;
  lane: "fast" | "full" | "full-light";
  label: string;
  steps: string[];
}

// ---------------------------------------------------------------------------
// Lane definitions (constitution Part II)
// ---------------------------------------------------------------------------

const LANE_MAP: Record<RiskTier, VerificationLane> = {
  P0: {
    tier: "P0",
    lane: "full",
    label: "Critical — full multi-phase UAT + NFR gates + security scan",
    steps: [
      "uat",
      "nfr-gates",
      "security-scan",
      "fresh-review",
    ],
  },
  P1: {
    tier: "P1",
    lane: "full",
    label: "High — build + test + lint + step-by-step UAT + review",
    steps: [
      "build",
      "test",
      "lint",
      "step-by-step-uat",
      "review",
    ],
  },
  P2: {
    tier: "P2",
    lane: "full-light",
    label: "Medium — smoke + typecheck + lint",
    steps: ["smoke", "typecheck", "lint"],
  },
  P3: {
    tier: "P3",
    lane: "fast",
    label: "Low — typecheck + lint; quick-fix allowed",
    steps: ["typecheck", "lint", "quick-fix"],
  },
};

const VALID_TIERS = new Set<RiskTier>(["P0", "P1", "P2", "P3"]);

// ---------------------------------------------------------------------------
// Parse tasks OKF YAML
// ---------------------------------------------------------------------------

export function parseTasks(path: string): TasksLedger {
  let raw: string;
  try {
    raw = readFileSync(path, "utf-8");
  } catch (e: any) {
    throw new Error(
      `cannot read tasks file: "${path}"\n` +
        `  hint: verify the path exists and is readable`
    );
  }

  // Strip OKF frontmatter — supports two formats:
  //   1. Standard: `---\n<fields>\n---\n<body>`  (bp-yaml-style)
  //   2. Inline:   `<fields>\n---\n<body>`        (inline frontmatter, no opening ---)
  let bodyRaw: string;
  const standardMatch = raw.match(/^---\n[\s\S]*?\n---\n/);
  if (standardMatch) {
    bodyRaw = raw.slice(standardMatch[0].length);
  } else {
    // Inline format: first standalone `---` on its own line separates frontmatter from body
    const sepIdx = raw.search(/\n---\n/);
    if (sepIdx !== -1) {
      // Consume the separator line itself
      bodyRaw = raw.slice(sepIdx + 5); // +5 for '\n---\n'
    } else {
      bodyRaw = raw;
    }
  }

  let doc: any;
  try {
    doc = YAML.parse(bodyRaw);
  } catch (e: any) {
    throw new Error(
      `cannot parse YAML in "${path}": ${e.message}\n` +
        `  hint: check YAML syntax — invalid YAML in tasks body`
    );
  }

  if (!doc || typeof doc !== "object") {
    throw new Error(`empty or non-object tasks body in "${path}"`);
  }

  // Validate required fields
  const required = ["story", "risk_tier", "checkpoints", "gates"];
  for (const field of required) {
    if (!(field in doc)) {
      throw new Error(
        `missing required field "${field}" in "${path}"\n` +
          `  hint: tasks OKF bundles must have ${required.join(", ")}`
      );
    }
  }

  // Validate risk_tier
  if (!VALID_TIERS.has(doc.risk_tier)) {
    throw new Error(
      `invalid risk_tier "${doc.risk_tier}" in "${path}"\n` +
        `  hint: must be one of P0, P1, P2, P3`
    );
  }

  if (!Array.isArray(doc.checkpoints)) {
    throw new Error(
      `"checkpoints" must be an array in "${path}"\n` +
        `  hint: checkpoints should be a list of {id, verify_cmd, status}`
    );
  }

  if (!Array.isArray(doc.gates)) {
    throw new Error(
      `"gates" must be an array in "${path}"\n` +
        `  hint: gates should be a list of {type, blocks_until, state}`
    );
  }

  return {
    story: doc.story,
    risk_tier: doc.risk_tier,
    verify_suite: doc.verify_suite || "",
    checkpoints: doc.checkpoints as Checkpoint[],
    gates: doc.gates as Gate[],
  };
}

// ---------------------------------------------------------------------------
// Evaluate a single checkpoint by running its verify_cmd
// ---------------------------------------------------------------------------

export function evaluateCheckpoint(checkpoint: Checkpoint): CheckpointResult {
  try {
    const output = execSync(checkpoint.verify_cmd, {
      encoding: "utf-8",
      timeout: 30_000,
      stdio: ["ignore", "pipe", "pipe"],
    });
    return {
      checkpoint,
      passed: true,
      stdout: output.trim(),
      stderr: "",
    };
  } catch (e: any) {
    return {
      checkpoint,
      passed: false,
      stdout: e.stdout?.trim() || "",
      stderr: e.stderr?.trim() || e.message || "",
    };
  }
}

// ---------------------------------------------------------------------------
// Evaluate all gates against a tasks ledger
// ---------------------------------------------------------------------------

export function evaluateGates(ledger: TasksLedger): GateResult[] {
  return ledger.gates.map((gate) => evaluateGate(gate, ledger));
}

function evaluateGate(gate: Gate, ledger: TasksLedger): GateResult {
  switch (gate.type) {
    case "Risk":
      if (VALID_TIERS.has(ledger.risk_tier)) {
        return {
          gate_type: "Risk",
          status: "PASSING",
          detail: `risk tier "${ledger.risk_tier}" is valid — ${getLane(ledger.risk_tier).lane} lane`,
        };
      }
      return {
        gate_type: "Risk",
        status: "FAILING",
        detail: `invalid risk tier "${ledger.risk_tier}" — must be P0–P3`,
      };

    case "Quality":
      const failed = ledger.checkpoints.filter((cp) => cp.status === "FAILING");
      const pending = ledger.checkpoints.filter((cp) => cp.status === "PENDING");
      if (failed.length > 0) {
        return {
          gate_type: "Quality",
          status: "FAILING",
          detail: `${failed.length} checkpoint(s) FAILING: ${failed.map((c) => c.id).join(", ")}`,
        };
      }
      if (pending.length > 0) {
        return {
          gate_type: "Quality",
          status: "PENDING",
          detail: `${pending.length} checkpoint(s) still PENDING: ${pending.map((c) => c.id).join(", ")} (${ledger.checkpoints.length - failed.length - pending.length} PASSING)`,
        };
      }
      return {
        gate_type: "Quality",
        status: "PASSING",
        detail: `all ${ledger.checkpoints.length} checkpoint(s) PASSING`,
      };

    case "Completeness":
      return {
        gate_type: "Completeness",
        status: gate.state,
        detail:
          gate.state === "PASSING"
            ? "gap-critic found no BLOCKER"
            : gate.state === "FAILING"
              ? "gap-critic found BLOCKER(s)"
              : gate.blocks_until || `gate state is ${gate.state}`,
      };

    case "Confirm":
      return {
        gate_type: "Confirm",
        status: gate.state,
        detail:
          gate.state === "PASSING"
            ? "user explicitly approved"
            : gate.blocks_until || `gate state is ${gate.state}`,
      };

    default:
      return {
        gate_type: gate.type,
        status: gate.state,
        detail: `unknown gate type — delegating to declared state`,
      };
  }
}

// ---------------------------------------------------------------------------
// Lane lookup
// ---------------------------------------------------------------------------

export function getLane(tier: RiskTier): VerificationLane {
  if (!VALID_TIERS.has(tier)) {
    throw new Error(
      `invalid risk tier "${tier}" — must be one of P0, P1, P2, P3\n` +
        `  hint: use 'bigspec gate-lane <P0|P1|P2|P3>' for details`
    );
  }
  return LANE_MAP[tier];
}

export function getLaneByString(tier: string): VerificationLane {
  return getLane(tier as RiskTier);
}

// ---------------------------------------------------------------------------
// Full gate check
// ---------------------------------------------------------------------------

export function gateCheck(path: string): GateReport {
  const ledger = parseTasks(path);
  const results = evaluateGates(ledger);
  const passed = results.every((g) => g.status === "PASSING");

  return {
    file: path,
    risk_tier: ledger.risk_tier,
    gates: results,
    passed,
  };
}

// ---------------------------------------------------------------------------
// Format report as string
// ---------------------------------------------------------------------------

export function formatReport(report: GateReport): string {
  const lines: string[] = [];
  lines.push(`Gate Report — ${report.file}`);
  lines.push(`  Risk tier: ${report.risk_tier}`);
  lines.push(`  Overall:   ${report.passed ? "PASS ✓" : "FAIL ✗"}`);
  lines.push("");

  for (const g of report.gates) {
    const icon =
      g.status === "PASSING"
        ? "✓"
        : g.status === "FAILING"
          ? "✗"
          : g.status === "BLOCKED"
            ? "⊘"
            : "○";
    lines.push(`  [${icon}] ${g.gate_type}: ${g.status}`);
    lines.push(`         ${g.detail}`);
  }

  return lines.join("\n");
}
