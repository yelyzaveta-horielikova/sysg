import { ArrowButton } from '../ArrowButton/ArrowButton';
import './SharingInsightsCard.css';

export interface SharingInsightsCardProps {
  /** Article title. */
  title: string;
  href: string;
  author: { name: string; role: string; photo: string };
  /** `accent`: sg-medium background, white text. `muted`: grey background, dark text. `teal`: teal background, dark text. */
  tone?: 'accent' | 'muted' | 'teal';
}

/** A teaser for a blog article with its author (Figma "Sharing-insights-card"). The whole card is a link. */
export function SharingInsightsCard({ title, href, author, tone = 'accent' }: SharingInsightsCardProps) {
  return (
    <a className={`sg-insights-card sg-insights-card--${tone}`} href={href}>
      <h3 className="sg-insights-card__title">{title}</h3>
      <div className="sg-insights-card__author">
        <img className="sg-insights-card__photo" src={author.photo} alt="" />
        <span className="sg-insights-card__who">
          <span>{author.name}</span>
          <span>{author.role}</span>
        </span>
      </div>
      <span className="sg-insights-card__arrow">
        <ArrowButton variant={tone === 'muted' ? 'blue' : 'white'} />
      </span>
    </a>
  );
}
