import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__head">
        <h2 className="project-card__title">{project.title}</h2>
        {project.year ? <span className="project-card__year">{project.year}</span> : null}
      </div>

      <p className="project-card__description">{project.description}</p>

      <div className="project-card__actions">
        {project.liveUrl ? (
          <a className="action action--primary" href={project.liveUrl}>
            View live
          </a>
        ) : null}

        {project.repoUrl ? (
          <a className="action" href={project.repoUrl} target="_blank" rel="noreferrer">
            Source
          </a>
        ) : null}

        {project.blogSlug ? (
          <Link className="action" to={`/blog/${project.blogSlug}`}>
            Read the write-up
          </Link>
        ) : null}
      </div>
    </article>
  )
}

export default ProjectCard
