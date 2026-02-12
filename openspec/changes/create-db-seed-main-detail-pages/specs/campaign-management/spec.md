## ADDED Requirements

### Requirement: Campaign storage and retrieval
The system SHALL store car leasing campaign data with all required fields and allow retrieval of campaigns.

#### Scenario: Store new campaign
- **WHEN** a new campaign is created with all required fields
- **THEN** the system stores the campaign with all provided data

#### Scenario: Retrieve all verified campaigns
- **WHEN** requesting all verified campaigns
- **THEN** the system returns only campaigns with verified=true

#### Scenario: Retrieve campaign by ID
- **WHEN** requesting a campaign by its ID
- **THEN** the system returns the complete campaign data

### Requirement: Campaign data integrity
The system SHALL enforce data integrity for campaign records with proper validation.

#### Scenario: Validate positive numeric values
- **WHEN** creating or updating a campaign with negative numeric values for price, downpayment, duration, or km_per_year
- **THEN** the system rejects the data with an appropriate error

#### Scenario: Validate required fields
- **WHEN** creating a campaign without required fields
- **THEN** the system rejects the data with an appropriate error

### Requirement: Campaign validation for numeric fields
The system SHALL validate all numeric fields in campaigns as positive integers.

#### Scenario: Validate monthly_price as positive integer
- **WHEN** creating or updating a campaign with monthly_price as zero or negative
- **THEN** the system rejects the data with an appropriate error

#### Scenario: Validate downpayment as positive integer
- **WHEN** creating or updating a campaign with downpayment as zero or negative
- **THEN** the system rejects the data with an appropriate error

#### Scenario: Validate duration_months as positive integer
- **WHEN** creating or updating a campaign with duration_months as zero or negative
- **THEN** the system rejects the data with an appropriate error

#### Scenario: Validate km_per_year as positive integer
- **WHEN** creating or updating a campaign with km_per_year as zero or negative
- **THEN** the system rejects the data with an appropriate error

### Requirement: Campaign validation for dates
The system SHALL validate campaign date ranges.

#### Scenario: Validate valid_from before valid_to
- **WHEN** creating or updating a campaign where valid_from is after valid_to
- **THEN** the system rejects the data with an appropriate error

### Requirement: Campaign deletion with cascade
The system SHALL delete all associated leads when a campaign is deleted.

#### Scenario: Delete campaign with associated leads
- **WHEN** a campaign with associated leads is deleted
- **THEN** the system also deletes all leads associated with that campaign