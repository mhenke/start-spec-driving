# Proposal: Fix Campaign Detail Crash

## Goal
Resolve the 500 error / crash on the Campaign Detail page that occurs when a campaign is not found.

## Problem
The `campaign.byId` tRPC procedure returns `undefined` when a result is not found. The frontend uses `useSuspenseQuery`, which expects the query to resolve to a non-undefined value. When `undefined` is returned, the component crashes with "data is undefined" before the "Not Found" UI can be rendered.

## Proposed Solution
1. Update the API to return `null` instead of `undefined` for non-existent IDs.
2. Ensure the UI handles the `null` state gracefully (it currently has a check, but it's bypassed by the suspense crash).
