## 1. Database
- [x] 1.1: Define the `campaigns` and `leads` tables in `packages/db/src/schema/index.ts`.
- [x] 1.2: Run `bun run db:push` to apply the new schema.

## 2. Data Seeding
- [x] 2.1: Create a seeding script at `packages/db/src/seed.ts`.
- [x] 2.2: Use a data generator to create and insert 10 sample campaigns.
- [x] 2.3: Add a `db:seed` script to `package.json`.
- [x] 2.4: Run the seed script.

## 3. API Layer
- [x] 3.1: Create `packages/api/src/routers/campaigns.ts` with `list` and `getById` procedures.
- [x] 3.2: Create `packages/api/src/routers/leads.ts` with a `create` procedure.
- [x] 3.3: Mount the new routers in the main `appRouter`.

## 4. Frontend Implementation
- [x] 4.1: **List Page:** Rebuild `apps/web/src/routes/index.tsx` to show a grid of campaigns.
- [x] 4.2: **Detail Page:** Create `apps/web/src/routes/campaigns.$id.tsx` to show campaign details.
- [x] 4.3: **Lead Form:** Add the submission form to the detail page and connect it to the API.

## 5. Verification
- [ ] 5.1: Manually test the complete user flow: viewing the list, viewing details, and submitting the form.