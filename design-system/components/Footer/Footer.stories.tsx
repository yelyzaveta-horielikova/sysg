import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const frame = (width: number) => (Story: () => React.JSX.Element) => (
  <div style={{ width, paddingTop: 40, outline: '1px dashed var(--sg-color-border-divider)' }}><Story /></div>
);

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fills the canvas width — resize the canvas or use the viewport toolbar to see it switch. */
export const Default: Story = {};
export const Desktop: Story = { name: 'Desktop (≥1024)', decorators: [frame(1440)] };
export const Tablet: Story = { name: 'Tablet (768–1023)', decorators: [frame(900)] };
export const Phone: Story = { name: 'Phone (<768)', decorators: [frame(375)] };
