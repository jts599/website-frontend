import { useEffect, useState } from 'react'
import ApiKeyField from '../components/imagegen/ApiKeyField'
import ImageResult from '../components/imagegen/ImageResult'
import ModelSelect from '../components/imagegen/ModelSelect'
import PromptForm from '../components/imagegen/PromptForm'
import { defaultImageModel, imageModels } from '../data/models'
import { useApiKey } from '../hooks/useApiKey'
import { useImageGeneration } from '../hooks/useImageGeneration'
import { usePromptEnhancer } from '../hooks/usePromptEnhancer'
import './ImageGenerator.css'

function ImageGenerator() {
  const { apiKey, setApiKey, save, clear, isSaved } = useApiKey()
  const [modelId, setModelId] = useState(defaultImageModel.id)
  const [prompt, setPrompt] = useState('')
  const [previousPrompt, setPreviousPrompt] = useState<string | null>(null)

  const { status, imageUrl, downloadName, error, generate, cancel } = useImageGeneration()
  const enhancer = usePromptEnhancer()

  // Hidden experiment: keep it out of search engine indexes.
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  const model = imageModels.find((item) => item.id === modelId) ?? defaultImageModel
  const hasApiKey = apiKey.trim() !== ''
  const isGenerating = status === 'generating'
  const isEnhancing = enhancer.status === 'enhancing'
  const canGenerate = hasApiKey && prompt.trim() !== '' && !isGenerating && !isEnhancing
  const canEnhance = hasApiKey && prompt.trim() !== '' && !isGenerating && !isEnhancing

  function handleGenerate() {
    if (!canGenerate) return
    void generate({ apiKey: apiKey.trim(), model, prompt: prompt.trim() })
  }

  async function handleEnhance() {
    if (!canEnhance) return
    const enhanced = await enhancer.enhance({ apiKey: apiKey.trim(), prompt: prompt.trim() })
    if (enhanced) {
      setPreviousPrompt(prompt)
      setPrompt(enhanced)
    }
  }

  function handleRestoreOriginal() {
    if (previousPrompt === null) return
    setPrompt(previousPrompt)
    setPreviousPrompt(null)
  }

  return (
    <section className="page imagegen">
      <div>
        <p className="eyebrow">Experiment</p>
        <h1>Image Generator</h1>
        <p className="intro">
          Generate images from a text prompt using FLUX.2 [dev] through Hugging Face Inference
          Providers. Paste your own Hugging Face API key below to get started.
        </p>
      </div>

      <div className="imagegen__controls">
        <ApiKeyField apiKey={apiKey} onChange={setApiKey} onSave={save} onClear={clear} isSaved={isSaved} />
        <ModelSelect models={imageModels} value={modelId} onChange={setModelId} disabled={isGenerating} />
        <PromptForm
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={handleGenerate}
          onCancel={cancel}
          isGenerating={isGenerating}
          canGenerate={canGenerate}
          onEnhance={handleEnhance}
          onCancelEnhance={enhancer.cancel}
          isEnhancing={isEnhancing}
          canEnhance={canEnhance}
          onRestoreOriginal={handleRestoreOriginal}
          canRestoreOriginal={previousPrompt !== null}
          enhanceError={enhancer.error}
        />
      </div>

      <ImageResult status={status} imageUrl={imageUrl} downloadName={downloadName} error={error} />

      <details className="imagegen__disclaimer">
        <summary>Usage terms &amp; restrictions</summary>
        <p>
          This tool runs FLUX.2 [dev], released under the{' '}
          <a
            href="https://huggingface.co/black-forest-labs/FLUX.2-dev/blob/main/LICENSE.md"
            target="_blank"
            rel="noreferrer"
          >
            FLUX.2 [dev] Non-Commercial License
          </a>
          . By using it you agree to comply with the underlying model&rsquo;s terms of use, including
          the{' '}
          <a href="https://bfl.ai/legal/usage-policy" target="_blank" rel="noreferrer">
            Acceptable Use Policy
          </a>
          . Nothing generated here may be used for commercial purposes.
        </p>
      </details>
    </section>
  )
}

export default ImageGenerator
