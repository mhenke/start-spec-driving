# Tasks

# 1. API & Backend
- [x] 1.1 Implement `campaign.get` tRPC procedure with `verified` check.
- [x] 1.2 Implement `lead.create` tRPC procedure with Zod validation (Norwegian phone/email).
- [x] 1.3 Create a database seeding script using Faker for realistic test data.

# 2. UI Components
- [x] 2.1 Create `LeadForm` component with validation and success states.
- [x] 2.2 Create `DetailTable` component for campaign specifications.
- [x] 2.3 Create `CampaignHero` for the detail page top section.

# 3. Routing & Integration
- [x] 3.1 Implement the full `/campaign/$id` page layout and data fetching.
- [x] 3.2 Add "Tilbake til oversikt" navigation.
- [x] 3.3 Add success toast notification for lead submission.

# 4. Verification
- [x] 4.1 Run `openspec validate campaign-detail-page`.
- [x] 4.2 Verify 404/redirect for unverified campaigns.
- [x] 4.3 Manually test lead submission and relational linkage in DB.
