import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const frame = (width: number) => (Story: () => React.JSX.Element) => (
  <div style={{ width, maxWidth: 'none', outline: '1px dashed var(--sg-color-border-divider)' }}><Story /></div>
);

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fills the canvas width — resize the canvas or use the viewport toolbar to see it switch. */
export const Default: Story = {};
export const Desktop: Story = { name: 'Desktop (≥1280)', decorators: [frame(1440)] };
export const Tablet: Story = { name: 'Tablet (480–1279)', decorators: [frame(768)] };
export const Mobile: Story = { name: 'Mobile (<480)', decorators: [frame(375)] };
