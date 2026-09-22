// Builds the Stargazer submodule (a standalone Vite app) and copies its
// production bundle into the website's `dist/` so it is published alongside
// this site on GitHub Pages (served from `<base>/stargazer/`).
//
// If the submodule has not been checked out, the script warns and exits
// successfully so a plain `npm run build` still works for the main site.

import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, rmSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const appDir = join(repoRoot, 'stargazer', 'stargazer-react')

// GitHub Pages serves project sites from `/<repo-name>/`, and the main
// site's Vite base matches that. Reuse the same value here so Stargazer's
// assets resolve under `/<repo-name>/stargazer/`.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = repoName ? `/${repoName}/stargazer/` : '/stargazer/'

if (!existsSync(appDir)) {
  console.warn(
    `[stargazer] Submodule not found at ${appDir}; skipping Stargazer build.\n` +
      '            Run `git submodule update --init --recursive` to enable it.',
  )
  process.exit(0)
}

function run(command, args, cwd) {
  execFileSync(command, args, { cwd, stdio: 'inherit' })
}

if (!existsSync(join(appDir, 'node_modules'))) {
  console.log('[stargazer] Installing dependencies...')
  run('npm', ['ci'], appDir)
}

console.log(`[stargazer] Building with base "${base}"...`)
run('npm', ['run', 'build', '--', `--base=${base}`], appDir)

const sourceDist = join(appDir, 'dist')
const targetDist = join(repoRoot, 'dist', 'stargazer')

rmSync(targetDist, { recursive: true, force: true })
cpSync(sourceDist, targetDist, { recursive: true })
console.log(`[stargazer] Copied bundle to ${targetDist}`)
