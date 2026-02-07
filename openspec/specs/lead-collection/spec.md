# lead-collection Specification

## Purpose
TBD - created by archiving change norwegian-car-leasing-platform. Update Purpose after archive.
## Requirements
### Requirement: Lead Data Model

The system SHALL store lead information tied to specific campaigns with the following fields:
- `id`: Primary key, auto-incrementing integer
- `campaign_id`: Integer, foreign key to Campaign (required)
- `name`: String, prospect full name (required)
- `email`: String, validated contact email (required)
- `phone`: String, contact phone number (required)
- `created_at`: Timestamp, auto-generated

#### Scenario: Lead Creation

- **WHEN** a lead is created through the campaign detail form
- **THEN** the campaign_id is validated as an existing campaign
- **AND** name, email, and phone are validated as required fields
- **AND** the lead is associated with the correct campaign
- **AND** a timestamp is automatically set

### Requirement: Lead Validation

The system SHALL validate all lead form inputs before creating a record.

#### Scenario: Invalid Lead Submission

- **WHEN** a user submits a lead form with invalid data
- **THEN** appropriate error messages are displayed
- **AND** no lead record is created
- **AND** the user can correct the errors and resubmit

### Requirement: Lead-Campaign Association

The system SHALL ensure every Lead is strictly associated with exactly one Campaign.

#### Scenario: Lead-Campaign Linkage

- **WHEN** a lead is created
- **THEN** it must have a valid campaign_id that references an existing campaign
- **AND** the foreign key constraint prevents orphaned leads

