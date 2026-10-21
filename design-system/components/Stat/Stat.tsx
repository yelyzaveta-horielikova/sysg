import type { ReactNode } from 'react';
import './Stat.css';

export interface StatProps {
  /** The key number, e.g. "15+". */
  value: string;
  label: ReactNode;
  description?: ReactNode;
}

/** A key number with an explanation (Figma "text-field"). Always on a dark or image surface. */
export function Stat({ value, label, description }: StatProps) {
  return (
    <div className="sg-stat">
      <div className="sg-stat__head">
        <div className="sg-stat__value">{value}</div>
        <div className="sg-stat__label">{label}</div>
      </div>
      {description && <p className="sg-stat__description">{description}</p>}
    </div>
  );
}

/** 2×2 grid of stats (Dark-highlights "Numbers"); one column below 768. */
export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="sg-stat-grid">
      <div className="sg-stat-grid__items">{children}</div>
    </div>
  );
}
