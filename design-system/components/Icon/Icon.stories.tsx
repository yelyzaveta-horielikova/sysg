import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, iconNames } from './Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  args: { name: iconNames[0], size: 28 },
  argTypes: { name: { control: 'select', options: iconNames } },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const All: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1.5rem', color: 'var(--sg-color-accent-icon)' }}>
      {iconNames.map((n) => (
        <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Icon name={n} size={28} />
          <span className="sg-text-caption" style={{ color: 'var(--sg-color-text-primary)' }}>{n}</span>
        </div>
      ))}
    </div>
  ),
};
