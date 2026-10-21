import type { ReactNode } from 'react';
import { Button } from '../Button/Button';
import './HeroText.css';

export interface HeroTextProps {
  /** The page's only h1. */
  title: ReactNode;
  lead?: ReactNode;
  cta?: { label: string; href: string };
}

/** Page-opening statement (Figma "hero-text"): H1 + lead + Primary button. */
export function HeroText({ title, lead, cta }: HeroTextProps) {
  return (
    <div className="sg-hero-text">
      <h1 className="sg-hero-text__title">{title}</h1>
      {lead && <p className="sg-hero-text__lead">{lead}</p>}
      {cta && (
        <div>
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      )}
    </div>
  );
}
