## ADDED Requirements

### Requirement: Campaign Data Storage
The system SHALL store car leasing campaigns with technical specifications.

#### Scenario: Storing a complete campaign
- **WHEN** a campaign is created with title, brand, model, monthly price, downpayment, duration, km per year, type, and validity dates
- **THEN** all data points MUST be persisted correctly in the database

### Requirement: Campaign Verification Filter
The system SHALL provide a mechanism to filter campaigns by their verification status.

#### Scenario: Fetching verified campaigns
- **WHEN** a request is made for public campaigns
- **THEN** the system MUST only return campaigns where `verified` is true

### Requirement: Campaign Integrity
The system SHALL ensure that campaigns can be safely deleted.

#### Scenario: Cascading deletion
- **WHEN** a campaign is deleted
- **THEN** all associated leads MUST be automatically removed from the database
