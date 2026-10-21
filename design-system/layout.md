# Layout

All values come from `tokens.json`. This file defines the structural rules.

## Container (wrapper)

- There is one wrapper for the whole site.
- The viewport range is 360 to 1520+. The content is `min(viewport − 2×20, 1520)`, centred.
- Below 1560px viewport width the side margins are a fixed 20px. Above 1560 the content stays at 1520 and the margins grow.
- Exceptions:
  - **Header**: spans the viewport minus the 20px margins, up to 1920 (not capped at 1520).
  - **Coloured or image-background blocks** (dark form, Dark-highlights, Grey-highlights): below 1024 they drop the 20px margins and run edge to edge.

## Grid

The same grid is used consistently across the entire website. Use components or experiment with different layouts while maintaining the grid structure: use up to 12 columns as needed.

- 12 columns span the container (360–1520, 20px side margins).
- **The gutter is a gap token.** There is no fixed gutter. Each grid uses one of `gap.L` 1.875rem (30), `gap.M` 1.2rem (19.2), `gap.S` 1rem (16) or `gap.XS` 0. The pattern sets which one.
- An item spans whole columns. Item widths come from **density**, not fixed pixels.

### Density (items per row)

Use the size-modifier levels "as a reference for determining the optimal number of items per row based on the available container width". Pick the level that suits the item's minimum width; the row count drops as the container narrows.


| Density | Per row @1520 | Columns per item |
| ------- | ------------- | ---------------- |
| XXS     | 12            | 1                |
| XS      | 6             | 2                |
| S       | 4             | 3                |
| M       | 3             | 4                |
| L       | 2             | 6                |
| XL      | 1             | 12               |


## Block positioning variants

Each block places its **Section heading** (heading + intro) in relation to its content in one of these ways. Every variant falls back to **Stacked** below 1024.


| Variant              | Applies   | Structure                                                                                      |
| -------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| Stacked              | all sizes | heading/intro on top, content below (`spacing.section.M`)                                      |
| Side heading         | ≥1024     | heading column (`container.sideHeading`: min 320, max 420) + content (fills the rest), `gap.L` |
| Fixed element + text | ≥1280     | sticky element, e.g. TOC (296–365), + content, `gap.L`                                         |


The side heading column is at least 320 and at most 420 (`container.sideHeading`), as in every block that uses it (Client-feedback, Vertical-group, Dark-highlights). It never grows wider than 420, even when the content column has room. In "Fixed element + text" the fixed element (for example the TOC) is 296–365 wide.

## Composing blocks

Patterns are not the only allowed layouts. A block may place **different content side by side** (for example a Client feedback card next to a 2×2 card grid, or a check list next to an image), as long as:

- each column spans whole columns of the 12-column grid: 4+8, 5+7, 6+6, 3+9, 4+4+4, and so on (the side-heading column is the one exception, 320–420);
- columns are `gap.L` apart; items inside a column use the gap token of their own grid;
- a grid inside a column follows density, counted on that column's width;
- the block keeps one Section heading (Stacked or Side heading) and `spacing.section.M` before its content;
- below 1024 the columns stack in source order (the first, stacked variant), full width.

Mixed columns stretch to equal height. A column may be another component, a card grid, a list, an image or text.

## Breakpoints

The global rule is that **≥1024 uses the block's variants and <1024 stacks**. Within that, the number of items per row follows the available width (density), so patterns change their column count at these widths:


| Width | Used by                                                              |
| ----- | -------------------------------------------------------------------- |
| 360   | minimum supported                                                    |
| 480   | header (mobile → tablet), awards and open-source logos               |
| 768   | most card grids go from 1 column to 2 or more; footer goes to tablet |
| 1024  | global variant switch; footer goes to desktop                        |
| 1280  | header goes to desktop; sticky TOC; 3-column card grids              |


This table is the complete list of system breakpoints. A width used by only one block is an **exception**: it is noted on that pattern in `patterns.md` and is never reused or copied into new blocks.

## Vertical spacing


| Token               | Value          | Where                                                             |
| ------------------- | -------------- | ----------------------------------------------------------------- |
| `spacing.section.L` | 9.375rem (150) | between blocks                                                    |
| `spacing.section.M` | 3.75rem (60)   | inside a block: section heading → content; between content groups |


Section spacing is the same at every breakpoint and scales through rem (`system.md` → Units).

## Responsive transforms


| Desktop                        | Tablet (768–1023/1279)                              | Mobile (<768)    |
| ------------------------------ | --------------------------------------------------- | ---------------- |
| 6 per row (Small-card)         | 4 (1280) → 3 (768)                                  | 2 per row (wrap) |
| 3 per row                      | 2                                                   | 1                |
| 2 per row                      | 2                                                   | 1                |
| Side heading + content         | stacked                                             | stacked          |
| Horizontal card (image │ text) | stacked (image above text)                          | stacked          |
| Sticky TOC sidebar (≥1280)     | collapsed bar under the header, opens as an overlay | same             |
| Bento (2fr + 1fr)              | stack 1 big + 2 small below                         | 1 per row        |


## Alignment rules

- All content aligns to the wrapper edges. Never indent a block.
- Grid items stretch to equal height within a row (grid rows "hug" content, items stretch).
- Images fill their tile or card (`fill`, radius md). For set ratios use the `Media` component's `ratio` (1:1, 2:1, 4:1, 21:9, 14:3, 9:8, 6:7, 1:2, 9:21, A4 and Letter).
- Column widths come from whole grid columns, never from fixed pixel widths.
- Do not use arbitrary offsets. The one sanctioned overflow is the CTA card photo, which overflows the top edge on desktop.

## Never

- Never place content outside the wrapper, except as listed above.
- Never use a max width other than 1520, or a side margin other than 20.
- Never invent intermediate breakpoints.

