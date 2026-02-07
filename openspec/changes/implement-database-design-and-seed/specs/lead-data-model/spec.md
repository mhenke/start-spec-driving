## ADDED Requirements

### Requirement: Lead data model

The system SHALL provide a leads table that stores prospect information linked to a campaign. Fields MUST include id, campaign_id, name, email, phone, created_at and campaign_id MUST reference campaigns.id with ON DELETE CASCADE.

#### Scenario: Lead creation

- **WHEN** a lead is created for an existing campaign
- **THEN** the lead row is inserted and associated with the campaign

#### Scenario: Lead FK enforcement

- **WHEN** an attempt is made to insert a lead with a non-existent campaign_id
- **THEN** the database SHALL reject the insert with an FK violation or the application SHALL reject the request
