import type { ComponentType } from 'react'

export type Post = {
  slug: string
  title: string
  date: string
  summary: string
  projectSlug?: string
  Component: ComponentType
}

// Every .mdx file in src/content/blog becomes a post. Frontmatter is exposed
// by remark-mdx-frontmatter; the default export is the rendered post body.
const modules = import.meta.glob<
  {
    frontmatter: {
      title: string
      date: string
      summary: string
      project?: string
    }
    default: ComponentType
  }
>('../content/blog/*.mdx', { eager: true })

export const posts: Post[] = Object.entries(modules)
  .map(([path, module]) => {
    const slug = path.split('/').pop()!.replace(/\.mdx$/, '')
    const { title, date, summary, project } = module.frontmatter

    return {
      slug,
      title,
      date,
      summary,
      projectSlug: project,
      Component: module.default,
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}

export function formatPostDate(date: string): string {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date

  return parsed.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
