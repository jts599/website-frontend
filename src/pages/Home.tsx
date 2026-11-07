import FloatingLinks from '../components/FloatingLinks'
import { DarkScene, LightScene } from '../components/HomeScene'
import { InternalLink } from '../components/InternalLink'
import ThemeToggle from '../components/ThemeToggle'
import { useTheme } from '../theme'

function Home() {
  const { theme, toggle } = useTheme()

  return (
    <section className="home">
      <div className="home__scenes" aria-hidden="true">
        <LightScene />
        <DarkScene />
      </div>

      <div className="home__content">
        <h1 className="home__name">Joe Sloyan</h1>
        <p className="home__role">
          Full Stack Developer at{' '}
          <a href="https://www.epic.com/" target="_blank" rel="noreferrer">
            Epic
          </a>
        </p>
      </div>

      <FloatingLinks />

      <div className="home__actions">
        <InternalLink />
        <ThemeToggle theme={theme} onToggle={toggle} />
      </div>
    </section>
  )
}

export default Home
