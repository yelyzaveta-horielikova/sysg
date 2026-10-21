# SysGears Design System

The design system behind the [SysGears] website: a written spec, design tokens, React components and a Storybook that shows them all.

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
