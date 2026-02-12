## ADDED Requirements

### Requirement: Lead capture form
The system SHALL provide a form for capturing prospect information tied to a specific campaign.

#### Scenario: Successful lead submission
- **WHEN** a user submits valid name, email, and phone for a campaign
- **THEN** the system creates a new lead record associated with the campaign

#### Scenario: Invalid lead submission
- **WHEN** a user submits invalid data (invalid email format, missing required fields)
- **THEN** the system returns appropriate validation errors

### Requirement: Lead data validation
The system SHALL validate lead data before storing it.

#### Scenario: Validate email format
- **WHEN** a user submits an email that doesn't match the email format
- **THEN** the system rejects the submission with an appropriate error

#### Scenario: Validate required fields
- **WHEN** a user submits a lead without required fields (name, email, phone)
- **THEN** the system rejects the submission with appropriate errors

### Requirement: Norwegian phone number validation
The system SHALL validate phone numbers according to Norwegian format standards.

#### Scenario: Valid Norwegian phone number
- **WHEN** a user submits a phone number in valid Norwegian format (8 digits, with or without country code)
- **THEN** the system accepts the phone number

#### Scenario: Invalid Norwegian phone number
- **WHEN** a user submits a phone number that doesn't match Norwegian format standards
- **THEN** the system rejects the submission with an appropriate error message

### Requirement: Lead association with campaign
The system SHALL ensure every lead is associated with exactly one campaign.

#### Scenario: Create lead with valid campaign ID
- **WHEN** a user submits a lead with a valid campaign ID
- **THEN** the system creates the lead and associates it with the specified campaign

#### Scenario: Create lead with invalid campaign ID
- **WHEN** a user attempts to create a lead with a non-existent campaign ID
- **THEN** the system rejects the submission with an appropriate error