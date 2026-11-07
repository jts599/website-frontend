import { Link } from 'react-router-dom'
import { navLinks } from '../data/links'
import type { LeafName, PlanetName } from './shapeAssets'
import { LeafImage, PlanetImage } from './ShapeImage'

const PLANET_BY_INDEX: PlanetName[] = ['ringedAzure', 'amberGiant', 'rust']
const LEAF_BY_INDEX: LeafName[] = ['leaf1', 'leaf3', 'leaf7']

function FloatingLinks() {
  return (
    <nav className="home__links" aria-label="Site">
      {navLinks.map((link, index) => (
        <Link className={`home__link home__link--${index + 1}`} to={link.to} key={link.to}>
          <span className="home__bob">
            <span className="home__shape home__shape--leaf">
              <LeafImage name={LEAF_BY_INDEX[index] ?? 'leaf1'} className="shape-img" />
            </span>
            <span className="home__shape home__shape--planet">
              <PlanetImage name={PLANET_BY_INDEX[index] ?? 'moon'} className="shape-img" />
            </span>
            <span className="home__label">{link.label}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default FloatingLinks
