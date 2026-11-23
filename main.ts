// u-daring-gecko-25-one-line-roast-the-gadget-you-use-3d6aa610 — entry program.
//
// Writes one original roast line (95 characters) to /output/entry.txt:
// a smartwatch that celebrates standing up as if sitting were the hard
// part of the day. Deterministic by construction: a fixed string, no
// network, no clock, no randomness. Running it twice writes identical bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My smartwatch throws a party every time I stand up, as if sitting were the hard part of my day.";

// The grader sets MAKEFUN_OUTPUT_DIR; local runs fall back to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.txt");

// Gate: UTF-8 text, 1-200 characters, not only whitespace, and a single
// line (the judge compares one-liners; a stray newline would break the
// entry's shape even if the character count still passed).
const MAX_CHARS = 200;
const chars = [...LINE].length;
if (chars < 1 || chars > MAX_CHARS || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`entry line fails the gate: ${chars} characters`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(target, LINE, "utf8");

// Read back what was written so a truncated write can never pass silently.
const written = readFileSync(target, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt mismatch: output differs from the roast line");
}

console.log(`entry.txt: ${chars} characters -> ${target}`);
