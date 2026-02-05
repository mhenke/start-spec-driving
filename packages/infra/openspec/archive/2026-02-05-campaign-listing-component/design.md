# Context
We are building the public-facing campaign listing. We need a performant, localized, and responsive UI.

# Goals / Non-Goals

**Goals:**
- Implement a reusable `CampaignCard`.
- Ensure strict "verified" filtering on the API.
- Provide a smooth loading experience with Skeletons.

**Non-Goals:**
- Full implementation of the Detail Page (just the route placeholder).
- Server-side rendering optimizations (handled by TanStack Start default).

# Decisions

## Decision 1: UI Framework & Components
We will use `@shadcn/ui` components (Card, Button, Skeleton) to maintain consistency with the existing design system.

## Decision 2: Localization & Accessibility
- **Formatting**: We will use a utility `formatters.ts` in `apps/web/src/utils/` using `Intl.NumberFormat` with `nb-NO` locale. Suffix will be manually appended as per spec ("kr / mnd").
- **A11y**: Cards will use `<article>` and buttons will use `aria-label` to ensure production-quality accessibility.

## Decision 3: Image Resilience
For the `image` field, we will use a basic `img` tag with an `onError` handler that sets a default placeholder (e.g., a generic car illustration) to prevent "broken image" icons in production.

## Decision 4: API Filter & Error Handling
- **Filtering**: The tRPC router MUST include `.where(eq(campaign.verified, true)).orderBy(desc(campaign.createdAt))`.
- **Resilience**: The UI will use TanStack Query's `error` state to render a localized error alert with a retry mechanism.
