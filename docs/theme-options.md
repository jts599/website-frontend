# Theme Research & Wireframe Options

Goal: one consistent, **serene and peaceful** theme across the whole site that
leans into **digital minimalism** and a general **nature** feel. The homepage is
a **links-only index** — no featured projects, no cards, no imagery.

Status: proposal for review. Nothing here is implemented yet.

---

## 1. What I actually looked at

Source list: `emmabostian/developer-portfolios` (2,084 entries, `master`). I
pulled the raw list, then fetched and inspected a handful of the design-forward
entries.

| Site | Role as a reference | What I found |
| --- | --- | --- |
| [brittanychiang.com](https://brittanychiang.com) | The canonical minimalist dev portfolio | Dark slate background (`#0f172a`), **one** accent, Inter + mono, sticky-intro two-column layout, flat cards, no imagery |
| [leerob.io](https://leerob.io) | Editorial / reading-first | White paper, **serif body** (`Iowan Old Style` / `STIX Two Text`), 17px / 1.6 measure, green + warm-brown accents (`#4f9442`, `#2a1c10`), thin dividers instead of cards |
| [maggieappleton.com](https://maggieappleton.com) | "Digital garden" model | Content organised by collection type, warm cream palette, illustration, index-style landing |
| [andy-bell.design](https://andy-bell.design) | Minimal setup | Mostly client-rendered; useful as a contrast point |
| [p5aholic.me](https://p5aholic.me) | Japanese-minimal design portfolio | Restraint, typography-led, generous negative space |

Also noted, not deep-dived: **bruno-simon.com** (3D playground) — the deliberate
*anti-goal* if "serene" is the priority.

Patterns observed across the calm/minimal entries:

- **One accent maximum.** A single hue used only for links, focus, and one action.
- **Typography does the work.** No hero images or carousels; hierarchy comes from
  type scale, weight, and whitespace.
- **Narrow measure.** ~60–72 characters per line for prose.
- **Flat surfaces.** Hairline borders / background tint, not shadowed cards.
- **Whisper motion.** 120–200ms, opacity/colour only, `prefers-reduced-motion`
  respected.
- **Mono for metadata.** Dates, years, and eyebrows in a monospace face.

Note: a **links-only homepage** is its own genre (personal "index" / "contents"
pages). The patterns above are exactly what make that genre work: the page is
just type, rules, and space.

---

## 2. Theme system: one nature palette, two modes

Since both light and dark are wanted, the theme is **one token system with two
value sets**, not two separate designs. Only the values change; spacing, type,
and layout are identical in both modes.

Nature enters through **tone**, not decoration: warm paper in light mode, deep
forest in dark mode, and one vegetal accent. No stock photos, no leaf icons
required.

### Palette "Field Notes" (recommended)

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--bg` | `#F7F5EF` warm paper | `#101511` deep forest | Page background |
| `--surface` | `#EFEEE5` | `#161D17` | Barely-raised blocks (used sparingly) |
| `--ink` | `#2A2E2A` moss-charcoal | `#E7EBE3` starlight white | Primary text |
| `--muted` | `#6B726A` | `#9AA69B` | Secondary text |
| `--line` | `#DEDACC` | `rgba(231,235,227,0.10)` | Hairline rules/borders |
| `--accent` | `#4F6F52` moss | `#93B48C` soft moss | Links, focus, one action |
| `--accent-2` | `#B07A4A` clay | `#C6A276` | Tiny use: one highlight per page |
| `--accent-ink` | `#F7F5EF` | `#101511` | Text on an accent fill |
| `color-scheme` | `light` | `dark` | Native form controls/scrollbars |

### Palette "River Stone" (alternative)

Cooler and more neutral — grey-green stone and water rather than warm paper.
Use if "Field Notes" reads too cosy.

| Token | Light | Dark |
| --- | --- | --- |
| `--bg` | `#F5F6F4` | `#0E1416` |
| `--surface` | `#ECEEEB` | `#151D1F` |
| `--ink` | `#232827` | `#E4E9E7` |
| `--muted` | `#68706E` | `#93A09D` |
| `--line` | `#DBDFDB` | `rgba(228,233,231,0.10)` |
| `--accent` | `#3F6B63` spruce | `#86B3A8` |
| `--accent-2` | `#8A6A4F` | `#C0A183` |

**Recommendation:** "Field Notes". Both directions use the same type/motion rules
below, so switching palette later is a value swap, not a redesign.

### Typography

- **Headings:** a serif (Fraunces or Source Serif 4) for warmth and calm.
- **Body/UI:** Inter.
- **Metadata:** a mono face for dates, years, numbered indexes, eyebrows.

Alternative "strict" variant: drop the serif and run Inter at multiple weights
for the most digital-minimal reading. Keep this as a one-line decision.

### Motion

- 120–180ms, colour/opacity/underline only. No `translateY` card lifts, no glow,
  no parallax.
- Respect `prefers-reduced-motion: reduce` globally.

### Ornament policy

At most **one** quiet, generated SVG motif re-used site-wide, and it must not
appear on the homepage. Candidates: a faint topographic contour band (Driftless),
a simple horizon line, or a single small leaf/moon mark used as a section
divider. Choose one or none; do not mix.

---

## 3. Consistent layout rules (all pages, all modes)

- **One container width:** text pages `min(100%, 44rem)`; wide pages may reach
  `52rem`. Everything centred.
- **Hairline rules** (`1px solid var(--line)`) are the only separators.
- **No glass cards.** Remove `box-shadow`, translucent backgrounds, and
  `border-radius` > 0.5rem. Entries get a top hairline and whitespace.
- **Two-column only where earned** (project/post detail on ≥900px), never on the
  homepage.
- **Focus-visible** outline in `--accent`, 2px, offset 2px — never removed.
- **Contrast:** body text ≥ 4.5:1 against its background in *both* modes.
- **Mode parity:** test every page in light and dark before shipping.

---

## 4. Homepage wireframes — links only

Shared by all options: header (`Joe Sloyan` left; a theme toggle at the right),
a one-line identity, then links. No featured projects, no thumbnails. If a line
of description is included, it is plain text in `--muted`.

### Option 1 — "Index" (centred, large links)

The purest form: the homepage is just a quiet contents page.

```
┌────────────────────────────────────────────────────────────────┐
│  Joe Sloyan                                            ☾ / ☀   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                                                                │
│                                                                │
│                         Joe Sloyan                             │
│                Full stack developer · Wisconsin                │
│                                                                │
│                                                                │
│                      Projects        →                         │
│                                                                │
│                      About           →                         │
│                                                                │
│                      Blog            →                         │
│                                                                │
│                                                                │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  GitHub · LinkedIn                    © 2026 Joe Sloyan        │
└────────────────────────────────────────────────────────────────┘
```

Pros: maximum calm; perfectly on-theme for digital minimalism.
Cons: visually very plain; almost nothing to "design".

### Option 2 — "Contents" (numbered mono index, left-aligned)

An editorial table-of-contents feel. Numbers in mono, names in serif, short
muted descriptors.

```
┌────────────────────────────────────────────────────────────────┐
│  Joe Sloyan                                            ☾ / ☀   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                                                                │
│  Joe Sloyan                                                    │
│  Full stack developer · Wisconsin                             │
│                                                                │
│                                                                │
│                                                                │
│  01   Projects        things I've built                    →   │
│                                                                │
│  02   About           who I am and where to find me        →   │
│                                                                │
│  03   Blog            notes and write-ups                  →   │
│                                                                │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  GitHub · LinkedIn                    © 2026 Joe Sloyan        │
└────────────────────────────────────────────────────────────────┘
```

Pros: still links-only, but has identity and rhythm; mono numerals + serif names
read as intentional.
Cons: descriptors must stay short and honest or they become clutter.

### Option 3 — "Threshold" (split: identity left, links right)

Name anchored left, links stacked at the top right — a threshold into the site.

```
┌────────────────────────────────────────────────────────────────┐
│  Joe Sloyan                                            ☾ / ☀   │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Joe Sloyan                          Projects              →   │
│  Full stack developer                                          │
│  · Wisconsin                         About                 →   │
│                                                                │
│  A small place for the things        Blog                  →   │
│  I build and write about.                                      │
│                                                                │
│                                                                │
│                                                                │
│                                                                │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  GitHub · LinkedIn                    © 2026 Joe Sloyan        │
└────────────────────────────────────────────────────────────────┘
```

Pros: uses the width, feels like a designed landing without any content cards.
Cons: more "layout" than the other two; on mobile it collapses to Option 1.

**Recommendation:** **Option 2 ("Contents")**. It keeps the page strictly to
links, but the mono numerals + serif names + hairline hover give it enough
identity to feel designed rather than empty. Option 3 is the fallback if you want
to use more of the desktop width.

---

## 5. Light/dark toggle — implementation spec

Because the homepage is now typography-only, the toggle becomes the one piece of
"interaction" on the site. Spec:

- **Attribute:** theme applied as `data-theme="light" | "dark"` on `<html>`.
- **Default:** follow `prefers-color-scheme` until the user chooses explicitly.
- **Persistence:** `localStorage` key `theme`; once set, it wins over system.
- **No flash:** a tiny inline script in `index.html` `<head>` reads
  `localStorage` (falling back to system) and sets `data-theme` *before* first
  paint.
- **Control:** an icon button in the header (sun/moon, `--muted` → `--accent` on
  hover), `aria-label="Toggle colour theme"` and `aria-pressed`.
- **CSS structure:** light tokens on `:root`; dark values under
  `[data-theme="dark"]`; a `@media (prefers-color-scheme: dark)` block scoped to
  `:root:not([data-theme])` for the system default.
- **`color-scheme`** set per mode so scrollbars and form controls follow.
- **No transition on theme swap** for background/text (avoids a jarring fade), or
  a single 120ms fade if preferred — must be disabled under reduced motion.
- Store the choice on the client only; no server/CSP concerns for a static site.

Files: a small `src/theme.ts` (or `useTheme` hook), the inline head script, a
`ThemeToggle` component in `Layout`, and the token additions in `App.css` /
a new `src/theme.css`.

---

## 6. Mapping onto the current codebase

Assumes palette "Field Notes" + homepage Option 2, but the token rewrite is the
same for either palette.

| Current piece | Proposed change |
| --- | --- |
| `:root` in `App.css` (slate + cyan, dark) | Replace with light-mode "Field Notes" tokens; add `[data-theme="dark"]` overrides. Drop `--surface-hover`. |
| `index.css` `color-scheme: dark;` | Remove hardcode; drive `color-scheme` from the theme. |
| `body` gradient `#0f172a → #111827` | Flat `var(--bg)`. |
| `.page` / `.project-card` / `.post-card` glass + shadow + `translateY` hover | Flatten: `border-radius` ≤ 0.5rem, `box-shadow: none`, hairline top border, hover = colour only. |
| `.hero` / `Projects.tsx` | Replace with a links-only **Index** page (no project list). Projects move behind `/projects`. |
| `App.tsx` routes | Homepage = new `Home` (links). Add a real `/projects` route for the work that was on `/`. |
| `src/data/links.ts` | Reuse for the homepage link list (label + `to` + short descriptor). |
| `PageHeader` | Keep; eyebrow in mono/`--accent`, tighten intro measure. |
| Fonts | Add serif headings + Inter body + mono meta via `index.html` or self-hosted files. |
| New: `src/theme.ts`, `ThemeToggle`, `src/theme.css` | Token file imported once; toggle in `Layout`; head script in `index.html`. |
| `public/favicon.svg` (`#863bff`) | Recolour to `--accent`, or leave and revisit. |

Implementation order: (1) token file + `data-theme` plumbing + head script,
(2) `ThemeToggle` in `Layout`, (3) flatten header/footer/page surfaces,
(4) build the links-only `Home` and move projects to `/projects`,
(5) flatten project/blog lists, (6) polish: focus states, reduced motion,
responsive, favicon/OG.

---

## 7. Decisions for you

1. Palette: **Field Notes** / **River Stone**.
2. Homepage: **Option 1 / 2 / 3**.
3. Type: serif headings + Inter (**warm**) vs single Inter (**strict**).
4. Ornament: contour band / horizon line / small leaf mark / none.
5. Toggle control: sun-moon icons or a single text label.
6. Favicon: recolour to accent now, or later?

Tell me the picks and I'll implement the tokens, the toggle, and the new
links-only homepage.
