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
- The current site-wide direction is “Aydınlık Profesyonel”, superseding the old dark and product-specific accent palettes.
- No EVO product, no LinkedIn, no YouTube — Instagram only
 - The user requires the existing structure, section order, content, assets, animations, functionality and SEO to remain unchanged during the light-theme conversion. Do not restore previously removed cards.

 **Why:** The user explicitly asked for a palette-only conversion across all pages, not a redesign. This supersedes the earlier About-specific color direction.

 **How to apply:** Future theme refinements should preserve the existing layout and content, with the same light palette on shared components and all pages.

Use controlled white and ice-blue background changes to distinguish sections, rather than adding decorative separators.

**Why:** When offered several transition treatments, the user chose “kontrollü zemin değişimi”.

**How to apply:** Preserve this restrained section distinction across pages without adding new shapes, divider lines or content solely for decoration.

## Asset Alias
`@assets/` → `../../attached_assets/` (workspace root, via vite.config.ts)

## Instagram Embed
SosyalMedyada.tsx has `REPLACE_WITH_POST_ID` placeholder in the iframe src — user must update this manually.

## Contact Form
TeknikDestek form uses `mailto:info@emcr.com.tr` handler, no backend required.

**Why:** Static site with no API for contact forms; mailto is simplest reliable approach.
