# ACTIVA Workplace DNA Explorer

Next.js + TypeScript + Tailwind CSS prototype for exploring workplace DNA profiles and matching ACTIVA workplace scenes.

## Scripts

```bash
npm run dev
npm run build
```

## Deployment

This project is configured for GitHub Pages through `.github/workflows/deploy-pages.yml`.

After pushing to `main`, GitHub Actions builds a static export and publishes it to:

```text
https://shawnfan303.github.io/activa-workplace-dna-explorer/
```

## Data

The first version uses local scene data at `data/workplace-scenes.json`. Questionnaire answers are stored in `localStorage`.

## Scene Image Preview

Optimized ACTIVA scene images are stored in `public/images/scenes/`.

Open the static preview page:

```text
public/scene-preview.html
```

Regenerate optimized scene images and preview HTML:

```bash
python scripts/optimize_scene_images.py
```
