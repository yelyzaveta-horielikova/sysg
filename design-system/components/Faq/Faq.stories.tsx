import type { Meta, StoryObj } from '@storybook/react-vite';
import { Faq, FaqItem } from './Faq';

const items = [
  {
    question: 'Do you cover all SDLC stages?',
    answer: 'SysGears provides full-cycle software development services, covering all lifecycle stages, from product discovery and project planning through design, development, quality assurance, deployment, and post-release support.',
  },
  {
    question: 'Can you join a project that is already underway?',
    answer: 'Yes. We can extend your in-house team or take over development after an audit of the existing code and processes.',
  },
  {
    question: 'How do you ensure quality?',
    answer: 'Every project has dedicated QA, code review and automated testing as part of the delivery process.',
  },
];

const meta = {
  title: 'Components/FAQ',
  component: Faq,
  parameters: { layout: 'padded' },
  args: {
    title: 'FAQ',
    intro: 'SysGears provides full-cycle software development services, helping companies around the globe design, implement, test, and launch their products.',
    items,
  },
} satisfies Meta<typeof Faq>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** A single question with its answer. */
export const Item: Story = {
  render: () => <div style={{ maxWidth: 750 }}><FaqItem question={items[0].question}>{items[0].answer}</FaqItem></div>,
};
