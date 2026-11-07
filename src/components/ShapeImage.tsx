import {
  leafArt,
  planetArt,
  treeArt,
  type LeafName,
  type PlanetName,
  type TreeName,
} from './shapeAssets'

type ArtProps<T extends string> = {
  name: T
  className?: string
}

export function PlanetImage({ name, className }: ArtProps<PlanetName>) {
  return <img className={className} src={planetArt[name]} alt="" aria-hidden="true" />
}

export function LeafImage({ name, className }: ArtProps<LeafName>) {
  return <img className={className} src={leafArt[name]} alt="" aria-hidden="true" />
}

export function TreeImage({ name, className }: ArtProps<TreeName>) {
  return <img className={className} src={treeArt[name]} alt="" aria-hidden="true" />
}
