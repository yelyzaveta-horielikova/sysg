import type { Meta, StoryObj } from '@storybook/react-vite';
import { TableOfContents } from './TableOfContents';
import { SectionHeading } from '../SectionHeading/SectionHeading';

const items = [
  { id: 'about-us', label: 'About Us' },
  { id: 'numbers', label: 'SysGears In Numbers' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'services', label: 'Our Services' },
  { id: 'portfolio', label: 'Portfolio' },
];

const meta = {
  title: 'Components/Table of contents',
  component: TableOfContents,
  parameters: { layout: 'padded' },
  args: { items, activeId: 'about-us', variant: 'sidebar' },
  argTypes: { variant: { control: 'inline-radio', options: ['auto', 'sidebar', 'bar'] } },
} satisfies Meta<typeof TableOfContents>;
export default meta;
type Story = StoryObj<typeof meta>;

/** ≥1280: sticky sidebar on the left of the page. */
export const Sidebar: Story = {};
/** Below 1280: collapsed bar under the header. */
export const Bar: Story = { args: { variant: 'bar' }, decorators: [(Story) => <div style={{ maxWidth: 768, minHeight: 320 }}><Story /></div>] };
/** The bar's list opens as an overlay over the content. */
export const BarOpen: Story = { args: { variant: 'bar', defaultOpen: true }, decorators: [(Story) => <div style={{ maxWidth: 768, minHeight: 320 }}><Story /></div>] };

/** Real page behaviour: `auto` layout, active item follows scrolling. Resize the canvas below 1280px to see the bar. */
export const OnAPage: Story = {
  parameters: { layout: 'fullscreen' },
  args: { variant: 'auto', activeId: undefined },
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sg-space-gap-l)', padding: '0 var(--sg-container-side-margin)' }}>
      <div style={{ flex: '0 0 auto', width: 'min(100%, 365px)' }}>
        {/* activeId omitted on purpose: the active item follows scrolling */}
        <TableOfContents {...args} activeId={undefined} />
      </div>
      <div style={{ flex: '1 1 600px', display: 'flex', flexDirection: 'column', gap: 'var(--sg-space-section-l)', paddingBottom: '60vh' }}>
        {items.map((item) => (
          <section key={item.id} id={item.id} style={{ minHeight: 400 }}>
            <SectionHeading title={item.label} intro="Placeholder block content." />
          </section>
        ))}
      </div>
    </div>
  ),
};
