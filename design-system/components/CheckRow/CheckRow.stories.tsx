import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckList, CheckRow } from './CheckRow';

const meta = {
  title: 'Components/Check row',
  component: CheckRow,
  parameters: { layout: 'padded' },
  args: { mark: 'check', variant: 'dark', title: undefined, children: 'Keep the full case context in one place' },
  argTypes: {
    mark: { control: 'inline-radio', options: ['check', 'cross'] },
    variant: { control: 'inline-radio', options: ['dark', 'white'] },
    title: { control: 'text' },
    children: { control: 'text' },
  },
  decorators: [(Story) => <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 646 }}><Story /></ul>],
} satisfies Meta<typeof CheckRow>;
export default meta;
type Story = StoryObj<typeof meta>;

const onDark = (Story: () => ReactNode) => (
  <div style={{ background: 'var(--sg-color-surface-dark)', padding: '3.75rem', borderRadius: 'var(--sg-radius-md)' }}><Story /></div>
);

export const Default: Story = {};
export const WithTitle: Story = {
  args: { title: 'Fixed price', children: 'The budget is agreed before the work starts and does not change.' },
};
export const Cross: Story = {
  args: { mark: 'cross', title: 'Fixed price', children: 'Changes to the scope need a new estimate and contract.' },
};
export const White: Story = {
  args: { variant: 'white', children: 'A dedicated team that works as part of yours' },
  decorators: [onDark],
};

/** Case-study goals and Pros-and-cons-colored: two columns from 768. */
export const TwoColumns: Story = {
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <CheckList columns={2}>
        {[
          'Keep the full case context in one place',
          'Monitor calls in real time',
          'Manage cases without leaving them',
          'Track cases, calls, and agents',
          'See case status and activity at a glance',
          'Keep every agent informed on the case',
        ].map((t) => <CheckRow key={t}>{t}</CheckRow>)}
      </CheckList>
    </div>
  ),
};

/** Pros-and-cons: titled rows, one column. */
export const ProsAndCons: Story = {
  render: () => (
    <div style={{ maxWidth: 646 }}>
      <CheckList>
        <CheckRow title="Predictable budget">The cost is agreed before the work starts.</CheckRow>
        <CheckRow title="Clear deadlines">The scope and timeline are fixed in the contract.</CheckRow>
        <CheckRow mark="cross" title="Less flexibility">Changes to the scope need a new estimate.</CheckRow>
      </CheckList>
    </div>
  ),
};

/** Dark-highlights "Check": white rows on sg-dark. */
export const OnDarkList: Story = {
  render: () => (
    <CheckList>
      <CheckRow variant="white">A dedicated team that works as part of yours</CheckRow>
      <CheckRow variant="white">Transparent reporting every sprint</CheckRow>
      <CheckRow variant="white">Senior engineers on every project</CheckRow>
    </CheckList>
  ),
  decorators: [onDark],
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.875rem', maxWidth: 646 }}>
      <CheckList>
        <CheckRow>Dark · check · text only</CheckRow>
        <CheckRow mark="cross">Dark · cross · text only</CheckRow>
        <CheckRow title="Dark · check">With a title line</CheckRow>
        <CheckRow mark="cross" title="Dark · cross">With a title line</CheckRow>
      </CheckList>
      {onDark(() => (
        <CheckList>
          <CheckRow variant="white">White · check · text only</CheckRow>
          <CheckRow variant="white" title="White · check">With a title line</CheckRow>
        </CheckList>
      ))}
    </div>
  ),
};
