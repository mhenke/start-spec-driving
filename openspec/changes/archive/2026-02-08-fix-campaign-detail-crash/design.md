# Design: Fix Campaign Detail Crash

## Decisions

### Decision 1: API Null Handling
Instead of returning `undefined` (which occurs implicitly when `result[0]` is accessed on an empty array), we will explicitly return `null`. This prevents `useSuspenseQuery` from throwing an error because it interprets `undefined` as a query that hasn't successfully resolved data.

### Decision 2: UI Not Found Rendering
The component already has a check `if (!campaign)`. By ensuring the query resolves to `null`, this check will now be reached and render the "Kampanje ikke funnet" message properly.
