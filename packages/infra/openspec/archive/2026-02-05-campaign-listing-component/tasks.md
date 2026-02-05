# 1. UI Infrastructure
- [x] 1.1 Create `apps/web/src/utils/formatters.ts` with Norwegian localization helpers.
- [x] 1.2 Create `apps/web/src/components/campaign-list-skeleton.tsx` (6-item grid).
- [x] 1.3 Implement a generic `ErrorDisplay` or Alert component for API failures.

# 2. Campaign Components
- [x] 2.1 Create `apps/web/src/components/campaign-card.tsx` with `<article>`, localized display, and image fallback.
- [x] 2.2 Implement the `/campaign/$id` route placeholder in `apps/web/src/routes/campaign.$id.tsx`.

# 3. Integration & API
- [x] 3.1 Update the campaigns API router to enforce `verified: true` filtering and `createdAt DESC` sorting.
- [x] 3.2 Update `apps/web/src/routes/index.tsx` to handle Loading, Error, and Empty states correctly.

# 4. Verification
- [x] 4.1 Run `openspec validate campaign-listing-component`.
- [x] 4.2 Verify responsive layout and Norwegian formatting manually.
