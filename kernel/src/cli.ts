#!/usr/bin/env node
/**
 * bigspec CLI — the main entry point for the kernel.
 *
 * Subcommands:
 *   bigspec state          — read active state from specs/cockpit/state.yaml
 *   bigspec validate-okf   — run the OKF envelope validator over specs/
 *
 * Architecture: constitution §2 cockpit, architecture §4 kernel.
 */

import { bpGet } from "./bp-yaml.js";
import { gateCheck, formatReport, getLaneByString } from "./gate-engine.js";

const args = process.argv.slice(2);

function usage(out: NodeJS.WritableStream): void {
  const msg = [
    "bigspec — spec-driven agentic methodology (kernel)",
    "",
    "Usage: bigspec <command> [options]",
    "",
    "Commands:",
    "  state                      Show cockpit state (active epic, story, movement, handoff)",
    "  validate-okf               Validate OKF bundles under specs/ (envelope + kind structure)",
    "  gate-check <tasks-file>    Evaluate all gates for a story (risk tier + quality + completeness)",
    "  gate-lane <P0|P1|P2|P3>    Show the verification lane and steps for a risk tier",
    "  help                       Show this help",
    "",
    "The cockpit lives at specs/cockpit/state.yaml; use bp-yaml for get/set operations.",
  ].join("\n");
  out.write(msg + "\n");
}

function showState(): void {
  const cockpit = "specs/cockpit/state.yaml";
  try {
    const epic = bpGet(cockpit, "active_epic");
    const story = bpGet(cockpit, "active_story");
    const movement = bpGet(cockpit, "current_movement");
    const nextSkill = bpGet(cockpit, "handoff.next_skill");
    const reason = bpGet(cockpit, "handoff.reason");

    console.log(`active_epic:      ${epic}`);
    console.log(`active_story:     ${story}`);
    console.log(`current_movement: ${movement}`);
    console.log(`next_skill:       ${nextSkill}`);
    if (reason) console.log(`handoff.reason:   ${reason}`);
  } catch (e: any) {
    console.error(`Error reading cockpit: ${e.message}`);
    process.exit(1);
  }
}

async function runValidate(): Promise<void> {
  // Dynamically import validate-okf to avoid loading YAML unless needed
  const { validate } = await import("./validate-okf.js");
  const report = validate();
  console.log(report);
  if (report.includes("ERROR")) {
    process.exit(1);
  }
}

(async () => {
  if (args.length === 0) {
    usage(process.stderr);
    process.exit(1);
  }

  const command = args[0];

  switch (command) {
    case "state":
      showState();
      break;
    case "validate-okf":
      await runValidate();
      break;
    case "gate-check": {
      const tasksFile = args[1];
      if (!tasksFile) {
        console.error("Error: gate-check requires a tasks file path");
        usage(process.stderr);
        process.exit(2);
      }
      try {
        const report = gateCheck(tasksFile);
        console.log(formatReport(report));
        process.exit(report.passed ? 0 : 1);
      } catch (e: any) {
        console.error(`Error: ${e.message}`);
        process.exit(1);
      }
      break;
    }
    case "gate-lane": {
      const tier = args[1];
      if (!tier) {
        console.error("Error: gate-lane requires a tier (P0, P1, P2, P3)");
        usage(process.stderr);
        process.exit(2);
      }
      try {
        const lane = getLaneByString(tier);
        console.log(`[${lane.tier}] lane: ${lane.lane} — ${lane.label}`);
        console.log(`steps: ${lane.steps.join(", ")}`);
        process.exit(0);
      } catch (e: any) {
        console.error(`Error: ${e.message}`);
        process.exit(1);
      }
      break;
    }
    case "help":
    case "--help":
    case "-h":
      usage(process.stdout);
      break;
    default:
      console.error(`Error: unknown command "${command}"`);
      usage(process.stderr);
      process.exit(1);
  }
})();
