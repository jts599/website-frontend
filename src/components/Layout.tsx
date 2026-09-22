import { Link, NavLink, Outlet } from 'react-router-dom'
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
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <nav className="site-footer__social" aria-label="Social">
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
        </nav>
        <p>&copy; {new Date().getFullYear()} Joe Sloyan</p>
      </footer>
    </div>
  )
}

export default Layout
