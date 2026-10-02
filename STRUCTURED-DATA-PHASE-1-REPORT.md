# Structured Data Phase 1 Report

Completed: 2026-10-01

## Implementation

Added one managed JSON-LD `@graph` block to each of the 56 indexable pages in `sitemap.xml`. The reusable generator is [scripts/build-structured-data.mjs](./scripts/build-structured-data.mjs); GitHub Pages now runs it after the article and vehicle catalog source-data builders. Generated markup is delimited with `AUTO-GENERATED:SCHEMA` markers so the same script can refresh it without duplicating blocks.

## Page coverage

| Page type | Pages | Schema types |
|---|---:|---|
| Localized homepages | 4 | `WebSite`, `WebPage`, `Organization` |
| Technology hubs | 4 | `CollectionPage`, `ItemList` |
| Technology guides | 16 | `WebPage`, `TechArticle`, `Article` |
| Article listings | 4 | `CollectionPage`, `ItemList` |
| Company catalogs | 4 | `CollectionPage`, `ItemList` |
| Model catalogs | 4 | `CollectionPage`, `ItemList` |
| Comparison pages | 4 | `WebPage` |
| About pages | 4 | `AboutPage` |
| Contact pages | 4 | `ContactPage` |
| Privacy and terms pages | 8 | `WebPage` |
| **Total** | **56** | **Covered** |

Other pages reference the shared `WebSite` and `Organization` identifiers defined by the localized homepages. Page URLs, names, descriptions, and `inLanguage` are taken from the corresponding canonical URL and existing page metadata. The root site and organization IDs are stable across all four languages.

## ItemList contents

- Technology hubs: 4 linked guides each.
- Article listings: 65 visible article entries each.
- Company catalogs: 12 displayed brands each.
- Model catalogs: 20 researched models each.

Items are generated from the same source data used by the pages. Brand labels are localized; vehicle model names remain proper names. List item counts match across Arabic, English, French, and Portuguese versions.

## Exclusions and preservation

- The four `car-detail` pages remain untouched because they are `noindex` and absent from the sitemap.
- Existing title, description, canonical, robots, Open Graph, and Twitter/X metadata were preserved.
- Existing homepage JSON-LD was replaced by the normalized managed graph; its public organization contact details were retained.
- No `Vehicle` type was added to generic catalogs or car-detail guides because they do not provide dedicated vehicle detail pages.

## Validation

- Parsed all 56 generated JSON-LD blocks as JSON and checked the expected page types and ItemList structure.
- Confirmed one JSON-LD block on every sitemap page, matching localized list counts, and no JSON-LD on the four `noindex` car-detail pages.
- No Google Rich Results Test or live URL Inspection was run; those require the deployed pages.
