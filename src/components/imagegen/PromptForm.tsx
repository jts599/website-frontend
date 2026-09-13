import type { KeyboardEvent } from 'react'

type PromptFormProps = {
  prompt: string
  onPromptChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
  isGenerating: boolean
  canGenerate: boolean
  onEnhance: () => void
  onCancelEnhance: () => void
  isEnhancing: boolean
  canEnhance: boolean
  onRestoreOriginal: () => void
  canRestoreOriginal: boolean
  enhanceError: string | null
}

function PromptForm({
  prompt,
  onPromptChange,
  onSubmit,
  onCancel,
  isGenerating,
  canGenerate,
  onEnhance,
  onCancelEnhance,
  isEnhancing,
  canEnhance,
  onRestoreOriginal,
  canRestoreOriginal,
  enhanceError,
}: PromptFormProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <form
      className="field"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <label className="field__label" htmlFor="image-prompt">
        Prompt
      </label>
      <textarea
        id="image-prompt"
        className="field__textarea"
        value={prompt}
        onChange={(event) => onPromptChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe the image you want to generate..."
        rows={4}
      />

      <div className="field__row field__row--actions">
        <button
          type="button"
          className="button"
          onClick={onEnhance}
          disabled={!canEnhance || isEnhancing}
        >
          {isEnhancing ? 'Enhancing…' : 'Enhance prompt'}
        </button>
        {isEnhancing ? (
          <>
            <span className="spinner" aria-hidden="true" />
            <button type="button" className="button button--ghost" onClick={onCancelEnhance}>
              Cancel
            </button>
          </>
        ) : null}
        {canRestoreOriginal && !isEnhancing ? (
          <button type="button" className="button button--ghost" onClick={onRestoreOriginal}>
            Restore original
          </button>
        ) : null}
      </div>

      {enhanceError ? (
        <p className="field__error" role="alert">
          {enhanceError}
        </p>
      ) : null}

      <div className="field__row field__row--actions">
        <button
          type="submit"
          className="button button--primary"
          disabled={!canGenerate || isGenerating || isEnhancing}
        >
          {isGenerating ? 'Generating…' : 'Generate image'}
        </button>
        {isGenerating ? (
          <button type="button" className="button button--ghost" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <span className="field__hint">Ctrl/⌘ + Enter to submit</span>
      </div>
    </form>
  )
}

export default PromptForm
