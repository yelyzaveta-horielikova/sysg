import './ArrowButton.css';

export interface ArrowButtonProps {
  /** `white`: white circle, sg-medium arrow. `blue`: sg-medium circle, white arrow. */
  variant?: 'white' | 'blue';
  /** Accessible label when the button is interactive on its own. Omit when it decorates a clickable card. */
  label?: string;
  onClick?: () => void;
}

/** A round "go" cue (Figma "Arrows/Var.2"). Inside a clickable card it is decorative. */
export function ArrowButton({ variant = 'white', label, onClick }: ArrowButtonProps) {
  const className = `sg-arrow-button sg-arrow-button--${variant}`;
  return onClick ? (
    <button type="button" className={className} aria-label={label} onClick={onClick}>→</button>
  ) : (
    <span className={className} aria-hidden="true">→</span>
  );
}
