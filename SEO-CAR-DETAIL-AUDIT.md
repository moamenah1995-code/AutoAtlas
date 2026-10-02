# Car detail pages: indexing audit

Audit date: 2026-10-01

## Decision

Keep the four `car-detail` pages out of search results and out of `sitemap.xml` for now. These pages are localized general-purpose guides for checking vehicle information; they do not provide distinct, substantive records for individual cars. The searchable vehicle catalog is presented on the models and comparison pages. Indexing these generic guides as car detail pages could create a mismatch between search intent and page content.

## Page checks

| Page | Robots directive | Canonical | Sitemap | Metadata and language |
|---|---|---|---|---|
| `car-detail.html` | `noindex, follow` | Self-referencing | Excluded | Arabic page metadata; Arabic document language |
| `car-detail-en.html` | `noindex, follow` | Self-referencing | Excluded | English page metadata; English document language |
| `car-detail-fr.html` | `noindex, follow` | Self-referencing | Excluded | French page metadata; French document language |
| `car-detail-pt.html` | `noindex, follow` | Self-referencing | Excluded | Portuguese page metadata; Portuguese document language |

Each page has one localized title and meta description, a self-referencing canonical, and matching `hreflang` alternates for Arabic, English, French, Portuguese, and `x-default`. The sitemap contains no URL for these pages, which is consistent with their `noindex` status.

## Internal linking

The pages link to their localized site sections and to each other through the language switch. Home-page vehicle cards and dynamically generated recommendations also link to the guide. Because the directives use `follow`, crawlers may follow those links while excluding the guide pages themselves. Some vehicle-card labels imply a specific vehicle detail page even though the destination is a general verification guide; align those labels or destinations if the cards are revised.

## Reconsider indexing when

Create indexable detail pages only when each URL represents a specific vehicle or model with useful, original facts (such as model year, market, trim, powertrain, sourced specifications, and availability). At that point, remove `noindex`, retain a self-referencing canonical, ensure localized alternates are equivalent, link to each detail page from the relevant catalog entry, and add only those indexable URLs to `sitemap.xml`.

## Changes made

No page or sitemap changes were needed: all four pages already use `noindex, follow`, self-referencing canonicals, and are absent from the sitemap. This report records the exclusion rationale.
