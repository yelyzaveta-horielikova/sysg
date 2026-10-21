import { useId, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './ContactForm.css';

export interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  /** Accepted extensions. */
  accept?: string;
  /** Max size per file in MB. */
  maxSizeMb?: number;
  hint?: string;
  disabled?: boolean;
}

const formatSize = (bytes: number) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

/** Dashed drop zone with the list of attached files (Figma "_Custom" uploader + "file"). For dark surfaces. */
export function FileDropzone({
  files,
  onChange,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg',
  maxSizeMb = 30,
  hint = 'PDF, DOC, DOCX or JPG (max 30MB)',
  disabled = false,
}: FileDropzoneProps) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const add = (list: FileList | null) => list && onChange([...files, ...Array.from(list)]);

  return (
    <div className="sg-dropzone-wrap">
      <div
        className={`sg-dropzone${over ? ' sg-dropzone--over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); if (!disabled) add(e.dataTransfer.files); }}
      >
        <p className="sg-dropzone__title">
          <label htmlFor={id} className="sg-dropzone__link">Click to upload</label> or drag and drop
        </p>
        <p className="sg-dropzone__hint">{hint}</p>
        <input ref={input} id={id} type="file" multiple accept={accept} disabled={disabled} className="sg-visually-hidden"
          onChange={(e) => { add(e.target.files); e.target.value = ''; }} />
      </div>

      {files.length > 0 && (
        <ul className="sg-file-list">
          {files.map((file, i) => {
            const tooBig = file.size > maxSizeMb * 1024 * 1024;
            return (
              <li key={`${file.name}-${i}`} className={`sg-file${tooBig ? ' sg-file--error' : ''}`}>
                <div className="sg-file__row">
                  <Icon name="file" size={18} />
                  <span className="sg-file__name">{file.name}</span>
                  <span className="sg-file__size">{formatSize(file.size)}</span>
                  <button type="button" className="sg-file__remove" aria-label={`Remove ${file.name}`} disabled={disabled}
                    onClick={() => onChange(files.filter((_, j) => j !== i))}>
                    <Icon name="close" size={16} />
                  </button>
                </div>
                {tooBig && <p className="sg-field__helper">The file is larger than {maxSizeMb} MB.</p>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
