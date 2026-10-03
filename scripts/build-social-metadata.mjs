#!/usr/bin/env node
/** Add localized Open Graph and Twitter metadata to the pages missing it. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://moamenah1995-code.github.io/AutoAtlas/";
const IMAGE = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?fit=crop&fm=jpg&h=630&w=1200&q=80";
const locales = { ar: "ar_JO", en: "en_US", fr: "fr_FR", pt: "pt_BR" };
const authorDescriptions = {
  ar: "تعرّف إلى مؤمنة عليمات، مهندسة صناعية ومهندسة طاقة ومؤسسة AutoAtlas، واطّلع على مؤهلاتها وخبرتها وأبحاثها في التنقل والطاقة.",
  en: "Meet Mu'minah Alimat, AutoAtlas founder and industrial and energy engineer. Explore her qualifications, experience, and research in sustainable mobility.",
  fr: "Découvrez Mu'minah Alimat, fondatrice d’AutoAtlas et ingénieure en énergie. Consultez sa formation, son expérience et ses recherches sur la mobilité durable.",
  pt: "Conheça Mu'minah Alimat, fundadora da AutoAtlas e engenheira industrial e de energia. Veja sua formação, experiência e pesquisas em mobilidade sustentável.",
};
const authorNames = { ar: "مؤمنة عليمات", en: "Mu'minah Alimat", fr: "Mu'minah Alimat", pt: "Mu'minah Alimat" };
const targets = [
  ...Object.entries({ ar: "author.html", en: "author-en.html", fr: "author-fr.html", pt: "author-pt.html" })
    .map(([lang, file]) => ({ lang, file, type: "profile" })),
  { lang: "ar", file: "technology-renewables.html", type: "article" },
];
const start = "<!-- AUTO-GENERATED:SOCIAL-METADATA:START -->";
const end = "<!-- AUTO-GENERATED:SOCIAL-METADATA:END -->";

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function capture(html, pattern, label, file) {
  const value = html.match(pattern)?.[1];
  if (!value) throw new Error(`${file}: missing ${label}`);
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
}

for (const { lang, file, type } of targets) {
  const path = join(ROOT, file);
  let html = readFileSync(path, "utf8");
  html = html.replace(new RegExp(`${start}[\\s\\S]*?${end}`, "g"), "");
  const title = capture(html, /<title[^>]*>([\s\S]*?)<\/title>/i, "title", file);
  const canonical = capture(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i, "canonical URL", file);
  const description = type === "profile"
    ? authorDescriptions[lang]
    : capture(html, /<meta\s+name="description"\s+content="([^"]*)"/i, "meta description", file);
  const descTag = html.match(/<meta\s+name="description"\s+content="([^"]*)"/gi) || [];
  if (descTag.length !== 1) throw new Error(`${file}: expected exactly one meta description, found ${descTag.length}`);
  if (type === "profile") {
    html = html.replace(descTag[0], `<meta name="description" content="${escapeHtml(description)}">`);
  }
  const allSocialKeys = ["og:type", "og:site_name", "og:locale", "og:title", "og:description", "og:url", "og:image", "og:image:alt", "twitter:card", "twitter:title", "twitter:description", "twitter:image"];
  for (const key of allSocialKeys) {
    const re = new RegExp(`<meta\\s+(?:property|name)=["']${key.replace(/:/g, "\\:")}['"][^>]*>`, "i");
    if (re.test(html)) throw new Error(`${file}: unexpected existing ${key}; refusing to add duplicate social metadata`);
  }
  const socialTitle = type === "profile"
    ? `${authorNames[lang]} — ${title.replace(/\s*\|\s*AutoAtlas$/i, "")} | AutoAtlas`
    : title;
  const alternateLocales = Object.entries(locales).filter(([code]) => code !== lang)
    .map(([, locale]) => `<meta property="og:locale:alternate" content="${locale}">`).join("");
  const block = `${start}<meta property="og:type" content="${type}"><meta property="og:site_name" content="AutoAtlas"><meta property="og:locale" content="${locales[lang]}">${alternateLocales}<meta property="og:title" content="${escapeHtml(socialTitle)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${escapeHtml(canonical)}"><meta property="og:image" content="${IMAGE}"><meta property="og:image:secure_url" content="${IMAGE}"><meta property="og:image:type" content="image/jpeg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${escapeHtml(socialTitle)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(socialTitle)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${IMAGE}"><meta name="twitter:image:alt" content="${escapeHtml(socialTitle)}">${end}`;
  if (!/<\/head>/i.test(html)) throw new Error(`${file}: missing closing head element`);
  html = html.replace(/<\/head>/i, `${block}</head>`);
  writeFileSync(path, html, "utf8");
}

console.log(`[build-social-metadata] Added localized Open Graph and Twitter metadata to ${targets.length} pages.`);
