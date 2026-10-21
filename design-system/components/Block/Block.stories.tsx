import type { Meta, StoryObj } from '@storybook/react-vite';
import { Block, Columns } from './Block';
import { Media } from '../Media/Media';
import { ClientFeedback } from '../ClientFeedback/ClientFeedback';
import { Card } from '../Card/Card';
import { CardGrid } from '../Card/CardGrid';

const heading = { title: 'Block heading', intro: 'An optional intro under the block heading, up to 780px wide.' };

const meta = {
  title: 'Components/Block & columns',
  component: Block,
  parameters: { layout: 'fullscreen' },
  args: { heading, layout: 'stacked', children: <Media alt="Placeholder" /> },
  argTypes: { layout: { control: 'inline-radio', options: ['stacked', 'side', 'inline'] }, children: { control: false } },
  decorators: [(Story) => <div style={{ paddingBlock: '3.75rem' }}><Story /></div>],
} satisfies Meta<typeof Block>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Stacked: Story = {};
export const SideHeading: Story = { args: { layout: 'side' } };
export const InlineHeading: Story = { args: { layout: 'inline' } };

/** Different content side by side: a quote (4 columns) beside a card grid (8 columns). */
export const MixedColumns: Story = {
  args: {
    children: (
      <Columns spans={[4, 8]}>
        <ClientFeedback quote="A client quote next to a grid of cards." author={{ name: 'Client Name', role: 'Role, Company' }} />
        <CardGrid variant="divided" columns={{ base: 1, sm: 2 }}>
          {['First', 'Second', 'Third', 'Fourth'].map((t) => (
            <Card key={t} surface="outlined" title={`${t} result`} text="One sentence about the result." />
          ))}
        </CardGrid>
      </Columns>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    children: (
      <Columns spans={[4, 4, 4]}>
        <Media alt="First" ratio="1:1" />
        <Media alt="Second" ratio="1:1" />
        <Media alt="Third" ratio="1:1" />
      </Columns>
    ),
  },
};
