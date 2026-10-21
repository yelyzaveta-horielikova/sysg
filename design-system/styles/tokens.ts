// Single source of truth: ../tokens.json.
// This module only converts it to CSS custom properties and text-style classes.
import rawTokens from '../tokens.json';

type Leaf = { value?: string | number; ref?: string; opacity?: number; px?: number; [k: string]: unknown };
type Group = Record<string, Leaf>;

export const tokens = rawTokens as unknown as {
  color: { palette: Group; semantic: Group };
  typography: {
    primitive: {
      family: Group;
      size: Group;
      lineHeight: Group;
      weight: Group;
      axis: Record<string, { axis: string; value: number }>;
    };
    semantic: Record<string, TextStyle | string>;
  };
  spacing: Record<string, Group | string>;
  radius: Group;
  border: { width: number; [k: string]: unknown };
  shadow: Group;
  breakpoint: Record<string, Leaf | string>;
  container: Record<string, Leaf & { min?: number; max?: number }>;
  grid: { columns: Leaf; density: Record<string, number | string> };
};

export type TextStyle = {
  figma: string;
  purpose: string;
  size: string;
  lineHeight: string;
  weight: string;
  axes: string[] | 'default';
  level?: string;
  use: string;
  highlight?: { weight: string };
};

/** Keys starting with "$" are metadata, not tokens. */
export const entries = <T,>(group: Record<string, T>) =>
  Object.entries(group).filter(([k, v]) => !k.startsWith('$') && typeof v === 'object' && v !== null) as [string, T][];

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

const hexToRgba = (hex: string, alpha: number) => {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

// ---- Colour -------------------------------------------------------------
export const paletteVar = (name: string) => `--sg-palette-${name}`;
export const colorVar = (name: string) => `--sg-color-${name}`;

export const resolveColor = (leaf: Leaf): string => {
  const hex = leaf.ref ? String(tokens.color.palette[leaf.ref].value) : String(leaf.value);
  return leaf.opacity !== undefined ? hexToRgba(hex, leaf.opacity) : hex;
};

// ---- Typography ---------------------------------------------------------
const prim = tokens.typography.primitive;

export const textStyles = entries(tokens.typography.semantic as Record<string, TextStyle>);

export const variationSettings = (style: TextStyle) => {
  const axes = style.axes === 'default' ? ['crsv-off', 'shrp-none'] : style.axes;
  return axes.map((a) => `"${prim.axis[a].axis}" ${prim.axis[a].value}`).join(', ');
};

/** Resolved values of a semantic text style, for docs and for components. */
export const resolveTextStyle = (style: TextStyle) => ({
  fontSize: String(prim.size[style.size].value),
  lineHeight: Number(prim.lineHeight[style.lineHeight].value),
  fontWeight: Number(prim.weight[style.weight].value),
  fontVariationSettings: variationSettings(style),
});

// ---- CSS generation -----------------------------------------------------
const px = (v: unknown) => (typeof v === 'number' ? `${v}px` : String(v));

export function buildCss(): string {
  const vars: string[] = [];
  const add = (name: string, value: string | number) => vars.push(`  ${name}: ${value};`);

  for (const [k, v] of entries(tokens.color.palette)) add(paletteVar(k), String(v.value));
  for (const [k, v] of entries(tokens.color.semantic)) {
    add(colorVar(k), v.ref && v.opacity === undefined ? `var(${paletteVar(v.ref)})` : resolveColor(v));
  }

  add('--sg-font-family-base', `'${prim.family.base.value}', sans-serif`);
  for (const [k, v] of entries(prim.size)) add(`--sg-font-size-${k}`, String(v.value));
  for (const [k, v] of entries(prim.lineHeight)) add(`--sg-line-height-${k}`, String(v.value));
  for (const [k, v] of entries(prim.weight)) add(`--sg-font-weight-${k}`, String(v.value));
  for (const [name, style] of textStyles) {
    add(`--sg-text-${name}-size`, `var(--sg-font-size-${style.size})`);
    add(`--sg-text-${name}-line-height`, `var(--sg-line-height-${style.lineHeight})`);
    add(`--sg-text-${name}-weight`, `var(--sg-font-weight-${style.weight})`);
    add(`--sg-text-${name}-variation`, variationSettings(style));
  }

  for (const [group, items] of Object.entries(tokens.spacing)) {
    if (group.startsWith('$') || typeof items !== 'object') continue;
    for (const [k, v] of entries(items)) add(`--sg-space-${group}-${kebab(k)}`, String(v.value));
  }

  for (const [k, v] of entries(tokens.radius)) add(`--sg-radius-${k}`, px(v.value));
  add('--sg-border-width', px(tokens.border.width));
  add('--sg-border-divider', `var(--sg-border-width) solid var(${colorVar('border-divider')})`);
  add('--sg-border-emphasis', `var(--sg-border-width) solid var(${colorVar('border-emphasis')})`);
  for (const [k, v] of entries(tokens.shadow)) add(`--sg-shadow-${k}`, String(v.value));

  // Structural limits stay in px (system.md → Units).
  for (const [k, v] of entries(tokens.breakpoint as Record<string, Leaf>)) add(`--sg-breakpoint-${k}`, px(v.value));
  for (const [k, v] of entries(tokens.container)) {
    if (v.value !== undefined) add(`--sg-container-${kebab(k)}`, px(v.value));
    if (v.min !== undefined) add(`--sg-container-${kebab(k)}-min`, px(v.min));
    if (v.max !== undefined) add(`--sg-container-${kebab(k)}-max`, px(v.max));
  }
  add('--sg-grid-columns', String(tokens.grid.columns.value));

  const classes = textStyles.map(
    ([name]) => `.sg-text-${name} {
  font-family: var(--sg-font-family-base);
  font-size: var(--sg-text-${name}-size);
  line-height: var(--sg-text-${name}-line-height);
  font-weight: var(--sg-text-${name}-weight);
  font-variation-settings: var(--sg-text-${name}-variation);
}`,
  );
  const highlight = textStyles
    .filter(([, s]) => s.highlight)
    .map(([name, s]) => `.sg-text-${name} :is(strong, b) { font-weight: var(--sg-font-weight-${s.highlight!.weight}); }`);

  return [`:root {\n${vars.join('\n')}\n}`, ...classes, ...highlight].join('\n\n');
}

/** Injects the token CSS once per document. */
export function injectTokenStyles(doc: Document = document) {
  if (doc.getElementById('sg-design-tokens')) return;
  const el = doc.createElement('style');
  el.id = 'sg-design-tokens';
  el.textContent = buildCss();
  doc.head.appendChild(el);
}
