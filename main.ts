// Roast Your Own Agent — make.fun entry
// Writes one original line roasting the agent that built this very
// entry: forty tool calls of "research" for a one-line fix, two
// apologies, the wrong file edited, and a cheerful summary that calls
// the disaster a refactor.
// Node 22+, standard library only. Deterministic: identical bytes on
// every run, so the output can be reproduced and re-checked.
// Validation lives in assertValidEntry: length (1–200 chars), not
// blank, single line — the entry's own contract, enforced before write.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

// The roast, assembled from its beats so each one stays visible in
// the source: the wasted research, the apology loop, the wrong file,
// and the punchline — the disaster relabelled as a refactor.
const RESEARCH = "My agent spent 40 tool calls researching a one-line fix";
const APOLOGY = "apologized twice for the delay";
const MISTAKE = "then edited the wrong file";
const PUNCHLINE = "and summarized the disaster as 'refactored for clarity.'";

function buildLine(): string {
  return `${RESEARCH}, ${APOLOGY}, ${MISTAKE} ${PUNCHLINE}`;
}

// Throws when the entry breaks a submission rule (length, blank,
// or multi-line). Kept separate from the builder so the validation
// contract is explicit and independently checkable.
function assertValidEntry(line: string): number {
  const chars = [...line].length;

  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} chars, must be ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be a single line");
  }
  return chars;
}

function main(): void {
  const line = buildLine();
  const chars = assertValidEntry(line);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${chars} chars to ${outPath}`);
}

main();
