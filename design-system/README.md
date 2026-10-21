# SysGears Design System Spec

A compact, framework-independent specification of the SysGears WordPress website.

This folder is also the `@sysgears/design-system` package. Storybook (`../storybook`) displays it; run it from the workspace root with `npm run storybook`.


| File               | Contains                                                                                | Read when                                    |
| ------------------ | --------------------------------------------------------------------------------------- | -------------------------------------------- |
| `system.md`        | core rules, units, typography roles, decision rules                                     | **always first**                             |
| `layout.md`        | wrapper, grid, density, block positioning, breakpoints, section spacing                 | creating or changing page or block structure |
| `patterns.md`      | block compositions: which components, spans, gaps and responsive switches               | composing a block                            |
| `tokens.json`      | colours, type scale, spacing, radii, borders, breakpoints, container, grid              | using any visual value                       |
| `components/`      | React components with their stories and docs pages (`*.mdx`, shown in Storybook)        | using a component; its docs page is its spec |
| `figma-mapping.md` | every code component ↔ its Figma component, variants and props                          | moving between Figma and code                |
| `styles/tokens.ts` | turns `tokens.json` into CSS variables (`--sg-*`) and text-style classes (`.sg-text-*`) | wiring tokens into an app                    |
| `assets/`          | logo, icons and illustrations exported from Figma                                       | using images or icons                        |


