import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowButton } from './ArrowButton';

const meta = {
  title: 'Components/Arrow button',
  component: ArrowButton,
  args: { variant: 'white' },
  argTypes: { variant: { control: 'inline-radio', options: ['white', 'blue'] } },
} satisfies Meta<typeof ArrowButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const White: Story = {
  decorators: [(Story) => <div style={{ background: 'var(--sg-color-surface-accent)', padding: '1.5rem', display: 'inline-block' }}><Story /></div>],
};
export const Blue: Story = {
  args: { variant: 'blue' },
  decorators: [(Story) => <div style={{ background: 'var(--sg-color-surface-muted)', padding: '1.5rem', display: 'inline-block' }}><Story /></div>],
};
export const Interactive: Story = { args: { variant: 'blue', label: 'Next', onClick: () => {} } };
