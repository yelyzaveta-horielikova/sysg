import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import logo from '../../assets/sysgears-logo.png';
import './Header.css';

export interface NavItem {
  label: string;
  href: string;
  /** Shows the chevron; the item opens a submenu (submenu content is not specified in Figma). */
  hasSubmenu?: boolean;
}

export const defaultNavItems: NavItem[] = [
  { label: 'About', href: '#about', hasSubmenu: true },
  { label: 'Services', href: '#services', hasSubmenu: true },
  { label: 'Industries', href: '#industries', hasSubmenu: true },
  { label: 'Solutions', href: '#solutions', hasSubmenu: true },
  { label: 'Technologies', href: '#technologies', hasSubmenu: true },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
];

export interface HeaderProps {
  navItems?: NavItem[];
  logoHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onSearchClick?: () => void;
  /** Burger button (tablet and mobile). Menu content is not specified in Figma. */
  onMenuClick?: () => void;
}

export function NavLink({ label, href, hasSubmenu }: NavItem) {
  return (
    <a className={`sg-nav-item${hasSubmenu ? ' sg-nav-item--submenu' : ''}`} href={href}>
      <span>{label}</span>
      {hasSubmenu && <Icon name="chevron-down" className="sg-nav-item__chevron" />}
    </a>
  );
}

/**
 * Global site header. Layout switches by its own width (= viewport width):
 * desktop ≥1280, tablet 480–1279, mobile <480.
 */
export function Header({
  navItems = defaultNavItems,
  logoHref = '/',
  ctaLabel = 'Contact us',
  ctaHref = '#contact',
  onSearchClick,
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sg-header">
      <div className="sg-header__bar">
        <a className="sg-header__logo" href={logoHref} aria-label="SysGears home">
          <img src={logo} alt="SysGears" width={141} height={40} />
        </a>

        <nav className="sg-header__nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </nav>

        <div className="sg-header__actions">
          <button type="button" className="sg-header__icon-button sg-header__search" aria-label="Search" onClick={onSearchClick}>
            <Icon name="search" />
          </button>
          <Button variant="outlined" href={ctaHref} className="sg-header__cta">
            {ctaLabel}
          </Button>
          <button type="button" className="sg-header__icon-button sg-header__burger" aria-label="Open menu" onClick={onMenuClick}>
            <span className="sg-header__burger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
