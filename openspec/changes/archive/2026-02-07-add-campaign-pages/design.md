## Context

The application currently has a placeholder homepage and an empty database schema. The frontend is built with TanStack Start and the backend with tRPC. This design outlines the plan to implement the public-facing campaign browsing and lead capture functionality.

## Goals / Non-Goals

**Goals:**
- Implement the database schema for `Campaigns` and `Leads`.
- Create API endpoints to list campaigns, get a single campaign, and create a lead.
- Build the frontend UI for the campaign list and detail pages.
- Seed the database with sample data for development.

**Non-Goals:**
- Admin sections for managing campaigns or viewing leads.
- User authentication or authorization.
- Deployment configuration.

## Decisions

### 1. Database Schema
We will define the `campaigns` and `leads` tables in `packages/db/src/schema/index.ts` using Drizzle ORM. The schema is a direct translation of the data model in `epic.md`.

Here is the specific Drizzle schema that will be implemented:

```typescript
import { relations, sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const campaigns = sqliteTable("campaigns", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  monthlyPrice: integer("monthly_price").notNull(),
  downpayment: integer("downpayment").notNull(),
  durationMonths: integer("duration_months").notNull(),
  kmPerYear: integer("km_per_year").notNull(),
  campaignType: text("campaign_type", { enum: ["Privat", "Næring"] }).notNull(),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
  validFrom: integer("valid_from", { mode: "timestamp" }).notNull(),
  validTo: integer("valid_to", { mode: "timestamp" }).notNull(),
  sourceUrl: text("source_url"),
  image: text("image").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey(),
  campaignId: integer("campaign_id")
    .notNull()
    .references(() => campaigns.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const campaignRelations = relations(campaigns, ({ many }) => ({
  leads: many(leads),
}));

export const leadRelations = relations(leads, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [leads.campaignId],
    references: [campaigns.id],
  }),
}));
```

### 2. API Layer
We will create two new tRPC routers:
- `packages/api/src/routers/campaigns.ts`:
  - `list()`: A public procedure to query all `verified` campaigns.
  - `getById({ id: number })`: A public procedure to query a single campaign by its ID.
- `packages/api/src/routers/leads.ts`:
  - `create({ campaignId, name, email, phone })`: A public procedure to create a new lead, validating the input.

These routers will be merged into the main `appRouter`.

### 3. Frontend UI & Routing
- **Routing:** We will use TanStack Router's file-based routing.
  - `apps/web/src/routes/index.tsx` will be modified to use the `campaigns.list` procedure and render the campaign grid.
  - A new route, `apps/web/src/routes/campaigns.$id.tsx`, will be created for the detail page. It will use the URL parameter to call the `campaigns.getById` procedure.
- **Components:** We will leverage the existing `shadcn/ui` component library (e.g., `Card`, `Button`, `Input`) to build the UI, ensuring a consistent look and feel.

### 4. Data Seeding
A new script, `packages/db/src/seed.ts`, will be created. It will use a data generator to create a realistic set of 10-15 sample campaigns. This script will be executable via `bun run`.

*(Note: The `epic.md` specifies a Norwegian (`nb_NO`) locale for Faker. The available tool uses English, so the seed data will be in English for this initial implementation.)*