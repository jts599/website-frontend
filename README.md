# website-frontend

Front-end for my personal website.

## Development

```bash
npm ci
npm run dev
```

A dev container is available in `.devcontainer/devcontainer.json` for React + TypeScript development.

### Pi coding agent

The dev container installs [Pi coding agent](https://pi.dev) and configures its
Novita provider. Before rebuilding the container, place the Novita API key in
`%USERPROFILE%\.novita-key` on a Windows host. The file is mounted read-only at
`/home/node/.novita-key` for the container's `node` user; it is resolved only
when Pi sends a request and is never copied into the repository or Pi's auth
file.

Two Novita models are configured for a plan-then-implement workflow:
`deepseek/deepseek-v4.1-flash` for planning (strong reasoning, large output
budget) and `zai-org/glm-5.3-flash` for implementation (fast and cheap). Run
Pi with either:

```bash
pi --provider novita --model deepseek/deepseek-v4.1-flash   # planning
pi --provider novita --model zai-org/glm-5.3-flash          # implementation
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages.
