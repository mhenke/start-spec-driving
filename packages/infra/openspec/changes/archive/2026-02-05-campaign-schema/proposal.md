# Why
We need a foundational data model to store car leasing campaigns and the user leads linked to them. This schema is the core of the leasing application described in the Upwork project.

# What Changes
- Add `Campaign` table to store vehicle and pricing details.
- Add `Lead` table to collect user contact info linked to a campaign.
- Define foreign key relationship: Lead -> Campaign.

# Capabilities

## New Capabilities
- `campaign-registry`: Store and manage leasing campaign data.
- `lead-collection`: Link user interest to specific campaigns.

# Impact
- `packages/db/src/schema/campaigns.ts`: New file containing table definitions.
- `packages/db/src/schema/index.ts`: Updated to export new tables.
