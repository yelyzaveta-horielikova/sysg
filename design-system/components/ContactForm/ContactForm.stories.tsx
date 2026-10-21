import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactForm } from './ContactForm';
import { TextField } from './TextField';
import { FileDropzone } from './FileDropzone';

const filled = {
  name: 'Jennifer Harding',
  email: 'jenniferharding87@gmail.com',
  message: 'We are currently seeking a reliable and experienced software development partner for a healthcare platform.',
  files: [new File([new Uint8Array(2_400_000)], 'sysgears-attachment.png'), new File([new Uint8Array(820_000)], 'brief.pdf')],
};

const meta = {
  title: 'Components/Form',
  component: ContactForm,
  parameters: { layout: 'padded' },
  args: { onSubmit: () => new Promise((r) => setTimeout(r, 1500)) },
} satisfies Meta<typeof ContactForm>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Fill in Name and Email and press Submit: loading for 1.5s, then the sent state. */
export const Default: Story = {};
export const Filled: Story = { args: { defaultValues: filled } };
export const Loading: Story = { args: { defaultValues: filled, status: 'loading' } };
export const Sent: Story = { args: { status: 'sent' } };
/** Phone layout: text, then the form, then other ways to connect. */
export const Phone: Story = { decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>] };

const dark = (Story: () => React.JSX.Element) => (
  <div style={{ background: 'var(--sg-color-surface-dark)', padding: 'var(--sg-space-inset-lg)', maxWidth: 668 }}><Story /></div>
);
/** Text field states: empty, filled, error. */
export const TextFields: Story = {
  decorators: [dark],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <TextField label="Name" />
      <TextField label="Name" defaultValue="Jennifer Harding" />
      <TextField label="Email" defaultValue="jennifer@" error="Please enter a valid email." />
      <TextField multiline label="Describe your request" />
    </div>
  ),
};
/** File drop zone with attached files (one over the 30 MB limit). */
export const Files: Story = {
  decorators: [dark],
  render: () => (
    <FileDropzone files={[...filled.files, new File([new Uint8Array(32_000_000)], 'video-recording.jpg')]} onChange={() => {}} />
  ),
};
