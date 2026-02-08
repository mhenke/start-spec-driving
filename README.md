# start-spec-driving

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, Self, TRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components with accessible design
- **tRPC** - End-to-end type-safe APIs
- **Drizzle** - TypeScript-first ORM
- **SQLite** - Local database engine

## Getting Started

First, install the dependencies:

```bash
bun install
```

## Database Setup

This project uses SQLite with Drizzle ORM.

1. Start the local SQLite database (optional):

```bash
bun run db:local
```

2. Update your `.env` file in the `apps/web` directory with the appropriate connection details if needed.

3. Apply the schema to your database:

```bash
bun run db:push
```

Then, run the development server:

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see the fullstack application.

## Project Structure

```
start-spec-driving/
├── apps/
│   └── web/         # Fullstack application (React + TanStack Start)
├── packages/
│   ├── api/         # API layer / business logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `bun run dev`: Start all applications in development mode
- `bun run build`: Build all applications
- `bun run check-types`: Check TypeScript types across all apps
- `bun run db:push`: Push schema changes to database
- `bun run db:generate`: Generate database client/types
- `bun run db:migrate`: Run database migrations
- `bun run db:studio`: Open database studio UI
- `bun run db:local`: Start the local SQLite database

## Working with Components

This project uses shadcn/ui for building accessible and reusable UI components. The components are located in the `apps/web/src/components/ui` directory.

To add new shadcn/ui components, you can use the shadcn CLI:

```bash
cd apps/web
npx shadcn@latest add [component-name]
```

For more information about available components and usage patterns, visit the [shadcn/ui documentation](https://ui.shadcn.com/docs).

## Start the OpenSpec demo

Follow these steps to initialize and configure OpenSpec for this project:

### 1. Initialize OpenSpec

Run the initialization command in the project root:

```bash
openspec init
```

This will create the necessary OpenSpec configuration files in the `openspec/` directory.

### 2. Configure the OpenSpec context

Update the `openspec/config.yaml` file with your project context. You can use an AI tool to generate the appropriate context by providing it with the following prompt:

````
I am setting up a new project using OpenSpec v1.1+. I need to initialize the context field in my  @openspec/config.yamll file. Please review the existing @openspec/config.yaml for guidlines. This file must serve as the 'worldview' that guides all future AI agent actions.

Please analyze and audit the following details and generate a structured, concise YAML block for the context field:

1. System Overview & Domain: [Describe what the system does and any core business rules or industry-specific logic].
2. Technical Stack & Versions: [List your specific languages, frameworks, and libraries with versions, e.g., TypeScript 5.0, Next.js 14, Tailwind 3.0].
3. Architectural Patterns & Constraints: [List your preferred patterns, such as Clean Architecture, DDD, or specific repository patterns, and any 'Non-obvious' rules the AI must never violate].
4. Coding Standards: [Specify naming conventions, linting preferences, or folder structure requirements].
Output Requirements:
• Format the result as a single YAML string under the context: key.
• Keep the content token-efficient (aiming for under 50KB)
.
• Focus on providing deterministic guidance to prevent AI hallucinations

Please update the  @openspec/config.yaml
."
````

### 3. Verify the setup

After configuring the context, you can run the OpenSpec demo to ensure everything is properly set up.
