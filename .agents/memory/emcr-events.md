---
name: EMCR event photos
description: Real event photo storage and page structure for Etkinliklerimiz
---

Photos live in `artifacts/emcr-web/public/events/{slug}/` with numbered filenames (1.jpg, 2.jpg, ...).

Six confirmed events (2025-2026):
- istanbul-ultraclear-2026 (4 photos, Workshop)
- istanbul-neogen-2026 (4 photos, Workshop)
- almanya-2026 (4 photos, Eğitim)
- ingiltere-2026 (4 photos, Eğitim)
- paris-2026 (4 photos, Kongre)
- paris-2025 (5 photos, Kongre)

**Why:** Avoid inventing event data. Only use folder names from the user-supplied ZIP as event titles.

**How to apply:** To add a new event, copy photos into a new slug folder under public/events/, then add an entry to the events array in Etkinliklerimiz.tsx.
