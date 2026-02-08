
# Implementation Tasks

## 1. Database & Seeding
- [x] 1.1 Create `Campaign` schema in `packages/db/src/schema/campaign.ts` (Strict types from Epic) <!-- id: 1.1 -->
- [x] 1.2 Create `Lead` schema in `packages/db/src/schema/lead.ts` (FK constraint) <!-- id: 1.2 -->
- [x] 1.3 Export new schemas in `packages/db/src/schema/index.ts` <!-- id: 1.3 -->
- [x] 1.4 Generate migration (`bun run db:generate`) <!-- id: 1.4 -->
- [x] 1.5 Create seed script `packages/db/src/seed.ts` (Faker `nb_NO` locale) <!-- id: 1.5 -->
- [x] 1.6 Run seed script to populate DB <!-- id: 1.6 -->

## 2. API & Validation
- [x] 2.1 Define Zod validation schemas for `Lead` input (shared/inferred) <!-- id: 2.1 -->
- [x] 2.2 Create `campaign` router (List verified, Get by ID) <!-- id: 2.2 -->
- [x] 2.3 Create `lead` router (Create with validation) <!-- id: 2.3 -->
- [x] 2.4 Register new routers in `appRouter` <!-- id: 2.4 -->

## 3. UI Implementation
- [x] 3.1 Create `formatNOK` helper in `apps/web/src/utils/format.ts` <!-- id: 3.1 -->
- [x] 3.2 Create `CampaignCard` component (Image, Title, Price) <!-- id: 3.2 -->
- [x] 3.3 Create `LeadForm` component (Zod validation, Error states) <!-- id: 3.3 -->
- [x] 3.4 Implement Campaign Grid page `apps/web/src/routes/campaigns/index.tsx` <!-- id: 3.4 -->
- [x] 3.5 Implement Campaign Detail page `apps/web/src/routes/campaigns/$campaignId.tsx` <!-- id: 3.5 -->

## 4. Verification
- [x] 4.1 Verify public grid shows only verified campaigns <!-- id: 4.1 -->
- [x] 4.2 Verify detail page loads correct data <!-- id: 4.2 -->
- [x] 4.3 Verify lead submission validation (Client & Server) <!-- id: 4.3 -->
- [x] 4.4 Verify database persistence of new leads <!-- id: 4.4 -->
