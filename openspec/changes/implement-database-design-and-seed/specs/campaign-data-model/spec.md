## ADDED Requirements

### Requirement: Campaign data model

The system SHALL provide a campaigns table that stores campaign metadata and pricing for car leasing offers. Fields MUST include id, title, brand, model, monthly_price, downpayment, duration_months, km_per_year, campaign_type, verified, valid_from, valid_to, created_at, updated_at, source_url, image.

#### Scenario: Campaign row creation

- **WHEN** a campaign is created via migration or API
- **THEN** a campaign row exists with all required non-null fields populated and created_at/updated_at timestamps set

#### Scenario: Campaign numeric validations

- **WHEN** a campaign is inserted with negative values for monthly_price or downpayment or duration_months
- **THEN** the database SHALL reject the insert due to CHECK constraints or application-level validation

#### Scenario: Campaign indexing

- **WHEN** queries filter by verified and validity dates
- **THEN** indexes on verified and (valid_from, valid_to) SHALL be used for efficient retrieval
