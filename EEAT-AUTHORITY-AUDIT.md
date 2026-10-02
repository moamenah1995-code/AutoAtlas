# AutoAtlas E-E-A-T and Authority Audit

**Audit date:** 2026-10-02  
**Scope:** Public HTML pages and source data/code in the repository, across Arabic, English, French, and Portuguese. This is a content and visible-signal audit; it does not establish the identity or qualifications of the operator, test the live deployment, measure traffic, or assess backlink reputation.

## Executive assessment

AutoAtlas has a useful foundation: clear automotive and energy subject areas, multilingual page paths, explicit limitations in some guides, links to recognized primary sources, and several newer technical guides that show assumptions and worked examples. Its engineering-reference pages have the strongest subject signals.

The main obstacle to authority is that a reader cannot tell **who created or technically checked the material, what first-hand work supports it, or how an error is corrected**. The About pages describe an independent research approach but do not identify an operator, editorial staff, authors, reviewers, or a reproducible review process. Article cards name broad source organizations, but do not consistently link a particular claim to the exact supporting report or dataset.

The article system is the most urgent content-quality concern. [`articles.json`](articles.json) stores only `id`, `title`, `summary`, `sources`, and `date`; [`script.js`](script.js#L349) builds shared prose blocks around those fields, and [`renderArticles`](script.js#L939) displays them as article bodies. The entries are not individually attributed, and the dates are not carried into the generated runtime article objects by [`build-articles.mjs`](scripts/build-articles.mjs). This creates a large appearance of authored coverage without corresponding visible authorship, article-specific evidence, or publication history. Google advises that authorship be clear where readers would expect it, that content add original value, and that E-E-A-T itself is not a specific ranking factor. [Google: helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Google: AI-generated content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=en).

These findings are an editorial assessment, not a prediction of a Google ranking outcome. E-E-A-T is a useful quality lens; it should not be treated as a score that can be mechanically optimized.

## Ratings

| Dimension | Current assessment | Evidence and principal gap |
|---|---|---|
| Experience | **Low** | The site presents no named test drivers, workshop contributors, vehicle inspections, instrumented tests, original photographs, field notes, or first-hand use evidence. The vehicle catalog is a research catalog, not a documented testing program. |
| Expertise | **Uneven; moderate in selected technical guides** | EV, charging, renewable energy, and future-mobility material includes engineering concepts, assumptions, calculations, limitations, and primary references. The expertise is not attached to a named, verifiable author or reviewer, and other editorial material is more generalized. |
| Authoritativeness | **Low / emerging** | A brand and topic coverage exist, but no identifiable subject-matter staff, institutional affiliation, original study, cited dataset, expert board, or demonstrated external recognition is presented. Linking to authoritative organizations does not by itself make AutoAtlas an authority. Backlinks and external reputation were not assessed. |
| Trustworthiness | **Mixed; needs stronger accountability** | There are About, Contact, Privacy, and Terms pages, and the contact page gives email, telephone, and city. The public-facing material does not identify the responsible publisher/editor, explain editorial independence or corrections, or show when technical pages were reviewed. The About claim of independence is not accompanied by conflict/sponsorship disclosures. |

## Findings by E-E-A-T dimension

### 1. Experience signals

- No visible bylines, author profiles, reviewer profiles, contributor biographies, or reviewer credentials were found on the audited editorial pages. The technology article schema generator likewise adds a `publisher` but no `author`, reviewer, or publication/update dates: [`scripts/build-structured-data.mjs`](scripts/build-structured-data.mjs#L170).
- There is no published first-hand testing method or evidence such as a named vehicle test, a repeatable charging test, original measurements, inspection photographs, or anonymized field data. This is a particular gap if AutoAtlas wants to compete for reviews, reliability assessments, real-world range, charging performance, or vehicle ownership advice.
- For engineering explainers, first-hand experience need not mean pretending to run a laboratory. A real engineer’s design/review history, documented calculation notebook, field-project case study, or expert review with scope stated would be a valid and more accurate signal.

### 2. Expertise signals

- The newer technology guides are the best examples of expertise: they define technical terms, show calculations and boundaries, distinguish assumptions from measured values, describe limitations, and link to NREL, DOE, IEA, IRENA, standards bodies, and peer-reviewed research. See, for example, [`technology-renewables-en.html`](technology-renewables-en.html#key-facts) and the related localized versions.
- This level is not yet a site-wide standard. Vehicle/model and comparison information needs exact model year, trim, market, test cycle, and source date. The catalog data in [`cars.json`](cars.json) includes a manufacturer URL and broad model/availability fields, but no source-access date or year/trim evidence record.
- The article renderer calls each output an “expert briefing” and inserts common engineering, evidence, ownership, and future-looking boilerplate around topic titles. That process can help structure a draft, but it does not demonstrate an expert’s contribution or topic-specific research. Do not use the “expert” label unless a qualified human has actually authored or reviewed the piece and that role is disclosed.
- Automotive safety, high-voltage systems, charging installation, battery handling, and emissions/cost calculations deserve an explicit technical review standard. A general disclaimer is useful but cannot substitute for competent sourcing and review.

### 3. Authoritativeness

- The About pages say AutoAtlas is an independent reference and that claims are checked against manufacturers and official bodies, but provide no names, credentials, affiliations, editorial leadership, or detailed research method. See [`about-en.html`](about-en.html) and [`about.html`](about.html).
- Sources vary in specificity. The article source map in [`script.js`](script.js#L72) links source names to organization or report-level URLs. Those links are helpful as a starting point, but a reader often has to locate the relevant document and verify the claim independently. For dated, quantitative, regulatory, or safety claims, cite the exact report, table/section, standard edition, data release, and applicable market.
- Article entries are not separate, durable article pages; the source data and search/RSS URLs point to anchors in a list. That makes individual authorship, citations, version history, discovery, and external citation harder than a stable page per substantive article.
- Structured data describes the publisher as `AutoAtlas` with a URL and contact fields, but it does not add an identifiable legal publisher, `sameAs` identity links, or article authors: [`scripts/build-structured-data.mjs`](scripts/build-structured-data.mjs#L29). Structured data can clarify truthful visible information; it cannot create authority signals that the site does not actually provide.

### 4. Trustworthiness and editorial transparency

- **Positive:** About, Contact, Privacy, and Terms pages are present in four language versions. The Contact page publishes an email, phone number, and Amman, Jordan location: [`contact-en.html`](contact-en.html). Terms describe the content as educational and acknowledge that information may not always be current.
- **Gap:** The public site does not make clear which person or organization is accountable for editorial decisions, corrections, and privacy requests. A contact endpoint is useful, but it is not the same as publisher identity or editorial accountability. Verify that the published personal contact details are intended for long-term public use and are consistent with the real site operator.
- **Gap:** There is no prominent editorial policy that explains source ranking, fact-checking, technical review, treatment of manufacturer claims, update cadence, correction history, conflicts of interest, advertising/affiliate relationships, or use of automation/AI where readers would reasonably want that context. The About page’s brief “How we check” statement is a start, not a reproducible process.
- **Gap:** Technical articles do not visibly show “published,” “last checked,” or “reviewed by” dates. This matters for model-year specifications, connector standards, regulations, prices, incentives, and fast-changing EV/grid topics.
- **Gap:** Article metadata and displayed entries do not consistently preserve a visible publish date, named author, or a source-by-claim audit trail. A source list at the bottom is weaker than a nearby citation that tells the reader precisely which source supports which statement.

## Comparison with established automotive and energy references

This comparison is about published authority signals and methods, not an assertion that the organizations are direct business competitors.

| Reference | Public signals visible on its site | Gap relative to AutoAtlas |
|---|---|---|
| **Edmunds** | Named editorial team and leadership, staff biographies, stated editorial mission, volume of automotive experience, and a disclosed repeatable vehicle-evaluation program. [Edmunds editorial team](https://www.edmunds.com/about/editors.html) | AutoAtlas has no visible editorial team, contributor biographies, credentials, or evidence of a comparable testing operation. |
| **Car and Driver** | Named authors and testing leads; a detailed method explaining equipment, track and road procedures, controlled comparisons, data collected, and limits. [How Car and Driver tests cars](https://www.caranddriver.com/features/a32018270/how-we-test-cars/), [How it rates vehicles](https://www.caranddriver.com/about/a60870944/how-car-and-driver-rates-vehicles/) | AutoAtlas provides researched guides, but no original test protocol, measurements, repeatability evidence, or named owner for the comparisons. |
| **U.S. DOE Alternative Fuels Data Center (AFDC)** | Clear government publisher, declared institutional purpose and audience, long-lived program, technical assistance, data resources, interactive tools, and a contact path. [About AFDC](https://afdc.energy.gov/about) | AutoAtlas can link to official sources, but does not yet show accountable institutional ownership, data stewardship, technical assistance/review capacity, or a comparable tool/data provenance framework. |
| **NREL / IEA technical resources** | Named institutional research programs, publications, datasets/tools, documented definitions and methods. NREL presents PV data tools and publications; [NREL PV data and tools](https://www.nrel.gov/pv/data-tools.html), [NREL PV publications](https://www.nrel.gov/pv/publications.html). | AutoAtlas’s newer explainers cite these resources well, but has few original data assets or calculation tools with versioned methods and provenance of its own. |

## Page groups and where credentials/review matter

Credentials should be accurate and verifiable; do not add decorative or invented degrees. Not every directory page needs an individual author, but every page with editorial judgment should have accountable ownership.

| Page group | Needed signal | Priority |
|---|---|---|
| **Automotive Technology articles:** EV systems, charging, renewable/solar charging, future mobility; all Arabic/English/French/Portuguese versions | Named author plus named technical reviewer, linked bios and review scope; claim-level citations; assumptions, limitations, reviewed date, and localized standards/regulatory sources. | **Highest** — technical and safety-sensitive subject matter. |
| **Articles and analysis** (`articles*.html`, `articles.json`, renderer in `script.js`) | Real named author for each original article; an article-specific thesis/evidence/conclusion; direct source URLs and dates; no generic “expert briefing” label without expert authorship/review. Provide stable URLs rather than only list anchors. | **Highest** — largest gap between displayed editorial authority and provenance. |
| **Comparisons and model/catalog pages** (`compare*.html`, `models*.html`, `cars.json`, car-detail pages) | Data/editorial owner; exact year, trim, market and source-access date; disclose how “availability,” performance, and safety comparisons were compiled; link exact OEM/regulator test pages. An individual byline is optional for mechanically factual catalog entries if the data editor and method are visible. | **High** — influences purchasing and safety perceptions. |
| **Company pages** (`companies*.html`) | Identify whether entries summarize company disclosures or AutoAtlas analysis; cite the original annual report/specification and date; label opinions and unverified claims. | **Medium–High** |
| **About pages** (`about*.html`) | Name the accountable publisher/operator and editorial lead; show real staff/reviewer bios and explain independence, source policy, review, update, correction, sponsorship, and automation practices. | **Highest** — site-wide foundation. |
| **Contact, Privacy, Terms** (`contact*.html`, `privacy*.html`, `terms*.html`) | Keep the responsible entity and contact channel consistent across pages and languages; identify who handles editorial/correction and privacy inquiries. Ensure legal/privacy descriptions reflect actual site operation and ad/analytics behavior. | **High** — basic accountability and trust. |

## Prioritized roadmap

### P0 — Establish accountable authorship and fix the article provenance gap

1. Decide who the actual publisher is (individual, business, nonprofit, or other entity) and publish accurate identity/contact details appropriate to that operation. Do not claim a team or institutional status that does not exist.
2. Create linked author and reviewer profiles containing real names, relevant experience, qualifications, geographic/technical scope, disclosures, and work history. For high-voltage, safety, charging-infrastructure, and lifecycle-emissions claims, use an appropriately qualified reviewer and state what was reviewed.
3. Audit the 65-entry article corpus. Keep only pieces with topic-specific evidence and meaningful original synthesis. Replace generic template filler with substantive researched articles, or present these as short topic briefs rather than “expert” articles. Preserve sources as direct URLs with document dates and support each consequential claim inline.
4. Add stable URLs for substantial articles; show author, publication date, update/review date, and corrections on the page. Align JSON-LD `author`, `datePublished`, `dateModified`, and publisher fields with visible, accurate page content.

### P1 — Publish an editorial and correction policy

Publish a concise policy covering: source hierarchy; how specifications and calculations are verified; handling of conflicting sources; scope of technical review; market/model-year rules; update triggers; correction reporting and a dated correction log; advertising, affiliate, sponsorship, gifts, and conflicts; and use of automation/AI where material to readers. Link it from each page footer and the About page. Google specifically recommends clear “who,” “how,” and “why” context, and accurate author information where expected. [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Google guidance on AI-generated content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=en).

### P2 — Make the strongest expertise repeatable across the site

1. Apply the evidence pattern from the best technology guides to every technical section: define the system boundary, report units and assumptions, distinguish measured/official/estimated values, explain uncertainty and failure cases, and cite sources adjacent to claims.
2. For all catalog and comparison values, add model year, trim, market, date checked, precise source URL, and a data-status label (manufacturer claim, regulator result, independent test, or AutoAtlas calculation).
3. For safety and regulated topics, cite the applicable jurisdiction, standard/regulation edition, and effective date. Avoid turning a global or manufacturer-level statement into a claim about every model/market.
4. Establish localization review so French and Portuguese pages are not just translated prose: use native-language editing and locally applicable terms, sources, and regulation references.

### P3 — Build original, citable authority over time

1. Publish a small number of original assets that AutoAtlas can support well: transparent calculators with downloadable assumptions, comparison datasets with provenance, repeatable test protocols, or carefully documented field studies.
2. If building an expert panel or external review network, recruit real practitioners and disclose each person’s role, compensation, and scope. Do not use a logo wall or “expert reviewed” badge without an auditable review record.
3. Seek genuine references from automotive engineering educators, research groups, standards communities, and credible publishers by producing useful, maintainable material. Do not buy links or manufacture endorsements.
4. Use Search Console and analytics after implementation to identify which source-led pages satisfy reader needs; separately audit inbound links and brand mentions before making claims about external reputation.

## Highest-impact improvements for long-term organic growth

1. **Real authorship and technical review tied to real qualifications.** This is the clearest missing trust signal, particularly for technical and safety-related guidance.
2. **Original, useful material instead of volume built from shared templates.** Google warns against producing many low-originality pages mainly to capture search traffic; its guidance emphasizes usefulness and added value rather than how content was produced. [Google helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [scaled-content / AI guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content?hl=en).
3. **Claim-level, current, primary citations with market/year context.** This improves readers’ ability to check facts and reduces ambiguity in car specifications, safety, energy economics, and regulation.
4. **Editorial accountability and visible maintenance.** A real publisher identity, correction log, update dates, disclosure policy, and review process provide durable evidence that the site can be held accountable.
5. **Demonstrated experience and repeatable data.** Original measurements, transparent methods, and carefully scoped field reports distinguish the site from a summary-only resource.

## Audit limits

This audit inspected repository content and code plus public comparison/guidance pages. It did not verify that the listed contact details belong to the publisher, crawl every URL on the live domain, test external citations for availability, review Search Console performance, measure backlinks/mentions, interview contributors, or validate every technical claim. Those checks require live access and, for credentials and identity, confirmation from the responsible operator.
