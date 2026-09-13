import type { GenerationStatus } from '../../hooks/useImageGeneration'

type ImageResultProps = {
  status: GenerationStatus
  imageUrl: string | null
  downloadName: string
  error: string | null
}

function ImageResult({ status, imageUrl, downloadName, error }: ImageResultProps) {
  if (status === 'generating') {
    return (
      <div className="result result--status" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        <p>Generating your image… this can take a few seconds.</p>
      </div>
    )
  }

  if (status === 'error' && error) {
    return (
      <div className="result result--error" role="alert">
        <p>{error}</p>
      </div>
    )
  }

  if (status === 'success' && imageUrl) {
    return (
      <div className="result">
        <img className="result__image" src={imageUrl} alt="Generated from your prompt" />
        <a className="button button--primary" href={imageUrl} download={downloadName}>
          Download image
        </a>
      </div>
    )
  }

  return (
    <div className="result result--status">
      <p>Your generated image will appear here.</p>
    </div>
  )
}

export default ImageResult
