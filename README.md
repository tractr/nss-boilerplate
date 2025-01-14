# NSS Boilerplate

A modern full-stack boilerplate featuring Next.js 15, Supabase, Shadcn/UI, and more. Built with TypeScript and includes authentication, dark mode, internationalization, and a todo list demo.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Authentication](#authentication)
- [Internationalization](#internationalization)
- [Customization](#customization)
- [Testing](#testing)
- [Good Practices](#good-practices)
- [Contributing](#contributing)
- [License](#license)

## Features

- 🚀 [Next.js 15](https://nextjs.org/) with App Router
- 🎨 [Shadcn/UI](https://ui.shadcn.com/) components
- 📚 [Storybook](https://storybook.js.org/) for component development
- 🔐 [Supabase](https://supabase.com/) Authentication & Database
- 🌍 Internationalization with [next-intl](https://next-intl-docs.vercel.app/)
- 🎭 Dark mode with [next-themes](https://github.com/pacocoursey/next-themes)
- 📝 Form handling with [react-hook-form](https://react-hook-form.com/) and [zod](https://github.com/colinhacks/zod)
- 🔄 Data fetching with [TanStack Query](https://tanstack.com/query)
- 🎯 [TypeScript](https://www.typescriptlang.org/) support
- 💅 [Tailwind CSS](https://tailwindcss.com/) for styling
- 🧪 Testing setup with [Vitest](https://vitest.dev/) and [Cypress](https://www.cypress.io/)
- 📦 [Lucide Icons](https://lucide.dev/)

## Prerequisites

- Node.js 20+
- Docker (for local Supabase)
- Git

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/pierrecabriere/nss-boilerplate.git my-project
cd my-project
```

**You can also rename all the references to this boilerplate in the project.**

- in `package.json`
- in `supabase/config.toml`
- in `src/app/layout.tsx`

2. Install dependencies:

```bash
npm install
```

3. Start local Supabase:

```bash
npx supabase start
```

This will start a local Supabase instance using Docker. Make note of the `anon key` and `API URL` that are displayed.

4. Push database migrations:

```bash
npx supabase db push --local
```

This will create the initial database structure, including the todos table.

5. Set environment variables:

```bash
cp .env.example .env
```

Update the `.env` file with your Supabase credentials:

- `SUPABASE_URL`: Usually `http://127.0.0.1:54321`
- `SUPABASE_ANON_KEY`: The anon key from step 3
- `SUPABASE_BASE_KEY`: Same as your anon key for local development

6. Create a first user:

- Open Supabase Studio at `http://127.0.0.1:54323`
- Go to Authentication > Users
- Create a new user with email/password
- Ensure the user has the `authenticated` role

7. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── auth/           # Authentication pages
│   └── ...             # Other pages
├── components/         # React components
│   ├── ui/             # Shadcn/UI components
│   └── ...             # Custom components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
│   ├── api/            # API related functions
│   └── supabase/       # Supabase client configurations
├── types/              # TypeScript type definitions
└── i18n/               # Internationalization
    └── messages/       # Internationalization messages
├── stories/            # Storybook stories
│   ├── components/     # Component stories
│   └── pages/          # Page stories
supabase/
└── functions/          # Supabase Edge Functions (Deno)
```

## IDE Configuration

### VS Code

If you're using VS Code, you can limit Deno's type checking to only the Supabase functions directory by adding this to your `.vscode/settings.json`:

```json
{
  "deno.enablePaths": ["supabase/functions"]
}
```

This ensures that Deno only runs in the Supabase Edge Functions directory and doesn't interfere with the rest of your TypeScript setup.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests
- `npm run cypress:open` - Open Cypress test runner
- `npm run cypress:run` - Run Cypress tests headlessly
- `npm run gen:types` - Generate TypeScript types from Supabase schema
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## Authentication

The boilerplate includes a complete authentication system using Supabase Auth:

- Email/Password authentication
- Protected routes using middleware
- User context and hooks
- Login/Logout functionality

## Internationalization

Supports multiple languages out of the box:

- English and French included by default
- Easy to add more languages in `src/i18n/messages/` directory and in the `SUPPORTED_LANGUAGES` array in `src/components/settings-modal.tsx`
- Language switching with persistent selection in cookie

## Customization

### Theme

- Modify the theme in `src/app/globals.css`
- Dark mode support using `next-themes`
- Customizable Shadcn/UI components in `src/components/ui`

Shadcn/UI offers a tool to customize your theme. You can find it at `https://ui.shadcn.com/themes`. Then, you can replace the generated theme in `src/app/globals.css` with your custom theme. Be careful to replace only the `@layer base { ... }` block.

### Database Schema

- Generate updated types with `npm run gen:types`

## Testing

- Unit testing with Vitest
- E2E testing with Cypress
- Example tests included

To run the tests:

```bash
npm run test
npm run cypress:open
```

## Storybook

The project includes Storybook for component development and documentation:

### Structure

- Stories are located in `src/stories/`
- Component stories in `src/stories/components/`
- Page stories in `src/stories/pages/`

### Running Storybook

```bash
npm run storybook
```

Visit `http://localhost:6006` to see your component stories.

### Writing Stories

Create new stories in the `src/stories` directory following the pattern:

```typescript
// Example: src/stories/components/button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Button> = {
  component: Button,
  // ... configuration
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
```

### Building Storybook

To build a static version of Storybook:

```bash
npm run build-storybook
```

The output will be in the `storybook-static` directory.

## Good Practices

- Use kebab-case for all file names (e.g., `my-component.tsx`, `use-auth.ts`)
- Remove unused boilerplate files (e.g., `lib/api/todos`) when starting a new project
- Create Supabase migrations whenever you make database changes:
  ```bash
  npx supabase db pull
  ```
  Then commit these migrations with your changes
- Don't use `process.env` directly in your code. Instead, use the environment variables defined in `src/lib/env.ts`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
