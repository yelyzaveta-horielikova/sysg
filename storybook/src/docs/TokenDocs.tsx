import type { CSSProperties, ReactNode } from 'react';
import { ColorItem, ColorPalette } from '@storybook/addon-docs/blocks';
import { colorVar, entries, paletteVar, resolveColor, resolveTextStyle, textStyles, tokens } from '@sysgears/design-system/styles/tokens';

const cell: CSSProperties = { padding: '10px 12px', borderBottom: '1px solid #e6e9f2', verticalAlign: 'top', textAlign: 'left' };
const code: CSSProperties = { fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12 };
const muted: CSSProperties = { color: '#6b7280', fontSize: 12 };

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="sb-unstyled" style={{ overflowX: 'auto', margin: '16px 0 32px', fontFamily: '"Nunito Sans", -apple-system, BlinkMacSystemFont, sans-serif', color: '#2e3438' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 14 }}>
        <thead>
          <tr>{head.map((h) => <th key={h} style={{ ...cell, ...muted, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

const Status = ({ status }: { status?: unknown }) =>
  status ? <span style={{ ...muted, border: '1px solid #d1d5db', borderRadius: 4, padding: '0 4px' }}>{String(status)}</span> : null;

// ---- Colour ----
export function ColorTokens() {
  const note = (v: Record<string, unknown>) => String(v.note ?? v.use ?? '');
  return (
    <>
      <h3>Palette</h3>
      <ColorPalette>
        {entries(tokens.color.palette).map(([name, v]) => (
          <ColorItem key={name} title={name} subtitle={`var(${paletteVar(name)})`} colors={[String(v.value)]} />
        ))}
      </ColorPalette>
      <h3>Semantic</h3>
      <ColorPalette>
        {entries(tokens.color.semantic).map(([name, v]) => (
          <ColorItem
            key={name}
            title={name}
            subtitle={`var(${colorVar(name)})${v.ref ? ` → ${v.ref}` : ''}${note(v) ? ` · ${note(v)}` : ''}`}
            colors={[resolveColor(v)]}
          />
        ))}
      </ColorPalette>
    </>
  );
}

// ---- Typography ----
export function TypographyTokens() {
  return (
    <Table head={['Semantic style', 'Sample', 'Size / line-height / weight / axes', 'Use']}>
      {textStyles.map(([name, style]) => {
        const r = resolveTextStyle(style);
        return (
          <tr key={name}>
            <td style={cell}>
              <div style={code}>.sg-text-{name}</div>
              <div style={muted}>Figma: {style.figma}{style.level ? ` · ${style.level}` : ''}</div>
            </td>
            <td style={{ ...cell, color: 'var(--sg-color-text-primary)' }}>
              <span className={`sg-text-${name}`}>SysGears Ag 123</span>
            </td>
            <td style={{ ...cell, ...code }}>
              {r.fontSize} / {r.lineHeight} / {r.fontWeight}
              <div style={muted}>{r.fontVariationSettings}</div>
            </td>
            <td style={{ ...cell, fontSize: 13 }}>{style.use}</td>
          </tr>
        );
      })}
    </Table>
  );
}

// ---- Spacing ----
export function SpacingTokens() {
  return (
    <>
      {Object.entries(tokens.spacing)
        .filter(([g, items]) => !g.startsWith('$') && typeof items === 'object')
        .map(([group, items]) => (
          <div key={group}>
            <h3 style={{ textTransform: 'capitalize' }}>{group}</h3>
            <Table head={['Token', 'Value', '', 'Use']}>
              {entries(items as Record<string, { value: string; px?: number; use?: string; note?: string; status?: string }>).map(([k, v]) => (
                <tr key={k}>
                  <td style={{ ...cell, ...code }}>--sg-space-{group}-{k.toLowerCase()}</td>
                  <td style={{ ...cell, ...code }}>{v.value} <span style={muted}>({v.px}px)</span></td>
                  <td style={{ ...cell, width: '45%' }}>
                    <div style={{ height: 16, width: v.value, minWidth: 1, background: 'var(--sg-palette-sg-blue)' }} />
                  </td>
                  <td style={{ ...cell, fontSize: 13 }}>{v.use ?? v.note ?? ''} <Status status={v.status} /></td>
                </tr>
              ))}
            </Table>
          </div>
        ))}
    </>
  );
}

// ---- Radius, border, shadow ----
export function ShapeTokens() {
  return (
    <>
      <Table head={['Radius', 'Value', 'Sample', 'Use']}>
        {entries(tokens.radius).map(([k, v]) => (
          <tr key={k}>
            <td style={{ ...cell, ...code }}>--sg-radius-{k}</td>
            <td style={{ ...cell, ...code }}>{String(v.value)}px</td>
            <td style={cell}>
              <div style={{ width: 64, height: 48, background: 'var(--sg-color-surface-muted)', border: 'var(--sg-border-divider)', borderRadius: `var(--sg-radius-${k})` }} />
            </td>
            <td style={{ ...cell, fontSize: 13 }}>{String(v.use ?? '')}</td>
          </tr>
        ))}
      </Table>
      <Table head={['Border', 'Value', 'Sample']}>
        {['divider', 'emphasis'].map((k) => (
          <tr key={k}>
            <td style={{ ...cell, ...code }}>--sg-border-{k}</td>
            <td style={{ ...cell, ...code }}>{tokens.border.width}px · color-border-{k}</td>
            <td style={cell}><div style={{ width: 120, height: 40, border: `var(--sg-border-${k})`, borderRadius: 'var(--sg-radius-md)' }} /></td>
          </tr>
        ))}
      </Table>
      <p style={muted}>Shadow: none. {String(tokens.shadow.none?.note ?? '')}</p>
    </>
  );
}

// ---- Breakpoints, container, grid ----
export function LayoutTokens() {
  const bps = entries(tokens.breakpoint as Record<string, { value: number; note?: string }>);
  const density = Object.entries(tokens.grid.density).filter(([k]) => !k.startsWith('$') && k !== 'status') as [string, number][];
  return (
    <>
      <h3>Breakpoints</h3>
      <Table head={['Token', 'Width', 'Note']}>
        {bps.map(([k, v]) => (
          <tr key={k}>
            <td style={{ ...cell, ...code }}>--sg-breakpoint-{k}</td>
            <td style={{ ...cell, ...code }}>{v.value}px</td>
            <td style={{ ...cell, fontSize: 13 }}>{v.note ?? ''}</td>
          </tr>
        ))}
      </Table>
      <h3>Container</h3>
      <Table head={['Token', 'Value', 'Note']}>
        {entries(tokens.container).map(([k, v]) => (
          <tr key={k}>
            <td style={{ ...cell, ...code }}>container.{k}</td>
            <td style={{ ...cell, ...code }}>
              {v.value !== undefined ? `${v.value}px` : `min ${v.min}px · max ${v.max}px`}
            </td>
            <td style={{ ...cell, fontSize: 13 }}>{String(v.note ?? '')} <Status status={v.status} /></td>
          </tr>
        ))}
      </Table>
      <h3>12-column grid · density</h3>
      <p style={muted}>Items per row at the 1520 container. Gutter = a gap token chosen by the pattern (shown here with gap.M).</p>
      {density.map(([level, perRow]) => (
        <div key={level} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ ...code, width: 40 }}>{level}</span>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: `repeat(${perRow}, 1fr)`, gap: 'var(--sg-space-gap-m)' }}>
            {Array.from({ length: perRow }, (_, i) => (
              <div key={i} style={{ height: 24, background: 'var(--sg-palette-grey-dividers)', borderRadius: 'var(--sg-radius-sm)' }} />
            ))}
          </div>
          <span style={{ ...muted, width: 90 }}>{perRow}/row · {12 / perRow} col</span>
        </div>
      ))}
    </>
  );
}
