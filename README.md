# Dumpster Size Calculator — Firefox extension (DRAFT, ready for your review)

**Status (2026-10-14):** Working prototype, NOT submitted. Built for the "build it together" step you asked for after the Ahrefs mining run. You decide the final wording, then you create the AMO developer account and upload — the agent does not submit.

## Why this is genuinely useful (your rule, 2026-10-14)
- The calculator is the product: 4 questions → a size recommendation with dimensions + pickup-load capacity + why.
- The site link is secondary: one "Full size guide ↗" link + one call link in the footer. No popups, no forced clicks, no lead capture.
- Works for anyone, anywhere — not just Fresno. The Fresno links are the local booking path, not the reason the tool exists.

## What it does
1. Project type (11 options: small cleanout → demolition/commercial)
2. Debris amount (pickup-truck loads: 1–2 / 3–5 / 6–9 / 10+)
3. Material (light & bulky / mixed / heavy — heavy shows a weight-limit warning, no invented tonnage)
4. Access (standard vs tight/gated — tight shows the 10-yard compact-delivery note from the site's own FAQ)
- Logic: start from the project-type base size, size up until capacity covers the estimated loads.
- Between sizes: recommends the step-up size (a second rental costs more than unused space).

## Sizes — matched to the site, not invented
All 6 site sizes (site standard 2026-10-12: 10, 12, 15, 20, 30, 40), dimensions + pickup loads copied from the site's own size guide (dumpsterrentalsfresno.com/dumpster-sizes-fresno/, checked 2026-10-14):
- 10-yard — 12′ × 8′ × 3.5′ — ~3 loads
- 12-yard — 14′ × 7.5′ × 3.5′ — ~4 loads
- 15-yard — 16′ × 7.5′ × 4′ — ~5 loads
- 20-yard — 22′ × 8′ × 4.5′ — ~6 loads
- 30-yard — 22′ × 8′ × 6′ — ~9 loads
- 40-yard — 22′ × 8′ × 8′ — ~12 loads

Note: the first chat description said "10/20/30/40" — the prototype uses all 6 site sizes so the tool never contradicts the site.

## What it deliberately does NOT do
- **No prices** — site pricing rule: never exact prices, ranges only. The extension shows no prices at all.
- **No data collection** — no network calls, no analytics, no storage, no permissions. Manifest declares `data_collection_permissions: ["none"]` (required by AMO for new add-ons since Nov 2025).
- **No remote code, no bundler, no minification** — plain `popup.html / popup.js / popup.css`. Nothing to hide from AMO reviewers; no source-zip needed.
- **No fabricated claims** — no delivery counts, no licensing/founding-year claims, no weight limits the site doesn't publish.

## Files
- `manifest.json` — Manifest V3, Firefox-only (`browser_specific_settings.gecko`), add-on ID placeholder `dumpster-size-calculator@dumpsterrentalsfresno.com`
- `popup.html` / `popup.js` / `popup.css` — the whole tool
- `icons/icon-48.png`, `icon-96.png`, `icon-128.png` — simple green-dumpster placeholder icons (replace with the brand logo crop if you prefer)

## Try it before submitting (2 minutes, no account needed)
1. Firefox → `about:debugging` → "This Firefox" → "Load Temporary Add-on" → pick `manifest.json`.
2. Click the toolbar icon, run through a garage cleanout + 6–9 loads → expect 20-yard; then a whole-house + 10+ loads → expect 40-yard.
3. Close Firefox and it's gone (temporary load) — nothing installed permanently.

## Still needed before AMO submission (your decisions)
- [ ] Your AMO developer account (addons.mozilla.org) — you create it; agent never handles store accounts.
- [ ] Final name/description approval (draft in `AMO-LISTING.md`).
- [ ] Icon choice: keep placeholder or swap in the brand logo crop.
- [ ] Zip the folder contents (not the parent folder) and upload as a Listed add-on. AMO review typically takes 1–7 days; reviewers check permissions vs usage, no obfuscated code, privacy matches behaviour.

## What NOT to do
- Do NOT submit a Chrome version — Chrome Web Store charges a $5 one-time developer fee, which breaks your free-only rule. Firefox (AMO) is free.
