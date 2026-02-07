## Why

The project needs a correct, production-ready database schema and reliable seed data so Campaigns and Leads are modeled correctly and the system can be developed, tested, and demoed with realistic Norwegian data. Implementing schema, migrations, and seeds now reduces costly data inconsistencies later and enables other engineering work (APIs, admin UI, migrations) to proceed safely.

## What Changes

- Add Drizzle ORM schema definitions for Campaign and Lead reflecting the Epic's data model.
- Create SQL migration files (drizzle) to create campaigns and leads tables with proper types, constraints, indexes and a foreign key with ON DELETE CASCADE.
- Add seeding scripts using Faker (nb_NO) to populate realistic initial data for campaigns and leads.
- Provide a simple seed runner script and README section for running migrations and seeds in dev/test environments.
- Add tests (sanity) that assert leads cannot exist without a campaign and numeric fields validate as positive integers.
- (Non-breaking) Integrate seeds with existing development workflow and CI where appropriate.

## Capabilities

### New Capabilities

- `campaign-data-model`: Defines the Campaign table/Drizzle schema, types, constraints, and migrations. Covers fields: id, title, brand, model, monthly_price, downpayment, duration_months, km_per_year, campaign_type, verified, valid_from, valid_to, created_at, updated_at, source_url, image.
- `lead-data-model`: Defines the Lead table/Drizzle schema, types, constraints, and migrations. Covers fields: id, campaign_id (FK), name, email, phone, created_at and enforces referential integrity (cascade delete semantics).
- `db-seeding`: Seeding scripts and Faker-based data generators (nb_NO) to create realistic campaigns and associated leads for development and testing. Includes a seed runner and documentation.

### Modified Capabilities

- (none) — this change introduces new data-level capabilities and does not alter existing spec-level requirements.

## Impact

- Code: new Drizzle schema files, migration SQL files under /drizzle/migrations, seed scripts (tools/seeds or scripts/seeds), and small test helpers.
- APIs/Services: backend data-access layers and any existing API endpoints that consume Campaign or Lead fields may need to reference new column names or types; migrations are additive and self-contained.
- Dependencies: adds Faker (nb_NO) for seeding and ensures Drizzle migration tooling is documented in README.
- Systems: local/dev DB and CI pipelines should run migrations and optionally seeds; production deployment must run migrations but should not auto-seed.

## Success Criteria

- Drizzle migrations create campaigns and leads tables with correct constraints and FK cascade behavior.
- Seed runner populates at least 20 realistic campaigns and associated leads in dev environment (nb_NO locale).
- Tests verify leads cannot exist without a campaign and numeric fields are positive integers.
