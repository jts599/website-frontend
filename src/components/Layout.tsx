import { Link, Outlet } from 'react-router-dom'
import { navLinks, socialLinks } from '../data/links'

function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <Link className="site-header__brand" to="/">
          Joe Sloyan
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__social">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Joe Sloyan</p>
      </footer>
    </div>
  )
}

export default Layout
