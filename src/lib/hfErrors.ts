import { InferenceClientHubApiError, InferenceClientProviderApiError } from '@huggingface/inference'

function bodyMessage(body: unknown): string {
  if (typeof body === 'string') return body
  if (body && typeof body === 'object' && 'error' in body) {
    const { error } = body as { error?: unknown }
    if (typeof error === 'string') return error
  }
  return ''
}

/**
 * Turns Hugging Face client errors (image or chat) into short, user-facing messages.
 */
export function describeHuggingFaceError(error: unknown): string {
  if (error instanceof Error && error.name === 'AbortError') {
    return 'The request was cancelled.'
  }

  if (error instanceof InferenceClientProviderApiError) {
    const { status, body } = error.httpResponse

    if (status === 401 || status === 403) {
      return 'Hugging Face rejected the API key. Make sure it is valid, not expired, and has permission to call Inference Providers.'
    }
    if (status === 402) {
      return 'Not enough Inference Providers credits. Add credits or upgrade to Hugging Face PRO, then try again.'
    }
    if (status === 429) {
      return 'Rate limit reached. Wait a moment and try again.'
    }
    if (status >= 500) {
      return 'The model provider had a server error. Try again in a few moments.'
    }

    const detail = bodyMessage(body) || error.message
    return `The model provider rejected the request (HTTP ${status}).${detail ? ` ${detail}` : ''}`
  }

  if (error instanceof InferenceClientHubApiError) {
    return 'Hugging Face could not resolve the model. Check your connection and try again.'
  }

  if (error instanceof Error) {
    if (/failed to fetch|networkerror|load failed|network request failed/i.test(error.message)) {
      return 'Could not reach Hugging Face. Check your internet connection and try again.'
    }
    return error.message
  }

  return 'Something went wrong. Please try again.'
}
