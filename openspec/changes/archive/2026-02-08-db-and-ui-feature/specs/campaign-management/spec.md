
# Specification: Campaign Management & Lead Capture

## ADDED Requirements

### Requirement: Campaign Integrity
The system must ensure that campaigns define the core offer structure for the leasing platform.

#### Scenario: Creating a valid campaign
- **WHEN** a campaign is created with all required fields:
    - `title`, `brand`, `model`
    - `monthly_price`, `downpayment` (Integers)
    - `duration_months`, `km_per_year`
    - `campaign_type` (Enum: 'Privat' | 'Næring')
- **THEN** it is persisted to the database
- **AND** `created_at` and `updated_at` timestamps are set automatically
- **AND** `verified` defaults to `false` if not specified

#### Scenario: Public Visibility
- **WHEN** the public grid is queried
- **THEN** only campaigns with `verified: true` are returned
- **AND** they are sorted by `created_at` descending (default)

### Requirement: Lead Association
Leads must always be strictly tied to a specific campaign to ensure sales attribution.

#### Scenario: Capturing a lead
- **WHEN** a user submits valid contact details (`name`, `email`, `phone`) for a specific `campaign_id`
- **THEN** a new Lead record is created
- **AND** it is linked to that Campaign ID via foreign key
- **AND** the creation timestamp is recorded

### Requirement: Cascade Deletion
To maintain data hygiene, leads should not exist without their parent campaign.

#### Scenario: Deleting a campaign
- **WHEN** a Campaign is deleted
- **THEN** all associated Leads are automatically deleted (Cascade)
- **AND** the operation completes atomically

### Requirement: Localization
The system is built for the Norwegian market.

#### Scenario: Data Formatting
- **WHEN** monetary values are displayed (`monthly_price`, `downpayment`)
- **THEN** they are formatted as NOK (e.g., "5 990,-")
- **AND** dates use Norwegian locale formatting (`dd.mm.yyyy`)
