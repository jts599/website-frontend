import type { ImageModel } from '../../data/models'

type ModelSelectProps = {
  models: ImageModel[]
  value: string
  onChange: (modelId: string) => void
  disabled?: boolean
}

function ModelSelect({ models, value, onChange, disabled }: ModelSelectProps) {
  const selected = models.find((model) => model.id === value)

  return (
    <div className="field">
      <label className="field__label" htmlFor="image-model">
        Model
      </label>
      <select
        id="image-model"
        className="field__input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.label}
          </option>
        ))}
      </select>
      {selected ? <p className="field__hint">{selected.description}</p> : null}
    </div>
  )
}

export default ModelSelect
