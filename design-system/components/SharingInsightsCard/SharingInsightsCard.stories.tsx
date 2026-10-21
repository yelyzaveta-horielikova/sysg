import type { Meta, StoryObj } from '@storybook/react-vite';
import { SharingInsightsCard } from './SharingInsightsCard';
import { CardGrid } from '../Card/CardGrid';
import photo from '../../assets/examples/author-photo.png';

const meta = {
  title: 'Components/Sharing insights card',
  component: SharingInsightsCard,
  parameters: { layout: 'padded' },
  args: {
    title: 'Key points a business should consider before outsourcing software development',
    href: '#article',
    author: { name: 'Dmytro Pavlenko', role: 'CTO', photo },
    tone: 'accent',
  },
  argTypes: { tone: { control: 'inline-radio', options: ['accent', 'muted', 'teal'] } },
  decorators: [(Story, ctx) => <div style={{ width: ctx.parameters.cardWidth ?? 380 }}><Story /></div>],
} satisfies Meta<typeof SharingInsightsCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {};
export const Muted: Story = { args: { tone: 'muted', title: 'A failure story of an Uber-like app: the cost of skipping the discovery phase' } };
export const Teal: Story = { args: { tone: 'teal', title: 'Best Practices for Processing HTTP Headers and Cookies' } };
/** Sharing-insights block: 3 cards from a 1024 viewport, touching (gap.XS); one column below. */
export const Row: Story = {
  parameters: { cardWidth: 'min(100%, 1520px)' },
  render: (args) => (
    <CardGrid variant="gap" gap="XS" columns={{ base: 1, md: 3 }}>
      <SharingInsightsCard {...args} />
      <SharingInsightsCard {...args} tone="muted" title="A failure story of an Uber-like app: the cost of skipping the discovery phase" />
      <SharingInsightsCard {...args} tone="teal" title="Best Practices for Processing HTTP Headers and Cookies" />
    </CardGrid>
  ),
};
