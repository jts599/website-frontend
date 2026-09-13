import { InferenceClient } from '@huggingface/inference'
import type { ImageModel } from '../data/models'

export type GenerateImageArgs = {
  apiKey: string
  model: ImageModel
  prompt: string
  signal?: AbortSignal
}

/**
 * Generates an image from a text prompt via Hugging Face Inference Providers.
 * Requests go to router.huggingface.co using the caller's own API key.
 */
export async function generateImage({ apiKey, model, prompt, signal }: GenerateImageArgs): Promise<Blob> {
  const client = new InferenceClient(apiKey)

  return client.textToImage(
    {
      provider: model.provider,
      model: model.hfModelId,
      inputs: prompt,
    },
    { outputType: 'blob', signal },
  )
}
