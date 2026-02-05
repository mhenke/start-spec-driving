# Context
We are implementing the data layer for a car leasing application. We use Drizzle ORM with PostgreSQL.

# Goals / Non-Goals

**Goals:**
- Define type-safe schema for Campaigns and Leads.
- Ensure referential integrity between Leads and Campaigns.
- Export schema for use in the application.

**Non-Goals:**
- Data migration scripts (handled by drizzle-kit separately).
- Complex search indices (benchmarked to be unnecessary for the first 1000 campaigns).

# Decisions

## Decision 1: Table Location
We will create a new file `packages/db/src/schema/campaigns.ts`. This follows the project pattern of grouping related domain tables (like `auth.ts`).

## Decision 2: ID Strategy
We will use `text` for all primary keys and generate IDs (e.g., CUIDs) on the application side. This maintains consistency with the existing `user` and `session` tables in `auth.ts`.

## Decision 3: Column Types
- For prices, we'll use `integer` to store values in cents.
- For dates, we'll use `timestamp` with `mode: 'date'`.
- For the `campaign_type`, we'll use a `pgEnum` named `campaign_type`. Values: `'private'`, `'business'`.

## Decision 4: Relationships
We will use Drizzle's `relations` API. The `Lead` table will have a foreign key to `Campaign` with `onDelete: "cascade"` to ensure that when a campaign is removed (e.g., end of validity), its leads are cleaned up or moved to a separate archive if required later (out of scope for now).
