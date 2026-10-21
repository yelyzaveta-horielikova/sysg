# Patterns (blocks)

Each pattern is one pre-configured CMS block. This file holds **block-level rules only**: which heading layout, which components, column spans, gap tokens and responsive switches. How a component looks and behaves is on its docs page (`components/`).

Patterns are proven references, not a closed list: when none fits, compose the block from components on the grid (`layout.md` → Composing blocks). Unless a pattern says otherwise, every block follows this anatomy:

```
Block (wrapper, max 1520)
├─ Section heading
├─ 60 gap (spacing.section.M)
└─ Content
```

Below 1024 the block switches to its first, stacked variant (`layout.md`). The breakpoints listed are the ones drawn for that block. Header and Footer are global components, not patterns.

---



## Built from existing components



### Card grid

The most common block: a set of equal items under a section heading.

- **Content:** `CardGrid` of one card type (`Card`, `SharingInsightsCard`).
- **Gap:** the pattern's `gap.`* token. `gap.XS` grids (Big-card dividers, Sharing insights) separate items with borders or fills.
- **Responsive:** columns follow density; rows wrap, and the last row may be incomplete.



### Sticky TOC layout

Long content pages with in-page navigation.

- **≥1280:** "Fixed element + text": `TableOfContents` (sidebar) on the left, page blocks on the right, `gap.L`.
- **<1280:** the TOC becomes the collapsed bar under the header.
- TOC items equal the block headings, in order.



### Dark-highlights

A high-emphasis block on a dark or image background. Full-bleed below 1024. White text only.


| Variant | Content                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| Numbers | title (`subsection-title`, column 420) + `StatGrid` of 4 or more `Stat`s (can me odd), `gap.L`. Image background. |
| Check   | `section-title` + `body` (column 420) beside a `CheckList` of `variant="white"` rows. `surface-dark`, radius md.  |


- **Padding:** `inset.lg` (60).
- **≥1024:** two columns. **<1024:** stacked.



### Client-feedback

A single highlighted client quote.

- **≥1024:** `SectionHeading layout="side"` + `ClientFeedback` (fills the rest), `gap.L`.
- **<1024:** stacked.



### Feedback & video

A client quote paired with a video. No section heading.

- **Content:** `ClientFeedback` + `Media kind="video"` in a `border-divider` panel, padding `inset.sm` (30).
- **Layout:** stacked, quote above the video. Exception: side by side (≈50/50) from 1461. 1461 is a block exception, not a system breakpoint.



### Vertical-group

A step-by-step process. 

- **≥1024:** `SectionHeading layout="side"` + `VerticalStepper` (fills the rest).
- **<1024:** stacked.



### Expert-quote

One `ExpertQuote` per block. No section heading. The component switches its own layout at 1024.

### Pros-and-cons

Compare two options.

- **Content:** two columns, each a titled `CheckList` (`check` rows in one, `cross` rows in the other).
- **≥768:** 50/50; the first column has a right `border-divider` and padding `inset.sm` (30). **<768:** the columns stack.
- Both columns list the same criteria in the same order.



### Gallery

Team or office photos, no captions.

- **Content:** a full-width `Media` + bento rows (2fr + 1fr), radius md.
- **≥1024:** `gap.S`; rows alternate [2 small | 1 small] and [1 wide | 1 small].
- **<1024:** big photo, then rows of 2 with a full-width photo between them, `gap.M`.



### Form

The main contact form: one `ContactForm`. Full-bleed below 1024. No section heading (the form has its own).

### FAQ

One `Faq` block (its own Section heading), max 1240, single column at every size. Usually the last block before the form or footer.

---



## Components not built yet in Storybook

These blocks exist in Figma, but at least one of their components has no code version yet. The layout rules below apply once it is built.

### Grey-highlights (CTA)

A conversion block. No section heading.

- **Content:** a single CTA card (`statement` + photo + Primary button).
- **≥1024:** horizontal card. The photo overflows the top edge (the one sanctioned overflow, `layout.md`).
- **<1024:** stacked (statement → photo + button), full-bleed.

### Testimonials

Several client reviews in a bento of Review cards (one Primary + Secondaries), `gap.XS`.

- **≥1280:** row 1 2fr|1fr (Primary + a stack of 2 Secondaries), row 2 2fr|1fr of Secondaries.
- **768–1023:** Primary full width + 2 Secondaries in a row. **<768:** Secondaries only, 1 per row.
- Only one Primary per block.

### Open-source

Social proof from open-source work. No section heading; the number is the heading.

- **Content:** centred big number `display`) + caption (20/1.2 Light, off-scale, max 672) + grid of Logo tiles.
- **Per row:** 4 from 1024 `gap.L`), 3 from 768, 2 from 480, 1 below. Tiles touch below 1024.

### Clients

A client logo wall: Logo tiles (380×226, divider borders), `gap.XS`.

- **≥768:** 4 per row. **<768:** 2 per row. Keep tiles uniform.

