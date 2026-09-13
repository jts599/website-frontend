import { Link } from 'react-router-dom'

type LinkCardProps = {
  label: string
  description?: string
  to?: string
  href?: string
}

function LinkCard({ label, description, to, href }: LinkCardProps) {
  const content = (
    <>
      <span className="link-card__label">{label}</span>
      {description ? (
        <span className="link-card__description">{description}</span>
      ) : null}
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http')

    return (
      <a
        className="link-card"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return (
    <Link className="link-card" to={to ?? '/'}>
      {content}
    </Link>
  )
}

export default LinkCard
