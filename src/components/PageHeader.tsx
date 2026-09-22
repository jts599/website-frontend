type PageHeaderProps = {
  eyebrow?: string
  title: string
  intro?: string
}

function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="page-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {intro ? <p className="intro">{intro}</p> : null}
    </header>
  )
}

export default PageHeader
