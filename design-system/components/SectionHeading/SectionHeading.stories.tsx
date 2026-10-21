import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionHeading } from './SectionHeading';

const intro = 'SysGears provides full-cycle software development services, helping companies around the globe design, implement, test, and launch their products.';

const meta = {
  title: 'Components/Headings & text/Section heading',
  component: SectionHeading,
  parameters: { layout: 'padded' },
  args: { title: 'Embrace Our End-To-End Software Development Services', intro, layout: 'stacked' },
  argTypes: { layout: { control: 'inline-radio', options: ['stacked', 'inline', 'side'] } },
} satisfies Meta<typeof SectionHeading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {};
/** Title beside the intro from 1024px; stacks below. */
export const Inline: Story = { args: { layout: 'inline' } };
/** Narrow column for the side-heading block layout (320–420px). */
export const Side: Story = { args: { layout: 'side', title: 'What Our Clients Say' } };
