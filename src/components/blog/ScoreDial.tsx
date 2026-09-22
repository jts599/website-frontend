type ScoreDialProps = {
  score: number
  label?: string
}

/**
 * A small SVG gauge used inside blog posts to visualize a nightly stargazing
 * score (0-100). Visualizations like this live in React so MDX posts can embed
 * arbitrary interactive components.
 */
function ScoreDial({ score, label = 'Stargazing score' }: ScoreDialProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)))
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const arc = (clamped / 100) * circumference

  return (
    <figure className="viz viz--dial">
      <svg viewBox="0 0 140 140" role="img" aria-label={`${label}: ${clamped} out of 100`}>
        <circle className="viz__track" cx="70" cy="70" r={radius} />
        <circle
          className="viz__value"
          cx="70"
          cy="70"
          r={radius}
          strokeDasharray={`${arc} ${circumference}`}
          transform="rotate(-90 70 70)"
        />
        <text className="viz__text" x="70" y="70" textAnchor="middle" dominantBaseline="central">
          {clamped}
        </text>
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  )
}

export default ScoreDial
