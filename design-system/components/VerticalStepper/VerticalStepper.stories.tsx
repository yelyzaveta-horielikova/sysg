import type { Meta, StoryObj } from '@storybook/react-vite';
import { VerticalStepper } from './VerticalStepper';

const steps = [
  { title: 'Initial Consultation', text: 'We begin with a round of communication to understand your business operations, the issues you face and your goals.' },
  { title: 'In-Depth Discovery Phase', text: 'Next, our business analysts work closely with you or your team to define the scope and requirements.' },
  { title: 'Strategy, Project Planning, and Team Assembly', text: 'Based on the findings of the discovery phase, we select the technologies and assemble the team.' },
  { title: 'Tailored UI/UX Design', text: 'Our designers analyze your workflows and user needs to build intuitive interfaces.' },
  { title: 'Software Engineering', text: 'Our developers build software in short, iterative cycles.', list: ['Web and mobile apps', 'NLP', 'Computer Vision'] },
];

const meta = {
  title: 'Components/Vertical stepper',
  component: VerticalStepper,
  parameters: { layout: 'padded' },
  args: { steps },
  decorators: [(Story) => <div style={{ maxWidth: 1100 }}><Story /></div>],
} satisfies Meta<typeof VerticalStepper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithList: Story = { args: { steps: steps.slice(3) } };
