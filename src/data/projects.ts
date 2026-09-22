export type Project = {
  slug: string
  title: string
  description: string
  /** Optional link to the live/deployed project. */
  liveUrl?: string
  /** Optional link to a source repository. */
  repoUrl?: string
  /** Optional slug of a related blog post (matches a file in src/content/blog). */
  blogSlug?: string
  year?: string
}

// Array order is the curated display order on the homepage.
export const projects: Project[] = [
  {
    slug: 'stargazer',
    title: 'Stargazer',
    description:
      'Plan better nights under the stars. Stargazer combines sunset and twilight timing, moonrise and moonset, and moon illumination into a single nightly stargazing score.',
    // Built from the Stargazer submodule and served under the site base path.
    liveUrl: `${import.meta.env.BASE_URL}stargazer/`,
    blogSlug: 'scoring-stargazing-nights',
    year: '2026',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
