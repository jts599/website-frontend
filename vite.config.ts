import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The site is served from a custom domain (joesloyan.dev) at the root, so
  // assets must be referenced from "/" rather than "/<repo>/".
  base: '/',
  plugins: [
    {
      // MDX must run before the React plugin so its JSX output is transformed.
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
      }),
    },
    // Include .md/.mdx so the React plugin also transforms MDX output.
    react({ include: /\.(js|jsx|ts|tsx|md|mdx)$/ }),
  ],
  server: {
    // Bind to all interfaces so dev-container / VS Code port forwarding can reach it.
    host: true,
  },
})
