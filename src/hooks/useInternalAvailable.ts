import { useEffect, useState } from 'react'

const INTERNAL_URL = 'https://internal.joesloyan.dev/'

/**
 * Best-effort reachability probe for the internal app. Resolves to `true` only
 * when the host answers within the timeout — which in practice is only on the
 * private network (VPN / split-horizon DNS). Uses a no-cors request so no CORS
 * headers are needed; any HTTP response (even 404) counts as reachable.
 */
export function useInternalAvailable(timeoutMs = 2500) {
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), timeoutMs)

    fetch(INTERNAL_URL, { mode: 'no-cors', cache: 'no-store', signal: controller.signal })
      .then(() => setAvailable(true))
      .catch(() => {
        // Unreachable: DNS failure, offline, blocked, or timed out.
      })
      .finally(() => window.clearTimeout(timer))

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [timeoutMs])

  return available
}
