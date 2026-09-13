import { InferenceClient } from '@huggingface/inference'
import { promptEnhancerModel } from '../data/promptEnhancer'

const SYSTEM_PROMPT = `You are an expert prompt engineer for the FLUX.2 text-to-image model.

Rewrite the user's prompt into a single vivid, highly descriptive paragraph optimized for FLUX.2.

Rules:
- Preserve the user's core subject and intent. Never introduce unrelated subjects.
- Enrich with concrete visual details: subject, setting, composition, lighting, color palette, materials and textures, mood, and artistic style.
- Prefer natural descriptive phrases over keyword lists.
- When helpful, describe camera, lens, or rendering style (for example "shot on 35mm film", "cinematic lighting", "digital illustration").
- Output only the rewritten prompt. Do not include introductions, explanations, quotes, markdown, or commentary.
- Keep it under 120 words.

/no_think`

const MAX_PROMPT_LENGTH = 1000

export type EnhancePromptArgs = {
  apiKey: string
  prompt: string
  signal?: AbortSignal
}

/**
 * Cleans up an LLM response that may ignore the "output only the prompt" rule.
 */
export function cleanEnhancedPrompt(raw: string): string {
  let text = raw.trim()
  // Defensively drop any thinking block the model may still emit.
  text = text.replace(/<think(?:ing)?>[\s\S]*?<\/think(?:ing)?>/gi, '').trim()

  const preamble =
    /^(?:sure[,!.]?\s*|okay[,!.]?\s*|here(?:'s| is)[^:]*:\s*|enhanced prompt:\s*|rewritten prompt:\s*)/i
  let previous = ''
  while (text !== previous && preamble.test(text)) {
    previous = text
    text = text.replace(preamble, '').trim()
  }

  // Strip wrapping quotes after preambles, since a preamble can hide the quote.
  text = text.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '').trim()
  text = text.replace(/\s+/g, ' ').trim()

  if (text.length > MAX_PROMPT_LENGTH) {
    text = text.slice(0, MAX_PROMPT_LENGTH).trim()
  }
  return text
}

function extractText(content: unknown): string {
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    return content
      .map((part) =>
        part && typeof part === 'object' && 'text' in part && typeof part.text === 'string'
          ? part.text
          : '',
      )
      .join(' ')
  }
  return ''
}

/**
 * Rewrites a prompt for FLUX.2 using a small instruct model through Hugging Face
 * Inference Providers, authenticated with the same Hugging Face token.
 */
export async function enhancePrompt({ apiKey, prompt, signal }: EnhancePromptArgs): Promise<string> {
  const client = new InferenceClient(apiKey)

  const result = await client.chatCompletion(
    {
      provider: promptEnhancerModel.provider,
      model: promptEnhancerModel.hfModelId,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      max_tokens: 600,
      temperature: 0.7,
    },
    { signal },
  )

  return cleanEnhancedPrompt(extractText(result.choices[0]?.message?.content))
}
