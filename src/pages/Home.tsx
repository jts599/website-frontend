import LinkCard from '../components/LinkCard'
import { navLinks, projects, socialLinks } from '../data/links'

function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Full Stack Software Developer at Epic</p>
      <h1>Joe Sloyan</h1>
      <p className="intro">
        I build software across the stack. This site is where I share what I am
        working on and experimenting with.
      </p>

      <nav className="card-grid" aria-label="Sections">
        {navLinks
          .filter((link) => link.showOnHome !== false)
          .map((link) => (
            <LinkCard
              key={link.to}
              label={link.label}
              description={link.description}
              to={link.to}
            />
          ))}
      </nav>

      <section className="projects">
        <h2 className="section-heading">Projects</h2>
        <div className="card-grid">
          {projects.map((project) => (
            <LinkCard
              key={project.label}
              label={project.label}
              description={project.description}
              href={project.href}
            />
          ))}
        </div>
      </section>

      <div className="social-links">
        {socialLinks.map((link) => (
          <LinkCard key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
    </section>
  )
}

export default Home
