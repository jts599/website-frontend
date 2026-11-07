import { useMemo, type CSSProperties } from 'react'
import type { LeafName } from './shapeAssets'
import { LeafImage, PlanetImage, TreeImage } from './ShapeImage'

/* -------------------------------------------------------------------------- */
/* Light scene — a small grove with maple/oak leaves falling around the screen.*/
/* -------------------------------------------------------------------------- */

const LEAF_NAMES: LeafName[] = ['leaf1', 'leaf2', 'leaf3', 'leaf4', 'leaf5', 'leaf6', 'leaf7', 'leaf8']

type FallingLeaf = {
  left: string
  size: number
  rotate: number
  /** Horizontal sway distance for the fall. */
  drift: number
  duration: number
  delay: number
}

const LEAVES: FallingLeaf[] = [
  { left: '4%', size: 30, rotate: -40, drift: 46, duration: 12.5, delay: -1.2 },
  { left: '10%', size: 22, rotate: 25, drift: -34, duration: 15.2, delay: -6.4 },
  { left: '16%', size: 36, rotate: 60, drift: 58, duration: 11.3, delay: -3.1 },
  { left: '23%', size: 26, rotate: -15, drift: -48, duration: 16.4, delay: -9.7 },
  { left: '30%', size: 40, rotate: 38, drift: 40, duration: 10.6, delay: -5.2 },
  { left: '37%', size: 24, rotate: -55, drift: 62, duration: 14.1, delay: -12.3 },
  { left: '44%', size: 32, rotate: 12, drift: -52, duration: 12.9, delay: -2.6 },
  { left: '51%', size: 28, rotate: -28, drift: 36, duration: 17.2, delay: -8.1 },
  { left: '58%', size: 38, rotate: 48, drift: -44, duration: 11.7, delay: -4.4 },
  { left: '64%', size: 22, rotate: -8, drift: 54, duration: 15.8, delay: -13.5 },
  { left: '70%', size: 34, rotate: 33, drift: -38, duration: 13.4, delay: -7.2 },
  { left: '76%', size: 26, rotate: -62, drift: 48, duration: 16.1, delay: -10.9 },
  { left: '82%', size: 42, rotate: 20, drift: -60, duration: 10.9, delay: -3.8 },
  { left: '88%', size: 24, rotate: -35, drift: 42, duration: 14.7, delay: -11.6 },
  { left: '93%', size: 30, rotate: 52, drift: -30, duration: 12.2, delay: -5.9 },
  { left: '7%', size: 20, rotate: -20, drift: 50, duration: 18.3, delay: -14.2 },
  { left: '47%', size: 36, rotate: 44, drift: -56, duration: 11.1, delay: -0.8 },
  { left: '67%', size: 20, rotate: -48, drift: 32, duration: 17.6, delay: -9.3 },
]

function Leaf({ left, top, size, rotate, drift, duration, delay, name }: FallingLeaf & { top: string; name: LeafName }) {
  const style = {
    left,
    '--leaf-top': top,
    '--leaf-size': `${size}px`,
    '--leaf-rotate': `${rotate}deg`,
    '--leaf-drift': `${drift}px`,
    '--fall-duration': `${duration}s`,
    '--fall-delay': `${delay}s`,
  } as CSSProperties

  return (
    <span className="leaf" style={style}>
      <LeafImage name={name} />
    </span>
  )
}

export function LightScene() {
  return (
    <div className="home__scene home__scene--light">
      {LEAVES.map((leaf, index) => (
        <Leaf
          key={index}
          {...leaf}
          name={LEAF_NAMES[index % LEAF_NAMES.length]}
          top={`${(index * 47 + 9) % 84}%`}
        />
      ))}

      <TreeImage name="tree1" className="scene-tree" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Dark scene — a starfield with planets, a moon and a shooting star.          */
/* -------------------------------------------------------------------------- */

type StarSpec = {
  top: string
  left: string
  size: number
  opacity: number
  twinkle: boolean
  delay: string
  duration: string
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeStars(count: number): StarSpec[] {
  const rand = mulberry32(20260101)
  return Array.from({ length: count }, () => ({
    top: `${(rand() * 100).toFixed(2)}%`,
    left: `${(rand() * 100).toFixed(2)}%`,
    size: Number((rand() * 1.8 + 0.6).toFixed(2)),
    opacity: Number((rand() * 0.6 + 0.25).toFixed(2)),
    // Roughly half of the stars shimmer; the rest hold steady.
    twinkle: rand() < 0.45,
    delay: `-${(rand() * 6).toFixed(2)}s`,
    duration: `${(rand() * 3 + 2.5).toFixed(2)}s`,
  }))
}

export function DarkScene() {
  const stars = useMemo(() => makeStars(80), [])

  return (
    <div className="home__scene home__scene--dark">
      <div className="stars">
        {stars.map((star, index) => (
          <span
            key={index}
            className={star.twinkle ? 'star star--twinkle' : 'star'}
            style={
              {
                top: star.top,
                left: star.left,
                '--star-size': `${star.size}px`,
                '--star-opacity': star.opacity,
                '--star-delay': star.delay,
                '--star-duration': star.duration,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <PlanetImage name="ringedDune" className="planet planet--saturn" />
      <PlanetImage name="azure" className="planet planet--moon" />
      <PlanetImage name="moon" className="planet planet--small" />

      <svg className="shooting-star" viewBox="0 0 200 60">
        <line x1="8" y1="52" x2="150" y2="8" />
      </svg>
    </div>
  )
}
