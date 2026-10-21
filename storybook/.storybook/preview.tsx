import type { Preview } from '@storybook/react-vite'
import { injectTokenStyles } from '@sysgears/design-system/styles/tokens'

// Design tokens from ../design-system/tokens.json as CSS variables + .sg-text-* classes.
injectTokenStyles()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    options: {
      storySort: {
        order: [
          'Design System',
          ['Introduction', 'Guidelines', ['System', 'Layout', 'Patterns', 'Figma mapping'], 'Tokens', ['Colors', 'Typography', 'Spacing', 'Radius & borders', 'Layout & grid', 'Source (tokens.json)']],
          'Components',
          ['Button', 'Badge', 'Card', 'Header', 'Footer', 'Headings & text', ['Section heading', 'Hero text', 'Stat'], 'FAQ', 'Table of contents', 'Vertical stepper', 'Expert quote', 'Client feedback', 'Check row', 'Media', 'Block & columns', 'Sharing insights card', 'Form'],
          '*',
        ],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
