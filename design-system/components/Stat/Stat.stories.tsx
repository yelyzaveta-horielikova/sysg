import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stat, StatGrid } from './Stat';

const onDark = (Story: () => React.JSX.Element) => (
  <div style={{ background: 'var(--sg-color-surface-dark)', padding: 'var(--sg-space-inset-lg)', borderRadius: 'var(--sg-radius-md)' }}>
    <Story />
  </div>
);

const stats = [
  { value: '15+', label: 'Years On The Market', description: 'Founded in 2010, SysGears has been delivering high-quality software for over 15 years.' },
  { value: '350+', label: 'Projects Completed', description: 'SysGears implements software projects of any complexity and domain.' },
  { value: '110+', label: 'Software Development Experts on Board', description: 'Relying on long-standing experience in software development.' },
  { value: '20+', label: 'Industries Covered', description: 'SysGears develops software applications for businesses across industries.' },
];

const meta = {
  title: 'Components/Headings & text/Stat',
  component: Stat,
  parameters: { layout: 'padded' },
  decorators: [onDark],
  args: stats[0],
} satisfies Meta<typeof Stat>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** Dark-highlights "Numbers": 2 × 2 from 768px, one column below. */
export const Grid: Story = {
  render: () => (
    <StatGrid>
      {stats.map((s) => <Stat key={s.value} {...s} />)}
    </StatGrid>
  ),
};
