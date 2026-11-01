// Fails if a class string pairs orange fill with white text (2.5:1, below AA) or reaches for a blue class.
import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components"];
const problems = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(tsx?|mdx)$/.test(entry.name)) check(p);
  }
}

function check(file) {
  fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/(?:className|class)=["{`]([^"`}]*)/g)) {
      const cls = m[1];
      if (/\bbg-orange(?![-\w/])/.test(cls) && /\btext-white\b/.test(cls)) problems.push(`${file}:${i + 1} white text on orange`);
    }
    if (/\b(?:bg|text|border|ring)-blue-\d+/.test(line)) problems.push(`${file}:${i + 1} blue class`);
  });
}

roots.forEach((r) => fs.existsSync(r) && walk(r));
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("brand check passed");
