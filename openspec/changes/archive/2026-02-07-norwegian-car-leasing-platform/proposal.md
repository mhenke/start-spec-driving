## Why

Build a production-ready Norwegian car leasing campaign and lead management system based on the Upwork project requirements. The system needs to handle campaign listings, lead collection with strict campaign associations, and database seeding with Norwegian data.

## What Changes

- Create Campaign and Lead data models with proper foreign key relationships
- Implement public campaign grid with filtering for verified campaigns
- Build campaign detail pages with lead submission forms
- Set up database schema with SQLite and Drizzle ORM
- Implement Norwegian localization throughout the UI
- Seed database with realistic Norwegian car leasing data using Faker

## Capabilities

### New Capabilities
- `campaign-management`: Manage car leasing campaigns with full CRUD operations
- `lead-collection`: Collect leads tied to specific campaigns with validation
- `public-display`: Display verified campaigns in a responsive grid
- `data-seeding`: Populate database with Norwegian car leasing data using Faker

### Modified Capabilities
<!-- If modifying existing behavior -->

## Impact

- `drizzle/schema.ts`: Add Campaign and Lead table definitions
- `apps/web/src/routes/`: Create campaign grid and detail routes
- `apps/web/src/components/`: Add campaign cards, lead forms
- `src/server/trpc/routers/`: Create campaign and lead API endpoints
- `drizzle/seed.ts`: Add Norwegian data seeding script