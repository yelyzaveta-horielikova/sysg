import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const onDark = (Story: () => React.JSX.Element) => (
  <div style={{ background: 'var(--sg-color-surface-dark)', padding: '2rem', borderRadius: 'var(--sg-radius-md)' }}>
    <Story />
  </div>
);

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Contact us', variant: 'primary', loading: false },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'outlined', 'white'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Outlined: Story = { args: { variant: 'outlined' } };
export const White: Story = { args: { variant: 'white', children: 'Submit' }, decorators: [onDark] };

/** Each variant with its states: default and loading (hover with the pointer). */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button>Contact us</Button>
        <Button loading>Contact us</Button>
        <Button variant="outlined">Contact us</Button>
        <Button variant="outlined" loading>Contact us</Button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--sg-color-surface-dark)', padding: '1.5rem', borderRadius: 'var(--sg-radius-md)' }}>
        <Button variant="white">Submit</Button>
        <Button variant="white" loading>Submit</Button>
      </div>
    </div>
  ),
};
