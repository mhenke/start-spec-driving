# campaign-details Specification

## Purpose
TBD - created by archiving change campaign-detail-page. Update Purpose after archive.
## Requirements
### Requirement: Campaign Detail View
The system MUST provide a comprehensive view of all metadata for a specific campaign.

#### Scenario: Authorized Access Only
- **WHEN** a user navigates to `/campaign/$id`
- **AND** the campaign is NOT `verified`
- **THEN** the system MUST return a 404 (Not Found) or redirect to the home page

#### Scenario: Metadata Display
- **WHEN** a verified campaign is rendered
- **THEN** it MUST display:
    - Title, Brand, Model
    - All pricing details (Monthly price, Downpayment)
    - Technical specs (Duration, KM/Year)
    - Validity period and Source URL
- **AND** values MUST be formatted for the Norwegian locale (e.g., "15 000 km / år")

#### Scenario: Back Navigation
- **WHEN** viewing a campaign detail page
- **THEN** a clear "Tilbake til oversikt" link MUST be visible to return to the home page

### Requirement: Data Integrity
The detail view MUST always reflect the latest state from the database.

#### Scenario: Real-time Consistency
- **WHEN** a campaign's monthly price is updated in the database
- **THEN** the next reload of the detail page MUST show the new price

