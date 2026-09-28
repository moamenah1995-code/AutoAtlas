# AutoAtlas Copilot Instructions

## Tooling and validation

- This is a dependency-free static site. There is no `package.json`, build system, linter, or automated test suite, so no build, lint, full-test, or single-test command is configured.
- For a local browser check, serve the repository root (for example, `python -m http.server 8080`) and open the affected `.html` page through the server. Use port 8080 to match [.vscode/launch.json](/C:/Users/user/OneDrive/Desktop/ALikhtyar/.vscode/launch.json)'s "Launch Chrome against localhost" debug config. Do not validate routing from `file://` URLs.
- Use the browser to exercise changed controls and language links. Check the console for errors, keyboard focus/activation, and narrow-screen layout when changing shared UI.
- A specialized [site-maintainer agent](/C:/Users/user/OneDrive/Desktop/ALikhtyar/.github/agents/site-maintainer.agent.md) and a [website-accuracy-icons skill](/C:/Users/user/OneDrive/Desktop/ALikhtyar/.github/skills/website-accuracy-icons/SKILL.md) already exist for this repo; invoke the skill for content-accuracy or icon/link/control reliability work instead of improvising an equivalent procedure.
- `README.md`, `TODO.md`, and `GOOGLE_SEARCH_CONSOLE.md` (in Arabic) hold the deployment, publishing-checklist, and Search Console context; consult them before changing deployment or SEO-submission guidance.

## Architecture

- All deployable content is root-level static HTML. `index.html` is Arabic; English, Portuguese, and French use `en.html`, `pt.html`, and `fr.html`. Inner pages use the same convention: the Arabic page has no suffix, followed by `-en`, `-pt`, and `-fr`.
- `style.css` is the single shared stylesheet. It defines the design tokens, responsive breakpoints, focus states, high-contrast mode, and components used by every page.
- `script.js` is the shared client-side application layer, loaded by nearly every page with `defer`. It owns the car/company/article data, localized text, interactive comparison and search UI, navigation/footer generation, accessibility controls, lazy images, and home-page enhancements. Its DOM selectors must remain safe on pages that do not contain the corresponding feature.
- Feature landing pages use `body[data-page]` such as `companies`, `models`, `compare`, `technology`, and `about`; their headers contain an empty `.main-nav` that `script.js` populates. Existing home and legal pages retain their own structural markup, then shared script behavior localizes links and enhancements.
- `sitemap.xml` and `robots.txt` use the GitHub Pages base URL `https://moamenah1995-code.github.io/AutoAtlas/`. The manifest, canonical URLs, Open Graph URLs, structured data, and `hreflang` links follow that same base.
- GitHub Pages deploys the repository root on pushes to `main`. Both `.github/workflows/deploy.yml` and `.github/workflows/pages.yml` currently deploy the same artifact; keep them aligned when deployment behavior changes.

## Repository conventions

- Keep all four locale variants synchronized for shared navigation, controls, legal content, and language-switch targets. Preserve `lang` and `dir="rtl"` on Arabic pages and `dir="ltr"` where present on the other locales.
- When adding a localized page family, add its four files and update both `pageVariants` in `initLanguageLinks` and `pages` in `initSiteNavigation` in `script.js`; otherwise language switching or generated navigation will route incorrectly.
- Existing localized links are rewritten at runtime by `initLanguageLinks`. Use the established Arabic base names (for example, `privacy.html` and `index.html#...`) in static markup so that this rewrite can select the active locale.
- Keep interactive markup compatible with the shared selectors and generated UI: use stable IDs, `type="button"` for buttons, and update `script.js` only when the element exists on every path where its code executes. Re-query elements after code that generates or replaces markup, matching the existing initialization pattern.
- Follow the shared CSS component and custom-property vocabulary instead of page-specific inline styling. Preserve visible `:focus-visible` states, meaningful image `alt` text, and ARIA labels for icon-only controls.
- Vehicle details are intentionally qualified by market, model year, trim, and test method. Do not turn general sources into exact specifications, prices, reliability claims, or safety results. Keep source names and URLs with the claim they support; external links use `target="_blank"` with `rel="noopener noreferrer"`.
- For indexed pages, keep SEO metadata locale-specific and internally consistent: title, description, canonical URL, Open Graph URL, and the four `hreflang` alternates. Add or remove indexed pages in `sitemap.xml`; update `robots.txt` only if the sitemap location or crawl policy changes.
- Preserve the site’s lightweight static architecture. Do not introduce a framework, bundler, or dependency tooling without an explicit request.
