# SysGears Design System: Core Rules

Read this file first. It describes the existing SysGears website, which is built in WordPress from pre-configured blocks. New pages may use those blocks and arrange components freely, as long as they keep the foundations below.

**Strict foundations, flexible composition.** Tokens, the wrapper, the 12-column grid, gap tokens, density, section spacing, breakpoints and text styles are fixed. How components are combined inside a block is not.

## Hierarchy

```
Page → Block (section) → Pattern → Component → Token
```

- **Page**: a vertical stack of blocks, with the Header at the top and the Footer at the bottom.
- **Block**: one full-width CMS block inside the single wrapper (`layout.md`).
- **Pattern**: a documented block composition (`patterns.md`). Patterns are proven references, not the only allowed blocks (`layout.md` → Composing blocks).
- **Component**: a reusable UI element (`components/`; Figma counterparts in `figma-mapping.md`). New components are allowed when needed.
- **Token**: a visual value (`tokens.json`).



## Principles

1. **One wrapper, one grid.** Every block uses the same container and 12-column grid (`layout.md`).
2. **Light, airy type.** Geologica variable font, mostly thin weights (100–350). Weight 600 appears only in `section-title`, `body-accent` and highlighted article text.
3. **Logo blues on white.** The palette is four logo blues, one dark grey (#393939), white, a grey surface, a divider grey and one accent teal (sharing-insights cards).
4. **Flat surfaces.** Use grey fill, a divider border, or a dark blue or image background. No shadows anywhere.
5. **Responsive by variant switching.** Below 1024px every block switches to its first, stacked variant (`layout.md` → Breakpoints).



## Units

- **rem** (1rem = 16px): text sizes and all spacing. A px number in the docs is a reference value at the 16px root; implement it as px ÷ 16 rem.
- **px**: structural limits only: the container (360–1520), the 20px side margin, breakpoints, min/max widths, borders, radii, and icon and image dimensions.
- There are no separate tablet or mobile type or spacing scales. Type and spacing scale with rem; the layout adapts through breakpoints and variants.



## Decision rules



### Reusing components

1. Check `components/` (or `figma-mapping.md` from the Figma side) for an existing component or variant.
2. If the difference is only content, count, order or a documented variant, reuse the component.
3. Compose existing components before you create anything.
4. Create a new component only when its structure or behaviour is fundamentally different.



### Component options

A component's documented options may differ between places on the same site: for example a Card icon with its tile in one block and without it in another. Inside one grid or list, items share the same options.

### Spacing

- Between and inside blocks: `spacing.section` and the gap tokens (`layout.md`).
- Inside components: the `inset` and `stack` tokens. Where Figma draws a component-specific value (for example 24px between form fields and the button), the component uses it in rem and its docs page records it. Never add values that neither a token nor the component's docs define.



### Colour

Use only `color.palette` and `color.semantic`. Never add a new colour.

### Typography

- **Two layers** live in `tokens.json` → `typography`:
  - `primitive`: raw size, line-height, weight and variable-axis values. Never apply these directly.
  - `semantic`: the 10 text styles, each named by role and built from primitives. Text uses only these.

- **Role, not size.** Pick a style by what the text *is*:


| Role                                       | Style                                      |
| ------------------------------------------ | ------------------------------------------ |
| Page headline, big number                  | `display`                                  |
| Block heading                              | `section-title`                            |
| Card, FAQ, step or column title            | `subsection-title`                         |
| Statement or CTA line                      | `statement`                                |
| Running copy in cards and articles         | `body-article` (emphasis: its `highlight`) |
| Intro under a block heading, chips, fields | `body`                                     |
| Short accent text, footer column heading   | `body-accent`                              |
| Roles, meta, helper text                   | `caption`                                  |
| Nav and other links                        | `link`                                     |
| Button label                               | `button`                                   |


- **Heading levels** follow the style (`display` h1, `section-title` h2, `subsection-title` h3, `statement` h4). Use only one `display` per page.



### Layout and patterns

- Use the block positioning variants, column spans and density rules in `layout.md`.
- Start from a pattern in `patterns.md` when one fits. When none fits, compose the block from components on the grid (`layout.md` → Composing blocks); this needs no new pattern.
- Document a new pattern only if the arrangement will be reused or is explicitly requested.



### Icons

Icons have fixed sizes, whatever their source (UI kit, per-project artwork):


| Use                                                            | Size                          |
| -------------------------------------------------------------- | ----------------------------- |
| Card media icon (with or without tile)                         | 64 × 64 box                   |
| Icon next to a line of text (check row mark, contacts, social) | 24–28, sized to the text line |


## Hard constraints

- Every item in one grid or list uses the same component and variant. Different columns of a block may hold different components.
- A block heading is always the Section heading component.
- Text uses only `typography.semantic` styles.
- Layout constraints (wrapper, margins, breakpoints) are in `layout.md` → Never.

