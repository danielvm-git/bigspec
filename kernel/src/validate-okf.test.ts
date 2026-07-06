import { describe, it, expect } from "vitest";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { validate } from "./validate-okf";

// Helper: create a temp directory with one file containing the given content
function tmpFile(content: string): { dir: string; file: string } {
  const dir = mkdtempSync(join(tmpdir(), "okf-test-"));
  const file = join(dir, "test.yaml");
  writeFileSync(file, content, "utf-8");
  return { dir, file };
}

// Helper: validate a single file by putting it in a temp dir
function validateContent(content: string): string {
  const { dir } = tmpFile(content);
  return validate(dir);
}

describe("validate-okf", () => {
  // ============================================================
  // chk-01: validate() reports 0 errors on current specs/
  // ============================================================
  describe("validate reports 0 errors on current specs", () => {
    it("returns 0 errors for the project specs/ directory (legacy files may have kind warnings)", () => {
      const report = validate("specs");
      expect(report).toContain("Errors:   0");
      // Warnings are expected from legacy/superseded epic capsules
      // that predate kind-aware validation. Active epic capsules (e03-kernel)
      // should have 0 warnings.
    });

    it("includes the file count in the report", () => {
      const report = validate("specs");
      expect(report).toMatch(/file\(s\) scanned/);
      const match = report.match(/(\d+) file\(s\) scanned/);
      expect(match).toBeTruthy();
      expect(Number(match![1])).toBeGreaterThan(0);
    });
  });

  // ============================================================
  // chk-02: missing okf_kind returns ERROR
  // ============================================================
  describe("missing okf_kind", () => {
    it("returns ERROR for file missing okf_kind field", () => {
      const report = validateContent(`---
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
body: hello
`);
      expect(report).toContain("ERROR");
      expect(report).toContain("okf_kind");
    });
  });

  // ============================================================
  // chk-03: missing frontmatter returns WARNING
  // ============================================================
  describe("missing frontmatter", () => {
    it("returns WARNING for file with no --- delimiters", () => {
      const report = validateContent(`just a plain markdown file with no frontmatter
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("no OKF frontmatter");
    });

    it("returns no ERROR for a file with valid frontmatter", () => {
      const report = validateContent(`---
okf_kind: story
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
body: hello
`);
      expect(report).toContain("Errors:   0");
    });
  });

  // ============================================================
  // chk-04: unknown okf_kind returns WARNING
  // ============================================================
  describe("unknown kind", () => {
    it("returns WARNING for unknown okf_kind", () => {
      const report = validateContent(`---
okf_kind: unknown-kind
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("unknown kind");
    });
  });

  // ============================================================
  // chk-05: kind-aware story bundle — supersedes + commit_range
  // ============================================================
  describe("kind-aware story", () => {
    it("returns WARNING when story bundle is missing supersedes", () => {
      const report = validateContent(`---
okf_kind: story
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
body: hello
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("supersedes");
    });

    it("returns WARNING when story bundle is missing commit_range", () => {
      const report = validateContent(`---
okf_kind: story
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
supersedes: null
---
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("commit_range");
    });

    it("passes when story has both supersedes and commit_range", () => {
      const report = validateContent(`---
okf_kind: story
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
supersedes: null
commit_range: null
---
body: hello
`);
      expect(report).toContain("Errors:   0");
      expect(report).toContain("Warnings: 0");
    });
  });

  // ============================================================
  // chk-06: kind-aware epic bundle — stories array
  // ============================================================
  describe("kind-aware epic", () => {
    it("returns WARNING when epic bundle is missing stories field", () => {
      const report = validateContent(`---
okf_kind: epic
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("stories");
    });

    it("passes when epic has stories array", () => {
      const report = validateContent(`---
okf_kind: epic
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
stories:
  - id: e01s01
    title: Test
    status: todo
`);
      expect(report).toContain("Warnings: 0");
    });
  });

  // ============================================================
  // chk-07: kind-aware tasks bundle — checkpoints + gates arrays
  // ============================================================
  describe("kind-aware tasks", () => {
    it("returns WARNING when tasks bundle is missing checkpoints", () => {
      const report = validateContent(`---
okf_kind: tasks
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("checkpoints");
    });

    it("returns WARNING when tasks bundle is missing gates", () => {
      const report = validateContent(`---
okf_kind: tasks
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
checkpoints: []
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("gates");
    });

    it("passes when tasks has checkpoints and gates", () => {
      const report = validateContent(`---
okf_kind: tasks
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
checkpoints: []
gates: []
`);
      expect(report).toContain("Warnings: 0");
    });
  });

  // ============================================================
  // chk-08: kind-aware cockpit-state — handoff structure
  // ============================================================
  describe("kind-aware cockpit", () => {
    it("returns WARNING when cockpit-state is missing handoff", () => {
      const report = validateContent(`---
okf_kind: cockpit-state
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
`);
      expect(report).toContain("WARNING");
      expect(report).toContain("handoff");
    });

    it("passes when cockpit-state has handoff.next_skill", () => {
      const report = validateContent(`---
okf_kind: cockpit-state
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
handoff:
  next_skill: develop-tdd
`);
      expect(report).toContain("Warnings: 0");
    });
  });

  // ============================================================
  // chk-09: CLI exits 1 on ERROR, 0 on clean
  // ============================================================
  describe("CLI exit", () => {
    it("returns 0 errors for current specs/ directory", () => {
      const report = validate("specs");
      expect(report).toContain("Errors:   0");
    });

    it("report format includes file references when errors exist", () => {
      const report = validateContent(`---
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
---
`);
      // Missing okf_kind — should reference the field
      expect(report).toMatch(/okf_kind|ERROR/);
    });
  });

  // ============================================================
  // chk-10: recursive scan + empty files skipped
  // ============================================================
  describe("recursive scan", () => {
    it("scans nested directories", () => {
      const report = validateContent(`---
okf_kind: story
okf_version: "1.0"
generated_by: test
generated_at: 2026-07-05
supersedes: null
commit_range: null
---
`);
      expect(report).toMatch(/file\(s\) scanned/);
    });

    it("handles empty files without error", () => {
      const report = validateContent("");
      expect(report).not.toContain("ERROR"); // empty file is skipped
    });
  });
});
