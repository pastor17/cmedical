# ChinaCare · China Medical Portal

> An English-first, one-stop platform that helps international patients access China's hospitals — from choosing the right hospital, to booking, teleconsultation, payment, and follow-up care.

Built with [Hugo](https://gohugo.io) as a pure static site, deployed to **GitHub Pages** via GitHub Actions (this branch: `medical`).

## Branches

- **`medical`** (this branch) — the ChinaCare medical portal (Hugo site).
- **`master`** — a Traditional Chinese Medicine (TCM) introduction site, separate from the medical portal.

## What's here

- **Journey** — the full care path: Choose → Book → Consult → Pay → Visit → Recover (+ Prepare).
- **Specialties** — 12 specialty hubs that aggregate hospitals, treatment guides, cost guides, and patient stories.
- **Hospitals** — verified-style profiles of Grade III-A hospitals with international departments.
- **Costs** — transparent, indicative cost ranges + a front-end cost estimator.
- **Patient Stories** — real, illustrative experiences.
- **TCM** — plain-English explainers of Traditional Chinese Medicine.
- **Tools** — cost estimator, journey checklist, remote-consultation funnel.

## Local development

Requires Hugo (Extended, v0.156+ for the data interfaces used).

```bash
hugo server -D     # dev server with hot reload at http://localhost:1313/
hugo --minify      # production build into public/
```

## Content structure

```
content/
  journey/       # care-journey stages (choose/register/consult/pay/visit/recover/prepare)
  hospitals/     # hospital profiles (booking + payment structured fields)
  specialties/   # 12 specialty landing pages (aggregate related content)
  guides/        # treatment guides
  cost/          # cost guides
  stories/       # patient stories
  tcm/           # TCM explainers
data/
  stages.yaml    # journey stage metadata
  specialties.yaml
  cities.yaml
  payment.yaml
layouts/         # Hugo theme (adapted for a medical portal)
assets/          # css + js (checklist, cost estimator)
```

## Deploy

Pushes to `medical` trigger `.github/workflows/hugo.yml`, which builds with Hugo 0.165.0 and deploys to GitHub Pages (Source: GitHub Actions).

> **Note:** All hospital, pricing, and policy details are indicative and subject to change. Always verify directly with the hospital before acting. See `content/disclaimer.md`.
