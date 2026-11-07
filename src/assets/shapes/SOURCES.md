# Shape sources

## Leaves and trees

Extracted from the supplied `leaves.svg` and `trees.svg` sheets — one asset per
icon, cropped to its bounding box, with the credit caption/title removed — and
recoloured to a muted, site-suited palette.

| Files | Count | Extracted from |
| --- | --- | --- |
| `leaves/leaf-1.svg` … `leaf-8.svg` | 8 | `leaves.svg` (`#layer-MC1`) |
| `trees/tree-1.svg` … `tree-6.svg` | 6 | `trees.svg` (`#layer-MC1`) |

Source artwork: **Freepik** (the sheets carry a "designed by freepik" credit).
Freepik's free licence requires attribution — add a credit line (site footer or a
credits page), e.g. _"Leaf and tree illustrations designed by Freepik"_.

Consumed as images via `src/components/ShapeImage.tsx`.

## Planets

Extracted from the supplied `planets.svg` — one `<g>` per planet in its
`#OBJECTS` group — and recoloured to the same muted palette.

| File | Source group (bbox) |
| --- | --- |
| `planets/banded-clay.svg` | 364,194 112×112 |
| `planets/azure.svg` | 23,192 113×115 |
| `planets/ringed-azure.svg` | 162,21 175×114 |
| `planets/amber-giant.svg` | 21,20 116×116 |
| `planets/sun.svg` | 164,165 172×170 |
| `planets/cocoa.svg` | 22,359 115×114 |
| `planets/moon.svg` | 363,348 114×115 |
| `planets/rust.svg` | 363,20 114×116 |
| `planets/ringed-dune.svg` | 158,370 185×104 |

The colour remap used during extraction (bright → muted) is documented in the
extraction script; the muted outline is `#3f443a`.
