import { useCallback, useState } from 'react'
import { clearStoredApiKey, getStoredApiKey, storeApiKey } from '../lib/storage'

export function useApiKey() {
  const [storedKey] = useState(getStoredApiKey)
  const [apiKey, setApiKey] = useState(storedKey)
  const [savedApiKey, setSavedApiKey] = useState(storedKey)

  const save = useCallback(() => {
    const trimmed = apiKey.trim()
    storeApiKey(trimmed)
    setApiKey(trimmed)
    setSavedApiKey(trimmed)
  }, [apiKey])

  const clear = useCallback(() => {
    clearStoredApiKey()
    setApiKey('')
    setSavedApiKey('')
  }, [])

  const isSaved = savedApiKey !== '' && savedApiKey === apiKey.trim()

  return { apiKey, setApiKey, save, clear, isSaved }
}
