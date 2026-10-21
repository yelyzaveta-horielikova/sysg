import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'outlined' | 'white';

interface BaseProps {
  /**
   * - `primary`: main action on light surfaces.
   * - `outlined`: header "Contact us" only.
   * - `white`: on dark, blue or image surfaces (e.g. the dark form submit).
   */
  variant?: ButtonVariant;
  /** Loading state (all variants): replaces the label with a loader; the button keeps its size. */
  loading?: boolean;
  /** Text label only — no icons. */
  children: ReactNode;
}

type AsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { href?: undefined };
type AsLink = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & { href: string };
export type ButtonProps = AsButton | AsLink;

export function Button({ variant = 'primary', loading = false, children, className, ...rest }: ButtonProps) {
  const isLoading = loading;
  const classes = [
    'sg-button',
    `sg-button--${variant}`,
    isLoading && 'sg-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="sg-button__label">{children}</span>
      {isLoading && <span className="sg-button__loader" aria-hidden="true" />}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} aria-busy={isLoading || undefined} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  const { type = 'button', ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonRest} type={type} className={classes} aria-busy={isLoading || undefined} disabled={buttonRest.disabled || isLoading}>
      {content}
    </button>
  );
}
