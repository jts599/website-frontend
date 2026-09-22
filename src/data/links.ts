export type NavLink = {
  label: string
  to: string
}

export type SocialLink = {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  {
    label: 'Projects',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Blog',
    to: '/blog',
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
