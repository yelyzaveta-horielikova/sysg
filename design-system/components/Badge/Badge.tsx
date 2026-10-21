import type { ReactNode } from 'react';
import './Badge.css';

export interface BadgeProps {
  /** `medium` is the default chip; `small` for dense contexts. */
  size?: 'medium' | 'small';
  /** Figma names: `black` on light surfaces, `white` on images or dark surfaces. */
  variant?: 'black' | 'white';
  children: ReactNode;
}

/** The local Figma "Badge" (Page 1 › Cards). The external-library "Badge" (Regular/Small) is not part of the system. */
export function Badge({ size = 'medium', variant = 'black', children }: BadgeProps) {
  return <span className={`sg-badge sg-badge--${size} sg-badge--${variant}`}>{children}</span>;
}

/** Chip cloud: badges wrapping with a 10px gap. */
export function BadgeGroup({ children }: { children: ReactNode }) {
  return <div className="sg-badge-group">{children}</div>;
}
