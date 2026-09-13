import { useState } from 'react'

type ApiKeyFieldProps = {
  apiKey: string
  onChange: (value: string) => void
  onSave: () => void
  onClear: () => void
  isSaved: boolean
}

function ApiKeyField({ apiKey, onChange, onSave, onClear, isSaved }: ApiKeyFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const hasKey = apiKey.trim() !== ''

  return (
    <div className="field">
      <label className="field__label" htmlFor="hf-api-key">
        Hugging Face API key
      </label>

      <div className="field__row">
        <input
          id="hf-api-key"
          className="field__input"
          type={isVisible ? 'text' : 'password'}
          value={apiKey}
          onChange={(event) => onChange(event.target.value)}
          placeholder="hf_..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          type="button"
          className="button button--ghost"
          onClick={() => setIsVisible((visible) => !visible)}
          disabled={!hasKey}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="field__row">
        <button type="button" className="button" onClick={onSave} disabled={!hasKey}>
          Save key
        </button>
        <button type="button" className="button button--ghost" onClick={onClear} disabled={!hasKey}>
          Clear
        </button>
        {isSaved ? (
          <span className="field__hint field__hint--ok" role="status">
            Saved in this browser
          </span>
        ) : null}
      </div>

      <p className="field__hint">
        Stored only in this browser and sent directly to Hugging Face. Create a token at{' '}
        <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer">
          hf.co/settings/tokens
        </a>{' '}
        with permission to call Inference Providers.
      </p>
    </div>
  )
}

export default ApiKeyField
