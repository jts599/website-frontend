# website-frontend

Front-end for my personal website.

## Development

```bash
npm install
npm run dev
```

A dev container is available in `.devcontainer/devcontainer.json` for React + TypeScript development.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages.
