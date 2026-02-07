## 1. Schema & Drizzle Definitions

- [x] 1.1 Create libs/db/schema/campaigns.ts with Drizzle table definition
- [x] 1.2 Create libs/db/schema/leads.ts with Drizzle table definition and FK ON DELETE CASCADE
- [x] 1.3 Add TypeScript types and exports for campaign and lead records

## 2. Migrations

- [x] 2.1 Create drizzle/migrations/0001_create_campaigns_and_leads.sql to create tables and indexes
- [x] 2.2 Add scripts/db/migrate.sh (dev wrapper for running drizzle migrations)
- [x] 2.3 Verify migrations against a fresh SQLite DB (local test)

## 3. Seeding

- [x] 3.1 Implement scripts/db/seed.ts using Faker (nb_NO) to generate campaigns and leads
- [x] 3.2 Add environment safety check (ALLOW_SEED) and configurable counts (SEED_COUNTS)
- [x] 3.3 Make seed runner idempotent or add a seed marker table to avoid duplicates in dev
- [x] 3.4 Add README section with seed runner usage example

## 4. Tests & Verification

- [x] 4.1 Add tests/db/schema.test.ts to assert FK cascade and numeric CHECK constraints
- [x] 4.2 Add tests/db/seed.test.ts that runs seed in a temporary DB and verifies record counts and data shapes

## 5. CI & Docs

- [x] 5.1 Add a CI job (optional) to run migrations and schema tests against SQLite
- [x] 5.2 Document migration & seed commands in README and deployment notes

## 6. Follow-up / Optional

- [x] 6.1 Integrate specialized Faker MCP (nb_NO) for richer realistic data
- [x] 6.2 Add admin UI confirmation flow to match deletion requirement
