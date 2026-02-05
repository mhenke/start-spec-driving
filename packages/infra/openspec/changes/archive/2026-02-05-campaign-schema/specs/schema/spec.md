## ADDED Requirements

### Requirement: Campaign Table Schema
The system MUST store car leasing campaigns with specific vehicle and financial attributes.

#### Scenario: Defining Campaign Columns
- **WHEN** the campaign table is defined
- **THEN** it must include:
  - `id`: unique identifier (UUID/Text)
  - `title`: descriptive name
  - `brand` & `model`: vehicle identifiers
  - `monthly_price`: integer (stored in cents)
  - `downpayment`: integer (stored in cents)
  - `duration_months`: integer
  - `km_per_year`: integer
  - `campaign_type`: "Private" or "Business" (Stored as ASCII, displayed as "Privat" or "Næring" in UI)
  - `verified`: boolean status
  - `valid_from` & `valid_to`: date ranges
  - `source_url`: link to origin
  - `image`: URL or reference to the vehicle image
  - `createdAt` & `updatedAt`: timestamps

### Requirement: Lead Table Schema
The system MUST collect user interest (leads) linked to specific campaigns.

#### Scenario: Defining Lead Columns
- **WHEN** the lead table is defined
- **THEN** it must include:
  - `id`: unique identifier
  - `name`: user's full name
  - `email`: contact email
  - `phone`: contact phone number
  - `campaign_id`: MUST reference a valid ID in the Campaign table
  - `createdAt`: timestamp of submission

#### Scenario: Foreign Key Constraint
- **WHEN** a lead is created
- **THEN** the `campaign_id` must reference an existing campaign
- **AND** deleting a campaign should automatically delete its linked leads (CASCADE) to avoid orphaned data.
