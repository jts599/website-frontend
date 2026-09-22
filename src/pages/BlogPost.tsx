import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { formatPostDate, getPost } from '../data/posts'
import { getProject } from '../data/projects'

function BlogPost() {
  const { slug } = useParams()
  const post = slug ? getPost(slug) : undefined

  if (!post) {
    return (
      <section className="page">
        <PageHeader eyebrow="Blog" title="Post not found" intro="That post does not exist (yet)." />
        <Link className="action" to="/blog">
          Back to all posts
        </Link>
      </section>
    )
  }

  const project = post.projectSlug ? getProject(post.projectSlug) : undefined
  const PostBody = post.Component

  return (
    <article className="page">
      <PageHeader eyebrow="Blog" title={post.title} />
      <p className="post-meta">
        <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      </p>

      <div className="prose">
        <PostBody />
      </div>

      {project ? (
        <aside className="post-project">
          <span className="post-project__label">
            Part of <strong>{project.title}</strong>
          </span>
          {project.liveUrl ? (
            <a className="action action--primary" href={project.liveUrl}>
              View live
            </a>
          ) : null}
        </aside>
      ) : null}

      <Link className="action post-back" to="/blog">
        ← All posts
      </Link>
    </article>
  )
}

export default BlogPost
