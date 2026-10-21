import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClientFeedback } from './ClientFeedback';
import { SectionHeading } from '../SectionHeading/SectionHeading';
import photo from '../../assets/examples/client-photo.png';

const meta = {
  title: 'Components/Client feedback',
  component: ClientFeedback,
  parameters: { layout: 'padded' },
  args: {
    platform: 'clutch',
    rating: '5.0',
    quote: '“The overall team was great, the culture of being helpful and going out of their way to make sure we were taken care off. The team members that were assigned to us and worked with were really amazing, and it felt as if they were part of our team.”',
    author: { name: 'Sohrab Tellaie', role: 'Founder, omni.day', photo },
  },
  argTypes: { platform: { control: 'inline-radio', options: ['clutch', 'upwork', 'goodfirms'] } },
  decorators: [(Story) => <div style={{ maxWidth: 1100 }}><Story /></div>],
} satisfies Meta<typeof ClientFeedback>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutPhoto: Story = { args: { author: { name: 'Eldar A.', role: 'Director, Domium' } } };

/** Client-feedback block: side heading (max 420) + card from a 1024 viewport; stacked below (patterns.md). */
export const InBlock: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 1520 }}><Story /></div>],
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sg-space-section-m) 0' }}>
      <div style={{ flex: '0 1 420px' }}>
        <SectionHeading layout="side" title="What Our Clients Say" intro="SysGears provides full-cycle software development services." />
      </div>
      <div style={{ flex: '1 1 600px' }}>
        <ClientFeedback {...args} />
      </div>
    </div>
  ),
};
