import LinkCard from '../components/LinkCard'
import { navLinks, socialLinks } from '../data/links'

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
        {navLinks.map((link) => (
          <LinkCard
            key={link.to}
            label={link.label}
            description={link.description}
            to={link.to}
          />
        ))}
      </nav>

      <div className="social-links">
        {socialLinks.map((link) => (
          <LinkCard key={link.label} label={link.label} href={link.href} />
        ))}
      </div>
    </section>
  )
}

export default Home
