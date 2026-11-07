import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const listeners = new Set<() => void>()

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Ignore storage failures (private mode, etc.).
  }
  emit()
}

/**
 * Shared theme store. Reads the value applied by the inline script in
 * index.html and keeps every consumer (header toggle, homepage toggle) in sync.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => 'light' as Theme)

  const toggle = useCallback(() => {
    setTheme(getSnapshot() === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme, toggle }
}
