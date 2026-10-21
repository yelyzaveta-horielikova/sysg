import type { CSSProperties, ReactNode } from 'react';
import { Children } from 'react';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import './Block.css';

export interface BlockHeading {
  title: ReactNode;
  intro?: ReactNode;
}

export interface BlockLayoutProps {
  heading?: BlockHeading;
  /**
   * Block positioning variant (layout.md):
   * - `stacked`: heading on top, content below. Default.
   * - `side`: heading column (320–420) beside the content from 1024; stacked below.
   * - `inline`: title beside the intro on top (Section heading "Right"), content below.
   */
  layout?: 'stacked' | 'side' | 'inline';
  /** Heading level. Block headings are h2; a heading inside a block is h3. */
  as?: 'h2' | 'h3';
  /** Content groups. They stack `spacing.section.M` apart. */
  children: ReactNode;
}

/** A Section heading arranged with its content, without the page wrapper. Use it for a group inside a Block. */
export function BlockLayout({ heading, layout = 'stacked', as = 'h2', children }: BlockLayoutProps) {
  const headingLayout = layout === 'stacked' ? 'stacked' : layout === 'side' ? 'side' : 'inline';
  return (
    <div className={`sg-block-layout sg-block-layout--${heading ? layout : 'none'}`}>
      {heading && <SectionHeading title={heading.title} intro={heading.intro} layout={headingLayout} as={as} />}
      <div className="sg-block-layout__content">{children}</div>
    </div>
  );
}

export interface BlockProps extends Omit<BlockLayoutProps, 'as'> {
  /** Anchor id. */
  id?: string;
  /** Coloured or image-background content (dark form): drops the 20px margins below 1024. */
  bleed?: boolean;
  /** Accessible name when there is no heading. */
  label?: string;
}

/** One page block: the single wrapper (max 1520, 20px margins) + Section heading + content. */
export function Block({ id, bleed = false, label, heading, layout, children }: BlockProps) {
  return (
    <section id={id} className={`sg-block${bleed ? ' sg-block--bleed' : ''}`} aria-label={heading ? undefined : label}>
      <div className="sg-block__inner">
        <BlockLayout heading={heading} layout={layout}>
          {children}
        </BlockLayout>
      </div>
    </section>
  );
}

export type ColumnSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ColumnsProps {
  /** Column spans on the 12-column grid, one per child, e.g. [5, 7] or [4, 4, 4]. They should add up to 12. */
  spans: ColumnSpan[];
  children: ReactNode;
}

/**
 * Different content side by side (layout.md → Composing blocks).
 * From 1024: whole-column spans on the 12-column grid, `gap.L` apart, equal height.
 * Below 1024: one column, in source order.
 */
export function Columns({ spans, children }: ColumnsProps) {
  return (
    <div className="sg-columns">
      {Children.toArray(children).map((child, i) => (
        <div key={i} className="sg-columns__item" style={{ '--sg-span': spans[i] ?? 12 } as CSSProperties}>
          {child}
        </div>
      ))}
    </div>
  );
}
