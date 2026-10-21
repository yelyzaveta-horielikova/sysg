import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import './ContactForm.css';

interface BaseProps {
  label: string;
  /** Shows the error state: label and line in `error`, message below. */
  error?: string;
}
type InputProps = BaseProps & { multiline?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'>;
type TextareaProps = BaseProps & { multiline: true } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'>;
export type TextFieldProps = InputProps | TextareaProps;

/**
 * Underline text field for dark surfaces (Figma "Input").
 * The label reads like a placeholder when empty and moves above the value on focus or once filled.
 */
export function TextField(props: TextFieldProps) {
  const { label, error, multiline, ...rest } = props;
  const id = useId();
  const errorId = `${id}-error`;
  const common = {
    id,
    className: 'sg-field__control',
    placeholder: ' ', // keeps :placeholder-shown working for the floating label
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  };
  return (
    <div className={`sg-field${multiline ? ' sg-field--multiline' : ''}${error ? ' sg-field--error' : ''}`}>
      <div className="sg-field__box">
        {multiline ? (
          <textarea {...common} rows={1} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
        ) : (
          <input {...common} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
        )}
        <label className="sg-field__label" htmlFor={id}>{label}</label>
      </div>
      <p className="sg-field__helper" id={errorId}>{error}</p>
    </div>
  );
}
