# Figma ↔ code mapping

Every component in `@sysgears/design-system` and the Figma component it comes from. The Figma file is "Sysgears website 2.0", page **UI Kit**. Figma components with no code counterpart are not listed.

Node links have the form `https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=<id>`.

## Page structure


| Code              | Figma component › variant                       | Figma section | Node                                                                                                    | Code usage                                                                                                       |
| ----------------- | ----------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Header`          | **Header** › State=Desktop / Tablet / Mobile    | Header        | [540-11013](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=540-11013) | `<Header navItems ctaLabel ctaHref onSearchClick onMenuClick />`. The layout switches automatically by viewport. |
| `NavLink`         | **Nav** › Tab=Default / Hover, Chevron=yes / no | Header        | [540-10124](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=540-10124) | `{ label, href, hasSubmenu }` in `navItems`. `hasSubmenu` = Chevron=yes; hover is automatic.                     |
| `Footer`          | **Footer** › State=Desktop / Tablet / Phone     | Footer        | [535-24109](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=535-24109) | `<Footer content reviews socials />`. The layout switches automatically by viewport.                             |
| `TableOfContents` | **on-this-page** › Variant=Default              | Components    | [573-19914](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=573-19914) | `<TableOfContents items />`. A sidebar from a 1280 viewport (`variant="sidebar"` forces it).                     |
|                   | **on-this-page** › Variant=Collapsed            | same          | same                                                                                                    | Below 1280: the collapsed bar (`variant="bar"` forces it).                                                       |
|                   | **on-this-page** › Variant=Open                 | same          | same                                                                                                    | The bar when opened: tap it, or set `defaultOpen`.                                                               |




## Headings and text


| Code                | Figma component › variant                                               | Figma section   | Node                                                                                                    | Code usage                                                            |
| ------------------- | ----------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `SectionHeading`    | **text** › Direction=Down                                               | Headings        | [542-12882](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=542-12882) | `layout="stacked"` (default)                                          |
|                     | **text** › Direction=Right                                              | same            | same                                                                                                    | `layout="inline"`                                                     |
|                     | **text** › Direction=Down-fixed                                         | same            | same                                                                                                    | `layout="side"`                                                       |
| `HeroText`          | **hero-text**                                                           | Headings        | [573-19617](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=573-19617) | `<HeroText title lead cta />`                                         |
| `Faq` (+ `FaqItem`) | **faq-text** (one question and answer)                                  | Headings        | [563-16856](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=563-16856) | `<Faq title intro items />`; each item is one faq-text                |
| `Stat`              | **text-field** › State=Default                                          | Headings        | [542-13068](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=542-13068) | `<Stat value label description />`                                    |
| `StatGrid`          | **Sysgears-in-numbers-block** › Variant=Numbers (Desktop, Tablet-phone) | Dark-highlights | [542-13093](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=542-13093) | `<StatGrid>` with `Stat` children. The layout switches automatically. |




## Lists and steps


| Code              | Figma component › variant                                             | Figma section   | Node                                                                                                    | Code usage                                                                                      |
| ----------------- | --------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `CheckRow`        | **row** › State=Dark-check                                            | Components      | [606-5562](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=606-5562)   | `<CheckRow mark="check" variant="dark" title>`                                                  |
|                   | **row** › State=Dark-cross                                            | same            | same                                                                                                    | `mark="cross" variant="dark"`                                                                   |
|                   | **row** › State=White                                                 | same            | same                                                                                                    | `variant="white"` (on dark or image surfaces)                                                   |
| | **Checkbox** | Components | [563-28001](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=563-28001) | `<CheckRow>` with no title (default `mark="check"`) |
| `CheckList`       | **Sysgears-in-numbers-block** › Variant=Check (Desktop, Tablet-phone) | Dark-highlights | [542-13093](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=542-13093) | `<CheckList>` with `CheckRow variant="white"` children. `columns={2}` for the case-study goals. |
| `VerticalStepper` | **vertical-stepper**                                                  | Components      | [608-11701](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=608-11701) | `<VerticalStepper steps={[{ title, text, list }]} />`                                           |




## Actions


| Code          | Figma component › variant                                        | Figma section | Node                                                                                                    | Code usage                                                           |
| ------------- | ---------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Button`      | **CTA-blue** › Variant=Primary, State=Default / Hover / Loading  | Components    | [573-19566](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=573-19566) | `variant="primary"`. Hover is automatic; `loading` shows the loader. |
|               | **CTA-blue** › Variant=Outlined, State=Default / Hover / Loading | same          | same                                                                                                    | `variant="outlined"`                                                 |
|               | **CTA-blue** › Variant=White, State=Default / Hover / Loading    | same          | same                                                                                                    | `variant="white"`                                                    |
| `ArrowButton` | **Arrows/Var.2** (external library, no local component)          | none          | none                                                                                                    | `variant="white"` or `variant="blue"`                                |




## Cards

In code, one `Card` covers four Figma card components through props. Each Figma card component's description repeats its "Code:" line.


| Code                     | Figma component › variant                                                | Figma section | Node                                                                                                    | Code usage                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Card`                   | **Card** › Text=Left                                                     | Cards         | [540-10093](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=540-10093) | `<Card surface="filled" media={{ kind: 'illustration', src }} align="left" />`                                          |
|                          | **Card** › Text=Centered                                                 | same          | same                                                                                                    | `align="center"` centres only the illustration and title                                                                |
|                          | **Card** › State=Hover                                                   | same          | same                                                                                                    | Pass `href`; hover is automatic                                                                                         |
|                          | **Small-card** › State=Default                                           | Cards         | [540-9972](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=540-9972)   | `<Card surface="filled" media={{ kind: 'illustration', src }} titleSize="small" align="center" href="…" />`             |
|                          | **Small-card** › State=Hover                                             | same          | same                                                                                                    | Automatic when `href` is set                                                                                            |
|                          | **industries-card**                                                      | Cards         | [542-14557](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=542-14557) | `<Card surface="filled" badges={[…]} />`: title at the top, badges at the bottom                                        |
|                          | *(not in Figma)* chip card with image                                    | none          | none                                                                                                    | `<Card media={{ kind: 'background', src }} badges={[…]} />`                                                             |
|                          | **Big-card** › Icon=S                                                    | Cards         | [549-15311](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=549-15311) | `<Card surface="outlined" media={{ kind: 'icon', icon }} />`                                                            |
|                          | **Big-card** › Icon=M                                                    | same          | same                                                                                                    | `<Card surface="outlined" media={{ kind: 'illustration', src }} />`                                                     |
|                          | **Big-card** › State=Active                                              | same          | same                                                                                                    | `titleAccent`                                                                                                           |
|                          | **Big-card** › State=Inactive                                            | same          | same                                                                                                    | No `titleAccent`                                                                                                        |
|                          | **Big-card** › State=Hover                                               | same          | same                                                                                                    | Pass `href`; hover is automatic                                                                                         |
|                          | **Software Development** (64px icon tile)                                | Cards         | [542-14610](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=542-14610) | `media={{ kind: 'icon', icon: <Icon name="software-development" /> }}`                                                  |
| `CardGrid`               | Card grids in the layout frames (Darker-grey-cards, Cards-with-dividers) | Grid          | none                                                                                                    | Filled cards: `<CardGrid variant="gap" gap="…">`. Big-cards: `<CardGrid variant="divided">` (lines only between cards). |
| `Badge` (+ `BadgeGroup`) | **Badge** › Size=Medium / Small, Variant=Black / White                   | Cards         | [550-15469](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=550-15469) | `<Badge size variant />` (`medium` or `small`; `black` or `white`), grouped in `<BadgeGroup>`                           |
| `ClientFeedback`         | **Client-feedback**                                                      | Cards         | [550-15445](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=550-15445) | `<ClientFeedback platform rating quote author />`                                                                       |
| `ExpertQuote`            | **expert-quote-card** › Variant=Desktop, Tablet/mobile                   | Cards         | [622-6608](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=622-6608)   | `<ExpertQuote quote name role photo />`. The layout switches automatically at a 1024 viewport.                          |
| `SharingInsightsCard`    | **Sharing-insights-card** › Pavlenko                                     | Cards         | [622-9735](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=622-9735)   | `<SharingInsightsCard tone="accent" title href author />`                                                               |
|                          | **Sharing-insights-card** › Peremetko                                    | same          | same                                                                                                    | `tone="muted"`                                                                                                          |
|                          | **Sharing-insights-card** › Rybalka                                      | same          | same                                                                                                    | `tone="teal"`                                                                                                           |




## Form


| Code           | Figma component › variant                                                  | Figma section | Node                                                                                                    | Code usage                                                                 |
| -------------- | -------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `ContactForm`  | **dark-form** › Variant=Desktop / Tablet / Mobile                          | Form          | [563-28728](https://www.figma.com/design/dNuuWAkz8xH9Squ9ozlfUb/Sysgears-website-2.0?node-id=563-28728) | `<ContactForm onSubmit />`. The layout switches automatically by viewport. |
|                | **dark-form** › State=Default                                              | same          | same                                                                                                    | `status="idle"` (default)                                                  |
|                | **dark-form** › State=Loader                                               | same          | same                                                                                                    | `status="loading"`; also set automatically while `onSubmit` runs           |
|                | **dark-form** › State=Drag-drop                                            | same          | same                                                                                                    | Automatic while files are dragged over the panel                           |
|                | **dark-form** › State=Sent                                                 | same          | same                                                                                                    | `status="sent"`; also set automatically after a successful `onSubmit`      |
| `TextField`    | **Input** (external-library copy inside dark-form)                         | Form          | in 563-28728                                                                                            | `<TextField label error />`; `multiline` for the request field             |
| `FileDropzone` | **_Custom** uploader + **file** (external-library copies inside dark-form) | Form          | in 563-28728                                                                                            | `<FileDropzone files onChange />`                                          |


