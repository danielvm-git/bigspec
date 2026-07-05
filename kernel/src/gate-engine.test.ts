import { describe, it, expect } from "vitest";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  parseTasks,
  evaluateCheckpoint,
  evaluateGates,
  getLane,
  gateCheck,
  formatReport,
  type Checkpoint,
  type TasksLedger,
} from "./gate-engine";

// Helper: create a temp directory with a tasks YAML file
function tmpTasks(content: string): { dir: string; file: string } {
  const dir = mkdtempSync(join(tmpdir(), "gate-test-"));
  const file = join(dir, "tasks.yaml");
  writeFileSync(file, content, "utf-8");
  return { dir, file };
}

describe("parseTasks", () => {
  it("parses a valid tasks OKF bundle", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
okf_version: "1.0"
---
story: e03s01
risk_tier: P1
verify_suite: "npm test"
checkpoints:
  - id: chk-01
    intent: "get returns a nested scalar"
    verify_cmd: "npm test -- -t 'get'"
    status: PASSING
  - id: chk-02
    intent: "set preserves siblings"
    verify_cmd: "npm test -- -t 'set'"
    status: PASSING
gates:
  - type: Risk
    blocks_until: "risk_tier assigned"
    state: PASSING
  - type: Quality
    blocks_until: "all checkpoints PASSING"
    state: PENDING
`);
    const ledger = parseTasks(file);
    expect(ledger.story).toBe("e03s01");
    expect(ledger.risk_tier).toBe("P1");
    expect(ledger.checkpoints).toHaveLength(2);
    expect(ledger.gates).toHaveLength(2);
  });

  it("throws on missing risk_tier", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
---
story: e03s01
checkpoints: []
gates: []
`);
    expect(() => parseTasks(file)).toThrow();
    try {
      parseTasks(file);
    } catch (e: any) {
      expect(e.message).toContain("risk_tier");
      expect(e.message).toContain(file);
    }
  });

  it("throws on invalid risk_tier", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
---
story: e03s01
risk_tier: P5
checkpoints: []
gates: []
`);
    expect(() => parseTasks(file)).toThrow(/P0|P1|P2|P3/);
  });

  it("throws on non-array checkpoints", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
---
story: e03s01
risk_tier: P1
checkpoints: "not-an-array"
gates: []
`);
    expect(() => parseTasks(file)).toThrow(/checkpoint.*array/i);
  });

  it("throws on non-existent file", () => {
    expect(() => parseTasks("/nonexistent/path.yaml")).toThrow();
  });
});

describe("evaluateCheckpoint", () => {
  it("reports passed=true for exit 0 command", () => {
    const cp: Checkpoint = {
      id: "chk-trivial",
      intent: "echo test",
      verify_cmd: "echo hello",
      status: "PASSING",
    };
    const result = evaluateCheckpoint(cp);
    expect(result.passed).toBe(true);
    expect(result.stdout).toBe("hello");
  });

  it("reports passed=false for non-zero exit", () => {
    const cp: Checkpoint = {
      id: "chk-fail",
      intent: "exit 1",
      verify_cmd: "exit 1",
      status: "FAILING",
    };
    const result = evaluateCheckpoint(cp);
    expect(result.passed).toBe(false);
  });

  it("captures stderr on failure", () => {
    const cp: Checkpoint = {
      id: "chk-stderr",
      intent: "write to stderr",
      verify_cmd: "echo err >&2 && exit 1",
      status: "FAILING",
    };
    const result = evaluateCheckpoint(cp);
    expect(result.passed).toBe(false);
    expect(result.stderr).toBeTruthy();
  });
});

describe("evaluateGates", () => {
  const passingLedger: TasksLedger = {
    story: "e03s01",
    risk_tier: "P1",
    verify_suite: "npm test",
    checkpoints: [
      { id: "chk-01", intent: "test", verify_cmd: "", status: "PASSING" },
      { id: "chk-02", intent: "test", verify_cmd: "", status: "PASSING" },
    ],
    gates: [
      { type: "Risk", blocks_until: "risk_tier assigned", state: "PASSING" },
      { type: "Quality", blocks_until: "all checkpoints PASSING", state: "PASSING" },
    ],
  };

  it("returns PASSING for a clean ledger", () => {
    const results = evaluateGates(passingLedger);
    expect(results).toHaveLength(2);
    expect(results[0].status).toBe("PASSING");
    expect(results[1].status).toBe("PASSING");
  });

  it("returns FAILING for Quality gate when a checkpoint FAILING", () => {
    const ledger: TasksLedger = {
      ...passingLedger,
      checkpoints: [
        { id: "chk-01", intent: "test", verify_cmd: "", status: "FAILING" },
      ],
    };
    const results = evaluateGates(ledger);
    const qualityGate = results.find((g) => g.gate_type === "Quality")!;
    expect(qualityGate.status).toBe("FAILING");
    expect(qualityGate.detail).toContain("chk-01");
  });

  it("returns PENDING for Quality gate when checkpoints still PENDING", () => {
    const ledger: TasksLedger = {
      ...passingLedger,
      checkpoints: [
        { id: "chk-01", intent: "test", verify_cmd: "", status: "PASSING" },
        { id: "chk-02", intent: "test", verify_cmd: "", status: "PENDING" },
      ],
    };
    const results = evaluateGates(ledger);
    const qualityGate = results.find((g) => g.gate_type === "Quality")!;
    expect(qualityGate.status).toBe("PENDING");
  });

  it("reports Risk gate PASSING for P0-P3 tiers", () => {
    for (const tier of ["P0", "P1", "P2", "P3"] as const) {
      const ledger: TasksLedger = { ...passingLedger, risk_tier: tier };
      const results = evaluateGates(ledger);
      const riskGate = results.find((g) => g.gate_type === "Risk")!;
      expect(riskGate.status).toBe("PASSING");
    }
  });
});

describe("getLane", () => {
  it("returns full lane for P0", () => {
    const lane = getLane("P0");
    expect(lane.lane).toBe("full");
    expect(lane.steps).toContain("security-scan");
  });

  it("returns full lane for P1", () => {
    const lane = getLane("P1");
    expect(lane.lane).toBe("full");
    expect(lane.steps).toContain("build");
    expect(lane.steps).toContain("test");
    expect(lane.steps).toContain("lint");
    expect(lane.steps).toContain("review");
  });

  it("returns full-light lane for P2", () => {
    const lane = getLane("P2");
    expect(lane.lane).toBe("full-light");
    expect(lane.steps).toContain("smoke");
  });

  it("returns fast lane for P3", () => {
    const lane = getLane("P3");
    expect(lane.lane).toBe("fast");
    expect(lane.steps).toContain("quick-fix");
  });

  it("throws on invalid tier", () => {
    expect(() => getLane("P5" as any)).toThrow();
  });
});

describe("gateCheck", () => {
  it("returns passed=true for a passing tasks file", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
okf_version: "1.0"
---
story: e03s01
risk_tier: P1
verify_suite: "npm test"
checkpoints:
  - id: chk-01
    intent: "get returns a nested scalar"
    verify_cmd: "echo ok"
    status: PASSING
gates:
  - type: Risk
    blocks_until: "risk_tier assigned"
    state: PASSING
  - type: Quality
    blocks_until: "all checkpoints PASSING"
    state: PASSING
`);
    const report = gateCheck(file);
    expect(report.passed).toBe(true);
    expect(report.risk_tier).toBe("P1");
  });

  it("returns passed=false when Quality gate FAILING", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
---
story: e03s01
risk_tier: P2
verify_suite: ""
checkpoints:
  - id: chk-01
    intent: "failing checkpoint"
    verify_cmd: "exit 1"
    status: FAILING
gates:
  - type: Risk
    blocks_until: ""
    state: PASSING
  - type: Quality
    blocks_until: ""
    state: FAILING
`);
    const report = gateCheck(file);
    expect(report.passed).toBe(false);
    const qualityGate = report.gates.find((g) => g.gate_type === "Quality")!;
    expect(qualityGate.status).toBe("FAILING");
  });

  it("returns passed=false when gate is PENDING", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
---
story: e03s01
risk_tier: P1
verify_suite: ""
checkpoints: []
gates:
  - type: Risk
    blocks_until: ""
    state: PASSING
  - type: Completeness
    blocks_until: "gap-critic finds no BLOCKER"
    state: PENDING
`);
    const report = gateCheck(file);
    expect(report.passed).toBe(false);
  });
});

describe("formatReport", () => {
  it("renders a human-readable report", () => {
    const { file } = tmpTasks(`---
okf_kind: tasks
---
story: e03s01
risk_tier: P1
verify_suite: ""
checkpoints:
  - id: chk-01
    intent: "test"
    verify_cmd: "echo ok"
    status: PASSING
gates:
  - type: Risk
    blocks_until: ""
    state: PASSING
  - type: Quality
    blocks_until: ""
    state: PASSING
`);
    const report = gateCheck(file);
    const formatted = formatReport(report);
    expect(formatted).toContain("Gate Report");
    expect(formatted).toContain("PASS");
    expect(formatted).toContain("Risk");
    expect(formatted).toContain("Quality");
  });
});
