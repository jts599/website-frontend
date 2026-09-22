import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section className="hero">
      <PageHeader
        eyebrow="Full Stack Software Developer at Epic"
        title="Joe Sloyan"
        intro="I build software across the stack. Below are a few things I have built, with write-ups on the interesting parts."
      />

      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}

export default Projects
