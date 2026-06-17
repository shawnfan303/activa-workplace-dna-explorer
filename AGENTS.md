# AGENTS.md

## Project Purpose

ACTIVA Workplace DNA Explorer is a Next.js prototype for diagnosing workplace needs and recommending ACTIVA office scene cards.

## Working Rules

- Use Traditional Chinese for business-facing copy.
- Keep the experience B2B, minimal, professional, white-based, and Aurora-red accented.
- Use local JSON data first:
  - `data/questions.json`
  - `data/workplace-scenes.json`
- Store quiz results in browser `localStorage`.
- Keep scoring logic in `lib/scoring.ts`.
- Keep scene recommendation logic in `lib/recommendations.ts`.
- Do not add a database or external service unless explicitly requested.

## Verification

Before handoff, run:

```bash
npm run build
```
