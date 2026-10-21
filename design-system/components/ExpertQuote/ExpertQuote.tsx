import type { ReactNode } from 'react';
import './ExpertQuote.css';

export interface ExpertQuoteProps {
  quote: ReactNode;
  name: string;
  role: string;
  /** Cut-out portrait (transparent background); it rises above the blue circle. */
  photo: string;
}

function Avatar({ photo, name, size }: { photo: string; name: string; size: 'large' | 'small' }) {
  return (
    <div className={`sg-expert-quote__avatar sg-expert-quote__avatar--${size}`}>
      <span className="sg-expert-quote__circle" aria-hidden="true" />
      <img src={photo} alt={name} />
    </div>
  );
}

/**
 * A statement from a SysGears expert or leader (Figma "expert-quote-card").
 * From a 1024 viewport: large avatar beside the quote. Below: quote, then a small avatar with name and role.
 */
export function ExpertQuote({ quote, name, role, photo }: ExpertQuoteProps) {
  return (
    <figure className="sg-expert-quote">
      <div className="sg-expert-quote__inner">
        <Avatar photo={photo} name={name} size="large" />
        <div className="sg-expert-quote__content">
          <blockquote className="sg-expert-quote__quote">{quote}</blockquote>
          <figcaption className="sg-expert-quote__author">
            <Avatar photo={photo} name={name} size="small" />
            <span className="sg-expert-quote__who">
              <span className="sg-expert-quote__name">{name}</span>
              <span className="sg-expert-quote__role">{role}</span>
            </span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}
