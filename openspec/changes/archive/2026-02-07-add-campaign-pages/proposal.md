## Why

The application's primary purpose is to showcase car leasing campaigns to potential customers. Currently, the homepage is a placeholder. This change implements the core public-facing feature, allowing users to browse and view campaign details.

## What Changes

*   A new database schema for `Campaigns` and `Leads` SHALL be created.
*   The homepage SHALL be replaced with a grid displaying all verified leasing campaigns.
*   A new dynamic route (`/campaigns/:id`) SHALL be added to show the full details of a selected campaign.
*   A lead capture form SHALL be available on the detail page.
*   The database SHALL be seeded with sample data for development and testing.

## Capabilities

### New Capabilities
- `view-campaign-list`: Users SHALL be able to see a grid of all available and verified leasing campaigns on the homepage.
- `view-campaign-details`: Users SHALL be able to click a campaign to navigate to a dedicated page showing its full specifications.
- `submit-lead-form`: Users SHALL be able to express interest in a campaign by submitting their contact information.

## Impact

- `packages/db/src/schema/index.ts`: Will be populated with `campaigns` and `leads` table definitions.
- `packages/api/src/routers/index.ts`: A new `campaigns` router will be added.
- `apps/web/src/routes/index.tsx`: Will be replaced with the campaign list component.
- `apps/web/src/routes/campaigns.$id.tsx`: This new file will be created for the detail page.
- `packages/db/src/seed.ts`: A new file to seed the database.
