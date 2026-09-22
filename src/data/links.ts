export type NavLink = {
  label: string
  to: string
  description: string
  showOnHome?: boolean
}

export type SocialLink = {
  label: string
  href: string
}

export type ProjectLink = {
  label: string
  description: string
  href: string
}

export const navLinks: NavLink[] = [
  {
    label: 'About',
    to: '/about',
    description: 'Who I am and what I work on.',
  },
  {
    label: 'Projects',
    to: '/projects',
    description: 'A selection of things I have built.',
    showOnHome: false,
  },
  {
    label: 'Image Generator',
    to: '/image-generator',
    description: 'An experimental playground for generating images.',
    showOnHome: false,
  },
  {
    label: 'Contact',
    to: '/contact',
    description: 'Ways to get in touch with me.',
  },
]

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/jts599',
  },
  {
    // Placeholder — replace with the real profile URL later.
    label: 'LinkedIn',
    href: '#',
  },
]

export const projects: ProjectLink[] = [
  {
    label: 'Stargazer',
    description:
      'Plan better nights under the stars with sun, moon, and twilight data.',
    // Served from the Stargazer submodule build, bundled under the site base.
    href: `${import.meta.env.BASE_URL}stargazer/`,
  },
]
