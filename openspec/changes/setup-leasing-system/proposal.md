## Why

This change establishes the core infrastructure for the Norwegian car leasing and lead management system. It provides the foundation for displaying vehicle campaigns and capturing user interest, which is essential for launching the product's MVP.

## What Changes

- **Database Schema**: Implementation of `campaigns` and `leads` tables with a strict 1:1 relationship and CASCADE DELETE.
- **Data Seeding**: Automated seeding script using `faker-js` with `nb_NO` locale to populate the system with realistic Norwegian car leasing data.
- **API Layer**: tRPC routers for querying verified campaigns and submitting lead data.
- **Public Campaign Grid**: A responsive home page displaying active leasing deals with Norwegian formatting (NOK, kr).
- **Campaign Detail Page**: A dedicated page for each vehicle providing full technical specifications and a lead collection form.

## Capabilities

### New Capabilities
- `campaign-management`: Core database operations and API for managing car leasing campaigns.
- `lead-capture`: Capability to collect, validate, and store prospect information linked to specific campaigns.
- `public-catalog`: Public-facing UI for browsing campaigns and viewing technical details in Norwegian.

### Modified Capabilities
- (None)

## Impact

- `packages/db`: New schema definitions in `src/schema/index.ts` and a new seeding script.
- `packages/api`: New routers in `src/routers/` to handle campaign and lead business logic.
- `apps/web`: New routes at `/` and `/campaign/$id`, plus new components for the grid and technical specification displays.
- **Dependencies**: Addition of `@faker-js/faker` to the workspace.
