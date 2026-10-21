import { Icon, type IconName } from '../Icon/Icon';
import './Footer.css';

export interface FooterLink {
  label: string;
  href?: string;
}
export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}
export interface ReviewPlatform {
  platform: 'clutch' | 'upwork' | 'goodfirms';
  name: string;
  reviews: number;
  href?: string;
}
export interface SocialLink {
  network: Extract<IconName, 'linkedin' | 'facebook' | 'instagram' | 'behance' | 'github'>;
  label: string;
  href: string;
}

/** Content from the Figma footer. Grid areas: services, portfolio, company, blog, legal, contacts, locations. */
export const defaultFooterContent = {
  services: {
    heading: 'Services',
    links: ['Web development', 'Mobile development', 'JavaScript development', 'Scala development', 'Product design', 'Project management', 'Business analysis', 'Quality assurance'].map((label) => ({ label, href: '#' })),
  },
  portfolio: { heading: 'Portfolio', links: ['All works', 'Case studies', 'Open source'].map((label) => ({ label, href: '#' })) },
  company: { heading: 'Company', links: ['About us', 'FAQ', 'Contact us'].map((label) => ({ label, href: '#' })) },
  blog: { heading: 'Blog', links: ['Latest', 'Business', 'Software'].map((label) => ({ label, href: '#' })) },
  legal: { heading: 'Legal', links: ['Privacy', 'Terms'].map((label) => ({ label, href: '#' })) },
  contacts: {
    heading: 'Contacts',
    links: [
      { label: 'info@sysgears.com', href: 'mailto:info@sysgears.com' },
      { label: '+38 067 823 48 44', href: 'tel:+380678234844' },
      { label: 'WhatsApp Chat', href: '#' },
    ],
  },
  locations: {
    heading: 'Locations',
    links: [
      { label: 'Ellados 12, 8020, Paphos, Cyprus' },
      { label: 'Haharina Ave 23, Dnipro, Ukraine' },
      { label: 'Akademika Lazarenka St 1, Lviv, Ukraine' },
      { label: 'Powstańców Śląskich 15, Wrocław, Poland' },
    ],
  },
} satisfies Record<string, FooterColumn>;

export const defaultReviews: ReviewPlatform[] = [
  { platform: 'clutch', name: 'Clutch', reviews: 7 },
  { platform: 'upwork', name: 'Upwork', reviews: 141 },
  { platform: 'goodfirms', name: 'GoodFirms', reviews: 5 },
];

export const defaultSocials: SocialLink[] = [
  { network: 'linkedin', label: 'LinkedIn', href: '#' },
  { network: 'facebook', label: 'Facebook', href: '#' },
  { network: 'instagram', label: 'Instagram', href: '#' },
  { network: 'behance', label: 'Behance', href: '#' },
  { network: 'github', label: 'GitHub', href: '#' },
];

export type FooterContent = typeof defaultFooterContent;

export interface FooterProps {
  content?: FooterContent;
  reviews?: ReviewPlatform[];
  socials?: SocialLink[];
}

function Column({ area, column }: { area: string; column: FooterColumn }) {
  return (
    <div className="sg-footer__column" style={{ gridArea: area }}>
      <h2 className="sg-footer__heading">{column.heading}</h2>
      <ul className="sg-footer__links">
        {column.links.map((link) => (
          <li key={link.label}>{link.href ? <a href={link.href}>{link.label}</a> : <span>{link.label}</span>}</li>
        ))}
      </ul>
    </div>
  );
}

const Stars = () => (
  <span className="sg-footer__stars" aria-hidden="true">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="10" height="10" viewBox="0 0 10 10">
        <path d="M5 0.4l1.4 2.9 3.2 0.4-2.3 2.2 0.6 3.2L5 7.6 2.1 9.1l0.6-3.2L0.4 3.7l3.2-0.4z" fill="currentColor" />
      </svg>
    ))}
  </span>
);

/**
 * Global site footer. Layout switches by its own width (= viewport width):
 * desktop ≥1024, tablet 768–1023, phone <768.
 */
export function Footer({ content = defaultFooterContent, reviews = defaultReviews, socials = defaultSocials }: FooterProps) {
  return (
    <footer className="sg-footer">
      <div className="sg-footer__inner">
        <div className="sg-footer__links-grid">
          {(Object.keys(content) as (keyof FooterContent)[]).map((area) => (
            <Column key={area} area={area} column={content[area]} />
          ))}
        </div>

        <div className="sg-footer__bottom">
          <ul className="sg-footer__reviews">
            {reviews.map((r) => {
              const inner = (
                <>
                  <Icon name={r.platform} className="sg-footer__review-logo" />
                  <span className="sg-footer__review-meta">
                    <Stars />
                    <span>{r.reviews} reviews</span>
                  </span>
                </>
              );
              return (
                <li key={r.platform}>
                  {r.href ? (
                    <a className="sg-footer__review" href={r.href} aria-label={`${r.name}: 5 stars, ${r.reviews} reviews`}>{inner}</a>
                  ) : (
                    <div className="sg-footer__review" aria-label={`${r.name}: 5 stars, ${r.reviews} reviews`} role="group">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="sg-footer__socials">
            {socials.map((s) => (
              <li key={s.network}>
                <a className="sg-footer__social" href={s.href} aria-label={s.label}>
                  <Icon name={s.network} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
