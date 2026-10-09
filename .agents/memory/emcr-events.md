---
name: EMCR event photos
description: Real event photo storage and page structure for Etkinliklerimiz
---

Photos live in `artifacts/emcr-web/public/events/{slug}/` with numbered filenames (1.jpg, 2.jpg, ...).

Six confirmed events (2025-2026):
- İstanbul UltraClear Workshop
- İstanbul NeoGen Workshop
- Almanya UltraClear eğitimi
- İngiltere NeoGen eğitimi
- Paris IMCAS 2026
- Paris IMCAS 2025

**Why:** Avoid inventing event data. Only use folder names from the user-supplied ZIP as event titles.

**How to apply:** To add a new event, copy photos into a new slug folder under public/events/, then add an entry to the events array in Etkinliklerimiz.tsx.

Normalize EXIF orientation before removing image metadata during optimization.

**Why:** Some customer ZIP photos store portrait orientation only in EXIF. Stripping it without rotating pixels made them appear sideways, even though the dimensions looked landscape.

**How to apply:** Auto-orient original photos before resizing and stripping metadata. Judge orientation visually rather than assuming width greater than height means landscape.
