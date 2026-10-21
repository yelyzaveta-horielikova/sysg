import type { ReactNode } from 'react';
import './SectionHeading.css';

export interface SectionHeadingProps {
  title: ReactNode;
  /** Optional intro paragraph (max 780px). */
  intro?: ReactNode;
  /**
   * - `stacked` (Figma "Down"): title above the intro, full width. Default.
   * - `inline` (Figma "Right"): title column (max 420) beside the intro; stacks below 1024.
   * - `side` (Figma "Down-fixed"): narrow column (320–420) for the side-heading block layout.
   */
  layout?: 'stacked' | 'inline' | 'side';
  /** Heading level. Block headings are h2. */
  as?: 'h2' | 'h3';
}

/** The heading + intro at the top of every block (Figma "text"). */
export function SectionHeading({ title, intro, layout = 'stacked', as: Tag = 'h2' }: SectionHeadingProps) {
  return (
    <div className={`sg-section-heading sg-section-heading--${layout}`}>
      <div className="sg-section-heading__inner">
        <Tag className="sg-section-heading__title">{title}</Tag>
        {intro && <div className="sg-section-heading__intro">{intro}</div>}
      </div>
    </div>
  );
}
