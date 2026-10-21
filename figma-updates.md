# Figma updates

Changes needed in the Figma "UI Kit" so it matches the design system as built in Storybook (`design-system/`). Each item gives what Figma has now and what it should become.

Items marked **decide** are places where the code departs from Figma on an assumption. Either update Figma, or tell us and the code goes back to the Figma version.

---

## 1. Styles and variables



### Text styles

- [ ] **Fonts table (UI Kit):** fill in the variable axes (CRSV, SHRP) for Medium-font-size, Large-font-size-strong, Small-font-size, CTA & Nav and Button. The UI Kit table still lists axes only for Heading-1 to 4 and Large-font-size. The code assumes CRSV 0 / SHRP 0.
- [ ] **Heading-4 in the dark form:** the heading still has line height 1.3. Apply the updated Heading-4 style (1.2).
- [ ] **Optional:** rename the heading styles by role, because their numbers don't follow size order (Heading-4 26 > Heading-2 22 > Heading-3 20):

  | Figma name             | Code name        |
  | ---------------------- | ---------------- |
  | Heading-1              | display          |
  | Heading-2              | section-title    |
  | Heading-3              | subsection-title |
  | Heading-4              | statement        |
  | Large-font-size (text) | body-article     |
  | Large-font-size-strong | body-accent      |
  | Medium-font-size       | body             |
  | Small-font-size        | caption          |
  | CTA & Nav              | link             |
  | Button                 | button           |


---



## 2. Layout documentation frames

- [ ] **"Grid" frame:** remove the 80px gutter. The written rule defines no fixed gutter: the gutter is the gap token each pattern uses (Gap-L 30, Gap-M 19.2, Gap-S 16, Gap-XS 0).
- [ ] **Use Gap-M (19.2) where 20 is drawn:** Darker-grey-cards grids, the Size modifier (density) demos and Gallery.
- [ ] **"Gap-XS" demo:** it's drawn with a 16px gap; it should be 0.
- [ ] **Snap gaps that aren't tokens to a token (or confirm them as exceptions):**
  - Stat grid 32 → Gap-L 30
  - Testimonials 0.5 hairline → Gap-XS 0
  - Awards row gap 96 (no token; confirm)
  - Client-feedback block: 0 between the side heading and the card → Gap-L 30
  - 32 in components → Inset-S 30: Button side padding, Client-feedback card top/bottom padding, Footer top/bottom padding, Table of contents bar gap
  - Dark-highlights: 60–80 between the two columns → Gap-L 30
- [ ] **Side-heading column:** max **420**, min 320, everywhere. Today Figma has:
  - 365 in the Positioning-variants demo
  - max 465 in the Section heading "Right" master
  - 260–400 in the Section heading "Down-fixed" master
- [ ] **One-off breakpoints:** mark 1461 (Feedback & video) and 1600 (Darker-grey-cards-S) as block exceptions. Also define 1560–1599 for Darker-grey-cards-S; today it's undefined.
- [ ] **Header frame:** it repeats the generic "switch to the first variant below 1024px" text, but its variants are labelled 1280+ / 480–1279 / 360–479. Correct the text.
- [ ] **Positioning variants:** describe what the two "Fixed element" variants do between 1024 and 1279. The text says everything stacks below 1024, but the Fixed variants only start at 1280.
- [ ] **Size modifier:** the text promises breakpoints for the density levels (XXS–XL) but shows none. Add the item counts per row, or confirm the counts read from the drawings: 12 / 6 / 4 / 3 / 2 / 1.
- [ ] **Units:** state on the spacing and type frames that text sizes and spacing are in rem, and only structural limits (container, margins, breakpoints, borders, radii) are in px. There's no separate tablet or mobile scale.

---



## 3. Components

### Badge

- [ ] **Swap the chip card's 16 badges** from the external-library "Badge" (Size=Regular, 18px) to the local Badge Medium / Black.
- [ ] **Remove the external Badge set** from use.



### Card

Figma keeps its separate card components (Card, Small-card, industries-card, Big-card). In code one `Card` covers them; the mapping is in `design-system/figma-mapping.md`, and each Figma component's description has a "Code:" line.

- [ ] **Align values with code (or confirm Figma's):**
  - Padding 30 (40 at the top of filled cards with an illustration and a large title)
  - Content gap 20. Figma uses 40 between text and list on Big-card, and 60 between title and chips on industries-card.
- [ ] **Card › Text=Centered:** centre only the illustration and title; text, list and badges stay left-aligned.
- [ ] **Icon tile on a filled card:** white tile. **decide:** Figma only has the tile on outlined cards.
- [ ] **industries-card:** title at the top, badges at the bottom (min height 278).
- [ ] **Add a chip card with an image** (exists in code): the image fills the card; white title and White badges at the bottom; no overlay.
- [ ] **Big-card grid (Cards-with-dividers):** divider lines only between cards, with no outer border.



### Header

- [ ] **Nav item hover:** 4px SG blue underline, SG medium label, chevron flips. This is already in Figma; check it's applied to every nav item.
- [ ] **Add the missing designs** for the submenu/mega-menu, search overlay and burger menu.



### Footer

- [ ] **Review badges:** platform logos in **white** on the SG dark badge. Figma draws them in #393939, which is nearly invisible.
- [ ] **Add a link hover state** (SG medium). **decide:** Figma has none; the code reuses the nav hover.
- [ ] **Phone:** the five social icons stay on one line. At 360px the gap shrinks from 24 to 20.



### Table of contents

- [ ] **Border width:** the lines are 2px, but the border token is 1px. Confirm 2px is intended.



### Hero, FAQ

- [ ] **Hero:** design the visual treatment (background or image) and the tablet and mobile versions.
- [ ] **FAQ:** confirm the answers are always visible (no accordion).



### Check row

- [ ] **Mark size is 28px everywhere.** Figma draws 38px (White), 28px (Dark) and a filled 24px circle (case-study goals, Checkbox item).
- [ ] **Case-study goals:** use the outlined check and cross marks instead of the filled SG medium check and filled red cross.
- [ ] **On light surfaces the check uses SG medium.** Figma's Dark-check draws it white, which is invisible on white.



### Sharing insights card

- [ ] **Three tones:** SG medium (white text), Gray bg (dark text) and Teal (dark text).
- [ ] **Arrow button colour on the grey card. decide:** the code uses the **blue** arrow button (SG medium circle, white arrow) for contrast; Figma uses the white one.



### Form

- [ ] **Make the Input, File/uploader and CTA-white components local.** Today they're copies from an external library.
- [ ] **Input disabled state:** it looks identical to Filled. Add a visual difference if one is wanted.
- [ ] **File size text** uses white at 60%. Make it a style, or use a token colour.
- [ ] **Add the validation messages** used in code:
  - "Please enter your name."
  - "Please enter a valid email."
  - "The file is larger than 30 MB."

---



## 4. Clean-up

- [ ] **Delete the device-prefixed text styles:** `Desktop/…`, `Tablet/…`, `Mobile/…`, `H5`, `Text small`.
- [ ] **Delete the Montserrat/Roboto** `typography/`* **styles and the MUI variables** (palette, typography, shape, material/colors). They're leftovers from another library.
- [ ] **Remove external-library components** that are now local or unused. Today they live on the hidden "Internal Only Canvas":
  - Badge, Input, File, Chip
  - CTA-white, Arrows/Var.2, Review, Logos, Fixed-aspect-ratio-spacer

---



## 5. Specs still missing in Figma

- [ ] **Hero:** background or image treatment, and responsive versions.
- [ ] **Navigation:** dropdown/mega-menu, search overlay and burger menu content.
- [ ] **"Rarely-used blocks":** these exist only as screenshots. They need real component specs: the 2×2 case grid with "See more cases", platform cards, the article banner (white button on blue), review-platform cards, and the article teaser grid.
- [ ] **Pros-and-cons-colored:** the name says "colored", but no colour treatment is drawn.
- [ ] **Page composition rules:** how often Grey-highlights (CTA) may appear, and whether FAQ is always near the end. Both are currently inferred.
- [ ] **Light-surface input:** only the dark-form input exists.