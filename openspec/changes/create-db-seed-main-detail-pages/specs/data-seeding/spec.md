## ADDED Requirements

### Requirement: Seed campaign data
The system SHALL provide functionality to populate the database with sample campaign data.

#### Scenario: Run seeding script
- **WHEN** the seeding script is executed
- **THEN** the database is populated with realistic Norwegian car leasing campaign data

#### Scenario: Generate Norwegian-specific data
- **WHEN** generating campaign data with Faker MCP
- **THEN** the data uses nb_NO locale for realistic Norwegian content

### Requirement: Seed lead data
The system SHALL provide functionality to populate the database with sample lead data.

#### Scenario: Run lead seeding
- **WHEN** the seeding script is executed
- **THEN** the database is populated with sample lead data associated with existing campaigns

### Requirement: Data consistency during seeding
The system SHALL maintain data consistency during the seeding process.

#### Scenario: Seed leads with valid campaign references
- **WHEN** seeding lead data
- **THEN** all leads reference existing campaign IDs to maintain foreign key integrity