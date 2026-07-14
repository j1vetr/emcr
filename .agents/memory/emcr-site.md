---
name: EMCR Medikal Site Architecture
description: Key decisions for the EMCR Medikal React+Vite multi-page site
---

## Routes
- `/` Home (simplified — no device trio, video showcase, or trust section)
- `/hakkimizda` → Hakkimizda
- `/urunler/neogen-plasma` → NeoGenPlasma
- `/urunler/ultraclear` → UltraClearPage
- `/etkinliklerimiz` → Etkinliklerimiz
- `/basinda-biz/sosyal-medyada-biz` → SosyalMedyada
- `/teknik-destek` → TeknikDestek

## Shared Components
- `src/components/Navbar.tsx` — transparent only on home at top; hover dropdowns; mobile accordion
- `src/components/Footer.tsx` — id="contact", wouter Links, Instagram only

## Design Rules (enforced by user)
- Teal (`rgba(79,195,195,*)`) for NeoGen; sky-400 for UltraClear — do NOT swap
- No EVO product, no LinkedIn, no YouTube — Instagram only
- Dark navy `#080c18`/`#070b17` background, Space Grotesk font-display

## Asset Alias
`@assets/` → `../../attached_assets/` (workspace root, via vite.config.ts)

## Instagram Embed
SosyalMedyada.tsx has `REPLACE_WITH_POST_ID` placeholder in the iframe src — user must update this manually.

## Contact Form
TeknikDestek form uses `mailto:info@emcr.com.tr` handler, no backend required.

**Why:** Static site with no API for contact forms; mailto is simplest reliable approach.
