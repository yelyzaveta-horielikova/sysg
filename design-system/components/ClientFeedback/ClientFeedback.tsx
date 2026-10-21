import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import './ClientFeedback.css';

const platforms: Record<'clutch' | 'upwork' | 'goodfirms', { name: string; icon: IconName }> = {
  clutch: { name: 'Clutch', icon: 'clutch-color' },
  upwork: { name: 'Upwork', icon: 'upwork' },
  goodfirms: { name: 'GoodFirms', icon: 'goodfirms' },
};

export interface ClientFeedbackProps {
  /** Review platform shown in the header. */
  platform?: keyof typeof platforms;
  /** Rating as shown on the platform, e.g. "5.0". */
  rating?: string;
  quote: ReactNode;
  author: { name: string; role: string; photo?: string };
}

/** A single client quote from a review platform (Figma "Client-feedback"). */
export function ClientFeedback({ platform = 'clutch', rating = '5.0', quote, author }: ClientFeedbackProps) {
  const p = platforms[platform];
  return (
    <figure className="sg-client-feedback">
      <div className="sg-client-feedback__header">
        <span className="sg-client-feedback__platform">
          <Icon name={p.icon} size={26} className="sg-client-feedback__logo" />
          {p.name}
        </span>
        <span className="sg-client-feedback__rating" aria-label={`Rated ${rating} on ${p.name}`}>
          {rating}
          <Icon name="star" size={16} />
        </span>
      </div>
      <blockquote className="sg-client-feedback__quote">{quote}</blockquote>
      <figcaption className="sg-client-feedback__author">
        {author.photo && <img className="sg-client-feedback__photo" src={author.photo} alt="" width={72} height={72} />}
        <span className="sg-client-feedback__who">
          <span className="sg-client-feedback__name">{author.name}</span>
          <span className="sg-client-feedback__role">{author.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
