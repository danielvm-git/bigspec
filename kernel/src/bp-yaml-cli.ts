#!/usr/bin/env node
import { bpGet, bpSet } from "./bp-yaml.js";

const args = process.argv.slice(2);

function usage(): never {
  console.error("Usage: bp-yaml <get|set> <file> <dotted.key.path> [value]");
  process.exit(2);
}

if (args.length < 3) {
  usage();
}

const [command, file, path, ...valueParts] = args;
const value = valueParts.join(" ");

try {
  if (command === "get") {
    const result = bpGet(file, path);
    if (typeof result === "object" && result !== null) {
      // Print objects as YAML-like output for readability
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(String(result));
    }
    process.exit(0);
  } else if (command === "set") {
    if (valueParts.length === 0) {
      console.error("Error: 'set' requires a value argument");
      process.exit(2);
    }
    // Try to parse as number/boolean, fall back to string
    let parsedValue: any = value;
    if (value === "true") parsedValue = true;
    else if (value === "false") parsedValue = false;
    else if (value === "null") parsedValue = null;
    else if (/^-?\d+(\.\d+)?$/.test(value)) parsedValue = Number(value);

    bpSet(file, path, parsedValue);
    process.exit(0);
  } else {
    console.error(`Error: unknown command "${command}". Use "get" or "set".`);
    process.exit(2);
  }
} catch (e: any) {
  console.error(e.message);
  process.exit(1);
}
