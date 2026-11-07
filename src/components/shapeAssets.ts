import amberGiant from '../assets/shapes/planets/amber-giant.svg'
import azure from '../assets/shapes/planets/azure.svg'
import bandedClay from '../assets/shapes/planets/banded-clay.svg'
import cocoa from '../assets/shapes/planets/cocoa.svg'
import moon from '../assets/shapes/planets/moon.svg'
import ringedAzure from '../assets/shapes/planets/ringed-azure.svg'
import ringedDune from '../assets/shapes/planets/ringed-dune.svg'
import rust from '../assets/shapes/planets/rust.svg'
import sun from '../assets/shapes/planets/sun.svg'
import leaf1 from '../assets/shapes/leaves/leaf-1.svg'
import leaf2 from '../assets/shapes/leaves/leaf-2.svg'
import leaf3 from '../assets/shapes/leaves/leaf-3.svg'
import leaf4 from '../assets/shapes/leaves/leaf-4.svg'
import leaf5 from '../assets/shapes/leaves/leaf-5.svg'
import leaf6 from '../assets/shapes/leaves/leaf-6.svg'
import leaf7 from '../assets/shapes/leaves/leaf-7.svg'
import leaf8 from '../assets/shapes/leaves/leaf-8.svg'
import tree1 from '../assets/shapes/trees/tree-1.svg'
import tree2 from '../assets/shapes/trees/tree-2.svg'
import tree3 from '../assets/shapes/trees/tree-3.svg'
import tree4 from '../assets/shapes/trees/tree-4.svg'
import tree5 from '../assets/shapes/trees/tree-5.svg'
import tree6 from '../assets/shapes/trees/tree-6.svg'

/*
 * Art extracted from the supplied asset sheets and recoloured to a muted,
 * site-suited palette. See src/assets/shapes/SOURCES.md for provenance and
 * licensing.
 */
export const planetArt = {
  amberGiant,
  azure,
  bandedClay,
  cocoa,
  moon,
  ringedAzure,
  ringedDune,
  rust,
  sun,
} as const

export const leafArt = {
  leaf1,
  leaf2,
  leaf3,
  leaf4,
  leaf5,
  leaf6,
  leaf7,
  leaf8,
} as const

export const treeArt = {
  tree1,
  tree2,
  tree3,
  tree4,
  tree5,
  tree6,
} as const

export type PlanetName = keyof typeof planetArt
export type LeafName = keyof typeof leafArt
export type TreeName = keyof typeof treeArt
