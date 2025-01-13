import type { Meta, StoryObj } from '@storybook/react';
import { SettingsModal } from '@/components/settings-modal';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';

// Mock messages for translations
const messages = {
  settings: {
    title: 'Settings',
    theme: {
      label: 'Theme',
      placeholder: 'Select theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },
    language: {
      label: 'Language',
      placeholder: 'Select language',
    },
  },
};

const meta: Meta<typeof SettingsModal> = {
  title: 'Components/SettingsModal',
  component: SettingsModal,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <NextIntlClientProvider messages={messages} locale="en">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Story />
        </ThemeProvider>
      </NextIntlClientProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SettingsModal>;

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
