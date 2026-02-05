## Why
As outlined in the core requirements for the Car Leasing App, we need a public listing page to showcase active, verified leasing campaigns to users. This is the primary entry point for the application's users and must feel production-ready.

## What Changes
- **UI Components**:
  - Implement `CampaignCard` to display brand, model, monthly price, and type.
  - Implement `CampaignList` grid with responsive layout.
  - Add **Loading Skeletons** for data fetching states.
  - Add an **Empty State** message in Norwegian ("Ingen kampanjer tilgjengelig").
- **Backend/Logic**:
  - Update API queries to filter for `verified: true` campaigns only.
  - Implement Norwegian formatting for currency (NOK) and numbers.
  - Map `campaign_type` values (`private`/`business`) to Norwegian labels (**"Privat"** / **"Næring"**).
- **Navigation**:
  - Implement the `/campaign/$id` route for campaign details.
  - Link "View details" buttons to the specific campaign route.
- **Resilience**:
  - Add a fallback strategy/placeholder for missing campaign images.

## Capabilities

### New Capabilities
- `campaign-display`: Visual representation of leasing campaigns with brand, model, price, and type.
- `campaign-discovery`: An index page allowing users to browse all active campaigns.
- `norwegian-localization`: Foundation for UI string mapping and formatting.

## Impact
- `apps/web/src/components/campaign-card.tsx`: [NEW] Detailed card component.
- `apps/web/src/components/campaign-list-skeleton.tsx`: [NEW] Loading UI.
- `apps/web/src/routes/index.tsx`: [MODIFY] The primary listing view.
- `apps/web/src/routes/campaign.$id.tsx`: [NEW] The detail page route.
- `packages/api/src/routers/campaign.ts`: [MODIFY] Ensure only verified campaigns are returned.
- `apps/web/src/utils/formatters.ts`: [NEW] Norwegian currency/type mapping utilities.
