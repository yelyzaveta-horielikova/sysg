import type { ReactNode } from 'react';
import './CheckRow.css';

export interface CheckRowProps {
  /** `check` for a met point or benefit, `cross` for a missing one (Figma: Dark-check / Dark-cross). */
  mark?: 'check' | 'cross';
  /** Figma names: `dark` text on light surfaces, `white` on dark or image surfaces (Figma: White). */
  variant?: 'dark' | 'white';
  /** Optional title line above the text (Figma Dark-check / Dark-cross). */
  title?: ReactNode;
  /** `large` = 18px text (18/1.4 ExtraLight, hard-coded website value), for text-only rows in the case-study goals. Default 16px. */
  textSize?: 'default' | 'large';
  /** The point itself. */
  children: ReactNode;
}

/** Outlined circle with a check or a cross (Figma "check-one", Icon Park). 28px, colour from CSS. */
function Mark({ mark }: { mark: 'check' | 'cross' }) {
  return (
    <svg className="sg-check-row__icon" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="14" cy="14" r="8.1" stroke="currentColor" strokeWidth="1.1" />
      {mark === 'check' ? (
        <path d="M10.7 14.2l2.5 2.5 4.9-4.9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M11.4 11.4l5.2 5.2M16.6 11.4l-5.2 5.2" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      )}
    </svg>
  );
}

/** A point with a check or cross mark (Figma "row"). Place rows in a `CheckList`. */
export function CheckRow({ mark = 'check', variant = 'dark', title, textSize = 'default', children }: CheckRowProps) {
  return (
    <li className={`sg-check-row sg-check-row--${variant} sg-check-row--${mark}${textSize === 'large' ? ' sg-check-row--large' : ''}`}>
      <span className={`sg-check-row__mark${title ? ' sg-check-row__mark--title' : ''}`}>
        <Mark mark={mark} />
        <span className="sg-check-row__sr">{mark === 'check' ? 'Yes: ' : 'No: '}</span>
      </span>
      <span className="sg-check-row__content">
        {title && <span className="sg-check-row__title">{title}</span>}
        <span className="sg-check-row__text">{children}</span>
      </span>
    </li>
  );
}

export interface CheckListProps {
  /** `2` puts rows in two columns from 768 (Figma: case-study goals). One column below. */
  columns?: 1 | 2;
  children: ReactNode;
}

/** A list of Check rows, `gap.L` apart. */
export function CheckList({ columns = 1, children }: CheckListProps) {
  return <ul className={`sg-check-list sg-check-list--cols-${columns}`}>{children}</ul>;
}
