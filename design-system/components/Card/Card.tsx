import type { ReactNode } from 'react';
import { Badge, BadgeGroup } from '../Badge/Badge';
import { Media, type MediaProps } from '../Media/Media';
import './Card.css';

export type CardMedia =
  | { kind: 'illustration'; src: string; alt?: string }
  /**
   * Icon in a 64×64 box. `tile` (default true) puts it on a filled tile (radius xl).
   * Without the tile the icon or image fills the 64px box (per-project artwork, e.g. case-study icons).
   */
  | { kind: 'icon'; icon: ReactNode; tile?: boolean }
  /**
   * Image filling the whole card (no overlay); title and badges sit at the bottom.
   * `tone` describes the image: `dark` (default) → white title and White badges; `light` → dark title and Black badges.
   */
  | { kind: 'background'; src: string; alt?: string; tone?: 'dark' | 'light' }
  /** Image (or video with `video`) across the card's full width, natural height or a fixed `ratio`, above the text. A placeholder without `src`. */
  | ({ kind: 'image'; video?: boolean } & Omit<MediaProps, 'kind'>);

export interface CardProps {
  /**
   * - `filled`: grey surface, radius md (Figma: Card, Small-card, industries-card).
   * - `outlined`: no fill, no border of its own. Place in `CardGrid variant="divided"` for divider lines between cards (Figma: Big-card).
   * - `plain`: no fill, no border, no padding. For image cards whose image is the card's edge (case-study feature cards).
   */
  surface?: 'filled' | 'outlined' | 'plain';
  /** Illustration image, an icon on a 64px filled tile, or a background image filling the card. Optional. */
  media?: CardMedia;
  /** `center` centres only the media and the title; text, list and badges stay left-aligned. */
  align?: 'left' | 'center';
  /** `large` = subsection-title (20); `small` = body-article (16), for compact tiles (Figma: Small-card). */
  titleSize?: 'large' | 'small';
  /** Title in sg-blue (Figma: Big-card "Active"). */
  titleAccent?: boolean;
  title: ReactNode;
  text?: ReactNode;
  /** Dash list (— item). */
  list?: ReactNode[];
  /** Badge Medium chips (Black; White on a background image). Always sit at the bottom of the card. */
  badges?: string[];
  /** Makes the whole card a link and enables the hover state. */
  href?: string;
}

export function Card({
  surface = 'filled',
  media,
  align = 'left',
  titleSize = 'large',
  titleAccent = false,
  title,
  text,
  list,
  badges,
  href,
}: CardProps) {
  const classes = [
    'sg-card',
    `sg-card--${surface}`,
    `sg-card--align-${align}`,
    `sg-card--title-${titleSize}`,
    media && `sg-card--media-${media.kind}`,
    badges && badges.length > 0 && 'sg-card--has-badges',
    titleAccent && 'sg-card--title-accent',
    media?.kind === 'background' && media.tone === 'light' && 'sg-card--tone-light',
    href && 'sg-card--interactive',
  ]
    .filter(Boolean)
    .join(' ');

  const onImage = media?.kind === 'background';
  const whiteBadges = onImage && media.tone !== 'light';

  const body = (
    <>
      {onImage && <img className="sg-card__background" src={media.src} alt={media.alt ?? ''} />}
      {media?.kind === 'illustration' && (
        <div className="sg-card__media">
          <img className="sg-card__illustration" src={media.src} alt={media.alt ?? ''} />
        </div>
      )}
      {media?.kind === 'image' && (
        <div className="sg-card__media">
          <Media kind={media.video ? 'video' : 'image'} src={media.src} alt={media.alt} poster={media.poster} ratio={media.ratio} />
        </div>
      )}
      {media?.kind === 'icon' && (
        <div className="sg-card__media">
          <span className={media.tile === false ? 'sg-card__icon-box' : 'sg-card__icon-tile'}>{media.icon}</span>
        </div>
      )}
      <div className="sg-card__content">
        <h3 className="sg-card__title">{title}</h3>
        {text && <div className="sg-card__text">{text}</div>}
        {list && list.length > 0 && (
          <ul className="sg-card__list">
            {list.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
        {badges && badges.length > 0 && (
          <div className="sg-card__badges">
            <BadgeGroup>
              {badges.map((b) => (
                <Badge key={b} variant={whiteBadges ? 'white' : 'black'}>
                  {b}
                </Badge>
              ))}
            </BadgeGroup>
          </div>
        )}
      </div>
    </>
  );

  return href ? (
    <a className={classes} href={href}>
      {body}
    </a>
  ) : (
    <article className={classes}>{body}</article>
  );
}
