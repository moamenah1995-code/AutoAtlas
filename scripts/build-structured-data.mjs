#!/usr/bin/env node
/**
 * Generate the site's JSON-LD from page metadata and catalog source data.
 * Run after build-articles.mjs and build-cars.mjs so ItemLists stay in sync.
 * Generated blocks are delimited by AUTO-GENERATED:SCHEMA markers.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_ROOT = "https://moamenah1995-code.github.io/AutoAtlas/";
const SITEMAP_PATH = join(ROOT, "sitemap.xml");
const ARTICLES_PATH = join(ROOT, "articles.json");
const CARS_PATH = join(ROOT, "cars.json");
const AUTHORS_PATH = join(ROOT, "authors.json");
const START = "<!-- AUTO-GENERATED:SCHEMA:START -->";
const END = "<!-- AUTO-GENERATED:SCHEMA:END -->";
const LOCALE_MAP = { ar: "ar_AR", en: "en_US", fr: "fr_FR", pt: "pt_BR" };

const BRAND_NAMES = {
  ar: ["تويوتا", "مرسيدس", "بي إم دبليو", "فورد", "هيونداي", "كيا", "هوندا", "نيسان", "أودي", "فولكسفاغن", "بي واي دي", "تسلا"],
  en: ["Toyota", "Mercedes-Benz", "BMW", "Ford", "Hyundai", "Kia", "Honda", "Nissan", "Audi", "Volkswagen", "BYD", "Tesla"],
  fr: ["Toyota", "Mercedes-Benz", "BMW", "Ford", "Hyundai", "Kia", "Honda", "Nissan", "Audi", "Volkswagen", "BYD", "Tesla"],
  pt: ["Toyota", "Mercedes-Benz", "BMW", "Ford", "Hyundai", "Kia", "Honda", "Nissan", "Audi", "Volkswagen", "BYD", "Tesla"],
};

const ORG_ID = `${SITE_ROOT}#organization`;
const WEBSITE_ID = `${SITE_ROOT}#website`;
const AUTHOR_DATA = normalizeLegacyTree(JSON.parse(readFileSync(AUTHORS_PATH, "utf8")));
const AUTHOR_ID = AUTHOR_DATA.personId;
const ORGANIZATION = {
  "@id": ORG_ID,
  "@type": "Organization",
  name: "AutoAtlas",
  url: SITE_ROOT,
  founder: { "@id": AUTHOR_ID },
  email: "moolimat@gmail.com",
  telephone: "+962770795947",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Amman",
    addressCountry: "JO",
  },
};

function normalizeLegacy(value) {
  if (typeof value !== "string" || !/[ØÙÃÂ]/.test(value)) return value;
  const cp1252 = new Map([["€",0x80],["‚",0x82],["ƒ",0x83],["„",0x84],["…",0x85],["†",0x86],["‡",0x87],["ˆ",0x88],["‰",0x89],["Š",0x8a],["‹",0x8b],["Œ",0x8c],["Ž",0x8e],["‘",0x91],["’",0x92],["“",0x93],["”",0x94],["•",0x95],["–",0x96],["—",0x97],["˜",0x98],["™",0x99],["š",0x9a],["›",0x9b],["œ",0x9c],["ž",0x9e],["Ÿ",0x9f]]);
  return new TextDecoder().decode(Uint8Array.from([...value].map((char) => cp1252.get(char) ?? (char.charCodeAt(0) & 0xff))));
}
function normalizeLegacyTree(value) {
  if (typeof value === "string") return normalizeLegacy(value);
  if (Array.isArray(value)) return value.map(normalizeLegacyTree);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeLegacyTree(item)]));
  return value;
}
const WEBSITE = {
  "@id": WEBSITE_ID,
  "@type": "WebSite",
  name: "AutoAtlas",
  url: SITE_ROOT,
  inLanguage: ["ar", "en", "fr", "pt"],
  publisher: { "@id": ORG_ID },
};

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanText(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim());
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function findMeta(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = html.match(new RegExp(`<meta\\s+name=["']${escaped}["']\\s+content="([^"]*)"`, "i"));
  return match ? decodeHtml(match[1]) : "";
}

function findCanonical(html) {
  const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  return match ? decodeHtml(match[1]) : "";
}

function findPageTitle(html) {
  return cleanText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
}

function findH1(html) {
  return cleanText(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
}

function pageKind(filename) {
  if (/^author(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "author";
  if (/^(index|en|fr|pt)\.html$/.test(filename)) return "home";
  if (/^technology(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "technology-hub";
  if (/^technology-(?:ev|charging|renewables|future)(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "technology-article";
  if (/^articles(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "article-list";
  if (/^companies(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "company-list";
  if (/^models(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "model-list";
  if (/^compare(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "comparison";
  if (/^car-detail(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "vehicle-guide";
  if (/^(solar-ev-jordan|jordan-ev-charging-study|amman-public-transport-electrification|commercial-fleet-electrification-jordan|home-energy-storage-smart-charging)\.html$/.test(filename)) return "research-article";
  if (/^about(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "about";
  if (/^contact(?:-(?:en|fr|pt))?\.html$/.test(filename)) return "contact";
  return "webpage";
}

function personNode(lang) {
  const node = {
    "@id": AUTHOR_ID,
    "@type": "Person",
    name: AUTHOR_DATA.name,
    alternateName: AUTHOR_DATA.alternateName,
    url: `${SITE_ROOT}author.html`,
    jobTitle: AUTHOR_DATA.role[lang],
    description: AUTHOR_DATA.bio[lang],
    knowsAbout: AUTHOR_DATA.interests[lang],
    hasCredential: AUTHOR_DATA.schemaCredentials[lang].map((name) => ({
      "@type": "EducationalOccupationalCredential",
      name,
    })),
    worksFor: { "@id": ORG_ID },
  };
  if (Array.isArray(AUTHOR_DATA.sameAs) && AUTHOR_DATA.sameAs.length) node.sameAs = AUTHOR_DATA.sameAs;
  return node;
}

function pageLanguage(html, filename) {
  const lang = html.match(/<html[^>]*\slang=["']([^"']+)["']/i)?.[1]?.toLowerCase().slice(0, 2);
  const fallback = filename.match(/-(en|fr|pt)\.html$/i)?.[1]?.toLowerCase() || "ar";
  const result = lang || fallback;
  if (!LOCALE_MAP[result]) throw new Error(`Unsupported language '${result}' in ${filename}`);
  return result;
}

function itemListNode(id, items) {
  return {
    "@id": id,
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      ...(typeof item === "string" ? { name: item } : item),
    })),
  };
}

function localizedArticleTitle(article, index, lang) {
  if (lang === "ar") return article.title;
  if (lang === "en") return `Engineering briefing ${index + 1}: ${article.title}`;
  if (lang === "fr") return `Analyse d'ingenierie ${index + 1} : ${article.title}`;
  return `Analise de engenharia ${index + 1}: ${article.title}`;
}

function localizedTechnologyItems(html) {
  const items = [];
  const cardPattern = /<a\s+class=["']technology-category-card["']\s+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of html.matchAll(cardPattern)) {
    const href = decodeHtml(match[1]);
    const title = cleanText(match[2].match(/<h3[^>]*>([\s\S]*?)<\/h3>/i)?.[1] || "");
    if (title && href) items.push({ name: title, item: new URL(href, SITE_ROOT).href });
  }
  return items;
}

function listItems(kind, html, lang, articles, cars) {
  if (kind === "technology-hub") return localizedTechnologyItems(html);
  if (kind === "article-list") return articles.map((article, index) => localizedArticleTitle(article, index, lang));
  if (kind === "company-list") return BRAND_NAMES[lang];
  if (kind === "model-list") return cars.map((car) => `${car.brand} ${car.model}`);
  return [];
}

function createGraph({ filename, html, canonical, title, description, lang, kind, articles, cars }) {
  const pageId = `${canonical}#webpage`;
  const pageType = {
    author: "ProfilePage",
    home: "WebPage",
    "technology-hub": "CollectionPage",
    "technology-article": "WebPage",
    "article-list": "CollectionPage",
    "company-list": "CollectionPage",
    "model-list": "CollectionPage",
    comparison: "WebPage",
    "vehicle-guide": "WebPage",
    "research-article": "WebPage",
    about: "AboutPage",
    contact: "ContactPage",
    webpage: "WebPage",
  }[kind];
  const page = {
    "@id": pageId,
    "@type": pageType,
    url: canonical,
    name: title,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
  };
  if (description) page.description = description;

  const graph = [];
  if (kind === "home") graph.push(WEBSITE, ORGANIZATION, personNode(lang));
  graph.push(page);

  if (kind === "author") {
    page.mainEntity = { "@id": AUTHOR_ID };
    graph.push(personNode(lang));
  } else if (kind === "technology-article" || kind === "research-article") {
    const articleId = `${canonical}#article`;
    page.mainEntity = { "@id": articleId };
    page.author = { "@id": AUTHOR_ID };
    graph.push({
      "@id": articleId,
      "@type": ["TechArticle", "Article"],
      headline: findH1(html) || title,
      description,
      inLanguage: lang,
      mainEntityOfPage: { "@id": pageId },
      author: { "@id": AUTHOR_ID },
      publisher: { "@id": ORG_ID },
      ...(kind === "technology-article" && html.includes('data-technical-review="completed"') ? {
        reviewedBy: { "@id": AUTHOR_ID },
        dateModified: html.match(/data-last-reviewed="(\d{4}-\d{2}-\d{2})"/)?.[1],
      } : {}),
    });
  } else if (kind === "about") {
    page.mainEntity = { "@id": ORG_ID };
  } else if (kind === "contact") {
    page.mainEntity = { "@id": ORG_ID };
  }

  if (["technology-hub", "article-list", "company-list", "model-list", "comparison", "vehicle-guide"].includes(kind)) {
    page.author = { "@id": AUTHOR_ID };
    graph.push(personNode(lang));
  }

  const items = listItems(kind, html, lang, articles, cars);
  if (items.length) {
    const list = itemListNode(`${canonical}#item-list`, items);
    page.mainEntity = { "@id": list["@id"] };
    graph.push(list);
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

function replaceSchema(html, schema) {
  const script = `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`;
  const generated = `${START}\n${script}\n${END}`;
  const marked = new RegExp(`${START}[\\s\\S]*?${END}`, "m");
  if (marked.test(html)) return html.replace(marked, generated);

  // Migrate the original homepage-only JSON-LD into this generator's managed block.
  const withoutExisting = html.replace(/\s*<script\b(?=[^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi, "");
  if (!/<\/head>/i.test(withoutExisting)) throw new Error("Missing </head> while generating JSON-LD");
  return withoutExisting.replace(/<\/head>/i, `${generated}\n</head>`);
}

const urls = [...readFileSync(SITEMAP_PATH, "utf8").matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const articles = readJson(ARTICLES_PATH);
const cars = readJson(CARS_PATH);
if (!urls.length) throw new Error("No URLs found in sitemap.xml");

let generatedCount = 0;
for (const sitemapUrl of urls) {
  const canonicalFromSitemap = decodeHtml(sitemapUrl.trim());
  const pathname = new URL(canonicalFromSitemap).pathname;
  let filename = pathname.split("/").filter(Boolean).at(-1) || "index.html";
  if (filename === "AutoAtlas") filename = "index.html";
  const path = join(ROOT, filename);
  let html = readFileSync(path, "utf8");
  if (/\bnoindex\b/i.test(findMeta(html, "robots"))) continue;

  const canonical = findCanonical(html);
  if (!canonical || canonical !== canonicalFromSitemap) {
    throw new Error(`${filename}: canonical does not match sitemap URL`);
  }
  const title = findPageTitle(html);
  const description = findMeta(html, "description");
  if (!title || !description) throw new Error(`${filename}: title or description is missing`);
  const lang = pageLanguage(html, filename);
  const kind = pageKind(filename);
  const schema = createGraph({ filename, html, canonical, title, description, lang, kind, articles, cars });
  html = replaceSchema(html, schema);
  writeFileSync(path, html, "utf8");
  generatedCount += 1;
}

console.log(`[build-structured-data] Generated JSON-LD on ${generatedCount} indexable sitemap pages.`);
