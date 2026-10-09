# EMCR Medikal: Mobile Audit and Fix Plan

Scope: 320, 375, 390, 430, tablet, short landscape. Changes are responsive only. Desktop (lg and up), copy, assets, section order and the white/ice rhythm stay the same.

## Shared
| Area | Finding | Fix |
|---|---|---|
| Navbar | Toggle was 36px with a 16px icon. Drawer had no height limit or scroll. Logo could crowd the toggle at 320. | Toggle is now 48px (h-12) with a 22px icon, aria-expanded and a Turkish label. Drawer uses max-h calc(100dvh-88px) with overflow-y auto, locks body scroll and closes on Esc. Rows are min-h-12 with 15px text on mobile. Logo is capped at 58vw. |
| Footer | Instagram button was 36px. Links were short tap targets. The Contact column was squeezed in a 2 column grid. | Instagram button is now 44px. Links get min-h-9 on mobile. Contact spans full width below md. Gaps are tighter. |
| Global CSS | Decorative orbs could cause horizontal overflow. iOS zooms on inputs under 16px. | Added overflow-x clip on html and body, max-width on media, word wrapping on headings, and 16px form fields below 768px. |
| Galleries (Home x2, NeoGen, UltraClear) | Fixed 21/9 stage was too short on phones. 6 thumbnails per row were about 40px wide. Big index number overlapped the caption. | Stage is 4/3, then 16/9 at sm, then 21/9 at lg. Thumbnails show 3 per row, 6 at sm. ONCE/SONRA labels have tighter insets. The decorative number is hidden below sm. Arrows are 44px. Dark overlays are unchanged. |

## Pages
- **/**: The hero h1 had a 4rem minimum and overflowed at 320 to 390. Mobile now uses its own clamp and md+ keeps the original. Product logos were absolute bottom-20 and could collide with the CTAs on short screens. They now sit in the normal flow below md, and the scroll cue is hidden. NeoGen and UltraClear brand sections had an absolute 55/58% image behind the text. Below lg the image is now a stacked block (300 to 420px) and the side fade is hidden. Rings are sized with min() and floating chips are inset. min-h-screen now applies only at lg. The 60% white hero overlay is unchanged.
- **/hakkimizda**: Already responsive (min-h-[35vh], sm/md paddings). No changes needed.
- **/urunler/neogen-plasma**: The image-first hero used 92vh twice plus maxHeight 700. Below lg the vh minimums are removed and the device is capped at clamp(220px,44dvh,360px). Smaller h1 minimum and orb size. CTAs are h-12. Section gap reduced.
- **/urunler/ultraclear**: The absolute 52% device sat behind the text and buttons. Below lg it is now a stacked block above the copy (clamp 220 to 380px) and the left fade is hidden. Full-width CTA pair, smaller h1 minimum. 2910 section: smaller padding, treatment image min-h 300 on mobile, spec chips wrap. The 6 mode cards were already 2/3/6.
- **/etkinliklerimiz**: Fixed cover height of 420px is now clamp(240px,62vw,420px). Lightbox close button is 44px and image max-h uses 78dvh. Smaller h1 minimum.
- **/basinda-biz**: Tailwind sizes are already responsive. No changes needed.
- **/basinda-biz/sosyal-medyada-biz**: Empty blockquotes collapsed to 0 height until embed.js ran, and minWidth 260/280 overflowed at 320. Each embed now holds a visible fallback link to the post (min-h 240) that Instagram replaces on load, with minWidth 0. The integration is otherwise unchanged.
- **/teknik-destek**: Inputs went from 13.5px to 16px on mobile and from h-11 to h-12. Stats tiles have smaller padding and number size so the 2 column layout fits at 320.

## Limitations
- Root font size is 90%, so h-12 is 43.2px. That is about 44px but not exact.
- Instagram iframe height comes from Instagram. The featured post is still clipped at 520px as before.
- Not verified visually by me. Main owns the Playwright pass.
