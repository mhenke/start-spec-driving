## ADDED Requirements

### Requirement: Campaign Data Model

The system SHALL store car leasing campaign data with the following fields:
- `id`: Primary key, auto-incrementing integer
- `title`: String, campaign heading (e.g., "Gunstig leasing")
- `brand`: String, car make (e.g., Audi, Tesla)
- `model`: String, car model
- `monthly_price`: Integer, monthly cost in NOK (positive integer)
- `downpayment`: Integer, startleie/forskuddsleie (positive integer)
- `duration_months`: Integer, term length (e.g., 36)
- `km_per_year`: Integer, mileage allowance (e.g., 10000)
- `campaign_type`: Enum, either `Privat` or `Næring`
- `verified`: Boolean, UI visibility toggle
- `valid_from`: Date, campaign start date
- `valid_to`: Date, campaign end date
- `created_at`: Timestamp, auto-generated
- `updated_at`: Timestamp, auto-generated
- `source_url`: String, link to external source (optional)
- `image`: String, image URL (publicly accessible)

#### Scenario: Campaign Creation

- **WHEN** a campaign is created
- **THEN** all required fields are validated
- **AND** the campaign is assigned a unique ID
- **AND** timestamps are automatically set

### Requirement: Campaign Foreign Key Constraints

The system SHALL enforce that when a Campaign is deleted, all associated Leads are also deleted (CASCADE DELETE).

#### Scenario: Campaign Deletion

- **WHEN** a campaign is deleted
- **THEN** all leads associated with that campaign are also deleted
- **AND** the operation completes successfully

## MODIFIED Requirements

<!-- Add any requirements that modify existing behavior -->