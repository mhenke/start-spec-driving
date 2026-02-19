## Context

The project is currently a scaffold with an empty database schema and basic tRPC health checks. We need to implement the core domain models for "Campaign" and "Lead" to enable the primary business flow: displaying leasing deals and capturing prospect interest.

## Goals / Non-Goals

**Goals:**
- Implement a type-safe database schema using Drizzle ORM.
- Provide a robust seeding mechanism using `faker-js` with `nb_NO` locale.
- Create a type-safe API for fetching campaigns and submitting leads.
- Build a responsive, Norwegian-localized frontend for the public catalog and detail pages.

**Non-Goals:**
- Authorization and user authentication.
- Administration pages or Campaign CRUD UI.
- External image hosting (will use Unsplash/placeholder URLs initially).

## Decisions

### 1. Database Schema (Drizzle)
We will use SQLite (libSQL) via Drizzle. 
- **Campaigns**: Will store all technical specifications (brand, model, price, etc.).
- **Leads**: Will include a `campaign_id` foreign key with `onDelete: 'cascade'`.
- **Rationale**: CASCADE DELETE ensures data integrity, as a lead is meaningless without its associated campaign.

### 2. tRPC Router Organization
- Split logic into `campaignsRouter` and `leadsRouter`.
- **Rationale**: Keeps the codebase modular and scalable as more features are added.

### 3. Frontend Routing (TanStack Router)
- `index.tsx`: Public grid view.
- `campaign/$id.tsx`: Detail view with lead form.
- **Rationale**: Follows TanStack Router conventions for file-based routing and dynamic parameters.

### 4. Localization (Norwegian)
- Use `Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' })` for price formatting.
- All UI strings will be hardcoded in Norwegian in the components (e.g., "Månedspris", "Søk nå").
- **Rationale**: Simple and direct approach for a Norwegian-first MVP.

### 5. Data Seeding
- Use `@faker-js/faker` with the `nb_NO` locale to generate 20 campaigns.
- Target brands: Tesla, Volvo, Volkswagen, Toyota, BMW, Audi, Hyundai, Skoda.
- Use Unsplash car-related keywords (e.g., "tesla model 3", "volvo suv") for image placeholders.
- **Rationale**: Provides high-quality test data that matches the production domain and provides a visually complete grid for the MVP.

### 6. Infrastructure & Error Handling
- Use a global error message "Noe gikk galt. Vennligst prøv igjen senere." for system failures.
- Document deployment requirements in `docs/deployment.md`.
- **Rationale**: Standardizes user feedback and ensures environmental setup is reproducible for Turso/SQLite.

## Risks / Trade-offs

- **[Risk]** Data model changes late in development → **[Mitigation]** Use Drizzle migrations (`db:generate`, `db:push`) to handle schema evolution safely.
- **[Risk]** Complex TanStack Start SSR state → **[Mitigation]** Stick to simple `useQuery` patterns with `trpc` as established in the current `index.tsx`.
