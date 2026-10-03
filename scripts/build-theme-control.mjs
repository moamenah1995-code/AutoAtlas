#!/usr/bin/env node
/** Ensure every published page loads the independent day/night theme control. */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const tag = '<script src="theme.js"></script>';
let updated = 0;

for (const filename of readdirSync(ROOT).filter((name) => name.endsWith(".html"))) {
  const path = join(ROOT, filename);
  const html = readFileSync(path, "utf8");
  if (!/<header\b[^>]*class=["'][^"']*\bsite-header\b/i.test(html) || html.includes(tag)) continue;
  if (!/<\/head>/i.test(html)) throw new Error(`${filename}: cannot find </head>`);
  writeFileSync(path, html.replace(/<\/head>/i, `${tag}\n</head>`), "utf8");
  updated += 1;
}

console.log(`[build-theme-control] Added the standalone theme controller to ${updated} pages.`);
