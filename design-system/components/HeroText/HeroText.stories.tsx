import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroText } from './HeroText';

const meta = {
  title: 'Components/Headings & text/Hero text',
  component: HeroText,
  parameters: { layout: 'padded' },
  args: {
    title: 'Custom Software Development Company',
    lead: 'We design, build and support web and mobile products for companies around the globe.',
    cta: { label: 'Contact us', href: '#contact' },
  },
} satisfies Meta<typeof HeroText>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutLead: Story = { args: { lead: undefined } };
