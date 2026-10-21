import type { CSSProperties, ReactNode } from 'react';
import './CardGrid.css';

/** Columns per viewport breakpoint (sm 768, md 1024, lg 1280 — tokens.json). Missing steps inherit the previous one. */
export type GridColumns = number | { base?: number; sm?: number; md?: number; lg?: number };

export interface CardGridProps {
  /**
   * - `gap`: items separated by a gap token (filled cards).
   * - `divided`: items touch and are separated by 1px divider lines between them only — no outer border (outlined cards).
   */
  variant?: 'gap' | 'divided';
  /** Gap token for `gap` grids (layout.md → Grid). `XS` = items touch with no lines. Ignored for `divided`. */
  gap?: 'L' | 'M' | 'S' | 'XS';
  columns?: GridColumns;
  children: ReactNode;
}

export function CardGrid({ variant = 'gap', gap = 'M', columns = { base: 1, sm: 2, lg: 3 }, children }: CardGridProps) {
  const c = typeof columns === 'number' ? { base: columns } : columns;
  const base = c.base ?? 1;
  const sm = c.sm ?? base;
  const md = c.md ?? sm;
  const lg = c.lg ?? md;
  const style = {
    '--sg-grid-cols-base': base,
    '--sg-grid-cols-sm': sm,
    '--sg-grid-cols-md': md,
    '--sg-grid-cols-lg': lg,
    '--sg-grid-gap': variant === 'divided' ? '0px' : `var(--sg-space-gap-${gap.toLowerCase()})`,
  } as CSSProperties;

  return (
    <div className={`sg-card-grid sg-card-grid--${variant}`} style={style}>
      <div className="sg-card-grid__items">{children}</div>
    </div>
  );
}
