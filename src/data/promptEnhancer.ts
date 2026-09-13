export type PromptEnhancerModel = {
  label: string
  hfModelId: string
  /**
   * Explicit Inference Provider, authenticated with the same Hugging Face
   * token. This uses the documented per-provider route
   * (router.huggingface.co/<provider>/...) rather than the "auto" router.
   *
   * DeepInfra serves this model serverless. (Together listed
   * Qwen2.5-7B-Instruct-Turbo but now requires a dedicated endpoint, which
   * returned a 400.)
   */
  provider: 'deepinfra'
}

/**
 * Qwen3 14B Instruct: Chinese-origin instruct model with comparatively few
 * content refusals. Reasoning is disabled via the `/no_think` instruction in
 * the system prompt, so it returns the rewritten prompt directly. Any stray
 * thinking block is stripped defensively.
 *
 * Other Chinese-origin options that resolve through HF Inference Providers:
 *   - Qwen/Qwen3.5-9B        (deepinfra) — newer, but thinking mode by default
 *   - zai-org/GLM-4.5-Air    (novita, zai-org) — larger MoE, reasoning
 *   - MiniMaxAI/MiniMax-M2.7 (novita, featherless-ai, deepinfra) — reasoning
 */
export const promptEnhancerModel: PromptEnhancerModel = {
  label: 'Qwen3 14B Instruct',
  hfModelId: 'Qwen/Qwen3-14B',
  provider: 'deepinfra',
}
