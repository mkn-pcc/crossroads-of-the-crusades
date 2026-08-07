# The Crossroads of the Crusades

A browser-based Year 8 History investigation game designed to be used alongside the supplied **Perspectives of the Crusades - Activity 2** worksheet.

Students explore a fictional medieval town hub and interview six historically informed composite characters representing:

- the Byzantine Empire
- Pope Urban II and the western Church
- knights
- merchants
- commoners
- Muslim communities and defenders

Each interview unlocks an explicit worksheet checkpoint. Completing all six perspectives opens a word-bank decoder and critical-thinking planner. Progress is saved in the browser on the student's device.

## Classroom use

1. Give students the printed Activity 2 worksheet.
2. Ask them to open the game and visit all six locations.
3. Students should write on the worksheet whenever a checkpoint appears.
4. The evidence ledger supports Tasks 3 and 4 without writing the final responses for students.

The town and characters are reconstructed teaching devices, not direct historical quotations or a claim that all six perspectives met in one place and time. The content moves across the First, Third and Fourth Crusades.

## Content editing

All dialogue, checkpoint and synthesis content is kept in:

```text
app/game-data.ts
```

The game interface is in `app/page.tsx`; visual styling is in `app/globals.css`; and the pixel-art environments and portraits are in `public/game-assets/`.

## Run locally

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

## GitHub Pages

The repository includes a static Vite entry point and a GitHub Pages workflow.

```bash
npm ci
npm run build:github
```

The static output is written to `github-pages-dist/`. When this project is pushed to the `main` branch of a GitHub repository with Pages enabled through GitHub Actions, `.github/workflows/pages.yml` builds and publishes the game automatically.

## Source grounding

The prototype follows the supplied class PowerPoint, reading, information cards, information chart and Activity Option 2 worksheet. It also corrects or qualifies several oversimplifications in those materials, including Byzantine control of Jerusalem, the spiritual privilege proclaimed at Clermont and the commercial and political sequence of the Fourth Crusade.
