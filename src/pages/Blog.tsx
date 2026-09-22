import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { formatPostDate, posts } from '../data/posts'

function Blog() {
  return (
    <section className="page">
      <PageHeader
        eyebrow="Blog"
        title="Writing"
        intro="Notes and write-ups on things I have built."
      />

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link className="post-card" to={`/blog/${post.slug}`}>
              <time className="post-card__date" dateTime={post.date}>
                {formatPostDate(post.date)}
              </time>
              <span className="post-card__title">{post.title}</span>
              <span className="post-card__summary">{post.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Blog
