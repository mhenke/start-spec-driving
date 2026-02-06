## ADDED Requirements

### Requirement: DB seeding
The system SHALL provide seed scripts using Faker (nb_NO) to populate realistic campaigns and associated leads for development and testing. Default counts: 20 campaigns with 0-5 leads each, configurable via env.

#### Scenario: Seed population
- **WHEN** a developer runs the seed runner in a dev environment
- **THEN** at least 20 campaigns and associated leads SHALL be inserted

#### Scenario: Seed safety
- **WHEN** seeds are run without ALLOW_SEED=true in prod
- **THEN** the seed runner SHALL refuse to execute

