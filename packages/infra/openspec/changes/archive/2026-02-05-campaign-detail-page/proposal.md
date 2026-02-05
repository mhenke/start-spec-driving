## Why

To convert browsing interest into actionable business leads, users need a detailed view of specific leasing campaigns and a simple way to express interest. This change implements the "bottom of the funnel" experience: full campaign transparency and automated lead collection.

## What Changes

- **Campaign Detail Page**: A dedicated `/campaign/$id` route that presents all stored metadata for a campaign in a clear, production-quality layout. Includes a "Tilbake til oversikt" navigation link.
- **Lead Capture System**: A conversion-focused form on the detail page that collects user contact info (name, email, phone) and creates a `Lead` record.
- **Robustness & Validation**:
    - **Verified Enforcement**: Ensure the detail page is only accessible for `verified: true` campaigns.
    - **Norwegian Validation**: Strict validation for Norwegian phone numbers (8 digits) and email formats.
    - **Duplicate Prevention**: Logic to handle/prevent immediate duplicate lead submissions from the same user.
- **Seed Data**: Use Faker (MCP) to generate realistic Norwegian campaign and lead data for development and testing.

## Capabilities

### New Capabilities
- `campaign-details`: Comprehensive display of campaign specifications with Norwegian formatting (e.g., "15 000 km / år"), image fallback, and navigation back to index.
- `lead-capture`: Integrated form with validation, success toast/message, and relational persistence.
- `seed-data`: Automated generation of realistic dataset for local development.

### Modified Capabilities
- *None*

## Impact

- **UI**: New route and components in `apps/web`.
- **API**: New tRPC procedures in `packages/api` for fetching single campaigns and creating leads.
- **Database**: Utilization of the existing `Lead` table and its foreign key relationship to `Campaign`.
