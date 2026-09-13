import { useCallback, useEffect, useRef, useState } from 'react'
import type { ImageModel } from '../data/models'
import { describeHuggingFaceError } from '../lib/hfErrors'
import { generateImage } from '../lib/hfImage'

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error'

type GenerateArgs = {
  apiKey: string
  model: ImageModel
  prompt: string
}

function buildFileName(model: ImageModel, blob: Blob): string {
  const extension = /jpe?g/i.test(blob.type) ? 'jpg' : /webp/i.test(blob.type) ? 'webp' : 'png'
  return `${model.id}-${Date.now()}.${extension}`
}

export function useImageGeneration() {
  const [status, setStatus] = useState<GenerationStatus>('idle')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [downloadName, setDownloadName] = useState('image.png')
  const [error, setError] = useState<string | null>(null)

  const objectUrlRef = useRef<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const releaseObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
      releaseObjectUrl()
    }
  }, [releaseObjectUrl])

  const generate = useCallback(
    async ({ apiKey, model, prompt }: GenerateArgs) => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      releaseObjectUrl()
      setImageUrl(null)
      setError(null)
      setStatus('generating')

      try {
        const blob = await generateImage({ apiKey, model, prompt, signal: controller.signal })
        if (controller.signal.aborted) return

        const url = URL.createObjectURL(blob)
        objectUrlRef.current = url
        setImageUrl(url)
        setDownloadName(buildFileName(model, blob))
        setStatus('success')
      } catch (caught) {
        if (controller.signal.aborted) return
        setError(describeHuggingFaceError(caught))
        setStatus('error')
      }
    },
    [releaseObjectUrl],
  )

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    setStatus('idle')
    setError(null)
  }, [])

  return { status, imageUrl, downloadName, error, generate, cancel }
}
