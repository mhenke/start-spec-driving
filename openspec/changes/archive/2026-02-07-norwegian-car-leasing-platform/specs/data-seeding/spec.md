## ADDED Requirements

### Requirement: Database Seeding with Norwegian Data

The system SHALL provide a seeding mechanism that populates the database with realistic Norwegian car leasing data.

#### Scenario: Campaign Seeding

- **WHEN** the seed script is executed
- **THEN** realistic Norwegian car leasing campaigns are created
- **AND** data includes Norwegian car brands (e.g., Audi, BMW, Tesla, Volvo)
- **AND** prices are in NOK with realistic Norwegian leasing amounts
- **AND** campaign types include both `Privat` and `Næring`
- **AND** dates are valid Norwegian date ranges
- **AND** images are publicly accessible URLs for Norwegian car models
- **AND** all required fields meet validation requirements

#### Scenario: Lead Seeding

- **WHEN** the seed script is executed
- **THEN** sample leads are created linked to existing campaigns
- **AND** names are realistic Norwegian names
- **AND** emails follow Norwegian email patterns
- **AND** phone numbers follow Norwegian phone number formats
- **AND** all foreign key relationships are maintained

### Requirement: Faker with nb_NO Locale

The system SHALL use Faker with Norwegian locale (nb_NO) for generating realistic data.

#### Scenario: Norwegian Locale Usage

- **WHEN** generating seeded data
- **THEN** Faker uses nb_NO locale settings
- **AND** generated names, addresses, and other locale-specific data reflect Norwegian culture
- **AND** the data appears authentic to Norwegian users