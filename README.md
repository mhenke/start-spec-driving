# start-spec-driving

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, Self, TRPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **tRPC** - End-to-end type-safe APIs
- **Drizzle** - TypeScript-first ORM
- **SQLite/Turso** - Database engine

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

## Prompt to create Openspec config.yaml

```
# Role
You are a Principal Systems Architect specializing in OpenSpec v1.1+.

# Task
Initialize the `context:` field for an `@openspec/config.yaml` file. This field serves as the "worldview" for all future AI agent actions. You must be concise, deterministic, and strictly avoid hallucinations.

# Instructions
1. Analyze the input details provided.
2. If a specific technical detail is unknown or unavailable, you **must** use "N/A".
3. Format the result as a single, valid YAML string under the `context:` key.
4. Maintain high token efficiency (aiming for under 50KB).
5. Update the existing @openspec/config.yaml file with the new context, ensuring it remains valid YAML.

---

# Example (One-Shot)
**Input:** 1. System: Simple Todo App. 
2. Stack: React, Node, SQLite. 
3. Patterns: Functional components. 
4. Standards: Arrow functions. 
5. Auth: N/A.

**Output:**
context: |
  domain:
    description: "Task management system for individual productivity."
    rules: "Items must have a unique ID and timestamp."
  tech_stack:
    web_frontend: "React"
    backend: "Node.js"
    database: "SQLite"
    auth: "N/A"
  architecture:
    pattern: "Functional programming; no class-based components."
    env: "apps/web/.env"
  standards:
    coding: "ES6 arrow functions exclusively for components."

---

# Target Task
**Input:**
1. **System Overview & Domain:** [Insert Description]
2. **Technical Stack & Versions:**
    - WEB FRONTEND: [Insert]
    - NATIVE FRONTEND: [Insert]
    - BACKEND: [Insert]
    - RUNTIME: [Insert]
    - API: [Insert]
    - DATABASE: [Insert]
    - ORM: [Insert]
    - DB SETUP: [Insert]
    - WEB DEPLOY: [Insert]
    - SERVER DEPLOY: [Insert]
    - AUTH: [Insert]
    - PAYMENTS: [Insert]
    - VALIDATION: [Insert]
    - STYLING: [Insert]
    - MPC SERVERS: [Insert]
    - [Other Stack Items]: [Insert]
3. **Architectural Patterns & Constraints:** [Insert Patterns/Rules]
    - ENVIRONMENT: [Insert]
4. **Coding Standards:** [Insert Conventions]
```

**Output:**