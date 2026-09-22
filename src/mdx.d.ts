// Ambient types for MDX blog posts. `remark-mdx-frontmatter` exposes the
// YAML frontmatter as a named `frontmatter` export, and MDX provides the
// post body as the default export (a React component).
declare module '*.mdx' {
  import type { ComponentType } from 'react'

  export type PostFrontmatter = {
    title: string
    date: string
    summary: string
    project?: string
  }

  export const frontmatter: PostFrontmatter
  const MDXComponent: ComponentType
  export default MDXComponent
}
