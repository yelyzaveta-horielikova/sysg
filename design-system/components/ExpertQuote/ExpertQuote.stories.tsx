import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExpertQuote } from './ExpertQuote';
import photo from '../../assets/examples/expert-avatar.png';

const meta = {
  title: 'Components/Expert quote',
  component: ExpertQuote,
  parameters: { layout: 'padded' },
  args: {
    quote: '“Software development is our passion, our calling, and our art. Being our client means to have a long-term partner who works on your project success. Being a part of our team means to work on what you truly love and to always look for a new technical challenge. These are two cornerstone ideas behind SysGears.”',
    name: 'Viktor Vlasenko',
    role: 'CEO',
    photo,
  },
} satisfies Meta<typeof ExpertQuote>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Large avatar beside the quote from a 1024 viewport; resize the canvas to see the compact layout. */
export const Default: Story = {};
/** Compact layout (below 1024): quote first, then a small avatar with name and role. */
export const Compact: Story = { decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] };
