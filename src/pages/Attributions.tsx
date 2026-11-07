import PageHeader from '../components/PageHeader'

function Attributions() {
  return (
    <section className="page prose">
      <PageHeader eyebrow="Credits" title="Attributions" />

      <p>Designed by Joe Sloyan with assets from:</p>

      <ul>
        <li>
          <a href="https://www.freepik.com/" target="_blank" rel="noreferrer">
            Freepik
          </a>{' '}
          — leaf, tree and planet illustrations.
        </li>
        <li>
          <a href="https://fonts.google.com/" target="_blank" rel="noreferrer">
            Google Fonts
          </a>{' '}
          — Fraunces, Inter and IBM Plex Mono (SIL Open Font License).
        </li>
      </ul>
    </section>
  )
}

export default Attributions
