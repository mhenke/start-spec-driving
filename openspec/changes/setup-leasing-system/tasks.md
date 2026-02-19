## 1. Database & Seeding

- [x] 1.1 Implement `campaigns` table in `packages/db/src/schema/index.ts` with all technical specs
- [x] 1.2 Implement `leads` table with `campaign_id` foreign key and CASCADE DELETE
- [x] 1.3 Utilize Faker MCP for data generation (replacing @faker-js/faker dependency)
- [x] 1.4 Create `packages/db/src/seed.ts` script using data from Faker MCP (20 campaigns for popular brands)
- [x] 1.5 Run `bun run db:push` to apply schema changes
- [x] 1.6 Run seed script and verify data in SQLite
- [x] 1.7 Create `docs/deployment.md` and `.env.example` for environment configuration

## 2. API Layer (tRPC)

- [x] 2.1 Create `campaignsRouter` in `packages/api/src/routers/campaigns.ts` with `getVerified` query
- [x] 2.2 Create `leadsRouter` in `packages/api/src/routers/leads.ts` with `submit` mutation
- [x] 2.3 Integrate new routers into the main `appRouter` in `packages/api/src/routers/index.ts`
- [x] 2.4 Add Zod validation for lead submission (name, email, phone)

## 3. Public Grid (Home Page)

- [x] 3.1 Implement `CampaignCard` component in `apps/web/src/components/campaign-card.tsx`
- [x] 3.2 Add Norwegian currency formatting utility using `Intl.NumberFormat`
- [x] 3.3 Update `apps/web/src/routes/index.tsx` to fetch and display verified campaigns
- [x] 3.4 Ensure grid is responsive and matches "Norwegian UI" requirements

## 4. Detail Page & Lead Form

- [x] 4.1 Create new route file `apps/web/src/routes/campaign/$id.tsx`
- [x] 4.2 Implement technical specs display and "Se original annonse" source link button
- [x] 4.3 Build `LeadForm` component with validation and tRPC mutation
- [x] 4.4 Show Norwegian confirmation/error messages upon lead submission (localized for phone/email)

## 5. Polish & Verification

- [x] 5.1 Verify all UI labels are in Norwegian (månedspris, startleie, etc.)
- [x] 5.2 Test cascading delete by removing a campaign and checking associated leads
- [x] 5.3 Run `bun run check-types` across the monorepo
- [x] 5.4 Perform manual "Norwegian Fluency" check on all pages
- [x] 5.5 Verify all internal routing and external "Se original annonse" links work correctly; fix any routing issues
- [x] 5.6 Use Playwright MCP to automate browser verification: validate campaign grid rendering and detail page technical specs display
