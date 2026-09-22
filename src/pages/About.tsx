import PageHeader from '../components/PageHeader'
import { socialLinks } from '../data/links'

function About() {
  return (
    <section className="page prose">
      <PageHeader
        eyebrow="About"
        title="Joe Sloyan"
        intro="Full stack software developer at Epic, based in Wisconsin."
      />

      <p>
        I build software across the stack, from the interface down to the data
        behind it. This site collects the things I have built and the write-ups
        that go with them.
      </p>

      <h2>Get in touch</h2>
      <p>
        The best places to reach me are GitHub and LinkedIn. I am always happy to
        talk about projects, tooling, or anything else on this site.
      </p>

      <div className="social-links">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            className="action"
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  )
}

export default About
