
# Design: Database & UI Feature

## Context
We are implementing the core entities (`Campaign`, `Lead`) and their public-facing UI. The system uses SQLite + Drizzle for data and tRPC + TanStack Start for the app.

## Goals
- **Strict Data Integrity**: Enforce foreign keys and cascade deletion at the database level.
- **Type Safety**: Share Zod schemas between API and UI forms.
- **Localization**: Centralize formatting logic for currency and dates.

## Decisions

### Decision 1: Database Schema (Drizzle)
We will use standard SQLite tables with strict types matching `epic.md`.

- **Campaign Table**:
    - `id`: Integer Primary Key (auto-increment)
    - `title`: String (Required)
    - `brand`: String (Required)
    - `model`: String (Required)
    - `monthly_price`: Integer (Positive, NOK)
    - `downpayment`: Integer (Positive, NOK)
    - `duration_months`: Integer (e.g., 36)
    - `km_per_year`: Integer (e.g., 15000)
    - `campaign_type`: String Enum ('Privat', 'Næring')
    - `verified`: Boolean (default false)
    - `valid_from`, `valid_to`: Integers (Timestamps) or Dates
    - `image`: String (URL)
    - `source_url`: String (Optional)
    - `created_at`, `updated_at`: Timestamps

- **Lead Table**:
    - `id`: Integer Primary Key
    - `campaign_id`: Integer (Foreign Key -> Campaign.id, ON DELETE CASCADE)
    - `name`: String
    - `email`: String
    - `phone`: String
    - `created_at`: Timestamp

- **Migration**: We will generate a new migration file via `drizzle-kit` to apply these schemas.

### Decision 2: API Structure (tRPC)
We will split logic into two routers:
- `campaign.ts`:
    - `list`: Public visibility logic (`verified = true`).
    - `byId`: Select single item.
- `lead.ts`:
    - `create`: Zod validation for email/phone.

### Decision 3: Seed Data
We will use `@faker-js/faker` with `nb_NO` locale to generate 5-10 realistic campaigns (e.g., "Tesla Model Y", "Audi e-tron") to ensure the UI looks good immediately.

### Decision 4: UI Components
- **Routes**:
    - `/campaigns` (Layout: Grid)
    - `/campaigns/$campaignId` (Layout: Detail + Form side-by-side)
- **Formatting**: Create a `formatNOK(amount: number)` helper to standardise price display.
