#!/usr/bin/env node
/**
 * AutoAtlas car catalog pipeline.
 *
 * Source of truth: cars.json (one entry per researched vehicle: id, brand, model,
 * origin, body, powertrain, drive, officialUrl, image, availability).
 * This script syncs cars.json into script.js's runtime `researchModelCatalog` and
 * `marketResearchStatus` structures (between the AUTO-GENERATED:CARS markers), which
 * the models/compare research pages (models.html and its locale variants) render from.
 *
 * No npm dependencies are used; this keeps the static site dependency-free per repo
 * conventions.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const CARS_JSON = join(ROOT, "cars.json");
const SCRIPT_JS = join(ROOT, "script.js");

const REQUIRED_STRING_FIELDS = [
  "id",
  "brand",
  "model",
  "origin",
  "body",
  "powertrain",
  "drive",
  "officialUrl",
  "image",
];
const AVAILABILITY_REGIONS = ["us", "jordan", "gulf", "europe"];

function loadCars() {
  const raw = readFileSync(CARS_JSON, "utf8");
  const cars = JSON.parse(raw);
  if (!Array.isArray(cars) || cars.length === 0) {
    throw new Error("cars.json must contain a non-empty array of cars.");
  }
  cars.forEach((car, index) => {
    const label = `cars.json[${index}]`;
    for (const field of REQUIRED_STRING_FIELDS) {
      if (!car[field] || typeof car[field] !== "string") {
        throw new Error(`${label}: missing "${field}"`);
      }
    }
    if (!car.availability || typeof car.availability !== "object") {
      throw new Error(`${label}: missing "availability"`);
    }
    for (const region of AVAILABILITY_REGIONS) {
      if (!car.availability[region] || typeof car.availability[region] !== "string") {
        throw new Error(`${label}: missing "availability.${region}"`);
      }
    }
  });
  const ids = new Set();
  for (const car of cars) {
    if (ids.has(car.id)) throw new Error(`Duplicate car id: ${car.id}`);
    ids.add(car.id);
  }
  return cars;
}

function escapeJsString(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function renderCarsBlock(cars) {
  const catalogLines = cars.map((car) => {
    const tuple = [car.brand, car.model, car.origin, car.body, car.powertrain, car.drive, car.officialUrl, car.image]
      .map((value) => `"${escapeJsString(value)}"`)
      .join(", ");
    return `  [${tuple}],`;
  });
  catalogLines[catalogLines.length - 1] = catalogLines[catalogLines.length - 1].replace(/,$/, "");

  const statusLines = cars.map((car) => {
    const key = `${car.brand} ${car.model}`;
    const regions = AVAILABILITY_REGIONS.map(
      (region) => `${region}: "${escapeJsString(car.availability[region])}"`
    ).join(", ");
    return `  "${escapeJsString(key)}": { ${regions} },`;
  });
  statusLines[statusLines.length - 1] = statusLines[statusLines.length - 1].replace(/,$/, "");

  return `const researchModelCatalog = [
${catalogLines.join("\n")}
].map(([brand, model, origin, body, powertrain, drive, officialUrl, image]) => ({
  brand,
  model,
  origin,
  body,
  powertrain,
  drive,
  officialUrl,
  image,
  imageSourceUrl: image
}));

const marketResearchStatus = {
${statusLines.join("\n")}
};`;
}

function syncScriptJs(cars) {
  const startMarker = "// AUTO-GENERATED:CARS:START";
  const endMarker = "// AUTO-GENERATED:CARS:END";
  const content = readFileSync(SCRIPT_JS, "utf8");
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error("Could not find AUTO-GENERATED:CARS markers in script.js");
  }
  const preamble = "// Do not edit by hand. Edit cars.json and run `node scripts/build-cars.mjs`.";
  const before = content.slice(0, startIdx + startMarker.length);
  const after = content.slice(endIdx);
  const updated = `${before}\n${preamble}\n${renderCarsBlock(cars)}\n${after}`;
  if (updated !== content) {
    writeFileSync(SCRIPT_JS, updated, "utf8");
    console.log("[build-cars] script.js car catalog synced.");
  } else {
    console.log("[build-cars] script.js car catalog already up to date.");
  }
}

function main() {
  const cars = loadCars();
  syncScriptJs(cars);
  console.log(`[build-cars] Done. ${cars.length} cars processed.`);
}

main();
