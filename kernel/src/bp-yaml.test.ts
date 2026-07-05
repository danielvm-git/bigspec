import { describe, it, expect } from "vitest";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { bpGet, bpSet } from "./bp-yaml";

// Helper: create a temp directory with a YAML file
function tmpYaml(content: string): { dir: string; file: string } {
  const dir = mkdtempSync(join(tmpdir(), "bp-yaml-test-"));
  const file = join(dir, "state.yaml");
  writeFileSync(file, content, "utf-8");
  return { dir, file };
}

// Helper: read a YAML file
function readYaml(path: string): string {
  return readFileSync(path, "utf-8");
}

describe("bp-yaml", () => {
  // ============================================================
  // chk-01: get returns a nested scalar
  // ============================================================
  describe("get returns a nested scalar", () => {
    it("resolves a top-level key", () => {
      const { file } = tmpYaml(`---
okf_kind: story
okf_version: "1.0"
---
current_movement: FRAME
handoff:
  next_skill: plan-work
`);
      const val = bpGet(file, "current_movement");
      expect(val).toBe("FRAME");
    });

    it("resolves a nested dotted key", () => {
      const { file } = tmpYaml(`---
okf_kind: story
okf_version: "1.0"
---
handoff:
  next_skill: plan-work
`);
      const val = bpGet(file, "handoff.next_skill");
      expect(val).toBe("plan-work");
    });

    it("resolves a deeply nested dotted key", () => {
      const { file } = tmpYaml(`---
okf_kind: story
---
a:
  b:
    c: deep-value
`);
      const val = bpGet(file, "a.b.c");
      expect(val).toBe("deep-value");
    });
  });

  // ============================================================
  // chk-02: set preserves siblings and OKF frontmatter
  // ============================================================
  describe("set preserves siblings and frontmatter", () => {
    it("preserves sibling keys after set", () => {
      const original = `---
okf_kind: story
okf_version: "1.0"
---
current_movement: FRAME
handoff:
  next_skill: plan-work
`;
      const { file } = tmpYaml(original);
      bpSet(file, "handoff.next_skill", "kickoff-branch");
      const result = readYaml(file);
      expect(result).toContain("current_movement: FRAME");
      expect(result).toContain("next_skill: kickoff-branch");
    });

    it("preserves the OKF frontmatter block unchanged", () => {
      const original = `---
okf_kind: story
okf_version: "1.0"
---
handoff:
  next_skill: plan-work
`;
      const { file } = tmpYaml(original);
      bpSet(file, "handoff.next_skill", "kickoff-branch");
      const result = readYaml(file);
      // frontmatter block must survive untouched
      expect(result).toContain("okf_kind: story");
      expect(result).toContain('okf_version: "1.0"');
      // body updated correctly
      expect(result).not.toContain("next_skill: plan-work");
      expect(result).toContain("next_skill: kickoff-branch");
    });
  });

  // ============================================================
  // chk-03: set creates intermediate maps for new dotted paths
  // ============================================================
  describe("set creates intermediate maps", () => {
    it("creates nested maps for a brand new dotted path", () => {
      const { file } = tmpYaml(`---
okf_kind: story
---
current_movement: FRAME
`);
      bpSet(file, "metrics.first_pass_gate_rate", 0.9);
      const result = readYaml(file);
      expect(result).toContain("first_pass_gate_rate");
      // read back to confirm
      const val = bpGet(file, "metrics.first_pass_gate_rate");
      expect(val).toBe(0.9);
    });

    it("creates deeply nested maps", () => {
      const { file } = tmpYaml(`---
okf_kind: story
---
top: value
`);
      bpSet(file, "a.b.c.d", "deep");
      const val = bpGet(file, "a.b.c.d");
      expect(val).toBe("deep");
    });
  });

  // ============================================================
  // chk-04: missing key errors with path + file + remediation hint
  // ============================================================
  describe("missing key errors with remediation", () => {
    it("throws on missing top-level key with remediation hint", () => {
      const { file } = tmpYaml(`---
okf_kind: story
---
current_movement: FRAME
`);
      expect(() => bpGet(file, "nope.here")).toThrow();
      try {
        bpGet(file, "nope.here");
      } catch (e: any) {
        const msg = e.message;
        expect(msg).toContain("nope.here");
        expect(msg).toContain(file);
        expect(msg).toMatch(/list|keys|valid/i); // remediation hint
      }
    });

    it("throws on missing nested key with remediation hint", () => {
      const { file } = tmpYaml(`---
okf_kind: story
---
handoff: {}
`);
      expect(() => bpGet(file, "handoff.next_skill")).toThrow();
      try {
        bpGet(file, "handoff.next_skill");
      } catch (e: any) {
        const msg = e.message;
        expect(msg).toContain("handoff.next_skill");
        expect(msg).toContain(file);
        expect(msg).toMatch(/list|keys|valid/i);
      }
    });
  });

  // ============================================================
  // chk-05: idempotent round-trip — byte-stable except target
  // ============================================================
  describe("round-trip is byte-stable", () => {
    it("re-setting an existing value produces a byte-stable file except target", () => {
      const original = `---
okf_kind: story
okf_version: "1.0"
---
current_movement: FRAME
handoff:
  next_skill: plan-work
`;
      const { file } = tmpYaml(original);
      // first set
      bpSet(file, "handoff.next_skill", "kickoff-branch");
      const afterFirst = readYaml(file);
      // second set — same value
      bpSet(file, "handoff.next_skill", "kickoff-branch");
      const afterSecond = readYaml(file);
      // byte-stable except the target field could differ slightly
      // but the semantic content must be identical
      expect(afterSecond).toBe(afterFirst);
    });
  });
});
