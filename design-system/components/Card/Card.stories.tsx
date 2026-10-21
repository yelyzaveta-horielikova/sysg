import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { CardGrid } from './CardGrid';
import { Icon } from '../Icon/Icon';
import illustration from '../../assets/illustration.svg';
import casePhoto from '../../assets/examples/case-photo.jpg';

const text = 'If you look for a reliable software development partner to outsource the full project, we take care of every stage from discovery to support.';
const list = ['Discovery and planning', 'Design and development', 'QA and support'];
const icon = { kind: 'icon' as const, icon: <Icon name="software-development" /> };
const art = { kind: 'illustration' as const, src: illustration };

const meta = {
  title: 'Components/Card',
  component: Card,
  args: { title: 'Full Cycle Development', text, surface: 'filled', align: 'left', titleSize: 'large', titleAccent: false },
  argTypes: {
    surface: { control: 'inline-radio', options: ['filled', 'outlined'] },
    align: { control: 'inline-radio', options: ['left', 'center'] },
    titleSize: { control: 'inline-radio', options: ['large', 'small'] },
    media: { control: false },
  },
  // Single cards render at 420px; grid stories set cardWidth to fill the canvas.
  decorators: [(Story, ctx) => <div style={{ width: ctx.parameters.cardWidth ?? 420 }}><Story /></div>],
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Figma: Card (Darker-grey-cards-M) */
export const Feature: Story = { args: { media: art, list } };
export const FeatureCentered: Story = { args: { media: art, align: 'center' } };
/** Figma: Small-card (Darker-grey-cards-S) */
export const Tile: Story = {
  args: { media: art, title: 'Healthcare', text: undefined, titleSize: 'small', align: 'center', href: '#' },
  parameters: { cardWidth: 240 },
};
/** Icon without its tile: the icon fills the same 64px box (e.g. case-study results). */
export const IconWithoutTile: Story = {
  args: { surface: 'outlined', media: { kind: 'icon', icon: <Icon name="software-development" />, tile: false }, title: 'Cases Became Easier to Manage', text },
};
/** Figma: Big-card (Cards-with-dividers) */
export const Service: Story = { args: { surface: 'outlined', media: icon, title: 'Web App Development', titleAccent: true, list } };
const chips = ['JavaScript', 'TypeScript', 'React', 'Next.js', 'React Native', 'Expo'];

/** Chip card without image (Figma: industries-card): grey fill, title at the top, badges at the bottom. */
export const Chips: Story = {
  args: { title: 'Frontend', text: undefined, badges: chips },
};
/** Chip card with an image filling the card: title and badges at the bottom, in white. */
export const ChipsOnImage: Story = {
  args: { title: 'Process automation system for animal blood bank', text: undefined, badges: ['BI', 'Animal Care'], media: { kind: 'background', src: casePhoto } },
};
/** Chip cards in a row: the badges line up at the bottom whatever the title length. */
export const ChipsGrid: Story = {
  parameters: { layout: 'padded', cardWidth: 'min(100%, 1520px)' },
  render: (args) => (
    <CardGrid variant="gap" gap="L" columns={{ base: 1, sm: 2, lg: 3 }}>
      <Card {...args} title="Frontend" text={undefined} badges={chips} />
      <Card {...args} title="Databases and state management" text={undefined} badges={['Redux', 'MobX', 'MySQL', 'PostgreSQL']} />
      <Card {...args} title="Animal blood bank" text={undefined} badges={['BI', 'Animal Care']} media={{ kind: 'background', src: casePhoto }} />
    </CardGrid>
  ),
};
export const Interactive: Story = { args: { media: art, href: '#' } };

/** Filled cards in a grid: same variant in every cell, separated by a gap token (here gap.M). */
export const FilledGrid: Story = {
  parameters: { layout: 'padded', cardWidth: 'min(100%, 1520px)' },
  render: (args) => (
    <CardGrid variant="gap" gap="M" columns={{ base: 1, sm: 2, lg: 3 }}>
      {['Full Cycle Development', 'Dedicated Teams', 'Team Augmentation'].map((t) => (
        <Card key={t} {...args} media={art} align="center" title={t} />
      ))}
    </CardGrid>
  ),
};

/** Outlined cards touch; divider lines only between cards, no outer border. */
export const OutlinedGrid: Story = {
  parameters: { layout: 'padded', cardWidth: 'min(100%, 1520px)' },
  render: (args) => (
    <CardGrid variant="divided" columns={{ base: 1, sm: 2, lg: 3 }}>
      {['Web App Development', 'Mobile App Development', 'Testing and QA', 'UI/UX Design', 'Business Analysis'].map((t) => (
        <Card key={t} {...args} surface="outlined" media={icon} title={t} titleAccent list={list} />
      ))}
    </CardGrid>
  ),
};
