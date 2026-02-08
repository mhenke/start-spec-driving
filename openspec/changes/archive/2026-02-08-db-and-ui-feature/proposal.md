
# Proposal: Database Schema and UI for Campaigns

## Why

We need to implement the core "Campaign" and "Lead" entities to satisfy the project requirements defined in `epic.md`. This foundational work will enable the application to display car leasing offers and collect user interest, which is the primary purpose of the system.

## What Changes

- **Database**: Implement `Campaign` and `Lead` tables in SQLite using Drizzle ORM, strictly following the schema in `epic.md`.
- **Seeding**: Create a seed script using `Faker` (locale `nb_NO`) to populate realistic Norwegian campaign data.
- **API**: Create `campaign` and `lead` TRPC routers to expose necessary CRUD and retrieval operations.
- **UI**:
    - **Public Grid**: A responsive grid displaying active, verified campaigns.
    - **Detail Page**: A dedicated page for each campaign with a lead capture form.

## Capabilities

### New Capabilities
- `campaign-management`: Database storage and retrieval of campaign details.
- `lead-capture`: Secure storage of user interest linked to specific campaigns.
- `public-viewing`: User interface for browsing and viewing campaign details in Norwegian.

## Impact

- `packages/db/src/schema/campaign.ts`: [NEW] Schema definition for Campaigns.
- `packages/db/src/schema/lead.ts`: [NEW] Schema definition for Leads with foreign key constraints.
- `packages/db/src/seed.ts`: [NEW] Seeding logic.
- `packages/api/src/routers/campaign.ts`: [NEW] API for fetching campaigns.
- `packages/api/src/routers/lead.ts`: [NEW] API for submitting leads.
- `apps/web/src/routes/campaigns/index.tsx`: [NEW] Public listing page.
- `apps/web/src/routes/campaigns/$campaignId.tsx`: [NEW] Detail and form page.

## Compliance
- **Schema Alignment**: Fields (`monthly_price`, `downpayment`, `km_per_year`, etc.) match `epic.md`.
- **Localization**: UI and data seeding will be in Norwegian (`nb_NO`).
- **Constraints**: `Lead` requires a valid `Campaign` (Foreign Key enforcement).
