import { useCallback, useEffect, useRef, useState } from 'react'
import { describeHuggingFaceError } from '../lib/hfErrors'
import { enhancePrompt } from '../lib/promptEnhancer'

export type EnhancerStatus = 'idle' | 'enhancing' | 'error'

type EnhanceArgs = {
  apiKey: string
  prompt: string
}

export function usePromptEnhancer() {
  const [status, setStatus] = useState<EnhancerStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  const enhance = useCallback(async ({ apiKey, prompt }: EnhanceArgs): Promise<string | null> => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setError(null)
    setStatus('enhancing')

    try {
      const enhanced = await enhancePrompt({ apiKey, prompt, signal: controller.signal })
      if (controller.signal.aborted) return null

      if (!enhanced) {
        setError('The enhancer returned an empty prompt. Try rephrasing your prompt.')
        setStatus('error')
        return null
      }

      setStatus('idle')
      return enhanced
    } catch (caught) {
      if (controller.signal.aborted) return null
      setError(describeHuggingFaceError(caught))
      setStatus('error')
      return null
    }
  }, [])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setStatus('idle')
    setError(null)
  }, [])

  return { status, error, enhance, cancel }
}
