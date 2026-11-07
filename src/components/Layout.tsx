import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { navLinks, socialLinks } from '../data/links'
import { useTheme } from '../theme'

function Layout() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="layout">
      {isHome ? null : (
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

        <ThemeToggle theme={theme} onToggle={toggle} />
        </header>
      )}

      <main className={isHome ? 'site-main site-main--home' : 'site-main'}>
        <Outlet />
      </main>

      {isHome ? null : (
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
        <p>
          <Link className="site-footer__link" to="/attributions">
            &copy; {new Date().getFullYear()} Joe Sloyan
          </Link>
        </p>
        </footer>
      )}
    </div>
  )
}

export default Layout
