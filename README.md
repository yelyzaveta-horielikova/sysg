# SysGears Design System

The design system behind the [SysGears](https://sysgears.com) marketing website: a written spec, design tokens, React components and a Storybook that shows them all.

The source of truth for the visual design is the Figma file "Sysgears website 2.0" (page **UI Kit**). This repository turns it into rules and code that both people and AI tools can follow.

## What's inside

```
.
├── design-system/      the spec and the @sysgears/design-system package
│   ├── README.md       index of the spec files: start here
│   ├── system.md       core rules (read first)
│   ├── layout.md       wrapper, grid, breakpoints, block positioning
│   ├── patterns.md     block compositions
│   ├── tokens.json     colours, type, spacing, radii, breakpoints
│   ├── figma-mapping.md  code components ↔ Figma components
│   ├── components/     React components, each with stories and a docs page
│   ├── styles/         turns tokens.json into CSS variables
│   └── assets/         logo, icons, illustrations
├── storybook/          the Storybook app (React + TypeScript + Vite)
└── figma-updates.md    changes still needed in the Figma file
```

## Getting started

You need Node.js 20.19 or newer (22 recommended).

```bash
npm install
```

```bash
npm run storybook
```

Storybook opens at http://localhost:6006. It has two sections:

- **Design System:** the written guidelines (System, Layout, Patterns, Figma mapping) and the token pages.
- **Components:** every component with live examples, controls and its docs page.

To build a static Storybook (output in `storybook/storybook-static`):

```bash
npm run build-storybook
```

## Using the components

The package is a workspace (`@sysgears/design-system`), not yet published to npm. In an app inside this workspace:

```tsx
import { injectTokenStyles } from '@sysgears/design-system/styles/tokens';
import { Button, Card, CardGrid } from '@sysgears/design-system';

injectTokenStyles(); // adds the --sg-* CSS variables and .sg-text-* classes once

export function Example() {
  return <Button variant="primary">Contact us</Button>;
}
```

Load the Geologica variable font with all its axes, as in `storybook/.storybook/preview-head.html`.

## How the system works

- **Tokens first.** Every colour, text style, spacing value, radius and breakpoint comes from `design-system/tokens.json`. Text and spacing are in rem; structural limits (container, breakpoints, borders, radii) are in px.
- **One wrapper, one grid.** Content is at most 1520px wide with 20px side margins, on a 12-column grid. Below 1024px every block stacks.
- **Docs live next to the code.** Each component's `*.mdx` page is its spec. `figma-mapping.md` links every component to its Figma counterpart.
- **Strict foundations, flexible composition.** Tokens, grid and text styles are fixed; how components are combined inside a block is free, within the rules in `layout.md`.

Read `design-system/README.md`, then `design-system/system.md`, before changing anything.

## Contributing

- Keep code, docs and Figma in sync. When code deliberately differs from Figma, add the Figma side to `figma-updates.md`.
- Use tokens instead of raw values. A component-specific value from Figma goes on that component's docs page.
- Each rule lives in one file; link to it instead of repeating it.
- Add or update the component's stories and docs page together with the component.
