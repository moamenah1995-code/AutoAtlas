#!/usr/bin/env node
/**
 * AutoAtlas article pipeline.
 *
 * Source of truth: articles.json (one entry per article: id, title, summary, sources, date).
 * This script performs the four steps described in the project's article-automation workflow:
 *   1. Sync the authored articles.json into script.js's runtime `articles` array
 *      (between the AUTO-GENERATED:ARTICLES markers), which every locale page renders from.
 *   2. Update <lastmod> for the four articles*.html entries in sitemap.xml.
 *   3. Rebuild search-index.json, a derived, locale-neutral search artifact.
 *   4. Generate rss.xml (RSS 2.0) for the articles feed.
 *
 * No npm dependencies are used; this keeps the static site dependency-free per repo conventions.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_BASE_URL = "https://moamenah1995-code.github.io/AutoAtlas/";

const ARTICLES_JSON = join(ROOT, "articles.json");
const SCRIPT_JS = join(ROOT, "script.js");
const SITEMAP_XML = join(ROOT, "sitemap.xml");
const SEARCH_INDEX_JSON = join(ROOT, "search-index.json");
const RSS_XML = join(ROOT, "rss.xml");

const ARTICLES_PAGES = [
  "articles.html",
  "articles-en.html",
  "articles-pt.html",
  "articles-fr.html",
];

function loadArticles() {
  const raw = readFileSync(ARTICLES_JSON, "utf8");
  const articles = JSON.parse(raw);
  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error("articles.json must contain a non-empty array of articles.");
  }
  articles.forEach((article, index) => {
    const label = `articles.json[${index}]`;
    if (!article.id || typeof article.id !== "string") throw new Error(`${label}: missing "id"`);
    if (!article.title || typeof article.title !== "string") throw new Error(`${label}: missing "title"`);
    if (!article.summary || typeof article.summary !== "string") throw new Error(`${label}: missing "summary"`);
    if (!article.date || !/^\d{4}-\d{2}-\d{2}$/.test(article.date)) {
      throw new Error(`${label}: missing or invalid "date" (expected YYYY-MM-DD)`);
    }
    if (article.sources && !Array.isArray(article.sources)) {
      throw new Error(`${label}: "sources" must be an array when present`);
    }
  });
  const ids = new Set();
  for (const article of articles) {
    if (ids.has(article.id)) throw new Error(`Duplicate article id: ${article.id}`);
    ids.add(article.id);
  }
  return articles;
}

function escapeJsString(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');
}

function renderArticlesArray(articles) {
  const lines = articles.map((article) => {
    const sources = (article.sources || []).map((s) => `"${escapeJsString(s)}"`).join(", ");
    return `  { title: "${escapeJsString(article.title)}", summary: "${escapeJsString(article.summary)}", sources: [${sources}] },`;
  });
  // Drop the trailing comma on the last entry to match the existing code style.
  if (lines.length) lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
  return `const articles = [\n${lines.join("\n")}\n];`;
}

function syncScriptJs(articles) {
  const startMarker = "// AUTO-GENERATED:ARTICLES:START";
  const endMarker = "// AUTO-GENERATED:ARTICLES:END";
  const content = readFileSync(SCRIPT_JS, "utf8");
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error("Could not find AUTO-GENERATED:ARTICLES markers in script.js");
  }
  const before = content.slice(0, startIdx + startMarker.length);
  const after = content.slice(endIdx);
  const updated = `${before}\n${renderArticlesArray(articles)}\n${after}`;
  if (updated !== content) {
    writeFileSync(SCRIPT_JS, updated, "utf8");
    console.log("[build-articles] script.js articles array synced.");
  } else {
    console.log("[build-articles] script.js articles array already up to date.");
  }
}

function updateSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  let xml = readFileSync(SITEMAP_XML, "utf8");
  let changed = false;

  for (const page of ARTICLES_PAGES) {
    const loc = `${SITE_BASE_URL}${page}`;
    const urlBlockRegex = new RegExp(
      `(<url>\\s*<loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}</loc>)([\\s\\S]*?)(</url>)`
    );
    const match = xml.match(urlBlockRegex);
    if (!match) {
      console.warn(`[build-articles] sitemap.xml: no <url> entry found for ${loc}`);
      continue;
    }
    const [full, head, middle, tail] = match;
    let newMiddle = middle;
    if (/<lastmod>.*<\/lastmod>/.test(middle)) {
      newMiddle = middle.replace(/<lastmod>.*<\/lastmod>/, `<lastmod>${today}</lastmod>`);
    } else {
      newMiddle = `\n    <lastmod>${today}</lastmod>${middle}`;
    }
    const replacement = `${head}${newMiddle}${tail}`;
    if (replacement !== full) {
      xml = xml.replace(full, replacement);
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(SITEMAP_XML, xml, "utf8");
    console.log("[build-articles] sitemap.xml lastmod entries updated.");
  } else {
    console.log("[build-articles] sitemap.xml already up to date.");
  }
}

function buildSearchIndex(articles) {
  const index = articles.map((article) => ({
    id: article.id,
    title: article.title,
    summary: article.summary,
    sources: article.sources || [],
    date: article.date,
    url: `articles.html#${article.id}`,
    searchText: [article.title, article.summary, ...(article.sources || [])]
      .join(" ")
      .toLowerCase(),
  }));
  writeFileSync(SEARCH_INDEX_JSON, JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`[build-articles] search-index.json rebuilt (${index.length} entries).`);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRss(articles) {
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  const now = new Date().toUTCString();
  const items = sorted
    .map((article) => {
      const link = `${SITE_BASE_URL}articles.html#${article.id}`;
      const pubDate = new Date(`${article.date}T00:00:00Z`).toUTCString();
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(article.id)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(article.summary)}</description>
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AutoAtlas Articles</title>
    <link>${SITE_BASE_URL}articles.html</link>
    <description>Automotive articles and source-led analysis from AutoAtlas.</description>
    <language>ar</language>
    <atom:link href="${SITE_BASE_URL}rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  writeFileSync(RSS_XML, rss, "utf8");
  console.log(`[build-articles] rss.xml generated (${sorted.length} items).`);
}

function main() {
  const articles = loadArticles();
  syncScriptJs(articles);
  updateSitemap();
  buildSearchIndex(articles);
  buildRss(articles);
  console.log(`[build-articles] Done. ${articles.length} articles processed.`);
}

main();
