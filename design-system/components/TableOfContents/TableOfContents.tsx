import { useEffect, useId, useState } from 'react';
import { Icon } from '../Icon/Icon';
import './TableOfContents.css';

export interface TocItem {
  /** id of the block on the page (the link goes to #id). */
  id: string;
  label: string;
}

export interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  /** Controlled active item. If omitted, the active item follows the scroll position. */
  activeId?: string;
  /**
   * - `auto`: sidebar from 1280px viewport width, collapsed bar below (default).
   * - `sidebar` / `bar`: force one layout (e.g. for previews).
   */
  variant?: 'auto' | 'sidebar' | 'bar';
  /** Distance from the viewport top for the sticky sidebar, in px. */
  stickyTop?: number;
  /** Bar only: start with the list open. */
  defaultOpen?: boolean;
}

/** Follows which listed block is at the top of the viewport. */
function useScrollSpy(ids: string[], enabled: boolean) {
  const [active, setActive] = useState<string | undefined>(ids[0]);
  useEffect(() => {
    if (!enabled) return;
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        const first = ids.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      { rootMargin: '0px 0px -60% 0px' },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [ids.join('|'), enabled]);
  return active;
}

/** In-page navigation for long pages (Figma "on-this-page"). */
export function TableOfContents({ items, title = 'On this page', activeId, variant = 'auto', stickyTop = 0, defaultOpen = false }: TableOfContentsProps) {
  const [open, setOpen] = useState(defaultOpen);
  const listId = useId();
  const spied = useScrollSpy(items.map((i) => i.id), activeId === undefined);
  const current = activeId ?? spied;

  return (
    <nav
      className={`sg-toc sg-toc--${variant}${open ? ' sg-toc--open' : ''}`}
      aria-label={title}
      style={{ ['--sg-toc-top' as string]: `${stickyTop}px` }}
    >
      {/* Sidebar shows a plain title; the bar shows a toggle button. CSS picks one. */}
      <p className="sg-toc__title sg-toc__title--static">{title}</p>
      <button type="button" className="sg-toc__toggle" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((o) => !o)}>
        <span className="sg-toc__title">{title}</span>
        <Icon name="chevron-down" className="sg-toc__chevron" />
      </button>

      <ol className="sg-toc__list" id={listId}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={`sg-toc__link${item.id === current ? ' sg-toc__link--active' : ''}`}
              href={`#${item.id}`}
              aria-current={item.id === current ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
