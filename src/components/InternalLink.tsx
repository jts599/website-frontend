import { useInternalAvailable } from '../hooks/useInternalAvailable'

const INTERNAL_URL = 'https://internal.joesloyan.dev/'

/**
 * Small link to the internal app, shown next to the theme toggle only when the
 * host is reachable (i.e. the visitor is on the private network).
 */
export function InternalLink() {
  const available = useInternalAvailable()

  if (!available) return null

  return (
    <a className="internal-link" href={INTERNAL_URL} target="_blank" rel="noreferrer">
      Internal
    </a>
  )
}
