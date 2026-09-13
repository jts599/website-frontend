const API_KEY_STORAGE_KEY = 'joesloyan.huggingface.token'

function getStorage(): Storage | null {
  try {
    const storage = window.localStorage
    const probe = '__storage_probe__'
    storage.setItem(probe, probe)
    storage.removeItem(probe)
    return storage
  } catch {
    // Storage can be unavailable (private mode, disabled cookies, SSR).
    return null
  }
}

export function getStoredApiKey(): string {
  try {
    return getStorage()?.getItem(API_KEY_STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function storeApiKey(apiKey: string): void {
  try {
    if (apiKey) {
      getStorage()?.setItem(API_KEY_STORAGE_KEY, apiKey)
    } else {
      getStorage()?.removeItem(API_KEY_STORAGE_KEY)
    }
  } catch {
    // Ignore write failures; the key still works for the current session.
  }
}

export function clearStoredApiKey(): void {
  try {
    getStorage()?.removeItem(API_KEY_STORAGE_KEY)
  } catch {
    // Nothing else to do.
  }
}
