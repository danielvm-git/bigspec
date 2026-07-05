import { readFileSync, writeFileSync } from "node:fs";
import YAML from "yaml";

/**
 * Represents a YAML file with optional OKF frontmatter.
 * The frontmatter (`---\n...\n---`) is preserved verbatim.
 */
interface YAMLDocument {
  body: Record<string, any>;
  frontmatter: string | null;
  bodyStart: number; // byte offset where body YAML begins
  rawBody: string; // raw body string (after frontmatter)
  rawFrontmatter: string; // raw frontmatter text (including --- delimiters)
}

/**
 * Parse a YAML file, splitting frontmatter from body.
 */
function parseFile(path: string): YAMLDocument {
  const raw = readFileSync(path, "utf-8");

  // Split frontmatter from body
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  let frontmatter: string | null = null;
  let bodyOffset = 0;
  let rawFrontmatter = "";

  if (fmMatch) {
    frontmatter = fmMatch[1];
    rawFrontmatter = fmMatch[0];
    bodyOffset = fmMatch[0].length;
  }

  const rawBody = raw.slice(bodyOffset);

  // Parse body YAML
  const doc = YAML.parseDocument(rawBody);
  const body = doc.toJSON() ?? {};

  return { body, frontmatter, bodyStart: bodyOffset, rawBody, rawFrontmatter };
}

/**
 * Serialize a YAMLDocument back to a string, preserving frontmatter.
 */
function serializeFile(doc: YAMLDocument): string {
  const yamlDoc = YAML.parseDocument(doc.rawBody);

  // Set the value at the dotted path, creating intermediate maps as needed
  // This is done before serialization in bpSet

  const bodyStr = yamlDoc.toString({ lineWidth: 0 });
  if (doc.frontmatter !== null) {
    return `---\n${doc.frontmatter}\n---\n${bodyStr}`;
  }
  return bodyStr;
}

/**
 * Write a value into the parsed body dict and return the serialized result.
 * This creates intermediate maps as needed and preserves other keys.
 */
function setNestedValue(body: Record<string, any>, path: string[], value: any): void {
  let current: Record<string, any> = body;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!(key in current) || typeof current[key] !== "object" || current[key] === null) {
      current[key] = {};
    }
    current = current[key] as Record<string, any>;
  }
  current[path[path.length - 1]] = value;
}

/**
 * Resolve a dotted path in a parsed YAML body.
 * Throws if the key doesn't exist, with a remediation hint.
 */
function getNestedValue(body: Record<string, any>, path: string[], file: string, fullPath: string): any {
  let current: any = body;
  let traversed: string[] = [];
  for (const key of path) {
    traversed.push(key);
    if (current === null || current === undefined || typeof current !== "object" || !(key in current)) {
      const listCmd = traversed.length > 1
        ? `bp-yaml get ${file} ${traversed.slice(0, -1).join(".")}`
        : `bp-yaml get ${file}`;
      throw new Error(
        `key not found: "${fullPath}" in ${file}\n` +
        `  hint: run '${listCmd}' to list valid keys at this level`
      );
    }
    current = current[key];
  }
  return current;
}

/**
 * Get a value at a dotted path from a YAML file.
 * Returns the resolved value (scalar or subtree).
 * Throws if the key doesn't exist.
 */
export function bpGet(file: string, dottedPath: string): any {
  const parsed = parseFile(file);
  const path = dottedPath.split(".");
  return getNestedValue(parsed.body, path, file, dottedPath);
}

/**
 * Set a value at a dotted path in a YAML file.
 * Creates intermediate maps as needed.
 * Preserves all other keys and OKF frontmatter.
 */
export function bpSet(file: string, dottedPath: string, value: any): void {
  const raw = readFileSync(file, "utf-8");
  const path = dottedPath.split(".");

  // Use YAML Document to preserve formatting
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  let frontmatter = "";
  let bodyOffset = 0;

  if (fmMatch) {
    frontmatter = fmMatch[0];
    bodyOffset = fmMatch[0].length;
  }

  const rawBody = raw.slice(bodyOffset);
  const doc = YAML.parseDocument(rawBody);

  // Navigate into nested maps, creating as needed
  let current: any = doc;
  for (let i = 0; i < path.length - 1; i++) {
    const key = path[i];
    if (!current.has(key) || !current.get(key) || !(current.get(key) instanceof YAML.YAMLMap)) {
      current.set(key, new YAML.YAMLMap());
    }
    current = current.get(key);
  }

  // Set the final value — preserve type
  current.set(path[path.length - 1], value);

  // Serialize back, preserving frontmatter
  const bodyStr = doc.toString({ lineWidth: 0 });
  const result = frontmatter ? `${frontmatter}${bodyStr}` : bodyStr;

  writeFileSync(file, result, "utf-8");
}
