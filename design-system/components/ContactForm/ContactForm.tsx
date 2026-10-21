import { useState, type DragEvent, type FormEvent, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { TextField } from './TextField';
import { FileDropzone } from './FileDropzone';
import logoMark from '../../assets/logo-mark.svg';
import './ContactForm.css';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  files: File[];
}

export interface ContactFormProps {
  title?: ReactNode;
  intro?: ReactNode;
  contactsTitle?: string;
  contacts?: { icon: 'calendar' | 'whatsapp' | 'email'; label: string; href: string }[];
  submitLabel?: string;
  legalNote?: ReactNode;
  sentTitle?: ReactNode;
  sentText?: ReactNode;
  backLabel?: string;
  /** Called on a valid submit. While the promise is pending the form shows its loading state. */
  onSubmit?: (data: ContactFormData) => Promise<void> | void;
  /** Force a state (previews). Normally the form manages it. */
  status?: 'idle' | 'loading' | 'sent';
  /** Prefilled values (previews). */
  defaultValues?: Partial<ContactFormData>;
}

const defaultContacts: ContactFormProps['contacts'] = [
  { icon: 'calendar', label: 'Choose convenient time and book a call', href: '#book-a-call' },
  { icon: 'whatsapp', label: 'Message us on WhatsApp', href: '#whatsapp' },
  { icon: 'email', label: 'Email us on info@sysgears.com', href: 'mailto:info@sysgears.com' },
];

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * The main contact form on a dark panel (Figma "dark-form").
 * States: idle → loading (submit pending) → sent. Dragging files anywhere over the panel turns it into one big drop zone.
 */
export function ContactForm({
  title = 'Get the right software expertise in just a few steps',
  intro = 'Tell us about your needs and our team will get back to you within one business day.',
  contactsTitle = 'Prefer another way to connect?',
  contacts = defaultContacts,
  submitLabel = 'Submit',
  legalNote = 'This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.',
  sentTitle = 'Thank you for reaching out to SysGears!',
  sentText = 'Our team is already reviewing your request. We will respond within one business day.',
  backLabel = 'Back to form',
  onSubmit,
  status: forcedStatus,
  defaultValues = {},
}: ContactFormProps) {
  const [values, setValues] = useState({ name: defaultValues.name ?? '', email: defaultValues.email ?? '', message: defaultValues.message ?? '' });
  const [files, setFiles] = useState<File[]>(defaultValues.files ?? []);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [ownStatus, setOwnStatus] = useState<'idle' | 'loading' | 'sent'>('idle');
  const [dragging, setDragging] = useState(false);
  const status = forcedStatus ?? ownStatus;
  const loading = status === 'loading';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next = {
      name: values.name.trim() ? undefined : 'Please enter your name.',
      email: emailOk(values.email) ? undefined : 'Please enter a valid email.',
    };
    setErrors(next);
    if (next.name || next.email) return;
    setOwnStatus('loading');
    try {
      await onSubmit?.({ ...values, files });
      setOwnStatus('sent');
    } catch {
      setOwnStatus('idle');
    }
  };

  const hasFiles = (e: DragEvent) => Array.from(e.dataTransfer.types).includes('Files');
  const dragProps = {
    onDragEnter: (e: DragEvent) => { if (hasFiles(e) && status === 'idle') setDragging(true); },
    onDragOver: (e: DragEvent) => { if (dragging) e.preventDefault(); },
    onDragLeave: (e: DragEvent) => { if (e.currentTarget === e.target) setDragging(false); },
    onDrop: (e: DragEvent) => { e.preventDefault(); setDragging(false); setFiles((f) => [...f, ...Array.from(e.dataTransfer.files)]); },
  };

  if (status === 'sent') {
    return (
      <section className="sg-contact-form sg-contact-form--sent">
        <div className="sg-contact-form__sent">
          <img src={logoMark} alt="" width={64} height={64} />
          <div className="sg-contact-form__text sg-contact-form__text--center">
            <h2 className="sg-contact-form__title">{sentTitle}</h2>
            <p className="sg-contact-form__intro">{sentText}</p>
          </div>
          <Button variant="white" onClick={() => { setOwnStatus('idle'); setValues({ name: '', email: '', message: '' }); setFiles([]); }}>
            {backLabel}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="sg-contact-form" {...dragProps}>
      <div className="sg-contact-form__layout">
        <div className="sg-contact-form__text">
          <h2 className="sg-contact-form__title">{title}</h2>
          {intro && <p className="sg-contact-form__intro">{intro}</p>}
        </div>

        {contacts && contacts.length > 0 && (
          <div className="sg-contact-form__contacts">
            <p className="sg-contact-form__contacts-title">{contactsTitle}</p>
            <ul>
              {contacts.map((c) => (
                <li key={c.icon}>
                  <a href={c.href}><Icon name={c.icon} size={24} />{c.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form className="sg-contact-form__form" onSubmit={submit} noValidate>
          <div className="sg-contact-form__fields">
            <TextField label="Name" name="name" autoComplete="name" value={values.name} disabled={loading} error={errors.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })} />
            <TextField label="Email" name="email" type="email" autoComplete="email" value={values.email} disabled={loading} error={errors.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })} />
            <TextField multiline label="Describe your request" name="message" value={values.message} disabled={loading}
              onChange={(e) => setValues({ ...values, message: e.target.value })} />
            <FileDropzone files={files} onChange={setFiles} disabled={loading} />
          </div>
          <Button type="submit" variant="white" loading={loading} className="sg-contact-form__submit">{submitLabel}</Button>
          {legalNote && <p className="sg-contact-form__legal">{legalNote}</p>}
        </form>
      </div>

      {dragging && (
        <div className="sg-contact-form__drop-overlay" aria-hidden="true">
          <p className="sg-dropzone__title"><span className="sg-dropzone__link">Click to upload</span> or drag and drop</p>
          <p className="sg-dropzone__hint">PDF, DOC, DOCX or JPG (max 30MB)</p>
        </div>
      )}
    </section>
  );
}
