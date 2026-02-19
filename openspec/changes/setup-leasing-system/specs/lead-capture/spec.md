## ADDED Requirements

### Requirement: Lead Information Collection
The system SHALL collect prospect information for a specific leasing campaign.

#### Scenario: Submitting a valid lead
- **WHEN** a user provides a name, valid email, and phone number for a specific campaign ID
- **THEN** the system MUST store the lead and link it to that campaign

### Requirement: Lead Data Validation
The system SHALL validate lead information before storage.

#### Scenario: Invalid email submission
- **WHEN** a user submits an incorrectly formatted email address
- **THEN** the system MUST reject the submission and return the error "Ugyldig e-postadresse"

#### Scenario: Invalid Norwegian phone submission
- **WHEN** a user submits a phone number that is not 8 digits or lacks a valid +47 prefix
- **THEN** the system MUST reject the submission and return the error "Vennligst oppgi et gyldig norsk telefonnummer (8 siffer)"

### Requirement: Lead Association
The system SHALL ensure every lead is tied to a valid campaign.

#### Scenario: Missing campaign ID
- **WHEN** a lead is submitted without a valid `campaign_id`
- **THEN** the system MUST prevent storage and enforce referential integrity
