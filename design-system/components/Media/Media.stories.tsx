import type { Meta, StoryObj } from '@storybook/react-vite';
import { Media } from './Media';
import casePhoto from '../../assets/examples/case-photo.jpg';

const meta = {
  title: 'Components/Media',
  component: Media,
  parameters: { layout: 'padded' },
  args: { alt: 'Screenshot of the feature', kind: 'image' },
  argTypes: {
    kind: { control: 'inline-radio', options: ['image', 'video'] },
    ratio: { control: 'select', options: [undefined, '1:1', '2:1', '4:1', '21:9', '14:3', '9:8', '6:7', '1:2', '9:21'] },
  },
  decorators: [(Story) => <div style={{ maxWidth: 800 }}><Story /></div>],
} satisfies Meta<typeof Media>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ImagePlaceholder: Story = {};
export const VideoPlaceholder: Story = { args: { kind: 'video', alt: 'Screen recording of the feature' } };
export const Image: Story = { args: { src: casePhoto } };
export const ImageCropped: Story = { args: { src: casePhoto, ratio: '21:9' } };
