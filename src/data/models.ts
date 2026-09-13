export type ImageModel = {
  id: string
  label: string
  hfModelId: string
  provider: 'fal-ai'
  description: string
}

/**
 * Only FLUX.2 [dev] is supported for now.
 *
 * Note: Hugging Face registers `black-forest-labs/FLUX.2-dev` with the
 * image-to-image task only, so text-to-image requests are routed to
 * `fal/FLUX.2-dev-Turbo` (FLUX.2 [dev] + the official Turbo LoRA), which is
 * the working text-to-image entry point on Inference Providers.
 */
export const imageModels: ImageModel[] = [
  {
    id: 'flux2-dev',
    label: 'FLUX.2 [dev]',
    hfModelId: 'fal/FLUX.2-dev-Turbo',
    provider: 'fal-ai',
    description: 'State-of-the-art text-to-image generation from Black Forest Labs.',
  },
]

export const defaultImageModel = imageModels[0]
