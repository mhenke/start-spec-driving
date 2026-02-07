# Design: Database schema, migrations, and seeding

## Overview

This design specifies the Drizzle/SQL schema, migration strategy, and seeding approach needed to implement the Campaign ↔ Lead data model described in the Epic and Upwork post. Goal: enforce referential integrity (Lead -> Campaign), positive numeric validation, and provide realistic Norwegian (nb_NO) seed data for development and testing.

## Schema (Drizzle / SQL)

Tables:

1. campaigns

- id: INTEGER PRIMARY KEY AUTOINCREMENT
- title: TEXT NOT NULL
- brand: TEXT NOT NULL
- model: TEXT NOT NULL
- monthly_price: INTEGER NOT NULL CHECK (monthly_price >= 0)
- downpayment: INTEGER NOT NULL CHECK (downpayment >= 0)
- duration_months: INTEGER NOT NULL CHECK (duration_months > 0)
- km_per_year: INTEGER NOT NULL CHECK (km_per_year >= 0)
- campaign_type: TEXT NOT NULL -- enum: 'Privat' | 'Næring'
- verified: BOOLEAN NOT NULL DEFAULT FALSE
- valid_from: DATE NOT NULL
- valid_to: DATE NOT NULL
- source_url: TEXT NULL
- image: TEXT NOT NULL
- created_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

Indexes:

- idx_campaigns_verified (verified)
- idx_campaigns_validity (valid_from, valid_to)

2. leads

- id: INTEGER PRIMARY KEY AUTOINCREMENT
- campaign_id: INTEGER NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE
- name: TEXT NOT NULL
- email: TEXT NOT NULL
- phone: TEXT NOT NULL
- created_at: TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

Indexes:

- idx_leads_campaign_id (campaign_id)
- idx_leads_created_at (created_at DESC)

Constraints / Validation:

- Enforce FK with ON DELETE CASCADE so deleting a campaign removes its leads.
- Use CHECK constraints for numeric positivity where supported by the DB (SQLite supports CHECK).
- Application-level enum enforcement for campaign_type (validate values 'Privat' or 'Næring').

## Drizzle artifacts (file layout)

- libs/db/schema/campaigns.ts — Drizzle table definition for campaigns
- libs/db/schema/leads.ts — Drizzle table definition for leads
- drizzle/migrations/0001_create_campaigns_and_leads.sql — migration to create tables+indexes
- scripts/db/migrate.sh — wrapper to run drizzle migrations (dev)

## Migration plan

- Migration 0001 creates both tables in a single transaction if DB supports it.
- Migration must create indexes after tables.
- Provide rollback SQL file or rely on drizzle's migration system for down migrations where supported.
- Test migrations against a fresh SQLite DB in CI.

## Seeding

- Purpose: provide ~20 realistic campaigns and ~1-5 leads per campaign for dev/testing.
- Use Faker (nb_NO) for Norwegian locale.
- Seed script: scripts/db/seed.ts (Node/TS) using Drizzle or raw SQL inserts.
- Seed steps:
  1. Start transaction
  2. Insert campaigns with randomized but realistic fields (brand, model, monthly_price range, valid_from/valid_to)
  3. Insert leads linked to created campaign IDs
  4. Commit
- Default seed counts: 20 campaigns, 0-5 leads per campaign (configurable via env var SEED_COUNTS)
- CLI runner: node ./scripts/db/seed.ts --count 20

Faker fields to use:

- company/vehicle combinations for brand/model
- nb_NO phone and person names
- realistic price ranges and durations

Seeding considerations:

- Do not run seeds in production by default; use an env flag ALLOW_SEED=true for non-prod use only.
- Idempotency: seed runner can either wipe DB (dev only) or detect duplicates by checking a seed marker table.

## Tests & Verification

Sanity tests to add (unit/integration):

- Attempt to insert a lead with non-existent campaign_id -> expect FK violation (or application-level rejection).
- Numeric fields negative values -> expect DB CHECK violation or app validation error.
- Deleting a campaign cascades and removes leads.
- Seed script populates at least N campaigns and associates leads correctly.

## Operational / Deployment Notes

- Migrations must run during deployment before app start. Document commands in README.
- Production databases should not be auto-seeded; provide a manual admin workflow for data import.
- Include migration run in CI for schema validation (dry-run against SQLite or test DB).

## Files to create

- openspec/changes/implement-database-design-and-seed/design.md (this file)
- libs/db/schema/campaigns.ts
- libs/db/schema/leads.ts
- drizzle/migrations/0001_create_campaigns_and_leads.sql
- scripts/db/migrate.sh
- scripts/db/seed.ts
- tests/db/schema.test.ts

## Implementation tasks (high-level)

1. Add Drizzle table definitions for Campaign and Lead.
2. Add migration SQL file and verify with local sqlite DB.
3. Implement seed script using Faker (nb_NO).
4. Add sanity tests for referential integrity and validations.
5. Document migration and seed commands in README.

## Open questions / assumptions

- Assumes SQLite for dev as specified in Epic; if using other DB in prod, migration SQL may need adjustments.
- campaign_type will be validated at application layer and stored as TEXT in DB for simplicity.
