// Icons exported from the Figma UI Kit. All use currentColor, so colour comes from CSS.
import search from '../../assets/icons/search.svg?raw';
import chevronDown from '../../assets/icons/chevron-down.svg?raw';
import linkedin from '../../assets/icons/linkedin.svg?raw';
import facebook from '../../assets/icons/facebook.svg?raw';
import instagram from '../../assets/icons/instagram.svg?raw';
import behance from '../../assets/icons/behance.svg?raw';
import github from '../../assets/icons/github.svg?raw';
import clutch from '../../assets/icons/logo-clutch.svg?raw';
import upwork from '../../assets/icons/logo-upwork.svg?raw';
import goodfirms from '../../assets/icons/logo-goodfirms.svg?raw';
import softwareDevelopment from '../../assets/icons/icon-software-development.svg?raw';
import calendar from '../../assets/icons/calendar.svg?raw';
import whatsapp from '../../assets/icons/whatsapp.svg?raw';
import email from '../../assets/icons/email.svg?raw';
import close from '../../assets/icons/close.svg?raw';
import file from '../../assets/icons/file.svg?raw';
import clutchColor from '../../assets/icons/logo-clutch-color.svg?raw';
import star from '../../assets/icons/star.svg?raw';

const icons = {
  search,
  'chevron-down': chevronDown,
  linkedin,
  facebook,
  instagram,
  behance,
  github,
  clutch,
  upwork,
  goodfirms,
  'software-development': softwareDevelopment,
  calendar,
  whatsapp,
  email,
  close,
  file,
  'clutch-color': clutchColor,
  star,
} as const;

export type IconName = keyof typeof icons;
export const iconNames = Object.keys(icons) as IconName[];

export interface IconProps {
  name: IconName;
  /** Rendered size in px (icons are structural dimensions, see system.md → Units). Defaults to the icon's own size. */
  size?: number;
  className?: string;
}

export function Icon({ name, size, className }: IconProps) {
  const svg = size ? icons[name].replace(/width="[\d.]+" height="[\d.]+"/, `width="${size}" height="${size}"`) : icons[name];
  return (
    <span
      className={['sg-icon', className].filter(Boolean).join(' ')}
      aria-hidden="true"
      style={{ display: 'inline-flex', lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
