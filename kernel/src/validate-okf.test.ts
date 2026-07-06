import { describe, it, expect } from "vitest";
import { readFileSync, writeFileSync, mkdtempSync, mkdirSync } from "node:fs";
import { join } from "node:os";
import { tmpdir } from "node:os";
import { validate } from "./validate-okf";

describe("validate-okf", () => {
  // ============================================================
  // chk-01: validate() reports 0 errors on current specs/
  // ============================================================
  describe("validate reports 0 errors on current specs", () => {
    it("returns 0 errors and 0 warnings for the project specs/ directory", () => {
      const report = validate("specs");
      expect(report).toContain("Errors:   0");
      expect(report).toContain("Warnings: 0");
    });

    it("includes the file count in the report", () => {
      const report = validate("specs");
      expect(report).toMatch(/file\(s\) scanned/);
      const match = report.match(/(\d+) file\(s\) scanned/);
      expect(match).toBeTruthy();
      expect(Number(match![1])).toBeGreaterThan(0);
    });
  });
});
