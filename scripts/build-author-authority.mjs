#!/usr/bin/env node
/** Build localized author profiles and visible authorship/review details. */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BASE = "https://moamenah1995-code.github.io/AutoAtlas/";
const author = normalizeLegacyTree(JSON.parse(readFileSync(join(ROOT, "authors.json"), "utf8")));
const reviewDate = "2026-10-02";
const locales = ["ar", "en", "fr", "pt"];
const paths = { ar: "author.html", en: "author-en.html", fr: "author-fr.html", pt: "author-pt.html" };
const languageNames = { ar: "العربية", en: "English", fr: "Français", pt: "Português" };
const pageLabels = {
  ar: { home: "الرئيسية", title: "الملف المهني للكاتبة", crumb: "AutoAtlas", reviewScope: "تغطي المراجعة الاتساق الهندسي وجودة المصادر، ولا تعني إجراء اختبارات ميدانية أو اعتماداً تنظيمياً." },
  en: { home: "Home", title: "Author profile", crumb: "AutoAtlas", reviewScope: "The review covers engineering consistency and source quality; it does not imply field testing or regulatory certification." },
  fr: { home: "Accueil", title: "Profil de l’autrice", crumb: "AutoAtlas", reviewScope: "La révision porte sur la cohérence technique et la qualité des sources ; elle ne signifie pas qu’un essai terrain ou une certification réglementaire a été réalisé." },
  pt: { home: "Início", title: "Perfil da autora", crumb: "AutoAtlas", reviewScope: "A revisão cobre a consistência de engenharia e a qualidade das fontes; não significa que tenham sido realizados testes de campo ou certificação regulatória." },
};
const seoDescriptions = {
  ar: "تعرّف إلى مؤمنة عليمات، مهندسة صناعية ومهندسة طاقة ومؤسسة AutoAtlas، واطّلع على مؤهلاتها وخبرتها وأبحاثها في التنقل والطاقة.",
  en: "Meet Mu'minah Alimat, AutoAtlas founder and industrial and energy engineer. Explore her qualifications, experience, and research in sustainable mobility.",
  fr: "Découvrez Mu'minah Alimat, fondatrice d’AutoAtlas et ingénieure en énergie. Consultez sa formation, son expérience et ses recherches sur la mobilité durable.",
  pt: "Conheça Mu'minah Alimat, fundadora da AutoAtlas e engenheira industrial e de energia. Veja sua formação, experiência e pesquisas em mobilidade sustentável.",
};
const editorialPolicy = {
  ar: { title: "منهجية التحرير والتصحيحات", intro: "توضح هذه المنهجية طريقة إعداد أدلة AutoAtlas التعليمية وحدود ما تثبته المعلومات المنشورة.", points: ["المصادر: نبدأ بالمصادر الأولية، مثل الجهات التنظيمية والمصنّعين والهيئات العامة والدراسات المحكمة، ونستخدم المصادر الثانوية للسياق.", "الحسابات: نذكر الوحدات والافتراضات والحدود؛ والقيم التوضيحية تقديرات سيناريو ما لم نصفها صراحة بأنها قياسات ميدانية.", "المراجعة الفنية: تتحقق من الاتساق الهندسي وجودة الإحالات، ولا تعني اختباراً مستقلاً أو اعتماداً تنظيمياً.", "التصحيحات: أرسل رابط الصفحة والموضع والمصدر المقترح عبر صفحة التواصل. عند اعتماد تعديل جوهري، نحدّث تاريخ المراجعة وبيان التصحيح."], contact: "الإبلاغ عن تصحيح" },
  en: { title: "Editorial method and corrections", intro: "This policy explains how AutoAtlas prepares educational guides and what the published evidence does and does not establish.", points: ["Sources: We prioritize primary material from regulators, manufacturers, public agencies, and peer-reviewed research; secondary sources provide context.", "Calculations: We state units, assumptions, and limits. Illustrative values are scenario estimates unless explicitly identified as field measurements.", "Technical review: It checks engineering consistency and source quality; it does not imply independent testing or regulatory certification.", "Corrections: Send the page URL, passage, and proposed source through the contact page. Substantive accepted changes receive an updated review date and correction note."], contact: "Report a correction" },
  fr: { title: "Méthode éditoriale et corrections", intro: "Cette politique décrit la préparation des guides AutoAtlas et précise ce que les informations publiées permettent, ou non, d’établir.", points: ["Sources : nous privilégions les sources primaires des autorités, constructeurs, organismes publics et publications évaluées par les pairs ; les sources secondaires apportent du contexte.", "Calculs : nous indiquons unités, hypothèses et limites. Les valeurs illustratives sont des estimations de scénario, sauf mention explicite de mesures sur le terrain.", "Révision technique : elle porte sur la cohérence technique et la qualité des sources ; elle ne constitue ni un essai indépendant ni une certification réglementaire.", "Corrections : envoyez l’URL, le passage concerné et la source proposée via la page de contact. Toute correction substantielle acceptée reçoit une date de révision actualisée et une note de correction."], contact: "Signaler une correction" },
  pt: { title: "Método editorial e correções", intro: "Esta política explica como a AutoAtlas prepara seus guias educativos e o que as informações publicadas permitem — ou não — concluir.", points: ["Fontes: priorizamos fontes primárias de órgãos reguladores, fabricantes, instituições públicas e pesquisas revisadas por pares; fontes secundárias oferecem contexto.", "Cálculos: informamos unidades, premissas e limites. Valores ilustrativos são estimativas de cenário, salvo indicação explícita de medições em campo.", "Revisão técnica: verifica a coerência de engenharia e a qualidade das fontes; não significa teste independente nem certificação regulatória.", "Correções: envie o URL, o trecho e a fonte sugerida pela página de contato. Alterações substanciais aceitas recebem data de revisão atualizada e nota de correção."], contact: "Sugerir uma correção" },
};
const reviewedGuideNames = {
  ar: ["تقنيات المركبات الكهربائية", "بنية شحن المركبات", "الطاقة المتجددة والشحن الشمسي", "مستقبل التنقل والنقل الذكي"],
  en: ["Electric vehicle technology", "Charging infrastructure", "Renewable energy and solar charging", "Future mobility and smart transportation"],
  fr: ["Technologies des véhicules électriques", "Infrastructures de recharge", "Énergies renouvelables et recharge solaire", "Mobilité future et transport intelligent"],
  pt: ["Tecnologias de veículos elétricos", "Infraestrutura de recarga", "Energia renovável e recarga solar", "Mobilidade futura e transporte inteligente"],
};
const markerStart = "<!-- AUTO-GENERATED:AUTHOR-AUTHORITY:START -->";
const markerEnd = "<!-- AUTO-GENERATED:AUTHOR-AUTHORITY:END -->";

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

function esc(value) {
  const text = normalizeLegacy(String(value));
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function profileLink(lang) {
  const href = paths[lang];
  return `<a href="${href}">${esc(author.name)}</a>`;
}
function list(items) {
  return `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>`;
}
function profilePage(lang) {
  const copy = author.labels[lang];
  const pageCopy = pageLabels[lang];
  const canonical = `${BASE}${paths[lang]}`;
  const alternates = locales.map((l) => `<link rel="alternate" hreflang="${l}" href="${BASE}${paths[l]}">`).join("\n");
  const description = author.bio[lang];
  const seoDescription = seoDescriptions[lang];
  const nav = `<nav class="main-nav" aria-label="${esc(pageCopy.home)}"><a href="${lang === "ar" ? "index.html" : `${lang}.html`}">${esc(pageCopy.home)}</a></nav>`;
  const interests = author.interests[lang].map((item) => `<li>${esc(item)}</li>`).join("");
  const policy = editorialPolicy[lang];
  const contactPath = lang === "ar" ? "contact.html" : `contact-${lang}.html`;
  const policySection = `<section class="author-editorial-policy content-card"><h2>${esc(policy.title)}</h2><p>${esc(policy.intro)}</p><ul>${policy.points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul><p><a class="text-link" href="${contactPath}">${esc(policy.contact)}</a></p></section>`;
  return `<!doctype html>
<html lang="${lang}"${lang === "ar" ? ' dir="rtl"' : ""}><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#0b1220"><title>${esc(copy.title)} | AutoAtlas</title>
<meta name="description" content="${esc(seoDescription)}"><link rel="canonical" href="${canonical}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${BASE}${paths.ar}">
<link rel="stylesheet" href="style.css"><script defer src="script.js"></script></head>
<body data-page="author"><header class="site-header"><div class="container"><div class="nav-container"><a class="brand" href="${lang === "ar" ? "index.html" : `${lang}.html`}"><span class="brand-mark">A</span><span>AutoAtlas</span></a>${nav}<div class="lang-switch">${locales.map((l) => `<a${l === lang ? ' class="active"' : ""} href="${paths[l]}">${languageNames[l]}</a>`).join("")}</div></div></div></header>
<main class="container page-main author-profile-page"><nav class="technology-breadcrumb" aria-label="${esc(pageCopy.title)}"><a href="${lang === "ar" ? "technology.html" : `technology-${lang}.html`}">${esc(pageCopy.crumb)}</a><span aria-hidden="true">/</span><span>${esc(author.name)}</span></nav>
<section class="author-profile-hero"><span class="author-monogram" aria-hidden="true">MA</span><div><span class="section-kicker">${esc(copy.eyebrow)}</span><h1>${esc(author.name)}</h1><p class="author-role">${esc(author.role[lang])}</p><p>${esc(description)}</p></div></section>
<section class="author-profile-grid"><article class="content-card"><h2>${esc(copy.background)}</h2><p>${esc(description)}</p></article><article class="content-card"><h2>${esc(copy.education)}</h2>${list(author.education[lang])}<p class="author-qualification-note">${lang === "ar" ? "تُعرض الدراسات دون الإيحاء بمنح مؤهل لم يذكر." : lang === "fr" ? "Les études sont indiquées sans laisser entendre qu’un diplôme non déclaré a été obtenu." : lang === "pt" ? "Os estudos são descritos sem sugerir a conclusão de um diploma não informado." : "Studies are described without implying that an unreported qualification was awarded."}</p></article><article class="content-card"><h2>${esc(copy.experience)}</h2>${list(author.experience[lang])}</article><article class="content-card"><h2>${esc(copy.interests)}</h2><ul>${interests}</ul></article></section>
${policySection}
<section class="author-review-scope"><h2>${esc(copy.reviewStatus)}</h2><p>${esc(copy.reviewed)}</p><p>${esc(pageCopy.reviewScope)}</p><h3>${esc(copy.guides)}</h3><ul>${["technology-ev", "technology-charging", "technology-renewables", "technology-future"].map((slug, i) => `<li><a href="${slug}${lang === "ar" ? "" : `-${lang}`}.html">${esc(reviewedGuideNames[lang][i])}</a></li>`).join("")}</ul><p>${esc(copy.lastReviewed)}: <time datetime="${reviewDate}">${reviewDate}</time></p></section>
<nav class="technology-related" aria-label="${esc(copy.title)}"><a href="${lang === "ar" ? "technology.html" : `technology-${lang}.html`}">${esc(copy.guides)}</a><a href="${lang === "ar" ? "articles.html" : `articles-${lang}.html`}">${lang === "ar" ? "المقالات التعليمية" : lang === "fr" ? "Articles pédagogiques" : lang === "pt" ? "Artigos educativos" : "Educational articles"}</a></nav></main><footer class="site-footer"><div class="container"><p>© AutoAtlas</p><p><a href="${lang === "ar" ? "contact.html" : `contact-${lang}.html`}">${lang === "ar" ? "تواصل" : lang === "fr" ? "Contact" : lang === "pt" ? "Contato" : "Contact"}</a></p></div></footer></body></html>`;
}
function authorityCard(lang, { kind, sourceCount = 0 }) {
  const c = author.labels[lang];
  const link = profileLink(lang);
  let date = c.notRecorded;
  let status = kind === "guide" ? c.reviewed : kind === "hub" ? c.hubStatus : kind === "data" ? c.dataStatus : c.articleStatus;
  let sources = kind === "guide" ? c.sourceCount.replace("{count}", String(sourceCount)) : kind === "hub" ? c.hubSources : kind === "data" ? c.dataSources : c.articleSources;
  if (kind === "guide") date = reviewDate;
  const reviewAttributes = kind === "guide" ? ` data-technical-review="completed" data-last-reviewed="${reviewDate}"` : "";
  return `${markerStart}<aside class="author-authority-card" aria-label="${esc(c.eyebrow)}"${reviewAttributes}><div class="author-byline"><span class="author-monogram" aria-hidden="true">MA</span><div><span class="technology-card-index">${esc(c.eyebrow)}</span><p><strong>${esc(c.author)}:</strong> ${link} <span class="author-role-inline">${esc(author.role[lang])}</span></p></div></div><dl class="author-review-metadata"><div><dt>${esc(c.lastReviewed)}</dt><dd>${date === reviewDate ? `<time datetime="${reviewDate}">${reviewDate}</time>` : esc(date)}</dd></div><div><dt>${esc(c.reviewStatus)}</dt><dd>${esc(status)}</dd></div><div><dt>${esc(c.sourcesReviewed)}</dt><dd>${esc(sources)}</dd></div></dl>${kind === "guide" ? `<p class="author-review-scope">${esc(c.scope)}</p>` : ""}</aside>${markerEnd}`;
}
function insertAfter(html, pattern, block, filename) {
  const re = new RegExp(pattern, "i");
  if (!re.test(html)) throw new Error(`${filename}: insertion point not found`);
  return html.replace(re, (match) => `${match}${block}`);
}

for (const lang of locales) writeFileSync(join(ROOT, paths[lang]), profilePage(lang), "utf8");

for (const lang of locales) {
  const suffix = lang === "ar" ? "" : `-${lang}`;
  const hubName = `technology${suffix}.html`;
  let hub = readFileSync(join(ROOT, hubName), "utf8");
  hub = hub.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "g"), "");
  hub = insertAfter(hub, "(<section class=\"technology-hub-hero\">[\\s\\S]*?<\\/section>)", authorityCard(lang, { kind: "hub" }), hubName);
  writeFileSync(join(ROOT, hubName), hub, "utf8");

  for (const slug of ["technology-ev", "technology-charging", "technology-renewables", "technology-future"]) {
    const filename = `${slug}${suffix}.html`;
    let html = readFileSync(join(ROOT, filename), "utf8");
    html = html.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "g"), "");
    const sourcesSection = html.match(/<section\b(?=[^>]*\bid=["']sources["'])[^>]*>[\s\S]*?<\/section>/i)?.[0] || "";
    const sourceCount = new Set([...sourcesSection.matchAll(/href=["'](https?:\/\/[^"']+)["']/gi)].map((m) => m[1])).size;
    html = insertAfter(html, "(<section class=\"technology-detail-hero\">[\\s\\S]*?<\\/section>)", authorityCard(lang, { kind: "guide", sourceCount }), filename);
    writeFileSync(join(ROOT, filename), html, "utf8");
  }

  const articlesName = `articles${suffix}.html`;
  let articlesHtml = readFileSync(join(ROOT, articlesName), "utf8");
  articlesHtml = articlesHtml.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "g"), "");
  articlesHtml = articlesHtml.replace(/<div\s+(?:id=["']articles-list["']\s+)?class=["']articles-list["']>/i, `${authorityCard(lang, { kind: "articles" })}<div class="articles-list">`);
  if (!articlesHtml.includes(markerStart)) throw new Error(`${articlesName}: article-list insertion point not found`);
  writeFileSync(join(ROOT, articlesName), articlesHtml, "utf8");

  for (const base of ["models", "companies", "compare", "car-detail"]) {
    const filename = `${base}${suffix}.html`;
    let html = readFileSync(join(ROOT, filename), "utf8");
    html = html.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "g"), "");
    html = insertAfter(html, "(<section class=\"page-hero\"[\\s\\S]*?<\\/section>)", authorityCard(lang, { kind: "data" }), filename);
    writeFileSync(join(ROOT, filename), html, "utf8");
  }

  if (lang === "en") {
    for (const filename of ["solar-ev-jordan.html", "jordan-ev-charging-study.html", "amman-public-transport-electrification.html", "commercial-fleet-electrification-jordan.html", "home-energy-storage-smart-charging.html"]) {
      let html = readFileSync(join(ROOT, filename), "utf8");
      html = html.replace(new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "g"), "");
      html = insertAfter(html, "(<section class=\"technology-detail-hero\">[\\s\\S]*?<\\/section>)", authorityCard("en", { kind: "articles" }), filename);
      writeFileSync(join(ROOT, filename), html, "utf8");
    }
  }
}

// The article list is client-rendered, so emit visible authorship and explicitly
// unrecorded review metadata on each generated briefing without implying review.
const scriptPath = join(ROOT, "script.js");
let js = readFileSync(scriptPath, "utf8");
const helperStart = "// AUTO-GENERATED:AUTHOR-AUTHORITY:START";
const helperEnd = "// AUTO-GENERATED:AUTHOR-AUTHORITY:END";
const helper = `${helperStart}
function articleAuthorityHtml(sourceCount) {
  const decodeLegacy = (value) => {
    const cp1252 = new Map([["€",0x80],["‚",0x82],["ƒ",0x83],["„",0x84],["…",0x85],["†",0x86],["‡",0x87],["ˆ",0x88],["‰",0x89],["Š",0x8a],["‹",0x8b],["Œ",0x8c],["Ž",0x8e],["‘",0x91],["’",0x92],["“",0x93],["”",0x94],["•",0x95],["–",0x96],["—",0x97],["˜",0x98],["™",0x99],["š",0x9a],["›",0x9b],["œ",0x9c],["ž",0x9e],["Ÿ",0x9f]]);
    return !/[ØÙÃÂ]/.test(value) ? value : new TextDecoder().decode(Uint8Array.from([...value].map((char) => cp1252.get(char) ?? (char.charCodeAt(0) & 0xff))));
  };
  const copy = locale === "ar"
    ? { author: "الكاتبة", reviewed: "آخر مراجعة: غير مسجل", status: "المراجعة الفنية: خارج نطاق مراجعة الأدلة التقنية", sources: "مراجعة المصادر: غير مسجلة؛ مراجع مدرجة: " }
    : locale === "fr"
      ? { author: "Autrice", reviewed: "Dernière révision : non renseignée", status: "Révision technique : hors du périmètre des guides techniques", sources: "Vérification des sources non renseignée ; références listées : " }
      : locale === "pt"
        ? { author: "Autora", reviewed: "Última revisão: não registrada", status: "Revisão técnica: fora do escopo dos guias técnicos", sources: "Verificação das fontes não registrada; referências listadas: " }
        : { author: "Author", reviewed: "Last reviewed: not recorded", status: "Technical review: outside the reviewed technology-guide set", sources: "Source review not recorded; references listed: " };
  for (const key of Object.keys(copy)) copy[key] = decodeLegacy(copy[key]);
  const profile = locale === "ar" ? "author.html" : "author-" + locale + ".html";
  return '<aside class="article-author-meta"><p><strong>' + copy.author + ':</strong> <a href="' + profile + '">Mu\'minah Alimat</a></p><p>' + copy.reviewed + '</p><p>' + copy.status + '</p><p>' + copy.sources + sourceCount + '</p></aside>';
}
${helperEnd}`;
const helperPattern = new RegExp(`${helperStart}[\\s\\S]*?${helperEnd}`);
if (helperPattern.test(js)) js = js.replace(helperPattern, helper);
else {
  const renderMarker = "function renderArticles(filterText = \"\") {";
  if (!js.includes(renderMarker)) throw new Error("script.js: renderArticles anchor not found");
  js = js.replace(renderMarker, `${helper}\n\n${renderMarker}`);
}
const summaryAnchor = '<p class="article-summary">${summary}</p>';
if (!js.includes(summaryAnchor)) throw new Error("script.js: article summary template anchor not found");
js = js.replace(/\n\s*\$\{articleAuthorityHtml\(\(article\.sources \|\| \[\]\)\.length\)\}/g, "");
js = js.replace(summaryAnchor, `${summaryAnchor}\n      \${articleAuthorityHtml((article.sources || []).length)}`);
writeFileSync(scriptPath, js, "utf8");

// Add profile URLs to the sitemap once, preserving the existing entries.
const sitemapPath = join(ROOT, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf8");
for (const lang of locales) {
  const loc = `${BASE}${paths[lang]}`;
  if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
  const entry = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.4</priority>\n  </url>\n`;
  sitemap = sitemap.replace(/<\/urlset>/i, `${entry}</urlset>`);
}
writeFileSync(sitemapPath, sitemap, "utf8");

console.log("[build-author-authority] Built 4 localized author profiles; added authorship/review metadata to 40 localized content pages and 5 English Jordan research guides, plus dynamic briefings; synchronized profile sitemap entries.");
