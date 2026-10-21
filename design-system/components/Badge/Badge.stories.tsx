import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, BadgeGroup } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'React', size: 'medium', variant: 'black' },
  argTypes: {
    size: { control: 'inline-radio', options: ['medium', 'small'] },
    variant: { control: 'inline-radio', options: ['black', 'white'] },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Medium: Story = {};
export const Small: Story = { args: { size: 'small' } };
export const OnDark: Story = {
  args: { variant: 'white', children: 'Healthcare' },
  decorators: [(Story) => <div style={{ background: 'var(--sg-color-surface-dark)', padding: '1.5rem' }}><Story /></div>],
};
export const Group: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <BadgeGroup>
        {['JavaScript', 'TypeScript', 'React', 'Next.js', 'React Native', 'Expo'].map((t) => <Badge key={t}>{t}</Badge>)}
      </BadgeGroup>
    </div>
  ),
};
