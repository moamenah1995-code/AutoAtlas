---
name: website-accuracy-icons
description: "Improve the ALikhtyar/AutoAtlas static website's content accuracy and make icons, links, and interactive controls work reliably. Use for Arabic, English, French, or Portuguese HTML pages; navigation and icon issues; broken buttons; misleading car data; accessibility checks; or visual/browser verification."
argument-hint: "Describe the page, inaccurate content, or icon/control that needs fixing"
user-invocable: true
---

# Website Accuracy and Icon Reliability

## Purpose

Maintain the static AutoAtlas website without introducing a framework or build system. Produce focused fixes that make displayed information defensible, navigation predictable, controls usable, and decorative icons meaningful without reducing accessibility.

## When to Use

- A page contains inaccurate, vague, duplicated, or unsupported vehicle information.
- An icon, emoji, link, button, language switcher, search control, comparison control, chat control, or back-to-top control does not respond correctly.
- A visual control looks interactive but has no valid destination or event handler.
- A change must remain consistent across Arabic, English, French, and Portuguese pages.
- A frontend change needs browser verification, responsive checks, or accessibility review.

## Working Rules

- Preserve the lightweight static architecture and existing file names.
- Read the relevant HTML, `style.css`, and `script.js` before editing.
- Treat `script.js` as the shared behavior source and verify that selectors exist on every page where the script runs.
- Do not present a generic or estimated vehicle fact as official. Keep source names and URLs tied to the claim they support.
- Use a link for navigation and a button for an in-page action. Do not use `href="#"` as a placeholder.
- Every meaningful icon-only control needs an accessible name, a visible focus state, and a working keyboard path. Decorative icons must use `aria-hidden="true"` or be accompanied by equivalent text.
- Keep translations and directionality intact. Do not repair one locale by silently changing another locale's content.
- Make the smallest change that fixes the observed behavior; avoid unrelated redesigns.

## Procedure

### 1. Establish the local failure

1. Identify the exact page, control, icon, or claim named by the request.
2. Search nearby HTML for its `id`, class, `href`, `data-*` attributes, `aria-*` attributes, and visible label.
3. Search `script.js` for the matching selector and event listener. Search `style.css` for the matching state and focus styles.
4. State one falsifiable hypothesis, such as: "The icon is visible but inert because it is an anchor with a placeholder destination and no listener."
5. Choose the cheapest check that can disprove it: activate the control in a browser, inspect the destination, or run a targeted selector check.

### 2. Classify the correction

- **Accuracy issue:** verify the claim against an authoritative source already used by the project. If no reliable source supports a precise value, replace it with an explicitly qualified statement rather than inventing precision.
- **Navigation issue:** use a valid relative page URL or section ID, preserve the current language, and confirm the destination exists.
- **Action issue:** use a typed button with a stable `id` or `data-action`, attach one listener, handle empty and error states, and keep the action usable with Enter and Space.
- **Icon issue:** decide whether the icon is decorative, a textual symbol, or an icon-only control. Preserve a text label when it carries meaning; otherwise add an accessible name and tooltip where appropriate.
- **Translation issue:** update the same control and state in all affected locales, including labels, `aria-label`, placeholders, status messages, and direction-sensitive layout.

### 3. Implement the focused fix

1. Edit only the owning HTML, CSS, or JavaScript surface unless a shared behavior genuinely requires a shared change.
2. Keep IDs and selectors stable where possible.
3. For generated buttons, set `type="button"`, attach the handler when the element is created, and maintain active, disabled, loading, empty, and error states.
4. For external source links, use the existing `target="_blank"` and `rel="noopener noreferrer"` pattern.
5. For images used as meaningful content, retain useful `alt` text and add a fallback or failure state when remote assets may be unavailable.

### 4. Validate behavior and accuracy

Run the narrowest available check immediately after the edit:

- Load the affected HTML page locally and activate the repaired control.
- Check that every targeted link resolves to an existing page or section.
- Check the browser console for JavaScript errors and failed resource requests.
- Test keyboard focus, Enter/Space activation, and visible focus styling.
- Test the same workflow at desktop and narrow mobile widths.
- Check the affected control on Arabic, English, French, and Portuguese pages when it is shared.
- Confirm the displayed claim still matches its cited source and is not more precise than the evidence allows.

If browser tooling is unavailable, perform a static fallback check: verify selectors, event listeners, IDs, relative paths, ARIA names, and locale counterparts, then report that runtime verification was unavailable.

### 5. Completion checklist

Before reporting completion, confirm:

- The original control or claim is identified and the root cause is addressed.
- No placeholder links, dead buttons, duplicate listeners, or missing selectors remain in the touched path.
- Icons have the intended visual meaning and accessible names where required.
- Keyboard and responsive behavior remain usable.
- Locale-specific text and direction are preserved.
- Accuracy claims are sourced or explicitly qualified.
- A focused executable or browser validation was performed and its result is reported.
- Only relevant files changed; unrelated existing work was left untouched.

## Output Format

Return a concise report with:

1. Root cause and correction.
2. Files changed.
3. Browser or executable validation performed.
4. Remaining uncertainty, source limitations, or follow-up risk.
